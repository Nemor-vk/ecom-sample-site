import { type NextRequest, NextResponse } from "next/server"
import { addNewDiscount, findAllDiscounts } from "@/prisma/repository/discountRepo"
import { Discount } from "@/generated/prisma"

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const page = Number.parseInt(searchParams.get("page") || "1")
//     const limit = Number.parseInt(searchParams.get("limit") || "10")
//     const search = searchParams.get("search") || ""
//     const status = searchParams.get("status")
//     const type = searchParams.get("type")

//     const skip = (page - 1) * limit

//     const where: any = {}

//     if (search) {
//       where.OR = [
//         { code: { contains: search, mode: "insensitive" } },
//         { name: { contains: search, mode: "insensitive" } },
//         { description: { contains: search, mode: "insensitive" } },
//       ]
//     }

//     if (status === "active") {
//       where.isActive = true
//       where.validFrom = { lte: new Date() }
//       where.OR = [{ validUntil: null }, { validUntil: { gte: new Date() } }]
//     } else if (status === "inactive") {
//       where.OR = [{ isActive: false }, { validUntil: { lt: new Date() } }]
//     }

//     if (type) {
//       where.type = type
//     }

//     const [discounts, total] = await Promise.all([
//       prisma.discount.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: { createdAt: "desc" },
//         include: {
//           _count: {
//             select: { orders: true },
//           },
//         },
//       }),
//       prisma.discount.count({ where }),
//     ])

//     return NextResponse.json({
//       discounts,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     })
//   } catch (error) {
//     console.error("Error fetching discounts:", error)
//     return NextResponse.json({ error: "Failed to fetch discounts" }, { status: 500 })
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { code, name, description, type, value, minOrderAmount, maxDiscountAmount, usageLimit, usageLimitPeriod, isActive, validFrom, validUntil, applicableProducts, applicableCategories } = body as Discount;

    const discount = await addNewDiscount(
      body,
      body.applicableProducts || [],
      body.applicableCategories || []
    );

    return NextResponse.json(discount, { status: 201 })
  } catch (error) {
    console.error("Error creating discount:", error)
    return NextResponse.json({ error: "Failed to create discount" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
   
    const allDiscounts = await findAllDiscounts();

    return NextResponse.json({ discounts: allDiscounts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching discounts:", error)
    return NextResponse.json({ error: "Failed to fetch discounts" }, { status: 500 })
  }
}
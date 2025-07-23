import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status === "active") {
      where.isActive = true
      where.validFrom = { lte: new Date() }
      where.OR = [{ validUntil: null }, { validUntil: { gte: new Date() } }]
    } else if (status === "inactive") {
      where.OR = [{ isActive: false }, { validUntil: { lt: new Date() } }]
    }

    if (type) {
      where.type = type
    }

    const [discounts, total] = await Promise.all([
      prisma.discount.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { orders: true },
          },
        },
      }),
      prisma.discount.count({ where }),
    ])

    return NextResponse.json({
      discounts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching discounts:", error)
    return NextResponse.json({ error: "Failed to fetch discounts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const discount = await prisma.discount.create({
      data: {
        code: body.code,
        name: body.name,
        description: body.description,
        type: body.type,
        value: Number.parseFloat(body.value),
        minOrderAmount: body.minOrderAmount ? Number.parseFloat(body.minOrderAmount) : null,
        maxDiscountAmount: body.maxDiscountAmount ? Number.parseFloat(body.maxDiscountAmount) : null,
        usageLimit: body.usageLimit ? Number.parseInt(body.usageLimit) : null,
        isActive: body.isActive,
        validFrom: new Date(body.validFrom),
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        applicableProducts: body.applicableProducts || [],
        applicableCategories: body.applicableCategories || [],
      },
    })

    return NextResponse.json(discount, { status: 201 })
  } catch (error) {
    console.error("Error creating discount:", error)
    return NextResponse.json({ error: "Failed to create discount" }, { status: 500 })
  }
}

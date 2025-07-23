import { type NextRequest, NextResponse } from "next/server"
import { updateDiscountDetails } from "@/prisma/repository/discountRepo"


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const {id} = await params;

    const discount = await updateDiscountDetails(
      id,
      {code: body.code, name: body.name, description: body.description, type: body.type, value: body.value, minOrderAmount: body.minOrderAmount, maxDiscountAmount: body.maxDiscountAmount, usageLimit: body.usageLimit, usageLimitPeriod: body.usageLimitPeriod, isActive: body.isActive, validFrom: body.validFrom, validUntil: body.validUntil},
      body.applicableProducts,
      body.applicableCategories
    )

    return NextResponse.json(discount, { status: 200 })
  } catch (error) {
    console.error("Error updating discount:", error)
    return NextResponse.json({ error: "Failed to update discount" }, { status: 500 })
  }
}

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await prisma.discount.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Error deleting discount:", error)
//     return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const discount = await prisma.discount.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    })

    if (!discount) {
      return NextResponse.json({ error: "Discount not found" }, { status: 404 })
    }

    return NextResponse.json(discount)
  } catch (error) {
    console.error("Error fetching discount:", error)
    return NextResponse.json({ error: "Failed to fetch discount" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const discount = await prisma.discount.update({
      where: { id: params.id },
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

    return NextResponse.json(discount)
  } catch (error) {
    console.error("Error updating discount:", error)
    return NextResponse.json({ error: "Failed to update discount" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.discount.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting discount:", error)
    return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 })
  }
}

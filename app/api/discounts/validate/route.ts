import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { code, orderAmount, productIds, categories } = await request.json()

    const discount = await prisma.discount.findUnique({
      where: { code },
    })

    if (!discount) {
      return NextResponse.json({ valid: false, error: "Invalid discount code" }, { status: 404 })
    }

    // Check if discount is active
    if (!discount.isActive) {
      return NextResponse.json({ valid: false, error: "Discount code is inactive" }, { status: 400 })
    }

    // Check validity dates
    const now = new Date()
    if (discount.validFrom > now) {
      return NextResponse.json({ valid: false, error: "Discount code is not yet valid" }, { status: 400 })
    }

    if (discount.validUntil && discount.validUntil < now) {
      return NextResponse.json({ valid: false, error: "Discount code has expired" }, { status: 400 })
    }

    // Check usage limit
    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return NextResponse.json({ valid: false, error: "Discount code usage limit reached" }, { status: 400 })
    }

    // Check minimum order amount
    if (discount.minOrderAmount && orderAmount < discount.minOrderAmount) {
      return NextResponse.json(
        { valid: false, error: `Minimum order amount of $${discount.minOrderAmount} required` },
        { status: 400 },
      )
    }

    // Check applicable products
    if (discount.applicableProducts.length > 0) {
      const hasApplicableProduct = productIds.some((id: string) => discount.applicableProducts.includes(id))
      if (!hasApplicableProduct) {
        return NextResponse.json(
          { valid: false, error: "Discount not applicable to selected products" },
          { status: 400 },
        )
      }
    }

    // Check applicable categories
    if (discount.applicableCategories.length > 0) {
      const hasApplicableCategory = categories.some((category: string) =>
        discount.applicableCategories.includes(category),
      )
      if (!hasApplicableCategory) {
        return NextResponse.json(
          { valid: false, error: "Discount not applicable to selected categories" },
          { status: 400 },
        )
      }
    }

    // Calculate discount amount
    let discountAmount = 0
    if (discount.type === "PERCENTAGE") {
      discountAmount = (orderAmount * discount.value) / 100
      if (discount.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscountAmount)
      }
    } else if (discount.type === "FIXED_AMOUNT") {
      discountAmount = discount.value
    }

    return NextResponse.json({
      valid: true,
      discount,
      discountAmount,
    })
  } catch (error) {
    console.error("Error validating discount:", error)
    return NextResponse.json({ error: "Failed to validate discount" }, { status: 500 })
  }
}

import { CHARGES, TAXES_IN_PERCENTAGE } from "@/app/constants"
import { Discount, OrderItem } from "@/generated/prisma"
import { ExtendedOrder, ExtendedOrderItem } from "@/prisma/extendedModelTypes"
import { CartItemType } from "@/types/types"



export function calculateDiscountAmount(discount: Discount, subtotal: number, shipping: number): number {
  switch (discount.type) {
    case "PERCENTAGE":
      const percentageDiscount = (subtotal * discount.value) / 100
      return discount.maxDiscountAmount ? Math.min(percentageDiscount, discount.maxDiscountAmount) : percentageDiscount

    case "FIXED_AMOUNT":
      return Math.min(discount.value, subtotal)

    case "FREE_SHIPPING":
      return shipping

    case "BUY_X_GET_Y":
      // This would require more complex logic based on specific products
      return 0

    default:
      return 0
  }
}

export function calculateTotalSavings(orders:ExtendedOrder[]): number {

  const totalSavings = orders.reduce((total, orderData) => {
    const discountAmount = orderData.discount ? calculateDiscountAmount(orderData.discount, Number(orderData.paymentTotal), CHARGES.SHIPPING) : 0;
    const productSavings = orderData.orderItems.reduce((sum, item) => sum + (Number(item.product.originalPrice) - Number(item.product.price)) * item.quantity, 0);
    return total + discountAmount + productSavings;
  }, 0);

  return totalSavings;
}

export function calculateOrderTotals(items: CartItemType[], discount?: Discount | null) {
  const subtotal = items.reduce((sum, item) => {
    const amountPaid = Number(item.product.price ?? 0);
    const quantity = Number(item.quantity ?? 0);
    return sum + amountPaid * quantity;
  }, 0);
  const baseShipping = subtotal > CHARGES.FREE_SHIPPING_CART_VALUE ? 0 : CHARGES.SHIPPING

  let discountAmount = 0

  if (discount) {
    discountAmount = calculateDiscountAmount(discount, subtotal, baseShipping)
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount)
  const tax = discountedSubtotal * (TAXES_IN_PERCENTAGE.CLOTHS / 100)// 8% tax
  const total = discountedSubtotal + baseShipping + tax

  return {
    subtotal,
    discountAmount,
    shipping: baseShipping,
    tax,
    total,
  }
}

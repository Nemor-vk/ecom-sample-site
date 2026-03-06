import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Discount, OrderItem } from "@/generated/prisma"
import { calculateOrderTotals } from "@/lib/discount-utils"
import { formatCurrencyToINR } from "@/lib/utils"
import { CartItemType } from "@/types/types"

interface CartSummaryProps {
  items: CartItemType[]
  discount?: Discount | null
}

export function CartSummary({ items, discount }: CartSummaryProps) {
  const { subtotal, discountAmount, shipping, tax, total } = calculateOrderTotals(items, discount)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>{formatCurrencyToINR(Number(subtotal.toFixed(2)))}</span>
        </div>

        {discount && discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discount.code})</span>
            <span>-{formatCurrencyToINR(Number(discountAmount.toFixed(2)))}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `${formatCurrencyToINR(Number(shipping.toFixed(2)))}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatCurrencyToINR(Number(tax.toFixed(2)))}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrencyToINR(Number(total.toFixed(2)))}</span>
        </div>
      </CardContent>
    </Card>
  )
}

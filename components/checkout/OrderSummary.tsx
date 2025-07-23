import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { calculateOrderTotals } from "@/lib/discount-utils"
import type { CartItem, Discount } from "@/lib/types"
import { envConfig } from "@/lib/envConfig"

interface OrderSummaryProps {
  items: CartItem[]
  discount?: Discount | null
}

export function OrderSummary({ items, discount }: OrderSummaryProps) {
  const { subtotal, discountAmount, shipping, tax, total } = calculateOrderTotals(items, discount)
  const imageKitUrl = envConfig.env.imageKit.url;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={item.product.image[0]?.url ? imageKitUrl + item.product.image[0]?.url : "/placeholder.svg?height=48&width=48"}
                  alt={imageKitUrl + item.product.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount && discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({discount.code})</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

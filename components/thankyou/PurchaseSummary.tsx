import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  originalPrice?: number
  image: string
}

interface PurchaseSummaryProps {
  orderNumber: string
  orderTotal: number
  discount?: number
}

export function PurchaseSummary({ orderNumber, orderTotal, discount = 0 }: PurchaseSummaryProps) {
  // Mock order items with images - in real app, this would come from props or API
  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      quantity: 1,
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Phone Case",
      quantity: 2,
      price: 25.0,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.0
  const tax = subtotal * 0.08

  return (
    <Card className="dark:bg-card backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>
          <Badge variant="secondary">#{orderNumber}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              {/* Product Image */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                  width={64}
                  height={64}
                />
                {item.quantity > 1 && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.quantity}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    <Badge variant="destructive" className="text-xs px-1 py-0">
                      Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Conditional Discount Line */}
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount Applied</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

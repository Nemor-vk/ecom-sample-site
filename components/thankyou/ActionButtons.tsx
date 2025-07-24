"use client"

import { ArrowRight, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ActionButtonsProps {
  orderNumber: string
}

export function ActionButtons({ orderNumber }: ActionButtonsProps) {
  const handleContinueShopping = () => {
    // Navigate to shop/products page
    console.log("Navigating to shop...")
    // In real app: router.push('/shop') or window.location.href = '/shop'
  }

  const handleTrackOrder = () => {
    // Navigate to order tracking page
    console.log(`Tracking order: ${orderNumber}`)
    // In real app: router.push(`/orders/${orderNumber}/track`)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Continue Shopping */}
          <Button
            onClick={handleContinueShopping}
            variant="outline"
            size="lg"
            className="h-14 flex items-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
          >
            <ShoppingBag className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">Continue Shopping</div>
              <div className="text-xs text-gray-500">Explore more products</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Button>

          {/* Track Order */}
          <Button
            onClick={handleTrackOrder}
            size="lg"
            className="h-14 flex items-center gap-3 bg-green-600 hover:bg-green-700 transition-colors"
          >
            <Package className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">Track Your Order</div>
              <div className="text-xs opacity-90">Monitor delivery status</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Button>
        </div>

        {/* Additional Quick Actions */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 text-center mb-3">Need help?</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Contact Support
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              View FAQ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

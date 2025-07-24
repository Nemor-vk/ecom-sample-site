"use client"

import { CheckCircle, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PurchaseSummary } from "./PurchaseSummary"
import { ActionButtons } from "./ActionButtons"

interface ThankYouPageProps {
  orderNumber?: string
  customerName?: string
  orderTotal?: number
  estimatedDelivery?: string
  discount?: number
}

export function ThankYouPage({
  orderNumber = "ORD-2024-001",
  customerName = "John Doe",
  orderTotal = 129.99,
  estimatedDelivery = "3-5 business days",
  discount = 0,
}: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 rounded-sm dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Header */}
        <Card className="text-center bg-white/80 backdrop-blur-sm dark:bg-card">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-400">Thank You for Your Order!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Hi {customerName}, your order has been successfully placed and is being processed.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Package className="w-5 h-5" />
                <span className="font-semibold">Order #{orderNumber}</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Estimated delivery: {estimatedDelivery}</p>
            </div>

            {/* Show discount message if discount was applied */}
            {discount > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-orange-700 font-medium text-sm">
                  🎉 You saved ${discount.toFixed(2)} on this order!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Purchase Summary */}
        <PurchaseSummary orderNumber={orderNumber} orderTotal={orderTotal} discount={discount} />

        {/* Action Buttons */}
        <ActionButtons orderNumber={orderNumber} />

        {/* Additional Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-blue-800">What happens next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <p className="text-sm text-blue-700">Order confirmation email sent</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <p className="text-sm text-blue-700">Items packed & shipped</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <p className="text-sm text-blue-700">Delivered to your door</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

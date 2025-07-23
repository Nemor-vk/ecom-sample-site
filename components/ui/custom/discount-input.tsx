"use client"

import { useState } from "react"
import { Check, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Discount } from "@/generated/prisma"

interface DiscountInputProps {
  onDiscountApply: (discount: Discount | null) => void
  appliedDiscount?: Discount | null
  orderTotal: number
}

export function DiscountInput({ onDiscountApply, appliedDiscount, orderTotal }: DiscountInputProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock discount codes for demonstration
  const mockDiscounts: Discount[] = [
  ]

  const validateDiscount = (discount: Discount): { isValid: boolean; error?: string } => {
    if (!discount.isActive) {
      return { isValid: false, error: "This discount code is no longer active" }
    }

    if (discount.validUntil && new Date() > discount.validUntil) {
      return { isValid: false, error: "This discount code has expired" }
    }

    if (discount.minOrderAmount && orderTotal < discount.minOrderAmount) {
      return {
        isValid: false,
        error: `Minimum order amount of $${discount.minOrderAmount.toFixed(2)} required`,
      }
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return { isValid: false, error: "This discount code has reached its usage limit" }
    }

    return { isValid: true }
  }

  const handleApplyDiscount = async () => {
    if (!code.trim()) {
      setError("Please enter a discount code")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const discount = mockDiscounts.find((d) => d.code.toLowerCase() === code.toLowerCase())

    if (!discount) {
      setError("Invalid discount code")
      setIsLoading(false)
      return
    }

    const validation = validateDiscount(discount)
    if (!validation.isValid) {
      setError(validation.error || "Invalid discount code")
      setIsLoading(false)
      return
    }

    onDiscountApply(discount)
    setIsLoading(false)
  }

  const handleRemoveDiscount = () => {
    onDiscountApply(null)
    setCode("")
    setError("")
  }

  if (appliedDiscount) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">{appliedDiscount.name}</p>
                <p className="text-sm text-green-600">{appliedDiscount.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveDiscount}
              className="text-green-700 hover:text-green-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Have a discount code?</span>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Enter discount code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === "Enter" && handleApplyDiscount()}
            className="flex-1"
          />
          <Button onClick={handleApplyDiscount} disabled={isLoading || !code.trim()}>
            {isLoading ? "Applying..." : "Apply"}
          </Button>
        </div>

        {error && (
          <Alert className="mt-3 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-3 text-xs text-muted-foreground">
          <p>Try these codes: SAVE10, FLAT20, FREESHIP</p>
        </div>
      </CardContent>
    </Card>
  )
}

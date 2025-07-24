"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Discount, OrderItem } from "@/generated/prisma"
import { calculateOrderTotals } from "@/lib/discount-utils"
import { CartItem } from "./CartItem"
import { DiscountInput } from "../ui/custom/discount-input"
import { CartSummary } from "./CartSummary"
import { ExtendedOrderItem } from "@/prisma/extendedModelTypes"
import { useCartStore } from "@/store/cartStore"
import { CartItemType } from "@/types/types"

export default function CartPage() {
  const {cartItems, discount:appliedDiscount, setDiscount} = useCartStore();

  const { subtotal } = calculateOrderTotals(cartItems, appliedDiscount)

  if (cartItems && cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="space-y-6">
          <DiscountInput
            orderTotal={subtotal}
          />

          <CartSummary items={cartItems} discount={appliedDiscount} />

          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

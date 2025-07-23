"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { useState } from "react"
import { ExtendedProduct } from "@/prisma/extendedModelTypes"

interface QuantitySelectorProps {
  min?: number
  max?: number
  productId: string,
  quantity:number,
  onQuantityChange:(newQuantity:number) => void
}

export function QuantitySelector({quantity,  min = 1, max = 99, productId, onQuantityChange}: QuantitySelectorProps) {

  // const [quantity, setQuantity] = useState<number>(min);

  const {increaseQuantity, decreaseQuantity} = useCartStore();
  const handleDecrease = () => {
    if (quantity > min) {
      decreaseQuantity(productId)
      // setQuantity(quantity - 1)
      onQuantityChange(quantity-1)
    }
  }

  const handleIncrease = () => {
    console.log("add trig : ", productId)
    if (quantity < max) {
      increaseQuantity(productId)
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={handleIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

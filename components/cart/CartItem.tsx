"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OrderItem } from "@/generated/prisma"
import { QuantitySelector } from "../ui/custom/quantity-selector"
import { CartItemType } from "@/types/types"
import { useCartStore } from "@/store/cartStore"
import { envConfig } from "@/lib/envConfig"
import RichTxtEditor from "../richTxtEditor/RichTxtEditor"

interface CartItemProps {
  item: CartItemType
  // onRemove: (id: string) => void
}

export function CartItem({ item }: CartItemProps) {
  const {onQuantityChange, removeFromCart} = useCartStore();
  const { product, quantity } = item
  const totalPrice = Number(product.price) * quantity
  const imageKitUrl = envConfig.env.imageKit.url;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={imageKitUrl + product.image[0]?.url || "/placeholder.svg?height=80&width=80"}
              alt={imageKitUrl + product.image[0]?.altText || product.name}
              fill
              className="rounded-md object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <RichTxtEditor content={product.description || 'No Description'} isEditable={false} className="text-sm text-muted-foreground line-clamp-2 inline-block min-h-0 p-0 border-0 rounded-none" />
            <div className="flex flex-wrap gap-1 mt-2">
              {product.productTags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">${Number(product.price).toFixed(2)} each</p>
              <p className="font-semibold text-lg">${totalPrice.toFixed(2)}</p>
            </div>

            <QuantitySelector
              productId={product.id}
              max={product.stock}
              quantity={quantity}
              onQuantityChange={(newQuantity) => newQuantity}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Heart, Share2, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from "./ProductGallery"
import { ProductRating } from "./ProductRating"
import { ProductOffers } from "./ProductOffers"
import { ProductFeatures } from "./ProductFeatures"
import { QuantitySelector } from "../ui/custom/quantity-selector"
import { CURRENCY } from "@/app/constants"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import { toast } from "sonner"
import { SerializedProduct } from "@/lib/serializers/product.serialize"

export default function ProductPage({product}: {product:SerializedProduct}) {
  const {cartItems, addToCart, onQuantityChange} = useCartStore();
  const selectedCartItem = cartItems.find((cartItem) => cartItem.id === product.id);
  const [isWishlisted, setIsWishlisted] = useState(false)
  const doesProductExistInCart = cartItems.find(item => item.product.id === product.id);
  const [quantity, setQuantity] = useState( doesProductExistInCart ? doesProductExistInCart.quantity  : 1); //product quantity

  const offers = [
    {
      id: "1",
      title: "Flat ₹4500 off on HDFC Credit Card & ₹5000 on Credit EMIs",
      description: "Valid on orders above ₹10,000",
      type: "credit_card" as const,
    },
    {
      id: "2",
      title: "Flat ₹4500 off on HDFC Credit Card & ₹5000 on Credit EMIs",
      description: "No cost EMI available",
      type: "credit_card" as const,
    },
  ]

  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "2-4 Days Free Delivery",
      description: "Fast and reliable shipping",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
          />
        </svg>
      ),
      title: "7 Days Service Center Replacement",
      description: "Hassle-free replacement",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "1 Year Warranty",
      description: "Complete protection coverage",
    },
  ]

  const handleAddToCart = () => {
    addToCart(product);
    onQuantityChange(product.id , quantity)
    toast.success("Product added to cart", {description: product.name + 'added to your cart'})
  }

  const handleBuyNow = () => {
    addToCart(product);
    onQuantityChange(product.id , quantity)
    console.log("Buy now:", { product, quantity })
    // console.log("Buy now:", { product, quantity })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name}`,
        url: window.location.href,
      })
    }
  }

  const discountPercentage = Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-6">
          <ProductGallery images={product.image?.map((img) => img.url) ?? ''} productName={product.name} />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">{product.name}</h1>
                <ProductRating rating={product.rating} size="md" />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleShare} className="text-gray-500 hover:text-gray-700">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`${isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-foreground">
                  {CURRENCY.INR}
                  {product.price}
                </span>
                <span className={`${product.originalPrice ? 'text-lg text-gray-500 line-through' : 'hidden' }`}>
                  {CURRENCY.INR}
                  {product.originalPrice && product.originalPrice}
                </span>
                <Badge variant="destructive" className={`${product.originalPrice ? 'text-sm' : 'hidden' }`}>
                  {discountPercentage}% OFF
                </Badge>
              </div>
              <p className={`${product.originalPrice ? "text-sm text-green-600 font-medium dark:text-green-400" : "hidden"}`}>
                You save {CURRENCY.INR}
                {(Number(product.originalPrice) - Number(product.price)).toFixed(2)}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full dark:text-green-400"></div>
              <span className="text-sm text-green-600 font-medium dark:text-green-400">In Stock ({product.stock} items left)</span>
            </div>
          </div>

          {/* Offers */}
          <ProductOffers offers={offers} />

          {/* Features */}
          <ProductFeatures features={features} />

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <QuantitySelector quantity={quantity} productId={product.id} max={product.stock} onQuantityChange={(newQuantity) => setQuantity(newQuantity) }/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="lg"
                className={"h-12 font-semibold border-2 hover:bg-gray-50 bg-transparent"}
                disabled={doesProductExistInCart && true}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                { doesProductExistInCart ? "Item Already In Cart" : "Add to Cart"}
              </Button>
              <Button
                asChild
                onClick={handleBuyNow}
                size="lg"
                className="h-12 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Link href={'/cart'}>
                    <Zap className="h-5 w-5 mr-2" />
                    Buy Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 space-y-1 pt-4 border-t">
            <p>• Free delivery on orders above ₹499</p>
            <p>• Easy returns within 7 days</p>
            <p>• Secure payments with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}

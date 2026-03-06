"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { envConfig } from "@/lib/envConfig"
import { SerializedProduct } from "@/lib/serializers/product.serialize"
import RichTxtEditor from "../richTxtEditor/RichTxtEditor"
import StarRating from "../StarRating"
import { cn } from "@/lib/utils"

interface ProductSliderProps {
  title: string
  subtitle?: string
  products: SerializedProduct[]
  className?: string
}

export function ProductSlider({ title, subtitle, products, className }: ProductSliderProps) {
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  //Return Empty - Incase of no products
  if(!products || products.length === 0) {
    return <></>
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= products.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0 ? Math.max(0, products.length - itemsPerView) : prev - itemsPerView,
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className={cn("my-6 text-foreground relative z-20", className)}>
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <div className="flex justify-between w-full align-middle">
              {subtitle && <RichTxtEditor isEditable={false} content={subtitle} className="text-gray-400 min-h-0 line-clamp-2 w-[60vw] border-0 shadow-none"/>}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="border-gray-600 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="border-gray-600 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Glass container with no padding for image */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="relative">
                  <Image
                    height={400}
                    width={400}
                    src={product.image.length > 0 ? envConfig.env.imageKit.url + product.image[0].url : "/placeholder.svg"}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={90}
                  />

                  {/* Discount badge */}
                  <Badge className="absolute top-3 left-3 bg-red-500/90 text-white border-0 shadow-lg backdrop-blur-sm">
                    {product.discount?.type === "PERCENTAGE"
                      ? `${product.discount.value}% off`
                      : product.discount?.type === "FIXED_AMOUNT"
                      ? `Upto ₹${product.discount.maxDiscountAmount}/- off`
                      : product.discount?.type === "FREE_SHIPPING"
                      ? "Free Shipping"
                      : product.discount?.type === "BUY_X_GET_Y"
                      ? `Buy ${product.discount.minOrderAmount} Get ${product.discount.maxDiscountAmount}`
                      : ""}
                  </Badge>

                  {/* Heart icon */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 text-white hover:text-red-500 bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Add to Cart button overlay */}
                  <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white border-0 px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    Add to Cart
                  </Button>

                  {/* Text overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400/80 via-blue-400/60 to-transparent p-4 pt-8">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-background text-base leading-tight line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <StarRating
                            rating={product.rating}
                            size={12}
                            color="#1178fa"
                            strokeColor="#1178fa"
                          />
                          <span className="text-xs text-[color:#1178fa] ml-1">
                            ({product.rating})
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-card">
                            ₹{Number(product.price)}
                          </div>
                          <div className="text-xs text-muted line-through">
                            ₹{Number(product.originalPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

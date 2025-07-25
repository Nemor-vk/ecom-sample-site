"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import StarRating from "./StarRating"

const products = [
  {
    id: 1,
    name: "OnePlus Nord 2r",
    price: 1997,
    originalPrice: 2500,
    rating: 4,
    image: "/assets/products/oneplus_tws.jpg?height=200&width=200",
    discount: "20% OFF",
  },
  {
    id: 2,
    name: "Classic Watch",
    price: 2999,
    originalPrice: 4000,
    rating: 5,
    image: "/assets/banners/watch.png?height=200&width=200",
    discount: "25% OFF",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 1499,
    originalPrice: 2000,
    rating: 4,
    image: "/assets/products/boat_white.jpg?height=200&width=200",
    discount: "25% OFF",
  },
  {
    id: 4,
    name: "Designer T-Shirt",
    price: 899,
    originalPrice: 1200,
    rating: 4,
    image: "/assets/banners/sunglass3.png?height=200&width=200",
    discount: "25% OFF",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 3999,
    originalPrice: 5000,
    rating: 5,
    image: "/assets/products/gshock1.jpg?height=200&width=200",
    discount: "20% OFF",
  },
  {
    id: 6,
    name: "Leather Bag",
    price: 2499,
    originalPrice: 3500,
    rating: 4,
    image: "/assets/banners/womenbag.png?height=200&width=200",
    discount: "29% OFF",
  },
]

interface ProductSliderProps {
  title: string
  subtitle?: string
}

export function ProductSlider({ title, subtitle }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

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
    <section className="py-16 text-foreground">
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-gray-400">{subtitle}</p>}
          </div>
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Glass container with no padding for image */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="relative">
                  <Image
                    height={400}
                    width={400}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={90}
                  />

                  {/* Discount badge */}
                  <Badge className="absolute top-3 left-3 bg-red-500/90 text-white border-0 shadow-lg backdrop-blur-sm">
                    {product.discount}
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
                      <h3 className="font-semibold text-background text-base leading-tight line-clamp-2">{product.name}</h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <StarRating rating={product.rating} size={12} color="#1178fa" strokeColor="#1178fa"/>
                          <span className="text-xs text-[color:#1178fa] ml-1">({product.rating})</span>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-card">₹{product.price}</div>
                          <div className="text-xs text-muted line-through">₹{product.originalPrice}</div>
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
  )
}

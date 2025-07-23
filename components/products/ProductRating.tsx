import { Star } from "lucide-react"

interface ProductRatingProps {
  rating: number
  maxRating?: number
  showNumber?: boolean
  size?: "sm" | "md" | "lg"
}

export function ProductRating({ rating, maxRating = 5, showNumber = true, size = "md" }: ProductRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      {showNumber && <span className="text-sm font-medium text-gray-600">{rating}</span>}
    </div>
  )
}

import { Tag, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Offer {
  id: string
  title: string
  description: string
  type: "credit_card" | "bank" | "cashback" | "exchange"
}

interface ProductOffersProps {
  offers: Offer[]
}

export function ProductOffers({ offers }: ProductOffersProps) {
  if (offers.length === 0) return null

  return (
    <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-900/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="font-semibold text-green-800 dark:text-green-400">Special Offers</span>
        </div>

        <div className="space-y-2">
          {offers.map((offer) => (
            <div key={offer.id} className="flex items-start gap-3">
              <CreditCard className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0 dark:text-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">{offer.title}</p>
                <p className="text-xs text-green-600 dark:text-green-400">{offer.description}</p>
              </div>
              <Badge variant="outline" className="text-xs border-green-300 text-green-700 dark:border-green-700 dark:text-green-400">
                Learn more
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

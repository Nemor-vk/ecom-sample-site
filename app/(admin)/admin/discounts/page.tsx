import { DiscountsManagement } from "@/components/admin/discounts/DiscountsManagement"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Discounts & Offers",
  description: "Manage discount codes and promotional offers",
}

export default function DiscountsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Discounts & Offers</h2>
      </div>
      <DiscountsManagement />
    </div>
  )
}

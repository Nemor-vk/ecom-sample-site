"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Address } from "@/generated/prisma"
import DeleteButton from "../ui/custom/delete-button"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface AddressCardProps {
  address: Address
  isSelected?: boolean
  onDeleteAddress: (itemId:string) => void
}

export function AddressCard({ address, isSelected, onDeleteAddress }: AddressCardProps) {
  // const {data:authSession} = useSession();

  return (
    <Card className={`cursor-pointer transition-colors ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
          <div className="flex-1">
            <Label htmlFor={address.id} className="cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{address.labelPreset}</Badge>
                {address.customLabel && <Badge variant="outline">{address.customLabel}</Badge>}
              </div>

              <div className="space-y-1">
                {address.recipientName && <p className="font-medium">{address.recipientName}</p>}
                <p className="text-sm">{address.streetAddress}</p>
                {address.landmark && <p className="text-sm text-muted-foreground">Landmark: {address.landmark}</p>}
                <p className="text-sm">
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p className="text-sm text-muted-foreground">{address.phoneNumber}</p>
              </div>
              <div className="ml-auto">
                <DeleteButton deleteItem={() => onDeleteAddress(address.id)}/>
              </div>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

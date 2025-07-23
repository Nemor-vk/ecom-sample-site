"use client"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"
import { Address } from "@/generated/prisma"
import { AddressCard } from "@/components/checkout/AddressCard"


interface AddressSelectorProps {
  addresses: Address[]
  selectedAddressId?: string
  onAddressSelect: (addressId: string) => void
  onAddNewAddress: () => void
  onDeleteAddress: (itemId:string) => void
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddNewAddress,
  onDeleteAddress
}: AddressSelectorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Delivery Address</CardTitle>
        <Button variant="outline" size="sm" onClick={onAddNewAddress}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddressId} onValueChange={onAddressSelect} className="space-y-3">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} isSelected={selectedAddressId === address.id} onDeleteAddress={onDeleteAddress} />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

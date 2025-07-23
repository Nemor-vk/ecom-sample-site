"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PaymentMethodProps {
  selectedMethod: string
  onMethodSelect: (method: string) => void
}

export function PaymentMethod({ selectedMethod, onMethodSelect }: PaymentMethodProps) {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay securely with your card",
    },
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using UPI apps",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: Wallet,
      description: "Pay with digital wallets",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={onMethodSelect} className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <div key={method.id} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Icon className="h-5 w-5" />
                  <div className="flex-1">
                    <Label htmlFor={method.id} className="cursor-pointer">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-muted-foreground">{method.description}</div>
                    </Label>
                  </div>
                </div>

                {selectedMethod === method.id && method.id === "card" && (
                  <div className="ml-8 space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

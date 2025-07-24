"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { calculateOrderTotals } from "@/lib/discount-utils"
import { Address, Discount } from "@/generated/prisma"
import { CartItemType, mockAddresses } from "@/types/types"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { DiscountInput } from "@/components/ui/custom/discount-input"
import { PaymentMethod } from "@/components/checkout/PaymentMethod"
import { AddressSelector } from "@/components/ui/custom/address-selector"
import { useCartStore } from "@/store/cartStore"
import { AddressDialogBox } from "@/components/checkout/AddressDialogBox"
import { useDialogStateStore } from "@/store/userPreferenceStore"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

const CheckoutPage = () => {
  const {data:authSession} = useSession();
  const {cartItems, discount:appliedDiscount, setDiscount} = useCartStore();
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || "")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const {isOpen, open, close} = useDialogStateStore()

  if (!authSession?.user) {
        toast.warning("User Error: Please login first!");

        setTimeout(() => {
            redirect('/');
        }, 2000); // Wait 2 seconds before redirecting
    }


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `/api/address?userId=${authSession?.user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resultJson = await response.json();
        const allAddresses: Address[] = resultJson.address;

        if (!response.ok) {
          console.log("Failed to get all Address:", resultJson.error);
          return;
        }

        //Setting Default Address Id if not set
        if (!selectedAddressId) {
          setSelectedAddressId(allAddresses[0].id);
        }

        setAddresses(allAddresses);
        // Proceed with using userAddresses
      } catch (error) {
        console.log("Something went wrong fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [selectedAddressId]);

  const handleAddNewAddress = () => {
    // In a real app, this would open a modal or navigate to an address form
    console.log("Add new address")
  }
  
  //Delete Address
  const deleteAddress = async (addressId: string) => {
    console.log("Item Deleted");
    try {
      const response = await fetch(
        `/api/address?userId=${authSession?.user?.id}&addressId=${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Server responded with an error.");
      }

      const newAddress = addresses.filter((address) => address.id != addressId );
      setAddresses(newAddress);
      toast.success("Address Deleted Successfully");
    } catch (error) {
      console.log("Failed to delete address: ", error);
      toast.error("Failed To Delete Address!");
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would:
    // 1. Validate all form data
    // 2. Process payment
    // 3. Create order in database
    // 4. Send confirmation email
    // 5. Redirect to success page
    console.log("discount ", appliedDiscount)

    console.log("Order placed successfully", {
      items: cartItems,
      address: selectedAddressId,
      payment: selectedPaymentMethod,
      discount: appliedDiscount,
    })
    setIsProcessing(false)
  }

  const { subtotal } = calculateOrderTotals(cartItems, appliedDiscount)
  const isFormValid = selectedAddressId && selectedPaymentMethod && cartItems.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Selection */}
          <AddressSelector
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onAddressSelect={setSelectedAddressId}
            onAddNewAddress={open}
            onDeleteAddress={(itemId) => deleteAddress(itemId)}
          />
          <AddressDialogBox/>

          {/* Payment Method */}
          <PaymentMethod selectedMethod={selectedPaymentMethod} onMethodSelect={setSelectedPaymentMethod} />
        </div>

        {/* Order Summary & Place Order */}
        <div className="space-y-6">
          <DiscountInput
            orderTotal={subtotal}
          />

          <OrderSummary items={cartItems} discount={appliedDiscount} />

          <div className="space-y-4">
            <Button onClick={handlePlaceOrder} disabled={!isFormValid || isProcessing} className="w-full" size="lg">
              <Lock className="h-4 w-4 mr-2" />
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage;
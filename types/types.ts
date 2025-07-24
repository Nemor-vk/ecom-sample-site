import { Address, Product } from "@/generated/prisma"
import { ExtendedOrder, ExtendedProduct } from "@/prisma/extendedModelTypes"

export interface CartItemType {
  id: string
  product: Product
  quantity: number
}


export interface OrderRequestModel  {
  userId: string
  paymentTotal: string
  discountId: string | null
  cartItems: CartItemType[]
}


export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    userId: "user-1",
    labelPreset: "Home",
    primaryAddress: "Home",
    streetAddress: "123 Main Street, Apt 4B",
    recipientName: "John Doe",
    city: "New York",
    state: "NY",
    landmark: "Near Central Park",
    pincode: "10001",
    phoneNumber: "+1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
    customLabel: null
  },
  {
    id: "addr-2",
    userId: "user-1",
    labelPreset: "Work",
    primaryAddress: "Work",
    streetAddress: "456 Business Ave, Suite 200",
    recipientName: "John Doe",
    city: "New York",
    state: "NY",
    pincode: "10002",
    phoneNumber: "+1234567891",
    createdAt: new Date(),
    updatedAt: new Date(),
    landmark : 'Rasoi',
    customLabel: null
  },
]
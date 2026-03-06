import { Address, Category, Discount, Image, Order, OrderItem, Product, Role, Section, User } from "@/generated/prisma";
import { SerializedProduct } from "@/lib/serializers/product.serialize";

export type ExtendedProduct = Product & {
    image: Image[],
    category : Category,
    sections : Section[],
    // Order :Order[]
    sectionNames?: string[],
    discount? : Discount
  };

export type ExtendedUser = User & {
  role: Role,
  address: Address,
}

export type ExtendedCategory = Category & {
  sections: Section[],
  // products: Product[],
  subcategories: Category[]
  products : SerializedProduct[]

  // DB - API Option Variables
  sectionNames?: string[]
}

export type ExtendedOrder = Order & {
  orderItems: ExtendedOrderItem[],
  user: User,
  discount: Discount  | null,
}

export type ExtendedOrderItem = OrderItem & {
  product: Product & {
    image: Image[],
    category : Category
  },
  // order: Order
}

export type ExtendedPromotionalTag = Section & {
  products: SerializedProduct[],
}

export type ExtendedDiscount = Discount & {
  products: Product[],
  categories: Category[],
  orders: Order[],
}

// export type ExtendedSectionNonSerialised = Section & {
//   products: [],
// }
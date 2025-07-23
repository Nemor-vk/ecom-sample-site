import { Address, Category, Discount, Image, Order, OrderItem, Product, Role, Section, User } from "@/generated/prisma";

export type ExtendedProduct = Product & {
    image: Image[],
    category : Category,
    sections : Section[],
    // Order :Order[]
    sectionNames?: string[]
  };

export type ExtendedUser = User & {
  role: Role,
  address: Address,
}

export type ExtendedCategory = Category & {
  sections: Section[],
  // products: Product[],
  subcategories: Category[]

  // DB - API Option Variables
  sectionNames?: string[]
}

export type ExtendedOrder = Order & {
  orderItems: OrderItem[],
  user: User,
  Discount?: Discount,
}

export type ExtendedOrderItem = OrderItem & {
  product: ExtendedProduct,
  order: Order
}

export type ExtendedPromotionalTag = Section & {
  products: Product[],
}

export type ExtendedDiscount = Discount & {
  products: Product[],
  categories: Category[],
  orders: Order[],
}
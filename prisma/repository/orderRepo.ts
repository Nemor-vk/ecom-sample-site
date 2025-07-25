import db from "@/lib/prisma";
import { ExtendedOrder } from "../extendedModelTypes";
import { CartItemType, OrderRequestModel } from "@/types/types";
import { Decimal } from "@/generated/prisma/runtime/index-browser";

export async function getAllOrders() : Promise<ExtendedOrder[]> {
  //get all the categories linked to a section
    
    const allOrders = await db.order.findMany({
        include: {
            orderItems:{
                include: {
                    product: true,
                },
            },
            user:true,
            discount:true
        }
    })

    db.$disconnect();
    return allOrders;
}

export async function createNewOrder({ cartItems, userId, discountId, paymentTotal }: OrderRequestModel ): Promise<ExtendedOrder | null> {

  const newOrder = await db.order.create({
  data: {
    userId,
    paymentTotal: new Decimal(paymentTotal), // Convert string to Decimal
    discountId, // can be null if no discount
    orderItems: {
      create: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        amountPaid: item.product.price,
      })),
    },
  },
  include: {
    orderItems: true,
    discount: true,
    user: true
  },
});

return newOrder;
}
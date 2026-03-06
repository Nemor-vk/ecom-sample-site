import db from "@/lib/prisma";
import { ExtendedOrder } from "../extendedModelTypes";
import { CartItemType, OrderRequestModel } from "@/types/types";
import { Decimal } from "@/generated/prisma/runtime/index-browser";
import { Order } from "@/generated/prisma";

export async function getAllOrders() : Promise<Order[]> {
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

export async function createNewOrder({ cartItems, userId, discountId, paymentTotal }: OrderRequestModel ): Promise<Order | null> {

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

export async function findOrdersByUserId(userId: string): Promise<Order[]> {
  const userOrders = await db.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          order: true, // Include the order to access its properties
        },
      },
      user: true,
      discount: true,
    },
  });

  return userOrders;
}

export async function getOrderById(orderID:string) : Promise<ExtendedOrder | null> {
  //get all the categories linked to a section
    
    const orderData = await db.order.findUnique({
        where : {
          id : orderID
        },
        include: {
            orderItems:{
                include: {
                    product: {
                      include : {
                        image: true,
                        category : true,
                      }
                    },
                },
            },
            user:true,
            discount:true
        }
    })

    console.log("Orders DB - ORDER BY ID :: ", orderData)

    db.$disconnect();
    return orderData;
}
import db from "@/lib/prisma";
import { ExtendedOrder } from "../extendedModelTypes";

export async function getAllOrders() : Promise<ExtendedOrder[]> {
  //get all the categories linked to a section
    
    const allOrders = await db.order.findMany({
        include: {
            orderItems:true,
            user:true,
            discount:true
        }
    })

    db.$disconnect();
    return allOrders;
}
import { Order } from "@/generated/prisma";
import { ExtendedOrder } from "@/prisma/extendedModelTypes";
import { createNewOrder, getAllOrders } from "@/prisma/repository/orderRepo";
import { OrderRequestModel } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

interface OrderResponseInterface {
    message : string,
    order? : Order | Order[] | null,
}


export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse<OrderResponseInterface>> {
    try {

      const allOrders = await getAllOrders();
  
      return NextResponse.json({order:allOrders , message:"✅ All orders have been fetched successfully!"}, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Fetch All Orders' }, { status: 500 });
    }
  }


export async function POST(req: NextRequest): Promise<NextResponse<OrderResponseInterface>> {
  try {
    const body = await req.json();

    // Destructure required fields from body
    const { userId, paymentTotal, discountId, cartItems } = body as OrderRequestModel;

    // Basic validation
    if (!userId || !paymentTotal || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ message: "Missing required order data." }, { status: 400 });
    }

    // Create the order (assuming you have a createOrder function in your repo)
    // The function should handle creating order and nested orderItems
    const newOrder = await createNewOrder({ cartItems, userId, paymentTotal, discountId });

    if (!newOrder) {
      return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json(
      { order: newOrder, message: "✅ Order created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message || error);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}
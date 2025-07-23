import { ExtendedOrder } from "@/prisma/extendedModelTypes";
import { getAllOrders } from "@/prisma/repository/orderRepo";
import { NextRequest, NextResponse } from "next/server";

interface OrderResponseInterface {
    message : string,
    order? : ExtendedOrder[],
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
import { getOrderById } from "@/prisma/repository/orderRepo";
import { NextRequest } from "next/server";

    
export async function GET(req: NextRequest,   { params }: { params: Promise<{ id: string }> }) {

     const { id } = await params;

    try {

      const orderData = await getOrderById(id);

      if(!orderData) {
        return Response.json({message:"Order Not Placed"}, { status: 404 });
      }
  
      return Response.json({order:orderData , message:"✅ All orders have been fetched successfully!"}, { status: 200 });
    } catch (error) {
      console.error(error);
      return Response.json({ message: 'Order check failed due to server error' }, { status: 500 });
    }
  }
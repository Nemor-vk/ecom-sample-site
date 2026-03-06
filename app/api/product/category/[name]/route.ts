import { sanitizeProducts, SerializedProduct } from "@/lib/serializers/product.serialize";
import { findProductsByCategoryName } from "@/prisma/repository/productRepo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { name: string } }): Promise<NextResponse> {
    try {
      const { name } = await params;

      const products = await findProductsByCategoryName(name);

      if(!products) {
          return NextResponse.json(
          { message: `Failed to fetch Products by category: ${name}` },
          { status: 404 }
        );
      }

      const safeProducts: SerializedProduct[] = sanitizeProducts(products);
      return NextResponse.json(safeProducts);
    } catch (error) {
      console.error(error); // Better logging for errors
      // throw new Error("Failed to fetch product - Internal Server Error")
  
      // Return error response
      return NextResponse.json(
        { message: `Failed to fetch Products by category: Internal Server Error` },
        { status: 500 }
      );
    }
  }
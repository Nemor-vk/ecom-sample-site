import { sanitizeProduct, SerializedProduct } from "@/lib/serializers/product.serialize";
import { ExtendedProduct } from "@/prisma/extendedModelTypes";
import { deleteProductById, findProductById, updateProduct } from "@/prisma/repository/productRepo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,  { params }: { params: Promise<{ id: string }> } ): Promise<NextResponse> {
    try {
      const { id } = await params;

      const product = await findProductById(id);

      if(!product) {
          return NextResponse.json(
          { message: "Failed to fetch Product" },
          { status: 404 }
        );
      }

      const safeProduct: SerializedProduct = sanitizeProduct(product);
      return NextResponse.json(safeProduct);
    } catch (error) {
      console.error(error); // Better logging for errors
      // throw new Error("Failed to fetch product - Internal Server Error")
  
      // Return error response
      return NextResponse.json(
        { message: "Failed to fetch Product" },
        { status: 500 }
      );
    }
  }

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }>}): Promise<NextResponse> {
    try {
      const { id } = await params;
      // console.log("params " , params)
   
      const products = await deleteProductById(id);
      return NextResponse.json({status:200});
    } catch (error) {
      console.error(error); // Better logging for errors
  
      // Return error response
      return NextResponse.json(
        { message: "Failed to delete Product" },
        { status: 500 }
      );
    }
  }

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }>} }): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    const reqJson:ExtendedProduct = await req.json();
    reqJson.id = id;
 
    const updatedProduct:ExtendedProduct = await updateProduct(reqJson);
    // console.log("api/product/id - updated product", updatedProduct)

    const safeProduct: SerializedProduct = sanitizeProduct(updatedProduct);
    return NextResponse.json(safeProduct,{status:200});
  } catch (error) {
    console.error(error); // Better logging for errors

    // Return error response
    return NextResponse.json(
      { message: "Failed to update Product" },
      { status: 500 }
    );
  }
}
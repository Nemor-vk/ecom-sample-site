import { Product } from "@/generated/prisma";
import { addNewProduct, findProductsBySectionName } from "@/prisma/repository/productRepo";
import { NextRequest, NextResponse } from "next/server";
import { findAllProducts } from "@/prisma/repository/productRepo";

export async function POST(req: NextRequest) {
    try {
      const productJson = await req.json();
      // const imagesList = productJson.json().image;
      const imageModelJson = productJson.image.map((imgUrl:string) => ({
        url: imgUrl,
      }));

      productJson.image = imageModelJson

      console.log(productJson)
      addNewProduct(productJson)
      // const images = await productJson.json();

  
      return NextResponse.json({ message: 'Product Added Successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Add Product' }, { status: 500 });
    }
  }

  export async function GET(req: NextRequest): Promise<NextResponse> {
    try {

      const { searchParams } = new URL(req.url);

      if(searchParams.toString() === '') { // if Search params are empty

        const products: Product[] = await findAllProducts();
        return NextResponse.json(products);
      }
      else {
        const sectionName = searchParams.get("sectionName");

        if(sectionName) {

          const products: Product[] = await findProductsBySectionName(sectionName);
          return NextResponse.json(products);
        }
        else {
          throw new Error('Invalid request or query')
        }
        
      }

   

    } catch (error) {
      console.error(error); // Better logging for errors
      return NextResponse.json(
        { message: "Failed to get Products" },
        { status: 500 }
      );
    }
  }
  
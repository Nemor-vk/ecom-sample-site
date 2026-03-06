import { bulkCreateNewProducts } from "@/prisma/repository/productRepo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const productJsonList = await req.json();

    //   const imageModelJson = productJson.image.map((imgUrl:string) => ({
    //     url: imgUrl,
    //   }));

    //   productJson.image = imageModelJson

      console.log(productJsonList)
      bulkCreateNewProducts(productJsonList)
      // const images = await productJson.json();

  
      return NextResponse.json({ message: 'All Product Added Successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Add All Product' }, { status: 500 });
    }
  }
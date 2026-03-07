import { Product, Section } from "@/generated/prisma";
import { sanitizePromotionalTagList } from "@/lib/serializers/product.serialize";
import { ExtendedProduct, ExtendedPromotionalTag } from "@/prisma/extendedModelTypes";
import { addNewPromotionalTag, ExtendedSectionlTagPrisma, getAllPromotionalTags } from "@/prisma/repository/sectionRepo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

      const sections : ExtendedSectionlTagPrisma[] = await getAllPromotionalTags();
      const safePromotionalTags = sanitizePromotionalTagList(sections)

      // console.log("safe promotions list", safePromotionalTags)
  
      return NextResponse.json({ tags:safePromotionalTags }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to fetch sections' }, { status: 500 });
    }
  }

  export async function POST(req: NextRequest ){

    try {
      const tagJson = await req.json();

      const res = await addNewPromotionalTag(tagJson)
      console.log("Promotioal Tag Response ", res)

      if(!res){
        return NextResponse.json({ message: 'Failed to Add Promotional Tag' }, { status: 500 });
      }
  
      return NextResponse.json({ message: 'Promotional Tag Details Added Successfully!', tag:res }, { status: 200 });
    } catch (error) {
      console.error("Error Adding New Promotional Tag:", (error as Error)?.message ?? error);
      return NextResponse.json({ message: 'Failed to Add Promotioal Tag' }, { status: 500 });
    }
  }
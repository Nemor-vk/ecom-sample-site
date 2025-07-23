import { Section } from "@/generated/prisma";
import { addNewPromotionalTag, getAllPromotionalTags } from "@/prisma/repository/sectionRepo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {

      const sections = await getAllPromotionalTags();
  
      return NextResponse.json({ sections}, { status: 200 });
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
  
      return NextResponse.json({ message: 'Promotioal Tag Details Added Successfully!', tag:res }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Add Promotioal Tag' }, { status: 500 });
    }
  }
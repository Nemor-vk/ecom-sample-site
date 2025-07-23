import { addNewPromotionalTag, deletePromotionAtId, updatePromotionalTag } from "@/prisma/repository/sectionRepo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { tagId: string } }) {

    const { tagId } = await params;

    try {
      const tagJson = await req.json();
      tagJson.id = tagId;

      const res = await updatePromotionalTag(tagJson)
      console.log("Promotioal Tag Response ", res)
  
      return NextResponse.json({ message: 'Promotioal Tag Details Updated Successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Update Promotioal Tag' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest ,{ params }: { params: { tagId: string } }) {

    const { tagId } = await params;

    try {

      const res = await deletePromotionAtId(tagId)
      console.log("Promotional Tag Response ", res)
  
      return NextResponse.json({ message: 'Promotioal Tag Details Deleted Successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Delete Promotioal Tag' }, { status: 500 });
    }
}
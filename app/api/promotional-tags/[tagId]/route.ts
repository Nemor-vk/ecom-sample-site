import { addNewPromotionalTag, deletePromotionAtId, updatePromotionalTag } from "@/prisma/repository/sectionRepo";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";

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
    const url = new URL(req.url);
    const override = url.searchParams.get('override') as string;
    const session = await auth();

    try {

      const res = await deletePromotionAtId(tagId, session?.user, override === 'true' )
      console.log("Promotional Tag Response ", res)
      console.log("Promotional API backend User Role ", session?.user?.role)
  
      return NextResponse.json({ message: res.message }, { status: res.code });
    } catch (error:unknown) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Delete Promotional Tag' }, { status: error?.code || 500 });
    }
}
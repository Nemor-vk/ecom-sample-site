import { addNewCategory, updateExistingCategory } from "@/prisma/repository/categoryRepo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    const { id } = await params;

    try {
      const categoryJson = await req.json();
      categoryJson.id = id;

      const res = await updateExistingCategory(categoryJson)
      console.log("Category Response ", res)
  
      return NextResponse.json({ message: 'Category Details Updated Successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Update Category Details' }, { status: 500 });
    }
  }
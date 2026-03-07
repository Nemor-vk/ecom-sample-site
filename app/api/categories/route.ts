import { NextRequest, NextResponse } from "next/server";
import { addNewCategory, getAllCategories, updateExistingCategory } from "@/prisma/repository/categoryRepo";

export async function GET(req: NextRequest) {
  try {
    const categories = await getAllCategories(); // Fetch the categories
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
    try {
      const categoryJson = await req.json();
      const result = await addNewCategory(categoryJson);

      if (!result) {
        return NextResponse.json({ message: 'Failed to Add Category' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Category Added Successfully!' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Failed to Add Category' }, { status: 500 });
    }
  }
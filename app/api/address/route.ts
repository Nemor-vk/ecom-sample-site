import { Address } from "@/generated/prisma";
import { addNewAddressForUserId, deleteAddressForUserId, getAllAddressForUserId } from "@/prisma/repository/addressRepo";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const newAddress:Address = await req.json();

    if(!userId) {
      throw new Error("Params Are Undefined")
    }

    const address = await addNewAddressForUserId(newAddress, userId)

    return NextResponse.json({status:200, success:true,});
  } catch (error) {

    console.error(error); // Better logging for error
    return NextResponse.json(
      { error: "Failed to update Product" , success:false, status:500}
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if(!userId || userId.length === 0) {
      return NextResponse.json(
      { error: "Required parameter missing" , success:false, status:400}
    );
    }

    const allAddress = await getAllAddressForUserId(userId)

    return NextResponse.json({status:200, success:true, address:allAddress});
  } catch (error) {

    console.error(error); // Better logging for error
    return NextResponse.json(
      { error: "Failed to Fetch all address - INTERNAL ERROR" , success:false, status:500}
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const addressId = searchParams.get("addressId");

    if(!userId || !addressId) {
      throw new Error("Params Are Undefined")
    }

    const allAddress = await deleteAddressForUserId(addressId, userId)

    return NextResponse.json({status:200, success:true});
  } catch (error) {

    console.error(error); // Better logging for error
    return NextResponse.json(
      { error: "Failed to get all address" , success:false, status:500}
    );
  }
}
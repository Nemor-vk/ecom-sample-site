import db from "@/lib/prisma";
import { findUserById } from "./userRepo";
import { Address } from "@/generated/prisma";

export async function getAllAddressForUserId(userId:string) {

  if (!userId) {
    throw new Error("Unauthorized to get all address.");
  }

  const allAddress = await db.address.findMany({
    where: {
      userId:userId,
    }
  })

  return allAddress;
}

export async function addNewAddressForUserId(newAddress: Address, userId:string) {

  const address = await db.address.create({
    data: {
      recipientName: newAddress.recipientName,
      primaryAddress: newAddress.primaryAddress,
      streetAddress: newAddress.streetAddress,
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
      phoneNumber: newAddress.phoneNumber,
      labelPreset: newAddress.labelPreset,
      customLabel: newAddress.customLabel,
      landmark: newAddress.landmark,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return address;
}

export async function updateAddressForUserId(updatedAddress: Address, userId:string) {

  const existingAddress = await db.address.findUnique({
    where: { id: updatedAddress.id },
  });

  if (!existingAddress) throw new Error("Address not found.");
  if (userId && existingAddress.userId !== userId) {
    throw new Error("Unauthorized to update this address.");
  }

  return await db.address.update({
    where: { id: updatedAddress.id },
    data: updatedAddress,
  });
}

export async function deleteAddressForUserId(addressIdForDelete:string, userId:string) {
  const existingAddress = await db.address.findUnique({
    where: { id: addressIdForDelete},
  });

  if (!existingAddress) throw new Error("Address not found.");
  if (userId && existingAddress.userId !== userId) {
    throw new Error("Unauthorized to delete this address.");
  }

  return db.address.delete({
    where: { id: addressIdForDelete },
  });
}


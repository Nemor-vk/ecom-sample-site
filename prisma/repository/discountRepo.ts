import { Discount } from "@/generated/prisma";
import db from "@/lib/prisma";
import { ExtendedDiscount } from "../extendedModelTypes";

const now = new Date();

export async function findAllActiveDiscounts () {

    const discounts = await db.discount.findMany({
      where: {
        isActive: true,
        validFrom: { lte: now },
        validUntil: { gte: now },
      }
    });

    return discounts;
}

export async function findAllDiscounts () {

    const discounts = await db.discount.findMany();
    return discounts;
}

export async function createNewDiscount (newDiscount: Discount, productIdList:string[], categoryIdList:string[]) {

    const discounts = await db.discount.create( {
        data : {
            ...newDiscount,
            products: {
                connect : productIdList.map(id => ({id}))
            },
            categories: {
                connect : categoryIdList.map(id => ({id}))
            }
        }
    });
    return discounts;
}

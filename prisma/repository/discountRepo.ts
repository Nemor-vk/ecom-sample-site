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

    const discounts = await db.discount.findMany({
        include: {
            products: true,
            categories: true,
            orders: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return discounts;
}

export async function addNewDiscount (newDiscount: Discount, productIdList:string[], categoryIdList:string[]) {

    const discounts = await db.discount.create( {
        data : {
            code: newDiscount.code,
            name: newDiscount.name,
            description: newDiscount.description,
            type: newDiscount.type,
            value: newDiscount.value,
            minOrderAmount: newDiscount.minOrderAmount,
            maxDiscountAmount: newDiscount.maxDiscountAmount,
            usageLimit: newDiscount.usageLimit,
            usageLimitPeriod: newDiscount.usageLimitPeriod,
            isActive: newDiscount.isActive,
            validFrom: newDiscount.validFrom,
            validUntil: newDiscount.validUntil,
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

export async function updateDiscountDetails(
id: string, discountData: Partial<Discount> & {
  productIdList?: string[];
  categoryIdList?: string[];
}, p0: any, p1: any) {
  // Fetch existing discount with products and categories
  const existing = await db.discount.findUnique({
    where: { id },
    include: { products: { select: { id: true } }, categories: { select: { id: true } } },
  });

  if (!existing) throw new Error("Discount not found");

  // Prepare product connect/disconnect arrays
  const oldProductIds = existing.products.map(p => p.id);
  const newProductIds = discountData.productIdList ?? oldProductIds;
  const toConnectProducts = newProductIds.filter(id => !oldProductIds.includes(id)).map(id => ({ id }));
  const toDisconnectProducts = oldProductIds.filter(id => !newProductIds.includes(id)).map(id => ({ id }));

  // Prepare category connect/disconnect arrays
  const oldCategoryIds = existing.categories.map(c => c.id);
  const newCategoryIds = discountData.categoryIdList ?? oldCategoryIds;
  const toConnectCategories = newCategoryIds.filter(id => !oldCategoryIds.includes(id)).map(id => ({ id }));
  const toDisconnectCategories = oldCategoryIds.filter(id => !newCategoryIds.includes(id)).map(id => ({ id }));

  // Remove productIdList and categoryIdList from discountData before update
  const { productIdList, categoryIdList, ...updateFields } = discountData;

  const updatedDiscountDetail = await db.discount.update({
    where: { id },
    data: {
      ...updateFields,
      products: {
        connect: toConnectProducts,
        disconnect: toDisconnectProducts,
      },
      categories: {
        connect: toConnectCategories,
        disconnect: toDisconnectCategories,
      },
    },
    include: {
      products: true,
      categories: true,
    },
  });

  return updatedDiscountDetail as ExtendedDiscount;
}

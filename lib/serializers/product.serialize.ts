import { Category, Discount, Image, Product, Section } from "@/generated/prisma";
import { ExtendedProduct, ExtendedPromotionalTag } from "@/prisma/extendedModelTypes";
import { ExtendedSectionlTagPrisma } from "@/prisma/repository/sectionRepo";

export type SerializedProduct = Omit<ExtendedProduct, "price" | "originalPrice"> & {
  price: number;
  originalPrice?: number | null;
};

export function sanitizeProduct(product: ExtendedProduct): SerializedProduct {
  return {
    ...product,
    price: product.price.toNumber(),
    originalPrice: product.originalPrice?.toNumber() ?? null,
  };
}

export function sanitizeProducts(products: ExtendedProduct[]): SerializedProduct[] {
  return products.map(sanitizeProduct);
}

export function sanitizePromotionalTagList(
  tagList: ExtendedSectionlTagPrisma[]
): ExtendedPromotionalTag[] {
  return tagList.map(sanitizePromotionalTag)
}

export function sanitizePromotionalTag(
  tag: ExtendedSectionlTagPrisma
): ExtendedPromotionalTag {
  return {
    ...tag,
    products: tag.products.map(sanitizeProduct),
  };
}




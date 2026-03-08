import { API_CONFIG } from "@/app/constants/apiContants";
import { PLACEHOLDER, siteApiConfig } from "@/lib/config/sitePathsConfig";
import { sanitizeProduct, sanitizeProducts, SerializedProduct } from "@/lib/serializers/product.serialize";
import { ExtendedProduct } from "@/prisma/extendedModelTypes";
import { findAllProducts, findProductById, findProductsByCategoryName } from "@/prisma/repository/productRepo";
import { toast } from "sonner";

export const dynamic = "force-dynamic"; // Next.js App Router

export const fetchProductById = async (id: string) => {
  try {
    // const response = await fetch(siteApiConfig.product.fetchById.replace(PLACEHOLDER, id), {
    //   method: "GET",
    //   headers: {
    //     "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
    //     "x-client-key": API_CONFIG.CLIENT_KEY,
    //   },
    // });
    // const data = await response.json();
    const product = await findProductById(id);
    if (!product) {
      console.error(`Product with ID ${id} not found.`);
      toast.error("Product not found");
      return null;
    }
    const safeProduct: SerializedProduct = sanitizeProduct(product);
    // console.log("api/product/id - API res::", data);
    return safeProduct;
  } catch (error) {
    console.error("Failed to fetch products error:", error);
    toast.error("Failed to load product");
  }
};

export const fetchAllProducts = async () => {
  try {
    // const response = await fetch(siteApiConfig.product.baseApi, {
    //   method: "GET",
    //   headers: {
    //     "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
    //     "x-client-key": API_CONFIG.CLIENT_KEY,
    //   },
    // });
    // const data = await response.json();

    const products: ExtendedProduct[] = await findAllProducts();
    const safeProducts: SerializedProduct[] = sanitizeProducts(products);
    // console.log("fetch all products API res:: ", data);
    // return data;
    return safeProducts;
  } catch (error) {
    console.error("Failed to fetch All products API error:", error);
    toast.error("Failed to load all products");
  }
};

export const fetchProductByCategoryName = async (name: string) => {
  try {
    // const response = await fetch(siteApiConfig.product.fetchByCategoryName.replace(PLACEHOLDER, name), {
    //   method: "GET",
    //   headers: {
    //     "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
    //     "x-client-key": API_CONFIG.CLIENT_KEY,
    //   },
    // });
    // const data = await response.json();
    // console.log("api/product/category - API res::", data);

    const products = await findProductsByCategoryName(name);
    const safeProducts: SerializedProduct[] = sanitizeProducts(products);

    return safeProducts;
  } catch (error) {
    console.error("Failed to fetch products by category API error:", error);
    toast.error("Failed to load products");
  }
};
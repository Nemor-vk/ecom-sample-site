import { API_CONFIG } from "@/app/constants/apiContants";
import { PLACEHOLDER, siteApiConfig } from "@/lib/config/sitePathsConfig";
import { toast } from "sonner";

export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(siteApiConfig.product.fetchById.replace(PLACEHOLDER, id), {
      method: "GET",
      headers: {
        "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
        "x-client-key": API_CONFIG.CLIENT_KEY,
      },
    });
    const data = await response.json();
    // console.log("api/product/id - API res::", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products error:", error);
    toast.error("Failed to load product");
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(siteApiConfig.product.baseApi, {
      method: "GET",
      headers: {
        "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
        "x-client-key": API_CONFIG.CLIENT_KEY,
      },
    });
    const data = await response.json();
    // console.log("fetch all products API res:: ", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch All products API error:", error);
    toast.error("Failed to load all products");
  }
};

export const fetchProductByCategoryName = async (name: string) => {
  try {
    const response = await fetch(siteApiConfig.product.fetchByCategoryName.replace(PLACEHOLDER, name), {
      method: "GET",
      headers: {
        "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
        "x-client-key": API_CONFIG.CLIENT_KEY,
      },
    });
    const data = await response.json();
    // console.log("api/product/category - API res::", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products by category API error:", error);
    toast.error("Failed to load products");
  }
};
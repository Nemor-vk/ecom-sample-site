'use server'
import { API_CONFIG } from "@/app/constants/apiContants";
import { siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";

export async function fetchAllCategories() {
  try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.categoriesApi.baseApi, {
      method: "GET",
      headers: {
        "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
        "x-client-key": API_CONFIG.CLIENT_KEY,
      },
    });

    const responseJson = await response.json();

    console.log("Fetch Categories API Response: ", responseJson); // Log the entire response object

    if (response.status !== 200 || !response.ok) {
      console.log("Failed to fetch categories", responseJson);
      return [];
    }

    return await responseJson;
  } catch (error) {
    console.log("Category Fetch Api Error: " + error);
    return [];
  }
}
// 'use server'
"use client"
import { API_CONFIG } from "@/app/constants/apiContants";
import { siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";
// import { headers } from "next/headers";

export async function fetchAllCategories() {
  try {
    // const headerList = await headers();
    // const host = headerList.get("host");
    const response = await fetch( "/api" + siteApiConfig.categoriesApi.baseApi,
      {
        method: "GET",
        headers: {
          "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
          "x-client-key": API_CONFIG.CLIENT_KEY,
        },
      },
    );

    const responseJson = await response.json();

    if(process.env.DEBUG_MODE === "true") {
      console.log("Fetch Categories API Response: ", responseJson); // Log the entire response object
    }

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
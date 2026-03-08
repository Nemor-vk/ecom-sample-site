"use client"
import { API_CONFIG } from "@/app/constants/apiContants";
import { Section } from "@/generated/prisma";
import { getClientConfig } from "@/lib/config/apiConfig";
import { siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";
import { getStatusMessage } from "@/lib/utils";
import { promotionalTagSchema } from "@/lib/validations";
import { promotionsResponseModel } from "@/models/promotions.ResponseModel";
import { ExtendedPromotionalTag } from "@/prisma/extendedModelTypes";
import { toast } from "sonner";
import { z } from "zod";

export async function getAllPromotionalTagsApi(setState:React.Dispatch<React.SetStateAction<ExtendedPromotionalTag[]>>){
  try {
    const response = await fetch(
      siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi,
      {
        method: "GET",
        headers: {
          "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
          "x-client-key": API_CONFIG.CLIENT_KEY, // or hardcoded for dev
        },
      }
    );
    const data = await response.json();
    console.log(`promotion tag api response :: ${response} \n Promotional tag data :: ${data.tags}`);
    setState(data.tags);
  } catch (error) {
    console.error("Failed to fetch Promotional-Tags Error:", error);
  }
}

export async function fetchAllPromotionalTagsApi(): Promise<ExtendedPromotionalTag[]> {
  try {

    const response = await fetch(
      siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi,
      {
        method: "GET",
        headers: {
          "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
          "x-client-key": API_CONFIG.CLIENT_KEY,
        },
      }
    );

    if (!response.ok) {
      // console.log(`API responded with status ${response.status}`);
      return []
    }

    const data = await response.json();
    // console.log("Promotional tag data:", data.tags);
    return data.tags;
  } catch (error) {
    console.log("Failed to fetch Promotional-Tags Error:", error);
    toast.error("Content Load Error", {
      description:
        "Promotions and product sliders couldn’t be loaded. Please refresh and try again.",
    });
    return [];
  }
}



export async function updatePromotionalTagApi(promotionlTag: z.infer<typeof promotionalTagSchema>, tagId:string){
  try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi + `/${tagId}`,
      {
        method: 'PUT',
        body: JSON.stringify(promotionlTag),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to Update Promotional-Tags Error:", error);
  }

  return null;
}

export async function addNewPromotionalTagApi(promotionlTag: z.infer<typeof promotionalTagSchema>){
   try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi,
      {
        method: 'POST',
        body: JSON.stringify(promotionlTag),
      }
    );
    const data = await response.json();
    return data.tag;
  } catch (error) {
    console.error("Failed to Add Promotional-Tags Error:", error);
  }

  return null;
}

export async function togglePromotionStatusApi(tagId: string, status:boolean){
   try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi + `/${tagId}`,
      {
        method: 'PUT',
        body: JSON.stringify(status),
      }
    );
    const data = await response.json();
    return data.tag;
  } catch (error) {
    console.error("Failed to Update Status of Promotional-Tags Error:", error);
  }

  return null;
}

export async function deletePromotionAtIdApi(tagId: string, override?:boolean){

  const baseUrl = `${siteBaseApiUrl}${siteApiConfig.promotionlTagApi.baseApi}/${tagId}`;
  const url = new URL(baseUrl);
  url.searchParams.set('override', String(override));

   try {
    const response = await fetch(url.toString(),
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    console.log("Promtions API message received: ", data)

    if(response.ok || response.status === 200) {
      toast.success("Promotion Deleted Successfully", {
          description: "Promotional tag has been deleted successfully.",
      })
    } else {
      toast.error(`${getStatusMessage(response.status)} ERROR : Failed To Delete Promotion`, {
          description: data.message,
      })
    }

    return response.status
  } catch (error) {
    toast.error("INTERNAL ERROR : Failed to delete Promotion", {description: 'Error' + error})
    console.error("Failed to Delete Promotional-Tags Error:", error);

    return 500
  }
}
import { Section } from "@/generated/prisma";
import { siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";
import { promotionalTagSchema } from "@/lib/validations";
import { toast } from "sonner";
import { z } from "zod";

export async function getAllPromotionalTagsApi(setState:React.Dispatch<React.SetStateAction<Section[]>>){
  try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi);
    const data = await response.json();
    setState(data.sections);
  } catch (error) {
    console.error("Failed to fetch Promotional-Tags Error:", error);
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

export async function deletePromotionAtIdApi(tagId: string){
   try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.promotionlTagApi.baseApi + `/${tagId}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    return data.tag;
  } catch (error) {
    console.error("Failed to Delete Promotional-Tags Error:", error);
  }

  return null;
}
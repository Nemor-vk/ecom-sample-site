import { siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";
import { ExtendedOrder } from "@/prisma/extendedModelTypes";

export async function getAllOrdersApi():Promise<ExtendedOrder[] | null>{
  try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.orders.baseApi);
    const jsonBody = await response.json();

    if (response.status === 200) {
      return jsonBody.order;
    } else {
      console.log("Error fetching orders:", jsonBody.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null
  }
}


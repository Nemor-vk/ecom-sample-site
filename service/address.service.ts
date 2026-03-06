import { API_CONFIG } from "@/app/constants/apiContants";
import { PLACEHOLDER, siteApiConfig } from "@/lib/config/sitePathsConfig";
import { toast } from "sonner";

export const fetchAllAddressesByUserId = async (userId: string) => {
  try {
    const response = await fetch(siteApiConfig.address.fetchById.replace(PLACEHOLDER, userId), {
      method: "GET",
    //   headers: {
    //     "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
    //     "x-client-key": API_CONFIG.CLIENT_KEY,
    //   },
    });
    const data = await response.json();
    console.log("fetch all addresses API res:: ", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch all addresses API error:", error);
    // toast.error("Failed to load all addresses");
  }
};

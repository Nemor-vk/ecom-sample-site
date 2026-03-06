import { API_CONFIG } from "@/app/constants/apiContants";
import { PLACEHOLDER, siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";
import { orderResponseModel } from "@/models/orders.responseModel";
import { ExtendedOrder } from "@/prisma/extendedModelTypes";
import { OrderRequestModel } from "@/types/types";
import { toast } from "sonner";

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

export async function fetchOrderByIdApi(orderId:string):Promise<ExtendedOrder | null>{
  try {
    console.log("Fetching order by ID:", siteBaseApiUrl + siteApiConfig.orders.fetchById.replace(PLACEHOLDER, orderId));
    const response = await fetch(siteBaseApiUrl + siteApiConfig.orders.fetchById.replace(PLACEHOLDER, orderId), {
      headers: {
        "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
        "x-client-key": API_CONFIG.CLIENT_KEY,
      },
    });
    const jsonBody:orderResponseModel = await response.json();
    console.log("Orders api response ", jsonBody)
    
    if (response.status === 200) {
      return jsonBody.order;
    }

    return null
  } catch (error) {
    console.error("Error fetching orderByID:", error);
    // toast.error('Order check failed due to server error', {description:'Oops! Your order didnt go through — Try Placing Order Again'})
    return null
  }
}

export async function createNewOrderApi(orderRequestData: OrderRequestModel):Promise<ExtendedOrder | null> {

  const { userId, paymentTotal, discountId, cartItems } = orderRequestData;
  console.log("Creating new order with data:", orderRequestData);

  try {
    const response = await fetch(siteBaseApiUrl + siteApiConfig.orders.baseApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        userId,
        discountId,
        paymentTotal,
      }),
    });
    
    console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    console.log("Create order API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating order:", errorData.message);
      return null;
    }

    const jsonBody = await response.json();
    console.log("Order created successfully:", jsonBody.order);
    return jsonBody.order;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
  
}


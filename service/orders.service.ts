import { siteApiConfig, siteBaseApiUrl } from "@/lib/config/sitePathsConfig";
import { ExtendedOrder } from "@/prisma/extendedModelTypes";
import { CartItemType, OrderRequestModel } from "@/types/types";

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


import { ExtendedOrder } from "@/prisma/extendedModelTypes";

export interface orderResponseModel {
    order:ExtendedOrder , 
    message: string,
    status: number
}
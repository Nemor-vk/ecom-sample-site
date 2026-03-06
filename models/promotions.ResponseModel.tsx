import { ExtendedPromotionalTag } from "@/prisma/extendedModelTypes";

export interface promotionsResponseModel {
    safePromotionalTags: ExtendedPromotionalTag[], 
    message?: string,
}
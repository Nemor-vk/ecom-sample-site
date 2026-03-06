'use client'

import { ExtendedPromotionalTag } from '@/prisma/extendedModelTypes';
import { fetchAllPromotionalTagsApi, getAllPromotionalTagsApi } from '@/service/promotionTags.service';
import React, { ReactNode, useEffect, useState } from 'react'
import { ProductSlider } from './ProductSlider';

const PromotionSliderWrapper = ({children}:{children:ReactNode}) => {

    const [promotionalTags, setPromotionalTags] = useState<ExtendedPromotionalTag[]>([]);

    useEffect(() => {     
        const loadPromotions = async() => {
            const promotionsData = await fetchAllPromotionalTagsApi();
            setPromotionalTags(promotionsData)
            // console.log("promotional Tags at slider wrapper", promotionsData)
        }

        loadPromotions();
    }, [])


  return (
    <div>
        <SliderComponent promotionName='Trending' promotion={promotionalTags} className={''} />
        {children}
        
        <SliderComponent promotionName='New Arrivals' promotion={promotionalTags} className={''} />
        <SliderComponent promotionName='Electronics' promotion={promotionalTags} className={''} />
    </div>
  )
}

const SliderComponent =  ({promotion, promotionName, className} : {promotion:ExtendedPromotionalTag[], promotionName:string, className?:string}) => {

    const tag = promotion.find(
        promo => promo.name.replace(/\s/g, '') === promotionName.replace(/\s/g, '')
    );

    console.log("tag details slider wrapper ::", tag)

    return (
        <>
            { tag && <ProductSlider title={tag.name} subtitle={tag?.description || ''} products={tag?.products || []} className={className} /> }
        </>
    )
}

export default  PromotionSliderWrapper
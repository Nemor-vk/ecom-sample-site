'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CURRENCY, IMAGE_CONSTANTS, ROUTES } from '@/app/constants';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { ExtendedProduct, ExtendedPromotionalTag } from '@/prisma/extendedModelTypes';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { envConfig } from '@/lib/envConfig';
import Link from 'next/link';


type ProductSlideProps = {
    pageTitle: string,
    description: string,
    featuredProducts: ExtendedProduct[],
};
  

const ProductSlide = ({pageTitle, description, featuredProducts} : ProductSlideProps) => {

      if(featuredProducts && featuredProducts.length <= 0) return <></> //dont render if no products

  return (
    <div className='mt-5 md:my-4 w-full flex flex-col md:items-center'>
      <h2 className="my-6 text-start text-2xl md:text-4xl w-full capitalize">{pageTitle}</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="md:w-[95%]"
      >
        <CarouselContent>
          {featuredProducts.map(product => (
            <CarouselItem key={product.id} className="basis-2/5 lg:basis-1/5">
              <div className="p-1">
                <Link href={`${ROUTES.SHOP + product.category?.name.toLowerCase()}/${product.id}`} key={product.id}>
                  <ProductSlideCard product={product}/>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ProductSlide

const ProductSlideCard = ({product}:{product:ExtendedProduct}) => {

  return (
    <Card className='border-4 pt-0'>
      <CardContent className="flex flex-col aspect-4/6 max-h-[400px] p-0">
        <div className='relative h-full w-full'>
          <div  className='rounded-full flex justify-center items-center p-0.5 px-1.5 md:px-2 gap-0.5 bg-background z-10 absolute bottom-4 left-2.5 md:left-4 text-gray-800 text-base'>
            <span className='text-[10px] md:text-sm text-foreground'>{product.rating}</span>
            <Star size={15} fill='#DAA520' color='#DAA520' className='mb-0.5'/>
          </div>
        <Image src={ product.image?.[0]?.url ? envConfig.env.imageKit.url + product.image[0].url : IMAGE_CONSTANTS.PLACEHOLDER_GALLERY_IMG} fill style={{objectFit:"contain"}} alt='product' className='bg-white object-top z-0 rounded-t-xl' />
        </div>
        <div className='px-1.5 md:px-4 pb-2 md:py-4 text-sm md:text-xl'>
          <span className='line-clamp-1'>{product.name}</span>
          <span>{(CURRENCY.INR + " " + product.price)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
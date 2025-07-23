'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import StarRating from './StarRating'
import { Heart, PackageOpen, Share, ShieldCheck, Truck } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { CURRENCY } from '@/app/constants'
import { Image as productImages } from '@/generated/prisma'
import { useCartStore } from '@/store/cartStore'
import { ExtendedProduct } from '@/prisma/extendedModelTypes'


const ProductPage = ({productImages, productName, productPrice, productRating, product} : {productImages:productImages[], productName:string, productRating:number, productPrice:number, product:ExtendedProduct}) => {

    const variants = ['256gb', '512gb'];
    const [selectedImage, setSelectedImage] = useState(productImages[0].url);
    const {addToCart} = useCartStore();
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
      <section className='p-8 flex flex-col items-center h-full'>
          <figure className='relative flex flex-col justify-center gap-4 max-w-[600px]'>
              <Image src={ 'https://ik.imagekit.io/vivekecom' + selectedImage} height={500} width={500} alt='card' className='rounded-md object-cover aspect-square w-full max-w-[600px] border-4 border-muted/80' />
              <div className='grid gap-4 w-full grid-cols-5 h-[50px]'>
              {productImages.map((productImg, index) => (
                    <Image src={'https://ik.imagekit.io/vivekecom' + productImg.url} key={index} height={100} width={100} onClick={() => {setSelectedImage(productImg.url)}} className={`transition-none rounded-md object-cover aspect-square w-full border-2 border-gray-100 ${selectedImage === productImg.url ? 'outline-3 outline-fuchsia-300' : '' }` } alt={productImg.altText? productImg.altText : ''} />
              ))}
              </div>
          </figure>
      </section>

      <section className='p-8 flex flex-col gap-1 max-h-screen justify-around'>
          <section>
          <h1 className='text-3xl my-2'>{productName}</h1>
          <div className='flex align-bottom'>
              <StarRating rating={productRating}/>
              <div className='text-base align-baseline ml-4'>{productRating}</div>
          </div>
          {/* <hr className='border-0.5 border-gray-500 mt-2'/> */}
          
          <div className='flex items-center mt-6 mb-12 justify-between'>
              <span className='inline-block text-2xl'>{CURRENCY.INR + productPrice}</span>
              <div className='flex gap-2 -translate-y-0.5'>
                  <Share/>
                  <Heart size={24}/>
              </div>
          </div>

          <div className='flex flex-col gap-1 rounded-md p-5 bg-neutral-200 dark:bg-card my-5 max-w-fit'>
              <p className='mb-2'>Offers</p>
              <div className='font-thin text-xs flex flex-col gap-2'>
                  <div className='flex space-x-5'>
                      <p className='truncate'>Flat ₹4500 Off on HDFC Credit Card & ₹5000 on Credit EMIs</p>
                      <Link className='whitespace-nowrap inline text-yellow-800 dark:text-blue-200' href={'/'}>{'learn more>'}</Link>
                  </div>
                <div className='flex space-x-5'>
                      <p className='truncate'>Flat ₹4500 Off on HDFC Credit Card & ₹5000 on Credit EMIs</p>
                      <Link className='whitespace-nowrap inline text-yellow-800 dark:text-blue-200' href={'/'}>{'learn more>'}</Link>
                </div>
              </div>
          </div>
          </section>

          <section className='h-[150px]'>
          {/* <div className='text-2xl py-4'>
              <div>Color</div>
              <div className=' flex gap-4 py-2'>
                  {Array.from({length:5}, (_, index) => (
                      <div key={index} className='rounded-full h-8 w-8 bg-amber-800 border-3 border-white outline-2 outline-gray-500'>

                      </div>
                  ))}
              </div>
          </div> */}

          {/* <div className='text-2xl py-2.5'>
              <div className='mb-2'>Variant</div>
              <ul className='grid grid-cols-4 gap-4'>
              {variants.map((variant) => (
                <li key={variant}>
                <Button variant={'outline'} size={'lg'} onClick={() => {setSelectedVariant(variant)}} className={`border-gray-300 border-2 text-sm dark:text-muted-foreground md:text-lg hover:bg-orange-200 w-full md:py-5 transition-none ${selectedVariant === variant ? 'outline-2  md:outline-3 shadow-lg outline-blue-200 dark:outline-white dark:text-white' : 'text-foreground/70'}`}>{variant}</Button>
                </li>
                ))}
                </ul>
                </div> */}
          </section>

          <section>
            <ProductFulfillmentOptions/>
          <div className='grid grid-cols-2 gap-4 mt-16'>
            <Button className='py-8' onClick={()=>addToCart(product)}>Add to cart</Button>
            <Button asChild className='py-8 cursor-pointer' onClick={()=>addToCart(product)}>
                <Link href={'/cart'}>Buy Now</Link>
            </Button>
          </div>
          </section>
      </section>
    </div>
  )
}

export default ProductPage

const ProductFulfillmentOptions = () => {
  return (
    <div className="grid grid-cols-5 text-center text-[10px] md:text-xs gap-2 dark:text-muted-foreground my-12">
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 dark:bg-muted rounded-full p-2 mb-1.5">
          <Truck />
        </div>
        <span>2-4 Days Free Delivery</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 rounded-full dark:bg-muted p-2 mb-1.5">
          <PackageOpen />
        </div>
        <span>7 days Service Center Replacement</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 dark:bg-muted rounded-full p-2 mb-1.5">
          <ShieldCheck />
        </div>
        <span>1 Year Warrany</span>
      </div>
    </div>
  );
};

'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Label } from './ui/label';
import ImageViewer from './ImageViewer';
import { ExtendedProduct } from '@/prisma/extendedModelTypes';
import { CURRENCY } from '@/app/constants';
import { useCartStore } from '@/store/cartStore';
import ButtonWithCount from './ButtonWithCount';
  

const ProductCard = ({product} : {product: ExtendedProduct}) => {

  const{cartItems, addToCart, increaseQuantity, decreaseQuantity} = useCartStore();
  const isInCart = cartItems.find(item => item.product.id === product.id);
  const increaseCount = () => {
    increaseQuantity(product.id)
  }
  const decreaseCount = () => {
    decreaseQuantity(product.id)
  }

  return (
    <Card className='pt-1.5 relative w-full' key={product.id}>
      <CardContent className='px-1.5 relative min-h-[180px]'>
        <Image src={'https://ik.imagekit.io/vivekecom' + product.image[0]?.url || '/assets/banners/girlModel2.jpg'} fill style={{objectFit:'contain'}} alt='card' className='bg-white rounded-md aspect-square' />
                      {/* <ImageViewer filePath={product.image[0]?.url || ""} height={280} width={280} className='rounded-md aspect-square'/> */}
      <Badge variant="outline" className='absolute bottom-2.5 left-4 rounded-full border-0.5 shadow-md bg-blue-200 dark:bg-blue-200 dark:text-background text-[8px] md:text-[10px]'>{product.category.name}</Badge>
      </CardContent>
      <CardHeader className='px-4 my-2 text-sm' style={{height: 'calc(3em + 36px + (0.375rem * 2))'}}>
        <CardTitle className='text-sm line-clamp-2'  style={{height: 'cal(2em + 14px)'}}>{product.name}</CardTitle>
        <div className='flex justify-between items-center text-sm'>
          <span>{CURRENCY.INR}{product.price.toString()}</span>
          { isInCart
            ? <ButtonWithCount count={isInCart.quantity} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
            : <Button variant={'outline'} className='text-xs text-center border-gray-400' onClick={(event)=> {event.preventDefault(); addToCart(product)}}>ADD</Button>
          }
        </div>
      </CardHeader>
    </Card>
  );
}

export default ProductCard
'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ChevronRight, Minus, Plus, Tags } from 'lucide-react'
import { Separator } from './ui/separator'
import { useCartStore } from '@/store/cartStore'
import { ExtendedProduct } from '@/prisma/extendedModelTypes'
import { Decimal } from '@/generated/prisma/runtime/library'
import { envConfig } from '@/lib/envConfig'
import ButtonWithCount from './ButtonWithCount'
import { CHARGES, CURRENCY, ROUTES } from '@/app/constants'
import Link from 'next/link'
import AddressPage from './AddressPage'

interface cartItem {
    quantity: number,
    productItem: ExtendedProduct,
    variants: Record<string, string>;
}

const calculateItemTotal = (items:cartItem[]) => {
  return items.reduce((total, item) => total + convertDecimalToNumber(item.productItem.price) * item.quantity, 0);
};

const calculateGst = (totalPrice:number, gstPercentage:number) => {
    return totalPrice * (gstPercentage / 100 );
}

function convertDecimalToNumber(price:Decimal) {
    return parseFloat(Number(price.toString()).toFixed(2));
}

function calculateFinalTotal(itemsTotal:number,discount?:number) {
    const gstCharges = calculateGst(itemsTotal,18);
    return itemsTotal + gstCharges + CHARGES.SHIPPING + CHARGES.PLATFORM_FEES - (discount ?? 0);
}


const Cart = () => {

    const {cartItems,decreaseQuantity, increaseQuantity, addToCart} = useCartStore();
    const maxPriceLength = Math.max(...cartItems.map(item => convertDecimalToNumber(item.productItem.price))).toString().length;
    const [itemTotal, setItemTotal] = useState(0);

    useEffect(() => {
      setItemTotal(calculateItemTotal(cartItems));
    }, [cartItems]);
    

  return (
    <div className='bg-muted-gray dark:bg-accent min-h-screen rounded-md p-4 md:p-8 flex flex-col md:flex-row gap-5'>
        <div className='basis-1 md:basis-2/3'>
            <div>
                <h2>Review your Order</h2>
                <div className='bg-background rounded-md p-5 mt-2.5'>
                    {
                        cartItems.map((item) => (
                            <div key={item.productItem.id} className='flex gap-4 my-5 items-center'>
                                <Link href={ROUTES.SHOP + item.productItem.category.name.toLowerCase() + "/" + item.productItem.id} className='aspect-square  h-[70px] md:h-[100px]'>
                                    <Image src={envConfig.env.imageKit.url + item.productItem.image[0].url} height={100} width={100} objectFit='cover' alt='card' className='rounded-md aspect-square self-start' />
                                </Link>
                                <div className='align-text-top self-baseline flex flex-col gap-1 w-full'>
                                    <span className='text-xs md:text-base line-clamp-2 min-w-[68px]'>{item.productItem.name}</span>
                                    <span className='text-muted-foreground text-[10px] md:text-sm min-w-[68px]'>{item.productItem.category.name}</span>
                                    {/* <Button variant={'outline'} size={'container'} asChild>
                                        <span className='text-muted-foreground text-[10px] md:text-sm w-fit px-2.5 py-1'>
                                            size : XS
                                        </span>
                                    </Button> -- variants not needed now */}
                                </div>
                                <div className='flex gap-5'>
                                    <ButtonWithCount count={item.quantity} increaseCount={() => increaseQuantity(item.productItem.id)} decreaseCount={() => decreaseQuantity(item.productItem.id)} />
                                    <span className='text-sm md:text-lg' style={{ width: `calc(${maxPriceLength} * 12px)` }}>{CURRENCY.INR + convertDecimalToNumber(item.productItem.price)}</span>
                                    </div>
                            </div>
                        ))
                    }
                </div>
                {/* Seperator - Suggestions & call to actions */}
                <SuggestionSection/>
        </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='basis-1 md:basis-1/3'>
            <CouponSection/>
            <AddressPage/>
            <BillSummary cartItems={cartItems} itemTotal={itemTotal}/>

        </div>
    </div>
  )
}

export default Cart

const BillSummary = ({cartItems, itemTotal}:{cartItems:cartItem[], itemTotal:number}) => {

    return (
        <div className=''>
            <h2>Bill Details</h2>
            <div className='bg-background rounded-md p-5 mt-2.5'>
                <div className='flex flex-col gap-2'>
                    <div className='flex'>
                        <div className='w-full'>Items Total</div>
                        <span>{CURRENCY.INR + itemTotal.toFixed(2)}</span>
                    </div>
                    <div className='flex text-muted-foreground'>
                        <div className='w-full'>GST</div>
                        <span>{CURRENCY.INR + calculateGst(itemTotal, 18).toFixed(2)}</span>
                    </div>
                    <div className='flex text-muted-foreground'>
                        <div className='w-full'>Discount</div>
                        <span>
                            <Button variant={'link'} size={'container'} className='text-muted-foreground'>Apply Discount</Button>
                        </span>
                    </div>
                    <div className='flex text-muted-foreground'>
                        <div className='w-full'>Shipping</div>
                        <span>{CURRENCY.INR + CHARGES.SHIPPING}</span>
                    </div>
                    <div className='flex text-muted-foreground'>
                        <div className='w-full'>Platform fees</div>
                        <span>{CURRENCY.INR + CHARGES.PLATFORM_FEES}</span>
                    </div>
                </div>
                <Separator className='my-4'/>
                <div className='flex'>
                    <div className='w-full'>To Pay</div>
                    <span>{CURRENCY.INR + calculateFinalTotal(itemTotal)}</span>
                </div>
                <Button className='mt-8 w-full py-7 text-base font-semibold uppercase'>Place Order</Button>
            </div>
        </div>
    )
}

const CouponSection = () => {

    return (
        <div className='my-5'>
            <h2>Savings & Discount</h2>
            <div className='bg-background rounded-md p-5 mt-2.5 flex items-center gap-5 pt-8'>
                <div className='bg-amber-400 dark:bg-blue-400 rounded-md w-fit p-[4px]'>
                    <Tags size={20} className='scale-x-[-1] text-background'/>
                </div>
                <div className='w-full'>Apply Coupon</div>
                <ChevronRight className='text-gray-500 dark:text-muted-foreground'/>
            </div>
        </div>
    )
}

const SuggestionSection = () => {

    return (
        <div className='flex justify-center items-center bg-background rounded-md p-5 my-5 capitalize'>
            <span>Missed something?</span>
            <Button variant={'link'} size={'container'} className='text-yellow-700 dark:text-yellow-400 px-2.5 capitalize text-base cursor-pointer'>
                Add more items
            </Button>
        </div>
    )
}
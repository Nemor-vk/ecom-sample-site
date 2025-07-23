import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { DEFAULT_IMG_SIZES } from '@/app/constants';

type CardProps = {
    title: string;
    promo: string;
    discount: boolean;
    cashback: boolean;
    path: string
};

const Cards = ({title, promo, discount, cashback, path} : CardProps) => {
  return (
    <div className='bg-blue-500 aspect-5/4 w-full rounded-2xl px-8 py-5 flex flex-col justify-between relative hover:outline-4 outline-amber-200 hover:scale-102'>
      <Image src={path} fill style={{objectFit:"cover"}} alt='hero' className='object-center z-0 rounded-2xl' sizes={DEFAULT_IMG_SIZES}/>
       <div className='z-10'>
        <div className='text-xl'>{title}</div>
        <Link href={'/'} className='text-lg'>
        <Button variant={'link'} className='p-0 text-lg has-[>svg]:px-0'>Browse <ChevronRight/></Button>
        </Link>
       </div>
       <div className='z-10'>
        {discount && <span>Flat</span>}
        <p className='text-4xl md:text-6xl'>{promo}</p>
        {cashback && <span>Cashback</span>}
       </div> 
    </div>
  )
}

export default Cards
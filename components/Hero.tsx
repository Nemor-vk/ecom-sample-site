import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { ALL_CATEGORIES, ROUTES } from '@/app/constants'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className=' w-full'>
      <div className='relative h-[60svw] sm:h-[48vw] md:h-[46svw] xl:h-[40svw] min-h-[15rem] max-h-[45rem] rounded-xl'>
        <Image src={'/assets/banners/girlModel2.jpg'} quality={100}  priority fill style={{objectFit:"cover"}} alt='hero' className='object-left-top rounded-t-[2rem] 2xl:rounded-t-[4rem] z-0' />
        <div className='relative top-8 left-7 sm:top-10 sm:left-14 2xl:top-28 2xl:left-28 z-10 capitalize'>
          <div className='flex flex-col gap-1 2xl:gap-5'>
            <h2 className='text-[7vw] 2xl:text-9xl font-bold'>Summer Sale</h2>
            <span className='text-[4vw] 2xl:text-5xl'>upto 50% off</span>
            <p className='text-[2vw] 2xl:text-xl w-[48%] 2xl:w-[35%]'>Shop from our exciting & new range of products today to get upto 50% off this Summer Sale.</p>
          </div>
          <Link href={ROUTES.SHOP + ALL_CATEGORIES}>
            <Button size={'default'} variant={'default'} className='capitalize mt-6 text-xs 2xl:text-base 2xl:mt-10 pointer md:p-6'>shop now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
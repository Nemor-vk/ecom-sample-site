import React from 'react'
import { Button } from './ui/button'
import { COLLAGE_PROMO, DEFAULT_IMG_SIZES } from '@/app/constants'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const DisplayCollage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-2 items-center justify-center gap-1 md:gap-4 grid-flow-dense my-10 lg:my-12 md:aspect-6/2.7 w-full md:max-h-[800px]'>
      {COLLAGE_PROMO.map((collageItem) => (
        <div className={`h-full capitalize rounded-[6px] relative ${collageItem.spanClass}`} key={collageItem.title}>
          <Image src={collageItem.imgPath} fill  style={{ objectFit: 'cover' }} alt='card' className='rounded-md' sizes={DEFAULT_IMG_SIZES}/>
            <div className={cn('relative text-sm top-[15vw] left-[2rem] md:top-[8vw] md:left-[4vw] aspect-3/2', collageItem.style)}>
                <span className='text-xs md:text-lg block w-[80%]'>{collageItem.subTitle}</span>
                <h2 className='text-lg md:text-2xl mb-1.5 md:mb-5'>{collageItem.title}</h2>
                <Button className='mt-2 md:text-base cursor-pointer' variant={'secondary'}>Shop Now</Button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayCollage
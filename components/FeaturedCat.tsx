import { IMAGE_CONSTANTS, ROUTES, SECTION_TYPE} from '@/app/constants'
import { Category } from '@/generated/prisma'
import { envConfig } from '@/lib/envConfig'
import { findCategoriesBySectionName } from '@/prisma/repository/categoryRepo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedCat = async () => {

  const featuredCategories: Category[] = await findCategoriesBySectionName(SECTION_TYPE.TRENDING);
  const imageKitUrl = envConfig.env.imageKit.url
  

  return (
    <div className='relative flex flex-col items-center -mt-15 z-20 w-full text-foreground'>
        <div className='relative grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-6 xl:gap-8 bg-background w-full px-4 py-10 md:py-12 2xl:py-18 rounded-t-4xl 2xl:rounded-t-[4rem] top-8 2xl:top-0'>
           {featuredCategories.map((featuredCategory) => (
            <Link href={ROUTES.SHOP + featuredCategory.name.toLowerCase()} scroll={true} className='aspect-[4.5/5] p-2 text-center hover:scale-104 ' key={featuredCategory.id}>
                <div className='relative h-full'>
                  {
                    featuredCategory.imageUrl != null &&
                    <Image src={featuredCategory.imageUrl ? imageKitUrl + featuredCategory.imageUrl : IMAGE_CONSTANTS.PLACEHOLDER_GALLERY_IMG} fill style={{objectFit:"cover"}} alt='cat' className='rounded-[18px] hover:outline-5' />
                  }
                </div>
                <span className='pt-4 text-sm md:text-xl font-medium inline-block'>{featuredCategory.name}</span>
            </Link>
           ))}
        </div>
    </div>
  )
}

export default FeaturedCat
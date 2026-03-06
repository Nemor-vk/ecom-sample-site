'use client'

import React, { useEffect, useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { ALL_CATEGORIES, CAT } from '@/app/constants';
import { toast } from 'sonner';
import { Category } from '@/generated/prisma';
import Link from 'next/link';
import { fetchAllCategories } from '@/service/category.service';
  

const CategoryDropDown = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        loadCategories();
    },[])
    


    async function loadCategories() {
      
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);
        // console.log("Categories Received In category dropdown " , categoriesData);

        // if(!categories || categories.length === 0) toast.error("Failed to load Categories", {description:'Oops! Failed to load category DropDown - Please Reload'})
    }


  return (
    <div>
      <NavigationMenu >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='px-5 py-6 text-base hover:bg-background/70focus:bg-background/70 data-[state=open]:bg-background/70 data-[state=open]:hover:bg-background/70 data-[state=open]:focus:bg-background/70'>Category</NavigationMenuTrigger>
            <NavigationMenuContent className=''>
            <ul className="grid w-[700px] grid-cols-4 gap-2 p-4">
              {categories.map((category) => (
                <NavigationMenuLink asChild key={category.id} className='bg-gray-100 dark:bg-background/40 dark:hover:bg-background/70 hover:bg-accent' >
                  <Link href={`/shop/${category.name.toLowerCase().replace(/\s+/g, '_')}`} className='flex flex-col gap-2 p-4'>
                  <div className='text-base'>{category.name}</div>
                  <span className='text-xs text-gray-600 line-clamp-2'>{category.description != null ? category.description : "" }</span>
                  </Link>
                </NavigationMenuLink>
              ))}
                <NavigationMenuLink asChild className='bg-gray-100 dark:bg-background/40 dark:hover:bg-background/70 hover:bg-accent' >
                  <Link href={`/shop/${ALL_CATEGORIES.toLowerCase()}`}>
                  <div className='text-base'>All Products</div>
                  <span className='text-xs text-gray-600 line-clamp-2'>Explore all products across categories</span>
                  </Link>
                </NavigationMenuLink>
            </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default CategoryDropDown
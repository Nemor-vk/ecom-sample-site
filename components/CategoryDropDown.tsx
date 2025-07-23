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
  

const CategoryDropDown = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories();
    },[])
    


    async function getAllCategories () {
        try{
            const response = await fetch("/api/categories");
            if (!response.ok) throw new Error("Failed to fetch categories");
            setCategories(await response.json())
            console.log( categories )
          } catch (error) {
              console.log('error: ' + error)
          }
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
                <NavigationMenuLink asChild key={category.id} className='bg-background/40 hover:bg-background/70 ' >
                  <Link href={`/shop/${category.name.toLowerCase()}`}>
                  <div className='text-base'>{category.name}</div>
                  <span className='text-xs text-gray-600 line-clamp-5'>{category.description != null ? category.description : "" }</span>
                  </Link>
                </NavigationMenuLink>
              ))}
                <NavigationMenuLink asChild className='bg-background/40 hover:bg-background/70' >
                  <Link href={`/shop/${ALL_CATEGORIES.toLowerCase()}`}>
                  <div className='text-base'>All Products</div>
                  <span className='text-sm text-gray-600'>Explore all products across categories</span>
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
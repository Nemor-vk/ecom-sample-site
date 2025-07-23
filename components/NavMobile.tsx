"use client"

import { NAV_ITEMS } from '@/app/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CategoryDropDown from './CategoryDropDown'
import { CircleUserRound, House, LayoutGrid, ShoppingCart, X } from 'lucide-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Category } from '@/generated/prisma'
  

const NavMobile = () => {

        const pathname = usePathname();
        const iconSize = 20;
        const logoSize = 50;
        const listStyle = 'p-2';
        const linkStyle = 'flex flex-col font-thin text-base cursor-pointer capitalize flex items-center text-xs';
        const [categories, setCategories] = useState<Category[]>([]);
        const [isDrawerTriggered, setisDrawerTriggered] = useState(false)

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
    <footer className=' bg-[#70bfff] w-full fixed z-20 bottom-0 py-4 px-5 md:hidden'>
        <Drawer open={isDrawerTriggered} onOpenChange={setisDrawerTriggered}>
            {/* <DrawerTrigger>Open</DrawerTrigger> */}
            <DrawerContent className='h-fit md:hidden data-[vaul-drawer-direction=bottom]:max-h-[100vh]'>
            <DrawerTitle className='sr-only'>All Categories</DrawerTitle>
                <div className='mt-4 p-5 h-fit grid gap-2 grid-cols-[repeat(auto-fit,minmax(100px,0.33fr))] grid-row-auto'>
                {categories.map((category) => (
                    <div key={category.id} className=' rounded-md aspect-4/5 relative p-1'>
                        <div className='relative h-full w-full'>
                            <Image src={category.imageUrl || '/assets/banners/girlModel2.jpg'} fill objectFit='cover' alt='card' className='rounded-md z-0' />
                        </div>
                        <span className='text-base inline-block w-full z-10 relative pt-2.5'>{category.name}</span>
                    </div>
                ))}
                </div>
                <DrawerClose className='mb-5 mx-auto '>
                    <X size={30}/>
                </DrawerClose>
            </DrawerContent>
        </Drawer>

        <nav className=''>
            <ul className='flex items-center justify-between gap-4 w-full'>
                <li className={listStyle}>
                    <Link href={'/'} className={cn(linkStyle, pathname === '/' ? 'text-yellow-400' : 'text-black')}>
                    <House size={iconSize} className='text-gray-800/80' />
                    <span className='text-slate-800/80'>Home</span>
                    </Link>
                </li>
                <li className={listStyle} onClick={() => {setisDrawerTriggered(!isDrawerTriggered)}}>
                    <div className={cn(linkStyle, pathname === '/' ? 'text-yellow-400' : 'text-black')}>
                    <LayoutGrid size={iconSize} className='text-gray-800/80'/>
                    <span className='text-slate-800/80'>Categories</span>
                    </div>
                </li>
                <li className={listStyle}>
                    <Link href={'/'} className={cn(linkStyle, pathname === '/' ? 'text-yellow-400' : 'text-black')}>
                    <CircleUserRound size={iconSize} className='text-gray-800/80'/>
                    <span className='text-slate-800/80'>Account</span>
                    </Link>
                </li>
                <li className={listStyle}>
                    <Link href={'/'} className={cn(linkStyle, pathname === '/' ? 'text-yellow-400' : 'text-black')}>
                    <ShoppingCart size={iconSize} className='text-gray-800/80'/>
                    <span className='text-slate-800/80'>Cart</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default NavMobile
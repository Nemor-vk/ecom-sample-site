'use client'

import React, { useEffect } from 'react'
import { useSideBarDrawer } from '@/store/tableActions'
import ProductEditPage from './ProductEditPage'
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator';


const SidePopupDrawer = () => {

  const {isOpen, data, onClose} = useSideBarDrawer();

  return (
     <div className={cn('w-max h-screen overflow-hidden absolute top-0 right-0 transition-all duration-300 z-50 bg-card pb-2 pt-5', isOpen ? "opacity-100 scale-100" : "opacity-0 scale-100 hidden")}>
      <h2 className="text-2xl font-bold tracking-tight text-start px-5 mt-4">Edit Product</h2>
      <Separator className='outline-1 mt-4'/>
        <ScrollArea className='h-full overflow-auto hide-scrollbar pb-12 '>
          {isOpen && <ProductEditPage product={data}/>}
        </ScrollArea>
      </div>
  )
}

export default SidePopupDrawer
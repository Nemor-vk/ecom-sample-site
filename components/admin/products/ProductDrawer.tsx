'use client'

import React from 'react'
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
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductEditPage from '../ProductEditPage';
import { useSideBarDrawer } from '@/store/tableActions';

const ProductDrawer = ({refreshContent}:{refreshContent:() => void}) => {
    const {isOpen, data, onClose} = useSideBarDrawer();

  return (
    <Drawer direction='right' open={isOpen} onOpenChange={(val) => (val ? open() : close())} dismissible={false}>
      <DrawerContent className='overflow-auto hide-scrollbar' onCloseAutoFocus={onClose}>
        <div>

        <DrawerHeader>
          <DrawerTitle>Edit Product</DrawerTitle>
          <DrawerDescription className='sr-only'>Edit Product content</DrawerDescription>
        </DrawerHeader>
        {/* <h2 className="text-2xl font-bold tracking-tight text-start px-5 mt-4">Edit Product</h2> */}
      <Separator className='outline-1 mt-4'/>
        <ScrollArea className='h-fit overflow-auto hide-scrollbar w-full pb-0'>
          {isOpen && <ProductEditPage refreshContent={refreshContent} product={data}/>}
        </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer
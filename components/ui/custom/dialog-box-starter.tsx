'use client'

import React, { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Category } from '@/generated/prisma';
import { useGenericDialogStore } from '@/store/tableActions';
import { ScrollArea } from '../scroll-area';
import { Separator } from '../separator';

interface DialogBoxProps {
    heading:string,
    description: string,
    children: ReactNode,
    // isOpen:boolean,
    // onOpenChange:(open:boolean) => void
}

export const DialogBoxGeneric = ({heading, description, children}: DialogBoxProps) => {

  const { isOpen , open, close } = useGenericDialogStore()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? null : close())}>
      <DialogTrigger className="sr-only">Open</DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col p-1.5 items-center">
        <DialogHeader className="px-7 pt-5 w-full">
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Separator className='outline-1 mt-4 mb-1.5'/>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-auto pb-5 hide-scrollbar">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
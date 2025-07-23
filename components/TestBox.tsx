"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown, Cross, X } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Input } from "./ui/input"
import TableList from "./admin/TableList"
import { ExtendedProduct } from "@/prisma/extendedModelTypes"
import { productColumns } from "@/lib/tableSchemas/productColumnsold"
import SidePopupDrawer from "./admin/SidePopupDrawer"



const TestBox = ({data} : {data:ExtendedProduct[]}) => {

  return (
    <>
       <div className='mt-8'>
        
        </div>
    </>
  );


 }
 
 export default TestBox

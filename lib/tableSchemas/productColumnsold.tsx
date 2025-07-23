'use client'

import { ExtendedProduct } from "@/prisma/extendedModelTypes"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import Link from "next/link"
import { useSideBarDrawer } from "@/store/tableActions"
import { useState } from "react"
import { Image as ImageInterface } from "@/generated/prisma"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"



const deleteProductById = async (productId: string) => {
  try {
      const response = await fetch(`http://localhost:3000/api/product/${productId}`,{
        method: "DELETE",
      });
  
      const data = await response.json();
      
      toast.success("product deleted successfully")

  } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Failed to delete product error:", error);
      toast.error("Something went wrong!")
      throw new Error("Failed to delete products");
  }
};

export const ProductActions = (({product}:{product:ExtendedProduct}) => {

  const {onOpenDrawer, data} = useSideBarDrawer();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onCloseAutoFocus={e => e.preventDefault()}>
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)} className="cursor-pointer">
          <Link href={'/shop/product/' + product.id}>View Product</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(event) => {setIsOpen(!isOpen); onOpenDrawer(product); event.currentTarget.blur(); console.log('e:', data)}} className="cursor-pointer">Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={ () => { deleteProductById(product.id) }} className="cursor-pointer">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
})


export const productColumns : ColumnDef<ExtendedProduct>[] = [
  {
    accessorKey: 'name' ,
    header: "Product Name",
    cell: ({row}) => {
      const productImage:ImageInterface = row.original.image[0];
      
      return (
        <div className="relative flex items-center gap-4 w-max">
           <Image src={'https://ik.imagekit.io/vivekecom' + productImage?.url} height={100} width={100} objectFit='cover' alt='card' className='rounded-md aspect-square' />
           <h2 className="text-xs lg:text-base">{row.original.name}</h2>
        </div>
      )
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category; // Access the category object directly
      return <div>{category?.name || "N/A"}</div>; // Safely access the name property
      console.log(row.original.category)
    },
  },
  {
    accessorKey: "productType",
    header: "Product Type",
  },
  {
    accessorKey: "sections",
    header: "Section Label",
    cell: ({ row }) => {
      const sectionTags = row.original.sections;
      const sectionTagNameList = sectionTags.length > 0 ? sectionTags.map((sectionTag) => sectionTag.name) : 'NA';
      return <div>{`[${sectionTagNameList}]`|| "N/A"}</div>; // Safely access the name property
      console.log(row.original.category)
    },
  },
  {
    accessorKey: "availableForPurchase",
    header: "Active",
    cell: ({row}) => {

      return <Switch checked={row.original.availableForPurchase}/>
    }
  },
  {
    id: "actions",
    header : "Actions",
    cell: ({ row }) => {
      const product = row.original
      
      return (
        <ProductActions product={product}/>
      )
    },
  },
]

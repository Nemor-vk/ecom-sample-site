'use client'

import { Category } from '@/generated/prisma'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { toast } from "sonner"
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { ExtendedCategory } from '@/prisma/extendedModelTypes'

const ToggleCategoryAvailability = ({ category }: { category: ExtendedCategory }) => {
    const [categoryData, setCategoryData] = useState<ExtendedCategory>(category);

    const handleToggleAvailability = () => {
      const updatedProduct = {
        ...categoryData,
        availableForPurchase: !categoryData.isActive,
      };
      setCategoryData(updatedProduct);
      toast("Product updated", {
        description: "Product availability has been changed.",
      });
    };

    return (
      <div className="flex items-center space-x-2">
        <Badge
          variant={
            categoryData.isActive
              ? "default"
              : "destructive"
          }
        >
          {categoryData.isActive
            ? "Active"
            : "In-Active"
          }
        </Badge>
        <Switch
          checked={categoryData.isActive || false}
          onCheckedChange={handleToggleAvailability}
          className="cursor-pointer"
        />
      </div>
    );
  };

const categoryTable: ColumnDef<Category>[] = [
    {
        accessorKey: 'name' ,
        header: "Category Name",
        cell: ({row}) => {
             const imagePath = row.original.imageUrl != null ? row.original.imageUrl : '/assets/images/placeholder-img.png';
             
             return (
               <div className="relative flex items-center gap-4 w-max">
                  <Image src={imagePath} height={100} width={100} objectFit='cover' alt='card' className='rounded-md aspect-square' />
                  <h2 className="text-xs lg:text-base">{row.original.name}</h2>
               </div>
             )
           }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          const description = row.original.description; // Access the category object directly
          return <div>{description || "N/A"}</div>;
        },
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
          const description = row.original.description; // Access the category object directly
          return <div>{description || "N/A"}</div>;
        },
    },
    {
        id: "actions",
        header : "Actions",
        cell: ({ row }) => {
          const category = row.original
          
          return (
            <CategoryActions category={category}/>
          )
        },
      },
]

export default categoryTable

const deleteCategoryById = async (categoryId: string) => {
  try {
      const response = await fetch(`http://localhost:3000/api/category/${categoryId}`,{
        method: "DELETE",
      });
  
      const data = await response.json();
      
      toast.success("Category deleted successfully")

  } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Failed to delete category error:", error);
      toast.error("Something went wrong!")
      throw new Error("Failed to delete Category");
  }
};

export const CategoryActions = (({category}:{category:Category}) => {

  // const {onOpenDrawer, data} = useSideBarDrawer();
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
        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={ () => { deleteCategoryById(category.id) }} className="cursor-pointer">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
})
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Category } from "@/generated/prisma"
import { useGenericDialogBox, useGenericDialogStore } from "@/store/tableActions"
import { toast } from "sonner"
import { DialogBoxGeneric } from "@/components/ui/custom/dialog-box-starter"
import CategoryFormWrapper from "./CategoryFormWrapper"
import { ExtendedCategory } from "@/prisma/extendedModelTypes"
import { AvailabilityBadge } from "@/components/ui/custom/availability-toggle"
import { Switch } from "@/components/ui/switch"
import { envConfig } from "@/lib/envConfig"
import Image from "next/image"


export function CategoriesManagement({categories} : {categories:ExtendedCategory[]}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExtendedCategory | null>(null);
   const { isOpen , open } = useGenericDialogStore();

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const onEditCategory = (category:ExtendedCategory) => {

    console.log("category selected : ", category)

    if(!category) {
      toast.error("Unable To Edit Category")
    }

    setSelectedCategory(category);
    open();
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-cpo items-center justify-between space-y-2 mb-5">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <Button size={'lg'} asChild className='py-3.5 px-5'>
            <Link href={'/admin/categories/new'}><Plus/>Add New Category</Link>
        </Button>
      </div>

      <CategoryInfoHeader categories={categories}/>

      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Organize your products with categories and subcategories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="rounded-md border">
            <CategoryTable filteredCategories={filteredCategories} onEditCategory={onEditCategory}/>

            {selectedCategory && <DialogBoxGeneric heading='Edit Category' description='Update Category Details'>
                <CategoryFormWrapper mode='edit' categoryId={selectedCategory.id} initialValues={
                  {name:selectedCategory?.name,
                  description:selectedCategory?.description || '', 
                  sectionNames:selectedCategory.sections.map(tag => tag.name),
                  isActive: selectedCategory.isActive ?? false,
                  imageUrl : selectedCategory.imageUrl,
                  productCount : selectedCategory.productCount || 0,
                  parentId: selectedCategory.parentId,
                  }}/>
            </DialogBoxGeneric>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const CategoryInfoHeader = ({categories}:{categories:ExtendedCategory[]}) => {

  const totalCategories = categories.length;
  const activeCategories = categories.filter((category) => category.isActive == true).length;
  const totalParentCatgeories = categories.filter((category) => category.parentId === null).length;
  const totalSubCatgeories = categories.filter((category) => category.subcategories.length > 0).length;
  const activeCategoriesPercentage = Number(((activeCategories / totalCategories) * 100).toFixed(2));


    return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCategories}</div>
            <p className="text-xs text-muted-foreground">{activeCategoriesPercentage} of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parent Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParentCatgeories}</div>
            <p className="text-xs text-muted-foreground">Main categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubCatgeories}</div>
            <p className="text-xs text-muted-foreground">Nested categories</p>
          </CardContent>
        </Card>
      </div>
    )
}

const CategoryTable = ({filteredCategories, onEditCategory}:{filteredCategories:ExtendedCategory[], onEditCategory: (selectedCategory: ExtendedCategory) => void}) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Parent</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCategories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium flex flex-col gap-1 justify-center">
              {/* <Link href={`/shop/category/${category.id}`} key={category.id}> */}
                <Image src={ category.imageUrl ? envConfig.env.imageKit.url + category.imageUrl : "/placeholder.svg"}
                  alt={"img"}
                  className="object-cover rounded-md aspect-square object-top-left"
                  height={100}
                  width={100}
                />
              {/* </Link> */}
              <Badge className="text-sm px-5 rounded-2xl bg-emerald-400">{category.name}</Badge>
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              {category.description}
            </TableCell>
            <TableCell>
              {category.subcategories.length > 0 ? (
                category.subcategories.map((subCategory) => (
                  <Badge key={subCategory.id} variant="outline">
                    {subCategory.name}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell>{category.productCount}</TableCell>
            <TableCell>
              <div className="flex justify-start items-center gap-1">
                <AvailabilityBadge condition={category.isActive ?? false} />
                <Switch
                  checked={category.isActive || false}
                  // onCheckedChange={()}
                  aria-readonly
                />
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEditCategory(category)}>
                    <Edit className="" />
                    Edit category
                  </DropdownMenuItem>
                  <DropdownMenuItem>Add subcategory</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`/shop/${category.name.toLowerCase()}`}
                      key={category.id}
                    >
                      View Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete category
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

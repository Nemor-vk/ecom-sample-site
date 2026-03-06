"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Star, Download, Eye, Package, ShoppingCart } from "lucide-react"
import { DataTable, SortableHeader, ActionDropdown } from "@/components/table/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { ExtendedProduct } from "@/prisma/extendedModelTypes"
import { envConfig } from "@/lib/envConfig"
import { ProductType } from "@/generated/prisma"
import StarRating from "@/components/StarRating"
import { ProductColumns } from "@/lib/tableSchemas/ProductColumns"
import Link from "next/link"
import { useSideBarDrawer } from "@/store/tableActions"
import { cn } from "@/lib/utils"
import ProductDrawer from "./ProductDrawer"
import { API_CONFIG } from "@/app/constants/apiContants"

export function ProductsManagement() {

  const [productData, setProductData] = useState<ExtendedProduct[]>([])
  const {isOpen} = useSideBarDrawer();
  const [refreshTableContent, setRefreshTableContent] = useState(false)

  useEffect(() => {
    const products = async () => {
      try {
          const response = await fetch("http://localhost:3000/api/product", {
            headers: {
              "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
              "x-client-key": API_CONFIG.CLIENT_KEY,
            },
          });
          const data = await response.json();
          console.log("products :  ", data)
          setProductData(data);
      } catch (error) {
          // Log the original error for debugging before rethrowing a new error.
          console.error("Failed to fetch products error:", error);
          throw new Error("Failed to fetch products");
      }
    };

    products()
  }, [refreshTableContent])

  const handleExport = () => {
    // Export logic here
    toast("Export started", {
      description: "Your product data is being exported.",
    })
  }

    const filterableColumns = [
    {
      id: "category",
      title: "Category",
      options: [
        { label: "Electronics", value: "Electronics" },
        { label: "Sports & Fitness", value: "Sports & Fitness" },
        { label: "Home & Kitchen", value: "Home & Kitchen" },
        { label: "Education", value: "Education" },
        { label: "Digital Products", value: "Digital Products" },
        { label: "Services", value: "Services" },
      ],
    },
    {
      id: "productType",
      title: "Type",
      options: [
        { label: "Physical", value: "PHYSICAL" },
        { label: "Digital", value: "DIGITAL" },
        { label: "Service", value: "SERVICE" },
      ],
    },
    {
      id: "availableForPurchase",
      title: "Availability",
      options: [
        { label: "Available", value: "true" },
        { label: "Disabled", value: "false" },
      ],
    },
  ]

  // Calculate statistics
  const totalProducts = productData.length
  const availableProducts = Array.isArray(productData)
  ? productData.filter(
      (p) =>
        p.availableForPurchase &&
        (p.productType !== ProductType.PHYSICAL || p.stock > 0),
    ).length
  : 0;

  const lowStockProducts =  Array.isArray(productData)
  ? productData.filter(
    (p) => p.productType === ProductType.PHYSICAL && p.stock > 0 && p.stock < 10,
  ).length :0;

  const outOfStockProducts =  Array.isArray(productData)
  ? productData.filter((p) => p.productType === ProductType.PHYSICAL && p.stock === 0).length : 0;

  return (
    <div className={cn('' , "flex-1 space-y-4")}>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button asChild className=''>
          <Link href={'/admin/products/new'}>
            <Plus className="" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Products</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableProducts}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((availableProducts / totalProducts) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground">Restock needed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Manage your product catalog including physical products, digital downloads, and services
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <DataTable
            columns={ProductColumns}
            data={productData}
            searchPlaceholder="Search products by name, description, or tags..."
            filterableColumns={filterableColumns}
            onExport={handleExport}
          />
        </CardContent>
      </Card>

      {/* Product Edit side bar */}
      <div>
        <ProductDrawer refreshContent={() => {setRefreshTableContent(!refreshTableContent)}}/>
      </div>
    </div>
  )
}

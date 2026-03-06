'use client'

import { ActionDropdown, SortableHeader } from "@/components/table/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Product, ProductType } from "@/generated/prisma"
import { ExtendedProduct } from "@/prisma/extendedModelTypes"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { toast } from "sonner"
import { envConfig } from "../envConfig"
import StarRating from "@/components/StarRating"
import { Download, Package } from "lucide-react"
import { useSideBarDrawer } from "@/store/tableActions"
import RichTxtEditor from "@/components/richTxtEditor/RichTxtEditor"
import Link from "next/link"
import { redirect } from "next/navigation"
import { formatCurrencyToINR } from "../utils"


const getProductTypeIcon = (type: ProductType) => {
    switch (type) {
      case ProductType.PHYSICAL:
        return <Package className="h-4 w-4" />
      case ProductType.DIGITAL:
        return <Download className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getProductTypeBadgeVariant = (type: ProductType) => {
    switch (type) {
      case ProductType.PHYSICAL:
        return "default"
      case ProductType.DIGITAL:
        return "secondary"
      default:
        return "default"
    }
  }

  const ToggleProductAvailability = ({ product }: { product: ExtendedProduct }) => {
    const [productData, setProductData] = useState<ExtendedProduct>(product);

    const isOutOfStock =
      productData.productType === ProductType.PHYSICAL && productData.stock === 0;

    const handleToggleAvailability = () => {
      const updatedProduct = {
        ...productData,
        availableForPurchase: !productData.availableForPurchase,
      };
      setProductData(updatedProduct);
      toast("Product updated", {
        description: "Product availability has been changed.",
      });
    };

    return (
      <div className="flex items-center space-x-2">
        <Badge
          variant={
            productData.availableForPurchase && !isOutOfStock
              ? "default"
              : "destructive"
          }
        >
          {isOutOfStock
            ? "Out of Stock"
            : productData.availableForPurchase
            ? "Available"
            : "Disabled"}
        </Badge>
        <Switch
          checked={productData.availableForPurchase}
          onCheckedChange={handleToggleAvailability}
          disabled={isOutOfStock}
          className="cursor-pointer"
        />
      </div>
    );
  };


  export const ProductColumns: ColumnDef<ExtendedProduct>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column}>Product</SortableHeader>,
      cell: ({ row }) => {
        const product = row.original
        const primaryImage = product.image[0]
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-20 w-20 rounded-md aspect-square">
              <Link href={`/shop/products/${product.id}`} key={product.id}>
                <AvatarImage
                  src={ envConfig.env.imageKit.url + primaryImage?.url || "/placeholder.svg"}
                  alt={primaryImage?.altText || product.name}
                  className="object-cover"
                  />
                <AvatarFallback className="rounded-md aspect-square">{product.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Link>
            </Avatar>
            <div className="min-w-0 flex-1 self-start">
              <div className="font-medium text-base">{product.name}</div>
              <StarRating rating={product.rating} size={12} />
              <div className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
                {product.description && product.description.length > 0 
                 ? <RichTxtEditor content={product.description.trim()} isEditable={false} className="border-0 inline-block min-h-0 p-0 line-clamp-2" />
                 : "No description available"
                }
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
      cell: ({ row }) => {
        const category = row.original.category
        return <Badge variant="outline">{category.name}</Badge>
      },
    },
    {
      accessorKey: "productType",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("productType") as ProductType
        return (
          <div className="flex items-center space-x-2">
            {getProductTypeIcon(type)}
            <Badge variant={getProductTypeBadgeVariant(type)}>{type.replace("_", " ")}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "productTags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("productTags") as string[]
        return (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => <SortableHeader column={column}>Price</SortableHeader>,
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue("price"))
   
        return <div className="font-medium">{formatCurrencyToINR(price)}</div>
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => <SortableHeader column={column}>Stock</SortableHeader>,
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number
        const productType = row.original.productType

        // Don't show stock for digital products and services
        if (productType === ProductType.DIGITAL || productType === ProductType.SERVICE) {
          return <span className="text-muted-foreground text-sm">N/A</span>
        }

        return (
          <div
            className={`font-medium ${
              stock === 0 ? "text-destructive" : stock < 10 ? "text-orange-600" : "text-green-600"
            }`}
          >
            {stock}
          </div>
        )
      },
    },
    {
      accessorKey: "availableForPurchase",
      header: "Available",
      cell: ({ row }) => {
        const isAvailable = row.getValue("availableForPurchase") as boolean
        const product = row.original

        return (
          <ToggleProductAvailability product={product}/>
        )
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => <SortableHeader column={column}>Last Updated</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"))
        return <div className="text-sm">{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original
        
        
        

        return (
          <TableActions product={product}/>
        )
      },
    },
  ]

  const TableActions = ({product}:{product:ExtendedProduct}) => {
    const {onOpenDrawer, data} = useSideBarDrawer();
    // const [isOpen, setIsOpen] = useState(false);

    const additionalActions = [
          {
            label: "Duplicate",
            onClick: () => console.log("Duplicae", product.id),
          },
          {
            label: "Update stock",
            onClick: () => console.log("Update stock", product.id),
          },
        ]

        // Add download action for digital products
        if (product.productType === ProductType.DIGITAL && product.downloadUrl) {
          additionalActions.unshift({
            label: "Download",
            onClick: () => window.open(product.downloadUrl!, "_blank"),
          })
        }

    return (
      <ActionDropdown
            onView={() => redirect(`/shop/products/${product.id}`)}
            onEdit={() => onOpenDrawer(product)}
            onDelete={() => deleteProductFromDB(product.id)}
            additionalActions={additionalActions}
          />
    )
  }


  const deleteProductFromDB = async (productId:string) => {
     try {
       const response = await fetch(
         `/api/product/${productId}`,
         {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
           },
         }
       );

      //  const resultJson = await response.json();
      //  const allAddresses: Address[] = resultJson.address;

       if (!response.ok) {
         console.log("Failed to delete product");
         toast.error("Failed to delete product, Try Again!")
         return;
       }

       toast.info("Product deleted successfully!")
       window.location.reload()

     } catch (error) {
       console.log("Something went wrong fetching addresses:", error);
       toast.error("Failed to delete product, Something went wrong!")
     }
  }
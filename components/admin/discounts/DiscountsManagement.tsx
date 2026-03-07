"use client"

import { useState, useEffect } from "react"
import { Plus, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash2, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { DataTable } from "@/components/table/data-table"
import { DiscountDialog } from "./DiscountSDialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Discount } from "@/generated/prisma"
import { ExtendedDiscount } from "@/prisma/extendedModelTypes"
import { API_CONFIG } from "@/app/constants/apiContants"

export function DiscountsManagement() {
  const [discounts, setDiscounts] = useState<ExtendedDiscount[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState<ExtendedDiscount | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [discountToDelete, setDiscountToDelete] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  const fetchDiscounts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
        status: statusFilter,
        type: typeFilter,
      })

      const response = await fetch("/api/discounts", {
        method: "GET",
        headers: {
          "x-site-origin": API_CONFIG.ALLOWED_ORIGIN,
          "x-client-key": API_CONFIG.CLIENT_KEY,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch discounts")

      const data = await response.json()
      setDiscounts(data.discounts)
      // setPagination(data.pagination)
    } catch (error) {
      toast.error("Error", {
        description: "Failed to fetch discounts",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiscounts()
    console.log("Fetched discounts:", editingDiscount)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, searchTerm, statusFilter, typeFilter])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/discounts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete discount")

      toast.success("Success", {
        description: "Discount deleted successfully",
      })

      fetchDiscounts()
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete discount",
      })
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.info("Copied", {
      description: "Discount code copied to clipboard",
    })
  }

  const getDiscountStatus = (discount: Discount) => {
    const now = new Date()
    const validFrom = new Date(discount.validFrom)
    const validUntil = discount.validUntil ? new Date(discount.validUntil) : null

    if (!discount.isActive) return { status: "inactive", label: "Inactive" }
    if (validFrom > now) return { status: "scheduled", label: "Scheduled" }
    if (validUntil && validUntil < now) return { status: "expired", label: "Expired" }
    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return { status: "exhausted", label: "Exhausted" }
    }
    return { status: "active", label: "Active" }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "PERCENTAGE":
        return "Percentage"
      case "FIXED_AMOUNT":
        return "Fixed Amount"
      case "FREE_SHIPPING":
        return "Free Shipping"
      case "BUY_X_GET_Y":
        return "Buy X Get Y"
      default:
        return type
    }
  }

  const columns: ColumnDef<ExtendedDiscount>[] = [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{row.getValue("code")}</code>
          <Button variant="ghost" size="sm" onClick={() => handleCopyCode(row.getValue("code"))}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <Badge variant="outline">{getTypeLabel(row.getValue("type"))}</Badge>,
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => {
        const type = row.original.type
        const value = row.getValue("value") as number

        if (type === "PERCENTAGE") return `${value}%`
        if (type === "FIXED_AMOUNT") return `$${value}`
        if (type === "FREE_SHIPPING") return "Free Shipping"
        return value.toString()
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status, label } = getDiscountStatus(row.original)
        const variant = status === "active" ? "default" : status === "scheduled" ? "secondary" : "destructive"

        return <Badge variant={variant}>{label}</Badge>
      },
    },
    {
      accessorKey: "usedCount",
      header: "Usage",
      cell: ({ row }) => {
        const used = row.getValue("usedCount") as number
        const limit = row.original.usageLimit
        return limit ? `${used}/${limit}` : used.toString()
      },
    },
    // {
    //   accessorKey: "orders",
    //   header: "Orders",
    //   cell: ({ row }) => row.original.orders,
    // },
    {
      accessorKey: "validFrom",
      header: "Valid From",
      cell: ({ row }) => new Date(row.getValue("validFrom")).toLocaleDateString(),
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => {
        const validUntil = row.getValue("validUntil") as string
        return validUntil ? new Date(validUntil).toLocaleDateString() : "No expiry"
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const discount = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleCopyCode(discount.code)}>
                <Copy className="" />
                Copy code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditingDiscount(discount)
                  setDialogOpen(true)
                }}
              >
                <Edit className="" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDiscountToDelete(discount.id)
                  setDeleteDialogOpen(true)
                }}
                className="text-red-600"
              >
                <Trash2 className="" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PERCENTAGE">Percentage</SelectItem>
              <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
              <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
              <SelectItem value="BUY_X_GET_Y">Buy X Get Y</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="" />
            Export
          </Button>
          <Button onClick={() => {
            setEditingDiscount(null)
            setDialogOpen(true)
          }}>
            <Plus className="" />
            Add Discount
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discounts & Offers</CardTitle>
          <CardDescription>Manage your discount codes and promotional offers</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={discounts}
            // loading={loading}
            // pagination={pagination}
            // onPaginationChange={setPagination}
          />
        </CardContent>
      </Card>

      {(editingDiscount || dialogOpen )&& <DiscountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        discount={editingDiscount}
        onSuccess={() => {
          fetchDiscounts()
          setEditingDiscount(null)
        }}
      />}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the discount code.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (discountToDelete) {
                  handleDelete(discountToDelete)
                  setDiscountToDelete(null)
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

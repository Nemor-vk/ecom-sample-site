"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { DataTable, SortableHeader, ActionDropdown } from "@/components/table/data-table"
import { getAllOrdersApi } from "@/service/orders.service"
import { toast } from "sonner"
import { ExtendedOrder } from "@/prisma/extendedModelTypes"

interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  date: string
  items: number
  paymentMethod: string
  shippingAddress: string
  product: string
}

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "completed",
    date: "2024-01-15",
    items: 3,
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St",
    product: "Wireless Headphones",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.5,
    status: "processing",
    date: "2024-01-14",
    items: 2,
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave",
    product: "Running Shoes",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 89.99,
    status: "shipped",
    date: "2024-01-13",
    items: 1,
    paymentMethod: "Bank Transfer",
    shippingAddress: "789 Pine Blvd",
    product: "Smartphone Case",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    total: 199.99,
    status: "pending",
    date: "2024-01-12",
    items: 4,
    paymentMethod: "Credit Card",
    shippingAddress: "321 Maple Lane",
    product: "Laptop Bag",
  },
  {
    id: "ORD-005",
    customer: "Emily Davis",
    email: "emily@example.com",
    total: 99.99,
    status: "cancelled",
    date: "2024-01-11",
    items: 1,
    paymentMethod: "PayPal",
    shippingAddress: "654 Birch St",
    product: "Headphones",
  },
]

const fetchAllOrders = async() => await getAllOrdersApi();



export function OrdersManagement() {
  const [orderData, setOrderData] = useState<ExtendedOrder[]>([])

  // USE EFFECT
  useEffect(() => {
    const loadOrders = async () => {
      
      const allOrders = await getAllOrdersApi();
        if(allOrders) {
          // Set Records
          setOrderData(allOrders);

          if (allOrders.length === 0) {
          toast.info("No Records Found", {
            description: 'No Order Records Available'
          })

        }
        else {
          toast.error("Something Went Wrong!", {
            description: 'Failed to load all orders'
          })
        } 
      };
    }

  loadOrders();
  }, []);


  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "shipped":
        return "outline"
      case "pending":
        return "destructive"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleExport = () => {
    console.log("Exporting orders...")
  }

  const columns: ColumnDef<ExtendedOrder>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <SortableHeader column={column}>Order ID</SortableHeader>,
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <SortableHeader column={column}>Customer</SortableHeader>,
      cell: ({ row }) => {
        const order = row.original
        return (
          <div>
            <div className="font-medium">{order.user.fullName}</div>
            <div className="text-sm text-muted-foreground">{order.user.email}</div>
          </div>
        )
      },
    },
    // {
    //   accessorKey: "products",
    //   header: ({ column }) => <SortableHeader column={column}>Products</SortableHeader>,
    //   cell: ({ row }) => <div className="font-medium">{row.getValue("product")}</div>,
    // },
    {
      accessorKey: "items",
      header: ({ column }) => <SortableHeader column={column}>Items</SortableHeader>,
    },
    {
      accessorKey: "total",
      header: ({ column }) => <SortableHeader column={column}>Total</SortableHeader>,
      cell: ({ row }) => {
        const total = Number.parseFloat(row.getValue("total"))
        return <div className="font-medium">${total.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("paymentMethod")}</Badge>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original
        return (
          <ActionDropdown
            onView={() => console.log("View", order.id)}
            additionalActions={[
              {
                label: "Update status",
                onClick: () => console.log("Update status", order.id),
              },
              {
                label: "Send invoice",
                onClick: () => console.log("Send invoice", order.id),
              },
              {
                label: "Track shipment",
                onClick: () => console.log("Track shipment", order.id),
              },
            ]}
          />
        )
      },
    },
  ]

  const filterableColumns = [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Completed", value: "COMPLETED" },
        { label: "Processing", value: "PROCESSING" },
        { label: "Shipped", value: "SHIPPED" },
        { label: "Pending", value: "PENDING" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },
    {
      id: "paymentMethod",
      title: "Payment Method",
      options: [
        { label: "Credit Card", value: "Credit Card" },
        { label: "PayPal", value: "PayPal" },
        { label: "Bank Transfer", value: "Bank Transfer" },
      ],
    },
  ]

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderData.length}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderData.filter((o) => o.status === 'PENDING').length}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderData.filter((o) => o.status === "PROCESSING").length}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderData.filter((o) => o.status === "COMPLETED").length}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Track and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={orderData}
            searchPlaceholder="Search orders, customers, products..."
            filterableColumns={filterableColumns}
            onExport={handleExport}
          />
        </CardContent>
      </Card>
    </div>
  )
}

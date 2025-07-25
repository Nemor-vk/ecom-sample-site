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
import { set } from "date-fns"
import { orderColumns } from "@/lib/tableSchemas/OrderColumns"

// const fetchAllOrders = async() => await getAllOrdersApi();



export function OrdersManagement() {
  const [orderData, setOrderData] = useState<ExtendedOrder[]>([])

  // USE EFFECT
  useEffect(() => {

    const loadOrders = async () => {
      const allOrders = await getAllOrdersApi();
      if (!allOrders) {
        toast.info("No Records Found", {
          description: "No Order Records Available",
        });
      }

      // Set Records
      setOrderData(allOrders || []);
    };

  loadOrders();
  }, []);

  const handleExport = () => {
    console.log("Exporting orders...")
  }

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
            columns={orderColumns}
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

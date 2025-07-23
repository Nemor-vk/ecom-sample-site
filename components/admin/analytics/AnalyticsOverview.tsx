"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDateRangePicker } from "@/components/ui/custom/date-range-picker"
import { DataTable, SortableHeader } from "@/components/table/data-table"
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RevenueChart } from "./RevenueChart"
import { SalesChart } from "./SalesChart"

interface OrderData {
  id: string
  customer: string
  email: string
  product: string
  category: string
  quantity: number
  unitPrice: number
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  date: string
  paymentMethod: string
  shippingAddress: string
}

interface SalesMetrics {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  conversionRate: number
  topProducts: { name: string; sales: number; revenue: number }[]
  salesByMonth: { month: string; sales: number; revenue: number }[]
  customerMetrics: {
    totalCustomers: number
    newCustomers: number
    returningCustomers: number
  }
}

// Mock detailed order data
const orderData: OrderData[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Wireless Headphones",
    category: "Electronics",
    quantity: 2,
    unitPrice: 99.99,
    total: 199.98,
    status: "completed",
    date: "2024-01-15",
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, City, State",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Running Shoes",
    category: "Sports",
    quantity: 1,
    unitPrice: 129.99,
    total: 129.99,
    status: "processing",
    date: "2024-01-14",
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave, City, State",
  },
  // Add more mock data...
]

const salesMetrics: SalesMetrics = {
  totalRevenue: 125430.5,
  totalOrders: 1234,
  averageOrderValue: 101.65,
  conversionRate: 3.2,
  topProducts: [
    { name: "Wireless Headphones", sales: 245, revenue: 24499.55 },
    { name: "Running Shoes", sales: 189, revenue: 24568.11 },
    { name: "Laptop Stand", sales: 156, revenue: 7798.44 },
  ],
  salesByMonth: [
    { month: "Jan", sales: 234, revenue: 23456.78 },
    { month: "Feb", sales: 189, revenue: 18934.56 },
    { month: "Mar", sales: 267, revenue: 26789.12 },
  ],
  customerMetrics: {
    totalCustomers: 2456,
    newCustomers: 234,
    returningCustomers: 189,
  },
}

export function AnalyticsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleExportReport = (type: "orders" | "products" | "customers") => {
    console.log(`Exporting ${type} report...`)
  }

  const orderColumns: ColumnDef<OrderData>[] = [
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
            <div className="font-medium">{order.customer}</div>
            <div className="text-sm text-muted-foreground">{order.email}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "product",
      header: ({ column }) => <SortableHeader column={column}>Product</SortableHeader>,
      cell: ({ row }) => {
        const order = row.original
        return (
          <div>
            <div className="font-medium">{order.product}</div>
            <Badge variant="outline" className="text-xs">
              {order.category}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => <SortableHeader column={column}>Qty</SortableHeader>,
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
        const variant =
          status === "completed"
            ? "default"
            : status === "processing"
              ? "secondary"
              : status === "shipped"
                ? "outline"
                : status === "cancelled"
                  ? "destructive"
                  : "secondary"

        return <Badge variant={variant}>{status}</Badge>
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
  ]

  const filterableColumns = [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Completed", value: "completed" },
        { label: "Processing", value: "processing" },
        { label: "Shipped", value: "shipped" },
        { label: "Pending", value: "pending" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      id: "category",
      title: "Category",
      options: [
        { label: "Electronics", value: "Electronics" },
        { label: "Sports", value: "Sports" },
        { label: "Home", value: "Home" },
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
        <h2 className="text-3xl font-bold tracking-tight">Sales Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <CalendarDateRangePicker />
          <Button onClick={() => handleExportReport("orders")}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesMetrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesMetrics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +15.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesMetrics.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesMetrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Detailed Orders</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue trends</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesMetrics.topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.sales} sales</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">${product.revenue.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Order Analysis</CardTitle>
              <CardDescription>Complete order history with advanced filtering and sorting</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={orderColumns}
                data={orderData}
                searchPlaceholder="Search orders, customers, products..."
                filterableColumns={filterableColumns}
                onExport={() => handleExportReport("orders")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales performance by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Revenue breakdown by product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Electronics", revenue: 45230, percentage: 36 },
                    { category: "Sports", revenue: 32150, percentage: 26 },
                    { category: "Home", revenue: 28450, percentage: 23 },
                    { category: "Fashion", revenue: 19600, percentage: 15 },
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="font-medium">${item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Customer Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Customers</span>
                  <span className="font-medium">{salesMetrics.customerMetrics.totalCustomers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">New Customers</span>
                  <span className="font-medium text-green-600">{salesMetrics.customerMetrics.newCustomers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Returning Customers</span>
                  <span className="font-medium text-blue-600">{salesMetrics.customerMetrics.returningCustomers}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New vs returning customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Customer acquisition chart would go here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { ActionDropdown, SortableHeader } from "@/components/table/data-table"
import { Badge } from "@/components/ui/badge"
import { OrderItem, Product } from "@/generated/prisma/wasm"
import { ExtendedOrder, ExtendedOrderItem } from "@/prisma/extendedModelTypes"
import { ColumnDef } from "@tanstack/react-table"
import { X } from "lucide-react"
import { formatCurrencyToINR } from "../utils"

 export const orderColumns: ColumnDef<ExtendedOrder>[] = [
    
    {
      accessorKey: "id",
      header: ({ column }) => <SortableHeader column={column}>Order ID</SortableHeader>,
      cell: ({ row }) => <div className="font-medium max-w-[150px] line-clamp-1">{row.getValue("id")}</div>,
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
    {
      accessorKey: "orderItems",
      header: ({ column }) => <SortableHeader column={column}>Products</SortableHeader>,
      cell: ({ row }) => {
        const orderItems = row.getValue("orderItems") as ExtendedOrderItem[];
        return (
          <div className="font-medium">
            {orderItems.map((item) => (
              <div key={item.id} className="my-2">
                <Badge variant="outline" className="bg-muted py-1">{item.product.name} <X className="mx-1.5"/> {item.quantity}</Badge>
              </div>
            ))}
          </div>
        )
      },
    },
    {
      id: "items",
      accessorFn: (row) => row.orderItems,
      header: ({ column }) => <SortableHeader column={column}>Items</SortableHeader>,
      cell: ({getValue}) => {
        const orderItems = getValue() as OrderItem[];
        return (
          <div className="font-medium">
            {orderItems.length}
          </div>
        )
      },
    },
    {
      accessorKey: "paymentTotal",
      header: ({ column }) => <SortableHeader column={column}>Total</SortableHeader>,
      cell: ({ row }) => {
        const total = Number.parseFloat(row.getValue("paymentTotal"))
        return <div className="font-medium">{formatCurrencyToINR(Number(total.toFixed(2)))}</div>
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
      accessorKey: "createdAt",
      header: ({ column }) => <SortableHeader column={column}>Order Date</SortableHeader>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return <div className="text-start">{date.toLocaleDateString()}</div>
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
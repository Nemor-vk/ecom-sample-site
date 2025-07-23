import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {

  const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    items: 3,
    total: 89.99,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    items: 1,
    total: 45.0,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    items: 2,
    total: 127.5,
    status: "Processing",
    image: "/placeholder.svg?height=60&width=60",
  },
  ]

  const allOrders = [
  ...recentOrders,
  {
    id: "ORD-2023-045",
    date: "2023-12-28",
    items: 4,
    total: 156.75,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-2023-044",
    date: "2023-12-20",
    items: 2,
    total: 78.99,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  ]

  return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm py-5">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Order History</CardTitle>
            <p className="text-gray-600">Track and manage all your orders</p>
          </CardHeader>
          <CardContent className="space-y-4 mt-5">
            {allOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={order.image || "/placeholder.svg"}
                  alt="Order"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Processing"
                            ? "secondary"
                            : "outline"
                      }
                      className="rounded-full"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">Order Date: {order.date}</p>
                  <p className="text-gray-600 mb-2">{order.items} items</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-800">${order.total}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === "Delivered" && (
                        <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
}

export default page
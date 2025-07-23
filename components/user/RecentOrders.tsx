'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Badge } from '../ui/badge';

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

const RecentOrders = () => {
  
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
      <CardHeader className="flex flex-row items-center justify-between mb-7">
        <CardTitle className="text-xl text-gray-800">Recent Orders</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-transparent"
          onClick={() => setActiveTab("orders")}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50"
          >
            <Image
              src={order.image || "/placeholder.svg"}
              alt="Order"
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-800">{order.id}</p>
                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : "secondary"
                  }
                  className="rounded-full"
                >
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {order.date} • {order.items} items
              </p>
              <p className="font-semibold text-gray-800">${order.total}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentOrders
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { findOrdersByUserId } from '@/prisma/repository/orderRepo';
import { ExtendedOrder } from '@/prisma/extendedModelTypes';
 // Replace with actual user ID or pass as prop

const RecentOrders = ({recentOrders}: {recentOrders: ExtendedOrder[]}) => {
  
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
              src={"/placeholder.svg"}
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
                    order.status === "COMPLETED" ? "default" : "secondary"
                  }
                  className="rounded-full"
                >
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {order.createdAt.toISOString()} • {order.orderItems.map(item => item.product.name).join(", ")} items
              </p>
              <p className="font-semibold text-gray-800">${Number(order.paymentTotal)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentOrders
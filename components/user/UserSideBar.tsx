'use client'

import React, { useEffect } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Layers, LayoutDashboard, LogOut, ScanBarcode, Search, Settings } from 'lucide-react'
import Link from 'next/link'
import { signOutAndDeleteSessions } from '@/lib/clientLogin'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { title } from 'process'
   
  // Menu items.
  const items = [
    {
      title: "My Profile",
      url: "/profile",
      icon: LayoutDashboard,
    },
    {
      title: "Order Histroy",
      url: "/profile/orders",
      icon: ScanBarcode,
    },
    {
      title: "Addresses",
      url: "/profile/address",
      icon: Layers,
    },
    {
      title: "Saved Payment",
      url: "/profile/billing",
      icon: Search,
    },
    {
      title: 'Settings',
      url: "/profile/settings",
      icon: Settings
    }
  ]

const UserSideBar = () => {

  const userHeaderHeight = 'h-20';
  const pathname = usePathname();

  useEffect(() => {
    console.log("pathname ", pathname)
  }, [pathname])
  

  return (
    <Sidebar>
    <SidebarHeader className={`${userHeaderHeight} box-border flex items-start p-5 pb-2.5 justify-end`}>
      <SidebarGroupLabel>
          <Link href={'/'} className='text-2xl cursor-pointer'>Vivek Store</Link>
      </SidebarGroupLabel>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='flex flex-col gap-1.5 px-2 mt-5'>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={cn('flex items-center gap-3 p-4 py-7 rounded-xl text-base', pathname === item.url ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 shadow-sm' : "")}>
                  <Link href={item.url }>
                    <item.icon />
                    <span className='text-base'>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
                <SidebarMenuButton onClick={signOutAndDeleteSessions} className='flex items-center gap-3 p-4 py-7 rounded-xl text-base'>
                    <LogOut/>
                    <span>Sign Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  )
}

export default UserSideBar
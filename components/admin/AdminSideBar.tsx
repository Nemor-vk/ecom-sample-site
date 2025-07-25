import React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Layers, LayoutDashboard, LayoutGrid, LogOut, ScanBarcode, Search, Settings } from 'lucide-react'
import Link from 'next/link'
import { ADMIN_ITEMS } from '@/app/constants/adminConstants'
import { signOutAndDeleteSessions } from '@/lib/clientLogin'

const AdminSideBar = () => {
  return (
    <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className='h-16'>
          <Link href={'/'} className='text-xl cursor-pointer'>Vivek Store</Link>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {ADMIN_ITEMS.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.label}</span>
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

export default AdminSideBar
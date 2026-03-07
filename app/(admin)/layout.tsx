import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import React, { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import AdminSideBar from '@/components/admin/AdminSideBar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { redirect, usePathname } from 'next/navigation'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getIronSessionDecodedCookie } from '@/lib/ironSession'
import { auth } from '@/lib/config/auth.config'
import { SITE_ROLES } from '../constants'

const layout = async({children} : {children: ReactNode}) => {

  const ironSession = await getIronSessionDecodedCookie();
  const session = await auth();
  
  if(process.env.DEBUG_MODE === "true") 
  console.log("Admin Layout - Session :: ", session , " :: Iron Session :: ", ironSession)

  if (!session?.user || !ironSession.isAuthenticated || ironSession.user?.role != SITE_ROLES.AMDIN) redirect('/')

  return (
    <SidebarProvider>
      <AdminSideBar/>
      <SidebarInset className=''>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 p-5" />
          <Separator orientation="vertical" className="mr-2" />
          <BreadCrumbs/>
        </header>
        <div className='p-5' >
        {children}
        </div>
      <Toaster position="bottom-right" richColors />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default layout
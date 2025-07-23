import React, { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { redirect } from 'next/navigation'
import BreadCrumbs from '@/components/BreadCrumbs'
import UserSideBar from '@/components/user/UserSideBar'
import { auth } from '../api/auth/[...nextauth]/route'
import { getIronSessionDecodedCookie } from '@/lib/ironSession'
import UserNavbar from '@/components/user/UserNavbar'

const userHeaderHeight = 'h-20';

const layout = async ({children}:{children:ReactNode}) => {

  const ironSession = await getIronSessionDecodedCookie();
  const session = await auth();
  console.log("IRON SESSION USER data, /user/profile", ironSession)

  if (!session?.user || !ironSession.isAuthenticated) redirect('/')

  return (
    <div>
    <SidebarProvider className='relative top-0'>
      <UserSideBar/>
      <SidebarInset>
        <header className={`flex ${userHeaderHeight} shrink-0 items-center gap-2 border-b px-4`}>
          <SidebarTrigger className="-ml-1 p-5" />
          <Separator orientation="vertical" className="mr-2" />
          <BreadCrumbs/>
          <UserNavbar/>
        </header>
        <div className='p-5' >
        {children}
        </div>
      <Toaster position="bottom-right" richColors />
      </SidebarInset>
    </SidebarProvider>
    </div>
  )
}

export default layout


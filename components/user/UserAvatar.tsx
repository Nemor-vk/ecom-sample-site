'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Session } from 'next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { Boxes, CreditCard, History, Layers, LayoutDashboard, LogIn, LogOut, NotebookTabs, ScanBarcode, Search, Settings, UserRound } from 'lucide-react'
import Link from 'next/link'
import Status from './Status'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { callUpdateIronSessionApi, deleteIronSessionCookieApi, signOutAndDeleteSessions } from '@/lib/clientLogin'
import { adminitems, SITE_ROLES } from '@/app/constants'
import { ADMIN_ITEMS } from '@/app/constants/adminConstants'

const UserAvatar = ({userSession}:{userSession:Session | null}) => {

  return (
    <>
    <UserDropdownMenu userSession={userSession}/>
    </>
  )
}

export default UserAvatar

const UserDropdownMenu = ({userSession}:{userSession:Session | null}) => {

    const {data:authSession} = useSession();

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className='relative'>
            <Avatar className='border-2 border-gray-200 h-10 w-full aspect-square cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Status/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[250px] py-5 px-2' align='end' alignOffset={-45} sideOffset={5}>
            <DropdownMenuLabel className='flex items-center gap-3 w-full'>
                <div className='relative'>
                    <Avatar className='border-2 border-gray-200 w-12 aspect-square h-12'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Status/>
                </div>
                <div className=''>
                    <div className='capitalize text-lg'>{userSession?.user?.name}</div>
                    <span  className='text-xs font-thin align-text-top text-yellow-400'>Online</span>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='mb-2' />
            {authSession?.user?.role != SITE_ROLES.AMDIN && 
              UserMenuItems.map((menuItem) => (
                <DropdownMenuGroup key={menuItem.label} onClick={() => menuItem.onClick ? menuItem.onClick() : ''}>
                  <DropdownMenuItem asChild>
                      <Link href={menuItem.url}>
                        <menuItem.icon className="size-4"/>
                        <span>{menuItem.label}</span>
                      </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
            ))}
            {authSession?.user?.role === SITE_ROLES.AMDIN &&
              ADMIN_ITEMS.map((item) => (
              <DropdownMenuGroup key={item.label} onClick={() => item.onClick ? item.onClick() : ''}>
                <DropdownMenuItem asChild>
                  <Link href={item.url } className='cursor-pointer'>
                    <item.icon className="size-4"/>
                    <span >{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ))
            }
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

  const UserMenuItems = [
    {
      label: "Profile",
      icon: UserRound,
      isSignOut: false,
      url: "/profile",
    },
    {
      label: "Order Histroy",
      icon: Layers,
      isSignOut: false,
      url: "/orders",
    },
    {
      label: "Settings",
      icon: Settings,
      isSignOut: false,
      url: "/settings",
    },
    {
      label: "Billing",
      icon: CreditCard,
      isSignOut: false,
      url: "/billing",
    },
    {
      label: "Address",
      icon: NotebookTabs,
      isSignOut: false,
      url: "/address",
    },
    {
      label: "Sign Out",
      icon: LogOut,
      isSignOut: true,
      onClick: () => signOutAndDeleteSessions(),
      url:'#'
    },
  ];


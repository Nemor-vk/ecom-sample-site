'use client'

import { getIronSessionDecodedCookie } from '@/lib/ironSession';
import { useCartStore } from '@/store/cartStore';
import React from 'react'
import ThemeToggleBtn from '../ThemeToggleBtn';
import CategoryDropDown from '../CategoryDropDown';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LogIn, ShoppingCart } from 'lucide-react';
import { Badge } from '../ui/badge';
import UserAvatar from './UserAvatar';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';

export const UserNavbar = () => {

  const {cartItems} = useCartStore();
  const {data:session} = useSession();

  return (
    <nav className='md:flex hidden items-center text-sm self-center ml-auto pr-12'>
        <ul className='flex flex-row items-center gap-7 justify-baseline'>
            <li>
                <ThemeToggleBtn/>
            </li>
            {/* <li>
                <CategoryDropDown/>
            </li> */}
            <li>
                <Link href={'/cart'} className={cn('px-2 text-base cursor-pointer capitalize flex items-center')}>
                    <div className='relative'>
                        <ShoppingCart size={28}/>
                        <Badge className='absolute -top-1 left-4 text-background aspect-square rounded-full p-1 bg-red-400 dark:bg-blue-400'>{cartItems.length}</Badge>
                    </div>
                </Link>
            </li>
            <li>
                {
                session?.user
                ?
                <UserAvatar userSession={session}/>
                :
                <div>
                    <Link href={'/login'}>
                        <Button variant={'outline'} size={'container'} className='px-5 py-2 rounded-full'>
                            <LogIn/>
                            Login
                        </Button>
                    </Link>
                </div>
                }
            </li>
        </ul>
    </nav>
  )
}

export default UserNavbar
"use client"

import { NAV_ITEMS } from '@/app/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import CategoryDropDown from './CategoryDropDown'
import { CircleUser, LogIn, ShoppingCart } from 'lucide-react'
import ThemeToggleBtn from './ThemeToggleBtn'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from './ui/badge'
import { useCartStore } from '@/store/cartStore'
import UserAvatar from './user/UserAvatar'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'


const Navbar = () => {

    const pathname = usePathname();
    const iconSize = 20;
    const logoSize = 50;
    const {cartItems} = useCartStore();
    // const session = auth()
    // const { data:session, status , update,} = useSession();
    const{data:session, status, update} = useSession();

    useEffect(() => {
        
        console.log("something changed : ", status)

    }, [status, session])
    


  return (
    <header className='mt-4 bg-background text-foreground border-2 flex justify-between items-center gap-5 rounded-full py-2.5 px-10 shadow-lg mx-auto w-[95%] min-h-12'>
        <Link href="/">
            {/* <Image className='rounded-full' src="/logos/blinkit-main-logo.png" height={logoSize} width={logoSize} alt='logo' quality={100}/> */}
            <h1 className='text-2xl'>VK Store</h1>
        </Link>
        <nav className='md:flex hidden items-center'>
            <ul className='flex flex-row items-center gap-10 justify-baseline'>
                <li>
                    <ThemeToggleBtn/>
                </li>
                <li>
                    <CategoryDropDown/>
                </li>
                <li>
                    <Link href={'/cart'} className={cn('px-2 text-base cursor-pointer capitalize flex items-center', pathname === '/cart' ? 'text-muted-foreground' : 'text-foreground')}>
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
    </header>
  )
}

export default Navbar
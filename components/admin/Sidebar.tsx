import { ADMIN_SIDEBAR_LINKS } from '@/app/constants';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Sidebar = () => {

    const logoSize = 50;

  return (
    <div>
        <div>
            <div className='flex items-center border-amber-200 border-2 px-8 py-4 mb-5 '>
                <Image src="/logos/blinkit-main-logo.png" height={logoSize} width={logoSize} alt='logo' quality={100}/>
                <h1>Admin</h1>
            </div>
            <div className='flex flex-col gap-4 bg-amber-100'>
                {ADMIN_SIDEBAR_LINKS.map((adminLinks) => (
                    <div key={ adminLinks.key}>
                        <Link href={adminLinks.href}>
                            <h2 className='px-6 py-5 text-[15px] border-2 rounded-xl'>{adminLinks.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar
import Navbar from '@/components/Navbar'
import NavMobile from '@/components/NavMobile'
import React, { ReactNode, useEffect } from 'react'
import { Toaster } from 'sonner'
import { auth } from '@/lib/config/auth.config'
import { Footer } from '@/components/Footer'

const layout = async({children} : {children: ReactNode}) => {

  return (
      <>
        <Navbar/>
        {/* <Toaster richColors position="top-right" /> */}
        <main className=''>
          <div className='root-container mx-auto'>
              <div className='mt-5 pb-20 w-full'>{children}</div>
          </div>
        </main>
        <NavMobile/>
        <Toaster richColors />
        <Footer/>
      </>
  )
}

export default layout
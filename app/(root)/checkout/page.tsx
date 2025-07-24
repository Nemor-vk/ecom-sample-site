import React from 'react'
import CheckoutPage from './CheckoutPage'
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

const page = async () => {

  return (
    <div>
        <CheckoutPage/>
    </div>
  )
}

export default page
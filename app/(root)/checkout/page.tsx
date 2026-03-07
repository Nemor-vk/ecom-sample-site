import React from 'react'
import CheckoutPage from './CheckoutPage'
import { auth } from '@/lib/config/auth.config';
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
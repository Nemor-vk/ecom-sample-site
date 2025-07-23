import { ProductForm } from '@/components/admin/ProductForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <div>
        <Button asChild className=''>
            <Link href={'/admin/products/'}>Go Back</Link>
        </Button>
        </div>
        <div className='w-full mt-4 flex justify-center'>
            <ProductForm/>
        </div>
    </div>
  )
}

export default page
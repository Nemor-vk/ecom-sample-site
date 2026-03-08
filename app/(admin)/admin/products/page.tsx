'use server'
import { ProductsManagement } from '@/components/admin/products/ProductManagement'
import { SerializedProduct } from '@/lib/serializers/product.serialize';
import { ExtendedProduct } from '@/prisma/extendedModelTypes'
import { fetchAllProducts } from '@/service/product.service';
import React from 'react'

export const dynamic = 'force-dynamic'


const page = async () => {
  const data : SerializedProduct[] = await fetchAllProducts().then((res) => !res ? [] : res);
   
  return (
    <div className=''>
       {/* <ProductDrawer/> */}
       <ProductsManagement productData={data}/>
    </div>
  )
}

export default page
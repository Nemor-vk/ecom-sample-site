import { ProductsManagement } from '@/components/admin/products/ProductManagement'
import SidePopupDrawer from '@/components/admin/SidePopupDrawer'
import TableList from '@/components/admin/TableList'
import { Button } from '@/components/ui/button'
import { productColumns } from '@/lib/tableSchemas/productColumns'
import { ExtendedProduct } from '@/prisma/extendedModelTypes'
import Link from 'next/link'
import React from 'react'



const products = async () : Promise<ExtendedProduct[]> => {
  try {
      const response = await fetch("http://localhost:3000/api/product");
      // if (!response.ok) {
      //     // If  response is the servernot successful, extract the error text for debugging.
      //     const errorText = await response.text();
      //     throw new Error(`api failed with status ${response.status}: ${errorText}`);
      // }

      // Parse and destructure the response JSON for upload credentials.
      const data: ExtendedProduct[] = await response.json();
      return data;
  } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Failed to fetch products error:", error);
      throw new Error("Failed to fetch products");
  }
};


const page = async () => {

  // const products: Product[] = await findAllProducts();
  const data: ExtendedProduct[] = await products();
   
  return (
    <div className=''>
        {/* <h2 className='mb-5 text-xl'>All Products</h2>
        <Button asChild className=''>
            <Link href={'/admin/products/new'}>Add Product</Link>
        </Button> */}
       {/* <div className='mt-8'>
          <TableList columns={productColumns} data={data}/>
          </div> */}
        <SidePopupDrawer/>
       <ProductsManagement/>
    </div>
  )
}

export default page
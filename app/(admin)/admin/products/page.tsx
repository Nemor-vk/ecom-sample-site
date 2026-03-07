import { ProductsManagement } from '@/components/admin/products/ProductManagement'
import { ExtendedProduct } from '@/prisma/extendedModelTypes'
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
       {/* <ProductDrawer/> */}
       <ProductsManagement/>
    </div>
  )
}

export default page
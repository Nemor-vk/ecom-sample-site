import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import ProductDesc from '@/components/product/ProductDesc';
// import ProductPage from '@/components/ProductPage';
import { ExtendedProduct } from '@/prisma/extendedModelTypes';
import ProductSpecification from '@/components/product/ProductSpecification';
import ShippingAndReturn from '@/components/product/ShippingAndReturn';
import ProductPage from '@/components/products/ProductPage';

const page = async({params} : {params: {id: string}}) => {

    const {id} = await params;

    const findProductById = async (id: string) => {
          try {
              const response = await fetch(`http://localhost:3000/api/product/${id}`);
              const data = await response.json();
              console.log("api/id - product data", data)
              return data;
          } catch (error) {
              console.error("Failed to fetch products error:", error);
              throw new Error("Failed to fetch products");
          }
    };

    const productItem = await findProductById(id);

    if(!productItem) {
      return (<div>404</div>)
    }
  

  return (
    <div>
      {/* TOP SECTION PAIR */}
      {/* <ProductPage product={productItem} productImages={productItem.image} productName={productItem.name} productRating={productItem.rating} productPrice={parseFloat(Number(productItem.price.toString()).toFixed(2))} /> */}
      <ProductPage  product={productItem}/>
      {/* BOTTOM SECTION */}

      <Tabs defaultValue="description" className="w-full h-fit">
        <TabsList className='bg-yellow-200 dark:bg-card px-2 py-1.5 h-fit'>
          <TabsTrigger value="description" className='px-2.5 py-2 border-2'>Description</TabsTrigger>
          <TabsTrigger value="specification" className='px-2.5 py-2 border-2' >Specification</TabsTrigger>
          <TabsTrigger value="faq" className='px-2.5 py-2 border-2'>
            <span className='hidden md:inline'>Frequency asked Questions</span>
            <span className='inline-block md:hidden'>FAQ</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className='p-0'>
            <ProductDesc content={productItem.description ?? ""}/>
        </TabsContent>
        <TabsContent value="specification" className='p-5 bg-card'>
            <ProductSpecification/>
        </TabsContent>
        <TabsContent value="faq" className='px-5 bg-card'>
            <ShippingAndReturn/>
        </TabsContent>
        {/* <TabsContent value="sellerInfo">.
            <SellerDetails/>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

export default page
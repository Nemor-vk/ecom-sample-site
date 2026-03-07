import React from 'react'
import ProductDesc from '@/components/product/ProductDesc';
// import ProductPage from '@/components/ProductPage';
import ProductPage from '@/components/products/ProductPage';
import { Separator } from '@/components/ui/separator';
import { fetchProductById } from '@/service/product.service';

// Define your params structure within a Promise - vercel fix for next 15 dynamic route params
type PageParams = Promise<{ slug: string; id: string }>;

interface Props {
  params: PageParams;
  // searchParams is also a Promise in Next 15+
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; 
}


const page = async ( props : Props) => {
  // Await the params and searchParams before using them
  const params = await props.params;
  const { slug, id } = params;

  const productItem = await fetchProductById(id);

  if (!productItem) {
    return <div>404</div>;
  }

  return (
    <div>
      {/* TOP SECTION PAIR */}
      {/* <ProductPage product={productItem} productImages={productItem.image} productName={productItem.name} productRating={productItem.rating} productPrice={parseFloat(Number(productItem.price.toString()).toFixed(2))} /> */}
      <ProductPage product={productItem} />
      {/* BOTTOM SECTION */}

      <Separator className="my-7 border-2 border-foreground/40 rounded-full" />

      <ProductDesc
        content={productItem.description ?? "No Description to show"}
      />
    </div>
  );
};

export default page
      // <Tabs defaultValue="description" className="w-full h-fit">
      //   <TabsList className='bg-yellow-200 dark:bg-card px-2 py-1.5 h-fit'>
      //     <TabsTrigger value="description" className='px-2.5 py-2 border-2'>Description</TabsTrigger>
      //     <TabsTrigger value="specification" className='px-2.5 py-2 border-2' >Specification</TabsTrigger>
      //     <TabsTrigger value="faq" className='px-2.5 py-2 border-2'>
      //       <span className='hidden md:inline'>Frequency asked Questions</span>
      //       <span className='inline-block md:hidden'>FAQ</span>
      //     </TabsTrigger>
      //   </TabsList>
      //   <TabsContent value="description" className='p-0'>
      //       <ProductDesc content={productItem.description ?? ""}/>
      //   </TabsContent>
      //   <TabsContent value="specification" className='p-5 bg-card'>
      //       <ProductSpecification/>
      //   </TabsContent>
      //   <TabsContent value="faq" className='px-5 bg-card'>
      //       <ShippingAndReturn/>
      //   </TabsContent>
      //   {/* <TabsContent value="sellerInfo">.
      //       <SellerDetails/>
      //   </TabsContent> */}
      // </Tabs>
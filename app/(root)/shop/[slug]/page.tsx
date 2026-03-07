import { ExtendedProduct } from '@/prisma/extendedModelTypes';
import React from 'react'
import { Category } from '@/generated/prisma';
import { getAllCategories } from '@/prisma/repository/categoryRepo';
import Link from 'next/link';
import { ALL_CATEGORIES } from '@/app/constants';
import ProductCard from '@/components/ProductCard';
import { SerializedProduct } from '@/lib/serializers/product.serialize';
import { fetchAllProducts, fetchProductByCategoryName } from '@/service/product.service';

interface PageProps {
  params: {
    slug: string;
  };
}



// {params: {slug : string}, props: {categories : Category[]}}
const page = async({params} : PageProps) => {

    const {slug} = await params;

    const categories: Category[] = await getAllCategories();
    const categoryNameList : string[] = categories.map(category => category.name.toLowerCase());
    let products:SerializedProduct[] = []
    
    console.log(slug.replace('_', ' '))
    if(!categoryNameList.includes(slug.replace('_', ' ')) && slug != ALL_CATEGORIES) return (<div>Not Found</div>);

 

    /// to change db call to api call
    if( slug === ALL_CATEGORIES) {
      products = await fetchAllProducts();
    } else {
      products = await fetchProductByCategoryName(slug.toLowerCase());
    }

  return (
    <div className='mx-auto'>
        <h1 className='my-4 text-lg lg:text-2xl capitalize'>{slug.replace('_', ' ')}</h1>
        <div className='grid gap-4 grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(300px,0.25fr))] justify-start'>
            {products && products.map( (productItem) => (
                <Link href={`${slug}/${productItem.id}`} key={productItem.id}>
                <ProductCard product={productItem} />
                </Link>
            ))}

            {products.length === 0 && (
                <div className='col-span-full text-center text-muted-foreground'>No products found</div>
            )}
        </div>
    </div>
  )
}

export default page
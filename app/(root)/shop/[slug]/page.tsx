import { ExtendedProduct } from '@/prisma/extendedModelTypes';
import React from 'react'
import { Category } from '@/generated/prisma';
import { getAllCategories } from '@/prisma/repository/categoryRepo';
import Link from 'next/link';
import { findAllProducts, findProductsByCategoryName } from '@/prisma/repository/productRepo';
import { ALL_CATEGORIES } from '@/app/constants';
import ProductCard from '@/components/ProductCard';


const page = async({params} : {params: {slug : string}, props: {categories : Category[]}}) => {

    const {slug} = await params;
    const categories: Category[] = await getAllCategories();
    const categoryNameList : string[] = categories.map(category => category.name.toLowerCase());
    let products:ExtendedProduct[] = []
    
    if(!categoryNameList.includes(slug) && slug != ALL_CATEGORIES) return (<div>Not Found</div>);

    console.log(slug)

    if( slug === ALL_CATEGORIES) {
      products = await findAllProducts();
    } else {
      products = await findProductsByCategoryName(slug.toLowerCase());
    }

  return (
    <div className='mx-auto'>
        <h1 className='my-4 text-lg capitalize'>All {slug}</h1>
        <div className='grid gap-4 grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(300px,0.33fr))] justify-center'>
            {products.map( (productItem) => (
                <Link href={`${slug}/${productItem.id}`} key={productItem.id}>
                <ProductCard product={productItem} />
                </Link>
            ))}
        </div>
    </div>
  )
}

export default page
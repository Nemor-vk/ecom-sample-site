import { CategoriesManagement } from '@/components/admin/categories/CategoriesManagement';
import { ExtendedCategory } from '@/prisma/extendedModelTypes';
import { fetchAllCategories } from '@/service/category.service';
import React from 'react'


const page = async () => {

  const categories:ExtendedCategory[] = await fetchAllCategories();

  return (
    <div className='px-5'>
        <CategoriesManagement categories={categories}/>
    </div>
  )
}

export default page
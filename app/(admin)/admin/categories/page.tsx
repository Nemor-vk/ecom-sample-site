import { CategoriesManagement } from '@/components/admin/categories/CategoriesManagement';
import CategoryFormWrapper from '@/components/admin/categories/CategoryFormWrapper';
import TableList from '@/components/admin/TableList'
import { Button } from '@/components/ui/button'
import { DialogBoxGeneric } from '@/components/ui/custom/dialog-box-starter';
import { Category } from '@/generated/prisma';
import categoryColumns from '@/lib/tableSchemas/categoryColumns';
import { ExtendedCategory } from '@/prisma/extendedModelTypes';
import { getAllCategories } from '@/prisma/repository/categoryRepo';
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner';

// async function getAllCategories () {
//   try{
//       const response = await fetch("localhost:3000/api/categories");
//       if (!response.ok) throw new Error("Failed to fetch categories");
//       return await response.json()
//     } catch (error) {
//         console.log('error: ' + error)
//     }
// }

const page = async () => {


  const categories:ExtendedCategory[] = await getAllCategories();

  return (
    <div className='px-5'>
        {/* <h2 className='mb-5 text-xl'>All Categories</h2>
        <Button asChild className=''>
            <Link href={'/admin/categories/new'}>Add New Category</Link>
        </Button>
        <div className='mt-8'>
         <TableList columns={categoryColumns} data={allCategories}  />
        </div> */}
        <CategoriesManagement categories={categories}/>
    </div>
  )
}

export default page
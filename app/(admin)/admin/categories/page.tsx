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


const page = async () => {

  const categories:ExtendedCategory[] = await getAllCategories();

  return (
    <div className='px-5'>
        <CategoriesManagement categories={categories}/>
    </div>
  )
}

export default page
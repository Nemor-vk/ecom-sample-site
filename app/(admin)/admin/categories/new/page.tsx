import CategoryForm from '@/components/admin/categories/CategoryForm'
import CategoryFormWrapper from '@/components/admin/categories/CategoryFormWrapper'
import { Button } from '@/components/ui/button'
import { Category } from '@/generated/prisma'
import { categorySchema } from '@/lib/validations'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const page = () => {
  return (
    <div>
        <div>
        <Button asChild className=''>
            <Link href={'/admin/categories/'}>Go Back</Link>
        </Button>
        </div>
        <div className='w-full mt-5 flex flex-col items-center'>
            <CategoryFormWrapper />
        </div>
    </div>
  )
}

// const onEdit = async(values:z.infer<typeof categorySchema>) => {
//   try {
//       const response = await fetch("/api/categories" , {
//         method: "POST",
//         body: JSON.stringify(values)
//       });

//       const responseJson = await response.json();

//       console.log('Add Category Form Response : ', responseJson )
//       toast.success("Category Added Successfully")

//     } catch (error) {
//       toast.error("Unable to Add Category, Try again")
//       console.log('Add Category Form Error: ' + error)
//     }
// }

export default page
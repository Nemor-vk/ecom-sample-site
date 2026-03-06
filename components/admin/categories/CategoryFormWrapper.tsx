'use client'

import { z } from 'zod'
import { categorySchema } from '@/lib/validations'
import CategoryForm from './CategoryForm'
import { toast } from 'sonner'
import { siteApiConfig, siteBaseApiUrl } from '@/lib/config/sitePathsConfig'
import { useGenericDialogStore } from '@/store/tableActions'
import { useRouter } from 'next/navigation'

export const CategoryFormWrapper = ({ mode = 'add', initialValues, categoryId }: { mode?: 'add' | 'edit', categoryId: string, initialValues?: z.infer<typeof categorySchema> }) => {
  
  const {close} = useGenericDialogStore();
  const router = useRouter();

  
  const onSubmit = async (values: z.infer<typeof categorySchema>) => {

    console.log("category form values ", values)

    try {
      const response = await fetch(`${siteBaseApiUrl + siteApiConfig.categoriesApi.baseApi}${mode === 'add' ? '' : `/${categoryId}`}`, {
        method: mode === 'add' ? 'POST' : 'PUT',
        body: JSON.stringify(values),
      })

      const responseJson = await response.json()
      console.log(`${mode.toUpperCase()} Category Form Response:`, responseJson)

      if(response.ok || response.status === 200) {
        toast.success(`Category ${mode === 'add' ? 'Added' : 'Updated'} Successfully`)
      } else {
        toast.error(`Failed to ${mode === 'add' ? 'Add New' : 'Update'} Category`)
      }

      close();
      router.push('/admin/categories/');

    } catch (error) {
      toast.error(`Failed To ${mode === 'add' ? 'Added' : 'Updated'} Category`)
      console.error(`${mode.toUpperCase()} Category Form Error:`, error)
    }
  }

    // reset logic
  // useEffect(() => {
  //   form.reset({ ...defaultValues, ...initialValues });
  // }, [initialValues]);

  return (
    <CategoryForm
      className={'px-1 border-0 py-0'}
      mode={mode}
      initialValues={initialValues}
      onSubmit={onSubmit}
      />
  )
}

export default CategoryFormWrapper
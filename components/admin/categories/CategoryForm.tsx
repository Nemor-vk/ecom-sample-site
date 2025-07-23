'use client'

import { z } from 'zod'
import { categorySchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../../ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import RichTxtEditor from '../../richTxtEditor/RichTxtEditor'
import { InputTagMultiSelect } from '../../InputTag'
import { Category, Section } from '@/generated/prisma'
import { useEffect, useState } from 'react'
import { siteBaseApiUrl, siteApiConfig } from '@/lib/config/sitePathsConfig'
import { Switch } from '@/components/ui/switch'
import { AvailabilityBadge } from '@/components/ui/custom/availability-toggle'
import ImageUpload, { SingleImageUpload } from '@/components/ImageUpload'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ExtendedCategory } from '@/prisma/extendedModelTypes'
import { getAllPromotionalTagsApi } from '@/service/promotionTags.service'

type CategoryFormProps = {
  initialValues?: z.infer<typeof categorySchema>
  onSubmit: (values: z.infer<typeof categorySchema>) => Promise<void>
  mode?: 'add' | 'edit',
  className?: string,
}

const CategoryForm = ({
  initialValues = {
    name: '',
    description: '',
    sectionNames: [],
    imageUrl: '',
    isActive: false,
    productCount: 0,
    parentId:'',
  },
  onSubmit,
  mode = 'add',
  className,
}: CategoryFormProps) => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues,
  })

  const [promotionalTagList, setPromotionalTagList] = useState<Section[]>([]);
  const [categories, setCategories] = useState<ExtendedCategory[]>([]);

  useEffect(() => {

    async function fetchCategories() {
        try {
          const response = await fetch("/api/categories"); // Call your API
          if (!response.ok) throw new Error("Failed to fetch categories");
          const data = await response.json(); // Parse JSON
          setCategories(data);
        } catch (err) {
          console.log("Error ", err)
        }
      }

    fetchCategories();
    getAllPromotionalTagsApi(setPromotionalTagList);
  }, []);
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8 capitalize w-[450px] bg-background border-2 p-8 rounded-md ", className)}
      > 
      
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder="Electronics" type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SingleImageUpload imageUrl={field.value} onFileChange={field.onChange} folderName="products" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Description</FormLabel>
              <FormControl>
                <RichTxtEditor content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Count</FormLabel>
              <FormControl>
                <Input placeholder="Override Product Count (brute)" type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                      <SelectTrigger className={cn(" text-sm text-start form-select px-2 py-1 border-2 rounded-md w-full", field.value && 'dark:text-foreground text-foreground')}>
                        <SelectValue placeholder={field.value 
                          ? <p>{categories?.find(category => category.id === field.value)?.name }</p>
                          : 'Select Category'}/>
                      </SelectTrigger>
                    <SelectContent className="text-sm border-2" onFocus={e => e.preventDefault()}>
                      {categories
                        .filter((category) => category.name !== initialValues.name)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectionNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promotional Tags</FormLabel>
              <FormControl>
                <InputTagMultiSelect
                  tagList={promotionalTagList.map(tag => tag.name)}
                  selectedTags={field.value || []}
                  setTags={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl className='flex flex-row items-center justify-between rounded-md p-4 shadow-sm border'>
                    <div>
                    <FormLabel><AvailabilityBadge condition={field.value} /></FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

        <Button type="submit" className="mt-2.5 cursor-pointer">
          {mode === 'edit' ? 'Update Category' : 'Add Category'}
        </Button>
      </form>
    </Form>
  )
}

export default CategoryForm
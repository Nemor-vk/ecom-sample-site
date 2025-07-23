import { promotionalTagSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SingleImageUpload } from '@/components/ImageUpload'
import RichTxtEditor from '@/components/richTxtEditor/RichTxtEditor'
import { AvailabilityBadge } from '@/components/ui/custom/availability-toggle'
import { Switch } from '@/components/ui/switch'

type PromotionalFormProps = {
  initialValues?: z.infer<typeof promotionalTagSchema>
  onSubmit: (values: z.infer<typeof promotionalTagSchema>) => Promise<void>
  mode?: 'add' | 'edit',
  className?: string,
  onCancel:() => void
}

const PromotionalTagForm = ({initialValues, mode, onSubmit, className, onCancel}:PromotionalFormProps) => {

      // 1. Define your form.
  const form = useForm<z.infer<typeof promotionalTagSchema>>({
    resolver: zodResolver(promotionalTagSchema),
    defaultValues: initialValues
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promotion Name</FormLabel>
              <FormControl>
                <Input placeholder="Promotion Name" {...field} required />
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
                <RichTxtEditor
                  content={field.value || ''}
                  onChange={field.onChange}
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
              <FormControl className="flex flex-row items-center justify-between rounded-md p-4 shadow-sm border">
                <div>
                  <FormLabel>
                    <AvailabilityBadge condition={field.value} />
                  </FormLabel>
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

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SingleImageUpload
                  imageUrl={field.value}
                  onFileChange={field.onChange}
                  folderName="products"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-4 items-end justify-between'>
            <Button type="reset" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">{mode === 'edit' ? "Update Promotion" : "Create Promotion"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default PromotionalTagForm
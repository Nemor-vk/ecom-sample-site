import React from 'react'
import { DefaultValues, FieldValues, Form, Path, useForm, UseFormReturn } from 'react-hook-form'
import { FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '../form'
import { Input } from '../input'
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SingleImageUpload } from '@/components/ImageUpload';
import RichTxtEditor from '@/components/richTxtEditor/RichTxtEditor';

interface GenericFormProps<T> {
  mode: "add" | "edit";
  defaultValues: T;
  schema: ZodType<T>;
  handleSubmit: (values:T) => void
}


export const GenericCotentForm = <T extends FieldValues>({defaultValues, schema , mode, handleSubmit}:GenericFormProps<T>) => {
  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema, defaultValues),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {Object.keys(defaultValues).filter().map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{field.name}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} required autoComplete="true" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name={field as Path<T>}
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
          name={field as Path<T>}
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
      </form>
    </Form>
  );
}
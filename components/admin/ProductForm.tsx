"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { productSchema } from "@/lib/validations"
import { SelectTrigger } from "@radix-ui/react-select"
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select"
import { PRODUCT_TYPE } from "@/app/constants"
import { Switch } from "../ui/switch"
import { Category } from "@/generated/prisma"
import { useState, useEffect } from "react"
import ImageUpload from "../ImageUpload"
import { toast } from "sonner"
import RichTxtEditor from "../richTxtEditor/RichTxtEditor"
import { InputTagMultiSelect, InputTagSimple } from "../InputTag"



export function ProductForm() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionNameList, setSectionNameList] = useState<string[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      availableForPurchase : true,
      description : "",
      price : 0,
      stock : 0,
      rating : 0,
      categoryId : '',
      downloadUrl : '',
      filePath : "",
      sectionNames : [],
      productTags : [],
      productType : PRODUCT_TYPE.PHYSICAL,
    },
  })

  // 2. Form submit handler.
  async function onSubmit(values: z.infer<typeof productSchema>) {
    console.log('button  triggered' )

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      });

      console.log(values);
      const images = values.image
      console.log(images);

      toast.success('Product Added Successfully')
      // await uploadFiles(images);
      
    } catch (error) {
      console.log('error: ' + error)
      toast.error('Something went wrong!')
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories"); // Call your API
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json(); // Parse JSON
        setCategories(data); // Set categories in state
        setLoading(false);
      } catch (err) {
        setError(err.message); // Handle errors
        setLoading(false);
      }
    }

    async function getAllSections(){
      try {
          const response = await fetch(`http://localhost:3000/api/section`);
          const data = await response.json();
          const nameList:string[] = data.sections.length > 0 ? data.sections.map((section:Section) => section.name) : []
          setSectionNameList(nameList);
      } catch (error) {
          console.error("Failed to fetch sections error:", error);
          throw new Error("Failed to fetch sections");
      }
    }
          
    getAllSections();
    fetchCategories();
  }, []);

  const tagList = ['Trendind', 'Popular', 'New Arrivals']
    //reset logic
  // useEffect(() => {
  //   form.reset({ ...defaultValues, ...initialValues });
  // }, [initialValues]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 capitalize w-[450px] p-8 rounded-md border-2 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>product name</FormLabel>
              <FormControl>
                <Input placeholder="OnePlus Nord Buds 2r" type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>product type</FormLabel>
              <FormControl>
              <Select {...field} required>
                <SelectTrigger className=" text-sm text-start form-select px-2 py-1 border-2 rounded-md">
                  <SelectValue placeholder='PHYSICAL'/>
                </SelectTrigger>
                <SelectContent className="text-sm border-2">
                  <SelectItem value={PRODUCT_TYPE.PHYSICAL}>{PRODUCT_TYPE.PHYSICAL}</SelectItem>
                  <SelectItem value={PRODUCT_TYPE.DIGITAL}>{PRODUCT_TYPE.DIGITAL}</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>product price</FormLabel>
              <FormControl>
                <Input placeholder="100.00" type="number" {...field}  required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>product quantity</FormLabel>
              <FormControl>
                <Input placeholder="10.00" type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>product rating</FormLabel>
              <FormControl>
                <Input placeholder="0-5" type="number" {...field}  value={field.value} />
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
              <FormLabel>product description</FormLabel>
              <FormControl>
              <RichTxtEditor content={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                      <SelectTrigger className=" text-sm text-start form-select px-2 py-1 border-2 rounded-md">
                        <SelectValue placeholder='Select Category'/>
                      </SelectTrigger>
                    <SelectContent className="text-sm border-2">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                      <SelectItem value={'category'}>+ Add New Category</SelectItem>
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
              <FormLabel>Section Labels</FormLabel>
              <FormControl>
              <InputTagMultiSelect tagList={sectionNameList} selectedTags={field.value || []} setTags={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Labels</FormLabel>
              <FormControl>
              <InputTagSimple selectedTags={field.value || []} setTags={field.onChange}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Upload Images</FormLabel> */}
              <FormControl>
                <ImageUpload onFileChange={field.onChange} folderName="products" />
              </FormControl>
              <FormDescription>
                {field.value && 'Uploaded Images'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
              control={form.control}
              name="availableForPurchase"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Product Available for purchase</FormLabel>
                    <FormDescription>
                      is product available for purchase
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        <Button type="submit" className="cursor-pointer">Submit</Button>
      </form>
    </Form>
  )
}



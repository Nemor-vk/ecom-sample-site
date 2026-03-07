"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { toast } from "sonner"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Product, UsageLimitPeriod } from "@/generated/prisma"
import { discountSchema } from "@/lib/validations"
import ca from "zod/v4/locales/ca.cjs"
import { ExtendedDiscount } from "@/prisma/extendedModelTypes"
import { fi } from "date-fns/locale"
import { set } from "date-fns"

type DiscountFormValues = z.infer<typeof discountSchema>

// interface Discount {
//   id: string
//   code: string
//   name: string
//   description?: string
//   type: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING" | "BUY_X_GET_Y"
//   value: number
//   minOrderAmount?: number
//   maxDiscountAmount?: number
//   usageLimit?: number
//   usedCount: number
//   isActive: boolean
//   validFrom: string
//   validUntil?: string
//   applicableProducts: []
//   applicableCategories: []
// }

interface DiscountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  discount?: ExtendedDiscount | null
  onSuccess: () => void
}

export function DiscountDialog({ open, onOpenChange, discount, onSuccess }: DiscountDialogProps) {
  // const [discount, setDiscount] = useState(discountValues)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
   
   useEffect(() => {
    // console.log(
    //   "Resetting form with discount:",
    //   discount?.code,
    //   form,
    //   form.getValues()
    // );
    if (open) {
      fetchProducts();
      fetchCategories();
      // setDiscount(discountValues);
    }
   }, [open, discount]);

   
   const form = useForm<DiscountFormValues>({
     resolver: zodResolver(discountSchema),
     defaultValues:{
       code: discount?.code ?? "",
       name: discount?.name ?? "",
       description: discount?.description ?? "",
       type: discount?.type,
       value: discount?.value ?? 0,
       minOrderAmount: discount?.minOrderAmount ?? 0,
       maxDiscountAmount: discount?.maxDiscountAmount ?? 0,
       usageLimit: discount?.usageLimit ?? 1,
       isActive: discount?.isActive ?? true,
       validFrom: new Date(discount?.validFrom ?? Date.now()).toISOString().split("T")[0],
       validUntil: discount?.validUntil ? new Date(discount.validUntil).toISOString().split("T")[0] : "",
       applicableProducts: discount?.products ? discount.products.map(product => product.id) : [],
       applicableCategories: discount?.categories ? discount.categories.map(category => category.id) : [],
      },
    })
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product")
      if (response.ok) {
        const data = await response.json()
        setProducts(data|| [])
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data|| [])
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  // Handle form submission
  // This function will be called when the form is submitted
  const onSubmit = async (values: DiscountFormValues) => {
    setLoading(true)

    console.log("Submitting discount:", values)

    try {
      const url = discount ? `/api/discounts/${discount.id}` : "/api/discounts"
      const method = discount ? "PUT" : "POST"
      const payload = {
        ...values,
        value: values.type === "FREE_SHIPPING" ? 0 : Number(values.value),
        minOrderAmount: values.minOrderAmount ? Number(values.minOrderAmount) : undefined,
        maxDiscountAmount: values.maxDiscountAmount ? Number(values.maxDiscountAmount) : undefined,
        usageLimit: values.usageLimit ? Number(values.usageLimit) : undefined,
        validFrom: new Date(values.validFrom).toISOString(),
        validUntil: values.validUntil ? new Date(values.validUntil).toISOString() : null,
      }
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error("Failed to save discount")
      
      // Sucess notification
      toast.success("Success", {
        description: `Discount ${discount ? "updated" : "created"} successfully`,
      })

      onSuccess()
      onOpenChange(false)
    } catch {
      toast.error("Error", {
        description: `Failed to ${discount ? "update" : "create"} discount`,
      })
    } finally {
      form.reset({
        code: "",
        name: "",
        description: "",
        type: "PERCENTAGE",
        value: 0,
        minOrderAmount: 0,
        maxDiscountAmount: 0,
        usageLimit: 1,
        isActive: true,
        validFrom: new Date().toISOString().split("T")[0],
        validUntil: "",
        applicableProducts: [],
        applicableCategories: [],
      })  
      setLoading(false)
    }
  }

  // Helpers for products/categories
  const addProduct = (productId: string) => {
    const current = form.getValues("applicableProducts")
    if (!current.includes(productId)) {
      form.setValue("applicableProducts", [...current, productId])
    }
  }
  const removeProduct = (productId: string) => {
    form.setValue(
      "applicableProducts",
      form.getValues("applicableProducts").filter((id) => id !== productId)
    )
  }
  const addCategory = (categoryId: string) => {
    const current = form.getValues("applicableCategories")
    if (!current.includes(categoryId)) {
      form.setValue("applicableCategories", [...current, categoryId])
    }
  }
  const removeCategory = (categoryId: string) => {
    form.setValue(
      "applicableCategories",
      form.getValues("applicableCategories").filter((c) => c !== categoryId)
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>
            {discount ? "Edit Discount" : "Create New Discount"}
          </DialogTitle>
          <DialogDescription>
            {discount
              ? "Update discount details"
              : "Create a new discount code or promotional offer"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Code *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                        placeholder={field.value || "SAVE20"}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={field.value || "20% Off Summer Sale"}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={field.value || "Save 20% on all summer items"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={field.value || "Select discount type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        <SelectItem value="FIXED_AMOUNT">
                          Fixed Amount
                        </SelectItem>
                        <SelectItem value="FREE_SHIPPING">
                          Free Shipping
                        </SelectItem>
                        <SelectItem value="BUY_X_GET_Y">Buy X Get Y</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Value *{" "}
                      {form.watch("type") === "PERCENTAGE"
                        ? "(%)"
                        : form.watch("type") === "FIXED_AMOUNT"
                        ? "($)"
                        : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder={
                          // form.watch("type") === "PERCENTAGE" ? "20" : "10.00"
                          field.value?.toString() || (form.watch("type") === "PERCENTAGE" ? "20" : "10.00")
                        }
                        required={form.watch("type") !== "FREE_SHIPPING"}
                        disabled={form.watch("type") === "FREE_SHIPPING"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minOrderAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder={field.value?.toString() || "50.00"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxDiscountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Discount Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder={field.value?.toString() || "100.00"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="validFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid From *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validUntil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid Until</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" placeholder={field.value?.toString() || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="usageLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Limit</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder={field.value?.toString() || "100"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usageLimitPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Limit Period</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={field.value || "Select period"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UsageLimitPeriod).map((period) => (
                          <SelectItem key={period} value={period}>
                            {period.charAt(0).toUpperCase() +
                              period.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isActive"
                    />
                  </FormControl>
                  <FormLabel htmlFor="isActive">Active</FormLabel>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicableProducts"
                render={() => (
                  <FormItem>
                    <FormLabel>Applicable Products</FormLabel>
                    <FormDescription>
                      Leave empty to apply to all products
                    </FormDescription>
                    <Select onValueChange={addProduct}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={ "Add product"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products
                          .filter((p) => !form.watch("applicableProducts").includes(p.id))
                          .map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("applicableProducts").length === 0 && (
                        <span className="text-muted-foreground text-xs">No products selected</span>
                      )}
                      {form.watch("applicableProducts").map((productId) => {
                        const product = products.find((p) => p.id === productId);
                        return (
                          <Badge
                            key={productId}
                            variant="secondary"
                            className="flex items-center gap-1 px-2 py-1 text-xs"
                          >
                            {product?.name || productId}
                            <button
                              type="button"
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={() => removeProduct(productId)}
                              aria-label="Remove product"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicableCategories"
                render={() => (
                  <FormItem>
                    <FormLabel>Applicable Categories</FormLabel>
                    <FormDescription>
                      Leave empty to apply to all categories
                    </FormDescription>
                    <Select onValueChange={addCategory}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Add category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          .filter((c) => !form.watch("applicableCategories").includes(c.id))
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center justify-between">
                                <span>{category.name}</span>
                                {form.watch("applicableCategories").includes(category.id) && (
                                  <svg className="w-4 h-4 text-green-500 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("applicableCategories").length === 0 && (
                        <span className="text-muted-foreground text-xs">No categories selected</span>
                      )}
                      {form.watch("applicableCategories").map((categoryId) => {
                        const category = categories.find((c) => c.id === categoryId);
                        return (
                          <Badge
                            key={categoryId}
                            variant="secondary"
                            className="flex items-center gap-1 px-2 py-1 text-xs"
                          >
                            {category?.name || categoryId}
                            <button
                              type="button"
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={() => removeCategory(categoryId)}
                              aria-label="Remove category"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : discount
                  ? "Update Discount"
                  : "Create Discount"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

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

const discountSchema = z.object({
  code: z.string().min(1, "Discount code is required"),
  name: z.string().min(1, "Display name is required"),
  description: z.string().optional(),
  type: z.enum(["PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING", "BUY_X_GET_Y"]),
  value: z.string().optional(),
  minOrderAmount: z.string().optional(),
  maxDiscountAmount: z.string().optional(),
  usageLimit: z.string().optional(),
  isActive: z.boolean(),
  validFrom: z.string().min(1, "Valid from date is required"),
  validUntil: z.string().optional(),
  applicableProducts: z.array(z.string()),
  applicableCategories: z.array(z.string()),
})

type DiscountFormValues = z.infer<typeof discountSchema>

interface Discount {
  id: string
  code: string
  name: string
  description?: string
  type: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING" | "BUY_X_GET_Y"
  value: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  usageLimit?: number
  usedCount: number
  isActive: boolean
  validFrom: string
  validUntil?: string
  applicableProducts: string[]
  applicableCategories: string[]
}

interface DiscountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  discount?: Discount | null
  onSuccess: () => void
}

export function DiscountDialog({ open, onOpenChange, discount, onSuccess }: DiscountDialogProps) {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const defaultValues: DiscountFormValues = {
    code: "",
    name: "",
    description: "",
    type: "PERCENTAGE",
    value: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    isActive: true,
    validFrom: new Date().toISOString().split("T")[0],
    validUntil: "",
    applicableProducts: [],
    applicableCategories: [],
  }

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues,
  })

  // Populate form when editing
  useEffect(() => {
    if (discount) {
      form.reset({
        code: discount.code,
        name: discount.name,
        description: discount.description || "",
        type: discount.type,
        value: discount.value.toString(),
        minOrderAmount: discount.minOrderAmount?.toString() || "",
        maxDiscountAmount: discount.maxDiscountAmount?.toString() || "",
        usageLimit: discount.usageLimit?.toString() || "",
        isActive: discount.isActive,
        validFrom: discount.validFrom.split("T")[0],
        validUntil: discount.validUntil?.split("T")[0] || "",
        applicableProducts: discount.applicableProducts,
        applicableCategories: discount.applicableCategories,
      })
    } else {
      form.reset(defaultValues)
    }
    // eslint-disable-next-line
  }, [discount, open])

  useEffect(() => {
    if (open) {
      fetchProducts()
      fetchCategories()
    }
    // eslint-disable-next-line
  }, [open])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?limit=100")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories?limit=100")
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories?.map((c: any) => c.name) || [])
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const onSubmit = async (values: DiscountFormValues) => {
    setLoading(true)
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
  const addCategory = (category: string) => {
    const current = form.getValues("applicableCategories")
    if (!current.includes(category)) {
      form.setValue("applicableCategories", [...current, category])
    }
  }
  const removeCategory = (category: string) => {
    form.setValue(
      "applicableCategories",
      form.getValues("applicableCategories").filter((c) => c !== category)
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>{discount ? "Edit Discount" : "Create New Discount"}</DialogTitle>
          <DialogDescription>
            {discount ? "Update discount details" : "Create a new discount code or promotional offer"}
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
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        placeholder="SAVE20"
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
                      <Input {...field} placeholder="20% Off Summer Sale" required />
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
                    <Textarea {...field} placeholder="Save 20% on all summer items" />
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
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                        <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
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
                        placeholder={form.watch("type") === "PERCENTAGE" ? "20" : "10.00"}
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
                      <Input {...field} type="number" step="0.01" placeholder="50.00" />
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
                      <Input {...field} type="number" step="0.01" placeholder="100.00" />
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
                      <Input {...field} type="date" />
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
                      <Input {...field} type="number" placeholder="100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2 pt-8">
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
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applicable Products</CardTitle>
                  <CardDescription>Leave empty to apply to all products</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select onValueChange={addProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add product" />
                    </SelectTrigger>
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
                  <div className="flex flex-wrap gap-2">
                    {form.watch("applicableProducts").map((productId) => {
                      const product = products.find((p) => p.id === productId)
                      return (
                        <Badge key={productId} variant="secondary" className="flex items-center gap-1">
                          {product?.name || productId}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeProduct(productId)} />
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applicable Categories</CardTitle>
                  <CardDescription>Leave empty to apply to all categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select onValueChange={addCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => !form.watch("applicableCategories").includes(c))
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {form.watch("applicableCategories").map((category) => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeCategory(category)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : discount ? "Update Discount" : "Create Discount"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

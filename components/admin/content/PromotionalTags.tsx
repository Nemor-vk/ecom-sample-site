"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Upload } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { addNewPromotionalTagApi, deletePromotionAtIdApi, getAllPromotionalTags, getAllPromotionalTagsApi, togglePromotionStatusApi, UpdateOrAddPromotionalTagApi, updatePromotionalTagApi, UpdatePromotionalTagApi } from "@/service/promotionTags.service"
import { Section } from "@/generated/prisma"
import PromotionalTagForm from "./forms/PromotionalTagForm"
import { promotionalTagSchema } from "@/lib/validations"
import { z } from "zod"
import { envConfig } from "@/lib/envConfig"
import RichTxtEditor from "@/components/richTxtEditor/RichTxtEditor"

export function PromotionalTags() {
    
  const [tags, setTags] = useState<Section[]>([]);

  useEffect(() => {
    getAllPromotionalTagsApi(setTags);
  }, [])
  

  const [showDialog, setShowDialog] = useState(false)
  const [formMode, setFormMode] = useState<'edit' | 'add' | null>(null)
  const [selectedTag, setSelectedTag] = useState<Section | null>(null)

  const handleEdit = (tag: Section) => {
    setFormMode('edit')
    setSelectedTag(tag);
    setShowDialog(true)
  }

  const handleDelete = async(id: string) => {
    const res = await deletePromotionAtIdApi(id);

    if(!res) {
      return
    }
    setTags(tags.filter((tag) => tag.id !== id))
    toast("Tag deleted", {
      description: "Promotional tag has been deleted successfully.",
    })
  }

  const handleToggle = async(tagClicked:Section) => {

    const res = await updatePromotionalTagApi({ ...tagClicked, isActive: !tagClicked.isActive }, tagClicked.id);
     if(!res) {
      return
    }
    setTags(tags.map((tag) => (tag.id === tagClicked.id ? { ...tag, isActive: !tag.isActive } : tag)))
    toast.info("Tag Status Updated", {
      description: "Promotional Visibility Status has been updated.",
    })
  }

  const handleSubmit = async (values: z.infer<typeof promotionalTagSchema>) => {

    try {
      if(selectedTag && selectedTag.id.length > 0 && formMode === 'edit' ){
        const updatedTag = await updatePromotionalTagApi(values, selectedTag.id);

        if(!updatedTag)  {
          throw new Error("Failed to update new promotion")
        }
        setTags(tags.map((tag) => (tag.id === selectedTag.id ? { ...tag, ...values } : tag)))

        toast.success("Tag updated", {
        description: "Promotional tag has been updated successfully.",
        })
    
      } else if(formMode === 'add') {
        const newTag = await addNewPromotionalTagApi(values);

        if(!newTag)  {
          throw new Error("Failed to add new promotion")
        }
        setTags([...tags, newTag]);
        
        toast.success("Tag Added", {
        description: "Promotional tag created successfully.",
        })
      } else {
        toast.warning("Invalid Selection", {
        description: "Select a valid Promotion",
        })
        throw new Error("Invalid Promotional Tag Selected");
      }
    } catch (error) {
      toast.error("Failed to add/ update promotion", {
        description: "something went wrong",
      })
      console.log("Failed to Update Promotioal Tag - ", error)
    } finally {
      setSelectedTag(null);
      setFormMode(null);
    }


    setShowDialog(false)
    setFormMode(null)
  }

  const openCreateDialog = () => {
    setFormMode('add')
    setShowDialog(true)
  }

  const closeDialogBox = () => {
    setFormMode(null)
    setShowDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Promotional Tags</h3>
          <p className="text-sm text-muted-foreground">Manage promotional banners and tags for your site</p>
        </div>
        <Button onClick={openCreateDialog} size={'lg'}>
          <Plus className="h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tags.length > 0 && tags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{tag.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant={tag.isActive ? "default" : "secondary"}>{tag.isActive ? "Active" : "Inactive"}</Badge>
                  <Switch checked={tag.isActive || false} onCheckedChange={() => handleToggle(tag)} />
                </div>
              </div>
              <CardDescription>
                <RichTxtEditor content={tag.description || 'No Description'} isEditable={false} className="inline-block min-h-0 p-0 border-0 rounded-none" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 mt-auto">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <Image src={tag.imageUrl ? envConfig.env.imageKit.url + tag.imageUrl : "/placeholder.svg"} height={400} width={400} alt={tag.name} quality={100} className="w-full h-full object-cover aspect-square" />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEdit(tag)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(tag.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formMode ? "Edit Promotional Tag" : "Create Promotional Tag"}</DialogTitle>
            <DialogDescription>
              {formMode ? "Update the promotional tag details." : "Create a new promotional tag for your site."}
            </DialogDescription>
          </DialogHeader>

          <PromotionalTagForm onSubmit={handleSubmit} onCancel={closeDialogBox} initialValues={{
            name:selectedTag?.name ?? '',
            description : selectedTag?.description ?? '',
            imageUrl : selectedTag?.imageUrl || null,
            isActive : selectedTag?.isActive ?? false
            }} />
          {/* <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tag-name">Name</Label>
                <Input
                  id="tag-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag-description">Description</Label>
                <Textarea
                  id="tag-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Button type="button" variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">{formMode ? "Update Tag" : "Create Tag"}</Button>
            </DialogFooter> */}
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
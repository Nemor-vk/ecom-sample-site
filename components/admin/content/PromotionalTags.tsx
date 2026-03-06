"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Upload, TriangleAlert } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { addNewPromotionalTagApi, deletePromotionAtIdApi, getAllPromotionalTags, getAllPromotionalTagsApi, togglePromotionStatusApi, UpdateOrAddPromotionalTagApi, updatePromotionalTagApi, UpdatePromotionalTagApi } from "@/service/promotionTags.service"
import { Section } from "@/generated/prisma"
import PromotionalTagForm from "./forms/PromotionalTagForm"
import { promotionalTagSchema } from "@/lib/validations"
import { z } from "zod"
import { envConfig } from "@/lib/envConfig"
import RichTxtEditor from "@/components/richTxtEditor/RichTxtEditor"
import { STATUS_CODES } from "@/app/constants/errorConstants"

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

  const handleDelete = async(id: string, overrideDelete?:boolean) => {
    const res = await deletePromotionAtIdApi(id, overrideDelete);

    if(res != 200) {
      return res
    }

    setTags(tags.filter((tag) => tag.id !== id))
    return 200
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

        if(newTag === null)  {
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
    setSelectedTag(null)
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
        {tags && tags.map((tag) => (
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
                {/* <Button variant="outline" size="sm" onClick={() => handleDelete(tag.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button> */}
                <AlertDeletePopup handleDelete={handleDelete} tagId={tag.id}/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formMode === 'edit' ? "Edit Promotional Tag" : "Create Promotional Tag"}</DialogTitle>
            <DialogDescription>
              {formMode === 'edit' ? "Update the promotional tag details." : "Create a new promotional tag for your site."}
            </DialogDescription>
          </DialogHeader>

          { formMode && <PromotionalTagForm onSubmit={handleSubmit} onCancel={closeDialogBox} mode={formMode} initialValues={{
            name:selectedTag?.name ?? '',
            description : selectedTag?.description ?? '',
            imageUrl : selectedTag?.imageUrl || null,
            isActive : selectedTag?.isActive ?? false
            }} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// --------------------------------------------------------------------------------------

const AlertDeletePopup  = ( {tagId, handleDelete}:{tagId:string, handleDelete: (id:string, overrideDelete?:boolean)=> Promise<number>}) => {
  
  const [openDialog, setOpenDialog] = useState(false)

  const handleOnClick = async() => {
   const statusCode = await handleDelete(tagId);

   if(statusCode === STATUS_CODES.CONFLICT) {
    setOpenDialog(true);
   }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleOnClick}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2">
            {/* <TriangleAlert className="text-foreground/80"/> */}
            Are you absolutely sure? 
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the promotion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(tagId, true)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
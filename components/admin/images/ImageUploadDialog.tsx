"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Search, Upload, X, Check, Plus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { describe } from "node:test"
import { envConfig } from "@/lib/envConfig"
import { siteApiConfig } from "@/lib/config/sitePathsConfig"
import { ImageResponseModel } from "@/models/ImageResponseModel"
import { SideUploadImgBtn } from "@/components/ImageUpload"

// // Mock gallery images - replace with actual ImageKit API calls
// const mockGalleryImages = [
//   "/placeholder.svg?height=400&width=400&text=Product+1",
//   "/placeholder.svg?height=400&width=400&text=Product+2",
//   "/placeholder.svg?height=400&width=400&text=Product+3",
//   "/placeholder.svg?height=400&width=400&text=Product+4",
//   "/placeholder.svg?height=400&width=400&text=Product+5",
//   "/placeholder.svg?height=400&width=400&text=Product+6",
//   "/placeholder.svg?height=400&width=400&text=Product+7",
//   "/placeholder.svg?height=400&width=400&text=Product+8",
// ]

async function fetchImages(folder: string) {
  try {
    const res = await fetch(siteApiConfig.images.fetchAllImagesApi + encodeURIComponent(folder));
    if (!res.ok) throw new Error('Failed to fetch gallery images');

    const data = await res.json();
    console.log('Fetched gallery images:', data);
    return data;
  } catch (err) {
    console.error('Error fetching gallery images:', err);
    toast.error('Failed to load Gallery Images')
    return [];
  }
}

interface ImageUploadDialogProps {
  onImagesSelected: (imageUrls: string[]) => void
  selectedImages?: string[]
  maxImages?: number
  folderName : string
}

export function ImageUploadDialog({ onImagesSelected, selectedImages = [], maxImages = 8, folderName }: ImageUploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [galleryImages, setGalleryImages] = useState<ImageResponseModel[]>([])
  const [selectedGalleryImages, setSelectedGalleryImages] = useState<string[]>(selectedImages)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const stableSelectedGalleryImages = useMemo(() => selectedGalleryImages, [selectedGalleryImages]);
  const stableGalleryImages = useMemo(() => galleryImages, [galleryImages]);
  const stablePreviewUrls = useMemo(() => {
    return uploadedFiles.map(file => URL.createObjectURL(file));
  }, [uploadedFiles]);



  useEffect(() => {

    const loadGalleryImages = async() => {
      setGalleryImages(await fetchImages('products'))
    }

    loadGalleryImages();
    console.log("Gallery images: ", galleryImages)
    console.log("selected gallery images: ", selectedGalleryImages)

    // Create object URLs
    const urls = uploadedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(stablePreviewUrls);

    // Cleanup on unmount or when uploadedFiles change
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, selectedGalleryImages]);


  // Filter gallery images based on search
  const filteredImages:ImageResponseModel[] = galleryImages.filter((galleryImage) =>
    galleryImage.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle gallery image selection
  const toggleGalleryImage = (imageUrl: string) => {
    setSelectedGalleryImages((prev) => {
      if (prev.includes(imageUrl)) {
        return prev.filter((url) => url !== imageUrl)
      } else if (prev.length < maxImages) {
        return [...prev, imageUrl]
      } else if ( prev.length >= maxImages ){
        toast.warning(`You can select up to ${maxImages} images only`, {
          icon: '📸',
          duration: 1000,
        });
      }

      return prev
    })
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (uploadedFiles.length + selectedGalleryImages.length + imageFiles.length <= maxImages) {
      setUploadedFiles((prev) => [...prev, ...imageFiles])
    } else {
      toast.warning("Oops! You can’t pick more than 8 images." )
    }
  }

  // Remove uploaded file
  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Mock upload to ImageKit
  const uploadToImageKit = async (files: File[]): Promise<string[]> => {
    setUploading(true)
    try {
      const formData = new FormData();

      for (const file of Array.from(files)) {
        formData.append("images", file); // 'images' matches the field name in your API
      }

      formData.append("folder", folderName); // Optional folder field

      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Uploaded images:", result);


      // Mock response - replace with actual ImageKit upload
      return result.map((result) => result.filePath)
    } finally {
      setUploading(false)
    }
  }

  // Handle confirm selection
  const handleConfirm = async () => {
    let uploadedImageUrls: string[] = []

    if (uploadedFiles.length > 0) {
      uploadedImageUrls = await uploadToImageKit(uploadedFiles)
    }

    console.log('Uploaded image files' , uploadedImageUrls)

    const allSelectedImages = [...selectedGalleryImages, ...uploadedImageUrls]
    onImagesSelected(allSelectedImages)
    setOpen(false)

    toast.info("Image Uploaded successfully")

    // Reset state
    setUploadedFiles([])
    setSearchQuery("")
    setSelectedGalleryImages([])
  }

  const totalSelected = selectedGalleryImages.length + uploadedFiles.length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center relative z-0 w-full">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <div className="mt-2">
            <Button type="button" variant="outline" size="sm">
              {'Upload Images'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Images</DialogTitle>
          <DialogDescription>
            Choose from gallery or upload new images. You can select up to {maxImages} images.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Badge variant="secondary">{selectedGalleryImages.length} selected</Badge>
            </div>

            <ScrollArea className='h-[500px] overflow-auto hide-scrollbar pb-12 '>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-1">
                {filteredImages.map((filteredImage, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                      selectedGalleryImages.includes(filteredImage.imagePath)
                        ? "border-primary/40 ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground",
                    )}
                    onClick={() => toggleGalleryImage(filteredImage.imagePath)}
                  >
                    <Image
                      src={filteredImage.imagePath ? envConfig.env.imageKit.url + filteredImage.imagePath : "/placeholder.jpg"}
                      alt={`Gallery image ${index + 1}`}
                      width={100}
                      height={100}
                      className={cn("w-full object-cover aspect-square transition duration-300 ease-in-out group-hover:blur-xs z-0",
                      )}
                    />

                    {selectedGalleryImages.includes(filteredImage.imagePath) && (
                      <div className="absolute z-10 bg-primary/10 inset-0 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-primary/20 text-primary-foreground rounded-full p-2 aspect-square w-fit">
                          <Check className="w-5 h-5" />
                        </div>
                        {/* <p className="font-medium text-xs">{filteredImage.name}</p>
                        <p className="text-sm text-muted-foreground">{(filteredImage.size / 1024 / 1024).toFixed(2)} MB</p> */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-xl font-medium mb-2">Upload Images</p>
                <p className="text-muted-foreground mb-6">Click to select files or drag and drop</p>
                <Button type="button" size="lg">
                  Choose Files
                </Button>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Selected Files ({uploadedFiles.length})</h4>
                <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(110px,1fr))] grid-rows-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg aspect-square relative group ">
                      <div className="flex items-center space-x-3 w-full">
                        <Image src={previewUrls[index] || '/placeholder.jpg'} alt="img" fill className="w-full aspect-square object-cover transition duration-300 ease-in-out rounded-lg group-hover:blur-xs" />
                        <div className="absolute inset-0 truncate flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-background/15">
                          <p className="font-medium text-xs">{file.name}</p>
                          <p className="text-sm text-primary/55">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button className="absolute top-0 right-0" variant="ghost" size="sm" onClick={() => removeUploadedFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {totalSelected} of {maxImages} images selected
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={totalSelected === 0 || uploading}>
              {uploading ? "Uploading..." : "Confirm Selection"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

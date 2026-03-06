"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUploadDialog } from "./ImageUploadDialog"

interface ProductImage {
  id: string
  url: string
  name: string
}

interface ProductImageManagerProps {
  initialImages?: ProductImage[]
  maxImages?: number
  onImagesChange?: (images: ProductImage[]) => void
}

export function ProductImageManager({ initialImages = [], maxImages = 10, onImagesChange }: ProductImageManagerProps) {
  const [images, setImages] = useState<ProductImage[]>(initialImages)

  const handleImagesSelected = (selectedImages: ProductImage[]) => {
    const newImages = [...images, ...selectedImages]
    setImages(newImages)
    onImagesChange?.(newImages)
  }

  const removeImage = (imageId: string) => {
    const updatedImages = images.filter((img) => img.id !== imageId)
    setImages(updatedImages)
    onImagesChange?.(updatedImages)
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images]
    const [movedImage] = updatedImages.splice(fromIndex, 1)
    updatedImages.splice(toIndex, 0, movedImage)
    setImages(updatedImages)
    onImagesChange?.(updatedImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Product Images</h3>
        <ImageUploadDialog onImagesSelected={handleImagesSelected} selectedImages={images} maxImages={maxImages} />
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={image.id} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => removeImage(image.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Primary</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2 truncate">{image.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h4 className="text-lg font-medium mb-2">No images added</h4>
              <p className="text-muted-foreground mb-4">Add images to showcase your product</p>
              <ImageUploadDialog
                onImagesSelected={handleImagesSelected}
                selectedImages={images}
                maxImages={maxImages}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

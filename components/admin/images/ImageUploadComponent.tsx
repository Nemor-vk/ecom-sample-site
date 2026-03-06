'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';

type Props = {
  form: UseFormReturn<any>;
  name: string;
};

export default function ImageUploader({ form, name }: Props) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    form.setValue(name, files);

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Clean up object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <FormItem>
      <FormLabel>Upload Images</FormLabel>
      <FormControl>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </FormControl>
      <FormMessage />

      <div className="grid grid-cols-3 gap-4 mt-4">
        {previewUrls.map((src, idx) => (
          <Image key={idx} src={src} alt={`Preview ${idx}`} height={100} width={100} className="w-full h-auto rounded" />
        ))}
      </div>
    </FormItem>
  );
}
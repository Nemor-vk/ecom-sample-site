import React, { useRef, useState } from 'react'
import { IKImage, IKVideo, IKContext, IKUpload, ImageKitProvider } from 'imagekitio-next';
// import { Image, ImageKitProvider } from '@imagekit/next';
import { envConfig } from '@/lib/envConfig';
import { Button } from './ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { Upload } from 'lucide-react';

const authenticator = async () => {
  try {
      const response = await fetch("/api/imageKit");
      if (!response.ok) {
          // If  response is the servernot successful, extract the error text for debugging.
          const errorText = await response.text();
          throw new Error(`Authentication failed with status ${response.status}: ${errorText}`);
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
  } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
  }
};

const publicKey = envConfig.env.imageKit.publicKey;


const ImageUpload = ({onFileChange, folderName, imagePaths}: { onFileChange : (filePath:string[]) => void, folderName: string, imagePaths?: string[]}) => {

  const ikUploadRef = useRef(null);
  const [images, setImages] = useState<string[]>(imagePaths ?? []);

  const onError = (error: any) => {
    console.log(error);
    toast.error('Image Upload Failed')
  };
  const onSuccess = (res: any) => {
    console.log(res)
    console.log("images ", images)
    setImages((prevImages) => [...prevImages, res.filePath]);
    const filePathList = [...images, res.filePath];
    onFileChange(filePathList);
    toast.success('Image Upload Successful')
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={envConfig.env.imageKit.url as string} authenticator={authenticator} >
      <IKUpload className='hidden' ref={ikUploadRef} folder={folderName}  onSuccess={onSuccess} onError={onError} useUniqueFileName={true}  />
      <Button onClick={(e) => {
        e.preventDefault();

        if(ikUploadRef.current) {
          //@ts-ignore
          ikUploadRef.current?.click();
        }
      }}
      >Upload Images</Button>

      <div className='grid grid-cols-3 gap-2 mx-auto mt-4 w-full'>
      {images &&
        images.map((image, index) => (
          <IKImage
            key={index}
            alt={image}
            path={image}
            height={120}
            width={120}
            className='border-2 border-gray-700 rounded-md'
          />
      ))}
      </div>

    </ImageKitProvider>
  )
}
export default ImageUpload


///////////////////////

export const SingleImageUpload = ({onFileChange, folderName, imageUrl}: { onFileChange : (filePath:string) => void, folderName: string, imageUrl: string | null}) => {

  const ikUploadRef = useRef(null);
  const [image, setImage] = useState<string | null>(imageUrl);
  console.log("url ", imageUrl)

  const onError = (error: any) => {
    console.log(error);
    toast.error('Image Upload Failed')
  };
  const onSuccess = (res: any) => {
    console.log(res)
    console.log("image ", image)
    setImage(res.filePath);
    onFileChange(res.filePath);
    toast.success('Image Upload Successful')
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={envConfig.env.imageKit.url as string} authenticator={authenticator} >
      {image ?
          <IKImage
            alt={image}
            path={image}
            height={120}
            width={120}
            className='border-2 border-gray-700 rounded-md'
          />

         : <Image src={'/assets/images/placeholder-img.png'} height={120} width={120} alt={'placeholder'} className='aspect-square' /> 
      }

      <IKUpload className='hidden' ref={ikUploadRef} folder={folderName}  onSuccess={onSuccess} onError={onError} useUniqueFileName={true}  />
      {/* <Button onClick={(e) => {
        e.preventDefault();

        if(ikUploadRef.current) {
          //@ts-ignore
          ikUploadRef.current?.click();
        }
      }}
      >{image ? 'Update Image' : 'Upload Images'}</Button> */}

      <UploadImageButton UploadRef={ikUploadRef} btnText={image ? 'Update Image' : 'Upload Images'} />
      

    </ImageKitProvider>
  )
}

const UploadImageButton = ({UploadRef, btnText}:{UploadRef:React.Ref<HTMLDivElement> , btnText:string}) => {
  return (
    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center relative z-0">
      {/* <Image src={'/assets/images/placeholder-img.png'} height={120} width={120} alt={'placeholder'} className='aspect-square absolute left-[20%] transform -translate-x-1/2 -z-10 top-1' /> */}
      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
      <div className="mt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            if (UploadRef.current) {
              //@ts-ignore
              UploadRef.current?.click();
            }
          }}
        >
          {btnText}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
    </div>
  );
};
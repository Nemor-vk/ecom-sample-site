'use client'

import { envConfig } from '@/lib/envConfig';
import { IKImage, ImageKitProvider } from 'imagekitio-next'
import React from 'react'

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

const ImageViewer = ({ filePath, height, width, className }: { filePath: string, height:number, width:number, className: string }) => {
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={envConfig.env.imageKit.url as string} authenticator={authenticator} >
        <IKImage
            alt={'img'}
            path={filePath}
            height={height}
            width={width}
            className={'' + className}
            style={{objectFit:'contain'}}
          />
    </ImageKitProvider>
  )
}

export default ImageViewer
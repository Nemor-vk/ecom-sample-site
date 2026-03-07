import type { NextApiRequest, NextApiResponse } from 'next';
import ImageKit from 'imagekit';
import { envConfig } from '@/lib/envConfig';
import { NextResponse } from 'next/server';
import { Image } from '@/generated/prisma';
import { FileObject } from 'imagekit/dist/libs/interfaces';
import { ImageResponseModel } from '@/models/ImageResponseModel';

const imagekit = new ImageKit({
  publicKey: envConfig.env.imageKit.publicKey!,
  privateKey: envConfig.env.imageKit.privateKey!,
  urlEndpoint: envConfig.env.imageKit.url!,
});

export interface ImageApiResponseInterface {
  images?: ImageResponseModel[];
  error?: string;
  status: number;
}

export async function GET(req: NextApiRequest) : Promise<ImageApiResponseInterface> {

  const url = new URL(req.url!);
  const folder = url.searchParams.get('folder');

  if (!folder) {
    return NextResponse.json({ error: 'Missing folder parameter' }, { status: 400 });
  }


  try {
    const files = await imagekit.listFiles({
      path: folder as string,
    });

    const images:ImageResponseModel[] = (files as FileObject[]).map(file  => ({
      name : file.name,
      imagePath: file.filePath,
      altText: file.name || 'gallery',
      size : file.size,
      createdAt: new Date(file.createdAt), // or use `new Date()` if not available
    }));



    return NextResponse.json(images);
  } catch (error) {
    console.log("IMAGE API :: Failed to fetch gallery images ", error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

//// UPLOAD IMAGES

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const formData = await req.formData();
  const folder = formData.get('folder')?.toString() || '/';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadedImages: any[] = [];

  const files = formData.getAll('images') as File[];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      const response = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder,
      });

      uploadedImages.push(response);
    } catch (err) {
      console.error('Upload error:', err);
    }
  }

  return NextResponse.json(uploadedImages);
}

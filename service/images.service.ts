import { PrismaClient } from '@prisma/client';
import ImageKit from 'imagekit';
import { FileObject } from 'imagekit/dist/libs/interfaces';

const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

async function syncImageKitWithDB(folder: string) {
  try {
    // 1. Fetch files from ImageKit
    const imagekitFiles: FileObject[] = await imagekit.listFiles({ path: folder });

    // 2. Fetch existing image URLs from DB
    const dbImages = await prisma.image.findMany({ select: { url: true } });
    const dbUrls = new Set(dbImages.map(img => img.url));

    // 3. Filter unlinked images
    const unlinkedFiles = imagekitFiles.filter(file => !dbUrls.has(file.url));

    console.log(`Found ${unlinkedFiles.length} unlinked images.`);

    // 4. Insert missing images into DB
    for (const file of unlinkedFiles) {
      await prisma.image.create({
        data: {
          id: file.fileId,
          url: file.url,
          altText: file.name || null,
          productId: null,
          createdAt: new Date(file.createdAt),
        },
      });
    }

    console.log('Sync complete.');
  } catch (error) {
    console.error('Error syncing images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncImageKitWithDB('your-folder-name');
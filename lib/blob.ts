import { put, del, list } from '@vercel/blob';
import { NextRequest } from 'next/server';

export async function uploadImage(file: File, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
    });
    return blob;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function deleteImage(url: string) {
  try {
    await del(url);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export async function listImages() {
  try {
    const { blobs } = await list();
    return blobs;
  } catch (error) {
    console.error('Error listing images:', error);
    throw error;
  }
}

export async function uploadProductImage(file: File, productId: string) {
  const filename = `products/${productId}-${Date.now()}.jpg`;
  return await uploadImage(file, filename);
}

export async function uploadMatchaImage(file: File, category: string) {
  const filename = `matcha/${category}-${Date.now()}.jpg`;
  return await uploadImage(file, filename);
} 
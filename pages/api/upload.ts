import { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, data, contentType } = req.body;

    if (!filename || !data) {
      return res.status(400).json({ error: 'Filename and data are required' });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(data, 'base64');
    
    // Create a File-like object
    const file = new File([buffer], filename, { type: contentType || 'image/jpeg' });

    const blob = await put(filename, file, {
      access: 'public',
    });

    res.status(200).json({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    });
  } catch (error) {
    console.error('Error uploading to blob:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
} 
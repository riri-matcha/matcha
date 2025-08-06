import { NextApiRequest, NextApiResponse } from 'next';
import { getBlobImages, saveBlobImage } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      const images = await getBlobImages(category as string);
      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching blob images:', error);
      res.status(500).json({ error: 'Failed to fetch blob images' });
    }
  } else if (req.method === 'POST') {
    try {
      const { filename, blobUrl, category, description } = req.body;
      
      if (!filename || !blobUrl) {
        return res.status(400).json({ error: 'Filename and blobUrl are required' });
      }
      
      await saveBlobImage(filename, blobUrl, category, description);
      res.status(201).json({ message: 'Blob image saved successfully' });
    } catch (error) {
      console.error('Error saving blob image:', error);
      res.status(500).json({ error: 'Failed to save blob image' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
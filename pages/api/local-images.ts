import { NextApiRequest, NextApiResponse } from 'next';

const localImages = [
  {
    id: 1,
    filename: "matcha-ceremony.jpg",
    image_url: "/matcha-ceremony.jpg",
    category: "ceremony",
    description: "Traditional Japanese matcha ceremony setup",
    uploaded_at: new Date().toISOString()
  },
  {
    id: 2,
    filename: "matcha-hero.jpg",
    image_url: "/matcha-hero.jpg",
    category: "hero",
    description: "Premium matcha powder and preparation",
    uploaded_at: new Date().toISOString()
  },
  {
    id: 3,
    filename: "matcha-latte.jpg",
    image_url: "/matcha-latte.jpg",
    category: "drinks",
    description: "Delicious matcha latte",
    uploaded_at: new Date().toISOString()
  },
  {
    id: 4,
    filename: "matcha-powder.jpg",
    image_url: "/matcha-powder.jpg",
    category: "powder",
    description: "High-quality ceremonial grade matcha powder",
    uploaded_at: new Date().toISOString()
  },
  {
    id: 5,
    filename: "matcha-quality.jpg",
    image_url: "/matcha-quality.jpg",
    category: "quality",
    description: "Premium matcha quality and texture",
    uploaded_at: new Date().toISOString()
  },
  {
    id: 6,
    filename: "raihanna.jpg",
    image_url: "/raihanna.jpg",
    category: "founder",
    description: "Raihanna - Founder and matcha enthusiast",
    uploaded_at: new Date().toISOString()
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      
      let images = localImages;
      if (category && category !== 'alla') {
        images = localImages.filter(img => img.category === category);
      }
      
      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching local images:', error);
      res.status(500).json({ error: 'Failed to fetch local images' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

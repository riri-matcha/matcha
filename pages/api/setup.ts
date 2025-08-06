import { NextApiRequest, NextApiResponse } from 'next';
import { createTables, seedProducts } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create database tables
    await createTables();
    
    // Seed with sample products
    await seedProducts();
    
    res.status(200).json({ 
      message: 'Database initialized successfully',
      tables: ['products', 'orders', 'order_items', 'matcha_images']
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
} 
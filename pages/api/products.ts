import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      
      let query = 'SELECT * FROM products WHERE is_available = true';
      const params: any[] = [];
      
      if (category && category !== 'alla') {
        query += ' AND category = $1';
        params.push(category);
      }
      
      query += ' ORDER BY created_at DESC';
      
      const result = await sql.query(query, params);
      
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, category, image_url, is_available, is_ecommerce } = req.body;
      
      const result = await sql`
        INSERT INTO products (name, description, price, category, image_url, is_available, is_ecommerce)
        VALUES (${name}, ${description}, ${price}, ${category}, ${image_url}, ${is_available}, ${is_ecommerce})
        RETURNING *
      `;
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
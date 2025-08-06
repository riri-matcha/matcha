import { sql } from '@vercel/postgres';

export async function createTables() {
  try {
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url VARCHAR(500),
        blob_url VARCHAR(500),
        is_available BOOLEAN DEFAULT true,
        is_ecommerce BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create order_items table
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create matcha_images table for blob storage
    await sql`
      CREATE TABLE IF NOT EXISTS matcha_images (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        blob_url VARCHAR(500) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

export async function seedProducts() {
  try {
    const products = [
      {
        name: "Ceremonial Grade Matcha",
        description: "Premium ceremonial grade matcha från Uji, Japan. Handplockad och traditionellt tillverkad",
        price: 299.00,
        category: "powder",
        image_url: "/matcha-powder.jpg",
        blob_url: null,
        is_available: true,
        is_ecommerce: true
      },
      {
        name: "Morning Matcha Blend",
        description: "Vår signaturblandning för perfekt morgonstart med naturlig energi",
        price: 189.00,
        category: "mix",
        image_url: "/matcha-quality.jpg",
        blob_url: null,
        is_available: true,
        is_ecommerce: true
      },
      {
        name: "Mediterranean Matcha",
        description: "Inspired by the Spanish coast - matcha med citrus och havssalt",
        price: 169.00,
        category: "mix",
        image_url: "/matcha-latte.jpg",
        blob_url: null,
        is_available: true,
        is_ecommerce: true
      },
      {
        name: "Yoga Matcha Bowl Set",
        description: "Handgjord matcha bowl för morgonritualer och mindfulness",
        price: 450.00,
        category: "accessories",
        image_url: "/matcha-ceremony.jpg",
        blob_url: null,
        is_available: true,
        is_ecommerce: true
      },
      {
        name: "Wellness Matcha Kit",
        description: "Komplett kit för hälsosam livsstil med matcha och superfoods",
        price: 899.00,
        category: "accessories",
        image_url: "/matcha-quality.jpg",
        blob_url: null,
        is_available: true,
        is_ecommerce: true
      },
      {
        name: "Healthy Matcha Snacks",
        description: "Naturliga snacks med matcha, nötter och frukt för aktiva dagar",
        price: 35.00,
        category: "snacks",
        image_url: "/matcha-powder.jpg",
        blob_url: null,
        is_available: true,
        is_ecommerce: true
      }
    ];

    for (const product of products) {
      await sql`
        INSERT INTO products (name, description, price, category, image_url, blob_url, is_available, is_ecommerce)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.category}, ${product.image_url}, ${product.blob_url}, ${product.is_available}, ${product.is_ecommerce})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

export async function saveBlobImage(filename: string, blobUrl: string, category?: string, description?: string) {
  try {
    await sql`
      INSERT INTO matcha_images (filename, blob_url, category, description)
      VALUES (${filename}, ${blobUrl}, ${category}, ${description})
    `;
    
    console.log('Blob image saved to database');
  } catch (error) {
    console.error('Error saving blob image:', error);
  }
}

export async function getBlobImages(category?: string) {
  try {
    let query = 'SELECT * FROM matcha_images';
    const params: any[] = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY uploaded_at DESC';
    
    const result = await sql.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching blob images:', error);
    return [];
  }
} 
# Riri's Matcha - Vercel Blob Storage Integration

This project demonstrates how to use Vercel Blob storage for image management in a Next.js application.

## Features

- ✅ **Vercel Blob Storage**: Serverless file storage with global CDN
- ✅ **Postgres Database**: Stores image metadata and relationships
- ✅ **Image Upload**: Drag & drop image upload with categorization
- ✅ **Image Gallery**: Display images from blob storage with filtering
- ✅ **Responsive Design**: Beautiful UI built with Tailwind CSS

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_read_write_token_here

# Vercel Postgres (if using)
POSTGRES_URL=your_postgres_connection_string_here
POSTGRES_HOST=your_postgres_host_here
POSTGRES_DATABASE=your_postgres_database_here
POSTGRES_USERNAME=your_postgres_username_here
POSTGRES_PASSWORD=your_postgres_password_here
POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_url_here
```

### 2. Get Vercel Blob Token

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** → **Blob**
4. Create a new Blob store if you haven't already
5. Copy the **Read/Write Token**

### 3. Initialize Database

1. Visit `/setup` in your application
2. Click "Initialize Database" to create tables
3. This will create the necessary database structure

### 4. Test Blob Storage

1. Visit `/blob-test` in your application
2. Upload some test images
3. View the images in the gallery

## How It Works

### Image Upload Flow

1. **File Selection**: User selects an image file
2. **Blob Upload**: Image is uploaded to Vercel Blob storage
3. **Database Save**: Metadata is saved to Postgres database
4. **Gallery Update**: Image appears in the gallery immediately

### Database Schema

```sql
-- Stores image metadata from blob storage
CREATE TABLE matcha_images (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  blob_url VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints

- `GET /api/blob-images` - Fetch all images
- `GET /api/blob-images?category=ceremony` - Fetch images by category
- `POST /api/blob-images` - Save image metadata
- `POST /api/setup` - Initialize database

## Components

### BlobImageGallery

Displays images from blob storage with:
- Loading states
- Error handling
- Category filtering
- Responsive grid layout

### ImageUpload

Handles image uploads with:
- File validation
- Category selection
- Progress indication
- Success/error messaging

## Benefits of Vercel Blob

- **Global CDN**: Images served from edge locations worldwide
- **Automatic Optimization**: Built-in image compression and formats
- **Serverless**: No server management required
- **Security**: Built-in access control and security
- **Scalability**: Handles any amount of traffic automatically

## Troubleshooting

### Common Issues

1. **"Error loading images"**
   - Check your `BLOB_READ_WRITE_TOKEN` environment variable
   - Ensure your Vercel Blob store is created and active

2. **"Upload failed"**
   - Verify your blob token has write permissions
   - Check file size limits (default: 500MB)

3. **Images not displaying**
   - Ensure `unoptimized` prop is set for external blob URLs
   - Check browser console for CORS errors

### Debug Mode

The application includes debug information in development mode. Look for the yellow debug box on the main page.

## Next Steps

- [ ] Add image deletion functionality
- [ ] Implement image resizing and optimization
- [ ] Add user authentication for uploads
- [ ] Create admin panel for image management
- [ ] Add image search and filtering

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure your Vercel project has Blob storage enabled
4. Check the [Vercel Blob documentation](https://vercel.com/docs/storage/vercel-blob)

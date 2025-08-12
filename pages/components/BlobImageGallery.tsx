import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BlobImage {
  id: number;
  filename: string;
  blob_url: string;
  category: string;
  description: string;
  uploaded_at: string;
}

interface BlobImageGalleryProps {
  category?: string;
  title?: string;
  description?: string;
}

export default function BlobImageGallery({ category, title, description }: BlobImageGalleryProps) {
  const [images, setImages] = useState<BlobImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const url = category 
          ? `/api/blob-images?category=${encodeURIComponent(category)}`
          : '/api/blob-images';
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        setImages(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
        console.error('Error fetching blob images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-slate-600">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 font-medium">Error loading images</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
          <p className="text-red-400 text-xs mt-2">
            Make sure your Vercel Blob storage is configured correctly
          </p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-slate-600 font-medium">No images found</p>
          <p className="text-slate-500 text-sm mt-2">
            {category ? `No images in category "${category}"` : 'No images uploaded yet'}
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Upload some images to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center">
          {title && (
            <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-slate-600 font-inter text-lg max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100"
          >
            <div className="relative mb-4">
              <Image
                src={image.blob_url}
                alt={image.description || image.filename}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-xl"
                unoptimized // Since these are external blob URLs
              />
              {image.category && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {image.category}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-playfair font-semibold text-slate-800 text-lg">
                {image.description || image.filename}
              </h4>
              <p className="text-slate-500 text-sm font-inter">
                Uploaded: {new Date(image.uploaded_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BlobImageProps {
  category: string;
  fallbackSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
}

interface BlobImageData {
  id: number;
  filename: string;
  blob_url: string;
  category: string;
  description: string;
  uploaded_at: string;
}

export default function BlobImage({ 
  category, 
  fallbackSrc, 
  alt, 
  width = 400, 
  height = 300, 
  className = "",
  priority = false,
  placeholder = "Loading..."
}: BlobImageProps) {
  const [blobImage, setBlobImage] = useState<BlobImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlobImage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blob-images?category=${encodeURIComponent(category)}`);
        
        if (response.ok) {
          const images = await response.json();
          if (images && images.length > 0) {
            // Get the most recent image for this category
            const latestImage = images.sort((a: BlobImageData, b: BlobImageData) => 
              new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
            )[0];
            setBlobImage(latestImage);
          }
        }
      } catch (err) {
        console.error('Error fetching blob image:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlobImage();
  }, [category]);

  // If we have a blob image, use it
  if (blobImage && !error) {
    return (
      <Image
        src={blobImage.blob_url}
        alt={blobImage.description || alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized // Since these are external blob URLs
      />
    );
  }

  // If loading, show placeholder
  if (loading) {
    return (
      <div 
        className={`bg-slate-200 animate-pulse flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-slate-500 text-sm">{placeholder}</span>
      </div>
    );
  }

  // Fallback to local image
  return (
    <Image
      src={fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

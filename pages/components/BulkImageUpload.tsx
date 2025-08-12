import { useState } from 'react';
import { uploadMatchaImage } from '../../lib/blob';

interface BulkImageUploadProps {
  onUploadSuccess?: () => void;
}

interface ImageToUpload {
  file: File;
  category: string;
  description: string;
}

export default function BulkImageUpload({ onUploadSuccess }: BulkImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pre-defined images with categories and descriptions
  const predefinedImages = [
    {
      name: "matcha-ceremony.jpg",
      category: "ceremony",
      description: "Traditional Japanese matcha ceremony setup with authentic tools"
    },
    {
      name: "matcha-hero.jpg", 
      category: "hero",
      description: "Premium ceremonial grade matcha powder in traditional bowl"
    },
    {
      name: "matcha-latte.jpg",
      category: "drinks",
      description: "Delicious matcha latte with perfect foam and presentation"
    },
    {
      name: "matcha-powder.jpg",
      category: "powder",
      description: "High-quality ceremonial grade matcha powder - vibrant green color"
    },
    {
      name: "matcha-quality.jpg",
      category: "quality",
      description: "Premium matcha quality showing fine texture and rich color"
    },
    {
      name: "raihanna.jpg",
      category: "founder",
      description: "Raihanna - Founder and matcha enthusiast, passionate about quality"
    }
  ];

  const handleBulkUpload = async () => {
    setUploading(true);
    setProgress(0);
    setMessage(null);

    try {
      // Fetch images from public folder and convert to files
      const imagePromises = predefinedImages.map(async (img, index) => {
        try {
          const response = await fetch(`/${img.name}`);
          const blob = await response.blob();
          const file = new File([blob], img.name, { type: 'image/jpeg' });
          
          return {
            file,
            category: img.category,
            description: img.description
          };
        } catch (err) {
          console.error(`Error processing ${img.name}:`, err);
          return null;
        }
      });

      const images = (await Promise.all(imagePromises)).filter(Boolean) as ImageToUpload[];
      
      if (images.length === 0) {
        throw new Error('No images could be processed');
      }

      // Upload each image
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        try {
          // Upload to blob storage
          const blob = await uploadMatchaImage(image.file, image.category);
          
          // Save to database
          const response = await fetch('/api/blob-images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filename: image.file.name,
              blobUrl: blob.url,
              category: image.category,
              description: image.description,
            }),
          });

          if (!response.ok) {
            console.error(`Failed to save metadata for ${image.file.name}`);
          }
        } catch (err) {
          console.error(`Error uploading ${image.file.name}:`, err);
        }

        // Update progress
        setProgress(((i + 1) / images.length) * 100);
      }

      setMessage({ 
        type: 'success', 
        text: `Successfully uploaded ${images.length} images to blob storage!` 
      });
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Bulk upload error:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Bulk upload failed' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
      <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
        Bulk Upload Existing Images
      </h3>
      
      <div className="mb-6">
        <p className="text-slate-600 font-inter mb-4">
          This will upload your existing website images to Vercel Blob storage, 
          making them available for dynamic use throughout your site.
        </p>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-medium text-slate-700 mb-3">Images to be uploaded:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
            {predefinedImages.map((img) => (
              <div key={img.name} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="font-medium">{img.name}</span>
                <span className="text-xs bg-slate-200 px-2 py-1 rounded">
                  {img.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleBulkUpload}
        disabled={uploading}
        className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading Images...' : 'Upload All Images to Blob Storage'}
      </button>

      {uploading && (
        <div className="mt-6">
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-slate-600 mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>
      )}

      {message && (
        <div className={`mt-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Benefits after upload:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Images served from global CDN for faster loading</li>
          <li>• Easy to update images without redeploying</li>
          <li>• Better image optimization and compression</li>
          <li>• More control over image presentation</li>
        </ul>
      </div>
    </div>
  );
}

import Head from 'next/head';
import { useState } from 'react';
import BlobImageGallery from './components/BlobImageGallery';
import ImageUpload from './components/ImageUpload';
import BulkImageUpload from './components/BulkImageUpload';

export default function BlobTest() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    // Refresh the gallery when a new image is uploaded
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Head>
        <title>Blob Storage Test - Riri's Matcha</title>
        <meta name="description" content="Test Vercel Blob storage functionality" />
      </Head>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
            Vercel Blob Storage Test
          </h1>
          <p className="text-slate-600 font-inter text-lg">
            Test uploading and displaying images from Vercel Blob storage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Bulk Upload Section */}
          <div>
            <BulkImageUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Individual Upload Section */}
          <div>
            <ImageUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Info Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
              About Vercel Blob Storage
            </h3>
            
            <div className="space-y-4 text-slate-600 font-inter">
              <p>
                <strong>What is it?</strong> Vercel Blob is a serverless storage solution that 
                allows you to store and serve files directly from Vercel's global edge network.
              </p>
              
              <p>
                <strong>Benefits:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Global CDN for fast image delivery</li>
                <li>Automatic image optimization</li>
                <li>Serverless - no server management needed</li>
                <li>Built-in security and access control</li>
              </ul>
              
              <p>
                <strong>Setup Required:</strong> You need to configure environment variables 
                in your Vercel project settings.
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">Environment Variables Needed:</h4>
              <code className="text-sm text-amber-700 bg-amber-100 p-2 rounded block">
                BLOB_READ_WRITE_TOKEN=your_token_here
              </code>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <BlobImageGallery 
            key={refreshKey}
            title="All Blob Images"
            description="Images stored in Vercel Blob storage"
          />
        </div>

        {/* Category Galleries */}
        <div className="space-y-16">
          <BlobImageGallery 
            key={`ceremony-${refreshKey}`}
            category="ceremony"
            title="Ceremony Images"
            description="Traditional Japanese matcha ceremony photos"
          />
          
          <BlobImageGallery 
            key={`powder-${refreshKey}`}
            category="powder"
            title="Matcha Powder"
            description="Premium ceremonial grade matcha powder"
          />
          
          <BlobImageGallery 
            key={`drinks-${refreshKey}`}
            category="drinks"
            title="Matcha Drinks"
            description="Delicious matcha beverages and lattes"
          />
        </div>
      </div>
    </div>
  );
}

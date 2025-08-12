import { useState } from 'react';
import { uploadMatchaImage } from '../../lib/blob';

interface ImageUploadProps {
  onUploadSuccess?: () => void;
}

export default function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setMessage(null);
    } else {
      setMessage({ type: 'error', text: 'Please select a valid image file' });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !category) {
      setMessage({ type: 'error', text: 'Please select a file and category' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      // Upload to blob storage
      const blob = await uploadMatchaImage(file, category);
      
      // Save to database
      const response = await fetch('/api/blob-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          blobUrl: blob.url,
          category,
          description: description || file.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save image metadata');
      }

      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      setFile(null);
      setCategory('');
      setDescription('');
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Upload failed' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-100">
      <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
        Upload Image to Blob Storage
      </h3>
      
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-slate-700 font-medium mb-2">
            Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-slate-700 font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            <option value="ceremony">Ceremony</option>
            <option value="powder">Powder</option>
            <option value="drinks">Drinks</option>
            <option value="quality">Quality</option>
            <option value="founder">Founder</option>
            <option value="hero">Hero</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 font-medium mb-2">
            Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={uploading || !file || !category}
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-medium text-slate-700 mb-2">How it works:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Image is uploaded to Vercel Blob storage</li>
          <li>• Metadata is saved to your Postgres database</li>
          <li>• Images can be displayed using the BlobImageGallery component</li>
        </ul>
      </div>
    </div>
  );
}

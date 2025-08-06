import { useState } from 'react';
import Head from 'next/head';

export default function Setup() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const initializeDatabase = async () => {
    setLoading(true);
    setStatus('Initializing database...');
    
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
      });
      
      if (response.ok) {
        setStatus('Database initialized successfully!');
      } else {
        setStatus('Error initializing database');
      }
    } catch (error) {
      setStatus('Error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Head>
        <title>Setup - Riri's Matcha</title>
        <meta name="description" content="Database setup for Riri's Matcha" />
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
            Database Setup
          </h1>
          <p className="text-slate-600 font-inter text-lg">
            Initialize the database and blob storage for Riri's Matcha
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                Vercel Blob Storage Setup
              </h2>
              <p className="text-slate-600 font-inter mb-4">
                This will create the necessary database tables and initialize the blob storage for your matcha website.
              </p>
            </div>

            <button
              onClick={initializeDatabase}
              disabled={loading}
              className="bg-slate-800 text-white px-8 py-4 rounded-full font-inter font-semibold text-lg hover:bg-slate-700 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Initialize Database'}
            </button>

            {status && (
              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <p className="text-slate-700 font-inter">{status}</p>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-playfair font-bold text-slate-800">
                What will be created:
              </h3>
              <ul className="space-y-2 text-slate-600 font-inter">
                <li>• Products table for matcha products</li>
                <li>• Orders table for customer orders</li>
                <li>• Order items table for order details</li>
                <li>• Matcha images table for blob storage</li>
                <li>• Sample product data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
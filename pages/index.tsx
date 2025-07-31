import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <Head>
        <title>Matcha Concept</title>
        <meta name="description" content="Welcome to the Matcha Concept website!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-5xl font-bold text-green-700 mb-4">Welcome to Matcha Concept</h1>
        <p className="text-lg text-green-900 max-w-xl">
          This is your new home for all things Matcha. Your website is now live!
        </p>
      </main>
    </div>
  );
}
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300">
      <Head>
        <title>Matcha Concept</title>
        <meta name="description" content="Welcome to the Matcha Concept website!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl mt-12">
          <img
            src="/matcha-hero.png"
            alt="Matcha Concept Hero"
            className="mx-auto mb-6 w-32 h-32 object-contain rounded-full shadow-md border-4 border-green-200"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <h1 className="text-5xl font-extrabold text-green-700 mb-4 font-serif">Matcha Concept</h1>
          <p className="text-lg text-green-900 max-w-xl mb-6">
            Discover the art, culture, and taste of premium matcha. <br />
            Explore our story, products, and the world of green tea.
          </p>
          <a
            href="#about"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </main>
      <footer className="mt-16 mb-4 text-green-800/70 text-sm">
        &copy; {new Date().getFullYear()} Matcha Concept. All rights reserved.
      </footer>
    </div>
  );
}
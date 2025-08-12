import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  isAvailable: boolean;
  isEcommerce: boolean;
}

interface Location {
  id: number;
  city: string;
  country: string;
  address: string;
  phone: string;
  hours: string;
  status: 'coming-soon' | 'open' | 'closed';
}

interface LocalImage {
  id: number;
  filename: string;
  image_url: string;
  category: string;
  description: string;
  uploaded_at: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ceremonial Grade Matcha",
    description: "Premium ceremonial grade matcha från Uji, Japan. Handplockad och traditionellt tillverkad",
    price: "299 kr",
    image: "🍵",
    category: "powder",
    isAvailable: true,
    isEcommerce: true
  },
  {
    id: 2,
    name: "Morning Matcha Blend",
    description: "Vår signaturblandning för perfekt morgonstart med naturlig energi",
    price: "189 kr",
    image: "☀️",
    category: "mix",
    isAvailable: true,
    isEcommerce: true
  },
  {
    id: 3,
    name: "Mediterranean Matcha",
    description: "Inspired by the Spanish coast - matcha med citrus och havssalt",
    price: "169 kr",
    image: "🌊",
    category: "mix",
    isAvailable: true,
    isEcommerce: true
  },
  {
    id: 4,
    name: "Yoga Matcha Bowl Set",
    description: "Handgjord matcha bowl för morgonritualer och mindfulness",
    price: "450 kr",
    image: "🧘",
    category: "accessories",
    isAvailable: true,
    isEcommerce: true
  },
  {
    id: 5,
    name: "Wellness Matcha Kit",
    description: "Komplett kit för hälsosam livsstil med matcha och superfoods",
    price: "899 kr",
    image: "🌿",
    category: "accessories",
    isAvailable: true,
    isEcommerce: true
  },
  {
    id: 6,
    name: "Healthy Matcha Snacks",
    description: "Naturliga snacks med matcha, nötter och frukt för aktiva dagar",
    price: "35 kr",
    image: "🥜",
    category: "snacks",
    isAvailable: true,
    isEcommerce: true
  }
];

const cafeProducts: Product[] = [
  {
    id: 101,
    name: "Morning Matcha Latte",
    description: "Perfekt start på dagen med smooth matcha och valfri mjölk",
    price: "45 kr",
    image: "☀️",
    category: "drinks",
    isAvailable: true,
    isEcommerce: false
  },
  {
    id: 102,
    name: "Mediterranean Matcha",
    description: "Matcha med citrus, havssalt och en touch av sol",
    price: "48 kr",
    image: "🌊",
    category: "drinks",
    isAvailable: true,
    isEcommerce: false
  },
  {
    id: 103,
    name: "Yoga Matcha Smoothie",
    description: "Fruktig smoothie med matcha, banan och grönsaker",
    price: "42 kr",
    image: "🧘",
    category: "drinks",
    isAvailable: true,
    isEcommerce: false
  },
  {
    id: 104,
    name: "Healthy Matcha Bowl",
    description: "Naturlig bowl med matcha, granola, nötter och färska bär",
    price: "65 kr",
    image: "🥗",
    category: "food",
    isAvailable: true,
    isEcommerce: false
  },
  {
    id: 105,
    name: "Post-Workout Matcha",
    description: "Energigivande matcha för efter träning och promenader",
    price: "35 kr",
    image: "💪",
    category: "drinks",
    isAvailable: true,
    isEcommerce: false
  },
  {
    id: 106,
    name: "Sunset Matcha",
    description: "Avslappnande matcha för kvällens mindfulness",
    price: "50 kr",
    image: "🌅",
    category: "drinks",
    isAvailable: true,
    isEcommerce: false
  }
];

const locations: Location[] = [
  {
    id: 1,
    city: "Jönköping",
    country: "Sverige",
    address: "Kungsgatan 15, 553 22 Jönköping",
    phone: "+46 36 123 45 67",
    hours: "Mån-Fre: 7:00-19:00, Lör-Sön: 9:00-18:00",
    status: "coming-soon"
  },
  {
    id: 2,
    city: "Marbella",
    country: "Spanien",
    address: "Cala Calypso 10, Marbella",
    phone: "+34 95 123 45 67",
    hours: "Lun-Vie: 7:00-20:00, Sáb-Dom: 8:00-19:00",
    status: "coming-soon"
  }
];

const categories = ["alla", "drinks", "food", "powder", "mix", "accessories", "snacks"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("alla");
  const [activeTab, setActiveTab] = useState("cafe"); // "cafe" or "shop"
  
  // Static local images data - no need for API fetch
  const localImages: LocalImage[] = [
    {
      id: 1,
      filename: "matcha-ceremony.jpg",
      image_url: "/matcha-ceremony.jpg",
      category: "ceremony",
      description: "Traditional Japanese matcha ceremony setup",
      uploaded_at: new Date().toISOString()
    },
    {
      id: 2,
      filename: "matcha-hero.jpg",
      image_url: "/matcha-hero.jpg",
      category: "hero",
      description: "Premium matcha powder and preparation",
      uploaded_at: new Date().toISOString()
    },
    {
      id: 3,
      filename: "matcha-latte.jpg",
      image_url: "/matcha-latte.jpg",
      category: "drinks",
      description: "Delicious matcha latte",
      uploaded_at: new Date().toISOString()
    },
    {
      id: 4,
      filename: "matcha-powder.jpg",
      image_url: "/matcha-powder.jpg",
      category: "powder",
      description: "High-quality ceremonial grade matcha powder",
      uploaded_at: new Date().toISOString()
    },
    {
      id: 5,
      filename: "matcha-quality.jpg",
      image_url: "/matcha-quality.jpg",
      category: "quality",
      description: "Premium matcha quality and texture",
      uploaded_at: new Date().toISOString()
    },
    {
      id: 6,
      filename: "raihanna.jpg",
      image_url: "/raihanna.jpg",
      category: "founder",
      description: "Raihanna - Founder and matcha enthusiast",
      uploaded_at: new Date().toISOString()
    }
  ];

  const filteredProducts = selectedCategory === "alla" 
    ? (activeTab === "cafe" ? cafeProducts : products)
    : (activeTab === "cafe" ? cafeProducts : products).filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Head>
        <title>Riri's Matcha - Premium Japanese Matcha</title>
        <meta name="description" content="Upptäck Raihanna's passion för premium japansk matcha - handplockad med kärlek och respekt för tradition" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-4">🍵</span>
              <h1 className="text-5xl font-playfair font-bold text-slate-800">
                Riri's Matcha
              </h1>
              <span className="text-4xl ml-4">🇯🇵</span>
            </div>
            <p className="text-center text-slate-600 mt-3 font-inter text-lg">
              Premium Japanese Matcha • Handplockad med Kärlek • Traditionell Kvalitet
            </p>
          </div>
        </div>
      </header>

      {/* Video Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {localImages.length > 0 ? (
          <Image
            src={localImages.find(img => img.category === "hero")?.image_url || "/matcha-hero.jpg"}
            alt="Premium Japanese Matcha"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/matcha-hero.jpg"
            alt="Premium Japanese Matcha"
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h2 className="text-7xl font-playfair font-bold mb-8 leading-tight">
            Upptäck Den Äkta<br />
            <span className="text-emerald-300">Smaken av Matcha</span>
          </h2>
          <p className="text-2xl font-inter font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Premium japansk matcha handplockad med kärlek och respekt för traditionen. 
            Varje blad berättar en historia om passion och kvalitet.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-slate-800 px-12 py-6 rounded-full font-inter font-semibold text-xl hover:bg-slate-100 transition-all duration-300 shadow-xl">
              Upptäck Våra Produkter
            </button>
            <button className="border-2 border-white text-white px-12 py-6 rounded-full font-inter font-semibold text-xl hover:bg-white hover:text-slate-800 transition-all duration-300">
              Läs Vår Historia
            </button>
            <a href="/blob-test" className="border-2 border-emerald-300 text-emerald-300 px-8 py-6 rounded-full font-inter font-semibold text-lg hover:bg-emerald-300 hover:text-slate-800 transition-all duration-300">
              Test Blob Storage
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Debug Section - Remove this later */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
            <p className="text-sm text-yellow-700">Images Loaded: Yes</p>
            <p className="text-sm text-yellow-700">Local Images Count: {localImages.length}</p>
            <p className="text-sm text-yellow-700">Hero Image: {localImages.find(img => img.category === "hero")?.image_url || 'Not found'}</p>
            <p className="text-sm text-yellow-700">Founder Image: {localImages.find(img => img.category === "founder")?.image_url || 'Not found'}</p>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-playfair font-bold text-slate-800 mb-8">
              Välkommen till Riri's Matcha
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-4xl mx-auto leading-relaxed">
              Upptäck den äkta smaken av premium japansk matcha. Varje blad handplockad med kärlek 
              och respekt för traditionen. Det är inte bara grönt pulver - det är kärlek i varje kopp.
            </p>
          </div>
        </section>

        {/* About Raihanna Section */}
        <section className="mb-24">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
                  Om Raihanna
                </h3>
                <div className="space-y-6 text-slate-600 font-inter text-lg leading-relaxed">
                  <p>
                    Som tandhygienist och med bakgrund inom skönhetsbehandlingar som botox och fillers, 
                    har jag alltid varit passionerad för hälsa och välbefinnande. Min resa med matcha 
                    började när jag upptäckte skillnaden mellan äkta japansk matcha och de blandade 
                    produkterna på marknaden.
                  </p>
                  <p>
                    Ju mer jag drack runt och testade olika matcha-sorter, desto tydligare blev det 
                    att många produkter innehöll tillsatser och var långt ifrån den äkta smaken. 
                    Detta blev en utmaning för mig - att hitta den perfekta matchan.
                  </p>
                  <p>
                    Därför skapade jag Riri's Matcha. Varje blad är handplockat med kärlek, och 
                    största delen av pengarna går till arbetarna bakom matchan. Jag älskar att ge 
                    kärlek tillbaka till människor - det handlar inte bara om mig, utan om att 
                    hjälpa andra som behöver arbete för att försörja sina familjer.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-6 shadow-xl">
                  <Image
                    src={localImages.find(img => img.category === "founder")?.image_url || "/raihanna.jpg"}
                    alt="Raihanna - Tandhygienist och Matcha-entusiast"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-slate-600 font-inter text-lg">
                  Tandhygienist • Skönhetsexpert • Matcha-entusiast
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Matcha History Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Matcha's Historia
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              En resa genom tid och tradition
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-slate-100">
              <div className="mb-8">
                <Image
                  src={localImages.find(img => img.category === "ceremony")?.image_url || "/matcha-ceremony.jpg"}
                  alt="Traditionell japansk matcha-ceremoni"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-6">
                Upprinnelsen
              </h3>
              <div className="space-y-4 text-slate-600 font-inter text-lg leading-relaxed">
                <p>
                  Matcha har sina rötter i det gamla Kina under Tang-dynastin (618-907), där 
                  teblad maldes till pulver för medicinskt bruk. Det var dock i Japan som matcha 
                  utvecklades till den konstform vi känner idag.
                </p>
                <p>
                  På 1100-talet introducerade zen-munken Eisai matcha i Japan, och det blev 
                  snart en central del av den japanska teceremonin. Samurajer drack matcha 
                  för att förbättra sin fokus och energi innan strider.
                </p>
                <p>
                  Idag produceras den finaste matchan i Uji-regionen nära Kyoto, där klimatet 
                  och jorden är perfekt för odling av de bästa tebladen.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-slate-100">
              <div className="mb-8">
                <Image
                  src={localImages.find(img => img.category === "quality")?.image_url || "/matcha-quality.jpg"}
                  alt="Premium matcha-kvalitet"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-6">
                Varför Matcha är Bra
              </h3>
              <div className="space-y-4 text-slate-600 font-inter text-lg leading-relaxed">
                <p>
                  <strong>Antioxidanter:</strong> Matcha innehåller 137 gånger mer EGCG än vanligt grönt te, 
                  vilket hjälper till att bekämpa fria radikaler och stödja immunförsvaret.
                </p>
                <p>
                  <strong>L-Theanin:</strong> En unik aminosyra som ger lugnande energi utan nervositet, 
                  perfekt för fokus och mindfulness.
                </p>
                <p>
                  <strong>Koffein:</strong> Naturligt koffein som absorberas långsamt, ger energi 
                  som varar upp till 6 timmar utan krasch.
                </p>
                <p>
                  <strong>Klorofyll:</strong> Det höga klorofyllinnehållet hjälper kroppen att 
                  rena sig naturligt och stödja cellernas återhämtning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Varför Vår Matcha är Bättre
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              Handplockad med kärlek och respekt för traditionen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🇯🇵</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Äkta Japansk
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Endast från Uji-regionen i Japan
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>🍃 Ceremonial grade kvalitet</p>
                <p>🌿 Skuggad odling</p>
                <p>👐 Handplockad</p>
                <p>💚 100% naturlig</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Med Kärlek
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Stödjer lokala arbetare
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>👥 Rättvis kompensation</p>
                <p>🏠 Stödjer familjer</p>
                <p>🌍 Hållbar produktion</p>
                <p>🤝 Respekt för tradition</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Perfekt Kvalitet
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Inga tillsatser eller blandningar
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>🔍 Testad och verifierad</p>
                <p>🌱 Organisk odling</p>
                <p>🧪 Laboratorietestad</p>
                <p>📦 Säker förpackning</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Recognize Good Matcha */}
        <section className="mb-24">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
                Hur Känner Man Igen Bra Matcha?
              </h2>
              <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
                Lär dig att identifiera äkta, hög kvalitet matcha
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
                  Utseende
                </h3>
                <div className="space-y-4 text-slate-600 font-inter text-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Bra Matcha:</strong> Mörk, intensiv grön färg, fin och silkeslen textur
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">❌</span>
                    <div>
                      <strong>Dålig Matcha:</strong> Ljusgrön eller gulaktig, grov textur, synliga fibrer
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
                  Smak
                </h3>
                <div className="space-y-4 text-slate-600 font-inter text-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Bra Matcha:</strong> Söt umami, mild bitterhet, rik och komplex
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">❌</span>
                    <div>
                      <strong>Dålig Matcha:</strong> Skarp bitterhet, metallisk smak, enkel och platt
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-emerald-50 rounded-2xl">
              <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                Vår Matcha - Den Äkta Smaken
              </h3>
              <p className="text-slate-600 font-inter text-lg leading-relaxed">
                Vår matcha kommer direkt från Uji, Japan och har den perfekta balansen mellan 
                sötma och umami. Varje batch testas noggrant för att säkerställa att du får 
                den äkta smaken utan tillsatser eller blandningar. Det är inte bara grönt pulver 
                - det är kärlek och tradition i varje kopp.
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 border border-slate-200 shadow-lg">
            <button
              onClick={() => setActiveTab("cafe")}
              className={`px-10 py-4 rounded-full font-inter font-medium transition-all duration-300 text-lg ${
                activeTab === "cafe"
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Kaffetorier
            </button>
            <button
              onClick={() => setActiveTab("shop")}
              className={`px-10 py-4 rounded-full font-inter font-medium transition-all duration-300 text-lg ${
                activeTab === "shop"
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              E-handel
            </button>
          </div>
        </div>

        {/* Product Menu Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              {activeTab === "cafe" ? "Våra Matcha Drinkar" : "Våra Produkter"}
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              {activeTab === "cafe" 
                ? "Upptäck våra hälsosamma matcha drinkar i våra kaffetorier"
                : "Köp våra premium matcha produkter online för din hälsosamma livsstil"
              }
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-full font-inter font-medium transition-all duration-300 text-lg ${
                  selectedCategory === category
                    ? 'bg-slate-800 text-white shadow-lg'
                    : 'bg-white/80 text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="mb-6">
                  <Image
                    src={product.category === "powder" ? (localImages.find(img => img.category === "powder")?.image_url || "/matcha-powder.jpg") :
                          product.category === "drinks" ? (localImages.find(img => img.category === "drinks")?.image_url || "/matcha-latte.jpg") :
                          (localImages.find(img => img.category === "quality")?.image_url || "/matcha-quality.jpg")}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  {product.name}
                </h3>
                <p className="text-slate-600 font-inter mb-6 text-lg leading-relaxed">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-playfair font-bold text-slate-700">
                    {product.price}
                  </span>
                  <button className="bg-slate-800 text-white px-6 py-3 rounded-full font-inter font-medium hover:bg-slate-700 transition-colors duration-300 text-lg">
                    {activeTab === "cafe" ? "Beställ" : "Lägg i kundvagn"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Café Locations */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Våra Kaffetorier
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              Upptäck våra kaffetorier i Sverige och Spanien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-slate-800">
                      {location.city}
                    </h3>
                    <p className="text-slate-600 font-inter text-lg">{location.country}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-inter font-medium ${
                    location.status === 'open' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {location.status === 'open' ? 'Öppet' : 'Kommer snart'}
                  </span>
                </div>
                <div className="space-y-3 text-lg text-slate-600 font-inter">
                  <p>{location.address}</p>
                  <p>{location.phone}</p>
                  <p>{location.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Love and Care Section */}
        <section className="mb-24">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
                Kärlek Bakom Varje Kopp
              </h2>
              <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
                Det handlar inte bara om matcha - det handlar om människor
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="mb-8">
                  <Image
                    src={localImages.find(img => img.category === "ceremony")?.image_url || "/matcha-ceremony.jpg"}
                    alt="Handplockad matcha med kärlek"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
                  Vårt Löfte
                </h3>
                <div className="space-y-4 text-slate-600 font-inter text-lg leading-relaxed">
                  <p>
                    <strong>Rättvis Kompensation:</strong> Största delen av pengarna går till 
                    arbetarna bakom matchan. Vi betalar över marknadspris för att säkerställa 
                    att alla får en bra lön.
                  </p>
                  <p>
                    <strong>Familjer Först:</strong> Vi stödjer arbetare som behöver försörja 
                    sina familjer. Det handlar inte bara om att sälja matcha - det handlar om 
                    att hjälpa människor att betala räkningar och köpa mat.
                  </p>
                  <p>
                    <strong>Hållbarhet:</strong> Vi arbetar endast med odlare som respekterar 
                    naturen och använder traditionella metoder som skyddar jorden för framtida generationer.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
                  Traditionell Kvalitet
                </h3>
                <div className="space-y-4 text-slate-600 font-inter text-lg leading-relaxed">
                  <p>
                    <strong>Handplockad:</strong> Varje blad plockas för hand av erfarna arbetare 
                    som känner till traditionen och respekterar plantan.
                  </p>
                  <p>
                    <strong>Skuggad Odling:</strong> Våra teblad odlas under skuggning i 3-4 veckor 
                    innan skörd, vilket ökar klorofyllinnehållet och ger den intensiva gröna färgen.
                  </p>
                  <p>
                    <strong>Traditionell Malsning:</strong> Bladen mals med granitkvarnar enligt 
                    japansk tradition för att bevara alla näringsämnen och smaker.
                  </p>
                </div>
                <div className="mt-8">
                  <Image
                    src={localImages.find(img => img.category === "quality")?.image_url || "/matcha-quality.jpg"}
                    alt="Traditionell matcha-tillverkning"
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-inter text-slate-100 text-lg">
            © 2024 Riri's Matcha. Skapat med ❤️ och passion
          </p>
          <p className="font-inter text-slate-200 text-lg mt-3">
            Jönköping • Marbella • Online
          </p>
        </div>
      </footer>
    </div>
  );
}
import Head from 'next/head';
import { useState } from 'react';

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

const products: Product[] = [
  {
    id: 1,
    name: "Ceremonial Grade Matcha",
    description: "Premium ceremonial grade matcha från Uji, Japan. Perfekt för morgonmeditation och yoga",
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
    city: "Marbella",
    country: "Spanien",
    address: "Cala Calypso 10, Marbella",
    phone: "+34 95 123 45 67",
    hours: "Lun-Vie: 7:00-20:00, Sáb-Dom: 8:00-19:00",
    status: "open"
  },
  {
    id: 2,
    city: "Stockholm",
    country: "Sverige",
    address: "Drottninggatan 42, 111 21 Stockholm",
    phone: "+46 8 123 45 67",
    hours: "Mån-Fre: 7:00-19:00, Lör-Sön: 9:00-18:00",
    status: "coming-soon"
  },
  {
    id: 3,
    city: "Göteborg",
    country: "Sverige",
    address: "Avenyn 15, 411 03 Göteborg",
    phone: "+46 31 987 65 43",
    hours: "Mån-Fre: 7:30-18:30, Lör-Sön: 9:00-17:00",
    status: "coming-soon"
  },
  {
    id: 4,
    city: "Barcelona",
    country: "Spanien",
    address: "Passeig de Gràcia 89, 08008 Barcelona",
    phone: "+34 93 876 54 32",
    hours: "Lun-Vie: 7:30-19:30, Sáb-Dom: 8:30-18:30",
    status: "coming-soon"
  }
];

const categories = ["alla", "drinks", "food", "powder", "mix", "accessories", "snacks"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("alla");
  const [activeTab, setActiveTab] = useState("cafe"); // "cafe" or "shop"

  const filteredProducts = selectedCategory === "alla" 
    ? (activeTab === "cafe" ? cafeProducts : products)
    : (activeTab === "cafe" ? cafeProducts : products).filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Head>
        <title>Riri's Matcha - Mediterranean Wellness</title>
        <meta name="description" content="Upptäck Raihanna's passion för matcha och mediterran livsstil i Cala Calypso, Marbella" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-4">🌊</span>
              <h1 className="text-5xl font-playfair font-bold text-slate-800">
                Riri's Matcha
              </h1>
              <span className="text-4xl ml-4">🌿</span>
            </div>
            <p className="text-center text-slate-600 mt-3 font-inter text-lg">
              Mediterranean Wellness • Morning Energy • Natural Living
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Personal Story Section */}
        <section className="mb-24">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-100">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-5xl">🌊</span>
              </div>
              <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
                Hej, jag är Raihanna! 👋
              </h2>
              <p className="text-slate-600 font-inter text-xl max-w-4xl mx-auto leading-relaxed">
                Född i Sverige men nu bor jag i Cala Calypso, 10 minuter från Marbella. 
                Jag älskar havet, naturen och den varma solen. Som lejon (född 20 augusti) 
                är jag en morgonmänniska som älskar yoga, meditation och hälsosam mat.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
                  Min Livsstil 🌿
                </h3>
                <div className="space-y-4 text-slate-600 font-inter">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🌅</span>
                    <span className="text-lg">Morgonmänniska - älskar tidiga morgnar</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🧘</span>
                    <span className="text-lg">Yoga och meditation för mindfulness</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">💪</span>
                    <span className="text-lg">Gymmar och tar långa promenader</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🏀</span>
                    <span className="text-lg">Spelade basketball som ung</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-6">
                  Min Passion för Hälsa 🥗
                </h3>
                <div className="space-y-4 text-slate-600 font-inter">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🥗</span>
                    <span className="text-lg">Älskar hälsosam mat och grönsaker</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🥜</span>
                    <span className="text-lg">Passionerad för frukt och nötter</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🌊</span>
                    <span className="text-lg">Naturmänniska som älskar havet</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🤗</span>
                    <span className="text-lg">Umgås gärna med nära och kära</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mediterranean Lifestyle Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Mediterranean Wellness
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              Inspirerat av livet i Cala Calypso - havet, solen och den naturliga livsstilen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌅</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Morgonritualer
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Starta dagen med matcha, yoga och meditation
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>☀️ Tidiga morgnar vid havet</p>
                <p>🧘 Yoga och mindfulness</p>
                <p>🍵 Matcha för naturlig energi</p>
                <p>🌿 Jordnära och närvaro</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🥗</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Hälsosam Mat
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Passion för grönsaker, frukt och nötter
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>🥬 Färska grönsaker</p>
                <p>🍎 Naturlig frukt</p>
                <p>🥜 Hjärtfriska nötter</p>
                <p>💚 Matcha för välbefinnande</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌊</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Aktiva Dagar
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Gym, promenader och havet
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>💪 Regelbunden träning</p>
                <p>🚶‍♀️ Långa promenader</p>
                <p>🏀 Basketball bakgrund</p>
                <p>🌊 Havets helande kraft</p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Concept Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Logo Koncept för Riri's Matcha
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              Baserat på din mediterrana livsstil - havet, naturen och hälsosam energi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Logo Concept 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🌊</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Mediterranean Matcha
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Havets kraft möter matcha's naturliga energi
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>🌊 Havets helande kraft</p>
                <p>🌿 Naturlig och ren</p>
                <p>☀️ Solens värme</p>
                <p>🧘 Mindfulness och yoga</p>
              </div>
            </div>

            {/* Logo Concept 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🌅</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Morning Wellness
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Morgonenergi och hälsosam livsstil
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>🌅 Morgonmänniska</p>
                <p>🧘 Yoga och meditation</p>
                <p>🥗 Hälsosam mat</p>
                <p>💪 Aktiva dagar</p>
              </div>
            </div>

            {/* Logo Concept 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🌿</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-slate-800 mb-4">
                  Natural Living
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Jordnära och naturlig livsstil
                </p>
              </div>
              <div className="space-y-3 text-lg text-slate-600 font-inter">
                <p>🌿 Jordnära och närvaro</p>
                <p>🥜 Naturliga ingredienser</p>
                <p>🤗 Umgås med nära och kära</p>
                <p>💚 Passion för hälsa</p>
              </div>
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
                <div className="text-5xl mb-6 text-center">{product.image}</div>
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
              Upptäck våra kaffetorier i Spanien och Sverige
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

        {/* Inspiration Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Vår Inspiration
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              Vi inspireras av världens bästa matcha-varumärken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🍵</span>
                </div>
                <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-4">
                  @weareamatchaaday
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Inspirerar oss med deras kreativa matcha-recept och vackra presentation
                </p>
              </div>
              <div className="space-y-4 text-lg text-slate-600 font-inter">
                <p>✨ Kreativa drinkkombinationer</p>
                <p>🎨 Vacker visuell presentation</p>
                <p>🌿 Fokus på naturliga ingredienser</p>
                <p>💚 Passion för matcha-kvalitet</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🇯🇵</span>
                </div>
                <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-4">
                  @the_matcha_tokyo
                </h3>
                <p className="text-slate-600 font-inter text-lg">
                  Visar oss den traditionella japanska matcha-kulturen
                </p>
              </div>
              <div className="space-y-4 text-lg text-slate-600 font-inter">
                <p>🏯 Traditionell japansk estetik</p>
                <p>🎎 Ceremonial grade matcha</p>
                <p>🍃 Autentisk matcha-upplevelse</p>
                <p>✨ Mindfulness och meditation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Moodboard Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-800 mb-6">
              Design Moodboard
            </h2>
            <p className="text-slate-600 font-inter text-xl max-w-3xl mx-auto">
              Färger och typsnitt som inspirerar och harmonierar med matcha-temat
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Color Palette */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-slate-100">
              <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-8">
                Färgpalett
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-slate-200"></div>
                  <div>
                    <p className="font-inter font-semibold text-slate-800 text-lg">Slate Light</p>
                    <p className="text-slate-600">#f8fafc</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-300"></div>
                  <div>
                    <p className="font-inter font-semibold text-slate-800 text-lg">Sage Gray</p>
                    <p className="text-slate-600">#f1f5f9</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-slate-900"></div>
                  <div>
                    <p className="font-inter font-semibold text-slate-800 text-lg">Slate Dark</p>
                    <p className="text-slate-600">#1e293b</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-600 border-2 border-emerald-700"></div>
                  <div>
                    <p className="font-inter font-semibold text-slate-800 text-lg">Emerald Green</p>
                    <p className="text-slate-600">#059669</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-200"></div>
                  <div>
                    <p className="font-inter font-semibold text-slate-800 text-lg">Ocean Blue</p>
                    <p className="text-slate-600">#eff6ff</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-slate-100">
              <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-8">
                Typsnitt
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-playfair text-3xl font-bold text-slate-800 mb-4">
                    Playfair Display
                  </h4>
                  <p className="font-playfair text-slate-600 text-lg">
                    Elegant serif för rubriker och titlar
                  </p>
                  <p className="font-playfair text-slate-700 mt-4 text-xl">
                    Riri's Matcha - Premium Quality
                  </p>
                </div>
                <div>
                  <h4 className="font-inter text-2xl font-semibold text-slate-800 mb-4">
                    Inter
                  </h4>
                  <p className="font-inter text-slate-600 text-lg">
                    Modern sans-serif för brödtext och UI
                  </p>
                  <p className="font-inter text-slate-700 mt-4 text-xl">
                    Clean, readable, and contemporary
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-200">
                  <h5 className="font-inter font-semibold text-slate-800 mb-4 text-xl">
                    Text Hierarki
                  </h5>
                  <div className="space-y-3 text-lg">
                    <p className="font-playfair text-2xl text-slate-800">H1 - Playfair Display Bold</p>
                    <p className="font-playfair text-xl text-slate-700">H2 - Playfair Display Regular</p>
                    <p className="font-inter text-lg text-slate-600">Body - Inter Regular</p>
                    <p className="font-inter text-base text-slate-500">Caption - Inter Light</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-100">
          <h3 className="text-3xl font-playfair font-bold text-slate-800 mb-8 text-center">
            Design Principer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌿</span>
              </div>
              <h4 className="font-playfair font-bold text-slate-800 mb-4 text-xl">Naturlig</h4>
              <p className="font-inter text-slate-600 text-lg">
                Inspiration från naturen och matcha's ursprung
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h4 className="font-playfair font-bold text-slate-800 mb-4 text-xl">Elegant</h4>
              <p className="font-inter text-slate-600 text-lg">
                Sofistikerad design med fokus på kvalitet
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧘</span>
              </div>
              <h4 className="font-playfair font-bold text-slate-800 mb-4 text-xl">Harmonisk</h4>
              <p className="font-inter text-slate-600 text-lg">
                Balans mellan tradition och modernitet
              </p>
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
            Cala Calypso, Marbella • Sverige • Online
          </p>
        </div>
      </footer>
    </div>
  );
}
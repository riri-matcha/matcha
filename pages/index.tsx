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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100">
      <Head>
        <title>Riri's Matcha - Mediterranean Wellness</title>
        <meta name="description" content="Upptäck Raihanna's passion för matcha och mediterran livsstil i Cala Calypso, Marbella" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-3xl mr-3">🌊</span>
              <h1 className="text-4xl font-playfair font-bold text-green-800">
                Riri's Matcha
              </h1>
              <span className="text-3xl ml-3">🌿</span>
            </div>
            <p className="text-center text-green-600 mt-2 font-inter">
              Mediterranean Wellness • Morning Energy • Natural Living
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Personal Story Section */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌊</span>
              </div>
              <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
                Hej, jag är Raihanna! 👋
              </h2>
              <p className="text-green-600 font-inter text-lg max-w-3xl mx-auto leading-relaxed">
                Född i Sverige men nu bor jag i Cala Calypso, 10 minuter från Marbella. 
                Jag älskar havet, naturen och den varma solen. Som lejon (född 20 augusti) 
                är jag en morgonmänniska som älskar yoga, meditation och hälsosam mat.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-4">
                  Min Livsstil 🌿
                </h3>
                <div className="space-y-3 text-green-600 font-inter">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌅</span>
                    <span>Morgonmänniska - älskar tidiga morgnar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧘</span>
                    <span>Yoga och meditation för mindfulness</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💪</span>
                    <span>Gymmar och tar långa promenader</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏀</span>
                    <span>Spelade basketball som ung</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-4">
                  Min Passion för Hälsa 🥗
                </h3>
                <div className="space-y-3 text-green-600 font-inter">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥗</span>
                    <span>Älskar hälsosam mat och grönsaker</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥜</span>
                    <span>Passionerad för frukt och nötter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌊</span>
                    <span>Naturmänniska som älskar havet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤗</span>
                    <span>Umgås gärna med nära och kära</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mediterranean Lifestyle Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              Mediterranean Wellness
            </h2>
            <p className="text-green-600 font-inter max-w-2xl mx-auto">
              Inspirerat av livet i Cala Calypso - havet, solen och den naturliga livsstilen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌅</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  Morgonritualer
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Starta dagen med matcha, yoga och meditation
                </p>
              </div>
              <div className="space-y-2 text-sm text-green-600 font-inter">
                <p>☀️ Tidiga morgnar vid havet</p>
                <p>🧘 Yoga och mindfulness</p>
                <p>🍵 Matcha för naturlig energi</p>
                <p>🌿 Jordnära och närvaro</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥗</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  Hälsosam Mat
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Passion för grönsaker, frukt och nötter
                </p>
              </div>
              <div className="space-y-2 text-sm text-green-600 font-inter">
                <p>🥬 Färska grönsaker</p>
                <p>🍎 Naturlig frukt</p>
                <p>🥜 Hjärtfriska nötter</p>
                <p>💚 Matcha för välbefinnande</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌊</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  Aktiva Dagar
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Gym, promenader och havet
                </p>
              </div>
              <div className="space-y-2 text-sm text-green-600 font-inter">
                <p>💪 Regelbunden träning</p>
                <p>🚶‍♀️ Långa promenader</p>
                <p>🏀 Basketball bakgrund</p>
                <p>🌊 Havets helande kraft</p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Concept Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              Logo Koncept för Riri's Matcha
            </h2>
            <p className="text-green-600 font-inter max-w-2xl mx-auto">
              Baserat på din mediterrana livsstil - havet, naturen och hälsosam energi
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Logo Concept 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌊</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  Mediterranean Matcha
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Havets kraft möter matcha's naturliga energi
                </p>
              </div>
              <div className="space-y-2 text-sm text-green-600 font-inter">
                <p>🌊 Havets helande kraft</p>
                <p>🌿 Naturlig och ren</p>
                <p>☀️ Solens värme</p>
                <p>🧘 Mindfulness och yoga</p>
              </div>
            </div>

            {/* Logo Concept 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌅</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  Morning Wellness
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Morgonenergi och hälsosam livsstil
                </p>
              </div>
              <div className="space-y-2 text-sm text-green-600 font-inter">
                <p>🌅 Morgonmänniska</p>
                <p>🧘 Yoga och meditation</p>
                <p>🥗 Hälsosam mat</p>
                <p>💪 Aktiva dagar</p>
              </div>
            </div>

            {/* Logo Concept 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  Natural Living
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Jordnära och naturlig livsstil
                </p>
              </div>
              <div className="space-y-2 text-sm text-green-600 font-inter">
                <p>🌿 Jordnära och närvaro</p>
                <p>🥜 Naturliga ingredienser</p>
                <p>🤗 Umgås med nära och kära</p>
                <p>💚 Passion för hälsa</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 border border-green-200">
            <button
              onClick={() => setActiveTab("cafe")}
              className={`px-8 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                activeTab === "cafe"
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              Kaffetorier
            </button>
            <button
              onClick={() => setActiveTab("shop")}
              className={`px-8 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                activeTab === "shop"
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              E-handel
            </button>
          </div>
        </div>

        {/* Product Menu Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              {activeTab === "cafe" ? "Våra Matcha Drinkar" : "Våra Produkter"}
            </h2>
            <p className="text-green-600 font-inter max-w-2xl mx-auto">
              {activeTab === "cafe" 
                ? "Upptäck våra hälsosamma matcha drinkar i våra kaffetorier"
                : "Köp våra premium matcha produkter online för din hälsosamma livsstil"
              }
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white/70 text-green-700 hover:bg-green-50 border border-green-200'
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
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200"
              >
                <div className="text-4xl mb-4 text-center">{product.image}</div>
                <h3 className="text-xl font-playfair font-bold text-green-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-green-600 font-inter mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-playfair font-bold text-green-700">
                    {product.price}
                  </span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full font-inter font-medium hover:bg-green-700 transition-colors duration-300">
                    {activeTab === "cafe" ? "Beställ" : "Lägg i kundvagn"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Café Locations */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              Våra Kaffetorier
            </h2>
            <p className="text-green-600 font-inter max-w-2xl mx-auto">
              Upptäck våra kaffetorier i Spanien och Sverige
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-green-800">
                      {location.city}
                    </h3>
                    <p className="text-green-600 font-inter">{location.country}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${
                    location.status === 'open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {location.status === 'open' ? 'Öppet' : 'Kommer snart'}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-green-600 font-inter">
                  <p>{location.address}</p>
                  <p>{location.phone}</p>
                  <p>{location.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inspiration Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              Vår Inspiration
            </h2>
            <p className="text-green-600 font-inter max-w-2xl mx-auto">
              Vi inspireras av världens bästa matcha-varumärken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍵</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-green-800 mb-2">
                  @weareamatchaaday
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Inspirerar oss med deras kreativa matcha-recept och vackra presentation
                </p>
              </div>
              <div className="space-y-3 text-sm text-green-600 font-inter">
                <p>✨ Kreativa drinkkombinationer</p>
                <p>🎨 Vacker visuell presentation</p>
                <p>🌿 Fokus på naturliga ingredienser</p>
                <p>💚 Passion för matcha-kvalitet</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🇯🇵</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-green-800 mb-2">
                  @the_matcha_tokyo
                </h3>
                <p className="text-green-600 font-inter text-sm">
                  Visar oss den traditionella japanska matcha-kulturen
                </p>
              </div>
              <div className="space-y-3 text-sm text-green-600 font-inter">
                <p>🏯 Traditionell japansk estetik</p>
                <p>🎎 Ceremonial grade matcha</p>
                <p>🍃 Autentisk matcha-upplevelse</p>
                <p>✨ Mindfulness och meditation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Moodboard Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-green-800 mb-4">
              Design Moodboard
            </h2>
            <p className="text-green-600 font-inter max-w-2xl mx-auto">
              Färger och typsnitt som inspirerar och harmonierar med matcha-temat
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Color Palette */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-playfair font-bold text-green-800 mb-6">
                Färgpalett
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-green-50 border-2 border-green-200"></div>
                  <div>
                    <p className="font-inter font-semibold text-green-800">Matcha Light</p>
                    <p className="text-sm text-green-600">#f0fdf4</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-green-100 border-2 border-green-300"></div>
                  <div>
                    <p className="font-inter font-semibold text-green-800">Sage Green</p>
                    <p className="text-sm text-green-600">#dcfce7</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-green-600 border-2 border-green-700"></div>
                  <div>
                    <p className="font-inter font-semibold text-green-800">Matcha Green</p>
                    <p className="text-sm text-green-600">#16a34a</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-green-800 border-2 border-green-900"></div>
                  <div>
                    <p className="font-inter font-semibold text-green-800">Forest Green</p>
                    <p className="text-sm text-green-600">#166534</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-amber-50 border-2 border-amber-200"></div>
                  <div>
                    <p className="font-inter font-semibold text-green-800">Warm Cream</p>
                    <p className="text-sm text-green-600">#fffbeb</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
              <h3 className="text-2xl font-playfair font-bold text-green-800 mb-6">
                Typsnitt
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-playfair text-2xl font-bold text-green-800 mb-2">
                    Playfair Display
                  </h4>
                  <p className="font-playfair text-green-600 text-sm">
                    Elegant serif för rubriker och titlar
                  </p>
                  <p className="font-playfair text-green-700 mt-2">
                    Riri's Matcha - Premium Quality
                  </p>
                </div>
                <div>
                  <h4 className="font-inter text-xl font-semibold text-green-800 mb-2">
                    Inter
                  </h4>
                  <p className="font-inter text-green-600 text-sm">
                    Modern sans-serif för brödtext och UI
                  </p>
                  <p className="font-inter text-green-700 mt-2">
                    Clean, readable, and contemporary
                  </p>
                </div>
                <div className="pt-4 border-t border-green-200">
                  <h5 className="font-inter font-semibold text-green-800 mb-2">
                    Text Hierarki
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p className="font-playfair text-lg text-green-800">H1 - Playfair Display Bold</p>
                    <p className="font-playfair text-base text-green-700">H2 - Playfair Display Regular</p>
                    <p className="font-inter text-sm text-green-600">Body - Inter Regular</p>
                    <p className="font-inter text-xs text-green-500">Caption - Inter Light</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
          <h3 className="text-2xl font-playfair font-bold text-green-800 mb-6 text-center">
            Design Principer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="font-playfair font-bold text-green-800 mb-2">Naturlig</h4>
              <p className="font-inter text-green-600 text-sm">
                Inspiration från naturen och matcha's ursprung
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="font-playfair font-bold text-green-800 mb-2">Elegant</h4>
              <p className="font-inter text-green-600 text-sm">
                Sofistikerad design med fokus på kvalitet
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h4 className="font-playfair font-bold text-green-800 mb-2">Harmonisk</h4>
              <p className="font-inter text-green-600 text-sm">
                Balans mellan tradition och modernitet
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-inter text-green-100">
            © 2024 Riri's Matcha. Skapat med ❤️ och passion
          </p>
          <p className="font-inter text-green-200 text-sm mt-2">
            Cala Calypso, Marbella • Sverige • Online
          </p>
        </div>
      </footer>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { ActiveScreen, MenuItem } from '../types';
import { RESTAURANT_INFO, MENU_ITEMS, REVIEWS, BOOKING_SERVICES } from '../data/restaurantData';
import {
  Calendar,
  ShoppingBag,
  Sparkles,
  Star,
  ChevronRight,
  Flame,
  Award,
  ShieldCheck,
  Coffee,
  BookOpen,
  ArrowRight,
  Users,
  Clock,
  Phone,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenPhysicalMenu: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onAddToCart,
  onOpenPhysicalMenu,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate hero slides every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % RESTAURANT_INFO.heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const signatureSpecials = MENU_ITEMS.filter((item) => item.isBestseller || item.isChefSpecial).slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Slider Section */}
      <section className="relative w-full h-[520px] sm:h-[620px] overflow-hidden bg-black">
        {RESTAURANT_INFO.heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/50 to-black/60 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
              referrerPolicy="no-referrer"
            />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl space-y-5">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2a2217]/80 border border-[#c99a4e]/50 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#e4b568]" />
                  <span className="text-xs font-semibold tracking-wider text-[#f7efe1] uppercase">
                    Welcome to Paranga • Karol Bagh, New Delhi
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbf6ef] font-serif-heading leading-tight drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg text-[#d8cab7] font-light max-w-2xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => onNavigate('menu')}
                    id="hero-order-btn"
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#e4b568] via-[#c99a4e] to-[#ab7c34] hover:brightness-110 shadow-lg shadow-[#c99a4e]/20 transition-all transform active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Online</span>
                  </button>

                  <button
                    onClick={() => onNavigate('booking')}
                    id="hero-book-btn"
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#f5efe6] bg-[#1f1811]/90 hover:bg-[#2e2419] border border-[#c99a4e]/60 transition-all backdrop-blur-sm"
                  >
                    <Calendar className="w-4 h-4 text-[#c99a4e]" />
                    <span>Book a Table</span>
                  </button>

                  <button
                    onClick={onOpenPhysicalMenu}
                    id="hero-physical-menu-btn"
                    className="flex items-center space-x-2 px-5 py-3.5 rounded-xl font-medium text-sm text-[#d6c7b2] hover:text-white bg-transparent hover:bg-white/5 border border-[#4a3d2e] transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-[#c99a4e]" />
                    <span>View Menu Book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
          {RESTAURANT_INFO.heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-[#c99a4e]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust & Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#17130f] border border-[#33281c] shadow-xl">
          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 rounded-xl bg-[#241c14] border border-[#c99a4e]/30 text-[#c99a4e]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#f7efe1]">Top Rated in Karol Bagh</h4>
              <p className="text-[11px] text-[#9e8e78]">Channa Market destination</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 rounded-xl bg-[#241c14] border border-[#c99a4e]/30 text-[#c99a4e]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#f7efe1]">100% Hygienic Food</h4>
              <p className="text-[11px] text-[#9e8e78]">Strict separated kitchens</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 rounded-xl bg-[#241c14] border border-[#c99a4e]/30 text-[#c99a4e]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#f7efe1]">Family & Parties</h4>
              <p className="text-[11px] text-[#9e8e78]">Birthdays & kitty packages</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 rounded-xl bg-[#241c14] border border-[#c99a4e]/30 text-[#c99a4e]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#f7efe1]">Open 11 AM – 11:30 PM</h4>
              <p className="text-[11px] text-[#9e8e78]">Dine-in, takeaway & delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Great Cuisines Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c99a4e]">
            Our Culinary Spectrum
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1]">
            Three Distinct Cuisines, One Memorable Experience
          </h2>
          <p className="text-sm text-[#a89882]">
            Authentic spices, traditional clay tandoors, high-flame woks, and European comfort mains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* INDIAN */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#16120e] border border-[#362b1e] hover:border-[#c99a4e]/60 transition-all duration-300 flex flex-col justify-between shadow-lg">
            <div className="relative h-60 overflow-hidden">
              <img
                src="https://paranga.in/images/hs1.jpg"
                alt="Indian Cuisine at Paranga"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16120e] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#16120e]/80 border border-[#c99a4e]/40 backdrop-blur-md">
                <span className="text-xs font-bold tracking-widest text-[#e4b568] uppercase">
                  NORTH INDIAN
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif-heading text-[#f7efe1]">
                  Rich Curries & Charcoal Tandoor
                </h3>
                <p className="text-xs text-[#a89882] leading-relaxed mt-2">
                  Slow-simmered Dal Makhani, velvety Butter Chicken, tender Tandoori kebabs, Amritsari Paneer Tikka, and royal dum biryanis baked fresh with garlic butter naans.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2a2217] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#c99a4e]">15+ Authentic Dishes</span>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#f5efe6] group-hover:text-[#e4b568] transition-colors"
                >
                  <span>Explore Indian</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CHINESE */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#16120e] border border-[#362b1e] hover:border-[#c99a4e]/60 transition-all duration-300 flex flex-col justify-between shadow-lg">
            <div className="relative h-60 overflow-hidden">
              <img
                src="https://paranga.in/images/hs3.jpg"
                alt="Indo-Chinese at Paranga"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16120e] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#16120e]/80 border border-[#c99a4e]/40 backdrop-blur-md">
                <span className="text-xs font-bold tracking-widest text-[#e4b568] uppercase">
                  INDO-CHINESE
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif-heading text-[#f7efe1]">
                  Wok Tossed & Fiery Dim Sum
                </h3>
                <p className="text-xs text-[#a89882] leading-relaxed mt-2">
                  Karol Bagh’s famous crunchy Honey Chilli Potato, Darjeeling steamed & crispy kurkure momos, sizzling Chilli Chicken dry, wok Hakka noodles, and burnt garlic fried rice.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2a2217] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#c99a4e]">Chef’s Spicy Favorites</span>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#f5efe6] group-hover:text-[#e4b568] transition-colors"
                >
                  <span>Explore Chinese</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CONTINENTAL */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#16120e] border border-[#362b1e] hover:border-[#c99a4e]/60 transition-all duration-300 flex flex-col justify-between shadow-lg">
            <div className="relative h-60 overflow-hidden">
              <img
                src="https://paranga.in/images/hs2.jpg"
                alt="Continental & Pastas at Paranga"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16120e] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#16120e]/80 border border-[#c99a4e]/40 backdrop-blur-md">
                <span className="text-xs font-bold tracking-widest text-[#e4b568] uppercase">
                  CONTINENTAL
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif-heading text-[#f7efe1]">
                  Creamy Pastas & Sizzlers
                </h3>
                <p className="text-xs text-[#a89882] leading-relaxed mt-2">
                  Creamy Alfredo and spicy Arrabbiata penne with herb garlic toast, signature loaded sizzler platters, cheesy pull-apart bread, and handcrafted fruit mojitos.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2a2217] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#c99a4e]">Gourmet European Comfort</span>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#f5efe6] group-hover:text-[#e4b568] transition-colors"
                >
                  <span>Explore Continental</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Signatures / Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#c99a4e] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Diner Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#f7efe1] mt-1">
              Chef’s Signature Specials
            </h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center space-x-2 text-xs font-bold text-[#c99a4e] hover:text-[#e4b568] transition-colors group"
          >
            <span>View Full Menu ({MENU_ITEMS.length} Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureSpecials.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-[#16120e] border border-[#302619] hover:border-[#c99a4e]/50 transition-all p-4 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-[#241c14]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://paranga.in/images/g1.jpg';
                    }}
                  />
                  {/* Dietary badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-[10px] font-semibold text-white uppercase">
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {item.isBestseller && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#c99a4e] text-black font-bold text-[10px] uppercase tracking-wider">
                      Bestseller
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[#f7efe1] group-hover:text-[#e4b568] transition-colors font-serif-heading">
                    {item.name}
                  </h3>
                  <span className="text-base font-bold text-[#e4b568] whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-xs text-[#a3947f] mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#271f16] flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#8f7e68] capitalize">
                  {item.subcategory}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  id={`add-to-cart-${item.id}`}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] active:scale-95 transition-all shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physical Menu Book Viewer Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#201811] via-[#1a140e] to-[#201811] border border-[#4d3c26] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#352718] border border-[#c99a4e]/40 text-[#e4b568] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Original Printed Menu Cards</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1]">
                Browse The Authentic Paranga Menu Book
              </h2>
              <p className="text-sm text-[#b5a591] leading-relaxed">
                Experience our complete 12-page scanned in-restaurant dining menu. Flip through our traditional soup bowls, tandoori marinades, momo platters, sizzler specials, and artisan mocktails.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenPhysicalMenu}
                  id="open-menu-book-cta"
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-[#e4b568] to-[#c99a4e] hover:brightness-110 transition-all shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open 12-Page Menu Book</span>
                </button>
                <button
                  onClick={() => onNavigate('menu')}
                  className="px-5 py-3 rounded-xl font-semibold text-xs text-[#e8ded1] bg-[#271f16] hover:bg-[#342a1e] border border-[#52412c] transition-all"
                >
                  Interactive Online Menu
                </button>
              </div>
            </div>

            {/* Menu Book Visual Stack */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={onOpenPhysicalMenu}
                className="relative cursor-pointer group max-w-xs transition-transform hover:-translate-y-1"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#c99a4e] to-[#735222] opacity-40 blur group-hover:opacity-75 transition duration-300" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#c99a4e]/60 bg-black shadow-2xl">
                  <img
                    src="https://paranga.in/images/menu/m1.jpg"
                    alt="Paranga Printed Menu Cover"
                    className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#e4b568]">Click to Flip Pages</span>
                      <p className="text-[11px] text-[#ccc0b0]">12 High-Res Restaurant Scans</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#4a3925] shadow-2xl">
              <img
                src="https://paranga.in/images/about5.jpg"
                alt="Paranga Karol Bagh Ambience"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a] via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 sm:right-6 max-w-xs p-4 rounded-2xl bg-[#1d1711]/95 border border-[#c99a4e]/50 backdrop-blur-md shadow-2xl">
              <div className="flex items-center space-x-2 text-[#c99a4e] text-xs font-bold uppercase tracking-wider">
                <Coffee className="w-4 h-4" />
                <span>Our Heritage</span>
              </div>
              <p className="text-xs text-[#d1c4b2] mt-1 font-medium">
                "A peaceful family haven nestled in Channa Market, serving culinary love since our very first day."
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c99a4e]">
              Karol Bagh’s Beloved Kitchen
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1] leading-tight">
              Crafted With Fresh Spices, Dedicated Chefs & Warm Hospitality
            </h2>
            <p className="text-sm text-[#b5a591] leading-relaxed">
              Paranga Karol Bagh is a cozy family-friendly spot situated right beside Hotel Crown Dlx in Channa Market, just a few minutes from Ajmal Khan Road. Known across central Delhi for our hand-pinched momos, charcoal tandoori items, and best executive thali.
            </p>
            <p className="text-sm text-[#b5a591] leading-relaxed">
              We take pride in using only the freshest vegetables sourced daily, authentic whole spices slow-roasted in-house, and separate vegetarian and non-vegetarian kitchens to maintain absolute food hygiene.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#1c1610] border border-[#332719]">
                <h4 className="text-sm font-bold text-[#e4b568]">Separate Kitchens</h4>
                <p className="text-[11px] text-[#9c8c77]">Strict culinary hygiene</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1c1610] border border-[#332719]">
                <h4 className="text-sm font-bold text-[#e4b568]">Outdoor Catering</h4>
                <p className="text-[11px] text-[#9c8c77]">Events across Delhi NCR</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#c99a4e] hover:text-[#e4b568] transition-colors"
              >
                <span>Read Full Paranga Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Celebrations Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#16120e] border border-[#382c1d] p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c99a4e]">
              Gatherings & Celebrations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#f7efe1]">
              Host Your Special Moments At Paranga
            </h2>
            <p className="text-xs sm:text-sm text-[#a89882]">
              From festive birthday parties and lively kitty gatherings to formal corporate dinners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOOKING_SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#1e1711] border border-[#302517] hover:border-[#c99a4e]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2b2116] text-[#e4b568] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-[#f7efe1]">{srv.title}</h4>
                  <p className="text-xs text-[#a3937e] leading-relaxed">{srv.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#292015]">
                  <button
                    onClick={() => onNavigate('booking')}
                    className="text-xs font-semibold text-[#c99a4e] hover:underline"
                  >
                    Reserve Space →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Catering Inquiry bar */}
          <div className="mt-8 p-4 rounded-xl bg-[#221a12] border border-[#473723] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <Phone className="w-5 h-5 text-[#e4b568] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#f7efe1]">
                  Special Arrangements for Outdoor Catering & Large Groups
                </h4>
                <p className="text-[11px] text-[#9c8b76]">
                  Contact our banquet manager directly at {RESTAURANT_INFO.phone1} or {RESTAURANT_INFO.phone2}
                </p>
              </div>
            </div>
            <a
              href={`tel:${RESTAURANT_INFO.phone1}`}
              className="px-4 py-2 rounded-lg text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all whitespace-nowrap"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Guest Reviews / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c99a4e]">
            Real Diner Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#f7efe1]">
            Loved By Families & Food Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-[#a89882]">
            Authentic feedback from our guests dining in Channa Market, Karol Bagh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-[#16120e] border border-[#302518] flex flex-col justify-between space-y-4 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-[#e4b568]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e4b568]" />
                  ))}
                </div>
                <p className="text-xs text-[#cfc2b1] italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#292015] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#f7efe1]">{review.author}</h4>
                  <span className="text-[10px] text-[#8e7e69]">{review.tag}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400">Verified Visit</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

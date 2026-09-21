import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ActiveScreen } from '../types';
import {
  Heart,
  Utensils,
  Leaf,
  ShieldCheck,
  Award,
  Users,
  Phone,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#211911] via-[#16120e] to-[#211911] border border-[#3b2d1d] p-6 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#352718] border border-[#c99a4e]/40 text-[#e4b568] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Paranga Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-heading text-[#f7efe1] leading-tight">
            A Celebration of Flavors, Tradition & Warm Hospitality
          </h1>
          <p className="text-sm sm:text-base text-[#bdae99] leading-relaxed">
            Nestled in Channa Market, Karol Bagh, Paranga was founded with a simple yet ambitious vision: to bring together the rich warmth of authentic North Indian curries, the fiery excitement of Indo-Chinese wok cooking, and the comforting elegance of Continental mains under one inviting roof.
          </p>
        </div>
      </div>

      {/* The Story & Images Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c99a4e]">
            Our Culinary Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#f7efe1]">
            Karol Bagh’s Favorite Multi-Cuisine Destination
          </h2>
          <p className="text-xs sm:text-sm text-[#aba090] leading-relaxed">
            Paranga Karol Bagh is situated beside Hotel Crown Dlx in Channa Market, Block 8A WEA, moments away from the bustling Ajmal Khan Road. Over the years, we have become a peaceful sanctuary for families seeking authentic, hygienic food, office professionals enjoying executive thali lunches, and youths celebrating milestone birthdays.
          </p>
          <p className="text-xs sm:text-sm text-[#aba090] leading-relaxed">
            Every sauce is simmered from scratch, every tandoori skewer is marinated with authentic curd and whole ground spices, and every dim sum is hand-pinched with care. We maintain strict separation of vegetarian and non-vegetarian cooking stations to honor all dietary preferences.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-xs text-[#d6c9b8]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Artificial Preservatives</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#d6c9b8]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Separated Veg/Non-Veg Workstations</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#d6c9b8]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cold-Pressed & Filtered Cooking Oils</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden border border-[#3b2e1e] shadow-xl">
            <img
              src="https://paranga.in/images/about5.jpg"
              alt="Paranga Karol Bagh Interior"
              className="w-full h-64 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#3b2e1e] shadow-xl translate-y-6">
            <img
              src="https://paranga.in/images/about1.jpg"
              alt="Paranga Chef Preparation"
              className="w-full h-64 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c99a4e]">
            Our Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#f7efe1]">
            The Three Pillars of Paranga
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#16120e] border border-[#302517] hover:border-[#c99a4e]/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2b2116] border border-[#c99a4e]/40 text-[#e4b568] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-serif-heading text-[#f7efe1]">
              Fresh Ingredients
            </h3>
            <p className="text-xs text-[#a69783] leading-relaxed">
              We hand-pick farm vegetables daily and source premium cuts, fresh cream, dairy butter, and whole spices from trusted suppliers to assure superior flavor and freshness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#16120e] border border-[#302517] hover:border-[#c99a4e]/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2b2116] border border-[#c99a4e]/40 text-[#e4b568] flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-serif-heading text-[#f7efe1]">
              Authentic Recipes
            </h3>
            <p className="text-xs text-[#a69783] leading-relaxed">
              Every cuisine is handled by specialized chefs trained in slow-cooked North Indian gravies, authentic high-temperature Asian wok tossing, and gourmet European pastas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#16120e] border border-[#302517] hover:border-[#c99a4e]/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#2b2116] border border-[#c99a4e]/40 text-[#e4b568] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-serif-heading text-[#f7efe1]">
              Made With Love
            </h3>
            <p className="text-xs text-[#a69783] leading-relaxed">
              From our attentive stewards who remember your spice preferences to our generous portions and thoughtful surprises, hospitality is woven into every interaction.
            </p>
          </div>
        </div>
      </div>

      {/* Outdoor Catering Section */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1c1611] to-[#251b12] border border-[#423422] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#c99a4e] uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Outdoor Catering Services</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#f7efe1]">
            Planning a Wedding, Puja, or Corporate Gala in Delhi NCR?
          </h3>
          <p className="text-xs sm:text-sm text-[#b5a591] leading-relaxed">
            Let Paranga bring our live tandoori ovens, sizzling wok stations, and lavish multi-cuisine buffets to your venue. Custom packages for 25 to 500+ guests.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={`tel:${RESTAURANT_INFO.phone1}`}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Catering Desk</span>
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-[#f5efe6] bg-[#292017] hover:bg-[#34291e] border border-[#4d3d2b] transition-all"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

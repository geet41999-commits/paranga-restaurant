import React from 'react';
import { ActiveScreen } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Calendar,
  BookOpen,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenPhysicalMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPhysicalMenu }) => {
  return (
    <footer className="bg-[#0f0c09] border-t border-[#261e14] text-[#b0a08c] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#241c13]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full p-1 bg-[#1c1610] border border-[#c99a4e]/50 flex items-center justify-center overflow-hidden">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt="Paranga Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold tracking-[0.16em] text-[#f7efe1] font-brand">
                    PARANGA
                  </span>
                  <span className="text-sm font-medium text-[#c99a4e] font-subheading">
                    {RESTAURANT_INFO.devanagariName}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9c8a74] block font-medium">
                  {RESTAURANT_INFO.cuisinesText}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#998974] leading-relaxed max-w-sm">
              Karol Bagh’s beloved casual dining haven in Channa Market. Serving authentic North Indian clay-tandoor curries, hand-crafted dim sums & momos, and continental sizzlers.
            </p>

            <div className="pt-1 flex items-center space-x-3">
              <button
                onClick={() => onNavigate('booking')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#f5efe6] bg-[#221a12] hover:bg-[#2e2318] border border-[#423321] transition-all flex items-center space-x-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#c99a4e]" />
                <span>Reserve Table</span>
              </button>

              <button
                onClick={onOpenPhysicalMenu}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#c99a4e] hover:text-white bg-transparent border border-[#3b2d1d] hover:border-[#c99a4e] transition-all flex items-center space-x-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Menu Book</span>
              </button>
            </div>
          </div>

          {/* Quick Screen Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">
              Quick Screens
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#e4b568] transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#e4b568] transition-colors"
                >
                  Digital Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-[#e4b568] transition-colors"
                >
                  Book Table & Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#e4b568] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#e4b568] transition-colors"
                >
                  Our Heritage & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#e4b568] transition-colors"
                >
                  Contact & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Cuisines & Specialities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">
              Our Specialties
            </h4>
            <ul className="space-y-1.5 text-xs text-[#9c8a74]">
              <li>• Butter Chicken & Dal Makhani</li>
              <li>• Charcoal Tandoori Murgh & Seekh</li>
              <li>• Honey Chilli Potato & Kurkure Momos</li>
              <li>• Schezwan Wok Noodles & Fried Rice</li>
              <li>• Creamy Alfredo Pasta & Sizzlers</li>
              <li>• Signature Strawberry Mojitos</li>
              <li>• Sizzling Walnut Brownie with Ice Cream</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">
              Reach Paranga
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#c99a4e] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {RESTAURANT_INFO.address}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#c99a4e] flex-shrink-0" />
                <div>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone1}`}
                    className="hover:text-[#e4b568] font-semibold"
                  >
                    {RESTAURANT_INFO.phone1}
                  </a>
                  <span className="text-[#6e5f4d] mx-1">/</span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone2}`}
                    className="hover:text-[#e4b568]"
                  >
                    {RESTAURANT_INFO.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#c99a4e] flex-shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="hover:text-[#e4b568]"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#c99a4e] flex-shrink-0" />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#786a58] gap-3">
          <p>
            Copyright © {new Date().getFullYear()} Paranga Restaurant & Cafe. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('contact')} className="hover:underline">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:underline">
              Terms of Service
            </button>
            <span>•</span>
            <span>Designed with Petpooja System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, Clock, MapPin, ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveScreen; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu & Order' },
    { id: 'booking', label: 'Book a Table' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact & FAQ' },
  ];

  const handleNavClick = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#14110e]/95 backdrop-blur-md border-b border-[#30271c] transition-all">
      {/* Top micro bar with contact and timings */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs text-[#b8a994] border-b border-[#251e16] bg-[#0c0a08]/80">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c99a4e]" />
            <span>Channa Market, Karol Bagh, New Delhi</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c99a4e]" />
            <span>Open All Days: 11:00 AM – 11:30 PM</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={`tel:${RESTAURANT_INFO.phone1}`}
            className="flex items-center space-x-1 hover:text-[#e4b568] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c99a4e]" />
            <span className="font-medium">{RESTAURANT_INFO.phone1}</span>
          </a>
          <span className="text-[#4a3f31]">|</span>
          <a
            href={`tel:${RESTAURANT_INFO.phone2}`}
            className="hover:text-[#e4b568] transition-colors"
          >
            {RESTAURANT_INFO.phone2}
          </a>
        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-1 bg-gradient-to-br from-[#c99a4e]/20 via-[#1f1912] to-[#c99a4e]/40 border border-[#b8863b]/50 shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt="Paranga Logo"
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if network issue
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute text-[10px] font-bold text-[#c99a4e] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                P
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#f7efe1] font-brand group-hover:text-[#e4b568] transition-colors">
                  PARANGA
                </span>
                <span className="text-sm sm:text-base font-medium text-[#c99a4e] font-subheading">
                  {RESTAURANT_INFO.devanagariName}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#ab9a82] font-medium">
                {RESTAURANT_INFO.cuisinesText}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-${item.id}`}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#fbf6ef] bg-[#2a2217] border border-[#c99a4e]/40 shadow-sm'
                      : 'text-[#cec0ad] hover:text-[#f7efe1] hover:bg-[#1f1912]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Book Table Button */}
            <button
              onClick={() => handleNavClick('booking')}
              id="header-book-table-btn"
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#f5efe6] bg-[#221c15] hover:bg-[#2d251c] border border-[#524330] hover:border-[#c99a4e] transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c99a4e]" />
              <span>Book Table</span>
            </button>

            {/* Order / Cart Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-black bg-gradient-to-r from-[#d9a857] to-[#b8863b] hover:from-[#e4b568] hover:to-[#c99a4e] transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span className="hidden sm:inline font-bold">My Order</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-black rounded-full border border-[#e4b568]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#d1c4b2] hover:text-white hover:bg-[#221c15] border border-[#382d20]"
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#15120e] border-b border-[#362b1e] px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeScreen === item.id
                    ? 'text-[#f5efe6] bg-[#292015] border-l-4 border-[#c99a4e]'
                    : 'text-[#bfae98] hover:bg-[#1e1710] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#292116] flex flex-col space-y-2 text-xs text-[#a3937c]">
            <div className="flex items-center justify-between px-2">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c99a4e]" />
                <span>11:00 AM – 11:30 PM</span>
              </span>
              <a
                href={`tel:${RESTAURANT_INFO.phone1}`}
                className="text-[#c99a4e] font-semibold hover:underline"
              >
                Call: {RESTAURANT_INFO.phone1}
              </a>
            </div>
            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => handleNavClick('booking')}
                className="flex-1 py-2 rounded-lg text-center font-semibold text-xs text-[#e8ded1] bg-[#241d15] border border-[#4d3d2a]"
              >
                Book a Table
              </button>
              <button
                onClick={() => handleNavClick('menu')}
                className="flex-1 py-2 rounded-lg text-center font-semibold text-xs text-black bg-[#c99a4e]"
              >
                View Full Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

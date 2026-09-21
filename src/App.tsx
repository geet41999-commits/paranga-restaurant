import React, { useState, useEffect } from 'react';
import { ActiveScreen, MenuItem, CartItem } from './types';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { BookingScreen } from './components/BookingScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { AboutScreen } from './components/AboutScreen';
import { ContactScreen } from './components/ContactScreen';
import { CartDrawer } from './components/CartDrawer';
import { PhysicalMenuModal } from './components/PhysicalMenuModal';
import { Footer } from './components/Footer';
import {
  Home,
  UtensilsCrossed,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  Info,
  PhoneCall,
  Check,
} from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('paranga_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPhysicalMenuOpen, setIsPhysicalMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('paranga_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
    showToast(`Added ${item.name} to order`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const screens = [
    { id: 'home' as ActiveScreen, label: 'Home', icon: Home },
    { id: 'menu' as ActiveScreen, label: 'Menu & Order', icon: UtensilsCrossed },
    { id: 'booking' as ActiveScreen, label: 'Book Table', icon: Calendar },
    { id: 'gallery' as ActiveScreen, label: 'Gallery', icon: ImageIcon },
    { id: 'about' as ActiveScreen, label: 'Our Story', icon: Info },
    { id: 'contact' as ActiveScreen, label: 'Contact & FAQ', icon: PhoneCall },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b09] text-[#f5efe6]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#201913] border border-[#c99a4e] text-white shadow-2xl animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">
            <Check className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={(s) => {
          setActiveScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Screen Selector Tab Bar (Quick access to all screens) */}
      <div className="w-full bg-[#16120e] border-b border-[#2e2317] sticky top-[73px] sm:top-[105px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2 scrollbar-none gap-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {screens.map((screen) => {
                const Icon = screen.icon;
                const isActive = activeScreen === screen.id;
                return (
                  <button
                    key={screen.id}
                    onClick={() => {
                      setActiveScreen(screen.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    id={`screen-tab-${screen.id}`}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#c99a4e] text-black shadow-sm font-bold'
                        : 'text-[#b8a994] hover:bg-[#221a13] hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{screen.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Menu book launcher badge */}
            <button
              onClick={() => setIsPhysicalMenuOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#e4b568] hover:text-white bg-[#261d14] hover:bg-[#34271a] border border-[#4d3a24] whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Original</span>
              <span>Menu Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Screen Body */}
      <main className="flex-1">
        {activeScreen === 'home' && (
          <HomeScreen
            onNavigate={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onOpenPhysicalMenu={() => setIsPhysicalMenuOpen(true)}
          />
        )}

        {activeScreen === 'menu' && (
          <MenuScreen
            onAddToCart={handleAddToCart}
            cart={cart}
            onOpenPhysicalMenu={() => setIsPhysicalMenuOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {activeScreen === 'booking' && <BookingScreen />}

        {activeScreen === 'gallery' && <GalleryScreen />}

        {activeScreen === 'about' && (
          <AboutScreen
            onNavigate={(s) => {
              setActiveScreen(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'contact' && <ContactScreen />}
      </main>

      {/* Physical Menu Book Modal */}
      <PhysicalMenuModal
        isOpen={isPhysicalMenuOpen}
        onClose={() => setIsPhysicalMenuOpen(false)}
        onNavigateToOrder={() => {
          setActiveScreen('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer
        onNavigate={(s) => {
          setActiveScreen(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPhysicalMenu={() => setIsPhysicalMenuOpen(true)}
      />
    </div>
  );
}

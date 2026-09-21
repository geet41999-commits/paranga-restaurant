import React, { useState, useMemo } from 'react';
import { MenuItem, CuisineType, CartItem } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
import {
  Search,
  Filter,
  Flame,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

interface MenuScreenProps {
  onAddToCart: (item: MenuItem) => void;
  cart: CartItem[];
  onOpenPhysicalMenu: () => void;
  onOpenCart: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onAddToCart,
  cart,
  onOpenPhysicalMenu,
  onOpenCart,
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'nonveg' | 'bestseller'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const cuisineTabs: { id: CuisineType; label: string; count: number }[] = [
    { id: 'all', label: 'All Dishes', count: MENU_ITEMS.length },
    {
      id: 'indian',
      label: 'North Indian & Tandoori',
      count: MENU_ITEMS.filter((i) => i.category === 'indian').length,
    },
    {
      id: 'chinese',
      label: 'Indo-Chinese & Momos',
      count: MENU_ITEMS.filter((i) => i.category === 'chinese').length,
    },
    {
      id: 'continental',
      label: 'Continental & Sizzlers',
      count: MENU_ITEMS.filter((i) => i.category === 'continental').length,
    },
    {
      id: 'beverages',
      label: 'Mocktails & Beverages',
      count: MENU_ITEMS.filter((i) => i.category === 'beverages').length,
    },
    {
      id: 'desserts',
      label: 'Desserts',
      count: MENU_ITEMS.filter((i) => i.category === 'desserts').length,
    },
  ];

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCuisine !== 'all' && item.category !== selectedCuisine) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'nonveg' && item.isVeg) return false;
      if (dietaryFilter === 'bestseller' && !item.isBestseller) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSub = item.subcategory.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSub) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured
    });
  }, [selectedCuisine, dietaryFilter, searchQuery, sortBy]);

  const getItemQuantity = (id: string) => {
    const found = cart.find((c) => c.item.id === id);
    return found ? found.quantity : 0;
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1c1610] via-[#14100c] to-[#1c1610] border border-[#3d2f1f] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#c99a4e] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Cuisine Culinary Art</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1] mt-1">
              Paranga Dining & Order Menu
            </h1>
            <p className="text-xs sm:text-sm text-[#ab9b86] max-w-2xl mt-1.5 leading-relaxed">
              Explore authentic charcoal tandoor curries, hand-crafted dim sums, wok noodles, and continental sizzlers prepared fresh in Karol Bagh.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenPhysicalMenu}
              id="menu-open-physical-btn"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#f5efe6] bg-[#271f16] hover:bg-[#342a1e] border border-[#52412c] transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[#c99a4e]" />
              <span>View Original Menu Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="space-y-4">
        {/* Cuisine Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {cuisineTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCuisine(tab.id)}
              id={`tab-cuisine-${tab.id}`}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
                selectedCuisine === tab.id
                  ? 'bg-[#c99a4e] text-black shadow-md shadow-[#c99a4e]/20 font-bold'
                  : 'bg-[#18130f] text-[#bdae99] hover:bg-[#241c14] hover:text-white border border-[#2d2317]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  selectedCuisine === tab.id ? 'bg-black/20 text-black' : 'bg-[#2b2116] text-[#c99a4e]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Dietary Filters Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#15110d] border border-[#2e2316]">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8f7e68] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search butter chicken, momos, pasta..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[#201913] border border-[#3b2d1d] text-[#f5efe6] placeholder-[#7d6e5a] focus:outline-none focus:border-[#c99a4e]"
            />
          </div>

          {/* Dietary Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-[#312518] text-[#f5efe6] border border-[#c99a4e]/50'
                  : 'text-[#9c8b76] hover:bg-[#1e1710]'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                  : 'text-[#9c8b76] hover:bg-[#1e1710]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietaryFilter('nonveg')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                dietaryFilter === 'nonveg'
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                  : 'text-[#9c8b76] hover:bg-[#1e1710]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Non-Veg</span>
            </button>
            <button
              onClick={() => setDietaryFilter('bestseller')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                dietaryFilter === 'bestseller'
                  ? 'bg-[#3d2b17] text-[#e4b568] border border-[#c99a4e]'
                  : 'text-[#9c8b76] hover:bg-[#1e1710]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#e4b568]" />
              <span>Bestsellers</span>
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center space-x-2 text-xs text-[#9c8b76] w-full sm:w-auto justify-end">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#201913] border border-[#3b2d1d] rounded-lg px-2.5 py-1.5 text-xs text-[#e8ded1] focus:outline-none focus:border-[#c99a4e]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#16120e] border border-[#302517] space-y-3">
          <Filter className="w-10 h-10 text-[#7a6a56] mx-auto" />
          <h3 className="text-base font-bold text-[#f7efe1]">No dishes matched your filter</h3>
          <p className="text-xs text-[#9c8b77]">
            Try adjusting your search query or reset dietary options to browse all items.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisine('all');
              setDietaryFilter('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((dish) => {
            const qty = getItemQuantity(dish.id);
            return (
              <div
                key={dish.id}
                className="group rounded-2xl bg-[#16120e] border border-[#2e2417] hover:border-[#c99a4e]/50 transition-all p-4 flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Dish Photo */}
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-[#241c14]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://paranga.in/images/g1.jpg';
                      }}
                    />

                    {/* Standard Indian Veg / Non-Veg Indicator */}
                    <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10">
                      <div
                        className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                          dish.isVeg
                            ? 'border-emerald-500'
                            : 'border-rose-500'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            dish.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                        {dish.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>

                    {/* Ribbons */}
                    <div className="absolute top-2.5 right-2.5 flex flex-col items-end space-y-1">
                      {dish.isBestseller && (
                        <span className="px-2 py-0.5 rounded bg-[#c99a4e] text-black font-bold text-[9px] uppercase tracking-wider shadow-sm">
                          Bestseller
                        </span>
                      )}
                      {dish.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded bg-[#5a3e1c] text-[#f7efe1] border border-[#c99a4e]/60 font-bold text-[9px] uppercase tracking-wider shadow-sm">
                          Chef Special
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#f7efe1] group-hover:text-[#e4b568] transition-colors font-serif-heading">
                        {dish.name}
                      </h3>
                      <span className="text-base font-bold text-[#e4b568] whitespace-nowrap">
                        ₹{dish.price}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-[#8e7e68]">
                      <span className="capitalize">{dish.subcategory}</span>
                      {dish.spicyLevel && (
                        <>
                          <span>•</span>
                          <span title={`Spice Level: ${dish.spicyLevel}/3`}>
                            {'🌶️'.repeat(dish.spicyLevel)}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-[#a89882] line-clamp-2 leading-relaxed pt-1">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Add Action */}
                <div className="mt-4 pt-3 border-t border-[#261e15] flex items-center justify-between">
                  <span className="text-[11px] text-[#8a7964]">Pure & Fresh</span>

                  {qty > 0 ? (
                    <div className="flex items-center space-x-2 bg-[#2a2015] border border-[#c99a4e]/60 rounded-xl px-2.5 py-1">
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="p-1 text-[#e4b568] hover:text-white"
                        title="Add one more"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#f5efe6] px-1">{qty} in cart</span>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(dish)}
                      id={`menu-add-${dish.id}`}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] active:scale-95 transition-all shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Order</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Cart Bar if cart has items */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto z-40">
          <div className="p-3.5 rounded-2xl bg-[#201811]/95 border-2 border-[#c99a4e] shadow-2xl backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#c99a4e] text-black flex items-center justify-center font-bold">
                {totalCartCount}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#f7efe1]">
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in your order
                </h4>
                <p className="text-[11px] text-[#c99a4e]">Ready for Dine-in or Delivery</p>
              </div>
            </div>
            <button
              onClick={onOpenCart}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#e4b568] to-[#c99a4e] hover:brightness-110 transition-all shadow-md"
            >
              View Cart & Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { PHYSICAL_MENU_PAGES } from '../data/restaurantData';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, BookOpen } from 'lucide-react';

interface PhysicalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToOrder?: () => void;
}

export const PhysicalMenuModal: React.FC<PhysicalMenuModalProps> = ({
  isOpen,
  onClose,
  onNavigateToOrder,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const currentPage = PHYSICAL_MENU_PAGES[currentPageIndex];

  const handleNext = () => {
    setIsZoomed(false);
    setCurrentPageIndex((prev) => (prev + 1) % PHYSICAL_MENU_PAGES.length);
  };

  const handlePrev = () => {
    setIsZoomed(false);
    setCurrentPageIndex((prev) => (prev - 1 + PHYSICAL_MENU_PAGES.length) % PHYSICAL_MENU_PAGES.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#14110e] border border-[#3b2e1e] shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#2d2317] bg-[#1a140f]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded-lg bg-[#2b2116] text-[#c99a4e]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#f7efe1] font-serif-heading">
                Paranga Restaurant Printed Menu Book
              </h3>
              <p className="text-[11px] text-[#a89984]">
                Page {currentPage.page} of {PHYSICAL_MENU_PAGES.length} — {currentPage.title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-lg text-[#c2b29c] hover:text-white bg-[#251d15] hover:bg-[#32271c] border border-[#3a2e1f] text-xs font-medium flex items-center space-x-1"
              title={isZoomed ? 'Reset Zoom' : 'Zoom In'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span className="hidden sm:inline">{isZoomed ? 'Fit' : 'Zoom'}</span>
            </button>

            {onNavigateToOrder && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToOrder();
                }}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all"
              >
                Order Online
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#b8a792] hover:text-white bg-[#251d15] hover:bg-[#32271c] border border-[#3a2e1f]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main View (Image with Prev/Next Controls) */}
        <div className="relative flex-1 bg-[#0a0806] flex items-center justify-center overflow-auto p-2 sm:p-6 min-h-[350px]">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Page"
            className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#c99a4e] text-white hover:text-black border border-white/20 hover:border-[#c99a4e] transition-all shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Page"
            className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#c99a4e] text-white hover:text-black border border-white/20 hover:border-[#c99a4e] transition-all shadow-lg active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Current Scanned Menu Page */}
          <div
            className={`transition-all duration-300 flex items-center justify-center ${
              isZoomed ? 'w-full max-w-4xl scale-125 my-12' : 'max-h-[62vh] w-auto'
            }`}
          >
            <img
              src={currentPage.image}
              alt={`Paranga Menu Page ${currentPage.page} - ${currentPage.title}`}
              className="rounded-lg shadow-2xl border border-[#362a1c] max-h-[60vh] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="px-4 py-3 bg-[#17120d] border-t border-[#2d2317] overflow-x-auto flex items-center space-x-2 scrollbar-thin">
          {PHYSICAL_MENU_PAGES.map((page, idx) => (
            <button
              key={page.page}
              onClick={() => {
                setIsZoomed(false);
                setCurrentPageIndex(idx);
              }}
              className={`flex-shrink-0 relative rounded-md overflow-hidden border transition-all ${
                idx === currentPageIndex
                  ? 'border-[#c99a4e] ring-2 ring-[#c99a4e]/40 scale-105'
                  : 'border-[#33281b] opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={page.image}
                alt={`Thumb ${page.page}`}
                className="w-12 h-16 object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-bold text-center text-[#e4b568]">
                p.{page.page}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/restaurantData';
import { GalleryPhoto } from '../types';
import { Sparkles, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const GalleryScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'beverage' | 'ambiance' | 'events'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Dishes & Platters' },
    { id: 'beverage', label: 'Mocktails & Coolers' },
    { id: 'ambiance', label: 'Dining Ambiance' },
    { id: 'events', label: 'Parties & Events' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (selectedCategory === 'all') return true;
    return photo.category === selectedCategory;
  });

  const handleNextLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1f1710] via-[#14100c] to-[#1f1710] border border-[#3b2d1d] p-6 sm:p-10">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#352618] border border-[#c99a4e]/40 text-[#e4b568] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Glimpse of Paranga</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1]">
            Restaurant Gallery & Food Photography
          </h1>
          <p className="text-xs sm:text-sm text-[#b3a38f] leading-relaxed">
            Take a visual tour of our freshly prepared dishes, sparkling drinks, cozy seating booths, and joyful customer celebrations in Karol Bagh.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#c99a4e] text-black font-bold shadow-md shadow-[#c99a4e]/20'
                : 'bg-[#18130f] text-[#b8a994] hover:bg-[#251d16] hover:text-white border border-[#302517]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photos Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setLightboxPhoto(photo)}
            className="group relative rounded-2xl overflow-hidden bg-[#16120e] border border-[#2e2316] hover:border-[#c99a4e]/60 cursor-pointer shadow-md transition-all duration-300"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-[#f7efe1] font-serif-heading">
                  {photo.title}
                </span>
                <span className="text-[10px] text-[#c99a4e] uppercase tracking-wider font-semibold">
                  Click to Expand
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-[#14110e] border border-[#3b2e1e] overflow-hidden shadow-2xl">
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2317] bg-[#1a140f]">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#f7efe1] font-serif-heading">
                  {lightboxPhoto.title}
                </h3>
                <span className="text-[11px] text-[#c99a4e] capitalize">
                  Category: {lightboxPhoto.category}
                </span>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-1.5 rounded-lg text-[#b8a792] hover:text-white bg-[#251d15] hover:bg-[#32271c] border border-[#3a2e1f]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Stage */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] p-2">
              <button
                onClick={handlePrevLightbox}
                className="absolute left-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-[#c99a4e] text-white hover:text-black border border-white/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-xl"
                referrerPolicy="no-referrer"
              />

              <button
                onClick={handleNextLightbox}
                className="absolute right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-[#c99a4e] text-white hover:text-black border border-white/20 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

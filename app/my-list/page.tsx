'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Heart, Trash2 } from 'lucide-react';
import { ITINERARIES, Itinerary } from '@/constants/itineraries';

export default function MyListPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('my-list');
    if (saved) {
      try {
        setFavoriteIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved places', e);
      }
    }
    setLoading(false);
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavs = favoriteIds.filter(favId => favId !== id);
    setFavoriteIds(newFavs);
    localStorage.setItem('my-list', JSON.stringify(newFavs));
  };

  const savedItineraries = ITINERARIES.filter(item => favoriteIds.includes(item.id));

  if (loading) {
    return (
      <div className="flex-1 bg-[#FFF9F2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D97C5F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#2C1810] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#D97C5F] font-bold tracking-[0.2em] text-sm uppercase">Your Collection</span>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-[#2C1810]">
            我的收藏清單
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            這裡記錄了您心之所向的深度路線。隨時準備好，開啟下一段台灣靈魂之旅。
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedItineraries.length > 0 ? (
            savedItineraries.map((route) => (
              <div key={route.id} className="group relative">
                <Link href={`/explore/${route.slug}`} className="block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 bg-gray-200">
                    <Image
                      src={route.images[0]}
                      alt={route.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                    {/* Meta Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                        {route.region}
                      </span>
                      <span className="px-3 py-1 bg-[#D97C5F]/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                        {route.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-2 leading-snug">
                        {route.title}
                      </h3>
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-white/80 text-xs line-clamp-1 flex-1 pr-4">
                          {route.tripDetails.location} • {route.tripDetails.duration}
                        </p>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() => toggleFavorite(route.id)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-red-500/80 transition-all duration-300"
                  title="移除收藏"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center space-y-8 animate-slide-up">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-300">
                <Heart size={40} />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium text-stone-400">目前還沒有收藏任何行程</p>
                <p className="text-stone-400 text-sm italic">點擊 Explore 頁面上的愛心，開始建立您的私人清單。</p>
              </div>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-[#2C1810] text-[#FFF9F2] px-8 py-3.5 rounded-full hover:bg-[#D97C5F] transition-all duration-300 shadow-xl font-bold"
              >
                前往探索 <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

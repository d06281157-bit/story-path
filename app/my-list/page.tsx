'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Heart, Trash2, Calendar, Users, Sparkles, Plus } from 'lucide-react';
import { ITINERARIES } from '@/constants/itineraries';

export default function MyListPage() {
  const [activeTab, setActiveTab] = useState<'itineraries' | 'plans'>('itineraries');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Saved Itineraries
    const savedFavs = localStorage.getItem('my-list');
    if (savedFavs) {
      try { setFavoriteIds(JSON.parse(savedFavs)); } catch (e) { console.error('Failed to parse saved itineraries', e); }
    }

    // Load Custom Plans
    const savedPlans = localStorage.getItem('my-custom-plans');
    if (savedPlans) {
      try { setCustomPlans(JSON.parse(savedPlans)); } catch (e) { console.error('Failed to parse saved custom plans', e); }
    }

    setLoading(false);
  }, []);

  const removeFavorite = (id: string) => {
    const newFavs = favoriteIds.filter(favId => favId !== id);
    setFavoriteIds(newFavs);
    localStorage.setItem('my-list', JSON.stringify(newFavs));
  };

  const removePlan = (id: string) => {
    const newPlans = customPlans.filter(p => p.id !== id);
    setCustomPlans(newPlans);
    localStorage.setItem('my-custom-plans', JSON.stringify(newPlans));
  };

  const savedItineraries = ITINERARIES.filter(item => favoriteIds.includes(item.id));

  if (loading) {
    return (
      <div className="flex-1 bg-[#FFF9F2] flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#D97C5F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#2C1810] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-[#D97C5F] font-bold tracking-[0.2em] text-sm uppercase">Personal Collection</span>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-[#2C1810]">
            我的全台口袋清單
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            保存您喜愛的深度路線與 AI 專屬計畫。
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-stone-100 shadow-sm flex gap-1">
            <button
              onClick={() => setActiveTab('itineraries')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'itineraries'
                ? 'bg-[#2C1810] text-[#FFF9F2] shadow-lg'
                : 'text-stone-400 hover:text-[#D97C5F]'
                }`}
            >
              <Heart size={16} className={activeTab === 'itineraries' ? 'fill-current' : ''} />
              收藏路線 ({savedItineraries.length})
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'plans'
                ? 'bg-[#2C1810] text-[#FFF9F2] shadow-lg'
                : 'text-stone-400 hover:text-[#D97C5F]'
                }`}
            >
              <Sparkles size={16} />
              AI 智慧計畫 ({customPlans.length})
            </button>
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'itineraries' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedItineraries.length > 0 ? (
              savedItineraries.map((route) => (
                <div key={route.id} className="group relative">
                  <Link href={`/explore/${route.slug}`} className="block">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm shadow-stone-200 group-hover:shadow-2xl transition-all duration-500 bg-gray-200">
                      <Image
                        src={route.images[0]}
                        alt={route.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                          {route.region}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-2 leading-snug">
                          {route.title}
                        </h3>
                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <p className="text-white/80 text-xs line-clamp-1 flex-1 pr-4 font-medium">
                            {route.tripDetails.location} • {route.tripDetails.duration}
                          </p>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => removeFavorite(route.id)}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-red-500/80 transition-all duration-300"
                    title="移除收藏"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <EmptyState type="itineraries" />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customPlans.length > 0 ? (
              <>
                {customPlans.map((plan) => (
                  <div key={plan.id} className="bg-white rounded-[2rem] p-6 shadow-sm shadow-stone-100 border border-stone-50 group hover:shadow-xl hover:border-[#D97C5F]/20 transition-all duration-500 relative">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-[#D97C5F]/10 p-3 rounded-2xl text-[#D97C5F]">
                        <Sparkles size={24} />
                      </div>
                      <button
                        onClick={() => removePlan(plan.id)}
                        className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                        title="移除計畫"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h3 className="text-2xl font-bold font-serif text-[#2C1810] leading-tight">
                        {plan.location} · {plan.duration} 天之旅
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-50 rounded-full text-[11px] font-bold text-stone-500 border border-stone-100">
                          <Users size={12} /> {plan.companion}
                        </div>
                        {plan.themes?.map((t: string) => (
                          <div key={t} className="px-3 py-1 bg-[#D97C5F]/5 rounded-full text-[11px] font-bold text-[#D97C5F] border border-[#D97C5F]/10">
                            {t}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-stone-300 font-bold tracking-widest uppercase flex items-center gap-2">
                        <Calendar size={10} /> Created on {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/plan?planId=${plan.id}`}
                        className="block w-full text-center py-3.5 bg-stone-50 text-stone-600 rounded-xl text-sm font-bold hover:bg-[#D97C5F] hover:text-white transition-all duration-300 border border-stone-100 flex items-center justify-center gap-2 group"
                      >
                        查看完整計畫 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Add New Plan Button Card */}
                <Link
                  href="/plan"
                  className="bg-white/40 border-2 border-dashed border-stone-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 hover:border-[#D97C5F]/40 hover:bg-[#D97C5F]/5 transition-all group min-h-[300px]"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-stone-300 group-hover:text-[#D97C5F] group-hover:scale-110 transition-all shadow-sm">
                    <Plus size={32} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-stone-400 group-hover:text-[#D97C5F]">新增 AI 智慧計畫</h3>
                    <p className="text-xs text-stone-300 mt-1">開啟新一輪的靈感規劃</p>
                  </div>
                </Link>
              </>
            ) : (
              <EmptyState type="plans" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ type }: { type: 'itineraries' | 'plans' }) {
  return (
    <div className="col-span-full py-24 text-center space-y-8 animate-slide-up">
      <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-300">
        {type === 'itineraries' ? <Heart size={40} /> : <Sparkles size={40} />}
      </div>
      <div className="space-y-2">
        <p className="text-xl font-medium text-stone-400">
          {type === 'itineraries' ? '目前還沒有收藏任何行程' : '尚未建立 AI 智慧計畫'}
        </p>
        <p className="text-stone-400 text-sm italic">
          {type === 'itineraries' ? '點擊 Explore 頁面上的愛心，開始建立您的私人清單。' : '前往 Plan 頁面，讓我們為您量身打造專屬路線。'}
        </p>
      </div>
      <Link
        href={type === 'itineraries' ? "/explore" : "/plan"}
        className="inline-flex items-center gap-2 bg-[#2C1810] text-[#FFF9F2] px-8 py-3.5 rounded-full hover:bg-[#D97C5F] transition-all duration-300 shadow-xl font-bold"
      >
        {type === 'itineraries' ? '前往探索' : '立即體驗 AI 規劃'} <ArrowRight size={18} />
      </Link>
    </div>
  );
}

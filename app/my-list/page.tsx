'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Heart, Trash2, Calendar, Users, Sparkles, Plus, X, Camera, MapPin as MapPinIcon, Heart as HeartIcon, Share2, Image as ImageIcon, BookOpen } from 'lucide-react';
import { ITINERARIES } from '@/constants/itineraries';
import { resultProfiles, Dimension } from '@/lib/quizData';
import clsx from 'clsx';

export default function MyListPage() {
  const [activeTab, setActiveTab] = useState<'itineraries' | 'plans'>('itineraries');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  const [quickPlanItems, setQuickPlanItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Journal Modal State
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [selectedPlanForJournal, setSelectedPlanForJournal] = useState<any>(null);
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [journalNote, setJournalNote] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [personality, setPersonality] = useState<Dimension | null>(null);

  useEffect(() => {
    // Load Saved Itineraries
    const savedFavs = localStorage.getItem('my-list');
    if (savedFavs) {
      try { setFavoriteIds(JSON.parse(savedFavs)); } catch (e) { console.error('Failed to parse saved itineraries', e); }
    }

    // Load Custom Plans (AI Generated)
    const savedPlans = localStorage.getItem('my-custom-plans');
    if (savedPlans) {
      try { setCustomPlans(JSON.parse(savedPlans)); } catch (e) { console.error('Failed to parse saved custom plans', e); }
    }

    // Load Quick Plan Items (from Detail Page "Add to Plan")
    const quickPlan = localStorage.getItem('wanderly-plan');
    if (quickPlan) {
      try {
        const parsed = JSON.parse(quickPlan);
        setQuickPlanItems(parsed.items || []);
      } catch (e) { console.error('Failed to parse quick plan items', e); }
    }

    setLoading(false);

    // Load personality
    const savedPersona = localStorage.getItem('wanderly-persona') as Dimension;
    if (savedPersona && resultProfiles[savedPersona]) {
      setPersonality(savedPersona);
    } else {
      setPersonality('OldStreet');
    }
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

  const removeQuickPlanItem = (id: string) => {
    const newItems = quickPlanItems.filter(item => item.id !== id);
    setQuickPlanItems(newItems);
    const quickPlan = localStorage.getItem('wanderly-plan');
    const plan = quickPlan ? JSON.parse(quickPlan) : { items: [], currentDay: 1 };
    plan.items = newItems;
    localStorage.setItem('wanderly-plan', JSON.stringify(plan));
  };

  const savedItineraries = ITINERARIES.filter(item => favoriteIds.includes(item.id));
  const quickPlanItineraries = quickPlanItems.map(item => {
    const itinerary = ITINERARIES.find(i => i.id === item.id);
    return itinerary ? { ...itinerary, addedDay: item.day, addedAt: item.addedAt } : null;
  }).filter(Boolean);

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
          <div className="space-y-12">
            {/* Quick Plan Items Section */}
            {quickPlanItineraries.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 p-2 rounded-xl">
                    <Plus size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2C1810]">行程草稿</h3>
                    <p className="text-xs text-stone-400">從景點詳細頁加入的項目</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(quickPlanItineraries as any[]).map((route: any) => (
                    <div key={route.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 group hover:shadow-lg transition-all relative">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={route.images[0]}
                            alt={route.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/explore/${route.slug}`} className="hover:text-[#D97C5F] transition-colors">
                            <h4 className="font-bold text-sm text-[#2C1810] truncate mb-1">{route.title}</h4>
                          </Link>
                          <p className="text-xs text-stone-400 mb-2">{route.tripDetails.location}</p>
                          <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">
                            第 {route.addedDay || 1} 天
                          </span>
                        </div>
                        <button
                          onClick={() => removeQuickPlanItem(route.id)}
                          className="absolute top-3 right-3 p-1.5 text-stone-300 hover:text-red-500 transition-colors"
                          title="移除"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Generated Plans Section */}
            <div className="space-y-6">
              {(customPlans.length > 0 || quickPlanItineraries.length > 0) && (
                <div className="flex items-center gap-3">
                  <div className="bg-[#D97C5F]/10 p-2 rounded-xl">
                    <Sparkles size={18} className="text-[#D97C5F]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2C1810]">AI 智慧計畫</h3>
                    <p className="text-xs text-stone-400">由 AI 根據您的人格生成的完整行程</p>
                  </div>
                </div>
              )}

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

                        <div className="pt-4 flex flex-col gap-2">
                          <Link
                            href={`/plan?planId=${plan.id}`}
                            className="w-full text-center py-3.5 bg-stone-50 text-stone-600 rounded-xl text-sm font-bold hover:bg-[#D97C5F] hover:text-white transition-all duration-300 border border-stone-100 flex items-center justify-center gap-2 group"
                          >
                            查看完整計畫 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedPlanForJournal(plan);
                              setIsJournalOpen(true);
                              setSelectedSpot(plan.itinerary[0]?.items[0]?.place || null);
                            }}
                            className="w-full text-center py-3.5 bg-terracotta/5 text-terracotta rounded-xl text-sm font-bold hover:bg-terracotta hover:text-white transition-all duration-300 border border-terracotta/10 flex items-center justify-center gap-2"
                          >
                            <BookOpen size={16} /> 時光隨筆 RECORD
                          </button>
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
            </div>
          </div>
        )}
      </div>

      {/* Journal Modal */}
      {isJournalOpen && selectedPlanForJournal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-[#2C1810]/40 backdrop-blur-md" onClick={() => setIsJournalOpen(false)}></div>

          <div className="relative bg-[#FAF7F2] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border border-white animate-scale-in custom-scrollbar">
            <button
              onClick={() => setIsJournalOpen(false)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 relative overflow-hidden">
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black font-serif text-[#2C1810]">時光隨筆</h2>
                  <p className="text-stone-400 text-sm font-medium italic mt-1">針對 {selectedPlanForJournal.location} 之旅的心情紀錄</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left: Spot Selection */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white/60 p-5 rounded-2xl border border-white shadow-sm">
                      <h3 className="text-sm font-black text-[#2C1810] uppercase tracking-widest mb-4">選擇景點</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlanForJournal.itinerary.flatMap((day: any) => day.items).map((item: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedSpot(item.place)}
                            className={clsx(
                              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                              selectedSpot?.id === item.place.id
                                ? "bg-[#2C1810] text-white border-[#2C1810]"
                                : "bg-white text-stone-500 border-stone-100 hover:border-terracotta/30"
                            )}
                          >
                            {item.place.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {personality && resultProfiles[personality] && (
                      <div className="bg-white/60 p-5 rounded-2xl border border-white shadow-sm">
                        <span className="inline-block px-3 py-1 bg-terracotta text-white text-[10px] font-black rounded-full mb-3">
                          {resultProfiles[personality].title}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {resultProfiles[personality].tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold text-[#2C1810]/40 italic">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Postcard Creator */}
                  <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-stone-100 flex flex-col md:flex-row gap-8">
                      {/* Polaroid Part */}
                      <div className="md:w-1/2 space-y-4">
                        <div className="bg-white p-3 pb-10 shadow-lg -rotate-1 rounded-sm ring-1 ring-black/5">
                          <div className="relative aspect-square bg-stone-100 overflow-hidden rounded-sm group/photo">
                            {imagePreview ? (
                              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300 gap-2 cursor-pointer hover:bg-stone-50 transition-colors">
                                <Plus size={24} />
                                <span className="text-[9px] font-black tracking-widest uppercase">上傳回憶</span>
                              </div>
                            )}
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => setImagePreview(reader.result as string);
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Text Part */}
                      <div className="md:w-1/2 flex flex-col">
                        <div className="border-b-2 border-dashed border-stone-100 pb-3 mb-4">
                          <h4 className="text-xl font-black font-serif text-[#2C1810]">
                            {selectedSpot?.name || '旅行中的某處...'}
                          </h4>
                          <p className="text-[10px] text-terracotta font-bold mt-1 uppercase flex items-center gap-1">
                            <MapPinIcon size={10} /> {selectedSpot?.city || 'TAIWAN'}
                          </p>
                        </div>

                        <textarea
                          value={journalNote}
                          onChange={(e) => setJournalNote(e.target.value)}
                          placeholder="寫下那一刻的心情..."
                          className="flex-1 w-full min-h-[150px] bg-transparent border-none outline-none resize-none font-medium text-[#5A3E36] placeholder:text-stone-300 leading-relaxed custom-scrollbar text-sm"
                        />

                        <div className="mt-4 flex items-center justify-between opacity-30 grayscale pointer-events-none">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 font-serif">W</div>
                            <span className="text-[8px] font-black text-stone-400 leading-tight uppercase">Wanderly<br />Story Path</span>
                          </div>
                          <HeartIcon size={16} className="text-stone-300" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button className="px-6 py-2.5 bg-[#2C1810] text-white rounded-full font-bold shadow-lg hover:bg-black transition-all flex items-center gap-2 active:scale-95 text-sm">
                        <Sparkles size={16} /> 儲存明信片
                      </button>
                      <button className="px-6 py-2.5 bg-white text-stone-500 border border-stone-200 rounded-full font-bold shadow-md hover:bg-stone-50 transition-all flex items-center gap-2 active:scale-95 text-sm">
                        <Share2 size={16} /> 下載分享
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

"use client";

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MapPin, ArrowRight, Heart, ChevronDown, Filter, Search, Sparkles } from 'lucide-react';
import { ITINERARIES } from '@/constants/itineraries'
import { Dimension, resultProfiles } from '@/lib/quizData';

const CATEGORIES = ['所有風格', '城市文化', '老街', '自然', '展覽', '生活', '季節主題'];
const REGIONS = ['所有地區', '北部', '中部', '南部', '東部'];

function ExploreContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [selectedCategory, setSelectedCategory] = useState('所有風格');
    const [selectedRegion, setSelectedRegion] = useState('所有地區');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPersonaMode, setIsPersonaMode] = useState(false);
    const [userPersona, setUserPersona] = useState<Dimension | null>(null);

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    // Initialize category from URL
    useEffect(() => {
        if (categoryParam && CATEGORIES.includes(categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    // Load persona and favorites from localStorage
    useEffect(() => {
        const savedFavs = localStorage.getItem('my-list');
        if (savedFavs) {
            setFavorites(JSON.parse(savedFavs));
        }

        const persona = localStorage.getItem('wanderly-persona') as Dimension;
        if (persona) {
            setUserPersona(persona);
            setIsPersonaMode(true); // Default to persona mode if they have one
        }
    }, []);

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        const newFavs = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];

        setFavorites(newFavs);
        localStorage.setItem('my-list', JSON.stringify(newFavs));
    };

    // Integrated Filter Matching
    const filteredRoutes = ITINERARIES.filter(route => {
        // Category Filter
        const categoryMatch = selectedCategory === '所有風格' || route.tag === selectedCategory;

        // Region Filter
        const regionMatch = selectedRegion === '所有地區' || route.region === selectedRegion;

        // Search Filter (Title, Region, Tag)
        const query = searchQuery.toLowerCase();
        const searchMatch = !searchQuery ||
            route.title.toLowerCase().includes(query) ||
            route.region.toLowerCase().includes(query) ||
            route.tag.toLowerCase().includes(query);

        // Persona Filter (If active, score > 80)
        let personaMatch = true;
        if (isPersonaMode && userPersona) {
            const score = route.matchScores?.[userPersona] || 0;
            personaMatch = score >= 80;
        }

        return categoryMatch && regionMatch && searchMatch && personaMatch;
    });

    return (
        <div className="min-h-screen bg-[#FFF9F2] text-[#2C1810] font-sans">

            {/* Hero Section - Warm & Soft Aesthetic */}
            <div className="relative py-28 px-6 text-center overflow-hidden bg-[#FFF9F2]">
                {/* Soft Decorative Glows */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[120%] bg-[#D97C5F]/5 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[120%] bg-[#D97C5F]/10 rounded-full blur-[120px] animate-pulse-slow" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in">
                    <div className="space-y-4">
                        <span className="inline-block text-[#D97C5F] font-black tracking-[0.2em] text-[11px] uppercase bg-white px-4 py-1.5 rounded-full border border-[#D97C5F]/10 shadow-sm">
                            Curated Itineraries
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black font-serif tracking-tight text-[#2C1810] leading-tight">
                            探索台灣靈魂
                        </h1>
                    </div>
                    <div className="w-12 h-1 bg-[#D97C5F]/20 mx-auto rounded-full" />
                    <p className="text-stone-500/80 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
                        我們精選了 24 條最具代表性的深度路線，涵蓋各個地區與文化主題，<br className="hidden md:block" />帶您走進台灣最真實的故事場景。
                    </p>
                </div>
            </div>

            {/* Smart Filter Layer - Sticky */}
            <div className="sticky top-0 z-30 bg-[#FFF9F2]/80 backdrop-blur-2xl border-b border-[#D97C5F]/10 px-6 py-4">
                <div className="max-w-7xl mx-auto space-y-4">

                    {/* Top Row: Search & Persona Toggle */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Search Bar (Glassmorphism) */}
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#D97C5F] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="搜尋地點、地區或風格標籤..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-3.5 bg-white/40 border border-white rounded-2xl shadow-sm backdrop-blur-md focus:bg-white/80 focus:ring-2 focus:ring-[#D97C5F]/20 outline-none transition-all placeholder:text-stone-400 font-medium"
                            />
                        </div>

                        {/* Persona Toggle */}
                        {userPersona && (
                            <div className="flex bg-stone-200/50 p-1.5 rounded-2xl gap-1 shrink-0">
                                <button
                                    onClick={() => setIsPersonaMode(true)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${isPersonaMode ? 'bg-[#D97C5F] text-white shadow-lg' : 'text-stone-500 hover:bg-stone-200'}`}
                                >
                                    <Sparkles size={16} />
                                    為我推薦
                                </button>
                                <button
                                    onClick={() => setIsPersonaMode(false)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${!isPersonaMode ? 'bg-[#2C1810] text-white shadow-lg' : 'text-stone-500 hover:bg-stone-200'}`}
                                >
                                    探索全部
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom Row: Tags & Dropdowns */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Region Pick (Static) */}
                        <div className="flex items-center gap-2 pr-4 border-r border-stone-200 min-w-fit">
                            <Filter size={14} className="text-[#D97C5F]" />
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">區域</span>
                            <div className="relative">
                                <button
                                    onClick={() => { setIsRegionOpen(!isRegionOpen); setIsCategoryOpen(false); }}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold hover:border-[#D97C5F]/50 transition-all shadow-sm"
                                >
                                    <MapPin size={12} className={selectedRegion === '所有地區' ? 'text-stone-300' : 'text-[#D97C5F]'} />
                                    {selectedRegion}
                                    <ChevronDown size={14} className={`transition-transform text-stone-400 ${isRegionOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isRegionOpen && (
                                    <>
                                        {/* Overlay to close when clicking outside */}
                                        <div className="fixed inset-0 z-40" onClick={() => setIsRegionOpen(false)} />
                                        <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-stone-100 rounded-xl shadow-xl z-50 py-2 animate-scale-in">
                                            {REGIONS.map(reg => (
                                                <button
                                                    key={reg}
                                                    onClick={() => { setSelectedRegion(reg); setIsRegionOpen(false); }}
                                                    className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${selectedRegion === reg ? 'bg-[#D97C5F]/5 text-[#D97C5F]' : 'text-stone-500 hover:bg-stone-50'}`}
                                                >
                                                    {reg}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Tag Bar - Scrollable */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest mr-2 md:hidden">風格</span>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === cat ? 'bg-[#2C1810] border-[#2C1810] text-white shadow-md' : 'bg-white border-stone-200 text-stone-500 hover:border-[#D97C5F]/30'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRoutes.map((route) => (
                        <div
                            key={route.id}
                            className="group block relative h-full"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm shadow-stone-200 group-hover:shadow-xl transition-all duration-500 bg-gray-200">
                                <Link href={`/explore/${route.slug}`} className="absolute inset-0 z-10">
                                    <Image
                                        src={route.images[0]}
                                        alt={route.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                                    {/* Floating Tags (Left) */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                                            {route.region}
                                        </span>
                                        <span className="px-3 py-1 bg-[#D97C5F]/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                                            {route.tag}
                                        </span>
                                        {isPersonaMode && userPersona && route.matchScores?.[userPersona] && (
                                            <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black rounded-full shadow-lg">
                                                {route.matchScores[userPersona]}% MATCH
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-2 leading-snug">
                                            {route.title}
                                        </h3>
                                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <p className="text-white/80 text-xs line-clamp-1 flex-1 pr-4">
                                                {route.description}
                                            </p>
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* My List Heart Icon (Right) - Z-INDEX MUST BE HIGHER THAN LINK */}
                                <button
                                    onClick={(e) => toggleFavorite(e, route.id)}
                                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/30 transition-all duration-300 group/heart"
                                >
                                    <Heart
                                        size={18}
                                        className={`transition-all duration-300 ${favorites.includes(route.id)
                                            ? 'fill-red-500 text-red-500 scale-110'
                                            : 'group-hover/heart:scale-110'}`}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRoutes.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p>此分類尚無行程。</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen text-terracotta">Loading...</div>}>
            <ExploreContent />
        </Suspense>
    )
}

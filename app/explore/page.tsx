"use client";

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MapPin, ArrowRight, Heart, ChevronDown, Filter } from 'lucide-react';
import { ITINERARIES } from '@/constants/itineraries'

const CATEGORIES = ['所有風格', '城市文化', '老街', '自然', '展覽', '生活', '季節主題'];
const REGIONS = ['所有地區', '北部', '中部', '南部', '東部'];

function ExploreContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [selectedCategory, setSelectedCategory] = useState('所有風格');
    const [selectedRegion, setSelectedRegion] = useState('所有地區');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    // Initialize category from URL
    useEffect(() => {
        if (categoryParam && CATEGORIES.includes(categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    // Load favorites from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('my-list');
        if (saved) {
            setFavorites(JSON.parse(saved));
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

    // Dual-track Filter Matching
    const filteredRoutes = ITINERARIES.filter(route => {
        const categoryMatch = selectedCategory === '所有風格' || route.tag === selectedCategory;
        const regionMatch = selectedRegion === '所有地區' || route.region === selectedRegion;
        return categoryMatch && regionMatch;
    });

    return (
        <div className="min-h-screen bg-[#FFF9F2] text-[#2C1810] font-sans">

            {/* Hero Section */}
            <div className="relative py-24 px-6 text-center overflow-hidden h-[400px] flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1541414779247-679542fb6d01?q=80&w=2000&auto=format&fit=crop"
                        alt="Taiwan Mountain Landscape"
                        fill
                        className="object-cover opacity-60 scale-105 animate-slow-zoom"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F2]/20 via-[#FFF9F2]/40 to-[#FFF9F2]" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                    <span className="text-[#D97C5F] font-bold tracking-[0.2em] text-sm uppercase">Curated Itineraries</span>
                    <h1 className="text-4xl md:text-6xl font-black font-serif tracking-tight text-[#2C1810] leading-tight">
                        探索台灣靈魂
                    </h1>
                    <p className="text-gray-600 max-w-lg mx-auto leading-relaxed font-medium">
                        我們精選了 24 條最具代表性的深度路線，涵蓋各個地區與文化主題，帶您走進台灣最真實的故事場景。
                    </p>
                </div>
            </div>

            {/* Filter Dropdowns - Sticky Header */}
            <div className="sticky top-0 z-30 bg-[#FFF9F2]/90 backdrop-blur-xl border-b border-[#D97C5F]/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 mr-4">
                        <Filter size={18} className="text-[#D97C5F]" />
                        <span className="text-xs font-black text-stone-400 uppercase tracking-widest">進階篩選</span>
                    </div>

                    {/* Region Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setIsRegionOpen(!isRegionOpen); setIsCategoryOpen(false); }}
                            className="flex items-center gap-3 px-6 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm font-bold shadow-sm hover:border-[#D97C5F]/50 transition-all min-w-[160px] justify-between group"
                        >
                            <span className={selectedRegion === '所有地區' ? 'text-stone-400' : 'text-[#D97C5F]'}>
                                {selectedRegion}
                            </span>
                            <ChevronDown size={16} className={`text-stone-300 group-hover:text-[#D97C5F] transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isRegionOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-stone-100 rounded-2xl shadow-xl z-50 py-2 animate-scale-in">
                                {REGIONS.map(reg => (
                                    <button
                                        key={reg}
                                        onClick={() => { setSelectedRegion(reg); setIsRegionOpen(false); }}
                                        className={`w-full text-left px-6 py-2.5 text-sm font-bold transition-colors ${selectedRegion === reg ? 'bg-[#D97C5F]/5 text-[#D97C5F]' : 'text-stone-500 hover:bg-stone-50'}`}
                                    >
                                        {reg}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsRegionOpen(false); }}
                            className="flex items-center gap-3 px-6 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm font-bold shadow-sm hover:border-[#D97C5F]/50 transition-all min-w-[160px] justify-between group"
                        >
                            <span className={selectedCategory === '所有風格' ? 'text-stone-400' : 'text-[#2C1810]'}>
                                {selectedCategory}
                            </span>
                            <ChevronDown size={16} className={`text-stone-300 group-hover:text-[#D97C5F] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-stone-100 rounded-2xl shadow-xl z-50 py-2 animate-scale-in">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                                        className={`w-full text-left px-6 py-2.5 text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-[#2C1810]/5 text-[#2C1810]' : 'text-stone-500 hover:bg-stone-50'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Clear Filters Button (Only shown if something is selected) */}
                    {(selectedRegion !== '所有地區' || selectedCategory !== '所有風格') && (
                        <button
                            onClick={() => { setSelectedRegion('所有地區'); setSelectedCategory('所有風格'); }}
                            className="text-xs font-bold text-stone-400 hover:text-[#D97C5F] transition-colors decoration-dotted underline underline-offset-4"
                        >
                            清除所有篩選
                        </button>
                    )}
                </div>
            </div>

            {/* Grid Content */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRoutes.map((route) => (
                        <Link
                            href={`/explore/${route.slug}`}
                            key={route.id}
                            className="group block relative"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm shadow-stone-200 group-hover:shadow-xl transition-all duration-500 bg-gray-200">
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
                                </div>

                                {/* My List Heart Icon (Right) */}
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
                            </div>
                        </Link>
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

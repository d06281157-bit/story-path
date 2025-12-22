"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { ITINERARIES } from '@/constants/itineraries'

const CATEGORIES = ['全部', '城市文化', '老街', '自然', '展覽', '生活', '季節主題'];

export default function ExplorePage() {
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [favorites, setFavorites] = useState<string[]>([]);

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

    // Filter matching
    const filteredRoutes = selectedCategory === '全部'
        ? ITINERARIES
        : ITINERARIES.filter(r => r.tag === selectedCategory);

    return (
        <div className="min-h-screen bg-[#FFF9F2] text-[#2C1810] font-sans">

            {/* Hero Section */}
            <div className="relative py-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#D97C5F]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-[#2C1810]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                    <span className="text-[#D97C5F] font-bold tracking-[0.2em] text-sm uppercase">Curated Itineraries</span>
                    <h1 className="text-4xl md:text-6xl font-black font-serif tracking-tight text-[#2C1810] leading-tight">
                        探索台灣靈魂
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        我們精選了 24 條最具代表性的深度路線，從北部到東部，涵蓋城市文化、老街與山海自然，帶您走進台灣最真實的故事場景。
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="sticky top-0 z-30 bg-[#FFF9F2]/80 backdrop-blur-md border-b border-[#D97C5F]/10 mb-12">
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
                    <div className="flex items-center gap-2 md:justify-center py-4 min-w-max">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-[#2C1810] text-[#FFF9F2] shadow-lg scale-105'
                                    : 'bg-white text-gray-500 hover:bg-[#D97C5F]/10 hover:text-[#D97C5F]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
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

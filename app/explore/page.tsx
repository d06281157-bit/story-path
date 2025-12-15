'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { places } from '@/lib/placesData';
import { Dimension } from '@/lib/quizData';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';

const categories: (Dimension | 'All')[] = ['All', 'OldStreet', 'Nature', 'Culture', 'Lifestyle'];

const categoryLabels: Record<string, string> = {
  All: '全部',
  OldStreet: '老街',
  Nature: '自然',
  Culture: '文化',
  Lifestyle: '生活',
};

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState<Dimension | 'All'>('All');

  const filteredPlaces = activeCategory === 'All' 
    ? places 
    : places.filter(place => place.category === activeCategory);

  return (
    <div className="flex-1 flex flex-col bg-[#FFF9F2] animate-fade-in overflow-y-auto">
      <div className="p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-[#2C2C2C]">Discover Taiwan</h1>
            <p className="text-xs text-gray-500 tracking-wide">Find destinations that match your heart.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={clsx(
                        "text-xs px-3 py-1.5 rounded-full transition-all border",
                        activeCategory === cat 
                            ? "bg-terracotta text-white border-terracotta shadow-md" 
                            : "bg-white text-gray-500 border-gray-200 hover:border-terracotta/50"
                    )}
                >
                    {categoryLabels[cat]}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
            {filteredPlaces.map((place) => (
                <Link href={`/explore/${place.id}`} key={place.id} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-terracotta/20">
                        <div className="relative h-48 w-full overflow-hidden">
                             <Image 
                                src={place.image} 
                                alt={place.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                unoptimized
                             />
                             <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-terracotta tracking-wider uppercase shadow-sm">
                                 {categoryLabels[place.category]}
                             </div>
                        </div>
                        <div className="p-4 space-y-2">
                             <h3 className="font-bold text-gray-800 text-lg group-hover:text-terracotta transition-colors">{place.title}</h3>
                             <div className="flex items-center text-gray-400 text-xs gap-1">
                                 <MapPin size={12} />
                                 <span>{place.location}</span>
                             </div>
                             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                 {place.description}
                             </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

      </div>
    </div>
  );
}

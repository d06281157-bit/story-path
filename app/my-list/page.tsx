'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';

interface Place {
  id: number;
  name: string;
  region: string;
  category: string;
  duration: string;
  image: string;
  description: string;
}

export default function MyListPage() {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('wanderly_saved_places');
    if (saved) {
      try {
        setSavedPlaces(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved places', e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex-1 bg-[#FFF9F2] flex items-center justify-center text-terracotta">Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FFF9F2] animate-fade-in overflow-y-auto">
      <div className="p-6 max-w-7xl mx-auto w-full space-y-8">

        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-3xl font-bold text-[#2C2C2C]">My Saved Destinations</h1>
          <p className="text-sm text-gray-500 tracking-wide">Your curated list of Taiwan's wonders.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
          {savedPlaces.length > 0 ? (
            savedPlaces.map((place) => (
              <Link href={`/explore/${place.id}`} key={place.id} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-terracotta/20 h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      <span className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-terracotta tracking-wider uppercase shadow-sm">
                        {place.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-terracotta transition-colors">{place.name}</h3>
                    <div className="flex items-center text-gray-400 text-xs gap-1">
                      <MapPin size={12} />
                      <span>{place.region}</span>
                      <span className="text-gray-300 mx-1">|</span>
                      <span>{place.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
                      {place.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 flex flex-col items-center gap-4">
              <p className="text-lg">You haven't saved any places yet.</p>
              <Link
                href="/explore"
                className="flex items-center gap-2 bg-terracotta text-white px-6 py-2 rounded-full hover:bg-[#c26a4e] transition-colors shadow-md text-sm font-bold"
              >
                Go to Explore <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { MapPin, Heart, Clock, Star } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

// Mock Data
const savedDestinations = [
  {
    id: '1',
    title: 'Mount Batur',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    tags: ['Nature', 'Adventure']
  },
  {
    id: '4',
    title: 'Jiufen Old Street',
    location: 'New Taipei, Taiwan',
    image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Jiufen',
    rating: 4.7,
    tags: ['Culture', 'Food']
  },
  {
    id: '7',
    title: 'Mount Fuji',
    location: 'Shizuoka, Japan',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    tags: ['Landmark', 'Nature']
  }
];

const wishlist = [
  {
    id: '3',
    title: 'Raja Ampat',
    location: 'Papua, Indonesia',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?auto=format&fit=crop&w=600&q=80',
    note: 'Must visit for diving!'
  },
  {
    id: '8',
    title: 'Kyoto Streets',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    note: 'Cherry blossom season?'
  }
];

const recentlyViewed = [
  { id: '2', title: 'Uluwatu Temple', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80' },
  { id: '5', title: 'Taroko Gorge', image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Taroko' },
  { id: '9', title: 'Shibuya Crossing', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80' },
  { id: '6', title: 'Sun Moon Lake', image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Sun+Moon+Lake' },
];

export default function MyListPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">My Travel List</h1>
          <p className="text-gray-500">Your personalized collection of adventures.</p>
        </header>

        <div className="space-y-16">
          
          {/* Section A: Saved Destinations */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="text-terracotta fill-terracotta" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-800">Saved Destinations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedDestinations.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-sm">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      {item.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin size={14} className="mr-1 text-terracotta" />
                      {item.location}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section B: Wishlist */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-terracotta" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-800">Wishlist</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="flex bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-terracotta/30 transition-colors">
                  <div className="relative w-32 h-full min-h-[120px]">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                    <p className="text-xs text-terracotta font-medium italic">"{item.note}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section C: Recently Viewed */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="text-terracotta" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-800">Recently Viewed</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {recentlyViewed.map((item) => (
                <div key={item.id} className="min-w-[200px] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

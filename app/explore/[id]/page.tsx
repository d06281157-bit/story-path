import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { places } from '@/lib/placesData';
import {
    ChevronLeft,
    MapPin,
    Heart,
    Clock,
    Bus,
    Sun,
    CheckCircle2
} from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

// --- 1. Mock Extended Data Helpers ---

const getHighlights = (category: string) => {
    switch (category) {
        case '城市文化':
            return ['Historical Architecture', 'Local Stories & Legends', 'Guided Heritage Tour'];
        case '老街散策':
            return ['Traditional Snacks', 'Old Street Atmosphere', 'Handicraft Shopping'];
        case '戶外自然':
            return ['Scenic Hiking Trails', 'Breathtaking Views', 'Ecological Discovery'];
        case '展覽文化':
            return ['Art Installations', 'Interactive Exhibits', 'Creative Workshops'];
        case '市場生活':
            return ['Local Market Experience', 'Hidden Gems', 'Authentic Daily Life'];
        case '季節主題':
            return ['Seasonal Festivals', 'Limited Time Events', 'Crowd Favorites'];
        default:
            return ['Must-visit Spot', 'Great Photo Op', 'Relaxing Vibe'];
    }
};

const getGalleryImages = (id: string, count: number) => {
    // Return all local images available for this route
    // count is typically 4
    const images = [];
    for (let i = 1; i <= count; i++) {
        images.push(`/images/itineraries/${id}-${i}.jpg`);
    }
    return images;
};

export default async function PlaceDetailPage({ params }: PageProps) {
    const { id } = await params;
    const place = places.find((p) => p.id === id);

    if (!place) {
        notFound();
    }

    const highlights = getHighlights(place.category);
    const galleryImages = getGalleryImages(place.id, place.imageCount);
    const mainImage = galleryImages[0];

    return (
        <div className="flex-1 flex flex-col bg-white animate-fade-in min-h-screen relative">

            {/* --- Section A: Hero Image --- */}
            <div className="relative h-[50vh] w-full">
                <Image
                    src={mainImage}
                    alt={place.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Nav */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                    <Link
                        href="/explore"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-full transition-all"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-full transition-all group">
                        <Heart size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Hero Title Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-10 text-white">
                    <div className="max-w-6xl mx-auto">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider uppercase bg-terracotta/80 backdrop-blur-sm rounded-full">
                            {place.region}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2 text-shadow-sm">
                            {place.name}
                        </h1>
                        <div className="flex items-center gap-2 text-white/90 text-sm font-light">
                            <MapPin size={16} />
                            <span>{place.region}, Taiwan</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section B: Main Content Area --- */}
            <div className="max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column (Span 2): The Story */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Description Section */}
                    <div>
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-terracotta border border-terracotta/30 rounded-full bg-terracotta/5 uppercase">
                            {place.category}
                        </span>
                        <p className="text-xl leading-relaxed text-gray-700 font-serif">
                            {place.description}
                        </p>
                        <p className="mt-4 text-gray-600 leading-7">
                            Experience the unique charm of {place.name}. Whether you are looking for {highlights[0].toLowerCase()} or simply want to unwind, this destination offers a perfect blend of {place.category} and local atmosphere.
                        </p>
                    </div>

                    {/* Highlights Section */}
                    <div className="border-t border-gray-100 pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Highlights</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {highlights.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 size={20} className="text-terracotta" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Gallery Section */}
                    <div className="border-t border-gray-100 pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Gallery</h2>
                        <div className="grid grid-cols-3 gap-4 h-48 md:h-64">
                            {galleryImages.slice(1).map((img, idx) => ( // Skip first as it is hero
                                <div key={idx} className="relative w-full h-full rounded-lg overflow-hidden group">
                                    <Image
                                        src={img}
                                        alt={`Gallery ${idx}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (Span 1): Info Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-[#FFF9F2] p-8 rounded-2xl border border-[#D97C5F]/20 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-1">Trip Details</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Plan your visit</p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-full text-terracotta shadow-sm">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Duration</p>
                                    <p className="text-gray-800 font-medium">{place.duration || '1 Day'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-full text-terracotta shadow-sm">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                                    <p className="text-gray-800 font-medium">{place.region}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-full text-terracotta shadow-sm">
                                    <Bus size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Transport</p>
                                    <p className="text-gray-800 font-medium">Public Transit / Walking</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-full text-terracotta shadow-sm">
                                    <Sun size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Best Season</p>
                                    <p className="text-gray-800 font-medium">Spring / Autumn</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="w-full bg-terracotta text-white font-bold py-4 rounded-xl hover:bg-[#c66a4e] transition-colors shadow-terracotta/30 shadow-lg active:scale-95 transform duration-150">
                                Add to Plan
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

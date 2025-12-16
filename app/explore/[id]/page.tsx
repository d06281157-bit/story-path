import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { places } from '@/lib/placesData';
import { ChevronLeft, MapPin } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PlaceDetailPage({ params }: PageProps) {
    const { id } = await params;
    const place = places.find((p) => p.id === Number(id));

    if (!place) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col bg-[#FFF9F2] animate-fade-in overflow-y-auto pb-20 relative">

            {/* Hero Image */}
            <div className="relative h-64 w-full">
                <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Link
                    href="/explore"
                    className="absolute top-4 left-4 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
                >
                    <ChevronLeft size={20} />
                </Link>
            </div>

            <div className="px-6 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl p-6 shadow-md space-y-6">

                    {/* Header Info */}
                    <div className="space-y-2 text-center border-b border-gray-100 pb-4">
                        <span className="text-[10px] font-bold tracking-widest text-terracotta uppercase border border-terracotta/30 px-2 py-0.5 rounded-full bg-terracotta/5">
                            {place.category}
                        </span>
                        <h1 className="text-2xl font-bold text-gray-900 font-serif">{place.name}</h1>
                        <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                            <MapPin size={12} />
                            <span>{place.region}</span>
                            <span className="text-gray-300 mx-1">|</span>
                            <span>{place.duration}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm leading-7 text-justify">
                            {place.description}
                        </p>
                    </div>

                </div>
            </div>

            <div className="p-6">
                <Link
                    href="/explore"
                    className="block w-full bg-white border border-gray-200 text-gray-500 font-bold py-3 rounded-full text-center hover:bg-gray-50 hover:text-gray-800 transition-colors text-sm shadow-sm"
                >
                    Back to Explore
                </Link>
            </div>

        </div>
    );
}

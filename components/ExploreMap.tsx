"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { Itinerary } from '@/constants/itineraries';
import { Dimension, resultProfiles } from '@/lib/quizData';

interface ExploreMapProps {
    routes: Itinerary[];
    userPersona: Dimension | null;
    isPersonaMode: boolean;
}

export default function ExploreMap({ routes, userPersona, isPersonaMode }: ExploreMapProps) {
    const [MapContainer, setMapContainer] = useState<any>(null);
    const [TileLayer, setTileLayer] = useState<any>(null);
    const [Marker, setMarker] = useState<any>(null);
    const [Popup, setPopup] = useState<any>(null);
    const [L, setL] = useState<any>(null);
    const [selectedRoute, setSelectedRoute] = useState<Itinerary | null>(null);

    // Dynamically import react-leaflet to avoid SSR issues
    useEffect(() => {
        import('react-leaflet').then((mod) => {
            setMapContainer(() => mod.MapContainer);
            setTileLayer(() => mod.TileLayer);
            setMarker(() => mod.Marker);
            setPopup(() => mod.Popup);
        });

        import('leaflet').then((mod) => {
            setL(mod.default);
        });
    }, []);

    if (!MapContainer || !TileLayer || !Marker || !Popup || !L) {
        return (
            <div className="w-full h-[600px] bg-stone-100 rounded-3xl flex items-center justify-center">
                <div className="text-stone-400 font-bold animate-pulse">載入地圖中...</div>
            </div>
        );
    }

    // Custom marker icons
    const createIcon = (isMatch: boolean, matchScore?: number) => {
        const size = isMatch ? 40 : 24;
        const color = isMatch ? '#D97C5F' : '#9ca3af';

        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    ${isMatch ? 'animation: pulse 2s infinite;' : ''}
                ">
                    ${isMatch && matchScore ? `<span style="color: white; font-size: 10px; font-weight: bold;">${matchScore}%</span>` : ''}
                </div>
            `,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
            popupAnchor: [0, -size / 2]
        });
    };

    // Filter routes with coordinates
    const routesWithCoords = routes.filter(r => r.coordinates);

    // Get match score for a route
    const getMatchScore = (route: Itinerary) => {
        if (!userPersona || !isPersonaMode) return null;
        return route.matchScores?.[userPersona] || null;
    };

    // Calculate center of Taiwan
    const taiwanCenter: [number, number] = [23.5, 121.0];

    return (
        <div className="relative">
            {/* Custom CSS for marker animation */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .leaflet-container {
                    font-family: inherit;
                    border-radius: 1.5rem;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 1rem;
                    padding: 0;
                    overflow: hidden;
                }
                .leaflet-popup-content {
                    margin: 0;
                }
            `}</style>

            <MapContainer
                center={taiwanCenter}
                zoom={8}
                style={{ height: '600px', width: '100%', borderRadius: '1.5rem' }}
                className="z-10"
            >
                {/* OpenStreetMap - Free, no API key required */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routesWithCoords.map((route) => {
                    const matchScore = getMatchScore(route);
                    const isMatch = matchScore !== null && matchScore >= 80;

                    return (
                        <Marker
                            key={route.id}
                            position={[route.coordinates!.lat, route.coordinates!.lng]}
                            icon={createIcon(isMatch, matchScore || undefined)}
                            eventHandlers={{
                                click: () => setSelectedRoute(route)
                            }}
                        >
                            <Popup>
                                <div className="p-4 min-w-[250px]">
                                    {/* Match Badge */}
                                    {isMatch && matchScore && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black rounded-full flex items-center gap-1">
                                                <Sparkles size={10} />
                                                {matchScore}% MATCH
                                            </span>
                                        </div>
                                    )}

                                    {/* Title & Tags */}
                                    <h3 className="font-bold text-stone-800 text-lg mb-2">{route.title}</h3>
                                    <div className="flex gap-2 mb-3">
                                        <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] font-bold rounded-full">{route.region}</span>
                                        <span className="px-2 py-0.5 bg-[#D97C5F]/10 text-[#D97C5F] text-[10px] font-bold rounded-full">{route.tag}</span>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-stone-400 text-xs mb-4">
                                        <MapPin size={12} />
                                        {route.tripDetails.location}
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href={`/explore/${route.slug}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2C1810] text-white text-sm font-bold rounded-xl hover:bg-black transition-colors"
                                    >
                                        查看詳情
                                        <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Map Legend */}
            {isPersonaMode && userPersona && (
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-100">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">地圖說明</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#D97C5F] rounded-full border-2 border-white shadow" />
                            <span className="text-xs text-stone-600 font-medium">契合度 80%+ (推薦)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-stone-400 rounded-full border-2 border-white shadow" />
                            <span className="text-xs text-stone-400 font-medium">其他景點</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

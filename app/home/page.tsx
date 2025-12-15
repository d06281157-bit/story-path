'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// 1. Mock Data
const destinations = [
  {
    id: 'indonesia',
    name: 'INDONESIA',
    description: 'Explore the volcanic landscapes and ancient temples of the archipelago.',
    bgImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80', // Bali/Volcano
    places: [
      { id: '1', title: 'Mount Batur', location: 'Bali', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80' },
      { id: '2', title: 'Uluwatu Temple', location: 'Bali', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80' },
      { id: '3', title: 'Raja Ampat', location: 'Papua', image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?auto=format&fit=crop&w=600&q=80' },
      { id: '3b', title: 'Komodo Island', location: 'Flores', image: 'https://images.unsplash.com/photo-1579603593888-9d413346b04f?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    id: 'taiwan',
    name: 'TAIWAN',
    description: 'Experience the unheard stories of the island, from high mountains to bustling markets.',
    bgImage: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1600&q=80', // Taiwan Mountains
    places: [
      { id: '4', title: 'Jiufen Old Street', location: 'New Taipei', image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Jiufen' },
      { id: '5', title: 'Taroko Gorge', location: 'Hualien', image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Taroko' },
      { id: '6', title: 'Sun Moon Lake', location: 'Nantou', image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Sun+Moon+Lake' },
      { id: '6b', title: 'Alishan', location: 'Chiayi', image: 'https://placehold.co/600x400/FFF9F2/D97C5F?text=Alishan' },
    ]
  },
  {
    id: 'japan',
    name: 'JAPAN',
    description: 'Immerse yourself in a blend of traditional culture and futuristic innovation.',
    bgImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80', // Mt Fuji
    places: [
      { id: '7', title: 'Mount Fuji', location: 'Shizuoka', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=600&q=80' },
      { id: '8', title: 'Kyoto Streets', location: 'Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
      { id: '9', title: 'Shibuya Crossing', location: 'Tokyo', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80' },
      { id: '9b', title: 'Osaka Castle', location: 'Osaka', image: 'https://images.unsplash.com/photo-1558231908-41883c44566c?auto=format&fit=crop&w=600&q=80' },
    ]
  }
];

export default function HomePage() {
  const [activeDestination, setActiveDestination] = useState(1); // Default to Taiwan
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Track focused card
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const currentData = destinations[activeDestination];

  // Reset card index when destination changes
  useEffect(() => {
    setActiveCardIndex(0);
  }, [activeDestination]);

  // Debounced Slide Switching (Vertical)
  const handleSlideChange = useCallback((deltaY: number) => {
    if (isScrolling.current) return;

    if (deltaY > 20) {
      if (activeDestination < destinations.length - 1) {
        isScrolling.current = true;
        setActiveDestination(prev => prev + 1);
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    } else if (deltaY < -20) {
      if (activeDestination > 0) {
        isScrolling.current = true;
        setActiveDestination(prev => prev - 1);
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    }
  }, [activeDestination]);

  // Wheel Listener
  useEffect(() => {
    const onWheel = (e: WheelEvent) => handleSlideChange(e.deltaY);
    window.addEventListener('wheel', onWheel);
    return () => window.removeEventListener('wheel', onWheel);
  }, [handleSlideChange]);

  // Touch Swipe for Vertical Slide
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    handleSlideChange(touchStartY.current - touchEndY);
  };

  // Card Navigation Logic
  const navigateCards = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveCardIndex(prev => Math.max(0, prev - 1));
    } else {
      setActiveCardIndex(prev => Math.min(currentData.places.length - 1, prev + 1));
    }
  };

  // Programmatic Scroll to Center Active Card
  useEffect(() => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current;
      const cardWidth = 320; // 320px
      const gap = 24; // 1.5rem
      const totalCardWidth = cardWidth + gap;
      
      const scrollLeft = (activeCardIndex * totalCardWidth) - (container.clientWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeCardIndex, currentData]);

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col justify-center bg-black z-40" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Background Image */}
      {destinations.map((dest, index) => (
         <div 
            key={dest.id}
            className={clsx(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out -z-20",
                index === activeDestination ? "opacity-100" : "opacity-0"
            )}
         >
            <Image
                src={dest.bgImage}
                alt={dest.name}
                fill
                className="object-cover"
                unoptimized
                priority={index === activeDestination}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
         </div>
      ))}

      {/* Navigation Dots */}
      <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center">
         <div className="w-[1px] h-36 bg-white/20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none" />
         {destinations.map((dest, index) => (
             <button
                key={dest.id}
                onClick={() => setActiveDestination(index)}
                className={clsx(
                    "relative z-10 rounded-full transition-all duration-300 flex items-center justify-center",
                    index === activeDestination 
                        ? "w-10 h-10 border border-white/80 bg-white/10 backdrop-blur-sm" 
                        : "w-2 h-2 bg-white/40 hover:bg-white hover:w-3 hover:h-3"
                )}
             >
                 {index === activeDestination && <div className="w-2 h-2 bg-white rounded-full" />}
             </button>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full relative z-30 pt-20 lg:pl-28">
        
        {/* Left Column (Text): 7/12 */}
        <div className="lg:col-span-7 space-y-8" key={currentData.id}>
          <div className="animate-slide-up">
            <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-terracotta" />
                <span className="text-terracotta tracking-[0.4em] text-sm uppercase font-bold">
                    Destination 0{activeDestination + 1}
                </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none font-sans drop-shadow-2xl">
              {currentData.name}
            </h1>
            <p className="text-gray-200 text-xl tracking-wide font-light mt-6 max-w-md drop-shadow-md border-l-2 border-white/30 pl-6">
              {currentData.description}
            </p>
          </div>

          <Link
            href={activeDestination === 1 ? "/explore" : "#"}
            className={clsx(
                "inline-flex items-center gap-3 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg group animate-fade-in",
                activeDestination === 1 ? "bg-terracotta hover:bg-[#c26a4e]" : "bg-white/10 border border-white/30 hover:bg-white/20"
            )}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="font-bold tracking-widest text-sm uppercase">Explore {currentData.name}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Column (Cards): 5/12 */}
        <div className="lg:col-span-5 w-full relative group/slider h-full flex flex-col justify-center pr-0">
            
            {/* Scroll Container */}
            <div 
                ref={cardsContainerRef}
                className="flex gap-6 overflow-x-hidden py-24 w-full items-center animate-fade-in pl-4 select-none" 
                style={{ animationDelay: '0.3s' }}
            >
                {currentData.places.map((place, index) => {
                    const isActive = index === activeCardIndex;
                    return (
                        <div 
                            key={place.id}
                            onClick={() => setActiveCardIndex(index)}
                            className={clsx(
                                "shrink-0 flex flex-col gap-4 transition-all duration-500 ease-out transform cursor-pointer",
                                isActive 
                                    ? "scale-110 opacity-100 z-10" 
                                    : "scale-90 opacity-60 hover:opacity-100 grayscale-[30%] hover:grayscale-0"
                            )}
                        >
                             {/* Text Block - Moved Above */}
                             <div className={clsx("transition-opacity duration-300 px-1", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                                <h3 className="text-white font-bold text-3xl leading-tight mb-2">{place.title}</h3>
                                <div className="flex items-center text-gray-300 text-base gap-1">
                                    <MapPin size={16} className="text-terracotta" />
                                    <span className="truncate">{place.location}</span>
                                </div>
                             </div>

                             {/* Card Image - Framed Glass Styling */}
                             <div className={clsx(
                                "w-[320px] h-[45vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl relative shadow-2xl transition-all duration-500 p-4",
                                isActive ? "ring-1 ring-white/30 bg-white/20" : ""
                             )}>
                                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                    <Image
                                        src={place.image}
                                        alt={place.title}
                                        fill
                                        className={clsx(
                                            "object-cover transition-transform duration-700",
                                            isActive ? "scale-110" : "scale-100"
                                        )}
                                        unoptimized
                                    />
                                </div>
                             </div>
                        </div>
                    );
                })}
                {/* Spacer to allow last card to center */}
                <div className="w-12 shrink-0" />
            </div>

            {/* Custom Controls */}
            <div className="absolute bottom-12 right-8 flex items-center gap-6 animate-fade-in text-white/80 z-20" style={{ animationDelay: '0.4s' }}>
                <button 
                    onClick={() => navigateCards('left')}
                    className={clsx(
                        "p-4 rounded-full border border-white/30 transition-all active:scale-95 bg-black/20 backdrop-blur-sm",
                        activeCardIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                    )}
                    disabled={activeCardIndex === 0}
                >
                    <ChevronLeft size={24} />
                </button>
                
                <div className="flex gap-2">
                    {currentData.places.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveCardIndex(idx)}
                            className={clsx(
                                "rounded-full transition-all duration-300",
                                idx === activeCardIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                            )}
                        />
                    ))}
                </div>

                <button 
                    onClick={() => navigateCards('right')}
                    className={clsx(
                        "p-4 rounded-full border border-white/30 transition-all active:scale-95 bg-black/20 backdrop-blur-sm",
                        activeCardIndex === currentData.places.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                    )}
                    disabled={activeCardIndex === currentData.places.length - 1}
                >
                    <ChevronRight size={24} />
                </button>
            </div>

        </div>
      </div>
      
    </div>
  );
}

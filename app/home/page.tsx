'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ITINERARIES } from '@/constants/itineraries';
import clsx from 'clsx';

// 1. Mock Data
const destinations = [
  {
    id: 'north',
    name: '北部',
    description: '穿梭在現代霓虹與古老街屋之間，感受大屯山系與太平洋交織的文化脈動。',
    bgImage: '/images/home/north_bg.png',
    places: [
      {
        id: 'A-North',
        title: '大稻埕歷史文化',
        location: '北部 | 迪化街區',
        image: '/images/home/cards/north_dadaocheng.png',
      },
      {
        id: 'B-North',
        title: '九份金瓜石',
        location: '北部 | 瑞芳山城',
        image: '/images/home/cards/north_jiufen.png',
      },
      {
        id: 'C-North',
        title: '金面山步道',
        location: '北部 | 內湖岩層',
        image: '/images/home/cards/north_jinmianshan.png',
      },
      {
        id: 'D-North',
        title: '北美館×當代藝術',
        location: '北部 | 圓山公園',
        image: '/images/home/cards/north_tfam.png',
      }
    ]
  },
  {
    id: 'central',
    name: '中部',
    description: '從舊城區的知識底蘊到草悟道的現代綠意，在山海之間找尋台中特有的舒緩節奏。',
    bgImage: '/images/home/central_bg.png',
    places: [
      {
        id: 'A-Central',
        title: '舊城區知識文化',
        location: '中部 | 台中車站',
        image: '/images/home/cards/central_station.png',
      },
      {
        id: 'B-Central',
        title: '鹿港小鎮巷弄',
        location: '中部 | 彰化鹿港',
        image: '/images/home/cards/central_lukang.png',
      },
      {
        id: 'C-Central',
        title: '車埕×明潭湖景',
        location: '中部 | 南投水里',
        image: '/images/home/cards/central_checheng.png',
      },
      {
        id: 'D-Central',
        title: '國美館×草悟道',
        location: '中部 | 西區綠帶',
        image: '/images/home/cards/central_greenway.png',
      }
    ]
  },
  {
    id: 'south',
    name: '南部',
    description: '踏入台灣歷史的起點。在廟宇紅牆與文創港灣中，體驗最有熱度的南國生活。',
    bgImage: '/images/home/south_bg.png',
    places: [
      {
        id: 'A-South',
        title: '府城知識故事',
        location: '南部 | 台南中西區',
        image: '/images/home/cards/south_tainan.png',
      },
      {
        id: 'B-South',
        title: '鹽埕舊街區',
        location: '南部 | 高雄鹽埕',
        image: '/images/home/cards/south_yancheng.png',
      },
      {
        id: 'C-South',
        title: '阿朗壹古道',
        location: '南部 | 屏東海岸',
        image: '/images/home/cards/south_alangyi.png',
      },
      {
        id: 'D-South',
        title: '駁二×港都藝術',
        location: '南部 | 高雄港灣',
        image: '/images/home/cards/south_pier2.png',
      }
    ]
  },
  {
    id: 'east',
    name: '東部',
    description: '聽太平洋的浪潮拍打著奇岩。在縱谷的純粹自然中，找回與心靈對話的呼吸頻率。',
    bgImage: '/images/home/east_bg.png',
    places: [
      {
        id: 'A-East',
        title: '舊城歷史軸線',
        location: '東部 | 花蓮市區',
        image: '/images/home/cards/east_hualien_city.png',
      },
      {
        id: 'B-East',
        title: '頭城老街文史',
        location: '東部 | 宜蘭頭城',
        image: '/images/itineraries/B-East-1.jpg',
      },
      {
        id: 'C-East',
        title: '小野柳海濱',
        location: '東部 | 台東海岸',
        image: '/images/itineraries/C-East-1.jpg',
      },
      {
        id: 'D-East',
        title: '文創園區巡禮',
        location: '東部 | 花蓮酒廠',
        image: '/images/itineraries/D-East-1.jpg',
      }
    ]
  }
];

export default function HomePage() {
  const router = useRouter();
  const [activeDestination, setActiveDestination] = useState(1); // Default to Taiwan
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Track focused card
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const currentData = destinations[activeDestination];

  const getSlug = (id: string) => ITINERARIES.find(it => it.id === id)?.slug;

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
            href="/explore"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg group bg-terracotta hover:bg-[#c26a4e] animate-fade-in"
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
                  onClick={() => {
                    if (isActive) {
                      const slug = getSlug(place.id);
                      if (slug) router.push(`/explore/${slug}`);
                    } else {
                      setActiveCardIndex(index);
                    }
                  }}
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
                      {isActive && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                            <ExternalLink size={24} className="text-white" />
                          </div>
                        </div>
                      )}
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

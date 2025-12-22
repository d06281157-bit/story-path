"use client";

import { ITINERARIES } from '@/constants/itineraries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, use } from 'react';
import {
    MapPin,
    Clock,
    Bus,
    Sun,
    CheckCircle2,
    ChevronRight,
    Heart,
    X,
    ArrowRight as LucideArrowRight
} from 'lucide-react';

// 定義頁面接收的參數型別
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ItineraryPage({ params }: PageProps) {
    const { slug } = use(params);
    const item = ITINERARIES.find((i) => i.slug === slug);

    const [isSaved, setIsSaved] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!item) return;
        const saved = localStorage.getItem('my-list');
        if (saved) {
            const list = JSON.parse(saved);
            setIsSaved(list.includes(item.id.toString()));
        }
    }, [item]);

    if (!item) {
        notFound();
    }

    const toggleSave = () => {
        const saved = localStorage.getItem('my-list');
        let list = saved ? JSON.parse(saved) : [];
        const itemId = item.id.toString();

        if (list.includes(itemId)) {
            list = list.filter((id: string) => id !== itemId);
            setIsSaved(false);
        } else {
            list.push(itemId);
            setIsSaved(true);
            triggerToast();
        }

        localStorage.setItem('my-list', JSON.stringify(list));
    };

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const Toast = () => (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
            <div className="bg-[#2C1810] text-[#FFF9F2] px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-[#D97C5F]/30 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-full bg-[#D97C5F]/20 flex items-center justify-center">
                    <Heart size={16} className="text-[#D97C5F] fill-current" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-wide">已成功收藏至我的收藏清單！</span>
                    <Link href="/my-list" className="text-[10px] text-[#D97C5F] font-bold underline underline-offset-2 hover:text-[#D97C5F]/80 transition-colors">
                        點此查看收藏
                    </Link>
                </div>
                <button onClick={() => setShowToast(false)} className="ml-2 text-stone-500 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fffdf9] font-[family-name:var(--font-geist-sans)]">
            {showToast && <Toast />}

            {/* === 1. Hero Section === */}
            <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
                {item.images[0] ? (
                    <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover scale-105 animate-slow-zoom"
                        priority
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full bg-stone-200" />
                )}

                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fffdf9] via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between py-12 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
                    <nav className="flex items-center gap-3 text-white/90 text-sm font-medium tracking-wide">
                        <Link href="/home" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <span className="text-white font-bold">{item.tag}</span>
                    </nav>

                    <div className="max-w-4xl pb-12 animate-slide-up">
                        <span className="inline-block bg-orange-600/90 backdrop-blur-md text-white text-[10px] md:text-xs px-4 py-1.5 rounded-full font-bold tracking-[0.2em] uppercase mb-6 shadow-xl border border-white/20">
                            {item.tag}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl font-serif">
                            {item.title}
                        </h1>
                        <div className="flex items-center gap-2 text-white/90 text-lg md:text-xl font-medium italic opacity-80">
                            <MapPin size={20} className="text-orange-400" />
                            {item.tripDetails.location}
                        </div>
                    </div>
                </div>
            </div>

            {/* === 2. Content Section === */}
            <div className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-stone-100">
                            <h2 className="text-2xl font-bold mb-8 text-stone-800 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-orange-500 rounded-full" />
                                故事梗概
                            </h2>
                            <p className="text-stone-600 leading-[1.8] text-xl whitespace-pre-wrap font-serif">
                                {item.description}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-stone-900 font-serif">路線亮點</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {item.highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-start gap-4 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-stone-800 text-lg mb-1">{highlight}</h4>
                                            <p className="text-stone-500 text-sm">精心挑選的深度體驗點</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-stone-900 font-serif">路線剪影</h2>
                                <span className="text-stone-400 text-sm font-medium">Journey in Photos</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {item.images.slice(1).map((img, index) => (
                                    <div key={index} className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-lg">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${index + 2}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 bg-[#2C1810] text-[#FFF9F2] p-10 rounded-[3rem] shadow-2xl space-y-10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-2 font-serif">行程資訊</h3>
                                <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.2em]">Travel Specifications</p>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                        <Clock size={20} className="text-orange-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">建議時程</p>
                                        <p className="font-bold text-lg">{item.tripDetails.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                        <MapPin size={20} className="text-orange-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">具體地點</p>
                                        <p className="font-bold text-lg">{item.tripDetails.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                        <Bus size={20} className="text-orange-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">交通方式</p>
                                        <p className="font-bold text-lg">{item.tripDetails.transport}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                        <Sun size={20} className="text-orange-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">最佳季節</p>
                                        <p className="font-bold text-lg">{item.tripDetails.season}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 relative z-10">
                                <button
                                    onClick={toggleSave}
                                    className={`w-full font-bold py-5 px-8 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group ${isSaved
                                            ? 'bg-white text-orange-500 border border-orange-100 hover:bg-orange-50'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                                        }`}
                                >
                                    {isSaved ? (
                                        <>
                                            <Heart size={18} className="fill-current" />
                                            已加入我的清單
                                        </>
                                    ) : (
                                        <>
                                            加入我的清單
                                            <LucideArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-stone-500 text-xs mt-4">已加入 1,240 個旅人的計畫中</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
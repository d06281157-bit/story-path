import { ITINERARIES } from '@/constants/itineraries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Bus, Sun, CheckCircle2, ChevronRight } from 'lucide-react';

// 定義頁面接收的參數型別
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ItineraryPage({ params }: PageProps) {
    const { slug } = await params;
    const item = ITINERARIES.find((i) => i.slug === slug);

    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#fffdf9] font-[family-name:var(--font-geist-sans)]">
            {/* === 1. Hero Section (首頁大圖效果) === */}
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

                {/* 漸層遮罩 */}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fffdf9] via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* 文字內容容器 */}
                <div className="absolute inset-0 flex flex-col justify-between py-12 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
                    {/* 麵包屑導航 */}
                    <nav className="flex items-center gap-3 text-white/90 text-sm font-medium tracking-wide">
                        <Link href="/home" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <span className="text-white font-bold">{item.tag}</span>
                    </nav>

                    {/* 標題區 */}
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

                    {/* 左側：故事與細節 (佔 8 格) */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* 導言 */}
                        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-stone-100">
                            <h2 className="text-2xl font-bold mb-8 text-stone-800 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-orange-500 rounded-full" />
                                故事梗概
                            </h2>
                            <p className="text-stone-600 leading-[1.8] text-xl whitespace-pre-wrap font-serif">
                                {item.description}
                            </p>
                        </div>

                        {/* 路線亮點 (Highlights) */}
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

                        {/* 更多圖片 (Gallery) */}
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
                                {item.images.length === 1 && (
                                    <div className="col-span-full py-20 text-center bg-stone-50 rounded-[2rem] border-2 border-dashed border-stone-200">
                                        <p className="text-stone-400 font-medium">更多精彩畫面正在整理中...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 右側：規劃資訊卡 (佔 4 格) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 bg-[#2C1810] text-[#FFF9F2] p-10 rounded-[3rem] shadow-2xl space-y-10 overflow-hidden">
                            {/* 裝飾背景 */}
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
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group">
                                    加入我的清單
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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

// 輔助圖示
function ArrowRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
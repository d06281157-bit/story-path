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
    ArrowRight as LucideArrowRight,
    Sparkles,
    Vote,
    PlusCircle
} from 'lucide-react';
import { Dimension, resultProfiles } from '@/lib/quizData';

// 定義頁面接收的參數型別
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ItineraryPage({ params }: PageProps) {
    const { slug } = use(params);
    const item = ITINERARIES.find((i) => i.slug === slug);

    const [isSaved, setIsSaved] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [userPersona, setUserPersona] = useState<Dimension | null>(null);
    const [isAddedToPlan, setIsAddedToPlan] = useState(false);
    const [showPlanToast, setShowPlanToast] = useState(false);
    const [planDay, setPlanDay] = useState(1);
    const [voteCount, setVoteCount] = useState(0);
    const [isVoted, setIsVoted] = useState(false);

    useEffect(() => {
        if (!item) return;

        // Load favorites
        const saved = localStorage.getItem('my-list');
        if (saved) {
            const list = JSON.parse(saved);
            setIsSaved(list.includes(item.id.toString()));
        }

        // Load persona
        const persona = localStorage.getItem('wanderly-persona') as Dimension;
        if (persona) {
            setUserPersona(persona);
        }

        // Load plan items
        const planItems = localStorage.getItem('wanderly-plan');
        if (planItems) {
            const plan = JSON.parse(planItems);
            const isInPlan = plan.items?.some((p: any) => p.id === item.id);
            setIsAddedToPlan(isInPlan);
            // Determine which day they're on
            setPlanDay(plan.currentDay || 1);
        }

        // Load vote status and simulate vote count
        const votes = localStorage.getItem('wanderly-votes');
        if (votes) {
            const voteList = JSON.parse(votes);
            setIsVoted(voteList.includes(item.id));
        }
        // Simulate vote count based on item id hash
        const simulatedVotes = Math.floor((item.id.charCodeAt(0) * 7 + item.id.length * 13) % 50) + 5;
        setVoteCount(simulatedVotes);
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

    const addToPlan = () => {
        const planItems = localStorage.getItem('wanderly-plan');
        let plan = planItems ? JSON.parse(planItems) : { items: [], currentDay: 1 };

        // Check if already in plan
        const isInPlan = plan.items?.some((p: any) => p.id === item.id);
        if (isInPlan) {
            // Remove from plan
            plan.items = plan.items.filter((p: any) => p.id !== item.id);
            setIsAddedToPlan(false);
        } else {
            // Add to plan
            plan.items.push({
                id: item.id,
                slug: item.slug,
                title: item.title,
                day: plan.currentDay || 1,
                addedAt: new Date().toISOString()
            });
            setIsAddedToPlan(true);
            setShowPlanToast(true);
            setTimeout(() => setShowPlanToast(false), 3000);
        }

        localStorage.setItem('wanderly-plan', JSON.stringify(plan));
    };

    const addToVote = () => {
        const votes = localStorage.getItem('wanderly-votes');
        let voteList = votes ? JSON.parse(votes) : [];

        if (voteList.includes(item.id)) {
            // Remove vote
            voteList = voteList.filter((id: string) => id !== item.id);
            setIsVoted(false);
            setVoteCount(prev => prev - 1);
        } else {
            // Add vote
            voteList.push(item.id);
            setIsVoted(true);
            setVoteCount(prev => prev + 1);
        }

        localStorage.setItem('wanderly-votes', JSON.stringify(voteList));
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

    const PlanToast = () => (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
            <div className="bg-emerald-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-emerald-500/30 backdrop-blur-xl">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <PlusCircle size={16} className="text-emerald-400" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-wide">已加入第 {planDay} 天行程！</span>
                    <Link href="/plan" className="text-[10px] text-emerald-400 font-bold underline underline-offset-2 hover:text-emerald-300 transition-colors">
                        前往行程規劃
                    </Link>
                </div>
                <button onClick={() => setShowPlanToast(false)} className="ml-2 text-emerald-500 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
            {showToast && <Toast />}
            {showPlanToast && <PlanToast />}

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
                        {/* AI Recommendation Reason */}
                        {userPersona && item.personaReasons?.[userPersona] && (
                            <div className="bg-[#D97C5F]/5 border border-[#D97C5F]/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97C5F]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#D97C5F]/20 transition-all duration-700" />
                                <div className="flex-shrink-0 w-16 h-16 bg-[#D97C5F] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#D97C5F]/30">
                                    <Sparkles size={32} />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97C5F] bg-[#D97C5F]/10 px-3 py-1 rounded-full">AI 專屬推薦理由</span>
                                        <span className="text-stone-400 text-xs font-bold">Matched for {resultProfiles[userPersona].title}</span>
                                    </div>
                                    <p className="text-[#2C1810] text-xl font-bold leading-relaxed font-serif">
                                        「{item.personaReasons[userPersona]}」
                                    </p>
                                </div>
                            </div>
                        )}

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

                        {/* Persona Reviews */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-stone-900 font-serif">同頻評論</h2>
                                <span className="text-stone-400 text-sm font-medium">Persona Reviews</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {item.personaReviews?.map((review, index) => (
                                    <div key={index} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img src={review.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${review.author}`} alt={review.author} className="w-10 h-10 rounded-full bg-stone-100" />
                                            <div>
                                                <p className="font-bold text-stone-800 text-sm">{review.author}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${userPersona && review.persona === userPersona ? 'bg-[#D97C5F] text-white' : 'bg-stone-100 text-stone-500'}`}>
                                                        {userPersona && review.persona === userPersona ? `跟你一樣是：${resultProfiles[review.persona].title}` : resultProfiles[review.persona].title}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-stone-600 text-sm leading-relaxed">
                                            {review.content}
                                        </p>
                                    </div>
                                ))}
                                {(!item.personaReviews || item.personaReviews.length === 0) && (
                                    <p className="text-stone-400 text-sm italic">尚無同頻旅人的評論。</p>
                                )}
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

                            <div className="pt-6 relative z-10 space-y-4">
                                <button
                                    onClick={toggleSave}
                                    className={`w-full font-bold py-4 px-8 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group ${isSaved
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
                                            <Heart size={18} />
                                            收藏至清單
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={addToPlan}
                                    className={`w-full font-bold py-4 px-8 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-3 ${isAddedToPlan
                                        ? 'bg-emerald-500 text-white border border-emerald-400 hover:bg-emerald-600'
                                        : 'bg-white text-stone-800 border border-stone-200 hover:border-[#D97C5F] hover:text-[#D97C5F]'
                                        }`}
                                >
                                    <PlusCircle size={18} />
                                    {isAddedToPlan ? `已加入第 ${planDay} 天` : '加入行程'}
                                </button>

                                <button
                                    onClick={addToVote}
                                    className={`w-full font-bold py-4 px-8 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-3 ${isVoted
                                        ? 'bg-violet-500 text-white hover:bg-violet-600'
                                        : 'bg-stone-800 text-white hover:bg-black'
                                        }`}
                                >
                                    <Vote size={18} className={isVoted ? 'fill-current' : ''} />
                                    {isVoted ? '已投票' : '加入投票'}
                                    <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs font-black">
                                        {voteCount}
                                    </span>
                                </button>

                                <p className="text-center text-stone-500 text-xs mt-4">
                                    目前有 <span className="font-bold text-[#D97C5F]">{voteCount}</span> 位朋友對此景點感興趣
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quiz CTA Section - Light & Airy */}
            <div className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <div className="space-y-2">
                        <p className="text-[#D97C5F] font-black tracking-[0.2em] text-[10px] uppercase">Haven't decided yet?</p>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2C1810] font-serif">
                            還沒找到你的旅行方式？
                        </h2>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-12 py-4 border border-[#D97C5F]/30 rounded-full text-[#D97C5F] font-bold hover:bg-[#D97C5F] hover:text-white transition-all shadow-sm group"
                    >
                        開始旅人格測驗
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
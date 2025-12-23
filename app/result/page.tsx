'use client';

import { Suspense, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { resultProfiles, Dimension, dimensions } from '@/lib/quizData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { RotateCcw, Share2, ArrowRight, Home } from 'lucide-react';

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const scores = useMemo(() => {
        const s: Record<Dimension, number> = {
            OldStreet: 0,
            Nature: 0,
            Culture: 0,
            Lifestyle: 0,
        };

        // Parse scores from URL
        dimensions && Object.keys(dimensions).forEach((key) => {
            const k = key as Dimension;
            const val = searchParams.get(k);
            if (val) s[k] = parseInt(val, 10);
        });
        return s;
    }, [searchParams]);

    // Determine result
    // Find key with max value. If tie, prioritize order: OldStreet > Nature > Culture > Lifestyle (arbitrary tie-break)
    const resultDimension = (Object.keys(scores) as Dimension[]).reduce((a, b) => scores[a] >= scores[b] ? a : b);

    // Save result to localStorage for other pages (like Journal)
    useEffect(() => {
        if (resultDimension) {
            localStorage.setItem('wanderly-persona', resultDimension);
        }
    }, [resultDimension]);

    const result = resultProfiles[resultDimension];

    // Chart Data
    const data = [
        { subject: dimensions.OldStreet, A: scores.OldStreet, fullMark: 4 },
        { subject: dimensions.Nature, A: scores.Nature, fullMark: 4 },
        { subject: dimensions.Culture, A: scores.Culture, fullMark: 4 },
        { subject: dimensions.Lifestyle, A: scores.Lifestyle, fullMark: 4 },
    ];

    // Helper to map recommendation titles to explore categories
    const getCategory = (title: string) => {
        if (title.includes('季節')) return '季節主題';
        if (title.includes('老街')) return '老街';
        if (title.includes('自然')) return '自然';
        if (title.includes('展覽')) return '展覽';
        if (title.includes('市場')) return '生活';
        if (title.includes('文化')) return '城市文化';
        return '全部';
    };

    // Image mapping
    const personaImages: Record<Dimension, string> = {
        OldStreet: '/B_Alley_Stories.png',
        Nature: '/C_Nature_Observation.png',
        Culture: '/A_Cultural_Knowledge.png',
        Lifestyle: '/E_Local_Life.png',
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#FFF9F2] animate-fade-in overflow-y-auto w-full max-w-4xl mx-auto">
            <div className="p-6 md:p-10 space-y-8">

                {/* Top Section: Image & Analysis */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    {/* Left: Persona Image */}
                    <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm flex items-center justify-center min-h-[400px]">
                        <img
                            src={personaImages[resultDimension]}
                            alt={result.title}
                            className="w-full h-full object-cover animate-scale-in"
                        />
                    </div>

                    {/* Right: Titles, Radar Chart & Description */}
                    <div className="flex-1 flex flex-col justify-start space-y-8">
                        {/* Result Title & Tags */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase">The Analysis Result</p>
                                <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] tracking-tight">{result.title}</h1>
                                <p className="text-[10px] text-terracotta/60 font-medium uppercase tracking-[0.3em]">THE {resultDimension.toUpperCase()} TRAVELER</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {result.tags.map((tag, idx) => (
                                    <span
                                        key={tag}
                                        className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition-all ${idx === 0
                                            ? 'bg-terracotta text-white shadow-sm'
                                            : 'bg-white border border-gray-100 text-gray-500 hover:border-terracotta/30'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Radar Chart Area */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm relative h-[280px]">
                            <div className="absolute top-4 left-6 text-[10px] font-bold text-gray-400 tracking-widest uppercase">你的旅行基因</div>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                    <PolarGrid stroke="#f1f1f1" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} />
                                    <Radar
                                        name="My Persona"
                                        dataKey="A"
                                        stroke="#D97C5F"
                                        strokeWidth={2}
                                        fill="#D97C5F"
                                        fillOpacity={0.5}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Description */}
                        <div className="bg-white/60 p-7 rounded-[2rem] backdrop-blur-sm border border-white/40 shadow-sm transition-all hover:bg-white/80">
                            <p className="text-gray-700 leading-[1.8] text-base text-justify whitespace-pre-line">
                                {result.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Recommendations */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => {
                            const category = getCategory(result.match);
                            router.push(`/explore?category=${category}`);
                        }}
                        className="w-full flex items-center bg-white p-6 rounded-2xl shadow-sm border-l-4 border-terracotta group hover:translate-x-1 transition-transform text-left cursor-pointer"
                    >
                        <div className="flex-1">
                            <div className="text-[10px] text-terracotta font-bold uppercase tracking-widest mb-1 border border-terracotta/30 inline-block px-2 py-0.5 rounded-sm">Best Match</div>
                            <h3 className="font-bold text-gray-800 text-xl group-hover:text-terracotta transition-colors">{result.match}</h3>
                        </div>
                        <ArrowRight size={20} className="text-gray-300 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                        onClick={() => {
                            const category = getCategory(result.recommend);
                            router.push(`/explore?category=${category}`);
                        }}
                        className="w-full flex items-center bg-white p-6 rounded-2xl shadow-sm border-l-4 border-terracotta/40 group hover:translate-x-1 transition-transform text-left cursor-pointer"
                    >
                        <div className="flex-1">
                            <div className="text-[10px] text-terracotta/60 font-bold uppercase tracking-widest mb-1 border border-terracotta/20 inline-block px-2 py-0.5 rounded-sm">Recommended</div>
                            <h3 className="font-bold text-gray-800 text-xl group-hover:text-terracotta transition-colors">{result.recommend}</h3>
                        </div>
                        <ArrowRight size={20} className="text-gray-300 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                    </button>
                </div>

                {/* Actions */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 bg-terracotta text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-terracotta/20 hover:bg-[#c26a4e] hover:scale-[1.02] transform transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            <RotateCcw size={20} />
                            重新測驗 RESTART
                        </button>
                        <button
                            onClick={() => router.push('/home')}
                            className="flex-1 bg-white text-stone-500 font-bold py-4 px-8 rounded-full border border-stone-200 hover:border-terracotta/30 hover:text-terracotta transition-all flex items-center justify-center gap-3 text-lg shadow-sm"
                        >
                            <Home size={20} />
                            回到首頁 HOME
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 tracking-[0.2em] font-medium">STORY PATH · TRAVEL PERSONA QUIZ © 2024</p>
                </div>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen text-terracotta">Loading...</div>}>
            <ResultContent />
        </Suspense>
    )
}

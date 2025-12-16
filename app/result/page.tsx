'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { resultProfiles, Dimension, dimensions } from '@/lib/quizData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { RotateCcw, Share2 } from 'lucide-react';

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
    const result = resultProfiles[resultDimension];

    // Chart Data
    const data = [
        { subject: dimensions.OldStreet, A: scores.OldStreet, fullMark: 4 },
        { subject: dimensions.Nature, A: scores.Nature, fullMark: 4 },
        { subject: dimensions.Culture, A: scores.Culture, fullMark: 4 },
        { subject: dimensions.Lifestyle, A: scores.Lifestyle, fullMark: 4 },
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#FFF9F2] animate-fade-in overflow-y-auto w-full max-w-2xl mx-auto">
            <div className="p-8 space-y-6">

                {/* Chart Area */}
                <div className="bg-white rounded-3xl p-4 shadow-sm relative h-[300px] flex flex-col items-center justify-center">
                    <div className="absolute top-4 left-4 text-xs text-gray-400">你的旅行基因</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Radar
                                name="My Persona"
                                dataKey="A"
                                stroke="#D97C5F"
                                strokeWidth={2}
                                fill="#D97C5F"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Result Title */}
                <div className="text-center space-y-2">
                    <p className="text-terracotta text-sm font-bold tracking-widest uppercase">The Analysis Result</p>
                    <h1 className="text-4xl font-bold text-[#2C2C2C]">{result.title}</h1>
                    <p className="text-xs text-terracotta/60 uppercase tracking-widest">THE {resultDimension.toUpperCase()} TRAVELER</p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {result.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-500">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white/60 p-6 rounded-2xl text-center">
                    <p className="text-gray-700 leading-relaxed text-sm text-justify">
                        {result.description}
                    </p>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                    <div className="flex items-start bg-white p-4 rounded-2xl shadow-sm border-l-4 border-terracotta">
                        <div className="flex-1">
                            <div className="text-[10px] text-terracotta font-bold uppercase tracking-widest mb-1 border border-terracotta inline-block px-1 rounded-sm">Best Match</div>
                            <h3 className="font-bold text-gray-800">{result.match}</h3>
                        </div>
                    </div>

                    <div className="flex items-start bg-white/50 p-4 rounded-2xl border border-white">
                        <div className="flex-1">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 border border-gray-300 inline-block px-1 rounded-sm">Recommended</div>
                            <h3 className="font-bold text-gray-600">{result.recommend}</h3>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="flex-1 bg-terracotta text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-[#c26a4e] transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} />
                        重新測驗 RESTART
                    </button>
                </div>
                <p className="text-center text-[10px] text-gray-400">Travel Persona Quiz © 2024</p>
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

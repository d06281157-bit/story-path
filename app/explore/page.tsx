"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

// --- 1. Route Data (Same as Plan, but strictly static here) ---
const routes = [
    // A. 城市文化線
    { id: 'A-North', name: '大稻埕歷史文化', city: '台北', region: '北部', categoryGroup: '城市文化', description: '迪化街 → 霞海城隍廟 → 建築立面導覽 → 台北舊城門', imageCount: 4 },
    { id: 'A-Central', name: '舊城區知識文化', city: '台中', region: '中部', categoryGroup: '城市文化', description: '台中火車站舊站 → 宮原眼科 → 臺中州廳 → 綠空廊道', imageCount: 4 },
    { id: 'A-South', name: '府城知識故事', city: '台南', region: '南部', categoryGroup: '城市文化', description: '孔廟 → 台灣文學館 → 美術館二館 → 司法博物館', imageCount: 4 },
    { id: 'A-East', name: '舊城歷史軸線', city: '花蓮', region: '東部', categoryGroup: '城市文化', description: '松園別館 → 將軍府 → 舊鐵道文化商圈 → 花蓮港景點', imageCount: 4 },

    // B. 老街散策線
    { id: 'B-North', name: '九份 × 金瓜石礦業', city: '新北', region: '北部', categoryGroup: '老街散策', description: '九份老街巷弄 → 黃金博物園區 → 昇平戲院 → 祈堂老街', imageCount: 4 },
    { id: 'B-Central', name: '鹿港小鎮巷弄', city: '彰化', region: '中部', categoryGroup: '老街散策', description: '鹿港老街 → 摸乳巷 → 龍山寺 → 傳統工藝師傅工作室', imageCount: 4 },
    { id: 'B-South', name: '鹽埕舊街區', city: '高雄', region: '南部', categoryGroup: '老街散策', description: '新樂街老冰店 → 堀江商場 → 大溝頂老街 → 舊街區建築', imageCount: 4 },
    { id: 'B-East', name: '頭城老街文史', city: '宜蘭', region: '東部', categoryGroup: '老街散策', description: '頭城老街 → 慶元宮 → 盧纘祥故居 → 小涼園冰店', imageCount: 4 },

    // C. 戶外自然線
    { id: 'C-North', name: '金面山步道', city: '台北', region: '北部', categoryGroup: '戶外自然', description: '剪刀石 → 大崙頭尾山步道 → 城市山景', imageCount: 4 },
    { id: 'C-Central', name: '車埕 × 明潭湖景', city: '南投', region: '中部', categoryGroup: '戶外自然', description: '明潭發電廠水庫 → 車埕環湖步道 → 車埕木業生態館', imageCount: 4 },
    { id: 'C-South', name: '阿朗壹古道', city: '屏東', region: '南部', categoryGroup: '戶外自然', description: '旭海安檢所 → 南田石海岸 → 觀音鼻山海步道', imageCount: 4 },
    { id: 'C-East', name: '小野柳海濱步道', city: '台東', region: '東部', categoryGroup: '戶外自然', description: '小野柳地質景觀 → 加路蘭海岸 → 海邊森林散步', imageCount: 4 },

    // D. 展覽文化線
    { id: 'D-North', name: '北美館 × 當代藝術', city: '台北', region: '北部', categoryGroup: '展覽文化', description: '北美館 → 圓山公園 → 文創館 → 輕食咖啡', imageCount: 4 },
    { id: 'D-Central', name: '國美館 × 草悟道', city: '台中', region: '中部', categoryGroup: '展覽文化', description: '國美館 → 綠園道 → 文創小店', imageCount: 4 },
    { id: 'D-South', name: '駁二 × 港都藝術', city: '高雄', region: '南部', categoryGroup: '展覽文化', description: '大勇倉庫群 → 海景步道 → 展覽空間', imageCount: 4 },
    { id: 'D-East', name: '文創園區 × 舊酒廠', city: '花蓮', region: '東部', categoryGroup: '展覽文化', description: '老倉庫 → 自然系展覽 → 老屋咖啡', imageCount: 4 },

    // E. 市場生活線
    { id: 'E-North', name: '北門 × 城中市場', city: '台北', region: '北部', categoryGroup: '市場生活', description: '城中市場 → 師大甜不辣 → 老街食物地圖', imageCount: 4 },
    { id: 'E-Central', name: '第二市場生活', city: '台中', region: '中部', categoryGroup: '市場生活', description: '麻薏湯 → 肉包 → 乾麵 → 市場生活文化', imageCount: 4 },
    { id: 'E-South', name: '永樂市場 × 國華街', city: '台南', region: '南部', categoryGroup: '市場生活', description: '布市 → 小吃 → 老舖甜點 → 步行路線', imageCount: 4 },
    { id: 'E-East', name: '東大門夜市文化', city: '花蓮', region: '東部', categoryGroup: '市場生活', description: '原住民料理 → 軍事老舊建物 → 海景散步', imageCount: 4 },

    // F. 季節主題線
    { id: 'F-North', name: '平溪天燈古道', city: '新北', region: '北部', categoryGroup: '季節主題', description: '平溪：天燈文化＋古道小旅行', imageCount: 4 },
    { id: 'F-Central', name: '新社花海秋季旅', city: '台中', region: '中部', categoryGroup: '季節主題', description: '台中：新社花海（秋季文化旅）', imageCount: 4 },
    { id: 'F-South', name: '駁二跨年燈光季', city: '高雄', region: '南部', categoryGroup: '季節主題', description: '高雄：駁二跨年燈光季', imageCount: 4 },
    { id: 'F-East', name: '熱氣球嘉年華', city: '台東', region: '東部', categoryGroup: '季節主題', description: '台東：熱氣球嘉年華（夏季）', imageCount: 4 },
];

const CATEGORIES = ['全部', '城市文化', '老街散策', '戶外自然', '展覽文化', '市場生活', '季節主題'];

export default function ExplorePage() {
    const [selectedCategory, setSelectedCategory] = useState('全部');

    // Filter matching
    const filteredRoutes = selectedCategory === '全部'
        ? routes
        : routes.filter(r => r.categoryGroup === selectedCategory);

    return (
        <div className="min-h-screen bg-[#FFF9F2] text-[#2C1810] font-sans">

            {/* Hero Section */}
            <div className="relative py-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#D97C5F]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-[#2C1810]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                    <span className="text-[#D97C5F] font-bold tracking-[0.2em] text-sm uppercase">Curated Iterinaries</span>
                    <h1 className="text-4xl md:text-6xl font-black font-serif tracking-tight text-[#2C1810] leading-tight">
                        探索台灣靈魂
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        我們精選了 24 條最具代表性的深度路線，從北到南，從老街到山海，帶您走進台灣最真實的故事場景。
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="sticky top-0 z-30 bg-[#FFF9F2]/80 backdrop-blur-md border-b border-[#D97C5F]/10 mb-12">
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
                    <div className="flex items-center gap-2 md:justify-center py-4 min-w-max">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-[#2C1810] text-[#FFF9F2] shadow-lg scale-105'
                                        : 'bg-white text-gray-500 hover:bg-[#D97C5F]/10 hover:text-[#D97C5F]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRoutes.map((route) => (
                        <Link
                            href={`/explore/${route.id}`}
                            key={route.id}
                            className="group block relative"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm shadow-stone-200 group-hover:shadow-xl transition-all duration-500 bg-gray-200">
                                <Image
                                    src={`/images/itineraries/${route.id}-1.jpg`}
                                    alt={route.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                                {/* Floating Tag */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full tracking-wider uppercase">
                                        {route.region}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-[#D97C5F] text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {route.categoryGroup}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white font-serif mb-2 leading-snug">
                                        {route.name}
                                    </h3>
                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <p className="text-white/80 text-sm line-clamp-1 flex-1 pr-4">
                                            {route.description}
                                        </p>
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredRoutes.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p>此分類尚無行程。</p>
                    </div>
                )}
            </div>
        </div>
    );
}

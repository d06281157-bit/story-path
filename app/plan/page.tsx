"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    MapPin,
    Users,
    Sparkles,
    User,
    Heart,
    Smile,
    Search,
    RefreshCw,
    ArrowRight,
    DollarSign,
    Utensils,
    Calendar,
    Wallet,
    AlertCircle,
    X,
} from 'lucide-react';

// --- 1. Enriched Mock Database (Score-Based Ready) ---
interface PlaceData {
    id: number;
    name: string;
    city: string;
    district: string;
    region: string;
    category: string;
    tags: string[]; // For Weighted Scoring
    type: 'spot' | 'food';
    price: 1 | 2 | 3;
    bestTime: 'day' | 'night' | 'any';
    image: string;
    description: string;
}

const placesPool: PlaceData[] = [
    // --- 台北 (Taipei) ---
    // Xinyi
    { id: 101, name: '台北 101 觀景台', city: '台北', district: '信義區', region: '北部', category: '購物', tags: ['購物', '地標', '攝影'], type: 'spot', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/taipei,101', description: '台灣地標，俯瞰城市天際線。' },
    { id: 102, name: '象山親山步道', city: '台北', district: '信義區', region: '北部', category: '自然', tags: ['自然', '攝影', '冒險'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/taipei,hike', description: '眺望 101 最佳視角。' },
    { id: 103, name: '鼎泰豐 101店', city: '台北', district: '信義區', region: '北部', category: '美食', tags: ['美食', '文化'], type: 'food', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/dumpling,food', description: '世界知名的米其林小籠包。' },
    { id: 104, name: '信義區百貨商圈', city: '台北', district: '信義區', region: '北部', category: '購物', tags: ['購物', '時尚'], type: 'spot', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/shopping,mall', description: '與時尚接軌的購物天堂。' },
    { id: 105, name: 'Smith & Hsu', city: '台北', district: '信義區', region: '北部', category: '美食', tags: ['美食', '下午茶', '放鬆'], type: 'food', price: 2, bestTime: 'day', image: 'https://loremflickr.com/800/600/scone,tea', description: '著名的司康與下午茶饗宴。' },

    // Old Taipei
    { id: 120, name: '大稻埕碼頭', city: '台北', district: '大同區', region: '北部', category: '文化', tags: ['文化', '攝影', '放鬆'], type: 'spot', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/dadaocheng,river', description: '欣賞河岸夕陽與復古街區。' },
    { id: 121, name: '迪化街老街', city: '台北', district: '大同區', region: '北部', category: '文化', tags: ['文化', '歷史', '購物'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/oldstreet,taipei', description: '保留完整的巴洛克式建築與南北貨。' },
    { id: 122, name: '寧夏夜市', city: '台北', district: '大同區', region: '北部', category: '美食', tags: ['美食', '夜市'], type: 'food', price: 1, bestTime: 'night', image: 'https://loremflickr.com/800/600/ningxia,night', description: '台北夜市美食密度最高的地方。' },

    // Shilin/Beitou
    { id: 130, name: '國立故宮博物院', city: '台北', district: '士林區', region: '北部', category: '歷史', tags: ['歷史', '文化'], type: 'spot', price: 2, bestTime: 'day', image: 'https://loremflickr.com/800/600/museum,chinese', description: '中華文化瑰寶，必看翠玉白菜。' },
    { id: 131, name: '士林夜市', city: '台北', district: '士林區', region: '北部', category: '美食', tags: ['美食', '夜市', '購物'], type: 'food', price: 1, bestTime: 'night', image: 'https://loremflickr.com/800/600/shilin,food', description: '觀光客必訪，超大雞排與生炒花枝。' },
    { id: 132, name: '北投溫泉博物館', city: '台北', district: '北投區', region: '北部', category: '放鬆', tags: ['放鬆', '歷史', '文化'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/beitou,hotspring', description: '日式溫泉浴場古蹟。' },
    { id: 134, name: '三二行館', city: '台北', district: '北投區', region: '北部', category: '放鬆', tags: ['放鬆', '奢華', '溫泉'], type: 'spot', price: 3, bestTime: 'any', image: 'https://loremflickr.com/800/600/villa,luxury', description: '極致隱密的奢華溫泉體驗。' },

    // --- 台南 (Tainan) ---
    { id: 301, name: '赤崁樓', city: '台南', district: '中西區', region: '南部', category: '歷史', tags: ['歷史', '文化'], type: 'spot', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/chikan,tower', description: '荷治時期古蹟，台南地標。' },
    { id: 302, name: '林百貨', city: '台南', district: '中西區', region: '南部', category: '購物', tags: ['購物', '歷史', '文創'], type: 'spot', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/department,vintage', description: '全台最古老的百貨公司之一。' },
    { id: 303, name: '台南美術館二館', city: '台南', district: '中西區', region: '南部', category: '文化', tags: ['文化', '攝影', '藝術'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/tainan,art', description: '純白幾何建築，光影絕美。' },
    { id: 304, name: '阿霞飯店', city: '台南', district: '中西區', region: '南部', category: '美食', tags: ['美食', '聚餐', '經典'], type: 'food', price: 3, bestTime: 'any', image: 'https://loremflickr.com/800/600/crab,feast', description: '國宴級的經典台菜紅蟳米糕。' },
    { id: 306, name: '國華街小吃', city: '台南', district: '中西區', region: '南部', category: '美食', tags: ['美食', '小吃'], type: 'food', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/streetfood,tainan', description: '美食一級戰區，富盛號、金得春捲。' },
    { id: 310, name: '安平古堡', city: '台南', district: '安平區', region: '南部', category: '歷史', tags: ['歷史', '文化'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/fort,anping', description: '台灣最古老的城堡。' },
    { id: 311, name: '安平樹屋', city: '台南', district: '安平區', region: '南部', category: '自然', tags: ['自然', '攝影'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/banyan,ruin', description: '樹以牆為幹，屋以葉為瓦。' },
    { id: 312, name: '周氏蝦捲', city: '台南', district: '安平區', region: '南部', category: '美食', tags: ['美食', '小吃'], type: 'food', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/shrimp,roll', description: '安平必吃酥脆炸蝦捲。' },
    { id: 313, name: '同記安平豆花', city: '台南', district: '安平區', region: '南部', category: '美食', tags: ['美食', '甜點'], type: 'food', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/tofu,dessert', description: '綿密滑順的傳統豆花。' },
    { id: 320, name: '奇美博物館', city: '台南', district: '仁德區', region: '南部', category: '文化', tags: ['文化', '藝術', '攝影'], type: 'spot', price: 2, bestTime: 'day', image: 'https://loremflickr.com/800/600/museum,white', description: '歐式宮殿與豐富館藏。' },
    { id: 322, name: '花園夜市', city: '台南', district: '北區', region: '南部', category: '美食', tags: ['美食', '夜市'], type: 'food', price: 1, bestTime: 'night', image: 'https://loremflickr.com/800/600/nightmarket,banner', description: '南部最大夜市，美食聚集。' },

    // --- 高雄 (Kaohsiung) [Enriched as Requested] ---
    // Shopping / Malls
    { id: 420, name: '夢時代購物中心', city: '高雄', district: '前鎮區', region: '南部', category: '購物', tags: ['購物', '美食', '親子'], type: 'spot', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/mall,dreammall', description: '結合購物、美食與摩天輪的大型廣場。' },
    { id: 421, name: '漢神巨蛋', city: '高雄', district: '左營區', region: '南部', category: '購物', tags: ['購物', '美食', '時尚'], type: 'spot', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/mall,shopping', description: '北高雄最熱鬧的時尚地標。' },
    { id: 422, name: '新堀江商圈', city: '高雄', district: '新興區', region: '南部', category: '購物', tags: ['購物', '美食', '潮流'], type: 'spot', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/street,fashion', description: '高雄的西門町，年輕潮流聚集地。' },
    { id: 423, name: 'SKM Park Outlets', city: '高雄', district: '前鎮區', region: '南部', category: '購物', tags: ['購物', '冒險', '親子'], type: 'spot', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/outlet,park', description: '美式樂園風格的 Outlet 購物勝地。' },
    { id: 424, name: '義大世界', city: '高雄', district: '大樹區', region: '南部', category: '冒險', tags: ['購物', '冒險', '親子'], type: 'spot', price: 2, bestTime: 'day', image: 'https://loremflickr.com/800/600/themepark,ferris', description: '結合遊樂園與購物廣場的度假勝地。' },
    { id: 425, name: '三多商圈', city: '高雄', district: '苓雅區', region: '南部', category: '購物', tags: ['購物', '電影', '時尚'], type: 'spot', price: 2, bestTime: 'any', image: 'https://loremflickr.com/800/600/department,store', description: '百貨公司林立的繁華商圈。' },

    // Food
    { id: 430, name: '興隆居', city: '高雄', district: '前金區', region: '南部', category: '美食', tags: ['美食', '早餐'], type: 'food', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/bao,breakfast', description: '排隊必吃的傳統湯包燒餅早餐。' },
    { id: 431, name: '鴨肉珍', city: '高雄', district: '鹽埕區', region: '南部', category: '美食', tags: ['美食', '小吃'], type: 'food', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/duck,rice', description: '鹽埕區超過一甲子的老字號鴨肉飯。' },
    { id: 432, name: '碳佐麻里', city: '高雄', district: '鼓山區', region: '南部', category: '美食', tags: ['美食', '燒肉', '奢華'], type: 'food', price: 3, bestTime: 'any', image: 'https://loremflickr.com/800/600/bbq,grill', description: '南部燒肉霸主，環境大氣優美。' },

    // Yancheng/Gushan Classics
    { id: 401, name: '駁二藝術特區', city: '高雄', district: '鹽埕區', region: '南部', category: '文化', tags: ['文化', '攝影', '展覽'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/pier2,art', description: '海港倉庫改建的文創基地。' },
    { id: 402, name: '樺達奶茶', city: '高雄', district: '鹽埕區', region: '南部', category: '美食', tags: ['美食', '飲料'], type: 'food', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/milktea,bubble', description: '高雄老字號奶茶創始店。' },
    { id: 403, name: '旗津老街', city: '高雄', district: '旗津區', region: '南部', category: '美食', tags: ['美食', '海鮮'], type: 'food', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/seafood,street', description: '新鮮海產與烤魷魚。' },
    { id: 404, name: '旗津彩虹教堂', city: '高雄', district: '旗津區', region: '南部', category: '攝影', tags: ['攝影', '網美'], type: 'spot', price: 1, bestTime: 'day', image: 'https://loremflickr.com/800/600/rainbow,church', description: '海邊的色彩繽紛裝置藝術。' },
    { id: 405, name: '西子灣夕陽', city: '高雄', district: '鼓山區', region: '南部', category: '自然', tags: ['自然', '攝影', '浪漫'], type: 'spot', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/sunset,ocean', description: '高雄八景之一。' },
    { id: 410, name: '瑞豐夜市', city: '高雄', district: '左營區', region: '南部', category: '美食', tags: ['美食', '夜市'], type: 'food', price: 1, bestTime: 'night', image: 'https://loremflickr.com/800/600/nightmarket,kaohsiung', description: '人氣最旺的觀光夜市。' },
    { id: 411, name: '衛武營國家藝術中心', city: '高雄', district: '鳳山區', region: '南部', category: '文化', tags: ['文化', '建築', '攝影'], type: 'spot', price: 1, bestTime: 'any', image: 'https://loremflickr.com/800/600/weiwuying,architecture', description: '世界最大單一屋頂劇院。' },
    { id: 412, name: '六合夜市', city: '高雄', district: '新興區', region: '南部', category: '美食', tags: ['美食', '夜市'], type: 'food', price: 1, bestTime: 'night', image: 'https://loremflickr.com/800/600/nightmarket,street', description: '知名觀光夜市。' },
];

// --- 2. Types & Constants ---
type Companion = 'Solo' | 'Couple' | 'Family' | 'Friends';
type Pace = 'Slow' | 'Balanced' | 'Fast';
type Theme = 'Culture' | 'Food' | 'Nature' | 'Shopping' | 'Adventure' | 'Relaxation' | 'Photography' | 'History';
type Budget = 1 | 2 | 3; // New Type

interface TripItem {
    time: string;
    place: PlaceData;
    reason: string;
}

interface ItineraryDay {
    day: number;
    items: TripItem[];
}

const THEMES: { id: Theme; label: string }[] = [
    { id: 'Culture', label: '文化' },
    { id: 'Food', label: '美食' },
    { id: 'Nature', label: '自然' },
    { id: 'Shopping', label: '購物' },
    { id: 'Adventure', label: '冒險' },
    { id: 'Relaxation', label: '放鬆' },
    { id: 'Photography', label: '攝影' },
    { id: 'History', label: '歷史' },
];

const COMPANION_OPTIONS: { id: Companion; icon: any; label: string }[] = [
    { id: 'Solo', icon: User, label: '獨旅' },
    { id: 'Couple', icon: Heart, label: '情侶' },
    { id: 'Family', icon: Users, label: '親子' },
    { id: 'Friends', icon: Smile, label: '朋友' },
];

const PACE_OPTIONS: { id: Pace; emoji: string; title: string; desc: string }[] = [
    { id: 'Slow', emoji: '🐢', title: '慢活', desc: 'Chill' },
    { id: 'Balanced', emoji: '🚶', title: '舒適', desc: 'Balanced' },
    { id: 'Fast', emoji: '🐇', title: '充實', desc: 'Packed' },
];

const BUDGET_OPTIONS: { id: Budget; title: string; desc: string; icon: any }[] = [
    { id: 1, title: '經濟實惠', desc: '夜市小吃、免費景點', icon: DollarSign },
    { id: 2, title: '經典標準', desc: '人氣餐廳、在地體驗', icon: Utensils },
    { id: 3, title: '精緻奢華', desc: '精緻料理、舒適享受', icon: Sparkles },
];

// --- 3. Component ---
export default function PlannerPage() {
    const [step, setStep] = useState<'input' | 'result'>('input');
    const [isLoading, setIsLoading] = useState(false);

    // Toast State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Inputs
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState(3);
    const [companion, setCompanion] = useState<Companion>('Couple');
    const [themes, setThemes] = useState<Theme[]>([]);
    const [pace, setPace] = useState<Pace>('Balanced');
    const [budget, setBudget] = useState<Budget>(2);

    // Result
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

    // --- Helpers ---
    const toggleTheme = (theme: Theme) => {
        setThemes(prev => {
            if (prev.includes(theme)) return prev.filter(t => t !== theme);
            if (prev.length < 3) return [...prev, theme];
            return prev;
        });
    };

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const parseLocationStr = (input: string) => {
        const lower = input.toLowerCase().trim();
        if (lower.match(/taipei|台北/)) return { type: 'city', value: '台北' };
        if (lower.match(/tainan|台南/)) return { type: 'city', value: '台南' };
        if (lower.match(/kaohsiung|高雄/)) return { type: 'city', value: '高雄' };
        return { type: 'city', value: '台北' }; // Default fallback if needed, but logic covers filters
    };

    // --- Weighted Scoring Algorithm (Phase 49) ---
    const generateItinerary = () => {
        // VALIDATION
        if (!location.trim()) {
            triggerToast('請輸入想去的城市 (例如：台北、台南)');
            return;
        }
        if (themes.length === 0) {
            triggerToast('請至少選擇 1 個旅遊風格');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const parsedLoc = parseLocationStr(location);
            const targetCity = parsedLoc.value;

            // 1. Filter by City (Strict) & Basic Availability
            let cityPool = placesPool.filter(p => !targetCity || p.city === targetCity);
            if (cityPool.length === 0) cityPool = placesPool.filter(p => p.region === '北部'); // Ultimate fallback

            // 2. Score Items based on User Interests
            interface ScoredPlace extends PlaceData {
                score: number;
            }

            const scoredPool: ScoredPlace[] = cityPool.map(place => {
                let score = 0;
                // Hit Interest (Tag match)
                const interestMatch = themes.some(t => {
                    const themeLabel = THEMES.find(th => th.id === t)?.label; // e.g., 'Shopping' -> '購物'
                    return place.tags.includes(themeLabel || '');
                });
                if (interestMatch) score += 10;

                // Specific Boosts
                if (themes.includes('Shopping') && place.tags.includes('購物')) score += 5;
                if (themes.includes('Food') && place.tags.includes('美食')) score += 5;

                // Budget Match
                if (place.price === budget) score += 2;

                // Diversity shuffle factor to break ties
                score += Math.random() * 2;

                return { ...place, score };
            }).sort((a, b) => b.score - a.score); // Best matches first

            const days: ItineraryDay[] = [];
            const usedIds = new Set<number>(); // Global tracking to prevent duplicates across ALL days

            let currentDistrict = '';

            for (let d = 1; d <= duration; d++) {
                const dailyActivities: TripItem[] = [];

                // Helper to pick best available spot
                const pickSpot = (slotType: 'spot' | 'food', timeSlot: 'day' | 'night' | 'any') => {
                    // Filter candidates that are NOT used
                    let candidates = scoredPool.filter(p => !usedIds.has(p.id));

                    // Filter by Time
                    if (timeSlot === 'night') {
                        // For night slot, must accept 'night' OR 'any'
                        candidates = candidates.filter(p => p.bestTime === 'night' || p.bestTime === 'any');
                    } else {
                        // For day slot, strictly NO 'night' exclusive spots (like night markets)
                        candidates = candidates.filter(p => p.bestTime !== 'night');
                    }

                    // Filter by Type
                    candidates = candidates.filter(p => p.type === slotType);

                    if (candidates.length === 0) return null;

                    // Attempt 1: Same District + High Score (Threshold check)
                    let bestMatch = candidates.find(p => p.district === currentDistrict);

                    // Attempt 2: Global Best (Switching District)
                    if (!bestMatch) {
                        bestMatch = candidates[0]; // Already sorted by score
                    } else {
                        // Quality Check: If the district match is trash (score < 5) and we have a god-tier match (score > 12) elsewhere, switch?
                        if (bestMatch.score < 5 && candidates[0].score > 10) {
                            bestMatch = candidates[0];
                        }
                    }

                    if (bestMatch) {
                        usedIds.add(bestMatch.id);
                        currentDistrict = bestMatch.district; // Move logic to this new district
                        return bestMatch;
                    }
                    return null;
                };

                // --- MORNING (Spot) ---
                const morning = pickSpot('spot', 'day');
                if (morning) dailyActivities.push({ time: '上午', place: morning, reason: '前往探索' });

                // --- LUNCH (Food) ---
                const lunch = pickSpot('food', 'day');
                if (lunch) dailyActivities.push({ time: '午餐', place: lunch, reason: '享用美食' });

                // --- AFTERNOON (Spot) ---
                const afternoon = pickSpot('spot', 'day');
                if (afternoon) dailyActivities.push({ time: '下午', place: afternoon, reason: '午後散策' });

                // --- DINNER (Food) ---
                const dinner = pickSpot('food', 'night'); // Can hold night markets if budget fits or if highly rated
                if (dinner) dailyActivities.push({ time: '晚餐', place: dinner, reason: '美味晚餐' });

                // --- EVENING (Spot/Activity) ---
                const evening = pickSpot('spot', 'night');
                if (evening) dailyActivities.push({ time: '晚上', place: evening, reason: '夜間活動' });

                if (dailyActivities.length > 0) {
                    days.push({ day: d, items: dailyActivities });
                }
            }

            setItinerary(days);
            setStep('result');
            setIsLoading(false);
        }, 1500);
    };

    // --- View: Input Form ---
    if (step === 'input') {
        return (
            <div className="min-h-screen bg-[#FFF9F2] py-8 px-4 animate-fade-in font-sans text-[#2C1810] flex items-center justify-center relative">

                {/* TOAST NOTIFICATION */}
                {showToast && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
                        <div className="bg-[#2C1810] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#D97C5F]">
                            <AlertCircle size={20} className="text-[#D97C5F]" />
                            <span className="font-bold text-sm tracking-wide">{toastMessage}</span>
                            <button onClick={() => setShowToast(false)} className="text-white/50 hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#D97C5F] mb-6"></div>
                        <p className="text-[#D97C5F] font-serif text-2xl font-bold animate-pulse">AI 智慧路徑運算中...</p>
                    </div>
                )}

                <div className="max-w-xl w-full mx-auto space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-100 p-6 md:p-8 transform transition-all hover:shadow-2xl">
                    <div className="text-left mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-[#2C1810] font-serif mb-1">
                            AI 智慧行程規劃
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            告訴我們您的喜好，為您量身打造專屬的台灣之旅。
                        </p>
                    </div>

                    {/* Step 1: Location */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">想去哪裡玩？</label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="例如：台北、台南、高雄..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-white rounded-xl h-12 px-4 pl-10 text-sm font-bold outline-none border border-stone-200 shadow-sm focus:ring-2 focus:ring-[#D97C5F]/50 focus:border-[#D97C5F] transition-all placeholder:font-normal placeholder:text-gray-300 hover:border-[#D97C5F]/30"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-[#D97C5F] transition-colors" />
                        </div>
                    </div>

                    {/* Step 2: Duration */}
                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">旅遊天數</label>
                            <span className="text-xl font-black text-[#D97C5F] font-serif">{duration} 天</span>
                        </div>
                        <input type="range" min="1" max="5" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full cursor-pointer accent-[#D97C5F]" />
                    </div>

                    {/* Step 3: Pace */}
                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">旅遊步調</label>
                        <div className="grid grid-cols-3 gap-3">
                            {PACE_OPTIONS.map(p => (
                                <button key={p.id} onClick={() => setPace(p.id)} className={`h-10 rounded-xl text-xs font-bold transition-all border flex items-center justify-center shadow-sm ${pace === p.id ? 'bg-[#D97C5F] text-white border-[#D97C5F]' : 'bg-white text-gray-500 border-stone-200'}`}>
                                    {p.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 4: Companions */}
                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">旅伴是誰？</label>
                        <div className="grid grid-cols-4 gap-3">
                            {COMPANION_OPTIONS.map((opt) => (
                                <button key={opt.id} onClick={() => setCompanion(opt.id)} className={`flex flex-col items-center justify-center h-20 rounded-xl border transition-all cursor-pointer shadow-sm ${companion === opt.id ? 'bg-[#D97C5F]/5 border-[#D97C5F] text-[#D97C5F]' : 'bg-white border-stone-200 text-gray-400'}`}>
                                    <opt.icon size={20} className="mb-1.5" />
                                    <span className="text-[10px] font-bold">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 5: Interests */}
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between px-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">旅遊風格 (最多3項)</label>
                            <span className="text-xs font-bold text-[#D97C5F]">{themes.length}/3</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {THEMES.map(t => (
                                <button key={t.id} onClick={() => toggleTheme(t.id)} className={`h-12 rounded-xl text-xs font-bold border flex items-center justify-center shadow-sm ${themes.includes(t.id) ? 'bg-[#D97C5F] text-white border-[#D97C5F]' : 'bg-white text-stone-500 border-stone-200'}`}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 6: Budget */}
                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">預算與飲食風格</label>
                        <div className="grid grid-cols-3 gap-3">
                            {BUDGET_OPTIONS.map(b => (
                                <button
                                    key={b.id}
                                    onClick={() => setBudget(b.id)}
                                    className={`flex flex-col items-center justify-center h-24 rounded-xl border transition-all cursor-pointer shadow-sm px-2 text-center ${budget === b.id
                                            ? 'bg-[#D97C5F]/5 border-[#D97C5F] text-[#D97C5F] ring-1 ring-[#D97C5F]'
                                            : 'bg-white border-stone-200 text-gray-400 hover:border-[#D97C5F]/50'
                                        }`}
                                >
                                    <b.icon size={20} className="mb-2" />
                                    <span className="text-xs font-bold mb-1">{b.title}</span>
                                    <span className="text-[9px] opacity-70 leading-tight">{b.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button onClick={generateItinerary} className="w-full bg-[#2C1810] text-[#FFF9F2] text-sm font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2">
                            <span>開始規劃行程</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    // --- View: Result ---
    return (
        <div className="min-h-screen bg-[#FFF9F2] animate-fade-in text-[#2C1810]">

            {/* Integrated Header */}
            <div className="bg-[#5A3E36] text-[#FFF9F2] px-6 py-10 md:py-12 shadow-lg relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif">您的專屬旅程</h2>
                            <p className="text-white/80 text-sm md:text-base">
                                這是一趟舒適的旅程，專為喜愛 {themes.length > 0 ? themes.map(tId => THEMES.find(t => t.id === tId)?.label).join('、') : '旅行'} 的您設計。
                            </p>
                        </div>
                        <button
                            onClick={() => { setItinerary([]); setStep('input'); }}
                            className="px-5 py-2 bg-white/10 border border-white/30 rounded-full hover:bg-white/20 transition flex items-center gap-2 text-sm backdrop-blur-md"
                        >
                            <RefreshCw size={16} /> 重新規劃
                        </button>
                    </div>

                    {/* Trip Overview Grid (5 Items) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">

                        {/* 1. Location */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">目的地</span>
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <MapPin size={18} className="text-[#D97C5F]" />
                                {location || "探索台灣"}
                            </div>
                        </div>

                        {/* 2. Duration */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">旅遊天數</span>
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <Calendar size={18} className="text-[#D97C5F]" />
                                {duration} 天
                            </div>
                        </div>

                        {/* 3. Companions */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">旅伴</span>
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <Users size={18} className="text-[#D97C5F]" />
                                {COMPANION_OPTIONS.find(c => c.id === companion)?.label}
                            </div>
                        </div>

                        {/* 4. Budget */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">預算/風格</span>
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <Wallet size={18} className="text-[#D97C5F]" />
                                {budget === 1 ? '經濟實惠' : budget === 3 ? '精緻奢華' : '經典標準'}
                            </div>
                        </div>

                        {/* 5. Travel Style (New!) */}
                        <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">旅遊偏好</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {themes.map(t => (
                                    <span key={t} className="px-2 py-0.5 bg-white/20 border border-white/10 text-white text-xs rounded-full whitespace-nowrap">
                                        {THEMES.find(opt => opt.id === t)?.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Decor */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#D97C5F]/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-[#2C1810]/40 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Timeline */}
            <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12 pb-32">
                {itinerary.map((day) => (
                    <div key={day.day} className="relative">
                        <div className="sticky top-4 z-30 mb-5 inline-block">
                            <span className="bg-[#D97C5F] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-[#D97C5F]/30 font-serif border-2 border-white/20">
                                第 {day.day} 天
                            </span>
                        </div>

                        <div className="grid gap-5 pl-2 relative border-l-2 border-stone-200 ml-4 pb-8">
                            {day.items.map((item, idx) => (
                                <Link key={idx} href={`/explore/${item.place.id}`} className="group block pl-6 relative">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-8 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-colors duration-300 ${item.place.type === 'food' ? 'bg-[#D97C5F] group-hover:bg-[#b05a40]' : 'bg-[#2C1810] group-hover:bg-black'}`}></div>

                                    <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-100 hover:border-[#D97C5F]/30 flex gap-4 relative overflow-hidden items-center group-hover:-translate-y-1">
                                        <div className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-gray-200 shadow-inner">
                                            <Image
                                                src={item.place.image}
                                                alt={item.place.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                unoptimized
                                            />
                                            {(item.place.type === 'food' || item.place.price > 1) && (
                                                <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                                    {'$'.repeat(item.place.price)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 py-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.place.type === 'food'
                                                        ? 'bg-orange-50 text-orange-600 border-orange-100'
                                                        : 'bg-stone-50 text-stone-500 border-stone-100'
                                                    }`}>
                                                    {item.time}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold font-serif text-[#2C1810] truncate group-hover:text-[#D97C5F] transition-colors">{item.place.name}</h3>
                                            <p className="text-xs text-stone-500 truncate mt-0.5">{item.place.district} · {item.place.category}</p>
                                            <div className="mt-2 flex items-center gap-1 text-[10px] text-stone-400 font-medium">
                                                <Sparkles size={10} className="text-[#D97C5F]" />
                                                {item.reason}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

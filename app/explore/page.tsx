'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart } from 'lucide-react';

// Filter Options Configuration
const regionOptions = ['全部', '北部', '中部', '南部', '東部'];
const categoryOptions = ['全部', '文化', '老街', '自然', '展覽', '生活', '季節主題'];
const durationOptions = ['全部', '1日遊', '2天1夜', '3天以上'];

const places = [
    // --- 1. 文化 (Culture) ---
    // 大稻埕歷史文化 (Dadaocheng vibe)
    { id: 1, name: '大稻埕歷史文化', region: '北部', category: '文化', duration: '1日遊', image: 'https://images.unsplash.com/photo-1689602786459-a2fb77e99fb6?q=80&w=800', description: '穿梭台北舊城，感受迪化街的南北貨與紅磚洋樓魅力。' },
    // 舊城區知識文化 (Taichung Station area vibe)
    { id: 2, name: '舊城區知識文化', region: '中部', category: '文化', duration: '1日遊', image: 'https://images.unsplash.com/photo-1624977446557-30c1441916e3?q=80&w=800', description: '探索台中舊火車站周邊的歷史軌跡與現代變遷。' },
    // 府城知識故事 (Tainan historic vibe)
    { id: 3, name: '府城知識故事', region: '南部', category: '文化', duration: '2天1夜', image: 'https://images.unsplash.com/photo-1678032978656-b155fb907638?q=80&w=800', description: '漫步台南古都，閱讀孔廟與文學館的歲月故事。' },
    // 舊城歷史軸線 (Hualien historic vibe)
    { id: 4, name: '舊城歷史軸線', region: '東部', category: '文化', duration: '1日遊', image: 'https://images.unsplash.com/photo-1649695897464-44205009435e?q=80&w=800', description: '花蓮市區的歷史散策，尋找日治時期的建築記憶。' },

    // --- 2. 老街 (Old Street) ---
    // 九份金瓜石 (Jiufen Old Street)
    { id: 5, name: '九份金瓜石', region: '北部', category: '老街', duration: '1日遊', image: 'https://images.unsplash.com/photo-1557082382-53194c46b33a?q=80&w=800', description: '悲情城市與黃金博物館的礦業記憶。' },
    // 鹿港小鎮巷弄 (Lukang vibe)
    { id: 6, name: '鹿港小鎮巷弄', region: '中部', category: '老街', duration: '1日遊', image: 'https://images.unsplash.com/photo-1633875566074-3a5f605130a5?q=80&w=800', description: '一府二鹿三艋舺，穿梭九曲巷與摸乳巷。' },
    // 鹽埕舊街區 (Kaohsiung older buildings vibe)
    { id: 7, name: '鹽埕舊街區', region: '南部', category: '老街', duration: '1日遊', image: 'https://images.unsplash.com/photo-1695045031404-24671236232e?q=80&w=800', description: '高雄最早的繁華街區，品味老派浪漫。' },
    // 頭城老街文史 (Yilan historic vibe)
    { id: 8, name: '頭城老街文史', region: '東部', category: '老街', duration: '1日遊', image: 'https://images.unsplash.com/photo-1606057567768-995746193c1a?q=80&w=800', description: '開蘭第一城，感受宜蘭濱海的純樸歲月。' },

    // --- 3. 自然 (Nature) ---
    // 金面山步道 (Taipei mountain view)
    { id: 9, name: '金面山步道', region: '北部', category: '自然', duration: '1日遊', image: 'https://images.unsplash.com/photo-1508196173431-199fd614b616?q=80&w=800', description: '登上剪刀石，俯瞰台北盆地的壯闊全景。' },
    // 車埕×明潭湖景 (Sun Moon Lake vibe)
    { id: 10, name: '車埕×明潭湖景', region: '中部', category: '自然', duration: '1日遊', image: 'https://images.unsplash.com/photo-1603162772736-1412d8081270?q=80&w=800', description: '最後的火車站與日月潭湖畔的靜謐時光。' },
    // 阿朗壹古道 (Taiwan coast vibe)
    { id: 11, name: '阿朗壹古道', region: '南部', category: '自然', duration: '2天1夜', image: 'https://images.unsplash.com/photo-1667751588383-6c1c50926922?q=80&w=800', description: '踏上台灣最後一段原始海岸線。' },
    // 小野柳海濱 (Taitung coast rock vibe)
    { id: 12, name: '小野柳海濱', region: '東部', category: '自然', duration: '1日遊', image: 'https://images.unsplash.com/photo-1693762564172-b55466648355?q=80&w=800', description: '奇岩怪石與太平洋海浪的自然交響曲。' },

    // --- 4. 展覽 (Exhibition) ---
    // 北美館×當代藝術 (Taipei Fine Arts Museum exterior)
    { id: 13, name: '北美館×當代藝術', region: '北部', category: '展覽', duration: '1日遊', image: 'https://images.unsplash.com/photo-1625135788165-02960b61939c?q=80&w=800', description: '台北當代藝術散步，激盪視覺與思考。' },
    // 國美館×草悟道 (Taichung greenway vibe)
    { id: 14, name: '國美館×草悟道', region: '中部', category: '展覽', duration: '1日遊', image: 'https://images.unsplash.com/photo-1601985290477-907b49c22256?q=80&w=800', description: '美術館周邊的綠帶與裝置藝術巡禮。' },
    // 駁二×港都藝術 (Kaohsiung Pier-2 vibe)
    { id: 15, name: '駁二×港都藝術', region: '南部', category: '展覽', duration: '1日遊', image: 'https://images.unsplash.com/photo-1564659907532-6b4f73cb79f5?q=80&w=800', description: '在海風中欣賞倉庫群的設計與創意。' },
    // 花蓮文創園區 (Hualien warehouse vibe)
    { id: 16, name: '花蓮文創園區', region: '東部', category: '展覽', duration: '1日遊', image: 'https://images.unsplash.com/photo-1696398968340-96045324010e?q=80&w=800', description: '舊酒廠轉身的文化展演空間。' },

    // --- 5. 生活 (Lifestyle) ---
    // 北門×城中市場 (Taipei historic gate area)
    { id: 17, name: '北門×城中市場', region: '北部', category: '生活', duration: '1日遊', image: 'https://images.unsplash.com/photo-1558348669-92407502578e?q=80&w=800', description: '老台北人的生活廚房與歷史城門導覽。' },
    // 台中第二市場 (Taiwan market vibe)
    { id: 18, name: '台中第二市場', region: '中部', category: '生活', duration: '1日遊', image: 'https://images.unsplash.com/photo-1533238266660-e33647105526?q=80&w=800', description: '探索六角樓下的在地美食與人情味。' },
    // 永樂市場×國華街 (Tainan street food vibe)
    { id: 19, name: '永樂市場×國華街', region: '南部', category: '生活', duration: '1日遊', image: 'https://images.unsplash.com/photo-1546465814-a727652724cb?q=80&w=800', description: '台南小吃一級戰區，滿足你的味蕾。' },
    // 東大門夜市 (Night market vibe)
    { id: 20, name: '東大門夜市', region: '東部', category: '生活', duration: '1日遊', image: 'https://images.unsplash.com/photo-1524778628052-d18a2d061c18?q=80&w=800', description: '匯集原民料理與在地小吃的深夜食堂。' },

    // --- 6. 季節主題 (Seasonal) ---
    // 平溪天燈古道 (Pingxi Sky Lanterns)
    { id: 21, name: '平溪天燈古道', region: '北部', category: '季節主題', duration: '1日遊', image: 'https://images.unsplash.com/photo-1615109313627-074d6e374831?q=80&w=800', description: '鐵道、天燈與瀑布交織的山城浪漫。' },
    // 新社花海 (Flower field vibe)
    { id: 22, name: '新社花海', region: '中部', category: '季節主題', duration: '1日遊', image: 'https://images.unsplash.com/photo-1596244731215-4e3cc7403502?q=80&w=800', description: '季節限定的繽紛花毯與農村風光。' },
    // 駁二跨年燈光季 (Kaohsiung night lights vibe)
    { id: 23, name: '駁二跨年燈光季', region: '南部', category: '季節主題', duration: '2天1夜', image: 'https://images.unsplash.com/photo-1676215925795-30243111487a?q=80&w=800', description: '璀璨燈光點亮高雄港灣的夜晚。' },
    // 熱氣球嘉年華 (Hot air balloons)
    { id: 24, name: '熱氣球嘉年華', region: '東部', category: '季節主題', duration: '2天1夜', image: 'https://images.unsplash.com/photo-1592202640662-d6c4333bb093?q=80&w=800', description: '鹿野高台上空，夢想隨熱氣球升空。' },
];

export default function ExplorePage() {
    const [selectedRegion, setSelectedRegion] = useState('全部');
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [selectedDuration, setSelectedDuration] = useState('全部');
    const [savedIds, setSavedIds] = useState<number[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('wanderly_favorites');
        if (saved) {
            try {
                setSavedIds(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
    }, []);

    const toggleFavorite = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); // Prevent navigating to detail page
        e.stopPropagation();

        const newSavedIds = savedIds.includes(id)
            ? savedIds.filter(savedId => savedId !== id)
            : [...savedIds, id];

        setSavedIds(newSavedIds);
        localStorage.setItem('wanderly_favorites', JSON.stringify(newSavedIds));

        // Update Full Objects for My List page
        const savedPlaces = places.filter(p => newSavedIds.includes(p.id));
        localStorage.setItem('wanderly_saved_places', JSON.stringify(savedPlaces));
    };

    const filteredPlaces = places.filter((place) => {
        // 1. Region Filter
        const matchRegion = selectedRegion === '全部' || place.region === selectedRegion;

        // 2. Category Filter
        const matchCategory = selectedCategory === '全部' || place.category === selectedCategory;

        // 3. Duration Filter
        const matchDuration = selectedDuration === '全部' || place.duration === selectedDuration;

        return matchRegion && matchCategory && matchDuration;
    });

    return (
        <div className="flex-1 flex flex-col bg-[#FFF9F2] animate-fade-in overflow-y-auto">
            <div className="p-6 max-w-7xl mx-auto w-full space-y-8">

                {/* Header */}
                <div className="text-center space-y-2 pt-4">
                    <h1 className="text-3xl font-bold text-[#2C2C2C]">Discover Taiwan</h1>
                    <p className="text-sm text-gray-500 tracking-wide">Find destinations that match your heart.</p>
                </div>

                {/* Filter Section - Dropdowns */}
                <div className="w-full max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">

                    {/* Region Dropdown */}
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="flex-1 w-full px-4 py-3 rounded-lg border border-[#D97C5F]/30 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D97C5F] cursor-pointer"
                    >
                        {regionOptions.map(opt => (
                            <option key={opt} value={opt}>{opt === '全部' ? '所有地區' : opt}</option>
                        ))}
                    </select>

                    {/* Category Dropdown */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 w-full px-4 py-3 rounded-lg border border-[#D97C5F]/30 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D97C5F] cursor-pointer"
                    >
                        {categoryOptions.map(opt => (
                            <option key={opt} value={opt}>{opt === '全部' ? '所有風格' : opt}</option>
                        ))}
                    </select>

                    {/* Duration Dropdown */}
                    <select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="flex-1 w-full px-4 py-3 rounded-lg border border-[#D97C5F]/30 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D97C5F] cursor-pointer"
                    >
                        {durationOptions.map(opt => (
                            <option key={opt} value={opt}>{opt === '全部' ? '所有天數' : opt}</option>
                        ))}
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
                    {filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place) => {
                            const isSaved = savedIds.includes(place.id);
                            return (
                                <Link href={`/explore/${place.id}`} key={place.id} className="group block h-full relative">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-terracotta/20 h-full flex flex-col">
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            <Image
                                                src={place.image}
                                                alt={place.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                unoptimized
                                            />
                                            {/* Heart Button */}
                                            <button
                                                onClick={(e) => toggleFavorite(e, place.id)}
                                                className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-all shadow-sm group/btn"
                                            >
                                                <Heart
                                                    size={18}
                                                    className={isSaved ? "fill-[#D97C5F] text-[#D97C5F]" : "text-gray-600 group-hover/btn:text-[#D97C5F]"}
                                                />
                                            </button>

                                            <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                                                <span className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-terracotta tracking-wider uppercase shadow-sm">
                                                    {place.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-2 flex-1 flex flex-col">
                                            <h3 className="font-bold text-gray-800 text-lg group-hover:text-terracotta transition-colors">{place.name}</h3>
                                            <div className="flex items-center text-gray-400 text-xs gap-1">
                                                <MapPin size={12} />
                                                <span>{place.region}</span>
                                                <span className="text-gray-300 mx-1">|</span>
                                                <span>{place.duration}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
                                                {place.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <p className="text-lg">No destinations found matching these criteria.</p>
                            <button
                                onClick={() => {
                                    setSelectedRegion('全部');
                                    setSelectedCategory('全部');
                                    setSelectedDuration('全部');
                                }}
                                className="mt-4 text-sm text-terracotta hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

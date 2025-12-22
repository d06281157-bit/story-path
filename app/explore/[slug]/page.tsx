import { ITINERARIES } from '@/constants/itineraries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // 引入圖片組件

// 定義頁面接收的參數型別
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ItineraryPage({ params }: PageProps) {
    // 推薦的寫法 (更清晰)
    const { slug } = await params; // 先把 slug 拿出來
    const item = ITINERARIES.find((i) => i.slug === slug); // 再去比對

    // 2. 如果找不到 (比如網址打錯)，就顯示 404
    if (!item) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#fffdf9] py-12 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-6xl mx-auto">

                {/* 頂部導航 (麵包屑) */}
                <div className="mb-8 text-sm text-gray-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>&gt;</span>
                    <Link href="/explore" className="hover:text-black transition-colors">Explore</Link>
                    <span>&gt;</span>
                    <span className="text-orange-600 font-medium">{item.tag}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* === 左側：主要內容區 (佔 2/3) === */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 標題區塊 */}
                        <div>
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full mb-4 font-bold tracking-wide">
                                {item.tag}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {item.title}
                            </h1>
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                                {item.description}
                            </p>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Highlights (亮點) */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Highlights</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {item.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center text-gray-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                        <span className="text-orange-500 mr-3 text-xl">✓</span>
                                        <span className="font-medium">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery (圖片區) */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery</h2>
                            <div className="grid grid-cols-2 gap-4 h-64 md:h-80">
                                {/* 第一張圖 */}
                                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200">
                                    {item.images[0] ? (
                                        <Image
                                            src={item.images[0]}
                                            alt="Gallery 1"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                    )}
                                </div>
                                {/* 第二張圖 */}
                                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200">
                                    {item.images[1] ? (
                                        <Image
                                            src={item.images[1]}
                                            alt="Gallery 2"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === 右側：Trip Details 卡片 (佔 1/3) === */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 sticky top-8">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">Trip Details</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-8 font-bold">Plan Your Visit</p>

                            <div className="space-y-6">
                                {/* Duration */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-orange-50 text-orange-500 rounded-full">🕒</div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold tracking-wider">DURATION</div>
                                        <div className="text-gray-800 font-medium text-lg">{item.tripDetails.duration}</div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-orange-50 text-orange-500 rounded-full">📍</div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold tracking-wider">LOCATION</div>
                                        <div className="text-gray-800 font-medium text-lg">{item.tripDetails.location}</div>
                                    </div>
                                </div>

                                {/* Transport */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-orange-50 text-orange-500 rounded-full">🚌</div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold tracking-wider">TRANSPORT</div>
                                        <div className="text-gray-800 font-medium text-lg">{item.tripDetails.transport}</div>
                                    </div>
                                </div>

                                {/* Season */}
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-orange-50 text-orange-500 rounded-full">☀</div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold tracking-wider">BEST SEASON</div>
                                        <div className="text-gray-800 font-medium text-lg">{item.tripDetails.season}</div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-8 bg-[#D97C5F] hover:bg-[#c26245] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-95">
                                Add to Plan
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
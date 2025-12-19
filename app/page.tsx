import Link from "next/link";
import { Map, Coffee, BookOpen, Mountain } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 animate-fade-in relative overflow-hidden py-20">

      {/* Hero Section */}
      <div className="space-y-6 z-10 max-w-3xl mx-auto">
        <p className="text-terracotta tracking-[0.3em] text-sm uppercase font-bold">Travel Persona Quiz</p>
        <h1 className="text-6xl md:text-7xl font-bold text-[#2C2C2C] tracking-tight leading-tight">
          StoryPath<br />
          <span className="text-4xl md:text-5xl font-medium mt-4 block">台灣旅行人格測驗</span>
        </h1>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-xl mx-auto">
          每個旅人都有自己觀看世界的方式。<br />
          透過四個情境問題，找到屬於你的旅行風格，<br />
          讓我們為你推薦最適合的台灣路線。
        </p>
      </div>

      {/* Decorative Icons */}
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="flex justify-center gap-12 text-terracotta/80 py-4">
          <div className="flex flex-col items-center gap-2">
            <BookOpen size={32} />
            <span className="text-xs text-gray-400">文化</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Mountain size={32} />
            <span className="text-xs text-gray-400">自然</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Map size={32} />
            <span className="text-xs text-gray-400">老街</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Coffee size={32} />
            <span className="text-xs text-gray-400">生活</span>
          </div>
        </div>

        <Link
          href="/quiz"
          className="inline-block bg-terracotta text-white font-bold py-5 px-12 rounded-full shadow-lg hover:bg-[#c26a4e] transition-all transform hover:scale-[1.02] active:scale-[0.98] tracking-widest text-xl"
        >
          開始測驗 START
        </Link>

        <p className="text-sm text-gray-400">約需 2-3 分鐘 · 共 4 題情境問答</p>
      </div>
    </div>
  );
}

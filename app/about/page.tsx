import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#FFF9F2] animate-fade-in overflow-y-auto">
      <div className="p-8 space-y-8 flex flex-col items-center text-center">
        
        <div className="space-y-2 mt-8">
             <p className="text-terracotta tracking-[0.2em] text-xs uppercase font-bold">About Us</p>
             <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif">StoryPath</h1>
        </div>

        <div className="w-16 h-1 bg-terracotta/30 rounded-full" />

        <div className="space-y-6 max-w-sm">
            <p className="text-gray-600 leading-8 font-serif italic text-lg text-terracotta/80">
                "We help travelers find their own narrative in Taiwan."
            </p>
            
            <p className="text-gray-500 text-sm leading-7">
                StoryPath believes that travel is not just about visiting places, but about discovering a part of yourself. 
                Our psychological test helps match your inner travel persona with the unique landscapes and stories of Taiwan.
            </p>

            <p className="text-gray-500 text-sm leading-7">
                Whether you are a seeker of old stories, a lover of nature, a cultural explorer, or someone who just wants to live like a local, 
                we have a path for you.
            </p>
        </div>

        <div className="pt-8 w-full">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-terracotta/10">
                <p className="text-xs text-gray-400 mb-2">Designed for</p>
                <div className="flex justify-center gap-4 grayscale opacity-60">
                     {/* Placeholder for partner logos or icons */}
                     <span className="font-bold text-xl text-gray-300">EXPLORERS</span>
                </div>
            </div>
        </div>
        
        <div className="text-[10px] text-gray-400 pt-10">
            © 2024 StoryPath Project. All rights reserved.
        </div>

      </div>
    </div>
  );
}

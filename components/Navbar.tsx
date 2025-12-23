import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFF9F2]/90 backdrop-blur-md border-b border-terracotta/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-3 group">
          {/* Logo Image */}
          <img
            src="/icon-LOGO.png"
            alt="Wanderly Logo"
            className="h-8 w-auto object-contain"
          />
          {/* Brand Text */}
          <span className="font-serif font-bold text-xl tracking-wide text-gray-800">Wanderly</span>
        </Link>

        <div className="flex items-center gap-6 md:gap-8 text-xs md:text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-terracotta transition-colors whitespace-nowrap">
            Quiz
          </Link>
          <Link href="/explore" className="hover:text-terracotta transition-colors whitespace-nowrap">
            Explore
          </Link>
          <Link href="/plan" className="hover:text-terracotta transition-colors whitespace-nowrap">
            Plan
          </Link>
          <Link href="/my-list" className="bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full hover:bg-terracotta hover:text-white transition-all whitespace-nowrap font-bold">
            My List
          </Link>
        </div>
      </div>
    </nav>
  );
}

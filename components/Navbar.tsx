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

        <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-terracotta transition-colors">
            Quiz
          </Link>
          <Link href="/explore" className="hover:text-terracotta transition-colors">
            Explore
          </Link>
          <Link href="/plan" className="hover:text-terracotta transition-colors">
            Plan
          </Link>
          {/* Updated Link: My List */}
          <Link href="/my-list" className="hover:text-terracotta transition-colors">
            My List
          </Link>
        </div>
      </div>
    </nav>
  );
}

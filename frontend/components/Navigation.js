import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:text-amber-500 transition">
            <div className="text-3xl">🏭</div>
            <span className="font-bold text-xl hidden sm:inline">Interior Duct Ltd</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="hover:text-amber-500 transition">Home</Link>
            <Link href="/shop" className="hover:text-amber-500 transition">Shop</Link>
            <Link href="/about" className="hover:text-amber-500 transition">About</Link>
            <Link href="/contact" className="hover:text-amber-500 transition">Contact</Link>

            {/* Cart & Wishlist */}
            <div className="flex gap-4 border-l border-gray-700 pl-4">
              <button className="hover:text-amber-500 transition flex items-center gap-1">
                ❤️ <span className="text-sm bg-amber-500 rounded-full px-2 py-1">0</span>
              </button>
              <button className="hover:text-amber-500 transition flex items-center gap-1">
                🛒 <span className="text-sm bg-amber-500 rounded-full px-2 py-1">0</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700 pt-4">
            <Link href="/" className="block py-2 hover:text-amber-500 transition">Home</Link>
            <Link href="/shop" className="block py-2 hover:text-amber-500 transition">Shop</Link>
            <Link href="/about" className="block py-2 hover:text-amber-500 transition">About</Link>
            <Link href="/contact" className="block py-2 hover:text-amber-500 transition">Contact</Link>
            <div className="pt-2 mt-2 border-t border-gray-700 flex gap-4">
              <button className="flex-1 hover:text-amber-500 transition">❤️ Wishlist</button>
              <button className="flex-1 hover:text-amber-500 transition">🛒 Cart</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

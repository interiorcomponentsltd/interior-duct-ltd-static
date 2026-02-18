import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🏭</div>
              <h3 className="text-xl font-bold">Interior Duct Ltd</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Premium furniture manufacturing for Nigeria. Custom designs, commercial solutions, and bespoke interiors.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">f</a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">📷</a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-amber-500 transition">Home</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-amber-500 transition">Shop</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-amber-500 transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-amber-500 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-400 hover:text-amber-500 transition">Living Room</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-amber-500 transition">Dining</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-amber-500 transition">Bedroom</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-amber-500 transition">Kitchen</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <p className="font-semibold text-white mb-1">Email</p>
                <a href="mailto:info@interiorductltd.com" className="hover:text-amber-500 transition">
                  info@interiorductltd.com
                </a>
              </li>
              <li>
                <p className="font-semibold text-white mb-1">Phone</p>
                <a href="tel:+234" className="hover:text-amber-500 transition">
                  +234 (0) XXX XXX XXXX
                </a>
              </li>
              <li>
                <p className="font-semibold text-white mb-1">Location</p>
                <p>Nigeria</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Interior Duct Ltd. All rights reserved.
            </div>
            <div className="flex gap-6 justify-center text-gray-400 text-sm">
              <a href="#" className="hover:text-amber-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition">Terms of Service</a>
              <a href="#" className="hover:text-amber-500 transition">Shipping Info</a>
            </div>
            <div className="text-gray-400 text-sm text-right">
              Powered by Next.js & Node.js
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

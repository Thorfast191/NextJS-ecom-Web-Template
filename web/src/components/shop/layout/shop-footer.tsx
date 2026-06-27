import Link from "next/link";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function ShopFooter() {
  return (
    <footer className="bg-black border-t border-slate-800 text-white">
      {/* TOP */}

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* BRAND */}

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black">POSHMANSTYLE</h2>

            <p className="text-slate-400 mt-6 leading-8 max-w-md">
              Premium fashion marketplace focused on modern streetwear, luxury
              aesthetics, and timeless minimal style.
            </p>

            {/* SOCIALS */}

            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* SHOP */}

          <div>
            <h3 className="text-lg font-bold mb-6">Shop</h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <Link href="/shop" className="hover:text-white transition">
                All Products
              </Link>

              <Link href="/shop" className="hover:text-white transition">
                New Arrivals
              </Link>

              <Link href="/shop" className="hover:text-white transition">
                Trending
              </Link>

              <Link href="/shop" className="hover:text-white transition">
                Featured
              </Link>
            </div>
          </div>

          {/* ACCOUNT */}

          <div>
            <h3 className="text-lg font-bold mb-6">Account</h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <Link href="/account" className="hover:text-white transition">
                My Account
              </Link>

              <Link
                href="/account/orders"
                className="hover:text-white transition"
              >
                Orders
              </Link>

              <Link
                href="/account/wishlist"
                className="hover:text-white transition"
              >
                Wishlist
              </Link>

              <Link href="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>

              <Link href="/shipping" className="hover:text-white transition">
                Shipping
              </Link>

              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <p className="text-slate-500 text-sm">
            © 2026 POSHMANSTYLE. All rights reserved.
          </p>

          <p className="text-slate-500 text-sm">Built with Next.js & Prisma</p>
        </div>
      </div>
    </footer>
  );
}

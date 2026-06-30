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
    href="https://www.facebook.com/Poshmanstyle"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
  >
    <FaFacebookF size={18} />
  </a>

  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-pink-500 hover:bg-pink-600 hover:text-white"
  >
    <FaInstagram size={18} />
  </a>

  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X (Twitter)"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
  >
    <FaTwitter size={18} />
  </a>

  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
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

<p className="text-slate-500 text-sm">
  Premium Fashion • Secure Shopping • Worldwide Delivery
</p>
    </footer>
  );
}

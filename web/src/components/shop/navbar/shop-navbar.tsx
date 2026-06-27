"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { Menu, ShoppingBag, User, X, LogOut } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

import { signOut, useSession } from "next-auth/react";

export default function ShopNavbar() {
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}

      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          {/* LOGO */}

          <Link
            href="/"
            className="text-xl lg:text-2xl font-black tracking-wide"
          >
            POSHMANSTYLE
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden md:flex items-center gap-7 text-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>

            <Link href="/shop" className="hover:text-blue-400 transition">
              Shop
            </Link>
            <Link href="/new-arrivals">New Arrivals</Link>

            <Link href="/trending">Trending</Link>
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-5">
            {/* AUTH */}

            {session ? (
              <div className="flex items-center gap-4">
                {/* ACCOUNT */}

                <Link
                  href="/account"
                  className="hover:text-blue-400 transition"
                >
                  <User size={22} />
                </Link>

                {/* LOGOUT */}

                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="hover:text-red-400 transition"
                >
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-5">
                {/* LOGIN */}

                <Link
                  href="/shop/login"
                  className="hover:text-blue-400 transition text-sm uppercase tracking-widest"
                >
                  Login
                </Link>

                {/* REGISTER */}

                <Link
                  href="/shop/register"
                  className="h-11 px-5 rounded-xl bg-white text-black flex items-center justify-center font-semibold hover:bg-slate-200 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* CART */}

            <Link
              href="/cart"
              className="relative hover:text-blue-400 transition"
            >
              <ShoppingBag size={22} />

              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-8 text-2xl font-bold">
            {/* HOME */}

            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            {/* SHOP */}

            <Link href="/shop" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>

            {/* AUTH */}

            {session ? (
              <>
                {/* ACCOUNT */}

                <Link href="/account" onClick={() => setMobileOpen(false)}>
                  Account
                </Link>

                {/* LOGOUT */}

                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="text-left text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* LOGIN */}

                <Link href="/shop/login" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>

                {/* REGISTER */}

                <Link
                  href="/shop/register"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            {/* CART */}

            <Link href="/cart" onClick={() => setMobileOpen(false)}>
              Cart
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

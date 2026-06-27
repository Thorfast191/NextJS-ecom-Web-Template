"use client";

import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-64 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-8">POSHMANSTYLE</h1>

        <nav className="space-y-4">
          <a href="/admin" className="block hover:text-blue-400">
            Dashboard
          </a>

          <a href="/admin/users" className="block hover:text-blue-400">
            User Management
          </a>

          <a href="/admin/products" className="block hover:text-blue-400">
            Products Managment
          </a>

          <a href="/admin/categories" className="block hover:text-blue-400">
            Categories Managment
          </a>

          <a href="/admin/orders" className="block hover:text-blue-400">
            Orders Managment
          </a>
          <a href="/admin/shipping" className="block hover:text-blue-400">
            Shipping Managment
          </a>
          <a href="/admin/coupons " className="block hover:text-blue-400">
            Coupons Managment
          </a>
          <a href="/admin/settings" className="block hover:text-blue-400">
            Settings
          </a>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/admin/login",
              })
            }
            className="text-left text-red-400 hover:text-red-300 mt-10"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

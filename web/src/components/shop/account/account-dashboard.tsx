"use client";

import { useState } from "react";

import DashboardTab from "./dashboard-tab";
import OrdersTab from "./orders-tab";
import WishlistTab from "./wishlist-tab";
import SettingsTab from "./settings-tab";

interface Props {
  user: any;
}

type Tab = "dashboard" | "orders" | "wishlist" | "settings";

export default function AccountDashboard({ user }: Props) {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8">
      {/* SIDEBAR */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 h-fit sticky top-28">
        <div className="pb-6 border-b border-white/10">
          <h2 className="text-xl font-bold">{user.name || "Customer"}</h2>

          <p className="mt-2 text-sm text-slate-400 break-all">{user.email}</p>
        </div>

        <nav className="mt-6 space-y-2">
          <button
            onClick={() => setTab("dashboard")}
            className={`w-full rounded-xl px-4 py-3 text-left transition ${
              tab === "dashboard"
                ? "bg-blue-500 text-white"
                : "hover:bg-white/5"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setTab("orders")}
            className={`w-full rounded-xl px-4 py-3 text-left transition ${
              tab === "orders" ? "bg-blue-500 text-white" : "hover:bg-white/5"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setTab("wishlist")}
            className={`w-full rounded-xl px-4 py-3 text-left transition ${
              tab === "wishlist" ? "bg-blue-500 text-white" : "hover:bg-white/5"
            }`}
          >
            Wishlist
          </button>

          <button
            onClick={() => setTab("settings")}
            className={`w-full rounded-xl px-4 py-3 text-left transition ${
              tab === "settings" ? "bg-blue-500 text-white" : "hover:bg-white/5"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* CONTENT */}

      <div>
        {tab === "dashboard" && <DashboardTab user={user} />}

        {tab === "orders" && <OrdersTab orders={user.orders} />}

        {tab === "wishlist" && <WishlistTab wishlists={user.wishlists} />}

        {tab === "settings" && <SettingsTab user={user} />}
      </div>
    </div>
  );
}

"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  successOrderId: string;

  router: AppRouterInstance;
}

export default function SuccessModal({ successOrderId, router }: Props) {
  if (!successOrderId) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-md w-full text-center">
        {/* EMOJI */}

        <div className="text-7xl mb-5">🎉</div>

        {/* TITLE */}

        <h2 className="text-4xl font-black mb-4">Order Placed</h2>

        {/* DESCRIPTION */}

        <p className="text-slate-400 mb-8">
          Your order has been placed successfully.
        </p>

        {/* ORDER ID */}

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-8">
          <p className="text-xs text-slate-500 mb-2">ORDER ID</p>

          <p className="text-sm break-all font-mono">{successOrderId}</p>
        </div>

        {/* BUTTONS */}

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/shop")}
            className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Shop More
          </button>

          <button
            onClick={() => router.push("/account/orders")}
            className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

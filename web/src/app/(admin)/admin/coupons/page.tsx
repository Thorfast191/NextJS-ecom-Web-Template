import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

// ========================
// CREATE COUPON
// ========================

async function createCoupon(formData: FormData) {
  "use server";

  const code = formData.get("code") as string;

  const type = formData.get("type") as "PERCENTAGE" | "FIXED";

  const value = Number(formData.get("value"));

  const minAmount = Number(formData.get("minAmount") || 0);

  const expiresAt = formData.get("expiresAt") as string;

  await prisma.coupon.create({
    data: {
      code: code.toUpperCase(),

      type,

      value,

      minAmount: minAmount > 0 ? minAmount : null,

      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  revalidatePath("/admin/coupons");
}

// ========================
// TOGGLE COUPON
// ========================

async function toggleCoupon(id: string) {
  "use server";

  const coupon = await prisma.coupon.findUnique({
    where: {
      id,
    },
  });

  if (!coupon) return;

  await prisma.coupon.update({
    where: {
      id,
    },

    data: {
      isActive: !coupon.isActive,
    },
  });

  revalidatePath("/admin/coupons");
}

// ========================
// PAGE
// ========================

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-5xl font-black">Coupons</h1>

          <p className="text-slate-400 mt-3">Manage promo codes & discounts</p>
        </div>

        {/* CREATE FORM */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-8">Create Coupon</h2>

          <form
            action={createCoupon}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {/* CODE */}

            <input
              name="code"
              required
              placeholder="WELCOME10"
              className="h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
            />

            {/* TYPE */}

            <select
              name="type"
              className="h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
            >
              <option value="PERCENTAGE">Percentage</option>

              <option value="FIXED">Fixed</option>
            </select>

            {/* VALUE */}

            <input
              name="value"
              type="number"
              required
              placeholder="10"
              className="h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
            />

            {/* MIN */}

            <input
              name="minAmount"
              type="number"
              placeholder="Minimum Cart Total"
              className="h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
            />

            {/* EXPIRE */}

            <input
              name="expiresAt"
              type="date"
              className="h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
            />

            <button className="h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold md:col-span-2 lg:col-span-5">
              Create Coupon
            </button>
          </form>
        </div>

        {/* COUPONS */}

        <div className="grid gap-5">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              {/* INFO */}

              <div>
                <h2 className="text-2xl font-black">{coupon.code}</h2>

                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-sm">
                    {coupon.type}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-sm">
                    {coupon.value}
                  </span>

                  {coupon.minAmount && (
                    <span className="px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-sm">
                      Minimum Total {coupon.minAmount}
                    </span>
                  )}

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      coupon.isActive
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {coupon.expiresAt && (
                  <p className="text-slate-500 text-sm mt-4">
                    Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* ACTION */}

              <form
                action={async () => {
                  "use server";

                  await toggleCoupon(coupon.id);
                }}
              >
                <button
                  className={`h-12 px-6 rounded-2xl font-bold ${
                    coupon.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {coupon.isActive ? "Disable" : "Enable"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

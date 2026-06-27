interface Props {
  couponCode: string;

  setCouponCode: (value: string) => void;

  couponLoading: boolean;

  appliedCoupon: string;

  handleApplyCoupon: () => void;
}

export default function CouponBox({
  couponCode,
  setCouponCode,
  couponLoading,
  appliedCoupon,
  handleApplyCoupon,
}: Props) {
  return (
    <div className="mt-8">
      <label className="block mb-3 text-sm text-slate-400">Promo Code</label>

      <div className="flex gap-3">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder="WELCOME10"
          className="flex-1 h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />

        <button
          disabled={couponLoading}
          onClick={handleApplyCoupon}
          className="px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 transition"
        >
          {couponLoading ? "Applying..." : "Apply"}
        </button>
      </div>

      {appliedCoupon && (
        <p className="text-green-400 text-sm mt-3">
          Coupon "{appliedCoupon}" applied successfully
        </p>
      )}
    </div>
  );
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
          Delivery
        </p>

        <h1 className="text-5xl font-black mb-8">
          Shipping Information
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-6 text-slate-300 leading-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Processing Time
            </h2>

            <p>
              Orders are typically processed within 1 business day.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Delivery Time
            </h2>

            <p>
              Delivery usually takes 1–3 business days depending on your
              location.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Shipping Charges
            </h2>

            <p>
              Shipping charges are calculated during checkout based on your
              delivery location and selected shipping method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
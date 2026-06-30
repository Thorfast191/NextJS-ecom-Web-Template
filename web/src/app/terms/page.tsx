export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
          Legal
        </p>

        <h1 className="text-5xl font-black mb-8">
          Terms & Conditions
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-6 text-slate-300 leading-8">
          <p>
            By using POSHMANSTYLE, you agree to comply with our terms and
            conditions.
          </p>

          <p>
            Product prices, availability, and promotions may change without
            prior notice.
          </p>

          <p>
            Orders may be cancelled if fraudulent activity or pricing errors
            are detected.
          </p>

          <p>
            Full legal terms will be published before the official launch.
          </p>
        </div>
      </div>
    </div>
  );
}
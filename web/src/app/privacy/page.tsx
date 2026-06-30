export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
          Legal
        </p>

        <h1 className="text-5xl font-black mb-8">
          Privacy Policy
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-6 text-slate-300 leading-8">
          <p>
            POSHMANSTYLE respects your privacy and protects your personal
            information.
          </p>

          <p>
            We collect only the information necessary to process orders,
            improve your shopping experience, and provide customer support.
          </p>

          <p>
            Your personal information is never sold to third parties.
          </p>

          <p>
            This Privacy Policy will be updated as new services become
            available.
          </p>
        </div>
      </div>
    </div>
  );
}
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
          Support
        </p>

        <h1 className="text-5xl font-black mb-6">Contact Us</h1>

        <p className="text-slate-400 max-w-2xl leading-8 mb-10">
          Have questions about your order, shipping, returns, or products?
          Our support team is here to help.
        </p>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Email</h2>
            <p className="text-slate-400">support@poshmanstyle.com</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Business Hours</h2>
            <p className="text-slate-400">
              Saturday – Thursday
              <br />
              10:00 AM – 8:00 PM
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Facebook</h2>
            <a
              href="https://www.facebook.com/Poshmanstyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              facebook.com/Poshmanstyle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
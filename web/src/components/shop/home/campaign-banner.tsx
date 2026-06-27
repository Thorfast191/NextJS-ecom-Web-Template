import Link from "next/link";

export default function CampaignBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="relative overflow-hidden rounded-[48px] border border-white/10 bg-black">
        {/* IMAGE */}

        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2070&auto=format&fit=crop"
          alt="Campaign"
          className="w-full h-[700px] object-cover"
        />

        {/* OVERLAYS */}

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        {/* LIGHT EFFECTS */}

        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-600/20 blur-[180px]" />

        {/* CONTENT */}

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl px-10 lg:px-20">
            <p className="uppercase tracking-[10px] text-blue-400 text-sm">
              Poshman Style
            </p>

            <h2 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-none">
              ELEVATE
              <br />
              YOUR STYLE
            </h2>

            <p className="mt-8 text-slate-300 text-lg leading-8 max-w-lg">
              Designed for modern lifestyles. Premium fabrics, timeless
              silhouettes and effortless confidence in every piece.
            </p>

            <Link
              href="/shop"
              className="
                inline-flex
                mt-10
                h-14
                px-10
                rounded-full
                bg-white
                text-black
                items-center
                justify-center
                font-semibold
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

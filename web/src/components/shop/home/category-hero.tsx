"use client";

import Link from "next/link";

interface Props {
  onExploreClick: () => void;
}

export default function CategoryHero({ onExploreClick }: Props) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-slate-950" />

        <div className="absolute top-0 right-0 h-[700px] w-[700px] bg-blue-500/10 blur-[220px]" />

        <div className="absolute bottom-0 left-0 h-[700px] w-[700px] bg-indigo-500/10 blur-[220px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* CONTENT */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="grid min-h-[85vh] grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <p className="mb-8 text-sm uppercase tracking-[10px] text-blue-400">
              POSHMAN STYLE
            </p>

            <h1 className="text-6xl font-black leading-none md:text-7xl lg:text-[7rem]">
              MODERN
              <br />
              FASHION
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
              Premium streetwear, luxury essentials and timeless silhouettes
              crafted for the next generation.
            </p>

            <div className="mt-8 flex flex-wrap gap-5 text-sm uppercase tracking-wider text-slate-400">
              <span className="text-blue-400">✦ Luxury</span>
              <span>✦ Streetwear</span>
              <span>✦ Premium</span>
              <span>✦ Trending</span>
              <span>✦ Most Wanted</span>
            </div>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  px-8
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Shop Collection
              </Link>

              <button
                onClick={onExploreClick}
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  px-8
                  transition-all
                  duration-300
                  hover:border-white/30
                  hover:bg-white/5
                "
              >
                Explore
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2070&auto=format&fit=crop"
                alt="Fashion"
                className="h-[620px] w-full object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[5px] text-blue-400">
                  Featured Collection
                </p>

                <h3 className="mt-3 text-2xl font-black">Luxury Streetwear</h3>

                <p className="mt-2 text-sm text-slate-400">
                  Premium oversized silhouettes and timeless essentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}

      <div className="pointer-events-none absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-10 px-6 py-5 text-xs uppercase tracking-[4px] text-slate-500">
          <span>Premium Fashion</span>
          <span>Streetwear</span>
          <span>Luxury Essentials</span>
          <span>Trending Now</span>
          <span>Most Wanted</span>
          <span>Poshman Style</span>
        </div>
      </div>
    </section>
  );
}

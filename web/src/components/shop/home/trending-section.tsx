import Link from "next/link";
import ProductCard from "../product/product-card";

interface Props {
  products: any[];
}

export default function TrendingSection({ products }: Props) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-orange-500/10 blur-[220px]" />

        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-red-500/10 blur-[220px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/5 blur-[260px]" />
      </div>

      {/* GRID */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="uppercase tracking-[8px] text-orange-400 text-sm">
              Trending Now
            </p>

            <h2 className="mt-5 text-5xl lg:text-6xl font-black leading-none">
              Most Popular
              <br />
              This Week
            </h2>

            <p className="mt-6 text-slate-400 max-w-xl text-lg">
              Discover the styles currently leading the conversation and
              defining the season.
            </p>
          </div>

          <Link
            href="/trending"
            className="
              h-14
              px-8
              rounded-full
              border
              border-white/10
              hover:border-orange-400
              hover:bg-orange-500/10
              transition-all
              duration-300
              flex
              items-center
              justify-center
              w-fit
            "
          >
            View All →
          </Link>
        </div>

        {/* FEATURE STRIP */}

        <div className="mb-10">
          <div className="rounded-[32px] border border-orange-500/20 bg-orange-500/[0.03] backdrop-blur-xl p-6">
            <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[3px] text-orange-300">
              <span>🔥 Streetwear</span>
              <span>🔥 Oversized Fits</span>
              <span>🔥 Premium Essentials</span>
              <span>🔥 Graphic Tees</span>
              <span>🔥 Customer Favorites</span>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="
                relative
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              {/* ONLY TOP 2 GET HOT BADGE */}

              {index < 2 && (
                <div className="absolute top-4 left-4 z-30">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-orange-500
                      text-black
                      text-xs
                      font-black
                    "
                  >
                    HOT
                  </span>
                </div>
              )}

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

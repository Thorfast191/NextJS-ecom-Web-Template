import Link from "next/link";
import ProductCard from "../product/product-card";

interface Props {
  products: any[];
}

export default function NewArrivalsSection({ products }: Props) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-blue-500/10 blur-[220px]" />

        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-purple-500/10 blur-[220px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="uppercase tracking-[8px] text-blue-400 text-sm">
              New Arrivals
            </p>

            <h2 className="mt-5 text-5xl lg:text-6xl font-black leading-none">
              Latest
              <br />
              Collections
            </h2>

            <p className="mt-6 text-slate-400 max-w-xl text-lg">
              Discover the newest additions to our premium fashion collection.
            </p>
          </div>

          <Link
            href="/new-arrivals"
            className="
              h-14
              px-8
              rounded-full
              border
              border-white/10
              hover:border-blue-400
              hover:bg-blue-500/10
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

        {/* FEATURED ARRIVAL */}

        {products.length > 0 && (
          <div className="mb-10">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="uppercase tracking-[6px] text-blue-400 text-xs">
                    Featured Arrival
                  </p>

                  <h3 className="mt-3 text-2xl lg:text-3xl font-black">
                    Freshly Added Pieces
                  </h3>
                </div>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400">
                  New Season
                </div>
              </div>
            </div>
          </div>
        )}

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
              {/* ONLY FIRST 2 GET NEW BADGE */}

              {index < 2 && (
                <div className="absolute top-4 left-4 z-30">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                      bg-blue-500
                      text-white
                    "
                  >
                    NEW
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

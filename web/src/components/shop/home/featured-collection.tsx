import Link from "next/link";
import ProductCard from "../product/product-card";

interface Props {
  products: any[];
}

export default function FeaturedCollection({ products }: Props) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-blue-500/10 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}

        <div className="mb-14">
          <p className="uppercase tracking-[8px] text-blue-400 text-sm">
            Featured Collection
          </p>

          <h2 className="mt-5 text-5xl lg:text-6xl font-black leading-none">
            Spring / Summer
            <br />
            Collection
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl">
            Curated essentials and statement pieces crafted for modern fashion.
          </p>
        </div>

        {/* LAYOUT */}

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8">
          {/* FEATURE BANNER */}

          <div className="group relative overflow-hidden rounded-[40px] border border-white/10 min-h-[580px]">
            {/* IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070&auto=format&fit=crop"
              alt="Featured Collection"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-transform
                duration-1000
                group-hover:scale-110
              "
            />

            {/* OVERLAYS */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

            {/* CONTENT CARD */}

            <div
              className="
                absolute
                bottom-8
                left-8
                right-8
                lg:max-w-xl
                rounded-[32px]
                border
                border-white/10
                bg-black/30
                backdrop-blur-xl
                p-8
              "
            >
              <p className="uppercase tracking-[8px] text-blue-400 text-sm">
                Featured Collection
              </p>

              <h3 className="mt-4 text-4xl lg:text-5xl font-black leading-tight">
                Essentials
                <br />
                For The Modern
                <br />
                Wardrobe
              </h3>

              <p className="mt-5 text-slate-300 leading-7">
                Premium fabrics, relaxed silhouettes and timeless pieces
                designed for everyday luxury.
              </p>

              <Link
                href="/shop"
                className="
                  inline-flex
                  mt-8
                  h-14
                  px-8
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="grid grid-cols-2 gap-6">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="
                  relative
                  rounded-3xl
                  transition-all
                  duration-500
                  hover:-translate-y-1
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    rounded-3xl
                    opacity-0
                    hover:opacity-100
                    transition-all
                    duration-500
                    bg-gradient-to-br
                    from-blue-500/10
                    via-transparent
                    to-purple-500/10
                    pointer-events-none
                  "
                />

                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import ProductCard from "../product/product-card";

interface Props {
  products: any[];
}

export default function BestSellersSection({ products }: Props) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* LUXURY GOLD GLOW */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[400px]
            bg-yellow-500/5
            blur-[200px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            w-[500px]
            h-[500px]
            bg-amber-500/5
            blur-[180px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[8px] text-yellow-400 text-sm">
            MOST WANTED
          </p>

          <h2 className="text-5xl lg:text-6xl font-black mt-5">
            Best Selling Pieces
          </h2>

          <p className="text-slate-400 mt-4">
            The products our customers keep coming back for
          </p>
        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="
                relative
                group
                rounded-3xl
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              {/* TOP 3 RANKINGS */}

              {index < 3 && (
                <div className="absolute -top-4 left-4 z-40">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-gradient-to-br
                      from-yellow-300
                      to-yellow-600
                      text-black
                      flex
                      items-center
                      justify-center
                      font-black
                      text-lg
                      shadow-[0_0_30px_rgba(250,204,21,.35)]
                    "
                  >
                    #{index + 1}
                  </div>
                </div>
              )}

              {/* TOP 3 PREMIUM BORDER */}

              {index < 3 && (
                <div
                  className="
                    absolute
                    inset-0
                    rounded-3xl
                    border
                    border-yellow-500/20
                    pointer-events-none
                    z-20
                  "
                />
              )}

              {/* SHIMMER EFFECT */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition
                  duration-500
                  bg-gradient-to-r
                  from-transparent
                  via-yellow-500/10
                  to-transparent
                  pointer-events-none
                  z-10
                "
              />

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

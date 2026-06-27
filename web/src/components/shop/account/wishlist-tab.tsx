import Link from "next/link";

interface Props {
  wishlists: any[];
}

export default function WishlistTab({ wishlists }: Props) {
  if (!wishlists.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
        <h2 className="text-2xl font-black">Wishlist Empty</h2>

        <p className="mt-3 text-slate-400">
          Save products you love and find them here later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {wishlists.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.product.slug}`}
          className="
            group
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-slate-900/40
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-500/40
          "
        >
          {/* IMAGE */}

          <div className="overflow-hidden">
            <img
              src={
                item.product.images?.[0]?.imageUrl ||
                item.product.imageUrl ||
                "/placeholder-product.jpg"
              }
              alt={item.product.name}
              className="
                aspect-square
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </div>

          {/* CONTENT */}

          <div className="p-5">
            <h3 className="line-clamp-2 font-bold">{item.product.name}</h3>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-black">৳ {item.product.price}</span>

              <span className="text-sm text-blue-400">View Product →</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

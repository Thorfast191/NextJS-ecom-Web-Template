import Link from "next/link";

interface Props {
  wishlists: any[];
}

export default function WishlistPreview({ wishlists }: Props) {
  if (wishlists.length === 0) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 text-slate-400">
        No wishlist products
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {wishlists.map((wishlist) => (
        <Link
          key={wishlist.id}
          href={`/shop/${wishlist.product.slug}`}
          className="group bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500 transition duration-300"
        >
          {/* IMAGE */}

          {wishlist.product.imageUrl ? (
            <div className="overflow-hidden">
              <img
                src={wishlist.product.imageUrl}
                alt={wishlist.product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-slate-800 flex items-center justify-center text-slate-500">
              No Image
            </div>
          )}

          {/* CONTENT */}

          <div className="p-5">
            <h3 className="font-bold line-clamp-1">{wishlist.product.name}</h3>

            <p className="text-blue-400 font-semibold mt-3">
              ৳ {wishlist.product.price}
            </p>

            <p className="text-xs text-slate-500 mt-4">Added to wishlist</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

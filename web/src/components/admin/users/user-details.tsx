interface Props {
  user: any;
}

export default function UserDetails({ user }: Props) {
  const totalSpent = user.orders.reduce(
    (acc: number, order: any) => acc + order.total,
    0,
  );

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div className="flex items-center gap-5">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || ""}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-black">
            {user.name?.charAt(0)}
          </div>
        )}

        <div>
          <h1 className="text-5xl font-black">{user.name}</h1>

          <p className="text-slate-400 mt-2">{user.email}</p>
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-slate-400">Orders</p>

          <h2 className="text-4xl font-black mt-3">{user.orders.length}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-slate-400">Wishlist</p>

          <h2 className="text-4xl font-black mt-3">{user.wishlists.length}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-slate-400">Total Spent</p>

          <h2 className="text-4xl font-black mt-3">৳ {totalSpent}</h2>
        </div>
      </div>

      {/* WISHLIST */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-8">Wishlist Products</h2>

        {user.wishlists.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-400">
            No wishlist products
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {user.wishlists.map((wishlist: any) => (
              <div
                key={wishlist.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden"
              >
                {wishlist.product.imageUrl ? (
                  <img
                    src={wishlist.product.imageUrl}
                    alt={wishlist.product.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-slate-800 flex items-center justify-center text-slate-500">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-bold line-clamp-1">
                    {wishlist.product.name}
                  </h3>

                  <p className="text-blue-400 font-semibold mt-3">
                    ৳ {wishlist.product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

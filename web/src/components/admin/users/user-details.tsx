interface Props {
  user: any;
}

export default function UserDetails({ user }: Props) {
  const totalSpent = user.orders.reduce(
    (acc: number, order: any) => acc + order.total,
    0,
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center gap-6">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || ""}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 text-4xl font-black">
              {user.name?.charAt(0)}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-black">{user.name}</h1>

            <p className="mt-2 text-slate-400">{user.email}</p>

            <div className="mt-4 flex gap-3">
              <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
                {user.role}
              </span>

              {user.isActive ? (
                <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                  Active
                </span>
              ) : (
                <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">
                  Disabled
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Orders</p>

          <h2 className="mt-3 text-5xl font-black">{user.orders.length}</h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Wishlist</p>

          <h2 className="mt-3 text-5xl font-black">{user.wishlists.length}</h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Total Spent</p>

          <h2 className="mt-3 text-4xl font-black text-green-400">
            ৳ {totalSpent.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* ORDERS */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="text-2xl font-black">Orders</h2>
        </div>

        {user.orders.length === 0 ? (
          <div className="p-6 text-slate-400">No orders found.</div>
        ) : (
          <table className="min-w-full">
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr className="text-left text-sm text-slate-400">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {user.orders.map((order: any) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 font-semibold">
                    #{order.id.slice(0, 8)}
                  </td>

                  <td className="px-6 py-4">{order.status}</td>

                  <td className="px-6 py-4">{order.paymentMethod}</td>

                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right font-bold text-green-400">
                    ৳ {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* WISHLIST */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="text-2xl font-black">Wishlist</h2>
        </div>

        {user.wishlists.length === 0 ? (
          <div className="p-6 text-slate-400">No wishlist products.</div>
        ) : (
          <table className="min-w-full">
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr className="text-left text-sm text-slate-400">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Added</th>
              </tr>
            </thead>

            <tbody>
              {user.wishlists.map((wishlist: any) => (
                <tr
                  key={wishlist.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4">
                    {wishlist.product.imageUrl ? (
                      <img
                        src={wishlist.product.imageUrl}
                        alt={wishlist.product.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-500">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {wishlist.product.name}
                  </td>

                  <td className="px-6 py-4 text-blue-400 font-bold">
                    ৳ {wishlist.product.price}
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {new Date(wishlist.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

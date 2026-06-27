"use client";

interface Props {
  orders: any[];
}

export default function OrdersTab({ orders }: Props) {
  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 text-center">
        <h2 className="text-2xl font-black">No Orders Yet</h2>

        <p className="mt-3 text-slate-400">
          Your orders will appear here after your first purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-slate-900/40
            backdrop-blur-xl
          "
        >
          {/* HEADER */}

          <div className="border-b border-white/10 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-black">
                  Order #{order.id.slice(-8).toUpperCase()}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase">
                  {order.paymentMethod}
                </span>

                <span
                  className={`
                    rounded-full px-4 py-2 text-xs font-bold uppercase
                    ${
                      order.isPaid
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>

                <span
                  className={`
                    rounded-full px-4 py-2 text-xs font-bold uppercase
                    ${
                      order.status === "DELIVERED"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "SHIPPED"
                          ? "bg-blue-500/20 text-blue-400"
                          : order.status === "PROCESSING"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-orange-500/20 text-orange-400"
                    }
                  `}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="grid gap-8 p-6 xl:grid-cols-[1.5fr_380px]">
            {/* PRODUCTS */}

            <div>
              <h4 className="mb-5 text-lg font-bold">Ordered Products</h4>

              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-white/10
                      bg-slate-950/50
                      p-4
                    "
                  >
                    <img
                      src={
                        item.product.images?.[0]?.imageUrl ||
                        item.product.imageUrl ||
                        "/placeholder-product.jpg"
                      }
                      alt={item.product.name}
                      className="
                        h-20
                        w-20
                        rounded-xl
                        border
                        border-white/10
                        object-cover
                        bg-slate-900
                      "
                    />

                    <div className="flex-1">
                      <h5 className="font-semibold">{item.product.name}</h5>

                      {item.variant && (
                        <p className="mt-1 text-xs text-slate-400">
                          {item.variant.color && `Color: ${item.variant.color}`}
                          {item.variant.color && item.variant.size && " • "}
                          {item.variant.size && `Size: ${item.variant.size}`}
                        </p>
                      )}

                      <p className="mt-2 text-sm text-slate-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">৳ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER INFO */}

            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <h4 className="mb-5 text-lg font-bold">Order Information</h4>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-500">Customer Name</p>

                  <p className="mt-1">{order.customerName || "N/A"}</p>
                </div>

                <div>
                  <p className="text-slate-500">Email</p>

                  <p className="mt-1 break-all">
                    {order.customerEmail || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Phone Number</p>

                  <p className="mt-1">{order.shippingPhone || "N/A"}</p>
                </div>

                <div>
                  <p className="text-slate-500">Shipping Address</p>

                  <p className="mt-1 whitespace-pre-wrap">
                    {order.shippingAddress || "N/A"}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shipping Cost</span>

                    <span>৳ {order.shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Discount</span>

                    <span>- ৳ {order.discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-black">
                    <span>Total</span>

                    <span>৳ {order.total.toFixed(2)}</span>
                  </div>
                </div>

                {order.couponCode && (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-green-400">
                    Coupon Applied: {order.couponCode}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();

  // AUTH CHECK

  if (!session?.user?.email) {
    redirect("/shop/login");
  }

  // USER

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/shop/login");
  }

  // ORDERS

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-4 md:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="mb-12">
          <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
            My Orders
          </p>

          <h1 className="text-4xl md:text-5xl font-black">Orders</h1>

          <p className="text-slate-400 mt-4">
            View and track your recent purchases
          </p>
        </div>

        {/* EMPTY */}

        {orders.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold">No Orders Found</h2>

            <p className="text-slate-400 mt-3">
              You haven&apos;t placed any orders yet.
            </p>
          </div>
        )}

        {/* ORDERS */}

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden w-full"
            >
              {/* TOP */}

              <div className="border-b border-slate-800 p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* ORDER ID */}

                  <div>
                    <p className="text-slate-400 text-sm">Order ID</p>

                    <p className="font-bold mt-2 break-all">
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>

                  {/* DATE */}

                  <div>
                    <p className="text-slate-400 text-sm">Date</p>

                    <p className="mt-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* STATUS */}

                  <div>
                    <p className="text-slate-400 text-sm">Status</p>

                    <div className="mt-2">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* TOTAL */}

                  <div>
                    <p className="text-slate-400 text-sm">Total</p>

                    <h2 className="text-2xl font-black mt-2">
                      ৳ {order.total}
                    </h2>
                  </div>
                </div>
              </div>

              {/* ITEMS */}

              <div className="p-6 md:p-8">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 border border-slate-800 bg-slate-950 rounded-2xl p-4 overflow-hidden"
                    >
                      {/* LEFT */}

                      <div className="flex items-center gap-4 min-w-0">
                        {/* IMAGE */}

                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-xl border border-slate-800 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
                            No Image
                          </div>
                        )}

                        {/* INFO */}

                        <div className="min-w-0">
                          <h3 className="font-bold text-lg truncate">
                            {item.product.name}
                          </h3>

                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                            <p>
                              Qty:
                              <span className="text-white ml-1">
                                {item.quantity}
                              </span>
                            </p>

                            <p>
                              Price:
                              <span className="text-white ml-1">
                                ৳ {item.price}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}

                      <div className="text-right flex-shrink-0">
                        <p className="text-slate-400 text-sm">Subtotal</p>

                        <p className="text-xl font-bold mt-1">
                          ৳ {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER */}

              <div className="border-t border-slate-800 px-6 md:px-8 py-6 bg-slate-950/40">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* SHIPPING ADDRESS */}

                  <div>
                    <p className="text-slate-400 text-sm">Shipping Address</p>

                    <p className="mt-2 break-words">
                      {order.shippingAddress || "N/A"}
                    </p>
                  </div>

                  {/* PHONE */}

                  <div>
                    <p className="text-slate-400 text-sm">Phone Number</p>

                    <p className="mt-2">{order.shippingPhone || "N/A"}</p>
                  </div>

                  {/* PAYMENT */}

                  <div>
                    <p className="text-slate-400 text-sm">Payment Method</p>

                    <p className="mt-2">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

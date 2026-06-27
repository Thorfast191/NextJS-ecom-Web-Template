import { updateOrderStatus } from "@/actions/order.actions";

interface Props {
  orders: any[];
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-950">
          <tr className="text-left">
            <th className="p-4">Customer</th>

            <th className="p-4">Phone</th>

            <th className="p-4">Total</th>

            <th className="p-4">Payment</th>

            <th className="p-4">Status</th>

            <th className="p-4">Date</th>

            <th className="p-4">Items</th>

            <th className="p-4">Update</th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-800 align-top">
              {/* CUSTOMER */}

              <td className="p-4">
                <div>
                  <p className="font-semibold">
                    {order.customerName || order.user?.name || "Guest Customer"}
                  </p>

                  {(order.customerEmail || order.user?.email) && (
                    <p className="text-sm text-slate-400">
                      {order.customerEmail || order.user?.email}
                    </p>
                  )}

                  {order.shippingAddress && (
                    <p className="text-sm text-slate-500 mt-1">
                      {order.shippingAddress}
                    </p>
                  )}
                </div>
              </td>

              {/* PHONE */}

              <td className="p-4">{order.shippingPhone}</td>

              {/* TOTAL */}

              <td className="p-4 font-semibold">₹ {order.total}</td>

              {/* PAYMENT */}

              <td className="p-4">
                <div>
                  <p>{order.paymentMethod}</p>

                  <p
                    className={`text-sm ${
                      order.isPaid ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </p>
                </div>
              </td>

              {/* STATUS */}

              <td className="p-4">
                <span
                  className={`text-sm font-medium ${
                    order.status === "DELIVERED"
                      ? "text-green-400"
                      : order.status === "CANCELLED"
                        ? "text-red-400"
                        : order.status === "SHIPPED"
                          ? "text-blue-400"
                          : "text-yellow-400"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* DATE */}

              <td className="p-4 text-sm text-slate-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              {/* ITEMS */}

              <td className="p-4">
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="text-sm">
                      <p>{item.product?.name}</p>

                      <p className="text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </td>

              {/* UPDATE */}

              <td className="p-4">
                <form action={updateOrderStatus} className="space-y-2">
                  <input type="hidden" name="id" value={order.id} />

                  <select
                    name="status"
                    defaultValue={order.status}
                    className="bg-slate-950 border border-slate-800 h-10 px-3 rounded-lg"
                  >
                    <option value="PENDING">PENDING</option>

                    <option value="PAID">PAID</option>

                    <option value="SHIPPED">SHIPPED</option>

                    <option value="DELIVERED">DELIVERED</option>

                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <button className="bg-blue-600 hover:bg-blue-700 h-10 px-4 rounded-lg w-full text-sm">
                    Update
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

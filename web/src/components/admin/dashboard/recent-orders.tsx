interface Props {
  orders: any[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <h2 className="text-3xl font-black mb-8">Recent Orders</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b border-slate-800 pb-5"
          >
            <div>
              <h3 className="font-bold">{order.user?.name || "Guest"}</h3>

              <p className="text-sm text-slate-400 mt-1">{order.user?.email}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">৳ {order.total}</p>

              <p className="text-sm text-slate-400 mt-1">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

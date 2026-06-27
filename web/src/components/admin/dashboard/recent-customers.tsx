interface Props {
  customers: any[];
}

export default function RecentCustomers({ customers }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <h2 className="text-3xl font-black mb-8">Recent Customers</h2>

      <div className="space-y-5">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center gap-5 border-b border-slate-800 pb-5"
          >
            {/* IMAGE */}

            {customer.image ? (
              <img
                src={customer.image}
                alt={customer.name || ""}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold">
                {customer.name?.charAt(0)}
              </div>
            )}

            {/* INFO */}

            <div className="flex-1">
              <h3 className="font-bold">{customer.name}</h3>

              <p className="text-sm text-slate-400 mt-1">{customer.email}</p>
            </div>

            {/* ORDERS */}

            <div className="text-right">
              <p className="font-bold">{customer.orders.length}</p>

              <p className="text-xs text-slate-400 mt-1">Orders</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

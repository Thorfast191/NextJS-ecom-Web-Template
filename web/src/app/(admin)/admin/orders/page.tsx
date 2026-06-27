import { getOrders } from "@/actions/order.actions";

import OrdersTable from "@/components/admin/orders/orders-table";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search || "";

  const orders = await getOrders(1, search);

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">Orders</h1>

        <p className="text-slate-400 mt-2">Manage customer orders</p>
      </div>

      {/* SEARCH */}

      <form>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search order ID, customer name, email..."
          className="w-full h-12 rounded-xl border border-slate-800 bg-slate-900 px-4 text-white"
        />
      </form>

      {/* TABLE */}

      <OrdersTable orders={orders} />
    </div>
  );
}

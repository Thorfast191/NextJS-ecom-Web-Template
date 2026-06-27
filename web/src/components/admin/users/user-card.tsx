import Link from "next/link";

interface Props {
  user: any;
}

export default function UserCard({ user }: Props) {
  const totalSpent = user.orders.reduce(
    (acc: number, order: any) => acc + order.total,
    0,
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition duration-300">
      {/* TOP */}

      <div className="flex items-center gap-4">
        {/* IMAGE */}

        {user.image ? (
          <img
            src={user.image}
            alt={user.name || ""}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-xl font-bold">
            {user.name?.charAt(0)}
          </div>
        )}

        {/* INFO */}

        <div className="flex-1">
          <h2 className="text-xl font-bold">{user.name}</h2>

          <p className="text-slate-400 text-sm break-all mt-1">{user.email}</p>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-3 gap-3 mt-6">
        {/* ORDERS */}

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Orders</p>

          <h3 className="text-2xl font-black mt-2">{user.orders.length}</h3>
        </div>

        {/* WISHLIST */}

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Wishlist</p>

          <h3 className="text-2xl font-black mt-2">{user.wishlists.length}</h3>
        </div>

        {/* SPENT */}

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400">Spent</p>

          <h3 className="text-lg font-black mt-2">৳ {totalSpent}</h3>
        </div>
      </div>

      {/* STATUS */}

      <div className="mt-6 flex items-center justify-between">
        {user.isActive ? (
          <span className="text-green-400 text-sm font-medium">Active</span>
        ) : (
          <span className="text-red-400 text-sm font-medium">Disabled</span>
        )}

        <span className="text-xs text-slate-500">{user.role}</span>
      </div>

      {/* ACTION */}

      <Link
        href={`/admin/users/${user.id}`}
        className="mt-6 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center font-bold"
      >
        View User
      </Link>
    </div>
  );
}

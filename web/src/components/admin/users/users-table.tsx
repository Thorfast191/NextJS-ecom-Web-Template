import Link from "next/link";

interface Props {
  users: any[];
}

export default function UsersTable({ users }: Props) {
  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-slate-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr className="text-left text-sm uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">User</th>

              <th className="px-6 py-4">Email</th>

              <th className="px-6 py-4 text-center">Orders</th>

              <th className="px-6 py-4 text-center">Wishlist</th>

              <th className="px-6 py-4 text-right">Spent</th>

              <th className="px-6 py-4 text-center">Role</th>

              <th className="px-6 py-4 text-center">Status</th>

              <th className="px-6 py-4 text-center">Joined</th>

              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const totalSpent = user.orders.reduce(
                (acc: number, order: any) => acc + order.total,
                0,
              );

              return (
                <tr
                  key={user.id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/40"
                >
                  {/* USER */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || ""}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 font-bold">
                          {user.name?.charAt(0)}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold">{user.name}</p>

                        <p className="text-xs text-slate-500">
                          ID: {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}

                  <td className="px-6 py-5 text-slate-300">{user.email}</td>

                  {/* ORDERS */}

                  <td className="px-6 py-5 text-center font-semibold">
                    {user.orders.length}
                  </td>

                  {/* WISHLIST */}

                  <td className="px-6 py-5 text-center font-semibold">
                    {user.wishlists.length}
                  </td>

                  {/* SPENT */}

                  <td className="px-6 py-5 text-right font-bold text-green-400">
                    ৳ {totalSpent.toLocaleString()}
                  </td>

                  {/* ROLE */}

                  <td className="px-6 py-5 text-center">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5 text-center">
                    {user.isActive ? (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                        Disabled
                      </span>
                    )}
                  </td>

                  {/* JOINED */}

                  <td className="px-6 py-5 text-center text-sm text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700"
                      >
                        View
                      </Link>

                      <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800">
                        {user.isActive ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

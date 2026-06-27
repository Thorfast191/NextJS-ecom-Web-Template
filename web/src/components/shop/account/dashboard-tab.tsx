interface Props {
  user: any;
}

export default function DashboardTab({ user }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
        <h2 className="text-2xl font-black mb-4">Profile Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-2">Name</p>

            <div className="h-12 rounded-xl border border-white/10 bg-slate-950 px-4 flex items-center">
              {user.name || "Customer"}
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">Email</p>

            <div className="h-12 rounded-xl border border-white/10 bg-slate-950 px-4 flex items-center">
              {user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-500 text-sm">Orders</p>

          <h3 className="mt-3 text-4xl font-black">{user.orders.length}</h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-500 text-sm">Wishlist</p>

          <h3 className="mt-3 text-4xl font-black">{user.wishlists.length}</h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-500 text-sm">Account</p>

          <h3 className="mt-3 text-2xl font-black">Customer</h3>
        </div>
      </div>
    </div>
  );
}

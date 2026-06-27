"use client";

export default function AddressForm({ user }: { user: any }) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black">Address Information</h2>

        <p className="mt-2 text-sm text-slate-500">
          Manage your shipping and billing address.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Country</label>

          <input
            defaultValue={user.country ?? ""}
            placeholder="Bangladesh"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            State / Division
          </label>

          <input
            defaultValue={user.state ?? ""}
            placeholder="Dhaka"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">City</label>

          <input
            defaultValue={user.city ?? ""}
            placeholder="Dhaka"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Postal Code
          </label>

          <input
            defaultValue={user.postalCode ?? ""}
            placeholder="1207"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Address Line 1
          </label>

          <input
            defaultValue={user.addressLine1 ?? ""}
            placeholder="House, Road, Area"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Address Line 2
          </label>

          <input
            defaultValue={user.addressLine2 ?? ""}
            placeholder="Apartment, Floor, Landmark (Optional)"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>
      </div>

      <button
        className="
          mt-5
          h-11
          rounded-xl
          bg-white
          px-6
          text-black
          font-semibold
          transition-all
          hover:scale-[1.02]
        "
      >
        Save Address
      </button>
    </div>
  );
}

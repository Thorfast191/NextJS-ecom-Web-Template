import { createShippingMethod } from "@/actions/shipping.actions";

export default function ShippingForm() {
  return (
    <form
      action={createShippingMethod}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">Create Shipping Method</h2>

      {/* NAME */}

      <div>
        <label className="block mb-2 text-sm">Name</label>

        <input
          name="name"
          required
          placeholder="Inside Dhaka"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* PRICE */}

      <div>
        <label className="block mb-2 text-sm">Shipping Cost</label>

        <input
          type="number"
          name="price"
          required
          placeholder="70"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* DAYS */}

      <div>
        <label className="block mb-2 text-sm">Estimated Delivery</label>

        <input
          name="estimatedDays"
          placeholder="1-2 Days"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* PICKUP */}

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isPickup" />
        Store Pickup
      </label>

      {/* ACTIVE */}

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isActive" defaultChecked />
        Active
      </label>

      {/* BUTTON */}

      <button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-lg">
        Create Shipping Method
      </button>
    </form>
  );
}

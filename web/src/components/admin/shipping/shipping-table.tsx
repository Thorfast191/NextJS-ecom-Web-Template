import { deleteShippingMethod } from "@/actions/shipping.actions";

import { Trash2 } from "lucide-react";

interface Props {
  methods: any[];
}

export default function ShippingTable({ methods }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-950">
          <tr className="text-left">
            <th className="p-4">Name</th>

            <th className="p-4">Cost</th>

            <th className="p-4">Delivery Time</th>

            <th className="p-4">Pickup</th>

            <th className="p-4">Status</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {methods.map((method) => (
            <tr key={method.id} className="border-t border-slate-800">
              {/* NAME */}

              <td className="p-4 font-medium">{method.name}</td>

              {/* PRICE */}

              <td className="p-4">₹ {method.price}</td>

              {/* DAYS */}

              <td className="p-4 text-slate-400">{method.estimatedDays}</td>

              {/* PICKUP */}

              <td className="p-4">{method.isPickup ? "Yes" : "No"}</td>

              {/* STATUS */}

              <td className="p-4">
                {method.isActive ? (
                  <span className="text-green-400">Active</span>
                ) : (
                  <span className="text-red-400">Disabled</span>
                )}
              </td>

              {/* ACTIONS */}

              <td className="p-4">
                <form
                  action={async () => {
                    "use server";

                    await deleteShippingMethod(method.id);
                  }}
                >
                  <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg">
                    <Trash2 size={18} />
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

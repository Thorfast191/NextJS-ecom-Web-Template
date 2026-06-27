import { getShippingMethods } from "@/actions/shipping.actions";

import ShippingForm from "@/components/admin/shipping/shipping-form";

import ShippingTable from "@/components/admin/shipping/shipping-table";

export default async function ShippingPage() {
  const methods = await getShippingMethods();

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">Shipping</h1>

        <p className="text-slate-400 mt-2">Manage delivery methods</p>
      </div>

      {/* CREATE */}

      <ShippingForm />

      {/* TABLE */}

      <ShippingTable methods={methods} />
    </div>
  );
}

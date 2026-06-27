interface ShippingMethod {
  id: string;

  name: string;

  price: number;

  estimatedDays?: string | null;

  isPickup: boolean;
}

interface Props {
  selectedShippingId: string;

  setSelectedShippingId: (value: string) => void;

  shippingMethods: ShippingMethod[];
}

export default function ShippingSelector({
  selectedShippingId,
  setSelectedShippingId,
  shippingMethods,
}: Props) {
  return (
    <div>
      <label className="block mb-3 text-sm text-slate-400">
        Shipping Method
      </label>

      <select
        value={selectedShippingId}
        onChange={(e) => setSelectedShippingId(e.target.value)}
        className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
      >
        {shippingMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name} — ৳ {method.price}
          </option>
        ))}
      </select>
    </div>
  );
}

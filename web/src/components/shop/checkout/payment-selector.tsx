interface Props {
  paymentMethod: string;

  setPaymentMethod: (value: string) => void;
}

export default function PaymentSelector({
  paymentMethod,
  setPaymentMethod,
}: Props) {
  return (
    <div>
      <label className="block mb-3 text-sm text-slate-400">
        Payment Method
      </label>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800"
      >
        <option value="COD">Cash On Delivery</option>

        <option value="BKASH" disabled>
          bKash (Coming Soon)
        </option>

        <option value="NAGAD" disabled>
          Nagad (Coming Soon)
        </option>

        <option value="STRIPE" disabled>
          Stripe (Coming Soon)
        </option>
      </select>
    </div>
  );
}

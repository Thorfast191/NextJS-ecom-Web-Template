"use client";

import ShippingSelector from "./shipping-selector";

import PaymentSelector from "./payment-selector";

interface ShippingMethod {
  id: string;

  name: string;

  price: number;

  estimatedDays?: string | null;

  isPickup: boolean;
}

interface Props {
  fullName: string;

  setFullName: (value: string) => void;

  phone: string;

  setPhone: (value: string) => void;

  address: string;

  setAddress: (value: string) => void;

  paymentMethod: string;

  setPaymentMethod: (value: string) => void;

  selectedShippingId: string;

  setSelectedShippingId: (value: string) => void;

  shippingMethods: ShippingMethod[];

  isPickup: boolean;
}

export default function CheckoutForm({
  fullName,
  setFullName,
  phone,
  setPhone,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  selectedShippingId,
  setSelectedShippingId,
  shippingMethods,
  isPickup,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <h1 className="text-4xl font-black mb-10">Checkout</h1>

      <div className="space-y-6">
        {/* NAME */}

        <div>
          <label className="block mb-3 text-sm text-slate-400">Full Name</label>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="block mb-3 text-sm text-slate-400">
            Phone Number
          </label>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* SHIPPING */}

        <ShippingSelector
          selectedShippingId={selectedShippingId}
          setSelectedShippingId={setSelectedShippingId}
          shippingMethods={shippingMethods}
        />

        {/* ADDRESS */}

        {!isPickup && (
          <div>
            <label className="block mb-3 text-sm text-slate-400">
              Shipping Address
            </label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, Road, Area"
              rows={5}
              className="w-full p-5 rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* PAYMENT */}

        <PaymentSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
    </div>
  );
}

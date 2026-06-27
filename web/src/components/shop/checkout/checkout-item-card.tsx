interface Props {
  item: any;
}

export default function CheckoutItemCard({ item }: Props) {
  return (
    <div className="border-b border-slate-800 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <img
            src={item.imageUrl || "/placeholder.png"}
            alt={item.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />

          <div>
            <p className="font-semibold">{item.name}</p>

            {/* VARIANTS */}

            <div className="flex gap-2 mt-2">
              {item.size && (
                <span className="px-2 py-1 rounded-lg bg-slate-800 text-xs">
                  Size: {item.size}
                </span>
              )}

              {item.color && (
                <span className="px-2 py-1 rounded-lg bg-slate-800 text-xs">
                  Color: {item.color}
                </span>
              )}
            </div>

            {/* QUANTITY */}

            <p className="text-sm text-slate-400 mt-3">Qty: {item.quantity}</p>

            {/* DISCOUNT */}

            {item.discountType && item.discountValue && (
              <div className="mt-2">
                <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
                  {item.discountType === "PERCENTAGE"
                    ? `${item.discountValue}% OFF`
                    : `৳${item.discountValue} OFF`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PRICE */}

        <div className="text-right">
          <p className="font-bold">৳ {item.price * item.quantity}</p>

          {item.originalPrice && item.originalPrice > item.price && (
            <p className="text-sm text-slate-500 line-through mt-1">
              ৳ {item.originalPrice * item.quantity}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

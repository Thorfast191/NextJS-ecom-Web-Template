interface Props {
  products: any[];
}

export default function TopProducts({ products }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <h2 className="text-3xl font-black mb-8">Top Selling Products</h2>

      <div className="space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-5 border-b border-slate-800 pb-5"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-slate-800" />
            )}

            <div className="flex-1">
              <h3 className="font-bold">{product.name}</h3>

              <p className="text-slate-400 text-sm mt-1">
                Sold: {product.sold}
              </p>
            </div>

            <p className="font-bold">৳ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

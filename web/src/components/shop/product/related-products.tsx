import Link from "next/link";

interface Props {
  products: any[];
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-10">Related Products</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:scale-[1.02] transition"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-bold">{product.name}</h3>

              <p className="text-slate-400 mt-2">₹ {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

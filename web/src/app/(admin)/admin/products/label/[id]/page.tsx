import { prisma } from "@/lib/prisma";

import BarcodeLabel from "@/components/admin/products/barcode-label";
import PrintButton from "@/components/admin/products/print-button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BarcodeLabelPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return (
      <div className="p-10">
        <h1>Product not found</h1>
      </div>
    );
  }

  const barcodeValue = product.barcode || product.sku || product.id;

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="border-2 border-black p-8 w-[400px]">
        <h1 className="font-bold text-xl">POSHMANSTYLE</h1>

        <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>

        <div className="mt-6">
          <BarcodeLabel value={barcodeValue} />
        </div>

        {product.sku && <p className="mt-3">SKU: {product.sku}</p>}

        <p className="mt-3 font-bold">৳ {product.price}</p>
      </div>

      <PrintButton />
    </div>
  );
}

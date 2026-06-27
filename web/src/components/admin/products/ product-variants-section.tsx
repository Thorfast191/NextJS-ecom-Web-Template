"use client";

import { memo } from "react";

interface Props {
  variants: any[];
  setVariants: React.Dispatch<React.SetStateAction<any[]>>;
}

function ProductVariantsSection({ variants, setVariants }: Props) {
  function addVariant() {
    setVariants((prev) => [
      ...prev,
      {
        size: "",
        color: "",
        sku: "",
        barcode: "",
        stock: 0,
        price: "",
        comparePrice: "",
      },
    ]);
  }

  function removeVariant(index: number) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, field: string, value: string | number) {
    setVariants((prev) => {
      const next = [...prev];

      next[index] = {
        ...next[index],
        [field]: value,
      };

      return next;
    });
  }

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Variants</h3>

          <p className="text-sm text-slate-400">
            Add sizes, colors, SKU, barcode and stock
          </p>
        </div>

        <button
          type="button"
          onClick={addVariant}
          className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          Add Variant
        </button>
      </div>

      {variants.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-slate-400">
          No variants added.
        </div>
      )}

      {variants.map((variant, index) => (
        <div
          key={index}
          className="grid lg:grid-cols-6 gap-3 border border-slate-800 rounded-xl p-4"
        >
          <input
            placeholder="SKU"
            value={variant.sku || ""}
            onChange={(e) => updateVariant(index, "sku", e.target.value)}
            className="h-11 px-3 rounded-lg bg-slate-900 border border-slate-800"
          />

          <input
            placeholder="Barcode"
            value={variant.barcode || ""}
            onChange={(e) => updateVariant(index, "barcode", e.target.value)}
            className="h-11 px-3 rounded-lg bg-slate-900 border border-slate-800"
          />

          <input
            placeholder="Color"
            value={variant.color || ""}
            onChange={(e) => updateVariant(index, "color", e.target.value)}
            className="h-11 px-3 rounded-lg bg-slate-900 border border-slate-800"
          />

          <input
            placeholder="Size"
            value={variant.size || ""}
            onChange={(e) => updateVariant(index, "size", e.target.value)}
            className="h-11 px-3 rounded-lg bg-slate-900 border border-slate-800"
          />

          <input
            type="number"
            placeholder="Stock"
            value={variant.stock ?? ""}
            onChange={(e) =>
              updateVariant(
                index,
                "stock",
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className="
    h-11
    px-3
    rounded-lg
    bg-slate-900
    border
    border-slate-800
  "
          />

          <button
            type="button"
            onClick={() => removeVariant(index)}
            className="h-11 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default memo(ProductVariantsSection);

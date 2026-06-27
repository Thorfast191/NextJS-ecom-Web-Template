"use client";

import { useState } from "react";

interface Props {
  product: any;
  onClose: () => void;
}

export default function VariantManagerModal({ product, onClose }: Props) {
  const [variants, setVariants] = useState(product.variants || []);

  function addVariant() {
    setVariants((prev: any[]) => [
      ...prev,
      {
        id: undefined,
        size: "",
        color: "",
        sku: "",
        barcode: "",
        stock: "",
        price: "",
        comparePrice: "",
      },
    ]);
  }

  function removeVariant(index: number) {
    setVariants((prev: any[]) => prev.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, field: string, value: any) {
    setVariants((prev: any[]) => {
      const next = [...prev];

      next[index] = {
        ...next[index],
        [field]: value,
      };

      return next;
    });
  }

  async function saveChanges() {
    try {
      const { updateProductVariants } =
        await import("@/actions/product-variant.actions");

      await updateProductVariants(product.id, variants);

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to save variants");
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-6xl
          h-[90vh]
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-slate-800
            p-8
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black">Manage Variants</h2>

              <p className="mt-2 text-slate-400">{product.name}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={addVariant}
                className="
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  hover:bg-blue-700
                "
              >
                Add Variant
              </button>

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-3
                  hover:bg-red-700
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-8
            space-y-4
          "
        >
          {variants.map((variant: any, index: number) => (
            <div
              key={variant.id || index}
              className="
                  grid
                  lg:grid-cols-6
                  gap-3
                  rounded-2xl
                  border
                  border-slate-800
                  p-4
                "
            >
              <select
                value={variant.size || ""}
                onChange={(e) => updateVariant(index, "size", e.target.value)}
                className="
                    h-12
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-950
                    px-3
                  "
              >
                <option value="">Size</option>

                <option value="XS">XS</option>

                <option value="S">S</option>

                <option value="M">M</option>

                <option value="L">L</option>

                <option value="XL">XL</option>

                <option value="XXL">XXL</option>
              </select>

              <input
                value={variant.color || ""}
                onChange={(e) => updateVariant(index, "color", e.target.value)}
                placeholder="Color"
                className="
                    h-12
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-950
                    px-3
                  "
              />

              <input
                value={variant.sku || ""}
                onChange={(e) => updateVariant(index, "sku", e.target.value)}
                placeholder="SKU"
                className="
                    h-12
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-950
                    px-3
                  "
              />

              <input
                value={variant.barcode || ""}
                onChange={(e) =>
                  updateVariant(index, "barcode", e.target.value)
                }
                placeholder="Barcode"
                className="
                    h-12
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-950
                    px-3
                  "
              />

              <input
                type="text"
                inputMode="numeric"
                value={variant.stock ?? ""}
                onChange={(e) => updateVariant(index, "stock", e.target.value)}
                placeholder="Stock"
                className="
                    h-12
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-950
                    px-3
                  "
              />

              <button
                onClick={() => removeVariant(index)}
                className="
                    h-12
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                  "
              >
                Delete
              </button>
            </div>
          ))}

          {variants.length === 0 && (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-700
                p-8
                text-center
                text-slate-400
              "
            >
              No variants found
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            border-t
            border-slate-800
            p-6
            flex
            justify-end
            gap-3
            bg-slate-900
          "
        >
          <button
            onClick={onClose}
            className="
              rounded-xl
              bg-slate-700
              px-6
              py-3
            "
          >
            Cancel
          </button>

          <button
            onClick={saveChanges}
            className="
              rounded-xl
              bg-green-600
              px-6
              py-3
              hover:bg-green-700
            "
          >
            Save Variants
          </button>
        </div>
      </div>
    </div>
  );
}

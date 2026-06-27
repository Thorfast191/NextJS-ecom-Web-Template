"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createProduct, updateProduct } from "@/actions/product.actions";
import ProductVariantsSection from "./ product-variants-section";

import ProductImageUpload from "./product-image-upload";
import DateTimePicker from "@/components/ui/date-time-picker";

interface Props {
  categories: any[];
  product?: any;
}

export default function ProductForm({ categories, product }: Props) {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<string[]>(
    product?.images?.map((img: any) => img.imageUrl) || [],
  );

  const parentCategories = categories.filter((category) => !category.parentId);

  const [parentCategoryId, setParentCategoryId] = useState(
    product?.category?.parentId || "",
  );

  const subCategories = categories.filter(
    (category) => category.parentId === parentCategoryId,
  );

  const [variants, setVariants] = useState(product?.variants || []);

  const router = useRouter();

  function addVariant() {
    setVariants([
      ...variants,
      {
        size: "",
        color: "",
        stock: 0,
      },
    ]);
  }

  function removeVariant(index: number) {
    setVariants(variants.filter((_, i) => i !== index));
  }

  async function action(formData: FormData) {
    try {
      setLoading(true);

      if (product) {
        await updateProduct(formData);
      } else {
        await createProduct(formData);
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={action}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6"
    >
      {product && <input type="hidden" name="id" defaultValue={product.id} />}

      {/* HEADER */}

      <div>
        <h2 className="text-3xl font-black">
          {product ? "Update Product" : "Create Product"}
        </h2>

        <p className="text-slate-400 mt-2">Manage your store products</p>
      </div>

      {/* NAME + SLUG */}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          defaultValue={product?.name}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />

        <input
          type="text"
          name="slug"
          placeholder="product-slug"
          required
          defaultValue={product?.slug}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />
      </div>

      {/* DESCRIPTION */}

      <textarea
        name="description"
        placeholder="Product Description"
        defaultValue={product?.description}
        className="w-full min-h-[140px] p-4 rounded-xl bg-slate-950 border border-slate-800"
      />

      {/* SKU + BARCODE */}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          defaultValue={product?.sku}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />

        <input
          type="text"
          name="barcode"
          placeholder="Barcode"
          defaultValue={product?.barcode}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />
      </div>

      {/* PRODUCT IMAGES */}

      <ProductImageUpload defaultImages={images} onChange={setImages} />

      {/* PRICE */}

      <div
        className={`grid gap-4 ${
          variants.length > 0
            ? "md:grid-cols-2"
            : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          required
          defaultValue={product?.price}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />

        <input
          type="number"
          step="0.01"
          name="comparePrice"
          placeholder="Compare Price"
          defaultValue={product?.comparePrice}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        />

        {variants.length === 0 && (
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            required
            defaultValue={product?.stock || 0}
            className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
          />
        )}
      </div>

      {/* DISCOUNTS */}

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold">Discount Settings</h3>

          <p className="text-sm text-slate-400 mt-1">
            Configure product sale pricing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* DISCOUNT TYPE */}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Discount Type</label>

            <select
              name="discountType"
              defaultValue={product?.discountType || ""}
              className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-slate-800"
            >
              <option value="">No Discount</option>

              <option value="PERCENTAGE">Percentage (%)</option>

              <option value="FIXED">Fixed Amount (৳)</option>
            </select>
          </div>

          {/* DISCOUNT VALUE */}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Discount Value</label>

            <input
              type="number"
              step="0.01"
              name="discountValue"
              placeholder="Enter discount amount"
              defaultValue={product?.discountValue || ""}
              className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-slate-800"
            />
          </div>

          {/* START DATE */}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">
              Discount Start Date
            </label>

            <DateTimePicker
              name="discountStartAt"
              defaultValue={product?.discountStartAt}
            />
          </div>

          {/* END DATE */}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Discount End Date</label>

            <DateTimePicker
              name="discountEndAt"
              defaultValue={product?.discountEndAt}
            />
          </div>
        </div>
      </div>

      {/* CATEGORY + GENDER */}

      <div className="grid md:grid-cols-3 gap-4">
        {/* PARENT CATEGORY */}

        <select
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        >
          <option value="">Select Parent Category</option>

          {parentCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* SUB CATEGORY */}

        <select
          name="categoryId"
          required
          defaultValue={product?.categoryId}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        >
          <option value="">Select Sub Category</option>

          {subCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* GENDER */}

        <select
          name="gender"
          defaultValue={product?.gender || "UNISEX"}
          className="h-12 px-4 rounded-xl bg-slate-950 border border-slate-800"
        >
          <option value="MEN">MEN</option>
          <option value="WOMEN">WOMEN</option>
          <option value="UNISEX">UNISEX</option>
          <option value="KIDS">KIDS</option>
        </select>
      </div>

      {/* VARIANTS */}
      <ProductVariantsSection variants={variants} setVariants={setVariants} />

      <input type="hidden" name="variants" value={JSON.stringify(variants)} />

      {/* SUBMIT */}

      <button
        disabled={loading}
        className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 font-semibold"
      >
        {loading
          ? "Processing..."
          : product
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}

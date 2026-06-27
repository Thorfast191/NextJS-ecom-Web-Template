"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadProductImages } from "@/actions/upload.actions";

interface Props {
  onChange: (urls: string[]) => void;
  defaultImages?: string[];
}

export default function ProductImageUpload({
  onChange,
  defaultImages = [],
}: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImages(defaultImages);
  }, [defaultImages]);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files?.length) return;

    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const uploadedUrls = await uploadProductImages(formData);

      const nextImages = [...images, ...uploadedUrls];

      setImages(nextImages);

      onChange(nextImages);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    const nextImages = images.filter((_, i) => i !== index);

    setImages(nextImages);

    onChange(nextImages);
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Product Images</h3>

        <p className="text-sm text-slate-400">Upload up to 5 images</p>
      </div>

      <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 transition hover:border-blue-500">
        <Upload size={32} />

        <span className="mt-3 text-sm text-slate-400">
          {uploading ? "Uploading..." : "Click to upload images"}
        </span>

        <span className="mt-1 text-xs text-slate-500">
          JPG, PNG, WEBP (max 5)
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="aspect-square w-full object-cover"
              />

              {index === 0 && (
                <div className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-xs font-semibold">
                  Cover
                </div>
              )}

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.map((image, index) => (
        <input
          key={`${image}-${index}`}
          type="hidden"
          name="images"
          value={image}
        />
      ))}
    </div>
  );
}

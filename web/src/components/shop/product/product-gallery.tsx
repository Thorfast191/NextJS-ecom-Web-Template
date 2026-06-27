"use client";

import { useState } from "react";

interface Props {
  images?: string[];

  name: string;
}

export default function ProductGallery({ images = [], name }: Props) {
  // FALLBACK

  const gallery = images.length > 0 ? images : ["/placeholder.png"];

  // ACTIVE IMAGE

  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}

      <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900">
        <img
          src={selectedImage}
          alt={name}
          className="w-full aspect-[4/5] object-cover"
        />
      </div>

      {/* THUMBNAILS */}

      <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4">
        {gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border transition ${
              selectedImage === image ? "border-blue-500" : "border-slate-800"
            }`}
          >
            <img
              src={image}
              alt={`${name}-${index}`}
              className="w-full aspect-square object-cover hover:scale-105 transition duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

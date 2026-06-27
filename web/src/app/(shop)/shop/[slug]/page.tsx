import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductGallery from "@/components/shop/product/product-gallery";
import ProductInfo from "@/components/shop/product/product-info";

import { getProductPrice } from "@/lib/pricing";

export const revalidate = 300;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const product = await prisma.product.findFirst({
    where: {
      slug: decodedSlug,
      isArchived: false,
    },

    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },

      variants: {
        where: {
          isActive: true,
        },

        select: {
          id: true,
          size: true,
          color: true,
          stock: true,
          price: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      },

      images: {
        select: {
          imageUrl: true,
        },

        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const pricing = getProductPrice(product);

  const galleryImages =
    product.images.length > 0
      ? product.images.map((image) => image.imageUrl)
      : [];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ProductGallery images={galleryImages} name={product.name} />

          <ProductInfo
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              description: product.description,
              imageUrl: galleryImages[0] || null,
              price: product.price,
              comparePrice: product.comparePrice,
              discountType: product.discountType,
              discountValue: product.discountValue,
              stock: product.stock,
              category: product.category,
            }}
            pricing={pricing}
            variants={product.variants}
          />
        </div>
      </div>
    </div>
  );
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasPermission } from "@/lib/auth";
import { Gender, DiscountType } from "@prisma/client";

export async function createProduct(formData: FormData) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  const barcode = formData.get("barcode") as string;
  const sku = formData.get("sku") as string;

  const gender = (formData.get("gender") as Gender) || Gender.UNISEX;

  const images = formData.getAll("images") as string[];

  const price = Number(formData.get("price"));

  const stock = Number(formData.get("stock")) || 0;

  const comparePrice = formData.get("comparePrice")
    ? Number(formData.get("comparePrice"))
    : null;

  const discountType = (formData.get("discountType") as DiscountType) || null;

  const discountValue = formData.get("discountValue")
    ? Number(formData.get("discountValue"))
    : null;

  const discountStartAt = formData.get("discountStartAt") as string;
  const discountEndAt = formData.get("discountEndAt") as string;

  const categoryId = formData.get("categoryId") as string;

  const variants = JSON.parse((formData.get("variants") as string) || "[]");
  const validVariants = variants.filter(
    (variant: any) =>
      variant.size ||
      variant.color ||
      variant.sku ||
      variant.barcode ||
      Number(variant.stock) > 0,
  );

  await prisma.product.create({
    data: {
      name,
      slug,
      description,

      barcode: barcode || null,
      sku: sku || null,

      gender,

      price,
      comparePrice,

      stock,

      discountType,
      discountValue,

      discountStartAt: discountStartAt ? new Date(discountStartAt) : null,

      discountEndAt: discountEndAt ? new Date(discountEndAt) : null,

      categoryId,

      imageUrl: images[0] || null,

      images: {
        create: images.map((url, index) => ({
          imageUrl: url,
          sortOrder: index,
        })),
      },

      variants: {
        create: validVariants.map((variant: any) => ({
          size: variant.size || null,

          color: variant.color || null,

          sku: variant.sku?.trim() || null,

          barcode: variant.barcode?.trim() || null,

          stock: Math.max(0, Number(variant.stock || 0)),

          price: variant.price ? Number(variant.price) : null,

          comparePrice: variant.comparePrice
            ? Number(variant.comparePrice)
            : null,

          imageUrl: variant.imageUrl || null,

          isActive: true,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function updateProduct(formData: FormData) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  const barcode = formData.get("barcode") as string;
  const sku = formData.get("sku") as string;

  const gender = (formData.get("gender") as Gender) || Gender.UNISEX;

  const images = formData.getAll("images") as string[];

  const price = Number(formData.get("price"));

  const stock = Number(formData.get("stock")) || 0;

  const comparePrice = formData.get("comparePrice")
    ? Number(formData.get("comparePrice"))
    : null;

  const discountType = (formData.get("discountType") as DiscountType) || null;

  const discountValue = formData.get("discountValue")
    ? Number(formData.get("discountValue"))
    : null;

  const discountStartAt = formData.get("discountStartAt") as string;
  const discountEndAt = formData.get("discountEndAt") as string;

  const categoryId = formData.get("categoryId") as string;

  const variants = JSON.parse((formData.get("variants") as string) || "[]");

  const validVariants = variants.filter(
    (variant: any) =>
      variant.size ||
      variant.color ||
      variant.sku ||
      variant.barcode ||
      Number(variant.stock) > 0,
  );

  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },

    include: {
      variants: true,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // =========================
  // UPDATE PRODUCT
  // =========================

  await prisma.product.update({
    where: {
      id,
    },

    data: {
      name,
      slug,
      description,

      barcode: barcode || null,
      sku: sku || null,

      gender,

      price,
      comparePrice,

      stock,

      discountType,
      discountValue,

      discountStartAt: discountStartAt ? new Date(discountStartAt) : null,

      discountEndAt: discountEndAt ? new Date(discountEndAt) : null,

      categoryId,

      imageUrl: images[0] || null,

      images: {
        deleteMany: {},

        create: images.map((url, index) => ({
          imageUrl: url,
          sortOrder: index,
        })),
      },
    },
  });

  // =========================
  // DELETE REMOVED VARIANTS
  // =========================

  const incomingIds = validVariants
    .filter((variant: any) => variant.id)
    .map((variant: any) => variant.id);

  const variantsToDelete = existingProduct.variants.filter(
    (variant) => !incomingIds.includes(variant.id),
  );

  for (const variant of variantsToDelete) {
    const orderCount = await prisma.orderItem.count({
      where: {
        variantId: variant.id,
      },
    });

    if (orderCount > 0) {
      await prisma.productVariant.update({
        where: {
          id: variant.id,
        },

        data: {
          isActive: false,
        },
      });
    } else {
      await prisma.productVariant.delete({
        where: {
          id: variant.id,
        },
      });
    }
  }

  // =========================
  // UPDATE EXISTING VARIANTS
  // =========================

  for (const variant of validVariants) {
    if (!variant.id) continue;

    await prisma.productVariant.update({
      where: {
        id: variant.id,
      },

      data: {
        size: variant.size || null,

        color: variant.color || null,

        sku: variant.sku?.trim() || null,

        barcode: variant.barcode?.trim() || null,

        stock: Math.max(0, Number(variant.stock || 0)),

        price: variant.price ? Number(variant.price) : null,

        comparePrice: variant.comparePrice
          ? Number(variant.comparePrice)
          : null,

        imageUrl: variant.imageUrl || null,

        isActive: variant.isActive === undefined ? true : variant.isActive,
      },
    });
  }

  // =========================
  // CREATE NEW VARIANTS
  // =========================

  for (const variant of validVariants) {
    if (variant.id) continue;

    await prisma.productVariant.create({
      data: {
        productId: id,

        size: variant.size || null,

        color: variant.color || null,

        sku: variant.sku?.trim() || null,

        barcode: variant.barcode?.trim() || null,

        stock: Math.max(0, Number(variant.stock || 0)),

        price: variant.price ? Number(variant.price) : null,

        comparePrice: variant.comparePrice
          ? Number(variant.comparePrice)
          : null,

        imageUrl: variant.imageUrl || null,

        isActive: true,
      },
    });
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

// ========================
// DELETE PRODUCT
// ========================
export async function deleteProduct(id: string) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const orderItemsCount = await prisma.orderItem.count({
    where: {
      productId: id,
    },
  });

  const saleItemsCount = await prisma.saleItem.count({
    where: {
      productId: id,
    },
  });

  if (orderItemsCount > 0 || saleItemsCount > 0) {
    throw new Error("Cannot delete product because it exists in sales history");
  }

  await prisma.wishlist.deleteMany({
    where: {
      productId: id,
    },
  });

  await prisma.productView.deleteMany({
    where: {
      productId: id,
    },
  });

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

// ========================
// ADMIN PRODUCTS
// ========================

export async function getAdminProducts(page = 1, search = "") {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const take = 10;

  const skip = (page - 1) * take;

  return prisma.product.findMany({
    where: {
      isArchived: false,

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            slug: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            sku: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            barcode: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            variants: {
              some: {
                sku: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },

          {
            variants: {
              some: {
                barcode: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      }),
    },

    take,
    skip,

    select: {
      id: true,

      name: true,
      slug: true,

      imageUrl: true,

      isFeatured: true,
      isTrending: true,
      isBestSeller: true,
      isNewArrival: true,

      isArchived: true,

      price: true,
      comparePrice: true,

      stock: true,

      discountType: true,
      discountValue: true,
      discountStartAt: true,
      discountEndAt: true,

      category: {
        select: {
          name: true,

          parent: {
            select: {
              name: true,
            },
          },
        },
      },

      images: {
        select: {
          id: true,
          imageUrl: true,
          sortOrder: true,
        },

        orderBy: {
          sortOrder: "asc",
        },
      },

      variants: {
        select: {
          id: true,

          size: true,
          color: true,

          sku: true,
          barcode: true,

          stock: true,

          price: true,
          comparePrice: true,

          imageUrl: true,

          isActive: true,
        },
      },

      _count: {
        select: {
          wishlists: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPublicProducts() {
  return prisma.product.findMany({
    where: {
      isArchived: false,
    },

    include: {
      category: true,

      variants: true,

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function toggleProductFlag(
  id: string,
  field: "isFeatured" | "isTrending" | "isBestSeller" | "isNewArrival",
) {
  const allowed = await hasPermission("manage_products");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await prisma.product.update({
    where: {
      id,
    },

    data: {
      [field]: !product[field],
    },
  });

  revalidatePath("/admin/products");
}

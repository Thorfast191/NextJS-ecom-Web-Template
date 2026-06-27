"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import { hasPermission } from "@/lib/auth";

// ========================
// CREATE CATEGORY
// ========================

export async function createCategory(formData: FormData) {
  // AUTH

  const allowed = await hasPermission("manage_categories");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  // FORM

  const name = formData.get("name") as string;

  const slug = formData.get("slug") as string;

  const parentId = formData.get("parentId") as string;

  // VALIDATION

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  // DUPLICATE CHECK

  const existing = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    throw new Error("Category slug already exists");
  }

  // CREATE

  await prisma.category.create({
    data: {
      name,

      slug,

      parentId: parentId || null,
    },
  });

  // REVALIDATE

  revalidatePath("/admin/categories");

  revalidatePath("/shop");
}

// ========================
// UPDATE CATEGORY
// ========================

export async function updateCategory(formData: FormData) {
  // AUTH

  const allowed = await hasPermission("manage_categories");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  // FORM

  const id = formData.get("id") as string;

  const name = formData.get("name") as string;

  const slug = formData.get("slug") as string;

  const parentId = formData.get("parentId") as string;

  // VALIDATION

  if (!id || !name || !slug) {
    throw new Error("Missing required fields");
  }

  // DUPLICATE SLUG CHECK

  const existing = await prisma.category.findFirst({
    where: {
      slug,

      NOT: {
        id,
      },
    },
  });

  if (existing) {
    throw new Error("Slug already exists");
  }

  // PREVENT SELF PARENT

  if (id === parentId) {
    throw new Error("Category cannot be parent of itself");
  }

  // UPDATE

  await prisma.category.update({
    where: {
      id,
    },

    data: {
      name,

      slug,

      parentId: parentId || null,
    },
  });

  // REVALIDATE

  revalidatePath("/admin/categories");

  revalidatePath("/shop");
}

// ========================
// DELETE CATEGORY
// ========================

export async function deleteCategory(id: string) {
  // AUTH

  const allowed = await hasPermission("manage_categories");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  // CHECK PRODUCTS

  const productsCount = await prisma.product.count({
    where: {
      categoryId: id,
    },
  });

  if (productsCount > 0) {
    throw new Error(
      "Cannot delete category because products are assigned to it",
    );
  }

  // REMOVE CHILD REFERENCES

  await prisma.category.updateMany({
    where: {
      parentId: id,
    },

    data: {
      parentId: null,
    },
  });

  // DELETE

  await prisma.category.delete({
    where: {
      id,
    },
  });

  // REVALIDATE

  revalidatePath("/admin/categories");

  revalidatePath("/shop");
}

// ========================
// GET CATEGORIES
// ========================

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      parent: {
        select: {
          id: true,

          name: true,

          slug: true,
        },
      },

      children: {
        select: {
          id: true,

          name: true,

          slug: true,
        },

        orderBy: {
          name: "asc",
        },
      },

      _count: {
        select: {
          products: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}

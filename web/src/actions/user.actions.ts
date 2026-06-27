"use server";

import { prisma } from "@/lib/prisma";

import { hasPermission } from "@/lib/auth";

// ======================
// GET ADMIN USERS
// ======================

export async function getAdminUsers() {
  const allowed = await hasPermission("manage_users");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  return prisma.user.findMany({
    select: {
      id: true,

      name: true,

      email: true,

      image: true,

      role: true,

      isActive: true,

      createdAt: true,

      lastLoginAt: true,

      orders: {
        select: {
          id: true,

          total: true,
        },
      },

      wishlists: {
        select: {
          id: true,

          product: {
            select: {
              id: true,

              name: true,

              slug: true,

              imageUrl: true,

              price: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

// ======================
// GET ADMIN USER BY ID
// ======================

export async function getAdminUserById(id: string) {
  const allowed = await hasPermission("manage_users");

  if (!allowed) {
    throw new Error("Unauthorized");
  }

  return prisma.user.findUnique({
    where: {
      id,
    },

    select: {
      id: true,

      name: true,

      email: true,

      image: true,

      role: true,

      isActive: true,

      createdAt: true,

      lastLoginAt: true,

      orders: {
        select: {
          id: true,

          total: true,

          status: true,

          createdAt: true,

          items: {
            select: {
              id: true,

              quantity: true,

              price: true,

              product: {
                select: {
                  id: true,

                  name: true,

                  imageUrl: true,
                },
              },
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },

      wishlists: {
        select: {
          id: true,

          createdAt: true,

          product: {
            select: {
              id: true,

              name: true,

              slug: true,

              imageUrl: true,

              price: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

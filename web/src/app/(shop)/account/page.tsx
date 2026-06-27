import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import AccountDashboard from "@/components/shop/account/account-dashboard";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/shop/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },

    include: {
      wishlists: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },

      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/shop/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
            My Account
          </p>

          <h1 className="text-5xl font-black">Welcome Back</h1>

          <p className="mt-4 text-slate-400">Manage your account and orders</p>
        </div>

        <AccountDashboard user={user} />
      </div>
    </div>
  );
}

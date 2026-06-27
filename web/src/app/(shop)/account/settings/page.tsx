import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import ProfileForm from "@/components/shop/account/profile-form";
import AddressForm from "@/components/shop/account/address-form";
import PasswordForm from "@/components/shop/account/password-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/shop/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/shop/login");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl lg:text-4xl font-black">Account Settings</h1>

        <p className="mt-2 text-slate-500">
          Manage your profile, address and security settings.
        </p>
      </div>

      {/* PROFILE + ADDRESS */}

      <div className="grid gap-8 lg:grid-cols-2">
        <ProfileForm user={user} />

        <AddressForm user={user} />
      </div>

      {/* PASSWORD */}

      <PasswordForm />
    </div>
  );
}

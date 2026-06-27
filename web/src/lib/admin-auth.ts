import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login?expired=true");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/admin/login?expired=true");
  }

  return session;
}

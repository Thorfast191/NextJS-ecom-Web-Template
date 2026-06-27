import { auth } from "@/auth";

import { permissions } from "./permissions";

type Role = keyof typeof permissions;

export async function hasPermission(permission: string) {
  const session = await auth();

  if (!session?.user?.role) {
    return false;
  }

  const role = session.user.role as Role;

  const rolePermissions = permissions[role];

  return rolePermissions.includes(permission);
}

import { getAdminUsers } from "@/actions/user.actions";

import UsersTable from "@/components/admin/users/users-table";

export default async function UsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">Users</h1>

        <p className="text-slate-400 mt-2">Customer management & analytics</p>
      </div>

      {/* TABLE */}

      <UsersTable users={users} />
    </div>
  );
}

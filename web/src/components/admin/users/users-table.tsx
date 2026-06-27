import UserCard from "./user-card";

interface Props {
  users: any[];
}

export default function UsersTable({ users }: Props) {
  if (users.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-slate-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

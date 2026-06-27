import { changePassword } from "@/actions/settings.actions";

export default function PasswordSettings() {
  return (
    <form
      action={changePassword}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">Change Password</h2>

      {/* CURRENT */}

      <div>
        <label className="block mb-2 text-sm">Current Password</label>

        <input
          type="password"
          name="currentPassword"
          required
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* NEW */}

      <div>
        <label className="block mb-2 text-sm">New Password</label>

        <input
          type="password"
          name="newPassword"
          required
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* BUTTON */}

      <button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-lg">
        Update Password
      </button>
    </form>
  );
}

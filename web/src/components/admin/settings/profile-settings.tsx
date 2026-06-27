import { updateProfile } from "@/actions/settings.actions";

interface Props {
  user: any;
}

export default function ProfileSettings({ user }: Props) {
  return (
    <form
      action={updateProfile}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      {/* NAME */}

      <div>
        <label className="block mb-2 text-sm">Full Name</label>

        <input
          name="name"
          defaultValue={user.name || ""}
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* EMAIL */}

      <div>
        <label className="block mb-2 text-sm">Email</label>

        <input
          type="email"
          name="email"
          defaultValue={user.email}
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      {/* BUTTON */}

      <button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-lg">
        Save Changes
      </button>
    </form>
  );
}

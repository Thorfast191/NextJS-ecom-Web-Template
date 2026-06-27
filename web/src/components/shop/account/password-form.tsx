"use client";

export default function PasswordForm() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black">Security</h2>

        <p className="mt-2 text-sm text-slate-500">
          Update your account password and keep your account secure.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Current Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            New Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              outline-none
              transition-all
              focus:border-blue-400
            "
          />
        </div>
      </div>

      <button
        className="
          mt-5
          h-11
          rounded-xl
          bg-white
          px-6
          text-black
          font-semibold
          transition-all
          hover:scale-[1.02]
        "
      >
        Change Password
      </button>
    </div>
  );
}

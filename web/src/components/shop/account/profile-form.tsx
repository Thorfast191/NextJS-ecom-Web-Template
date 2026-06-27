"use client";

import { useState } from "react";

export default function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");

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
        <h2 className="text-2xl font-black">Profile Information</h2>

        <p className="mt-2 text-sm text-slate-500">
          Update your personal details.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label className="mb-2 block text-sm text-slate-400">Email</label>

          <input
            disabled
            value={user.email}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              opacity-60
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Phone Number
          </label>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXXXXXXXX"
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

        <button
          className="
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
          Save Profile
        </button>
      </div>
    </div>
  );
}

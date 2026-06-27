"use client";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("Invalid credentials");

        return;
      }

      router.push("/admin");
    } catch (error) {
      console.error(error);

      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        {/* LOGO */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white">POSHMANSTYLE</h1>

          <p className="text-slate-400 mt-2">Admin Dashboard</p>
        </div>

        {/* FORM */}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 text-white">Email</label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800 text-white"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white">Password</label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800 text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-medium"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

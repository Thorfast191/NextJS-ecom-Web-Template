"use client";

import Link from "next/link";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function LoginForm() {
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

      router.push("/account");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6"
    >
      {/* EMAIL */}

      <div>
        <label className="block text-sm text-slate-400 mb-3">
          Email Address
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* PASSWORD */}

      <div>
        <label className="block text-sm text-slate-400 mb-3">Password</label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* GOOGLE LOGIN */}

      <button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
        className="w-full h-14 rounded-2xl border border-slate-700 hover:bg-slate-800 transition"
      >
        Continue with Google
      </button>

      {/* LOGIN BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-white text-black font-bold hover:bg-slate-200 transition disabled:bg-slate-700 disabled:text-slate-400"
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {/* REGISTER */}

      <p className="text-center text-slate-400 text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/shop/register"
          className="text-blue-400 hover:text-blue-300"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

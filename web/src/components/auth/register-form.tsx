"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,

          email,

          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        alert(data.error || "Registration failed");

        return;
      }

      // AUTO LOGIN AFTER REGISTER

      await signIn("credentials", {
        email,

        password,

        redirect: false,
      });

      router.push("/");

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6"
    >
      {/* NAME */}

      <div>
        <label className="block text-sm text-slate-400 mb-3">Full Name</label>

        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full h-14 px-5 rounded-2xl bg-slate-950 border border-slate-800 focus:outline-none focus:border-blue-500"
        />
      </div>

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

      {/* GOOGLE REGISTER */}

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

      {/* REGISTER BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-white text-black font-bold hover:bg-slate-200 transition disabled:bg-slate-700 disabled:text-slate-400"
      >
        {loading ? "Creating account..." : "Register"}
      </button>

      {/* LOGIN */}

      <p className="text-center text-slate-400 text-sm">
        Already have an account?{" "}
        <Link href="/shop/login" className="text-blue-400 hover:text-blue-300">
          Login
        </Link>
      </p>
    </form>
  );
}

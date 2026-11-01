"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Login";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password.");
      return;
    }

    toast.success("Logged in successfully.");
    router.push(redirectTo);
    router.refresh();
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600">Log in to your BookNook account.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input id="password" name="password" type="password" required placeholder="Your password" className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            OR
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={() =>
              authClient.signIn.social({ provider: "google", callbackURL: redirectTo })
            }
            className="w-full rounded-full border border-purple-200 px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            New to BookNook?{" "}
            <Link href="/register" className="font-semibold text-purple-700 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
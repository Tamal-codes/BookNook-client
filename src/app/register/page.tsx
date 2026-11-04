"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function validatePassword(password: string) {
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must have an uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must have a lowercase letter.";
  }

  return "";
}

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.title = "BookNook | Register";
  }, []);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const image = String(formData.get("image"));
    const password = String(formData.get("password"));

    const error = validatePassword(password);

    setPasswordError(error);

    if (error) return;

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (authError) {
        toast.error(authError.message || "Registration failed.");
        return;
      }

      toast.success("Registered successfully. Welcome to BookNook!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Something went wrong with Google login.");
      setGoogleLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";

  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create Account
          </h1>

          <p className="mt-2 text-gray-600">
            Join BookNook and start borrowing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>
              Photo URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              required
              placeholder="https://example.com/photo.jpg"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Min 6 chars, upper & lower case"
              className={inputClass}
            />

            {passwordError && (
              <p role="alert" className="mt-2 text-sm font-medium text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            OR
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full rounded-full border border-purple-200 px-6 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? "Connecting to Google..." : "Continue with Google"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-purple-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata = {
  title: "BookNook | Page Not Found",
};

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-purple-50/40 px-4 py-24">
      <div className="text-center">
        <p className="text-6xl font-extrabold text-purple-600 sm:text-7xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md"
        >
          <Home className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
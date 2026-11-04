"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, FlaskConical, Landmark, Shapes, Smile } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "Fiction", icon: BookOpen, text: "Stories and novels" },
  { name: "Science", icon: FlaskConical, text: "Discover how things work" },
  { name: "History", icon: Landmark, text: "Learn from the past" },
  { name: "Kids", icon: Smile, text: "Fun reads for little ones" },
  { name: "Others", icon: Shapes, text: "Everything else" },
];

const TopCategories = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    if (isPending) return;

    const target = `/category/${name}`;
    if (!session?.user) {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
      return;
    }
    router.push(target);
  };

  return (
    <section className="bg-purple-50/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-600">
            Find your genre
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Top Categories
          </h2>
          <p className="mt-3 text-gray-600">
            Explore books by the kind of reading you enjoy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ name, icon: Icon, text }) => (
            <Link
              key={name}
              href={`/category/${name}`}
              onClick={(e) => handleClick(e, name)}
              className="group flex h-full flex-col items-center rounded-2xl border border-purple-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-200/50"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-purple-100 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-gray-900">{name}</h3>
              <p className="mt-1 text-sm text-gray-600">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
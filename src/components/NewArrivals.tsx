import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard, { type Book } from "@/components/BookCard";

async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const NewArrivals = async () => {
  const books = await getLatestBooks();

  return (
    <section className="bg-purple-50/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-600">
            Fresh on the shelf
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            New Arrivals
          </h2>
          <p className="mt-3 text-gray-600">
            The latest books added by our readers. Pick one and start reading today.
          </p>
        </div>

        {books.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">
            No books yet. Be the first to add one!
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-7 py-3 text-sm font-semibold text-purple-700 shadow-sm transition-all duration-200 hover:bg-purple-600 hover:text-white hover:shadow-md"
          >
            See All Books
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
import Link from "next/link";
import BookCard, { type Book } from "@/components/BookCard";

async function getBooks(category: string): Promise<Book[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?category=${encodeURIComponent(category)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return { title: `BookNook | ${decodeURIComponent(name)} Books` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const category = decodeURIComponent(name);
  const books = await getBooks(category);

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {category} Books
          </h1>
          <p className="mt-3 text-gray-600">Books in the {category} category.</p>
        </div>

        {books.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-500">No books available</p>
            <Link
              href="/books"
              className="mt-6 inline-flex rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Browse All Books
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
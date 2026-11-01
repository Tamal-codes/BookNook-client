import BookCard, { type Book } from "@/components/BookCard";

async function getAllBooks(): Promise<Book[]> {
  try {
    const res = await fetch("http://localhost:8000/books", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata = {
  title: "BookNook | All Books",
};

export default async function AllBooksPage() {
  const books = await getAllBooks();

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Books
          </h1>
          <p className="mt-3 text-gray-600">
            Browse every book shared by our readers.
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
      </div>
    </section>
  );
}
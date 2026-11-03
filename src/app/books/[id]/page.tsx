import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Copy, User } from "lucide-react";
import BorrowButton from "@/components/BorrowButton";

type BookDetails = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  userName: string;
  userEmail: string;
  createdAt: string;
};

async function getBook(id: string): Promise<BookDetails | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book ? `BookNook | ${book.title}` : "BookNook | Book Details" };
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Book not found</h1>
        <p className="mt-3 text-gray-600">
          This book may have been removed or the link is wrong.
        </p>
        <Link
          href="/books"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
        >
          Back to All Books
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-900"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to All Books
        </Link>

        <div className="mt-6 grid gap-10 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[360px_1fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-purple-50">
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              {book.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-gray-600">by {book.author}</p>

            <p className="mt-6 leading-relaxed text-gray-700">
              {book.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <User className="size-4 text-purple-600" aria-hidden="true" />
                Added by <span className="font-medium text-gray-900">{book.userName}</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="size-4 text-purple-600" aria-hidden="true" />
                {new Date(book.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </li>
              <li className="flex items-center gap-3">
                <Copy className="size-4 text-purple-600" aria-hidden="true" />
                {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"} available
              </li>
            </ul>

            <BorrowButton
              bookId={book._id}
              bookTitle={book.title}
              totalCopies={book.totalCopies}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
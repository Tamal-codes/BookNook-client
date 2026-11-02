"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, Pencil } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  totalCopies: number;
};

export default function MyBooksPage() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Books";
  }, []);

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:8000/books?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => toast.error("Could not load books."))
      .finally(() => setLoading(false));
  }, [email]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`http://localhost:8000/books/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount === 1) {
        setBooks((prev) => prev.filter((b) => b._id !== deleteTarget._id));
        toast.success("Book deleted successfully.");
      } else {
        toast.error("Could not delete the book.");
      }
    } catch {
      toast.error("Server is not reachable.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Books
          </h1>
          <p className="mt-3 text-gray-600">Manage the books you have added.</p>
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="size-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : books.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">
            You have not added any books yet.
          </p>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-purple-100 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-purple-50 text-xs uppercase tracking-wider text-purple-700">
                <tr>
                  <th className="px-5 py-3">Book</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Copies</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-purple-50">
                          <Image
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900">{book.title}</p>
                          <p className="truncate text-gray-500">by {book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{book.category}</td>
                    <td className="px-5 py-4 text-gray-700">{book.totalCopies}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/my-books/edit/${book._id}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 px-4 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-50"
                        >
                          <Pencil className="size-3.5" aria-hidden="true" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(book)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="size-3.5" aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Delete this book?</h2>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{deleteTarget.title}</span> will be
              removed permanently. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
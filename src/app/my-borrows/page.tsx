"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Undo2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getToken } from "@/lib/getToken";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function MyBorrowsPage() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returnTarget, setReturnTarget] = useState<Borrow | null>(null);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Borrows";
  }, []);

  useEffect(() => {
    if (!email) return;

    getToken()
      .then((token) =>
        fetch("http://localhost:8000/borrows", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((res) => res.json())
      .then((data) => setBorrows(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Could not load your borrowed books."))
      .finally(() => setLoading(false));
  }, [email]);

  const handleReturn = async () => {
    if (!returnTarget) return;
    setReturning(true);

    try {
      const token = await getToken();

      const res = await fetch(`http://localhost:8000/borrows/${returnTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok && data.deletedCount === 1) {
        setBorrows((prev) => prev.filter((b) => b._id !== returnTarget._id));
        toast.success("Book returned successfully.");
      } else {
        toast.error(data.message || "Could not return the book.");
      }
    } catch {
      toast.error("Server is not reachable.");
    } finally {
      setReturning(false);
      setReturnTarget(null);
    }
  };

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Borrows
          </h1>
          <p className="mt-3 text-gray-600">Books you have borrowed and need to return.</p>
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="size-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : borrows.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-500">You have not borrowed any books yet.</p>
            <Link
              href="/books"
              className="mt-6 inline-flex rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-purple-100 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-purple-50 text-xs uppercase tracking-wider text-purple-700">
                <tr>
                  <th className="px-5 py-3">Book</th>
                  <th className="px-5 py-3">Borrow Date</th>
                  <th className="px-5 py-3">Return Date</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {borrows.map((borrow) => (
                  <tr key={borrow._id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-purple-50">
                          <Image
                            src={borrow.bookImage}
                            alt={`Cover of ${borrow.bookTitle}`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <p className="truncate font-semibold text-gray-900">
                          {borrow.bookTitle}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{formatDate(borrow.borrowDate)}</td>
                    <td className="px-5 py-4 text-gray-700">{formatDate(borrow.returnDate)}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setReturnTarget(borrow)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-purple-700"
                      >
                        <Undo2 className="size-3.5" aria-hidden="true" />
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {returnTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Return this book?</h2>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{returnTarget.bookTitle}</span> will be
              returned to the library.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setReturnTarget(null)}
                disabled={returning}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReturn}
                disabled={returning}
                className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {returning ? "Returning..." : "Confirm Return"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
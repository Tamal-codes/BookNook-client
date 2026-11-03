"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getToken } from "@/lib/getToken";

type Props = {
  bookId: string;
  bookTitle: string;
  totalCopies: number;
};

const BorrowButton = ({ bookId, bookTitle, totalCopies }: Props) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  const available = totalCopies > 0;

  const [tomorrow] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });

  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {


        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId,
          userName: user.name,
          userEmail: user.email,
          returnDate,
        }),
      });
      const data = await res.json();

      if (res.ok && data.acknowledged) {
        toast.success("Book borrowed successfully.");
        setOpen(false);
        setReturnDate("");
        router.refresh();
      } else {
        toast.error(data.message || "Could not borrow the book.");
      }
    } catch {
      toast.error("Server is not reachable.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={!available}
        onClick={() => setOpen(true)}
        className="mt-8 w-fit rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        {available ? "Borrow This Book" : "Not Available"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <form
            onSubmit={handleBorrow}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 className="text-lg font-bold text-gray-900">Borrow this book</h2>
            <p className="mt-1 text-sm text-gray-600">{bookTitle}</p>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="b-name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  id="b-name"
                  type="text"
                  value={user?.name ?? ""}
                  readOnly
                  className="mt-1 w-full rounded-lg border border-purple-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="b-email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  id="b-email"
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="mt-1 w-full rounded-lg border border-purple-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="b-return" className="block text-sm font-medium text-gray-700">
                  Return Date
                </label>
                <input
                  id="b-return"
                  type="date"
                  required
                  min={tomorrow}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !user}
                className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {saving ? "Borrowing..." : "Confirm Borrow"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BorrowButton;
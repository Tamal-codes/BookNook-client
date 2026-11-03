"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getToken } from "@/lib/getToken";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

type Book = {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
};

export default function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Edit Book";

    fetch(`http://localhost:8000/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch(() => toast.error("Could not load this book."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const updated = {
      title: formData.get("title"),
      author: formData.get("author"),
      category: formData.get("category"),
      image: formData.get("image"),
      description: formData.get("description"),
      totalCopies: Number(formData.get("totalCopies")),
    };

    try {
      const token = await getToken();

      const res = await fetch(`http://localhost:8000/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      const data = await res.json();

      if (data.acknowledged) {
        toast.success("Book updated successfully.");
        router.push("/my-books");
      } else {
        toast.error(data.message || "Could not update the book.");
      }
    } catch {
      toast.error("Server is not reachable.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";
  const labelClass = "block text-sm font-medium text-gray-700";

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="size-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  if (!book) {
    return <p className="py-24 text-center text-gray-600">Book not found.</p>;
  }

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Edit Book
          </h1>
          <p className="mt-2 text-gray-600">Update the details and save.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="title" className={labelClass}>Book Title</label>
            <input id="title" name="title" type="text" required defaultValue={book.title} className={inputClass} />
          </div>

          <div>
            <label htmlFor="author" className={labelClass}>Author Name</label>
            <input id="author" name="author" type="text" required defaultValue={book.author} className={inputClass} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className={labelClass}>Category</label>
              <select id="category" name="category" required defaultValue={book.category} className={inputClass}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="totalCopies" className={labelClass}>Total Copies</label>
              <input id="totalCopies" name="totalCopies" type="number" min={0} required defaultValue={book.totalCopies} className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>Book Image URL</label>
            <input id="image" name="image" type="url" required defaultValue={book.image} className={inputClass} />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>Short Description</label>
            <textarea id="description" name="description" rows={4} required defaultValue={book.description} className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
}
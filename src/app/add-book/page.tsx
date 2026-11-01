"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { currentUser } from "@/lib/currentUser";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const book = {
      title: formData.get("title"),
      author: formData.get("author"),
      category: formData.get("category"),
      image: formData.get("image"),
      description: formData.get("description"),
      totalCopies: Number(formData.get("totalCopies")),
      userName: currentUser.name,
      userEmail: currentUser.email,
    };

    try {
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      const data = await res.json();

      if (data.acknowledged) {
        toast.success("Book added successfully.");
        form.reset();
      } else {
        toast.error("Could not add the book. Try again.");
      }
    } catch {
      toast.error("Server is not reachable.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add a New Book
          </h1>
          <p className="mt-2 text-gray-600">
            Share a book with the BookNook community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="title" className={labelClass}>Book Title</label>
            <input id="title" name="title" type="text" required placeholder="The Silent Garden" className={inputClass} />
          </div>

          <div>
            <label htmlFor="author" className={labelClass}>Author Name</label>
            <input id="author" name="author" type="text" required placeholder="Elena Marsh" className={inputClass} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className={labelClass}>Category</label>
              <select id="category" name="category" required defaultValue="" className={inputClass}>
                <option value="" disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="totalCopies" className={labelClass}>Total Copies</label>
              <input id="totalCopies" name="totalCopies" type="number" min={1} required defaultValue={1} className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>Book Image URL</label>
            <input id="image" name="image" type="url" required placeholder="https://example.com/cover.jpg" className={inputClass} />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>Short Description</label>
            <textarea id="description" name="description" rows={4} required placeholder="What is this book about?" className={inputClass} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="userName" className={labelClass}>Your Name</label>
              <input id="userName" type="text" value={currentUser.name} readOnly className={`${inputClass} bg-gray-50 text-gray-500`} />
            </div>
            <div>
              <label htmlFor="userEmail" className={labelClass}>Your Email</label>
              <input id="userEmail" type="email" value={currentUser.email} readOnly className={`${inputClass} bg-gray-50 text-gray-500`} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </section>
  );
}
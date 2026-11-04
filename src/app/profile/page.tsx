"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "BookNook | My Profile";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const image = String(formData.get("image") || "");

    const { error } = await authClient.updateUser({
      name,
      image: image || undefined,
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile.");
      return;
    }
    toast.success("Profile updated successfully.");
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";
  const labelClass = "block text-sm font-medium text-gray-700";

  if (!user) return null;

  return (
    <section className="bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-gray-600">Your BookNook account details.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            {user.image ? (
            
              <Image
                src={user.image}
                alt={user.name}
                height={50}
                width={50}
                referrerPolicy="no-referrer"
                className="size-24 rounded-full object-cover ring-4 ring-purple-100"
              />
            ) : (
              <span className="flex size-24 items-center justify-center rounded-full bg-purple-600 text-3xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 border-t border-purple-100 pt-6">
            <div>
              <label htmlFor="name" className={labelClass}>Name</label>
              <input id="name" name="name" type="text" required defaultValue={user.name} className={inputClass} />
            </div>

            <div>
              <label htmlFor="image" className={labelClass}>Photo URL</label>
              <input id="image" name="image" type="url" defaultValue={user.image ?? ""} className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" value={user.email} readOnly className={`${inputClass} bg-gray-50 text-gray-500`} />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
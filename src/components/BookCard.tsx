import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
};

const BookCard = ({ book }: { book: Book }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/50">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-purple-50">
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm backdrop-blur-sm">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          by {book.author}
        </p>

        <Link
          href={`/books/${book._id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-purple-700 hover:shadow-md"
        >
          View Details
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
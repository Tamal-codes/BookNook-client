import { BookPlus, HandHeart, Undo2 } from "lucide-react";

const steps = [
  {
    icon: BookPlus,
    title: "Add a Book",
    text: "Share a book you own. Add its cover, author and a short description.",
  },
  {
    icon: HandHeart,
    title: "Borrow a Book",
    text: "Pick any available book and choose how many days you need it.",
  },
  {
    icon: Undo2,
    title: "Return It",
    text: "Finished reading? Return the book so the next reader can enjoy it.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-600">
            Simple and quick
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How Borrowing Works
          </h2>
          <p className="mt-3 text-gray-600">
            Three easy steps from adding a book to returning it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="flex h-full flex-col items-center rounded-2xl border border-purple-100 bg-purple-50/40 p-8 text-center shadow-sm"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-purple-600">
                Step {index + 1}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
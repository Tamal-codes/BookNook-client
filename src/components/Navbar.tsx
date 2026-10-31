"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookHeart,
  BookOpen,
  BookPlus,
  Handshake,
  Library,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/books", label: "All Books", icon: Library },
  { href: "/add-book", label: "Add Book", icon: BookPlus },
  { href: "/my-books", label: "My Books", icon: BookHeart },
  { href: "/my-borrows", label: "My Borrows", icon: Handshake },
];

const btnBase =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50";
const btnPrimary = `${btnBase} bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md`;
const btnOutline = `${btnBase} border border-border text-foreground hover:bg-muted`;

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/70 bg-background/80 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="BookNook home"
          className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-bold tracking-tight">
            Book<span className="text-amber-600">Nook</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Login / Register (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className={btnOutline}>
            Login
          </Link>
          <Link href="/register" className={btnPrimary}>
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={cn(
          "grid transition-all duration-300 lg:hidden",
          isOpen ? "grid-rows-[1fr] border-t border-border/70" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-border/70 pt-4">
              <Link href="/login" className={btnOutline}>
                Login
              </Link>
              <Link href="/register" className={btnPrimary}>
                Register
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
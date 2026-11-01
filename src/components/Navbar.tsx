"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookHeart,
  BookOpen,
  BookPlus,
  Handshake,
  Library,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/books", label: "All Books", icon: Library },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book", icon: BookPlus },
  { href: "/my-books", label: "My Books", icon: BookHeart },
  { href: "/my-borrows", label: "My Borrows", icon: Handshake },
];

const btnBase =
  "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50";
const btnPrimary = `${btnBase} bg-purple-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-md`;
const btnOutline = `${btnBase} border border-purple-200 text-purple-700 hover:bg-purple-50`;

function UserAvatar({
  name,
  image,
  size = "size-9",
}: {
  name: string;
  image?: string | null;
  size?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className={cn(size, "rounded-full object-cover")}
      />
    );
  }
  return (
    <span
      className={cn(
        size,
        "flex items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white"
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setIsOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    setIsOpen(false);
    toast.success("Logged out successfully.");
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-purple-100 bg-white/80 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="BookNook home"
          className="group flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <BookOpen className="size-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Book<span className="text-purple-600">Nook</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50",
                  active
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side (desktop) */}
        <div className="hidden items-center gap-2 lg:flex">
          {isPending ? (
            <div className="size-9 animate-pulse rounded-full bg-purple-100" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Open user menu"
                aria-expanded={menuOpen}
                className="rounded-full ring-2 ring-transparent transition hover:ring-purple-300 focus-visible:ring-purple-500"
              >
                <UserAvatar name={user.name} image={user.image} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-purple-100 bg-white shadow-lg">
                  <div className="border-b border-purple-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50"
                  >
                    <User className="size-4" aria-hidden="true" />
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={btnOutline}>
                Login
              </Link>
              <Link href="/register" className={btnPrimary}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex size-9 items-center justify-center rounded-lg border border-purple-200 text-purple-700 transition-colors outline-none hover:bg-purple-50 focus-visible:ring-2 focus-visible:ring-purple-500/50 lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={cn(
          "grid transition-all duration-300 lg:hidden",
          isOpen ? "grid-rows-[1fr] border-t border-purple-100" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6"
          >
            {user && (
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                <UserAvatar name={user.name} image={user.image} size="size-10" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            {links.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}

            <div className="mt-2 flex flex-col gap-2 border-t border-purple-100 pt-3">
              {user ? (
                <>
                  <Link href="/profile" className={btnOutline}>
                    My Profile
                  </Link>
                  <button type="button" onClick={handleLogout} className={btnPrimary}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={btnOutline}>
                    Login
                  </Link>
                  <Link href="/register" className={btnPrimary}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
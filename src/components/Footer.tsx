import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    { href: "/add-book", label: "Add Book" },
    { href: "/my-books", label: "My Books" },
    { href: "/my-borrows", label: "My Borrows" },
];

const socials = [
    { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
    { href: "https://x.com", label: "X", icon: FaXTwitter },
    { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
    { href: "https://github.com", label: "GitHub", icon: FaGithub },
];

const Footer = () => {
    return (
        <footer className="mt-auto bg-gray-950 text-gray-300">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" aria-label="BookNook home" className="inline-flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 text-white shadow-md">
                                <BookOpen className="size-4" aria-hidden="true" />
                            </span>
                            <span className="text-lg font-bold tracking-tight text-white">
                                Book<span className="text-purple-400">Nook</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
                            A small online library where readers add books, borrow them for a
                            few days, and return them when they are done.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors duration-200 hover:bg-purple-600 hover:text-white"
                                >
                                    <Icon className="size-4" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                            Quick Links
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {quickLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-gray-400 transition-colors hover:text-purple-400"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                            Contact
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-purple-400" aria-hidden="true" />
                                <span>ChapaiNawabgonj, Rajshahi, Bangladesh</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-purple-400" aria-hidden="true" />
                                <a href="mailto:hello@booknook.com" className="transition-colors hover:text-purple-400">
                                    tohidulislamtamal@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 size-4 shrink-0 text-purple-400" aria-hidden="true" />
                                <a href="tel:+8801700000000" className="transition-colors hover:text-purple-400">
                                    +880 01780319876
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} BookNook. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
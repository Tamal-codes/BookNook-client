"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "/books.jpg",
    alt: "A shelf filled with art and design books",
    eyebrow: "Welcome to BookNook",
    title: "Find your next great read",
    text: "Explore a hand-picked shelf of fiction, art, and big ideas. There is always another story waiting for you.",
  },
  {
    image: "/bookshelf.jpg",
    alt: "A warmly lit library with tall wooden bookshelves",
    eyebrow: "A library that feels like home",
    title: "Wander through our collection",
    text: "From timeless classics to hidden gems, discover books shared by readers in your community.",
  },
  {
    image: "/readbooks.jpg",
    alt: "Open books spread out across a table",
    eyebrow: "Read, share, repeat",
    title: "Share the books you love",
    text: "Add favorites to your shelf, lend them to fellow readers, and keep track of every borrow in one place.",
  },
];

const HeroSlider = () => {
  return (
    <section aria-label="Featured books">
      <h1 className="sr-only">BookNook</h1>

      <Swiper
        modules={[Autoplay, Keyboard, Pagination]}
        loop
        speed={900}
        grabCursor
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        aria-roledescription="carousel"
        aria-label="Featured books"
        className="hero-swiper h-[520px] w-full outline-none sm:h-[560px] lg:h-[620px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.image}
            className="relative"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              preload={index === 0}
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 pb-16 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-500/20 px-3 py-1 text-xs font-medium tracking-wide text-purple-100 backdrop-blur-sm">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {slide.eyebrow}
                </span>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {slide.text}
                </p>

                <Link
                  href="/books"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-8 h-11 gap-2 rounded-full bg-purple-600 px-6 text-sm font-semibold text-white shadow-md hover:bg-purple-700"
                  )}
                >
                  Browse Books
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
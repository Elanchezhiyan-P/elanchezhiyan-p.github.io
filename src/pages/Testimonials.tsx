import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Quote,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Clock,
  Rocket,
  Layers,
  Target,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import testimonialsData from "../data/testimonials.json";
import { calculateYearsOfExperience } from "@/utils/dateUtils";

const VIEWPORT = { once: true, margin: "-80px" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  linkedin?: string;
  tags?: string[];
}

const testimonials = testimonialsData as Testimonial[];

/**
 * Featured testimonial — Giri Rajendran's, not the first in the list.
 * Chosen because it's the only quote that explicitly speaks to architecture
 * and scalability ("architect scalable solutions", "handles millions of
 * events daily"), which is what this portfolio is trying to establish.
 * The other quotes are genuine but speak to delivery/coding skill rather
 * than architecture, so they read better as supporting evidence in the
 * carousel below than as the lead.
 */
const FEATURED_ID = 3;
const featuredTestimonial =
  testimonials.find((t) => t.id === FEATURED_ID) ?? testimonials[0];
const carouselTestimonials = testimonials.filter(
  (t) => t.id !== featuredTestimonial.id
);

const TagPill: React.FC<{ tag: string }> = ({ tag }) => (
  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 text-blue-700 dark:text-blue-300 theme-green:text-green-700">
    {tag}
  </span>
);

const ReviewerIdentity: React.FC<{
  testimonial: Testimonial;
  avatarSize?: string;
}> = ({ testimonial, avatarSize = "w-12 h-12" }) => (
  <div className="flex items-center gap-3">
    <img
      src={testimonial.avatar}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`${avatarSize} rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0`}
    />
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
          {testimonial.name}
        </span>
        {testimonial.linkedin && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${testimonial.name} on LinkedIn`}
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-shrink-0"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
        {testimonial.role} &middot; {testimonial.company}
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const yearsExperience = calculateYearsOfExperience();
  const prefersReducedMotion = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    setScrollSnaps(api.scrollSnapList());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Gentle autoplay — pauses on hover/focus and never runs for visitors who
  // asked for reduced motion (WCAG 2.2.2: no unstoppable moving content).
  useEffect(() => {
    if (!api || isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [api, isPaused, prefersReducedMotion]);

  return (
    <>
      <Helmet>
        <title>Testimonials - Elanchezhiyan P | Client & Leadership Feedback</title>
        <meta
          name="description"
          content="Feedback from clients and technical leadership Elanchezhiyan P has worked with — on .NET development, scalable architecture, and delivery."
        />
        <meta
          name="keywords"
          content="Elanchezhiyan P Testimonials, Client Feedback, Software Developer Reviews, .NET Developer Testimonials"
        />
        <meta
          property="og:title"
          content="Testimonials - Elanchezhiyan P | Client & Leadership Feedback"
        />
        <meta
          property="og:description"
          content="Feedback from clients and technical leadership on .NET development, scalable architecture, and delivery."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/testimonials" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.08)}
          className="text-center mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 text-xs font-semibold tracking-[0.08em] uppercase text-blue-700 dark:text-blue-300 theme-green:text-green-700 mb-4"
          >
            Client & Leadership Feedback
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3"
          >
            What People I've Worked With Say
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed"
          >
            Trusted by people I've worked with across engineering, delivery, and
            technical leadership.
          </motion.p>
        </motion.div>

        {/* Featured Feedback */}
        <motion.section
          aria-labelledby="featured-feedback-heading"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2
            id="featured-feedback-heading"
            className="text-center text-xs font-semibold tracking-[0.08em] uppercase text-slate-400 dark:text-slate-500 mb-4"
          >
            Featured Feedback
          </h2>
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm">
            <Quote
              className="absolute top-6 right-6 w-6 h-6 text-slate-200 dark:text-slate-700"
              aria-hidden="true"
            />
            <blockquote className="text-base md:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-6 pr-8">
              "{featuredTestimonial.quote}"
            </blockquote>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ReviewerIdentity testimonial={featuredTestimonial} avatarSize="w-14 h-14" />
              {featuredTestimonial.tags && featuredTestimonial.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {featuredTestimonial.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* More Feedback — carousel */}
        <motion.section
          aria-label="More client and leadership feedback"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="max-w-6xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-center text-xs font-semibold tracking-[0.08em] uppercase text-slate-400 dark:text-slate-500 mb-6">
            More Feedback
          </h2>

          <div
            className="relative px-8 md:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {/* Capped at 2-per-row (not 3) even on wide screens — with
                    only a handful of real testimonials, showing all of them
                    at once leaves nothing to scroll to, which makes the
                    prev/next controls silently do nothing. */}
                {carouselTestimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="pl-4 md:pl-6 basis-full sm:basis-1/2"
                  >
                    <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                      <Quote
                        className="w-5 h-5 text-slate-200 dark:text-slate-700 mb-3"
                        aria-hidden="true"
                      />
                      <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5 flex-1">
                        "{testimonial.quote}"
                      </blockquote>
                      <ReviewerIdentity testimonial={testimonial} />
                      {testimonial.tags && testimonial.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          {testimonial.tags.map((tag) => (
                            <TagPill key={tag} tag={tag} />
                          ))}
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous feedback"
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next feedback"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {scrollSnaps.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-6">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to feedback ${index + 1}`}
                  aria-current={index === current}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    index === current
                      ? "bg-blue-600 theme-green:bg-green-600 w-6"
                      : "w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-blue-400 dark:hover:bg-blue-500"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.section>

        {/* Evidence strip — only claims backed by real data elsewhere on the
            site (years of experience is computed; "30+" projects matches the
            count used on Home/About). No client counts or satisfaction
            percentages, since nothing in the portfolio measures those. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.08)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12 md:mb-16"
        >
          {[
            { icon: Clock, value: `${yearsExperience}+`, label: "Years Experience" },
            { icon: Rocket, value: "30+", label: "Projects Shipped" },
            { icon: Layers, value: "Architecture", label: "Scalable backend & cloud systems" },
            { icon: Target, value: "Delivery", label: "Complex enterprise solutions" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 theme-green:text-green-600 mx-auto mb-2" />
              <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center"
        >
          <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
              Ready to work together?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-5 text-sm">
              Let's discuss your project and what it would take to bring it to
              production.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-700 theme-green:bg-green-700 hover:bg-blue-800 theme-green:hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition-colors duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              >
                View My Work
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Testimonials;

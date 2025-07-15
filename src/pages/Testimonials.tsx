import React from "react";
import { Star, Quote, Award, Users, Clock, CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import testimonialsData from "../data/testimonials.json";
import { calculateYearsOfExperience } from "@/utils/dateUtils";

const Testimonials = () => {
  // Carousel auto-scroll logic (mobile only)
  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let interval: NodeJS.Timeout | null = null;
    if (isMobile) {
      interval = setInterval(() => {
        const nextBtn = document.querySelector("[data-carousel-next]");
        if (nextBtn) (nextBtn as HTMLElement).click();
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  const yearsExperience = calculateYearsOfExperience();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  // Prepare testimonials for grid (all testimonials)
  const featuredTestimonial = testimonialsData[0];
  const carouselTestimonials = testimonialsData.slice(1);

  return (
    <div className="container mx-auto px-2 py-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full mb-2">
          <Award className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400">
            Client Testimonials
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent tracking-tight">
          What People Say
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-xl mx-auto leading-relaxed font-medium">
          Discover why clients and colleagues trust me to deliver exceptional
          results and innovative solutions.
        </p>
      </div>

      {/* Featured Testimonial */}
      {/* Featured Testimonial Card */}
      <div className="mb-10 flex justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <img
            src={featuredTestimonial.avatar}
            alt={featuredTestimonial.name}
            className="w-20 h-20 rounded-full object-cover mb-4 border border-gray-300 dark:border-gray-700 shadow"
          />
          <blockquote className="text-lg md:text-xl font-semibold mb-3 leading-relaxed text-gray-800 dark:text-gray-100 italic">
            "{featuredTestimonial.quote}"
          </blockquote>
          <div className="flex gap-1 mb-2 justify-center">
            {renderStars(featuredTestimonial.rating)}
          </div>
          <div className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1">
            {featuredTestimonial.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
            {featuredTestimonial.role}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-400 font-semibold mb-1">
            {featuredTestimonial.company}
          </div>
          <div className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full mt-2">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-xs font-semibold text-green-600">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel for Remaining */}
      <div className="max-w-3xl mx-auto mb-12 relative">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-1 md:-ml-2">
            {carouselTestimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center justify-center max-w-xs mx-auto py-10 px-6 text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg mb-4"
                  />
                  <div className="font-extrabold text-lg md:text-xl text-gray-900 dark:text-white mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-400 font-semibold mb-2">
                    {testimonial.company}
                  </div>
                  <div className="flex gap-1 mb-2 justify-center">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-base md:text-lg font-medium mb-2 leading-relaxed text-gray-800 dark:text-gray-100 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Always show navigation icons for mobile and desktop, larger and absolutely positioned for mobile */}
          <CarouselPrevious
            className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-8 md:h-8 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-0 shadow rounded-full text-2xl md:text-xl"
            style={{ fontSize: "2rem" }}
          >
            &#60;
          </CarouselPrevious>
          <CarouselNext
            className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-8 md:h-8 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-0 shadow rounded-full text-2xl md:text-xl"
            style={{ fontSize: "2rem" }}
          >
            &#62;
          </CarouselNext>
        </Carousel>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
          <div className="relative rounded-xl p-7 md:p-10 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Quote className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent tracking-tight">
              Ready to work together?
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-5 text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium">
              Let's discuss your project and create something amazing together.
              I'm here to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-base md:text-lg"
              >
                <span>Get In Touch</span>
                <CheckCircle className="h-5 w-5 ml-2" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-base md:text-lg"
              >
                <span>View My Work</span>
                <CheckCircle className="h-5 w-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

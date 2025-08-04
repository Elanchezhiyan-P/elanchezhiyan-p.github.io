import React from "react";
import { Link } from "react-router-dom";
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
        <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent tracking-tight">
          What People Say
        </h1>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 max-w-xl mx-auto leading-relaxed font-medium">
          Discover why clients and colleagues trust me to deliver exceptional
          results and innovative solutions.
        </p>
      </div>

      {/* Featured Testimonial Card */}
      <div className="mb-10 flex justify-center">
        <div className="max-w-lg w-full bg-white dark:bg-gray-900 border border-blue-200 dark:border-purple-700 rounded-xl shadow p-7 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <img
            src={featuredTestimonial.avatar}
            alt={featuredTestimonial.name}
            className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-400 dark:border-purple-500 shadow"
          />
          <blockquote className="text-base md:text-lg font-medium mb-3 leading-relaxed text-gray-800 dark:text-gray-100 italic">
            "{featuredTestimonial.quote}"
          </blockquote>
          <div className="flex gap-1 mb-2 justify-center">
            {renderStars(featuredTestimonial.rating)}
          </div>
          <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            {featuredTestimonial.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
            {featuredTestimonial.role}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-400 font-semibold mb-1">
            {featuredTestimonial.company}
          </div>
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full mt-2 shadow">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-xs font-semibold text-green-600">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel for Remaining */}
      <div className="max-w-3xl mx-auto mb-14 relative">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-1 md:-ml-2">
            {carouselTestimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow flex flex-col items-center justify-center max-w-xs mx-auto py-7 px-5 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-blue-100 dark:border-purple-700">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400 dark:border-purple-500 shadow mb-3"
                  />
                  <div className="font-bold text-base text-gray-900 dark:text-white mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold mb-1">
                    {testimonial.company}
                  </div>
                  <div className="flex gap-1 mb-2 justify-center">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-sm md:text-base font-normal mb-2 leading-relaxed text-gray-800 dark:text-gray-100 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation icons - larger, higher contrast, and more visible */}
          <CarouselPrevious
            className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-purple-700 border-0 shadow rounded-full text-xl"
            style={{ fontSize: "1.5rem" }}
          >
            &#60;
          </CarouselPrevious>
          <CarouselNext
            className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-blue-700 border-0 shadow rounded-full text-xl"
            style={{ fontSize: "1.5rem" }}
          >
            &#62;
          </CarouselNext>
        </Carousel>
      </div>

      {/* Call to Action Section */}
      <div className="mt-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ready to work together?
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
          Let's discuss your project and create something amazing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-1">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-white" />
              <span className="ml-1">Get In Touch</span>
            </span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-white text-blue-600 theme-green:text-green-600 border border-blue-200 theme-green:border-green-200 hover:bg-blue-50 theme-green:hover:bg-green-50 font-semibold rounded-lg shadow transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600 theme-green:text-green-600" />
              <span className="ml-1">View My Work</span>
            </span>
          </Link>
        </div>
        <div className="w-full flex justify-center mt-5">
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
  
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
      <div className="mb-12 flex justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-gray-900 border-2 border-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-xl p-10 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <img
            src={featuredTestimonial.avatar}
            alt={featuredTestimonial.name}
            className="w-24 h-24 rounded-full object-cover mb-5 border-4 border-blue-400 dark:border-purple-500 shadow-lg"
          />
          <blockquote className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed text-gray-800 dark:text-gray-100 italic">
            "{featuredTestimonial.quote}"
          </blockquote>
          <div className="flex gap-1 mb-3 justify-center">
            {renderStars(featuredTestimonial.rating)}
          </div>
          <div className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
            {featuredTestimonial.name}
          </div>
          <div className="text-base text-gray-600 dark:text-gray-300 font-medium mb-2">
            {featuredTestimonial.role}
          </div>
          <div className="text-base text-blue-700 dark:text-blue-400 font-semibold mb-2">
            {featuredTestimonial.company}
          </div>
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full mt-3 shadow">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel for Remaining */}
      <div className="max-w-3xl mx-auto mb-16 relative">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-1 md:-ml-2">
            {carouselTestimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center justify-center max-w-xs mx-auto py-10 px-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl border-2 border-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-400 dark:border-purple-500 shadow-lg mb-4"
                  />
                  <div className="font-extrabold text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
                    {testimonial.name}
                  </div>
                  <div className="text-base text-gray-600 dark:text-gray-300 font-medium mb-2">
                    {testimonial.role}
                  </div>
                  <div className="text-base text-blue-700 dark:text-blue-400 font-semibold mb-2">
                    {testimonial.company}
                  </div>
                  <div className="flex gap-1 mb-3 justify-center">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-lg md:text-xl font-medium mb-3 leading-relaxed text-gray-800 dark:text-gray-100 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation icons - larger, higher contrast, and more visible */}
          <CarouselPrevious
            className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:bg-blue-700 dark:hover:bg-purple-700 border-0 shadow-lg rounded-full text-3xl md:text-2xl"
            style={{ fontSize: "2.5rem" }}
          >
            &#60;
          </CarouselPrevious>
          <CarouselNext
            className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:bg-purple-700 dark:hover:bg-blue-700 border-0 shadow-lg rounded-full text-3xl md:text-2xl"
            style={{ fontSize: "2.5rem" }}
          >
            &#62;
          </CarouselNext>
        </Carousel>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10 md:mt-16">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
          <div className="relative rounded-xl p-5 md:p-7 bg-white dark:bg-gray-900 shadow-xl border border-blue-100 dark:border-blue-900 flex flex-col items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Quote className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent tracking-tight">
              Ready to work together?
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-base md:text-lg max-w-md mx-auto leading-relaxed font-medium">
              Let's discuss your project and create something amazing together.
              <br />
              I'm here to turn your vision into reality.
            </p>
            <ul className="text-left text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4 list-disc list-inside">
              <li>Fast response & clear communication</li>
              <li>Custom solutions for your needs</li>
              <li>Proven track record & client satisfaction</li>
            </ul>
            {/* <div className="mb-4 text-sm text-blue-700 dark:text-blue-400 font-semibold">
              <span>Email: </span>
              <a
                href="mailto:elanche97@gmail.com"
                className="underline hover:text-blue-900"
              >
                elanche97@gmail.com
              </a>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-1">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-7 py-2.5 md:px-9 md:py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base md:text-lg transform hover:scale-105 hover:brightness-110"
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12v1a4 4 0 01-8 0v-1m8 0V8a4 4 0 00-8 0v4m8 0a4 4 0 01-8 0"
                    />
                  </svg>
                  <span className="ml-1">Get In Touch</span>
                </span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-3 px-7 py-2.5 md:px-9 md:py-3 bg-gradient-to-r from-purple-600 to-pink-400 text-white font-bold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 text-base md:text-lg transform hover:scale-105 hover:brightness-110"
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v4a1 1 0 001 1h3v4a1 1 0 001 1h4a1 1 0 001-1v-4h3a1 1 0 001-1V7"
                    />
                  </svg>
                  <span className="ml-1">View My Work</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center mt-6">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

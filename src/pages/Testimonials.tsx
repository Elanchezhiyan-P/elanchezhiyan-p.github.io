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

  // Exclude the first testimonial from the carousel
  const carouselTestimonials = testimonialsData.slice(1);

  // Carousel auto-slide logic
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselTestimonials.length]);

  return (
    <div className="container mx-auto px-2 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full mb-2">
          <Award className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-600">
            Client Testimonials
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What People Say
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          Discover why clients and colleagues trust me to deliver exceptional
          results and innovative solutions.
        </p>
      </div>

      {/* Featured Testimonial */}
      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
          <div className="relative rounded-xl p-5 md:p-7 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative">
                <img
                  src={testimonialsData[0].avatar}
                  alt={testimonialsData[0].name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover border-2 border-white/20 shadow"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full">
                  <Quote className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-1 mb-1">
                  {renderStars(testimonialsData[0].rating)}
                </div>
                <blockquote className="text-base md:text-lg font-medium mb-2 leading-relaxed text-gray-800 dark:text-gray-100">
                  "{testimonialsData[0].quote}"
                </blockquote>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm md:text-base text-gray-900 dark:text-white">
                    {testimonialsData[0].name}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                    {testimonialsData[0].role}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                    {testimonialsData[0].company}
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full ml-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">
                      Verified
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-3xl mx-auto mb-8 relative">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-lg font-semibold text-center">Client Reviews</h2>
          <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>
        {/* Side swipe/arrow icon for mobile */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden">
          <div className="flex flex-col items-center gap-1 animate-bounce">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-xs text-blue-500">Swipe</span>
          </div>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-1 md:-ml-2">
            {carouselTestimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-1 md:pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                  <div className="relative rounded-xl p-4 md:p-6 bg-white dark:bg-gray-900 border border-blue-50 dark:border-blue-900 h-full group-hover:scale-105 transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-9 h-9 md:w-12 md:h-12 rounded-lg object-cover border border-blue-500/10 shadow"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm md:text-base text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs font-medium">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-0 shadow" />
          <CarouselNext className="hidden md:flex bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-0 shadow" />
        </Carousel>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative rounded-xl p-4 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-900">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-1">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-blue-600 mb-0.5">30+</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Projects
            </div>
          </div>
          <div className="relative rounded-xl p-4 text-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-100 dark:border-green-900">
            <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-1">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-green-600 mb-0.5">20+</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Clients
            </div>
          </div>
          <div className="relative rounded-xl p-4 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-100 dark:border-purple-900">
            <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-1">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-purple-600 mb-0.5">
              {yearsExperience}+
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Years
            </div>
          </div>
          <div className="relative rounded-xl p-4 text-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border border-orange-100 dark:border-orange-900">
            <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-1">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-orange-600 mb-0.5">99%</div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
          <div className="relative rounded-xl p-6 md:p-8 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Quote className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to work together?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Let's discuss your project and create something amazing together.
              I'm here to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm md:text-base"
              >
                <span>Get In Touch</span>
                <CheckCircle className="h-4 w-4 ml-2" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-sm md:text-base"
              >
                <span>View My Work</span>
                <CheckCircle className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

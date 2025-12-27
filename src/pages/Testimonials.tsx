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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full mb-3">
          <Award className="h-3 w-3 text-blue-600" />
          <span className="text-xs font-medium text-blue-600">
            Client Testimonials
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What People Say
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover why clients and colleagues trust me to deliver exceptional
          results and innovative solutions
        </p>
      </div>

      {/* Featured Testimonial */}
      <div className="mb-8">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>

          <div className="relative glass rounded-2xl p-4 md:p-6 max-w-3xl mx-auto animate-slide-up border border-white/20 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonialsData[0].avatar}
                      alt={testimonialsData[0].name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover border-2 border-white/20 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full">
                      <Quote className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex gap-0.5 mb-2">
                    {renderStars(testimonialsData[0].rating)}
                  </div>

                  <blockquote className="text-sm md:text-base lg:text-lg font-medium mb-3 leading-relaxed text-gray-800 dark:text-gray-100">
                    "{testimonialsData[0].quote}"
                  </blockquote>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
                        {testimonialsData[0].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                        {testimonialsData[0].role}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                        {testimonialsData[0].company}
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
                      <CheckCircle className="h-2.5 w-2.5 text-green-600" />
                      <span className="text-xs font-medium text-green-600">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-center">Client Reviews</h2>
          <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonialsData.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative">
                  {/* Card background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                  <div className="relative glass rounded-2xl p-8 h-full hover:scale-105 transition-all duration-500 border border-white/10 backdrop-blur-sm group-hover:border-blue-500/30">
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Quote className="h-8 w-8 text-blue-500" />
                    </div>

                    {/* Avatar and info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-xl object-cover border-2 border-blue-500/20 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Hover effect indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-0 shadow-lg" />
          <CarouselNext className="hidden md:flex bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border-0 shadow-lg" />
        </Carousel>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative glass rounded-xl p-4 md:p-5 text-center animate-slide-up border border-white/10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">30+</div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
                Projects Completed
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              className="relative glass rounded-xl p-4 md:p-5 text-center animate-slide-up border border-white/10"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">20+</div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
                Happy Clients
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              className="relative glass rounded-xl p-4 md:p-5 text-center animate-slide-up border border-white/10"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                {yearsExperience}+
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
                Years Experience
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              className="relative glass rounded-xl p-4 md:p-5 text-center animate-slide-up border border-white/10"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">99%</div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
          <div className="relative glass rounded-2xl p-6 md:p-8 border border-white/20 backdrop-blur-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Quote className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to work together?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together.
              I'm here to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm md:text-base"
              >
                <span>Get In Touch</span>
                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-sm md:text-base"
              >
                <span>View My Work</span>
                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

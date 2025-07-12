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
    <div className="container mx-auto px-4 py-20">
      {/* Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-6">
          <Award className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">
            Client Testimonials
          </span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What People Say
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover why clients and colleagues trust me to deliver exceptional
          results and innovative solutions
        </p>
      </div>

      {/* Featured Testimonial */}
      <div className="mb-20">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>

          <div className="relative glass rounded-3xl p-10 max-w-5xl mx-auto animate-slide-up border border-white/20 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonialsData[0].avatar}
                      alt={testimonialsData[0].name}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonialsData[0].rating)}
                  </div>

                  <blockquote className="text-2xl lg:text-3xl font-medium mb-6 leading-relaxed text-gray-800 dark:text-gray-100">
                    "{testimonialsData[0].quote}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">
                        {testimonialsData[0].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">
                        {testimonialsData[0].role}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {testimonialsData[0].company}
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Verified Client
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
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-center">Client Reviews</h2>
          <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
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
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative glass rounded-2xl p-8 text-center animate-slide-up border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Projects Completed
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              className="relative glass rounded-2xl p-8 text-center animate-slide-up border border-white/10"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">20+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Happy Clients
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              className="relative glass rounded-2xl p-8 text-center animate-slide-up border border-white/10"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {yearsExperience}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Years Experience
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              className="relative glass rounded-2xl p-8 text-center animate-slide-up border border-white/10"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative glass rounded-3xl p-12 border border-white/20 backdrop-blur-sm">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Quote className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to work together?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project and create something amazing together.
              I'm here to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 md:px-10 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-lg md:text-xl"
              >
                <span>Get In Touch</span>
                <CheckCircle className="h-5 w-5 ml-2" />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 md:px-10 md:py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-lg md:text-xl"
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

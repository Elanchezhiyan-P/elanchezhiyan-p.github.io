import React from "react";
import { Star, Quote } from "lucide-react";
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
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Testimonials</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          What clients and colleagues say about working with me
        </p>
      </div>

      {/* Featured Testimonial */}
      <div className="mb-16">
        <div className="glass rounded-xl p-8 max-w-4xl mx-auto animate-slide-up">
          <div className="text-center">
            <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
              "{testimonialsData[0].quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonialsData[0].avatar}
                alt={testimonialsData[0].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
              />
              <div className="text-left">
                <div className="font-bold text-lg">
                  {testimonialsData[0].name}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {testimonialsData[0].role}
                </div>
                <div className="text-blue-600 text-sm">
                  {testimonialsData[0].company}
                </div>
                <div className="flex gap-1 mt-1">
                  {renderStars(testimonialsData[0].rating)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded"></span>
          Client Reviews
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonialsData.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="glass rounded-xl p-6 h-full hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                    />
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-blue-600">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Stats Section */}
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass rounded-xl p-6 text-center animate-slide-up">
            <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
            <div className="text-gray-600 dark:text-gray-300">
              Projects Completed
            </div>
          </div>
          <div
            className="glass rounded-xl p-6 text-center animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600 dark:text-gray-300">
              Happy Clients
            </div>
          </div>
          <div
            className="glass rounded-xl p-6 text-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {yearsExperience}+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Years Experience
            </div>
          </div>
          <div
            className="glass rounded-xl p-6 text-center animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-300">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to work together?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let's discuss your project and create something amazing together.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

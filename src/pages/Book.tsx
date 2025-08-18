import React from "react";
import { Helmet } from "react-helmet-async";
import { topmateServices } from "@/data/topmateServices";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Book = () => {
  // Fallback/loading state for future dynamic fetch
  const [loading] = React.useState(false);
  // In real use, fetch services and set loading accordingly

  return (
    <>
      <Helmet>
        <title>Book a Service | Elanchezhiyan P</title>
        <meta
          name="description"
          content="Book a consultation, mentorship, or digital service with Elanchezhiyan P via Topmate. Choose from video meetings, resume reviews, and more."
        />
      </Helmet>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 py-12 relative z-10"
        role="main"
        aria-label="Book Professional Services with Elanchezhiyan"
      >
        <div className="container mx-auto px-2">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book a Service
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Choose a service below to book a session or purchase a digital
            product. All bookings are securely handled via Topmate.
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
              <span className="ml-4 text-lg">Loading services...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {topmateServices.map((service) => (
                <Card
                  data-particle-mask
                  key={service.id}
                  className="group transition-all duration-200 hover:shadow-lg hover:border-blue-500 border border-gray-200 dark:border-gray-800 relative overflow-hidden"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-semibold flex-1">
                        {service.title}
                      </h2>
                      {service.badge && (
                        <Badge className="ml-2 bg-blue-600 text-white animate-pulse">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{service.type}</span>
                      {service.duration && <span className="mx-2">•</span>}
                      {service.duration && <span>{service.duration}</span>}
                    </div>
                    <div className="mb-4">
                      {service.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-blue-700 dark:text-blue-400 mr-2">
                            ₹{service.discountPrice}
                          </span>
                          <span className="line-through text-gray-400">
                            ₹{service.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                          ₹{service.price}
                        </span>
                      )}
                    </div>
                    <Button
                      asChild
                      className="mt-auto w-full group-hover:scale-105 transition-transform"
                      variant="default"
                    >
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Now
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;

import { Testimonial } from "../data/testimonials";
import testimonialsJson from "../data/testimonials.json";

// Simulated data storage (in a real app, this would be API calls)
let testimonialsData: Testimonial[] = [
  {
    id: 1,
    text: "Working with Elanchezhiyan was a fantastic experience. Their deep knowledge of Azure and .NET helped us create a robust enterprise solution that exceeded our expectations.",
    author: "Alex Johnson",
    position: "CTO",
    company: "TechSolutions Inc.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    id: 2,
    text: "I've collaborated with many developers, but few have shown such attention to detail and code quality. Their work on our financial platform was exceptional, delivering both performance and reliability.",
    author: "Emma Williams",
    position: "Lead Engineer",
    company: "FinPlus Systems",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 3,
    text: "Their expertise in React and .NET integration saved our project from significant delays. Not only did they build a beautiful frontend, but they ensured seamless data flow with our backend services.",
    author: "Michael Chen",
    position: "Product Manager",
    company: "DataViz Corp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
];

export const getTestimonialById = (id: number): Testimonial | undefined => {
  return testimonialsJson.testimonials.find(
    (testimonial) => testimonial.id === id
  );
};

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    return testimonialsJson.testimonials;
  } catch (error) {
    console.error("Error loading JSON testimonials:", error);
    return [];
  }
};

export const addTestimonial = (
  testimonial: Omit<Testimonial, "id">
): Testimonial => {
  const newId = Math.max(...testimonialsData.map((t) => t.id)) + 1;
  const newTestimonial = {
    ...testimonial,
    id: newId,
  };
  testimonialsData.push(newTestimonial);
  console.log("Testimonial added:", newTestimonial);
  return newTestimonial;
};

export const updateTestimonial = (
  id: number,
  updatedTestimonial: Omit<Testimonial, "id">
): Testimonial | undefined => {
  const index = testimonialsData.findIndex(
    (testimonial) => testimonial.id === id
  );
  if (index !== -1) {
    testimonialsData[index] = {
      ...updatedTestimonial,
      id,
    };
    console.log("Testimonial updated:", testimonialsData[index]);
    return testimonialsData[index];
  }
  return undefined;
};

export const deleteTestimonial = (id: number): boolean => {
  const index = testimonialsData.findIndex(
    (testimonial) => testimonial.id === id
  );
  if (index !== -1) {
    testimonialsData.splice(index, 1);
    console.log("Testimonial deleted with id:", id);
    return true;
  }
  return false;
};

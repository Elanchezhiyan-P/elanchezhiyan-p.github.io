export interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}

import {
  getAllTestimonials,
  addTestimonial as addTestimonialToManager,
} from "../utils/testimonialsManager";

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const res = await fetch("/data/testimonials.json");
    const json: TestimonialsData = await res.json();
    return json.testimonials;
  } catch (error) {
    console.error("Error fetching testimonials from JSON:", error);
    return [];
  }
};

export const addTestimonial = async (
  testimonial: Omit<Testimonial, "id">
): Promise<boolean> => {
  try {
    addTestimonialToManager(testimonial);
    return true;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return false;
  }
};

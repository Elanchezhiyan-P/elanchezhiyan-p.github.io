import { motion } from "framer-motion";
import Testimonials from "./Testimonials";

const TestimonialsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-8"
    >
      <Testimonials />
    </motion.section>
  );
};

export default TestimonialsSection;

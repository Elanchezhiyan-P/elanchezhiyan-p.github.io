import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  ArrowRight,
  Star,
  MessageSquare,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com"; // Added EmailJS import
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { topmateServices } from "@/data/topmateServices";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email address!",
        description:
          "Please enter a valid email address and avoid using disposable/test email services.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // EmailJS integration
    const serviceID = "elan_serviceId"; // Replace with your EmailJS service ID
    const templateID = "template_contactus"; // Replace with your EmailJS template ID
    const userID = "FYZYdf1_r-enWrKCY"; // Replace with your EmailJS public key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
      },
      (error) => {
        toast({
          title: "Failed to send message.",
          description: "Please try again later or contact me directly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    );
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "elanche97@gmail.com",
      href: "mailto:elanche97@gmail.com",
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9942644999",
      href: "tel:+919942644999",
      description: "Call me directly",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Coimbatore, Tamil Nadu, India",
      href: "https://maps.google.com/?q=Coimbatore,Tamil+Nadu,India",
      description: "Based in South India",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Response",
      description: "I typically respond within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Free Consultation",
      description: "Let's discuss your project requirements",
    },
    {
      icon: Users,
      title: "Remote Collaboration",
      description: "Work with teams worldwide",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Efficient development process",
    },
  ];

  const testimonials = [
    {
      text: "Elan delivered our project ahead of schedule with exceptional quality.",
      author: "Sarah Chen",
      role: "Product Manager",
    },
    {
      text: "Professional, responsive, and incredibly skilled developer.",
      author: "Mike Rodriguez",
      role: "Startup Founder",
    },
  ];

  // Disable right-click on this page
  React.useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Email validation function
  const isValidEmail = (email: string) => {
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    // Block test/disposable domains
    const blockedDomains = [
      "mailinator.com",
      "guerrillamail.com",
      "10minutemail.com",
      "tempmail.com",
      "yopmail.com",
      "trashmail.com",
      "fakeinbox.com",
      "getnada.com",
      "dispostable.com",
      "mintemail.com",
      "spamgourmet.com",
      "sharklasers.com",
      "maildrop.cc",
      "moakt.com",
      "mytemp.email",
      "throwawaymail.com",
      "mailnesia.com",
      "mailcatch.com",
      "mail-temp.com",
      "emailondeck.com",
      "temp-mail.org",
      "temp-mail.io",
      "temp-mail.xyz",
      "temp-mail.com",
      "temp-mail.net",
      "temp-mail.info",
      "temp-mail.biz",
      "temp-mail.us",
      "temp-mail.co",
      "temp-mail.cc",
      "temp-mail.top",
      "temp-mail.site",
      "temp-mail.store",
      "temp-mail.world",
      "temp-mail.space",
      "temp-mail.online",
      "temp-mail.email",
      "temp-mail.cloud",
      "temp-mail.lol",
      "temp-mail.fun",
      "temp-mail.today",
      "temp-mail.pro",
      "temp-mail.app",
      "temp-mail.page",
      "temp-mail.tech",
      "temp-mail.systems",
      "temp-mail.services",
      "temp-mail.tools",
      "temp-mail.website",
      "temp-mail.zone",
      "temp-mail.group",
      "temp-mail.team",
      "temp-mail.company",
      "temp-mail.center",
      "temp-mail.city",
      "temp-mail.club",
      "temp-mail.community",
      "temp-mail.cool",
      "temp-mail.expert",
      "temp-mail.family",
      "temp-mail.games",
      "temp-mail.guru",
      "temp-mail.house",
      "temp-mail.life",
      "temp-mail.love",
      "temp-mail.media",
      "temp-mail.money",
      "temp-mail.news",
      "temp-mail.party",
      "temp-mail.press",
      "temp-mail.pub",
      "temp-mail.rest",
      "temp-mail.run",
      "temp-mail.shop",
      "temp-mail.show",
      "temp-mail.site",
      "temp-mail.social",
      "temp-mail.store",
      "temp-mail.tech",
      "temp-mail.today",
      "temp-mail.tools",
      "temp-mail.top",
      "temp-mail.trade",
      "temp-mail.tv",
      "temp-mail.us",
      "temp-mail.vip",
      "temp-mail.work",
      "temp-mail.world",
      "temp-mail.xyz",
      "tempmail.net",
      "tempmail.org",
      "tempmail.us",
      "tempmail.xyz",
      "tempmail.email",
      "tempmail.lol",
      "tempmail.fun",
      "tempmail.today",
      "tempmail.pro",
      "tempmail.app",
      "tempmail.page",
      "tempmail.tech",
      "tempmail.systems",
      "tempmail.services",
      "tempmail.tools",
      "tempmail.website",
      "tempmail.zone",
      "tempmail.group",
      "tempmail.team",
      "tempmail.company",
      "tempmail.center",
      "tempmail.city",
      "tempmail.club",
      "tempmail.community",
      "tempmail.cool",
      "tempmail.expert",
      "tempmail.family",
      "tempmail.games",
      "tempmail.guru",
      "tempmail.house",
      "tempmail.life",
      "tempmail.love",
      "tempmail.media",
      "tempmail.money",
      "tempmail.news",
      "tempmail.party",
      "tempmail.press",
      "tempmail.pub",
      "tempmail.rest",
      "tempmail.run",
      "tempmail.shop",
      "tempmail.show",
      "tempmail.site",
      "tempmail.social",
      "tempmail.store",
      "tempmail.tech",
      "tempmail.today",
      "tempmail.tools",
      "tempmail.top",
      "tempmail.trade",
      "tempmail.tv",
      "tempmail.us",
      "tempmail.vip",
      "tempmail.work",
      "tempmail.world",
      "tempmail.xyz",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    if (domain && blockedDomains.includes(domain)) return false;
    return true;
  };

  // Check if all mandatory fields are filled and email is valid
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.subject.trim() !== "" &&
    formData.message.trim() !== "" &&
    isValidEmail(formData.email);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 relative z-10"
      role="main"
      aria-label="Contact Elanchezhiyan - Get in Touch"
    >
      <div className="container mx-auto px-2 py-12">
        {/* Hero Section */}
        <section
          className="text-center mb-10"
          aria-labelledby="contact-heading"
          role="region"
        >
          <h1
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Contact Me
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Let's discuss your next project and build something amazing
            together.
          </p>
        </section>

        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          aria-labelledby="contact-form-heading"
          role="region"
        >
          {/* Contact Form */}
          <div
            className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900"
            role="form"
            aria-labelledby="contact-form-heading"
          >
            <h2 id="contact-form-heading" className="text-xl font-bold mb-4">
              Send me a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors text-sm"
                    placeholder="John Doe"
                    aria-describedby="name-error"
                    aria-invalid={
                      formData.name.trim() === "" && formData.name !== ""
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors text-sm"
                    placeholder="john@example.com"
                    aria-describedby="email-error"
                    aria-invalid={
                      !isValidEmail(formData.email) && formData.email !== ""
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-medium mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors text-sm"
                  placeholder="Project Discussion"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors text-sm resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full py-2 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Features */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 shadow border border-blue-100 dark:border-blue-900">
              <h2 className="text-xl font-bold mb-4">Get in touch</h2>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors group"
                  >
                    <info.icon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium text-sm">{info.label}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold text-xs">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 shadow border border-green-100 dark:border-green-900">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-bold text-xs">Quick Response Guarantee</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                I typically respond to all inquiries within 24 hours. For urgent
                projects, feel free to reach out via phone or LinkedIn for
                faster communication.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded Map */}
        <section className="mt-12 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow border border-blue-100 dark:border-blue-900">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d159370.4936359196!2d76.8703483!3d11.0168449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1642092741015!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coimbatore Location"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Professional Services Section */}
        <section className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get personalized guidance and support for your career and projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topmateServices.slice(0, 6).map((service) => (
              <Card
                data-particle-mask
                key={service.id}
                className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    {service.badge && (
                      <Badge
                        className={`ml-2 text-xs px-2 py-1 ${
                          service.badge === "Free"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : service.badge === "Popular"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                            : service.badge === "Best Deal"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                        }`}
                      >
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {service.type}
                      </span>
                      {service.duration && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {service.duration}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      {service.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${service.discountPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${service.price}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`text-lg font-bold ${
                            service.price === 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {service.price === 0 ? "Free" : `$${service.price}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white transition-all duration-300 hover:scale-105"
                  >
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Book Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/20 theme-green:border-green-600 theme-green:text-green-600 theme-green:hover:bg-green-50 theme-green:dark:border-green-400 theme-green:dark:text-green-400 theme-green:dark:hover:bg-green-950/20"
            >
              <a
                href="https://topmate.io/elanchezhiyan_poosamani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                View All Services
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
              <h3 className="font-bold mb-1 text-xs">
                What's your typical project timeline?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                Project timelines vary based on complexity, but most web
                applications take 2-8 weeks from start to deployment.
              </p>
            </div>
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
              <h3 className="font-bold mb-1 text-xs">
                Do you work with remote teams?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                Yes! I have extensive experience working with distributed teams
                across different time zones.
              </p>
            </div>
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
              <h3 className="font-bold mb-1 text-xs">
                What technologies do you specialize in?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                I specialize in .NET Core, Azure cloud services, React, and
                modern DevOps practices.
              </p>
            </div>
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
              <h3 className="font-bold mb-1 text-xs">
                Do you provide ongoing support?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                Yes, I offer maintenance and support packages to keep your
                applications running smoothly.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="rounded-xl p-8 bg-white dark:bg-gray-900 border border-blue-200 dark:border-purple-700 shadow max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
              Let's discuss your ideas and turn them into reality. I'm here to
              help you build something amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-1">
              <Button
                onClick={() => document.getElementById("name")?.focus()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-colors duration-300 text-base transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-white" />
                  <span className="ml-1">Start a Project</span>
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open("mailto:elanche97@gmail.com", "_blank")
                }
                className="px-6 py-2 border border-blue-200 theme-green:border-green-200 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 font-semibold rounded-lg shadow transition-colors duration-300 text-base transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600 theme-green:text-green-600" />
                  <span className="ml-1">Send Email</span>
                </span>
              </Button>
              <Button
                variant="default"
                onClick={() => (window.location.hash = "#/book")}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-300 text-base transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-white" />
                  <span className="ml-1">Book Me</span>
                </span>
              </Button>
            </div>
            <div className="w-full flex justify-center mt-5">
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;

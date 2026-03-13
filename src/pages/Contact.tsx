import React, { useState, useCallback, useRef } from "react";
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
import { Helmet } from "react-helmet-async";
import emailjs from "emailjs-com";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackContactFormSubmit, trackBookCall } from "@/utils/analytics";

const Contact = () => {
  const formMountTime = useRef(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError(null);

      const timeTaken = Date.now() - formMountTime.current;
      const companyFilled = formData.company.trim() !== "";

      if (companyFilled || timeTaken < 3000) {
        return;
      }

      if (!isValidEmail(formData.email)) {
        setFormError(
          "Please enter a valid email address and avoid using disposable/test email services.",
        );
        toast({
          title: "Invalid email address!",
          description:
            "Please enter a valid email address and avoid using disposable/test email services.",
          variant: "destructive",
        });
        return;
      }

      if (!turnstileToken) {
        setFormError("Please complete the verification before sending.");
        return;
      }

      setIsSubmitting(true);

      const serviceID = "elan_contact_us";
      const templateID = "template_contactus";
      const userID = "vg0hRqmxIAQA94rHt";

      const templateParams = {
        name: formData.name,
        email: formData.email,
        inquiry_type: formData.inquiryType,
        subject: `[${formData.inquiryType}] ${formData.subject}`,
        message: formData.message,
        turnstileToken,
      };

      try {
        await emailjs.send(serviceID, templateID, templateParams, userID);

        trackContactFormSubmit();
        toast({
          title: "Message sent successfully!",
          description:
            "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          inquiryType: "",
          subject: "",
          message: "",
          company: "",
        });
        setTurnstileToken(null);
        if (turnstileRef.current) {
          turnstileRef.current.reset();
        }
      } catch (error) {
        setFormError(
          "Failed to send message. Please try again later or contact me directly.",
        );
        toast({
          title: "Failed to send message.",
          description: "Please try again later or contact me directly.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, toast, turnstileToken],
  );

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
      title: "Remote Work",
      description: "Work with teams worldwide",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Efficient development process",
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
    <>
      <Helmet>
        <title>Contact - Elanchezhiyan P | Get In Touch</title>
        <meta
          name="description"
          content="Contact Elanchezhiyan P for freelance projects, consultations, or collaborations. B.E graduate and Senior .NET & Azure Developer available for remote work. Quick response guaranteed."
        />
        <meta
          name="keywords"
          content="Contact Elanchezhiyan P, Hire Developer, Freelance .NET Developer, Azure Developer, Software Development Services"
        />
        <meta
          property="og:title"
          content="Contact - Elanchezhiyan P | Get In Touch"
        />
        <meta
          property="og:description"
          content="Get in touch for freelance projects, consultations, or collaborations. Quick response within 24 hours."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/contact" />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-20">
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Me</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Let's discuss your next project and build something amazing
              together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute opacity-0 pointer-events-none h-0 w-0"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium mb-2"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey="0x4AAAAAACewOzRpVzmZoHfo"
                      appearance="interaction-only"
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                        setFormError(null);
                      }}
                      onExpire={() => {
                        setTurnstileToken(null);
                        setFormError(
                          "Verification expired. Please complete the verification again.",
                        );
                      }}
                      onError={() => {
                        setTurnstileToken(null);
                        setFormError(
                          "Verification failed. Please refresh the page and try again.",
                        );
                      }}
                    />
                    {formError && (
                      <p className="text-sm text-red-500">{formError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !isFormValid || !turnstileToken}
                    className="w-full"
                    size="lg"
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
            </div>

            {/* Contact Info & Features */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        <info.icon className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="font-medium">{info.label}</div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="glass rounded-xl p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-w-0"
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-3 min-w-0">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                        <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-xs md:text-sm break-words min-w-0 flex-1">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs break-words">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Response Promise */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="font-bold">Quick Response Guarantee</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  I typically respond to all inquiries within 24 hours. For
                  urgent projects, feel free to reach out via phone or LinkedIn
                  for faster communication.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="glass rounded-xl overflow-hidden">
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
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-2">
                  What's your typical project timeline?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Project timelines vary based on complexity, but most web
                  applications take 2-8 weeks from start to deployment.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-2">
                  Do you work with remote teams?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes! I have extensive experience working with distributed
                  teams across different time zones.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-2">
                  What technologies do you specialize in?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  I specialize in .NET Core, Azure cloud services, React, and
                  modern DevOps practices.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-bold mb-2">
                  Do you provide ongoing support?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes, I offer maintenance and support packages to keep your
                  applications running smoothly.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="glass rounded-xl p-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss your ideas and turn them into reality. I'm here to
                help you build something amazing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById("name")?.focus()}
                  className="h-12 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Start a Project
                </Button>
                <Button
                  asChild
                  className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105"
                >
                  <a
                    href="https://topmate.io/elanchezhiyan_poosamani"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackBookCall}
                  >
                    Book a Free Call
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("mailto:elanche97@gmail.com", "_blank")
                  }
                  className="h-12 px-8 text-lg font-semibold"
                >
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

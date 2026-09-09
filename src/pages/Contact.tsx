import React, { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Send,
  ArrowRight,
  Cloud,
  Server,
  Plug,
  Layers,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import emailjs from "emailjs-com";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackContactFormSubmit, trackBookCall } from "@/utils/analytics";
import { EXPERTISE_DOMAINS } from "@/data/technicalExpertise";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});

const VIEWPORT = { once: true, margin: "-80px" };

/**
 * "What I Can Help With" reuses the same 6 capability domains defined for
 * the Technical Expertise section (single source of truth) — Data &
 * Persistence is left out here since it reads more as a skill than
 * something someone would reach out about.
 */
const HELP_DOMAIN_IDS = [
  "cloud-azure",
  "dotnet-backend",
  "api-integration",
  "architecture-practices",
  "devops-reliability",
];
const HELP_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "cloud-azure": Cloud,
  "dotnet-backend": Server,
  "api-integration": Plug,
  "architecture-practices": Layers,
  "devops-reliability": Activity,
};
const helpDomains = HELP_DOMAIN_IDS.map((id) =>
  EXPERTISE_DOMAINS.find((d) => d.id === id)
).filter((d): d is (typeof EXPERTISE_DOMAINS)[number] => !!d);

/**
 * FAQ — every answer here is either directly supported elsewhere in the
 * portfolio (tech stack, freelance/client project history) or deliberately
 * reworded to drop unverifiable specifics (no invented timelines, pricing,
 * or "packages") that the original copy claimed without any backing data.
 */
const FAQS = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "Azure, .NET Core, and cloud architecture — backend systems, APIs, and integrations, with React on the frontend where needed.",
  },
  {
    question: "What type of projects do you work on?",
    answer:
      "Enterprise APIs and web applications, CRM and third-party integrations, and cloud-native systems on Azure — see the Projects page for specifics.",
  },
  {
    question: "Do you work with remote teams?",
    answer:
      "Yes — I've worked remotely with clients and on freelance projects throughout my career.",
  },
  {
    question: "What's your typical project timeline?",
    answer:
      "It depends on scope and complexity. I'll give you a realistic estimate once we've discussed the requirements, rather than a generic number.",
  },
  {
    question: "Do you provide ongoing support after delivery?",
    answer:
      "I'm open to ongoing support and maintenance work where it makes sense for the project — happy to discuss what that looks like for yours.",
  },
];

const Contact = () => {
  const prefersReducedMotion = useReducedMotion();
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

  const scrollToForm = useCallback(() => {
    const nameField = document.getElementById("name");
    nameField?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
    nameField?.focus();
  }, [prefersReducedMotion]);

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
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9942644999",
      href: "tel:+919942644999",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/elanchezhiyan-p",
      href: "https://linkedin.com/in/elanchezhiyan-p",
      external: true,
    },
  ];

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
        <title>Contact - Elanchezhiyan P | Let's Build Something</title>
        <meta
          name="description"
          content="Get in touch with Elanchezhiyan P, a Senior .NET & Azure Developer, about cloud architecture, backend engineering, API integrations, or technical consulting."
        />
        <meta
          name="keywords"
          content="Contact Elanchezhiyan P, .NET Developer, Azure Developer, Solution Architect, Technical Consulting"
        />
        <meta
          property="og:title"
          content="Contact - Elanchezhiyan P | Let's Build Something"
        />
        <meta
          property="og:description"
          content="Get in touch about cloud architecture, backend engineering, API integrations, or technical consulting."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/contact" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero / intro */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={stagger(0.08)}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Let's Build Something
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6"
          >
            Have a project, architecture challenge, or technical problem to
            discuss? I'm open to conversations around Azure, .NET, cloud
            architecture, integrations, backend systems, and technical
            consulting.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-blue-700 theme-green:bg-green-700 hover:bg-blue-800 theme-green:hover:bg-green-800 text-white font-semibold"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="https://topmate.io/elanchezhiyan_poosamani"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackBookCall}
            >
              <Button size="lg" variant="outline" className="font-semibold">
                Book a Call
              </Button>
            </a>
            <a
              href="mailto:elanche97@gmail.com"
              className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
            >
              or email me directly
            </a>
          </motion.div>
        </motion.section>

        {/* Contact info + form */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14 md:mb-20"
        >
          {/* Contact info */}
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                Contact
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.external ? "_blank" : undefined}
                    rel={info.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-400 dark:text-slate-500">
                        {info.label}
                      </div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 transition-colors truncate">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  Based in Coimbatore, Tamil Nadu, India
                </div>
                <div className="pl-[22px] text-slate-400 dark:text-slate-500">
                  Available for remote collaboration
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp}>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 focus:border-transparent bg-white dark:bg-slate-800 text-sm transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 focus:border-transparent bg-white dark:bg-slate-800 text-sm transition-shadow"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Project Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 focus:border-transparent bg-white dark:bg-slate-800 text-sm transition-shadow"
                  >
                    <option value="">Select an option</option>
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
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 focus:border-transparent bg-white dark:bg-slate-800 text-sm transition-shadow"
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 focus:border-transparent bg-white dark:bg-slate-800 text-sm resize-none transition-shadow"
                    placeholder="Tell me what you're building, or where you're stuck..."
                  />
                </div>

                <div className="space-y-2 pt-1">
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
                    <p role="alert" className="text-sm text-red-600 dark:text-red-400 flex items-start gap-1.5">
                      {formError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid || !turnstileToken}
                  className="w-full bg-blue-700 theme-green:bg-green-700 hover:bg-blue-800 theme-green:hover:bg-green-800 text-white font-semibold"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                        aria-hidden="true"
                      />
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
          </motion.div>
        </motion.section>

        {/* What I Can Help With */}
        <motion.section
          aria-labelledby="help-heading"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.08)}
          className="max-w-5xl mx-auto mb-14 md:mb-20"
        >
          <motion.h3
            id="help-heading"
            variants={fadeUp}
            className="text-center text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-8"
          >
            What I Can Help With
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {helpDomains.map((domain) => {
              const Icon = HELP_ICONS[domain.id] ?? Layers;
              return (
                <motion.div
                  key={domain.id}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-5"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 leading-tight">
                    {domain.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {domain.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          aria-labelledby="faq-heading"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <h3
            id="faq-heading"
            className="text-center text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center"
        >
          <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Have a Technical Challenge?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Tell me what you're building, what you're trying to solve, or
              where you're stuck.
            </p>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-blue-700 theme-green:bg-green-700 hover:bg-blue-800 theme-green:hover:bg-green-800 text-white font-semibold"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Contact;

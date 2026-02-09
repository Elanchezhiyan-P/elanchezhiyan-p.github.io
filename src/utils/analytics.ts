import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-W0KG44LXCR";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Custom event tracking for lead generation & conversions
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Pre-defined event helpers
export const trackBookCall = () => {
  trackEvent("Lead Generation", "Book a Call Click", "Topmate.io");
};

export const trackWhatsAppClick = () => {
  trackEvent("Lead Generation", "WhatsApp Click", "WhatsApp Chat");
};

export const trackContactFormSubmit = () => {
  trackEvent("Lead Generation", "Contact Form Submit", "Contact Page");
};

export const trackResumeDownload = () => {
  trackEvent("Lead Generation", "Resume Download", "Resume PDF");
};

export const trackNewsletterSignup = () => {
  trackEvent("Lead Generation", "Newsletter Signup", "Email Capture");
};

export const trackProjectView = (projectName: string) => {
  trackEvent("Engagement", "Project View", projectName);
};

export const trackBlogClick = (articleTitle: string) => {
  trackEvent("Engagement", "Blog Article Click", articleTitle);
};

export const trackSocialClick = (platform: string) => {
  trackEvent("Engagement", "Social Link Click", platform);
};

export const trackCertificationClick = (certName: string) => {
  trackEvent("Engagement", "Certification Click", certName);
};

export const trackExitIntentShown = () => {
  trackEvent("Engagement", "Exit Intent Popup Shown");
};

export const trackExitIntentAction = (action: string) => {
  trackEvent("Lead Generation", "Exit Intent Action", action);
};

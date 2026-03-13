// Analytics via Cloudflare Zaraz — uses dataLayer.push for SPA page_view tracking
// Zaraz handles GA4 script loading automatically; we only push events

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

window.dataLayer = window.dataLayer || [];

export const trackPageView = (path: string) => {
  window.dataLayer.push({
    event: "page_view",
    page_path: path,
  });
};

// Custom event tracking for lead generation & conversions
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  window.dataLayer.push({
    event: action,
    event_category: category,
    event_label: label,
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

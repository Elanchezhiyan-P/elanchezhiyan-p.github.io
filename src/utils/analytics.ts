// Analytics via Cloudflare Zaraz
// - Page views: handled automatically by Zaraz's built-in Pageview system trigger on each full page load
// - Custom events: use window.zaraz.track() so Zaraz's "Events" action forwards them to GA4

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    zaraz?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
      spaPageview: () => void;
    };
  }
}

window.dataLayer = window.dataLayer || [];

export const trackPageView = (path: string) => {
  // No-op: Zaraz fires pageviews automatically on each full page load.
  // Kept for backwards compatibility in case it's called anywhere.
};

// Custom event tracking for lead generation & conversions
// Uses zaraz.track() so events reach GA4 via Zaraz's Events action
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  window.zaraz?.track(action, {
    event_category: category,
    ...(label !== undefined && { event_label: label }),
    ...(value !== undefined && { value }),
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

export const trackAchievementClick = (label: string) => {
  trackEvent("Engagement", "Achievement Click", label);
};

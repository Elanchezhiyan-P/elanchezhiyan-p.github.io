// Google Analytics utility functions
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined') {
    // Add gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific portfolio events
export const trackPortfolioEvent = {
  // Track project clicks
  projectClick: (projectName: string) => {
    trackEvent('click', 'Portfolio', `Project: ${projectName}`);
  },

  // Track contact form submissions
  contactSubmit: () => {
    trackEvent('submit', 'Contact', 'Contact Form');
  },

  // Track consultation bookings
  bookingClick: (serviceType: string) => {
    trackEvent('click', 'Booking', `Service: ${serviceType}`);
  },

  // Track resume downloads
  resumeDownload: () => {
    trackEvent('download', 'Resume', 'Resume PDF');
  },

  // Track social media clicks
  socialClick: (platform: string) => {
    trackEvent('click', 'Social', `Platform: ${platform}`);
  },

  // Track blog article reads
  blogRead: (articleTitle: string) => {
    trackEvent('read', 'Blog', `Article: ${articleTitle}`);
  },
};

// Track user engagement
export const trackEngagement = {
  scrollDepth: (percentage: number) => {
    trackEvent('scroll', 'Engagement', `Scroll Depth: ${percentage}%`);
  },

  timeOnPage: (seconds: number) => {
    trackEvent('timing', 'Engagement', `Time on Page: ${seconds}s`);
  },

  mobileUsage: () => {
    trackEvent('view', 'Device', 'Mobile');
  },

  desktopUsage: () => {
    trackEvent('view', 'Device', 'Desktop');
  },
};

// Track conversion goals
export const trackConversion = {
  contactForm: () => {
    trackEvent('conversion', 'Lead', 'Contact Form Submission');
  },

  consultationBooking: (serviceType: string) => {
    trackEvent('conversion', 'Booking', `Service: ${serviceType}`);
  },

  resumeDownload: () => {
    trackEvent('conversion', 'Download', 'Resume');
  },

  projectInquiry: (projectName: string) => {
    trackEvent('conversion', 'Inquiry', `Project: ${projectName}`);
  },
};

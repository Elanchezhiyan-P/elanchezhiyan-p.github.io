import React, { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";

interface NewsletterSignupProps {
  variant?: "footer" | "inline";
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = "footer",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    const serviceID = "elan_serviceId";
    const templateID = "template_contactus";
    const userID = "FYZYdf1_r-enWrKCY";

    const templateParams = {
      from_name: "Newsletter Subscriber",
      from_email: email,
      subject: "New Newsletter Subscription",
      message: `New newsletter subscription from: ${email}`,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      () => {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      },
      () => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    );
  };

  if (variant === "inline") {
    return (
      <div className="glass rounded-xl p-6 md:p-8 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 theme-green:from-green-500 theme-green:to-emerald-600 flex items-center justify-center text-white shadow-md">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">
              Stay Updated
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Get notified about new posts & projects
            </p>
          </div>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 py-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Subscribed! Thank you.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 theme-green:focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-sm transition-colors"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              size="sm"
              className="px-4 bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    );
  }

  // Footer variant
  return (
    <div>
      <h4 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm">
        Stay Updated
      </h4>
      {status === "success" ? (
        <div className="flex items-center gap-2 text-green-400 py-1">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs">Subscribed!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-600 bg-gray-800 text-white text-xs focus:ring-2 focus:ring-blue-500 theme-green:focus:ring-green-500 focus:border-transparent transition-colors placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 rounded-lg transition-colors text-xs font-semibold text-white"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </div>
          <a
            href="https://elanchezhiyan-p.medium.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline theme-green:text-green-400 block"
          >
            Or subscribe on Medium
          </a>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1">Failed. Try again.</p>
      )}
    </div>
  );
};

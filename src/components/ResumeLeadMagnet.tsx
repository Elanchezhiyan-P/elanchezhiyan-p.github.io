import React, { useState } from "react";
import { Download, Mail, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import { trackResumeDownload } from "@/utils/analytics";

export const ResumeLeadMagnet: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      // Send notification via EmailJS
      await emailjs.send(
        "elan_serviceId",
        "template_contactus",
        {
          from_name: "Resume Download",
          from_email: email,
          subject: "Resume Download Request",
          message: `Someone downloaded your resume. Email: ${email}`,
        },
        "FYZYdf1_r-enWrKCY"
      );

      // Track the download
      trackResumeDownload();

      // Trigger download
      const link = document.createElement("a");
      link.href = "/resume/Elanchezhiyan_P.pdf";
      link.download = "Elanchezhiyan_P_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSuccess(true);
      setEmail("");

      toast({
        title: "Resume downloading!",
        description: "Check your downloads folder.",
      });
    } catch (error) {
      // Still allow download even if email fails
      const link = document.createElement("a");
      link.href = "/resume/Elanchezhiyan_P.pdf";
      link.download = "Elanchezhiyan_P_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      trackResumeDownload();
      setIsSuccess(true);

      toast({
        title: "Resume downloading!",
        description: "Check your downloads folder.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass rounded-xl p-6 text-center border border-green-200 dark:border-green-800">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-1">Resume Downloaded!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Thank you for your interest. Feel free to reach out!
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-base">Download My Resume</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Get a detailed overview of my skills & experience
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-sm transition-colors"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 rounded-lg text-sm font-semibold whitespace-nowrap"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <>
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

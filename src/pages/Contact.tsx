import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "elanche97@gmail.com",
      link: "elanche97@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Coimbatore, India",
      link: null,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      details: "linkedin.com/in/elanchezhiyan-p",
      link: "https://www.linkedin.com/in/elanchezhiyan-p/",
    },
    {
      icon: Github,
      title: "GitHub",
      details: "github.com/elanchezhiyan-p",
      link: "https://github.com/elanchezhiyan-p",
    },
    {
      icon: Twitter,
      title: "Twitter",
      details: "@always_elan_p",
      link: "https://x.com/always_elan_p",
    },
  ];

  return (
    <>
      <NavBar />

      <main className="pt-24 pb-16">
        {/* Contact Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to work together? Feel free to reach out.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 bg-azure-100 dark:bg-azure-950/50 rounded-md text-azure-600 mr-4">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={
                            item.link.startsWith("mailto:")
                              ? undefined
                              : "_blank"
                          }
                          rel="noopener noreferrer"
                          className="text-azure-600 hover:text-azure-700 transition-colors"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-azure-50 dark:bg-azure-950/20 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">When to Contact Me</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure-500 mr-2 mt-2"></span>
                    <p>If you're looking for a developer for your project</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure-500 mr-2 mt-2"></span>
                    <p>To discuss collaboration opportunities</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure-500 mr-2 mt-2"></span>
                    <p>If you have questions about my open-source projects</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure-500 mr-2 mt-2"></span>
                    <p>For speaking engagements or technical workshops</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-azure-500 mr-2 mt-2"></span>
                    <p>To provide feedback on my blog posts or projects</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;

// Updated About Page with Enhanced Dashboard Design Elements
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { FileText, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const experience = [
    {
      title: "Senior Software Engineer",
      company: "App Innovation Technologies Pvt Ltd",
      period: "2021 - Present",
      description:
        "Led a team to innovate and implement scalable features for mobile and web apps. Designed microservices, CI/CD, and Azure-based deployments.",
    },
    {
      title: "Technical Associate",
      company: "Uncia Technologies Pvt. Ltd",
      period: "2019 - 2021",
      description:
        "Supported clients by resolving complex software issues and enhanced product reliability through collaboration and code optimization.",
    },
    {
      title: "Android Developer - Intern",
      company: "LepoCube Technologies",
      period: "2018 - 2019",
      description:
        "Built Android apps for IoT products, focused on performance tuning and cross-device compatibility.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Elanchezhiyan's skills in .NET and Azure stand out. His ability to lead, innovate, and execute is top-notch.",
      author: "Arun Prasadh, Project Manager",
    },
    {
      quote:
        "A strong leader with a problem-solving mindset. His contributions made a measurable impact on our projects.",
      author: "Shehab Rasheed, Project Lead",
    },
  ];

  const calculateExperience = () => {
    const startDate = new Date(2019, 7, 6);
    const currentDate = new Date();
    const years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    return months < 0 ? years - 1 + (12 + months) / 12 : years + months / 12;
  };

  const experienceYears = calculateExperience().toFixed(1);

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-16">
        {/* Hero Summary */}
        <section className="container mx-auto px-4 text-center mb-20">
          <img
            src="https://avatars.githubusercontent.com/u/29861348?v=4"
            alt="Elanchezhiyan"
            className="w-28 h-28 mx-auto mb-4 rounded-full shadow-md"
          />
          <h1 className="text-4xl font-bold mb-2">Elanchezhiyan P</h1>
          <p className="text-muted-foreground text-lg mb-4">
            Full-stack developer with {experienceYears}+ years of experience in
            .NET, Azure, and cloud-first architectures.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a
                href="#"
                download
                className="flex items-center gap-2"
                aria-label="Download Resume"
              >
                <FileText className="h-5 w-5" /> Resume
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link
                to="/contact"
                className="flex items-center gap-2"
                aria-label="Contact"
              >
                <Mail className="h-5 w-5" /> Contact
              </Link>
            </Button>
          </div>
        </section>

        {/* Stats Panel */}
        <section className="bg-gray-100 py-12 mb-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h2 className="text-3xl font-bold">{experienceYears}+</h2>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">10+</h2>
              <p className="text-muted-foreground">Enterprise Projects</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">4</h2>
              <p className="text-muted-foreground">Certifications</p>
            </div>
          </div>
        </section>

        {/* Who I Am + Achievements */}
        <section className="py-16 bg-white mb-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 gap-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-3">About Me</h2>
              <p className="text-muted-foreground">
                I'm a software engineer passionate about solving complex
                problems and building efficient backend systems using .NET and
                Azure.
              </p>
              <p className="text-muted-foreground mt-4">
                I optimize APIs, modernize legacy stacks, and leverage
                cloud-native services for scalability and security.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Key Achievements</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>40% reduction in API response times</li>
                <li>.NET Core migration for enterprise applications</li>
                <li>Microservices orchestration on Azure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 bg-azure-50 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground mb-6">
            Technologies I work with daily
          </p>
          <TechStack />
        </section>

        {/* Experience Timeline */}
        <section className="py-16 bg-white mb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">
              Professional Experience
            </h2>
            <div className="grid gap-8">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl border shadow-sm transition hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.period}
                  </p>
                  <p className="mt-2 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education and Certifications */}
        <section className="py-16 bg-gray-100 mb-12">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 gap-y-12">
            <div>
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="font-medium">B.E. Electrical and Electronics</p>
                <p className="text-sm text-muted-foreground">
                  Anna University, 2015–2019
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Certifications</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <Link
                    to="https://freecodecamp.org/certification/Elanchezhiyan-P/foundational-c-sharp-with-microsoft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    Foundational C# with Microsoft <ExternalLink size={14} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://freecodecamp.org/certification/Elanchezhiyan-P/responsive-web-design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    Responsive Web Design <ExternalLink size={14} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://university.atlassian.com/student/award/17WcnErMoSR8bgZ9hsN3hSTw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    Jira Fundamentals Badge <ExternalLink size={14} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white mb-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-8">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-xl border shadow-sm"
                >
                  <p className="italic">"{t.quote}"</p>
                  <p className="mt-4 font-medium">– {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-azure-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Let's Work Together</h2>
            <p className="mb-6">
              Open to collaborations, freelance or full-time roles.
            </p>
            <Button asChild>
              <Link to="/contact" aria-label="Contact Me">
                Contact Me
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;

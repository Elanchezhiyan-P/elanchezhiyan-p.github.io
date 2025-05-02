import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectCard, { ProjectType } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Get the filter from URL params
  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setActiveTab(filter);
    } else {
      setActiveTab("all");
    }
  }, [searchParams]);

  // Filter projects based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.type === activeTab)
      );
    }
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  };

  const tabs = [
    { value: "all", label: "All Projects" },
    { value: "opensource", label: "Open Source" },
    { value: "nuget", label: "NuGet Packages" },
    { value: "client", label: "Client Work" },
    { value: "personal", label: "Personal Projects" },
  ];

  return (
    <>
      <NavBar />

      <main className="pt-24 pb-16">
        {/* Projects Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-xl text-muted-foreground">
              Explore my portfolio of .NET and Azure projects, including
              open-source contributions, NuGet packages, and client work.
            </p>
          </div>
        </section>

        {/* Projects Gallery */}
        <section className="container mx-auto px-4">
          <Tabs
            defaultValue={activeTab}
            onValueChange={handleTabChange}
            value={activeTab}
          >
            <div className="flex justify-center mb-8">
              <TabsList className="h-auto p-1 flex overflow-x-auto scrollbar-hide pl-4 space-x-4">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-azure-600 data-[state=active]:text-white"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="animate-fade-in"
              >
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No projects found in this category.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Projects;

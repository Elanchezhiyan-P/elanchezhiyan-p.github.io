import { Code, Database, Server, Cloud, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TechStack = () => {
  const skills = [
    {
      title: ".NET Core & Framework",
      icon: Code,
      description:
        "Expert in C#, ASP.NET Core, Razor Pages, Blazor, ASP.NET Framework, and Entity Framework Core.",
      items: [
        "C#",
        "ASP.NET Core",
        "ASP.NET Framework",
        "Razor Pages",
        "Entity Framework",
        "LINQ",
        "Dapper",
        "Design Patterns",
        "Unit Testing",
        "Dependency Injection",
        "SOLID Principles",
        "Microservices",
        "DotNet Core Web Applications",
        "DotNet Core API Builds",
        "DotNet MVC with Stripe Integration",
        "DotNet Applications with SSO Logins",
        "DotNet with Xamarin for Android Applications",
        "DotNet with Selenium for Automation",
        "Console Apps for Data Integration",
        "Windows Applications for CRM Integration",
        "Windows Services for Server Sync",
      ],
    },
    {
      title: "Database & Storage",
      icon: Database,
      description: "Experience with SQL Server, Cosmos DB, MongoDB, and Redis.",
      items: [
        "SQL Server",
        "Azure SQL",
        "Cosmos DB",
        "MongoDB",
        "PostgreSQL",
        "Oracle",
        "MySQL",
        "SQLite",
        "NoSQL",
        "Redis",
        "Azure Storage",
        "Blob Storage",
        "Firebird",
        "As400",
      ],
    },
    {
      title: "Azure & DevOps",
      icon: Cloud,
      description:
        "Proficient with Azure services, CI/CD, and container orchestration.",
      items: [
        "Azure App Service",
        "Azure Functions",
        "Azure DevOps",
        "Docker",
        "GitHub Actions",
        "Windows Applications with Azure Integrations",
        "Azure Blob Storage",
        "Azure Table Storage",
        "Azure Queue Storage",
        "Azure Service Bus",
        "Azure Logic Apps",
        "Azure Key Vault",
        "Azure Application Insights",
        "Azure Monitor",
      ],
    },
    {
      title: "Web & Front-end",
      icon: Server,
      description:
        "Skills in modern front-end frameworks and responsive design.",
      items: [
        "JavaScript/TypeScript",
        "React",
        "Angular",
        "HTML/CSS",
        "Tailwind CSS",
        "REST/GraphQL APIs",
        "DotNet with ReactJS",
        "DotNet with Angular",
        "Adobe ColdFusion",
      ],
    },
    {
      title: "Security & Architecture",
      icon: Lock,
      description:
        "Knowledge of secure coding practices and application architecture.",
      items: [
        "OAuth/OIDC",
        "Identity Server",
        "Microservices",
        "Domain-Driven Design",
        "DotNet Applications with SSO Logins",
      ],
    },
    {
      title: "CRM Integrations",
      icon: Server,
      description: "Experience integrating with various CRM platforms.",
      items: [
        "Netsuite",
        "HubSpot",
        "ConnectWise",
        "CloudRadial",
        "ServiceNow",
        "GreenRope",
        "Ever-Fi ADP",
        "QuickBooks Online",
        "ZohoBooks",
        "PrismHR",
      ],
    },
    {
      title: "Tools & Libraries",
      icon: Code,
      description: "Proficient in various tools and libraries for development.",
      items: [
        "PowerBI",
        "Power Automate",
        "SSRS",
        "SSIS",
        "ETL Process",
        "Redis Cache",
        "AmChart",
        "Canvas Chart",
        "Chart.js",
        "Aspose Document Editors",
        "Zego Cloud",
        "Firebase",
        "ProcessMaker",
        "QuestionPro",
        "SurveyMonkey",
        "Twilio",
        "SendGrid",
        "Mailgun",
        "Stripe",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <Card key={index} className="card-hover h-full">
          <CardHeader>
            <div className="flex items-center mb-2">
              <div className="mr-3 p-2 rounded-md bg-azure-100 text-azure-600">
                <skill.icon size={20} />
              </div>
              <CardTitle className="text-lg">{skill.title}</CardTitle>
            </div>
            <CardDescription>{skill.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
              {skill.items.map((item, idx) => (
                <li key={idx} className="text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-azure-500 mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TechStack;

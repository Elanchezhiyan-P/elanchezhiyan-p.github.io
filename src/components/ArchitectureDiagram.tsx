import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

type Node = { label: string; sub?: string };

const Box: React.FC<{ node: Node; accent?: boolean }> = ({ node, accent }) => (
  <div
    className={`rounded-lg border px-3 py-2 text-center text-xs font-semibold leading-tight shadow-sm ${
      accent
        ? "bg-blue-600 text-white border-blue-700 theme-green:bg-green-600 theme-green:border-green-700"
        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
    }`}
  >
    <div>{node.label}</div>
    {node.sub && (
      <div className={`text-[10px] font-normal mt-0.5 ${accent ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
        {node.sub}
      </div>
    )}
  </div>
);

const DIAGRAMS: Record<
  string,
  { title: string; rows: Node[][] }
> = {
  telemedix: {
    title: "TeleMEDix — request flow",
    rows: [
      [{ label: "React Frontend", sub: "Consultation + patient UI" }],
      [{ label: ".NET Core API", sub: "Azure App Service" }],
      [
        { label: "CosmosDB", sub: "Patient records" },
        { label: "Blob Storage", sub: "Files & imaging" },
        { label: "Kno2", sub: "CCDA / HL7 FHIR exchange" },
        { label: "Stripe", sub: "Payments" },
      ],
    ],
  },
  seahorse: {
    title: "Seahorse Analytics — data flow",
    rows: [
      [{ label: "Seahorse Metabolic Analyzers", sub: "Lab instruments" }],
      [{ label: ".NET Core API", sub: "Ingest + processing" }],
      [{ label: "PostgreSQL", sub: "Assay data store" }, { label: "SignalR", sub: "Live push to browser" }],
      [{ label: "Dashboard (AmChart / Canvas)", sub: "Real-time visualization" }],
    ],
  },
};

const ArchitectureDiagram: React.FC<{ kind: string }> = ({ kind }) => {
  const diagram = DIAGRAMS[kind];
  if (!diagram) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/40 p-4">
      <div className="flex flex-col items-center gap-2">
        {diagram.rows.map((row, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {row.map((node, j) => (
                <div key={j} className="flex-1 min-w-[110px] max-w-[220px]">
                  <Box node={node} accent={i === 1 && diagram.rows.length > 2} />
                </div>
              ))}
            </div>
            {i < diagram.rows.length - 1 && (
              <ArrowDown className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;

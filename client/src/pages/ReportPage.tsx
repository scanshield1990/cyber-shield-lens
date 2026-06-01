import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Copy, Download } from "lucide-react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { CVSSMetrics, CVSSScore } from "../lib/cvss";
import { MitreTechnique } from "../lib/mitre-attack";

interface ReportState {
  metrics: CVSSMetrics;
  description: string;
  cvssResult: CVSSScore;
  mitreAnalysis: { techniques: MitreTechnique[]; tactics: string[] };
}

export default function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const reportRef = useRef<HTMLDivElement>(null);
  const state = location.state as ReportState;

  if (!state) {
    navigate("/questions");
    return null;
  }

  const { metrics, description, cvssResult, mitreAnalysis } = state;
  const timestamp = new Date().toLocaleString();

  const downloadPDF = () => {
    if (reportRef.current) {
      const element = reportRef.current;
      const opt = {
        margin: 10,
        filename: `CVSS_Assessment_Report_${Date.now()}.pdf`,
        image: { type: "png" as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" as const, unit: "mm", format: "a4" },
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const copyReport = () => {
    const text = reportRef.current?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Professional Report</h1>
          <div className="flex gap-2">
            <Button onClick={copyReport} className="bg-slate-700 hover:bg-slate-600">
              <Copy className="w-4 h-4 mr-2" />
              Copy Report
            </Button>
            <Button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div ref={reportRef} className="bg-white text-black p-12 rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Vulnerability Assessment Report
            </h1>
            <p className="text-gray-600">CVSS Assist Professional Report</p>
            <p className="text-sm text-gray-500 mt-4">Generated: {timestamp}</p>
          </div>

          {/* Executive Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
              Executive Summary
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">CVSS Base Score</p>
                  <p className="text-3xl font-bold text-gray-900">{cvssResult.score}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Severity Rating</p>
                  <p className={`text-3xl font-bold ${getSeverityTextColor(cvssResult.severity)}`}>
                    {cvssResult.severity}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">CVSS Vector</p>
                  <p className="text-sm font-mono text-gray-700 break-all">
                    {cvssResult.vector}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{cvssResult.explanation}</p>
            </div>
          </section>

          {/* Vulnerability Description */}
          {description && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Incident Description
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{description}</p>
              </div>
            </section>
          )}

          {/* CVSS Metrics Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
              CVSS v3.1 Metrics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <MetricBox label="Attack Vector" value={metrics.attackVector} />
              <MetricBox label="Attack Complexity" value={metrics.attackComplexity} />
              <MetricBox label="Privileges Required" value={metrics.privilegesRequired} />
              <MetricBox label="User Interaction" value={metrics.userInteraction} />
              <MetricBox label="Confidentiality" value={metrics.confidentiality} />
              <MetricBox label="Integrity" value={metrics.integrity} />
              <MetricBox label="Availability" value={metrics.availability} />
            </div>
          </section>

          {/* MITRE ATT&CK Analysis */}
          {mitreAnalysis.techniques.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                MITRE ATT&CK Analysis
              </h2>

              {mitreAnalysis.tactics.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Identified Tactics</h3>
                  <div className="flex flex-wrap gap-2">
                    {mitreAnalysis.tactics.map((tactic) => (
                      <span
                        key={tactic}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tactic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Suggested Techniques & Procedures
                </h3>
                <div className="space-y-3">
                  {mitreAnalysis.techniques.slice(0, 10).map((technique) => (
                    <div key={technique.id} className="border border-gray-300 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{technique.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{technique.id}</p>
                        </div>
                        <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {technique.tactic}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Recommendations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
              Recommended Actions
            </h2>
            <div className="space-y-3">
              <RecommendationBox
                priority="CRITICAL"
                text="Immediately assess the impact and scope of this vulnerability in your environment"
              />
              <RecommendationBox
                priority="HIGH"
                text="Develop and implement a remediation plan with clear timelines"
              />
              <RecommendationBox
                priority="MEDIUM"
                text="Apply security patches or implement compensating controls as needed"
              />
              <RecommendationBox
                priority="MEDIUM"
                text="Update detection and prevention rules based on the identified ATT&CK techniques"
              />
              <RecommendationBox
                priority="LOW"
                text="Document the assessment and maintain records for compliance purposes"
              />
            </div>
          </section>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-6 mt-8">
            <p className="text-sm text-gray-600">
              This report was generated by CVSS Assist - A cybersecurity assessment tool
            </p>
            <p className="text-xs text-gray-500 mt-2">Report ID: {`CVS-${Date.now()}`}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8 justify-between">
          <Button
            onClick={() => navigate("/results", { state: location.state })}
            variant="outline"
            className="border-slate-600 text-slate-300"
          >
            Back to Results
          </Button>
          <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
            Start New Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-semibold text-gray-900 capitalize">{value}</p>
    </div>
  );
}

function RecommendationBox({ priority, text }: { priority: string; text: string }) {
  const colors = {
    CRITICAL: "bg-red-50 border-red-300 text-red-800",
    HIGH: "bg-orange-50 border-orange-300 text-orange-800",
    MEDIUM: "bg-yellow-50 border-yellow-300 text-yellow-800",
    LOW: "bg-blue-50 border-blue-300 text-blue-800",
  };

  return (
    <div className={`border-l-4 ${colors[priority]} p-4 rounded`}>
      <div className="flex gap-3">
        <span className={`font-bold text-sm`}>{priority}</span>
        <p className="flex-1">{text}</p>
      </div>
    </div>
  );
}

function getSeverityTextColor(severity: string): string {
  switch (severity) {
    case "CRITICAL":
      return "text-red-600";
    case "HIGH":
      return "text-orange-600";
    case "MEDIUM":
      return "text-yellow-600";
    case "LOW":
      return "text-blue-600";
    default:
      return "text-green-600";
  }
}

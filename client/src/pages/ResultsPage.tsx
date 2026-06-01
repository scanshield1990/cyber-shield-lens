import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { calculateCVSSScore, CVSSMetrics } from "../lib/cvss";
import { suggestMitreTechniques } from "../lib/mitre-attack";
import { Copy, Download, ExternalLink } from "lucide-react";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const metrics = location.state?.metrics as CVSSMetrics;
  const description = location.state?.description as string;

  if (!metrics) {
    navigate("/questions");
    return null;
  }

  const cvssResult = calculateCVSSScore(metrics);
  const mitreAnalysis = suggestMitreTechniques(description);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600 text-white";
      case "HIGH":
        return "bg-orange-600 text-white";
      case "MEDIUM":
        return "bg-yellow-600 text-white";
      case "LOW":
        return "bg-blue-600 text-white";
      default:
        return "bg-green-600 text-white";
    }
  };

  const copyToClipboard = () => {
    const text = `CVSS Vector: ${cvssResult.vector}\nScore: ${cvssResult.score}\nSeverity: ${cvssResult.severity}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="container mx-auto max-w-3xl py-8">
        <h1 className="text-4xl font-bold mb-8">Assessment Results</h1>

        {/* CVSS Score Card */}
        <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-5xl font-bold mb-2 ${getSeverityColor(cvssResult.severity)}`}>
                {cvssResult.score}
              </div>
              <div className="text-slate-400">Base Score</div>
            </div>
            <div className="flex items-center justify-center">
              <div className={`text-4xl font-bold ${getSeverityColor(cvssResult.severity)} px-4 py-2 rounded`}>
                {cvssResult.severity}
              </div>
            </div>
            <div className="text-right">
              <Button
                size="sm"
                onClick={copyToClipboard}
                className="bg-slate-700 hover:bg-slate-600 mb-2"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Vector
              </Button>
              <p className="text-xs text-slate-400 break-all">{cvssResult.vector}</p>
            </div>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-300">Severity Explanation</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{cvssResult.explanation}</p>
          </div>
        </Card>

        {/* Metrics Card */}
        <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Assessed Metrics</h2>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <span className="text-slate-400">Attack Vector:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.attackVector}</span>
            </div>
            <div>
              <span className="text-slate-400">Attack Complexity:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.attackComplexity}</span>
            </div>
            <div>
              <span className="text-slate-400">Privileges Required:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.privilegesRequired}</span>
            </div>
            <div>
              <span className="text-slate-400">User Interaction:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.userInteraction}</span>
            </div>
            <div>
              <span className="text-slate-400">Scope:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.scope}</span>
            </div>
            <div>
              <span className="text-slate-400">Confidentiality:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.confidentiality}</span>
            </div>
            <div>
              <span className="text-slate-400">Integrity:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.integrity}</span>
            </div>
            <div>
              <span className="text-slate-400">Availability:</span>
              <span className="ml-2 font-semibold capitalize">{metrics.availability}</span>
            </div>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg mt-4">
            <p className="text-xs text-slate-300 font-mono break-all text-blue-300">{cvssResult.vector}</p>
          </div>
        </Card>

        {/* MITRE ATT&CK Analysis */}
        {description && (
          <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-blue-400">MITRE ATT&CK Analysis</h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Confidence:</span>
                <Badge
                  className={
                    mitreAnalysis.confidence === "High"
                      ? "bg-green-600"
                      : mitreAnalysis.confidence === "Medium"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }
                >
                  {mitreAnalysis.confidence}
                </Badge>
              </div>
            </div>

            {(mitreAnalysis as any).matchedKeywords && (mitreAnalysis as any).matchedKeywords.length > 0 && (
              <div className="mb-6 bg-slate-700 p-3 rounded-lg">
                <h3 className="font-semibold text-slate-300 mb-2 text-sm">Matched Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {(mitreAnalysis as any).matchedKeywords.slice(0, 10).map((keyword: string) => (
                    <span
                      key={keyword}
                      className="bg-slate-600 text-slate-200 text-xs px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {mitreAnalysis.tactics.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-slate-300 mb-3">Identified Tactics</h3>
                <div className="flex flex-wrap gap-2">
                  {mitreAnalysis.tactics.map((tactic) => (
                    <Badge key={tactic} className="bg-purple-600 hover:bg-purple-700">
                      {tactic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {mitreAnalysis.techniques.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-300 mb-3">Suggested Techniques & Procedures</h3>
                <div className="space-y-2">
                  {mitreAnalysis.techniques.slice(0, 8).map((technique) => {
                    const mitrePage = `https://attack.mitre.org/techniques/${technique.id.replace(/\./g, "/")}`;
                    return (
                      <div key={technique.id} className="bg-slate-700 p-3 rounded-lg">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <Button
                              asChild
                              className="bg-blue-600 hover:bg-blue-500 text-white w-full justify-start text-left h-auto py-2 mb-2"
                            >
                              <a
                                href={mitrePage}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>{technique.name}</span>
                                <ExternalLink className="w-3 h-3 ml-auto" />
                              </a>
                            </Button>
                            <p className="text-xs text-slate-400 mb-1">{technique.id}</p>
                            {technique.reason && (
                              <p className="text-xs text-slate-300">{technique.reason}</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-4">
                            <Badge className="bg-orange-600 text-xs">{technique.tactic}</Badge>
                            {technique.confidence && (
                              <span className="text-xs text-slate-400">
                                {(technique.confidence * 100).toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {mitreAnalysis.techniques.length === 0 && (
              <p className="text-slate-400">No MITRE ATT&CK techniques matched the description</p>
            )}
          </Card>
        )}

        <div className="flex gap-4 justify-between flex-wrap">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-slate-600 text-slate-300"
          >
            Start New Assessment
          </Button>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/incident", { state: { metrics } })}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              Back
            </Button>
            <Button
              onClick={() =>
                navigate("/report", {
                  state: { metrics, description, cvssResult, mitreAnalysis },
                })
              }
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

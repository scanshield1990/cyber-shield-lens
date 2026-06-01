import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { generateExecutiveSummary } from "../../lib/recommendations";

interface ExecutiveSummarySectionProps {
  tactics: string[];
  techniques: any[];
  confidence: string;
}

export default function ExecutiveSummarySection({
  tactics,
  techniques,
  confidence,
}: ExecutiveSummarySectionProps) {
  const summary = generateExecutiveSummary(tactics, techniques, confidence);

  return (
    <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">
        Executive Recommendation
      </h2>

      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-600/30 rounded-lg p-6">
        <p className="text-slate-100 leading-relaxed text-base">{summary}</p>

        <div className="mt-6 pt-6 border-t border-slate-600/50 flex flex-wrap gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2">Assessment Confidence</p>
            <Badge
              className={
                confidence === "High"
                  ? "bg-green-600"
                  : confidence === "Medium"
                    ? "bg-yellow-600"
                    : "bg-red-600"
              }
            >
              {confidence} Confidence
            </Badge>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2">Tactics Identified</p>
            <span className="text-sm text-slate-300 font-semibold">
              {tactics.length}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2">Techniques Matched</p>
            <span className="text-sm text-slate-300 font-semibold">
              {techniques.length}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

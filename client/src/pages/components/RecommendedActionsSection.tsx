import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  TacticRecommendation,
  getRecommendationsForTactics,
} from "../../lib/recommendations";

interface RecommendedActionsSectionProps {
  tactics: string[];
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "Critical":
      return "bg-red-600 text-white";
    case "High":
      return "bg-orange-600 text-white";
    case "Medium":
      return "bg-yellow-600 text-white";
    default:
      return "bg-blue-600 text-white";
  }
};

export default function RecommendedActionsSection({
  tactics,
}: RecommendedActionsSectionProps) {
  const recommendations = getRecommendationsForTactics(tactics);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">
        Recommended Actions
      </h2>

      <div className="space-y-6">
        {recommendations.map((rec: TacticRecommendation) => (
          <div key={rec.tactic} className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-start justify-between mb-2 gap-3">
              <h3 className="text-lg font-semibold text-slate-100">
                {rec.tactic}
              </h3>
              <Badge className={getPriorityColor(rec.priority)}>
                {rec.priority}
              </Badge>
            </div>

            <p className="text-sm text-slate-400 mb-4">{rec.description}</p>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-xs font-semibold text-slate-300 mb-3">
                Action Items:
              </p>
              <ul className="space-y-2">
                {rec.actions.map((action, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

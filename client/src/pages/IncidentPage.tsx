import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { CVSSMetrics } from "../lib/cvss";

export default function IncidentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const metrics = location.state?.metrics as CVSSMetrics | null;
  const [description, setDescription] = useState("");

  if (metrics === undefined) {
    navigate("/questions");
    return null;
  }

  const handleContinue = () => {
    navigate("/results", {
      state: { metrics, description },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Incident Description</h1>
          <p className="text-slate-400">
            Describe the vulnerability or incident for MITRE ATT&CK analysis
          </p>
          <p className="text-red-400 font-bold mt-2">
            DO NOT GIVE ANY SENSITIVE INFORMATION.
          </p>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
          <Label htmlFor="description" className="text-lg font-semibold text-white mb-4 block">
            Incident Details
          </Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the attack, vulnerability, or incident. Include what happened and how it was discovered."
            className="w-full h-48 bg-slate-700 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          />
          <p className="text-slate-400 text-sm mt-2">
            The more detailed your description, the better the MITRE ATT&CK recommendations
          </p>
        </Card>

        <div className="flex gap-4 justify-between">
          <Button
            onClick={() => navigate("/questions")}
            variant="outline"
            className="border-slate-600 text-slate-300"
          >
            Back to Questions
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!description.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Review Results
          </Button>
        </div>
      </div>
    </div>
  );
}

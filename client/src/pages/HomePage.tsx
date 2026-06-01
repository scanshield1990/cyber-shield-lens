import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">ThreatLens</h1>
          <p className="text-xl text-slate-300 mb-2">
            Simplified vulnerability scoring & incident analysis
          </p>
          <p className="text-slate-400">
            Guide cybersecurity professionals through CVSS assessment and MITRE ATT&CK mapping
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-800 border-slate-700 p-8">
            <h2 className="text-2xl font-bold mb-3 text-blue-400">How it works</h2>
            <ol className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <span>Answer plain-English questions about the vulnerability</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <span>Describe the incident for MITRE ATT&CK analysis</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <span>Review your CVSS score and identified techniques</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  4
                </span>
                <span>Generate and download a professional report</span>
              </li>
            </ol>
          </Card>

           <div className="mt-8">
             <Button
               onClick={() => navigate("/questions")}
               className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold w-full"
             >
               Start Assessment
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

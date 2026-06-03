import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-slate-800/70"></div>
      <div className="absolute top-6 left-6 z-20">
        <a href="https://preview--yieldingly-slimy-taxi.mimo.dev" target="_blank" rel="noopener noreferrer">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Secure Code Warrior Challenge
          </Button>
        </a>
      </div>
      <div className="absolute top-6 right-6 z-20">
        <a href="https://nickmeade1990.wixsite.com/it-guy/blog" target="_blank" rel="noopener noreferrer">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Blogs
          </Button>
        </a>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Cyber Shield Lens</h1>
          <p className="text-lg text-slate-300 mb-2">
            By Scan Shield Security Horizon
          </p>
          <p className="text-xl text-slate-300 mb-2">
            Simplified vulnerability scoring & incident analysis
          </p>
          <p className="text-slate-400 mb-2">
            Guide cybersecurity professionals through CVSS assessment and MITRE ATT&CK mapping
          </p>
          <p className="text-slate-400 italic">
            S.S.S.H... you're in good hands.
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

            <div className="mt-8 space-y-4">
              <Button
                onClick={() => navigate("/questions")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold w-full"
              >
                Start Assessment
              </Button>
            </div>

         </div>
        </div>

      <div className="absolute bottom-0 left-0 p-6 text-slate-400 text-sm">
        <p className="font-semibold mb-1">Contact:</p>
        <p>Nicholas Meade</p>
        <p>
           <a href="mailto:support@cybershieldlens.com" className="text-blue-400 hover:text-blue-300">
              support@cybershieldlens.com
            </a>
        </p>
        <p>8189664360</p>
      </div>
    </div>
    );
  }

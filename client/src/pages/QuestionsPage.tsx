import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { CVSSMetrics } from "../lib/cvss";
import { HelpCircle } from "lucide-react";

const questions = [
  {
    id: "attackVector",
    label: "Attack Vector",
    question: "How can the vulnerability be exploited?",
    tooltip: "Attack Vector describes where the attacker must be located to perform the attack.",
    options: [
      { value: "network", label: "Network (remotely accessible)" },
      { value: "adjacent", label: "Adjacent (same local network)" },
      { value: "local", label: "Local (local machine access required)" },
      { value: "physical", label: "Physical (physical access required)" },
    ],
    details: [
      { value: "network", text: "Network: Attack can be performed remotely over the Internet." },
      { value: "adjacent", text: "Adjacent: Attacker must be on the same local network." },
      { value: "local", text: "Local: Attacker requires access to the target system." },
      { value: "physical", text: "Physical: Attacker requires physical access to the device." },
    ],
    example: "A phishing email would be Network because the attacker can operate from anywhere on the Internet.",
    whyItMatters: "Network vectors have the highest severity impact. As attack vector becomes more restricted (Adjacent → Local → Physical), the vulnerability becomes less severe.",
  },
  {
    id: "attackComplexity",
    label: "Attack Complexity",
    question: "How difficult is the attack to successfully execute?",
    tooltip: "Attack Complexity measures whether special conditions are required for the attack to work.",
    options: [
      { value: "low", label: "Low (easy to exploit)" },
      { value: "high", label: "High (requires specific conditions)" },
    ],
    details: [
      { value: "low", text: "Low: The attack works under normal conditions." },
      { value: "high", text: "High: The attack requires unusual timing, special configurations, race conditions, or other uncommon circumstances." },
    ],
    example: "Most phishing attacks are Low complexity.",
    whyItMatters: "Low complexity attacks are more severe because they're easier to exploit. High complexity attacks require rare conditions, reducing the practical threat.",
  },
  {
    id: "privilegesRequired",
    label: "Privileges Required",
    question: "What privileges did the attacker need BEFORE the attack began?",
    tooltip: "Privileges Required only considers what is needed before exploitation. Do NOT consider privileges gained during the attack.",
    options: [
      { value: "none", label: "None (no privileges required)" },
      { value: "low", label: "Low (basic user privileges)" },
      { value: "high", label: "High (administrator/root privileges)" },
    ],
    details: [
      { value: "none", text: "None: No account or access required." },
      { value: "low", text: "Low: Basic user account required." },
      { value: "high", text: "High: Administrative or root access required." },
    ],
    example: "A phishing attacker usually requires None because they can target victims without first having an account.",
    whyItMatters: "Attacks requiring no privileges are more severe. If an attacker needs admin access first, it reduces the number of potential victims.",
  },
  {
    id: "userInteraction",
    label: "User Interaction",
    question: "Must a user perform an action for the attack to succeed?",
    tooltip: "User Interaction measures whether the victim must do something.",
    options: [
      { value: "none", label: "None (automatic exploit)" },
      { value: "required", label: "Required (user must perform action)" },
    ],
    details: [
      { value: "none", text: "None: Attack occurs automatically." },
      { value: "required", text: "Required: User must click a link, open a file, approve a request, or perform another action." },
    ],
    example: "Phishing attacks typically require user interaction.",
    whyItMatters: "Attacks with no user interaction are more severe because they can happen without any victim action. User interaction adds friction to successful exploitation.",
  },
  {
    id: "scope",
    label: "Scope",
    question: "Does the attack affect only the vulnerable system or other connected resources as well?",
    tooltip: "Scope determines whether exploitation impacts resources beyond the originally vulnerable component.",
    options: [
      { value: "unchanged", label: "Unchanged (impact within vulnerable system)" },
      { value: "changed", label: "Changed (impact extends to other systems)" },
    ],
    details: [
      { value: "unchanged", text: "Unchanged: Impact remains within the vulnerable system." },
      { value: "changed", text: "Changed: Impact extends into other systems, services, or security boundaries." },
    ],
    example: "A compromised Microsoft 365 account that provides access to SharePoint, Teams, OneDrive, or additional cloud resources may be Scope Changed.",
    whyItMatters: "Scope Changed indicates the attack can affect resources beyond the vulnerable component, significantly increasing severity. The system impacts can cascade.",
  },
  {
    id: "confidentiality",
    label: "Confidentiality Impact",
    question: "Can sensitive information be viewed or disclosed?",
    tooltip: "Confidentiality measures unauthorized access to information.",
    options: [
      { value: "none", label: "None (no impact)" },
      { value: "low", label: "Low (some sensitive data accessible)" },
      { value: "high", label: "High (all sensitive data accessible)" },
    ],
    details: [
      { value: "none", text: "None: No data exposure." },
      { value: "low", text: "Low: Limited or non-critical information exposed." },
      { value: "high", text: "High: Significant sensitive information exposed." },
    ],
    example: "A compromised email account containing confidential company information would typically be High.",
    whyItMatters: "High confidentiality impact significantly raises the CVSS score. The scope of exposed data determines the practical impact to the organization.",
  },
  {
    id: "integrity",
    label: "Integrity Impact",
    question: "Can data be modified, altered, or deleted?",
    tooltip: "Integrity measures unauthorized changes to data.",
    options: [
      { value: "none", label: "None (no impact)" },
      { value: "low", label: "Low (some data could be modified)" },
      { value: "high", label: "High (data could be extensively modified)" },
    ],
    details: [
      { value: "none", text: "None: Data cannot be modified." },
      { value: "low", text: "Low: Limited modifications possible." },
      { value: "high", text: "High: Significant modification or destruction of important data possible." },
    ],
    example: "Creating email forwarding rules may be Low integrity impact. Modifying payroll records may be High.",
    whyItMatters: "High integrity impact indicates data can be significantly modified or destroyed, raising CVSS score and business risk.",
  },
  {
    id: "availability",
    label: "Availability Impact",
    question: "Can systems or services become unavailable?",
    tooltip: "Availability measures disruption of service.",
    options: [
      { value: "none", label: "None (no impact)" },
      { value: "low", label: "Low (minor service degradation)" },
      { value: "high", label: "High (complete denial of service)" },
    ],
    details: [
      { value: "none", text: "None: No service disruption." },
      { value: "low", text: "Low: Minor degradation or reduced performance." },
      { value: "high", text: "High: Complete outage or denial of service." },
    ],
    example: "Ransomware that locks users out of critical systems would typically be High.",
    whyItMatters: "High availability impact indicates complete service outage, which can have severe business consequences and raises CVSS severity.",
  },
];

function HelpTooltip({ question }: { question: (typeof questions)[0] }) {
   const [open, setOpen] = useState(false);

   return (
     <TooltipProvider>
       <Tooltip open={open} onOpenChange={setOpen}>
         <TooltipTrigger asChild>
           <button 
             className="flex-shrink-0 text-blue-400 hover:text-blue-300 mt-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
             onClick={() => setOpen(!open)}
             aria-label={`Help for ${question.label}`}
           >
             <HelpCircle className="w-5 h-5" />
           </button>
         </TooltipTrigger>
         <TooltipContent side="left" className="max-w-xs bg-slate-700 border-slate-600 text-white p-4 rounded-lg w-80">
          <div className="space-y-3 text-left">
            <p className="font-semibold text-blue-300">{question.label}</p>
            <p className="text-sm text-slate-200">{question.tooltip}</p>
            <div className="border-t border-slate-600 pt-2">
              <div className="space-y-1">
                {question.details.map((detail) => (
                  <p key={detail.value} className="text-xs text-slate-300">
                    <span className="font-semibold">{detail.value.charAt(0).toUpperCase() + detail.value.slice(1)}:</span> {detail.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-600 pt-2">
              <p className="text-xs text-slate-300">
                <span className="font-semibold">Example:</span> {question.example}
              </p>
            </div>
            <div className="border-t border-slate-600 pt-2 bg-slate-600 bg-opacity-50 p-2 rounded">
              <p className="text-xs text-yellow-200">
                <span className="font-semibold">Why This Matters:</span> {question.whyItMatters}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function QuestionsPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[currentQuestion];
  const allAnswered = questions.every((q) => answers[q.id]);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleContinue = () => {
    const metrics: CVSSMetrics = {
      attackVector: answers.attackVector as any,
      attackComplexity: answers.attackComplexity as any,
      privilegesRequired: answers.privilegesRequired as any,
      userInteraction: answers.userInteraction as any,
      scope: answers.scope as any,
      confidentiality: answers.confidentiality as any,
      integrity: answers.integrity as any,
      availability: answers.availability as any,
    };

    navigate("/incident", { state: { metrics } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Vulnerability Assessment</h1>
          <p className="text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <Label className="text-lg font-semibold text-white block mb-1">
                {question.label}
              </Label>
              <p className="text-slate-300 text-sm">{question.question}</p>
            </div>
            <HelpTooltip question={question} />
          </div>

          <RadioGroup value={answers[question.id] || ""} onValueChange={handleAnswer}>
            <div className="space-y-4">
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer flex-1 m-0">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        <div className="flex gap-4 justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-slate-600 text-slate-300 disabled:opacity-50"
          >
            Previous
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleContinue}
              disabled={!allAnswered}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue to Incident Analysis
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

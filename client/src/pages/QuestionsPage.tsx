import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio";
import { CVSSMetrics } from "../lib/cvss";

const questions = [
  {
    id: "attackVector",
    label: "Attack Vector - How can the vulnerability be exploited?",
    options: [
      { value: "network", label: "Network (remotely accessible)" },
      { value: "adjacent", label: "Adjacent (same local network)" },
      { value: "local", label: "Local (local machine access required)" },
      { value: "physical", label: "Physical (physical access required)" },
    ],
  },
  {
    id: "attackComplexity",
    label: "Attack Complexity - How difficult is it to exploit?",
    options: [
      { value: "low", label: "Low (easy to exploit)" },
      { value: "high", label: "High (requires specific conditions)" },
    ],
  },
  {
    id: "privilegesRequired",
    label: "Privileges Required - What access level is needed?",
    options: [
      { value: "none", label: "None (no privileges required)" },
      { value: "low", label: "Low (basic user privileges)" },
      { value: "high", label: "High (administrator/root privileges)" },
    ],
  },
  {
    id: "userInteraction",
    label: "User Interaction - Is user action needed?",
    options: [
      { value: "none", label: "None (automatic exploit)" },
      { value: "required", label: "Required (user must perform action)" },
    ],
  },
  {
    id: "confidentiality",
    label: "Confidentiality Impact - Can sensitive data be read?",
    options: [
      { value: "none", label: "None (no impact)" },
      { value: "low", label: "Low (some sensitive data accessible)" },
      { value: "high", label: "High (all sensitive data accessible)" },
    ],
  },
  {
    id: "integrity",
    label: "Integrity Impact - Can data be modified?",
    options: [
      { value: "none", label: "None (no impact)" },
      { value: "low", label: "Low (some data could be modified)" },
      { value: "high", label: "High (data could be extensively modified)" },
    ],
  },
  {
    id: "availability",
    label: "Availability Impact - Can services be disrupted?",
    options: [
      { value: "none", label: "None (no impact)" },
      { value: "low", label: "Low (minor service degradation)" },
      { value: "high", label: "High (complete denial of service)" },
    ],
  },
];

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
      scope: "unchanged",
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
          <Label className="text-lg font-semibold text-white mb-6 block">
            {question.label}
          </Label>

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

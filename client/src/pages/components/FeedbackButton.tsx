import { Button } from "../../components/ui/button";
import { Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function FeedbackButton() {
  const [copied, setCopied] = useState(false);
  const [showCopyFallback, setShowCopyFallback] = useState(false);

  const emailAddress = "nickmeade1990@gmail.com";
  const subject = "Cyber Shield Lens Feedback";
  const body = encodeURIComponent(
    `Cyber Shield Lens Version: [Enter version]\n\nFeedback:\n[Enter your feedback here]\n\nSteps to Reproduce (if reporting a bug):\n[Enter steps if applicable]\n\nExpected Behavior:\n[Enter expected behavior]\n\nActual Behavior:\n[Enter actual behavior]`
  );

  const handleFeedbackClick = () => {
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    try {
      window.location.href = mailtoLink;
    } catch (error) {
      console.error("Failed to open email client:", error);
      setShowCopyFallback(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (showCopyFallback) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-slate-300">
          Please send feedback to <span className="font-semibold">{emailAddress}</span>
        </p>
        <Button
          onClick={handleCopyEmail}
          variant="outline"
          className="border-slate-600 text-slate-300 w-full sm:w-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Email Address
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleFeedbackClick}
      variant="outline"
      className="border-slate-600 text-slate-300"
      title="Send feedback about Cyber Shield Lens"
    >
      <Mail className="w-4 h-4 mr-2" />
      Feedback
    </Button>
  );
}

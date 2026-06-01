// CVSS 3.1 Scoring Logic

export interface CVSSMetrics {
  attackVector: "network" | "adjacent" | "local" | "physical";
  attackComplexity: "low" | "high";
  privilegesRequired: "none" | "low" | "high";
  userInteraction: "none" | "required";
  scope: "unchanged" | "changed";
  confidentiality: "none" | "low" | "high";
  integrity: "none" | "low" | "high";
  availability: "none" | "low" | "high";
}

export interface CVSSScore {
  score: number;
  severity: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  vector: string;
  explanation: string;
}

const baseMetricValues = {
  attackVector: { network: 0.85, adjacent: 0.62, local: 0.55, physical: 0.2 },
  attackComplexity: { low: 0.77, high: 0.44 },
  privilegesRequired: {
    unchanged: { none: 0.85, low: 0.62, high: 0.27 },
    changed: { none: 0.85, low: 0.68, high: 0.5 },
  },
  userInteraction: { none: 0.85, required: 0.62 },
  confidentiality: { none: 0, low: 0.22, high: 0.56 },
  integrity: { none: 0, low: 0.22, high: 0.56 },
  availability: { none: 0, low: 0.22, high: 0.56 },
};

function roundUp(value: number): number {
  return Math.ceil(value * 10) / 10;
}

export function calculateCVSSScore(metrics: CVSSMetrics): CVSSScore {
  const scope = metrics.scope;

  // Get metric values
  const av = baseMetricValues.attackVector[metrics.attackVector];
  const ac = baseMetricValues.attackComplexity[metrics.attackComplexity];
  const pr =
    baseMetricValues.privilegesRequired[scope][metrics.privilegesRequired];
  const ui = baseMetricValues.userInteraction[metrics.userInteraction];

  const c = baseMetricValues.confidentiality[metrics.confidentiality];
  const i = baseMetricValues.integrity[metrics.integrity];
  const a = baseMetricValues.availability[metrics.availability];

  // Calculate Impact Sub Score (ISC_Base)
  const iscBase = 1 - (1 - c) * (1 - i) * (1 - a);

  // Calculate Impact based on scope
  let impact: number;
  if (iscBase <= 0) {
    impact = 0;
  } else if (scope === "unchanged") {
    impact = 6.42 * iscBase;
  } else {
    // Scope changed
    impact = 7.52 * (iscBase - 0.029) - 3.25 * Math.pow(iscBase - 0.02, 15);
  }

  // Calculate Exploitability
  const exploitability = 8.22 * av * ac * pr * ui;

  // Calculate Base Score
  let baseScore: number;
  if (impact <= 0) {
    baseScore = 0;
  } else if (scope === "unchanged") {
    baseScore = roundUp(Math.min(impact + exploitability, 10));
  } else {
    // Scope changed
    baseScore = roundUp(Math.min(1.08 * (impact + exploitability), 10));
  }

  // Severity mapping
  let severity: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  if (baseScore === 0) {
    severity = "NONE";
  } else if (baseScore < 4) {
    severity = "LOW";
  } else if (baseScore < 7) {
    severity = "MEDIUM";
  } else if (baseScore < 9) {
    severity = "HIGH";
  } else {
    severity = "CRITICAL";
  }

  // Generate CVSS vector
  const vector = generateVector(metrics);

  // Generate explanation
  const explanation = generateExplanation(metrics, baseScore, severity);

  return {
    score: baseScore,
    severity,
    vector,
    explanation,
  };
}

function generateVector(metrics: CVSSMetrics): string {
  const av = {
    network: "N",
    adjacent: "A",
    local: "L",
    physical: "P",
  }[metrics.attackVector];

  const ac = { low: "L", high: "H" }[metrics.attackComplexity];
  const pr = { none: "N", low: "L", high: "H" }[metrics.privilegesRequired];
  const ui = { none: "N", required: "R" }[metrics.userInteraction];
  const s = { unchanged: "U", changed: "C" }[metrics.scope];
  const c = { none: "N", low: "L", high: "H" }[metrics.confidentiality];
  const i = { none: "N", low: "L", high: "H" }[metrics.integrity];
  const a = { none: "N", low: "L", high: "H" }[metrics.availability];

  return `CVSS:3.1/AV:${av}/AC:${ac}/PR:${pr}/UI:${ui}/S:${s}/C:${c}/I:${i}/A:${a}`;
}

function generateExplanation(
  metrics: CVSSMetrics,
  score: number,
  severity: string
): string {
  const parts: string[] = [];

  parts.push(`Attack Vector: This vulnerability is exploitable from the ${metrics.attackVector} (${
    metrics.attackVector === "network"
      ? "remotely accessible"
      : metrics.attackVector === "adjacent"
        ? "adjacent network"
        : metrics.attackVector === "local"
          ? "local machine"
          : "physical proximity"
  }).`);

  parts.push(
    `Attack Complexity: The attack has ${metrics.attackComplexity === "low" ? "low complexity" : "high complexity"}.`
  );

  parts.push(
    `Privileges Required: ${metrics.privilegesRequired === "none" ? "No privileges are required" : metrics.privilegesRequired === "low" ? "Low-level privileges are required" : "High-level privileges are required"}.`
  );

  parts.push(
    `User Interaction: ${metrics.userInteraction === "none" ? "User interaction is not required" : "User interaction is required"}.`
  );

  const impacts: string[] = [];
  if (metrics.confidentiality !== "none") {
    impacts.push(`${metrics.confidentiality} confidentiality impact`);
  }
  if (metrics.integrity !== "none") {
    impacts.push(`${metrics.integrity} integrity impact`);
  }
  if (metrics.availability !== "none") {
    impacts.push(`${metrics.availability} availability impact`);
  }

  if (impacts.length > 0) {
    parts.push(
      `Impact: There is ${impacts.join(", ")} with scope ${metrics.scope === "changed" ? "changed" : "unchanged"}.`
    );
  } else {
    parts.push("Impact: No impact to confidentiality, integrity, or availability.");
  }

  parts.push(
    `Overall Severity: ${severity} (Score: ${score}). ${getServerityDescription(severity)}`
  );

  return parts.join(" ");
}

function getServerityDescription(severity: string): string {
  const descriptions = {
    NONE: "This vulnerability has no known impact.",
    LOW:
      "The vulnerability has a low risk and can be addressed when resources permit.",
    MEDIUM:
      "The vulnerability poses a moderate risk and should be addressed in the near future.",
    HIGH: "This is a serious vulnerability that requires prompt remediation.",
    CRITICAL:
      "This is a critical vulnerability that requires immediate remediation before the system is used in production.",
  };
  return descriptions[severity] || "";
}

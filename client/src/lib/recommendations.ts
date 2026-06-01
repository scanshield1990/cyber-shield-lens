// Recommended actions and guidance based on MITRE ATT&CK tactics

export interface TacticRecommendation {
  tactic: string;
  description: string;
  actions: string[];
  priority: "Critical" | "High" | "Medium" | "Low";
}

export const tacticRecommendations: Record<string, TacticRecommendation> = {
  "Initial Access": {
    tactic: "Initial Access",
    description:
      "An attacker may have gained an initial foothold within the environment through phishing, exploitation, exposed services, or other entry points.",
    actions: [
      "Review email gateway logs for suspicious messages",
      "Investigate phishing and social engineering attempts",
      "Analyze web application access logs for exploitation attempts",
      "Identify exposed internet-facing assets and services",
      "Verify patch levels on all public-facing systems",
      "Review firewall and WAF alerts for suspicious activity",
      "Identify potentially compromised user accounts",
      "Confirm endpoint protection coverage on all systems",
      "Review VPN and remote access logs",
      "Assess security awareness training effectiveness",
    ],
    priority: "Critical",
  },
  Execution: {
    tactic: "Execution",
    description:
      "Malicious code or commands may have been executed within the environment.",
    actions: [
      "Review process creation logs on all systems",
      "Investigate PowerShell activity and script execution",
      "Analyze command execution history",
      "Inspect EDR (Endpoint Detection & Response) alerts",
      "Identify unauthorized executables and scripts",
      "Review script execution event logs",
      "Isolate affected hosts immediately if malicious code detected",
      "Preserve forensic evidence for investigation",
      "Scan all systems for malware signatures",
      "Review scheduled task execution history",
    ],
    priority: "Critical",
  },
  Persistence: {
    tactic: "Persistence",
    description:
      "The attacker may have established mechanisms to maintain access over time.",
    actions: [
      "Review scheduled tasks on all systems",
      "Audit startup entries and autorun locations",
      "Inspect installed services and service modifications",
      "Verify registry autorun and startup folder integrity",
      "Identify unauthorized or suspicious accounts",
      "Investigate newly created persistence mechanisms",
      "Compare systems against known-good baselines",
      "Remove unauthorized persistence artifacts",
      "Monitor for recurring malicious activity patterns",
      "Implement application whitelisting to prevent unauthorized execution",
    ],
    priority: "Critical",
  },
  "Privilege Escalation": {
    tactic: "Privilege Escalation",
    description:
      "The attacker may have gained elevated permissions beyond their intended access level.",
    actions: [
      "Audit all privileged accounts and their activities",
      "Review administrator and root account activity logs",
      "Investigate permission changes and role modifications",
      "Verify group membership changes",
      "Review account privilege assignment history",
      "Validate least-privilege enforcement across systems",
      "Check systems for known privilege escalation vulnerabilities",
      "Verify patch compliance for all systems",
      "Monitor for unauthorized sudo/Run As usage",
      "Implement and enforce privilege access management (PAM) solutions",
    ],
    priority: "Critical",
  },
  "Defense Evasion": {
    tactic: "Defense Evasion",
    description:
      "The attacker may have attempted to avoid detection or bypass security controls.",
    actions: [
      "Review audit logs for signs of tampering",
      "Verify logging integrity and log collection mechanisms",
      "Check endpoint protection status and configuration",
      "Identify disabled or modified security controls",
      "Investigate deleted or modified event logs",
      "Review authentication control effectiveness",
      "Inspect obfuscated or encoded activity patterns",
      "Compare system configurations against security baselines",
      "Review anti-malware and firewall configurations",
      "Implement centralized logging and SIEM monitoring",
      "Enable audit logging on all critical systems",
    ],
    priority: "High",
  },
  "Credential Access": {
    tactic: "Credential Access",
    description:
      "The attacker may have attempted to obtain credentials, tokens, passwords, or authentication material.",
    actions: [
      "Reset affected user passwords immediately",
      "Rotate all authentication tokens and API keys",
      "Invalidate active sessions for affected accounts",
      "Review and enforce MFA enrollment across organization",
      "Analyze authentication logs for suspicious patterns",
      "Investigate unusual login activity and failed attempts",
      "Review identity provider logs (Active Directory, Azure AD, etc.)",
      "Monitor for credential reuse on other systems",
      "Implement password managers and secure credential storage",
      "Enable network segmentation to prevent lateral movement",
      "Deploy credential dumping detection tools",
    ],
    priority: "Critical",
  },
  Discovery: {
    tactic: "Discovery",
    description:
      "The attacker may have performed reconnaissance or environment enumeration.",
    actions: [
      "Review network scanning and enumeration activity",
      "Analyze firewall and IDS/IPS logs for reconnaissance",
      "Identify systems that were targeted by scanning",
      "Audit service exposure and publicly accessible services",
      "Investigate account enumeration attempts",
      "Review asset inventory records for completeness",
      "Assess attack surface visibility and exposure",
      "Monitor for additional reconnaissance activity",
      "Implement network segmentation to limit visibility",
      "Deploy honeypots to detect reconnaissance activity",
    ],
    priority: "Medium",
  },
  "Lateral Movement": {
    tactic: "Lateral Movement",
    description:
      "The attacker may have attempted to move between systems after gaining initial access.",
    actions: [
      "Review remote access activity (RDP, SSH, VPN)",
      "Analyze RDP usage logs for suspicious sessions",
      "Audit SMB activity and administrative share access",
      "Inspect administrative shares for unauthorized access",
      "Identify all potentially compromised systems",
      "Review account usage patterns across systems",
      "Segment network to prevent lateral movement",
      "Verify privileged account activity and restrictions",
      "Implement microsegmentation where possible",
      "Monitor for lateral movement detection patterns",
    ],
    priority: "Critical",
  },
  Collection: {
    tactic: "Collection",
    description:
      "The attacker may have gathered information, files, databases, or sensitive records.",
    actions: [
      "Identify accessed data repositories and systems",
      "Review file access logs for unauthorized access",
      "Analyze database activity logs",
      "Determine scope of data exposure",
      "Identify affected records and data types",
      "Preserve forensic evidence for investigation",
      "Assess regulatory and compliance implications",
      "Notify relevant stakeholders as required",
      "Review data classification and access controls",
      "Implement DLP (Data Loss Prevention) solutions",
    ],
    priority: "High",
  },
  Exfiltration: {
    tactic: "Exfiltration",
    description:
      "The attacker may have transferred information outside the organization.",
    actions: [
      "Review outbound network traffic for data transfer",
      "Analyze cloud storage activity and uploads",
      "Investigate large file transfers and unusual patterns",
      "Review DLP (Data Loss Prevention) alerts",
      "Identify exfiltrated information and exposure scope",
      "Assess regulatory breach notification requirements",
      "Preserve forensic evidence",
      "Initiate breach response and notification procedures",
      "Implement network monitoring and egress filtering",
      "Deploy data exfiltration detection tools",
    ],
    priority: "Critical",
  },
  Impact: {
    tactic: "Impact",
    description:
      "The attacker may have disrupted operations, destroyed data, encrypted systems, or caused business interruption.",
    actions: [
      "Activate incident response and business continuity procedures",
      "Identify all affected systems and data",
      "Assess operational impact and business continuity",
      "Verify backup integrity and recoverability",
      "Prioritize critical service restoration",
      "Preserve forensic evidence before recovery",
      "Coordinate recovery activities across teams",
      "Document timeline of events",
      "Conduct post-incident review and lessons learned",
      "Review disaster recovery and backup procedures",
      "Consider law enforcement notification if required",
    ],
    priority: "Critical",
  },
  Reconnaissance: {
    tactic: "Reconnaissance",
    description:
      "An attacker may have conducted preliminary information gathering about the organization.",
    actions: [
      "Review publicly available information about organization",
      "Monitor for mentions on forums and dark web",
      "Assess social engineering susceptibility",
      "Review OSINT findings",
      "Enhance monitoring for related reconnaissance activity",
    ],
    priority: "Medium",
  },
  "Resource Development": {
    tactic: "Resource Development",
    description:
      "An attacker may have established infrastructure to support future attacks.",
    actions: [
      "Monitor for C2 (Command & Control) communications",
      "Review domain registrations and DNS records",
      "Investigate suspicious infrastructure",
      "Monitor threat intelligence feeds for related indicators",
      "Block identified malicious infrastructure",
    ],
    priority: "High",
  },
  "Command and Control": {
    tactic: "Command and Control",
    description:
      "The attacker may have established communication with deployed malware or tools.",
    actions: [
      "Monitor for C2 beaconing activity",
      "Review DNS queries for suspicious domains",
      "Analyze network traffic for C2 patterns",
      "Identify C2 infrastructure and block it",
      "Preserve network traffic for forensic analysis",
      "Monitor for data exfiltration patterns",
      "Implement network segmentation to restrict C2 communication",
    ],
    priority: "High",
  },
};

export function getRecommendationsForTactics(tactics: string[]): TacticRecommendation[] {
  return tactics
    .map((tactic) => tacticRecommendations[tactic])
    .filter((rec) => rec !== undefined)
    .sort((a, b) => {
      const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

export function generateExecutiveSummary(
  tactics: string[],
  techniques: any[],
  confidence: string
): string {
  const uniqueTactics = new Set(tactics);
  const criticalTactics = Array.from(uniqueTactics).filter((tactic) => {
    const rec = tacticRecommendations[tactic];
    return rec && rec.priority === "Critical";
  });

  const highPriorityTactics = Array.from(uniqueTactics).filter((tactic) => {
    const rec = tacticRecommendations[tactic];
    return rec && rec.priority === "High";
  });

  let summary = "";

  if (tactics.length === 0) {
    return "No MITRE ATT&CK tactics were identified in the incident description. Continue monitoring for indicators of compromise.";
  }

  if (confidence === "High") {
    summary +=
      "High confidence assessment indicates significant likelihood of the identified attack patterns. ";
  } else if (confidence === "Medium") {
    summary +=
      "Medium confidence assessment indicates moderate likelihood of the identified attack patterns. ";
  } else {
    summary +=
      "Low confidence assessment indicates limited matches to known attack patterns. ";
  }

  if (criticalTactics.length > 0) {
    summary += `${criticalTactics.length} critical tactic(s) identified: ${Array.from(criticalTactics).join(", ")}. `;
    summary +=
      "Immediate action is required to contain the incident, preserve evidence, and prevent further compromise.";
  } else if (highPriorityTactics.length > 0) {
    summary += `${highPriorityTactics.length} high-priority tactic(s) identified: ${Array.from(highPriorityTactics).join(", ")}. `;
    summary +=
      "Priority response actions are necessary to mitigate risks and secure affected systems.";
  } else {
    summary += `${tactics.length} tactic(s) identified. Review recommendations and adjust security controls accordingly.`;
  }

  if (techniques && techniques.length > 0) {
    const topTechniques = techniques
      .slice(0, 3)
      .map((t) => t.name)
      .join(", ");
    summary += ` Key techniques include: ${topTechniques}.`;
  }

  return summary;
}

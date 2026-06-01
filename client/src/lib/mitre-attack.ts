// MITRE ATT&CK Framework Integration

export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
}

// Common MITRE ATT&CK techniques with keyword mappings
const mitreTechniques: MitreTechnique[] = [
  {
    id: "T1059",
    name: "Command and Scripting Interpreter",
    tactic: "Execution",
  },
  { id: "T1197", name: "BITS Jobs", tactic: "Defense Evasion" },
  { id: "T1547", name: "Boot or Logon Autostart Execution", tactic: "Persistence" },
  {
    id: "T1110",
    name: "Brute Force",
    tactic: "Credential Access",
  },
  {
    id: "T1555",
    name: "Credentials from Password Stores",
    tactic: "Credential Access",
  },
  {
    id: "T1589",
    name: "Gather Victim Identity Information",
    tactic: "Reconnaissance",
  },
  { id: "T1566", name: "Phishing", tactic: "Initial Access" },
  {
    id: "T1190",
    name: "Exploit Public-Facing Application",
    tactic: "Initial Access",
  },
  { id: "T1133", name: "External Remote Services", tactic: "Initial Access" },
  { id: "T1200", name: "Hardware Additions", tactic: "Initial Access" },
  {
    id: "T1566.002",
    name: "Phishing: Spearphishing Link",
    tactic: "Initial Access",
  },
  {
    id: "T1566.001",
    name: "Phishing: Spearphishing Attachment",
    tactic: "Initial Access",
  },
  { id: "T1598", name: "Phishing for Information", tactic: "Reconnaissance" },
  { id: "T1040", name: "Network Sniffing", tactic: "Credential Access" },
  { id: "T1003", name: "OS Credential Dumping", tactic: "Credential Access" },
  {
    id: "T1528",
    name: "Steal Application Access Token",
    tactic: "Credential Access",
  },
  {
    id: "T1111",
    name: "Multi-Factor Authentication Interception",
    tactic: "Credential Access",
  },
  {
    id: "T1040",
    name: "Network Sniffing",
    tactic: "Credential Access",
  },
  {
    id: "T1556",
    name: "Modify Authentication Process",
    tactic: "Defense Evasion",
  },
  { id: "T1134", name: "Access Token Manipulation", tactic: "Defense Evasion" },
  { id: "T1197", name: "BITS Jobs", tactic: "Defense Evasion" },
  { id: "T1140", name: "Deobfuscate/Decode Files or Information", tactic: "Defense Evasion" },
  { id: "T1480", name: "Execution Guardrails", tactic: "Defense Evasion" },
  {
    id: "T1578",
    name: "Modify Cloud Compute Infrastructure",
    tactic: "Defense Evasion",
  },
  { id: "T1070", name: "Indicator Removal", tactic: "Defense Evasion" },
  { id: "T1036", name: "Masquerading", tactic: "Defense Evasion" },
  { id: "T1556", name: "Modify Authentication Process", tactic: "Defense Evasion" },
  { id: "T1207", name: "Rogue Domain Controller", tactic: "Defense Evasion" },
  {
    id: "T1218",
    name: "System Binary Proxy Execution",
    tactic: "Defense Evasion",
  },
  { id: "T1221", name: "Template Injection", tactic: "Defense Evasion" },
  {
    id: "T1550",
    name: "Use Alternate Authentication Material",
    tactic: "Defense Evasion",
  },
  { id: "T1078", name: "Valid Accounts", tactic: "Defense Evasion" },
  { id: "T1497", name: "Virtualization/Sandbox Evasion", tactic: "Defense Evasion" },
  { id: "T1220", name: "XSL Script Processing", tactic: "Defense Evasion" },
  {
    id: "T1087",
    name: "Account Discovery",
    tactic: "Discovery",
  },
  { id: "T1010", name: "Application Window Discovery", tactic: "Discovery" },
  { id: "T1217", name: "Browser Bookmark Discovery", tactic: "Discovery" },
  {
    id: "T1580",
    name: "Cloud Infrastructure Discovery",
    tactic: "Discovery",
  },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1538", name: "Cloud Service Dashboard", tactic: "Discovery" },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1580", name: "Cloud Infrastructure Discovery", tactic: "Discovery" },
  {
    id: "T1538",
    name: "Cloud Service Dashboard",
    tactic: "Discovery",
  },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1619", name: "Cloud Storage Object Discovery", tactic: "Discovery" },
  { id: "T1538", name: "Cloud Service Dashboard", tactic: "Discovery" },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1619", name: "Cloud Storage Object Discovery", tactic: "Discovery" },
  {
    id: "T1613",
    name: "Container and Resource Discovery",
    tactic: "Discovery",
  },
  { id: "T1622", name: "Debugger Evasion", tactic: "Defense Evasion" },
  { id: "T1538", name: "Cloud Service Dashboard", tactic: "Discovery" },
  { id: "T1580", name: "Cloud Infrastructure Discovery", tactic: "Discovery" },
  { id: "T1538", name: "Cloud Service Dashboard", tactic: "Discovery" },
  { id: "T1087", name: "Account Discovery", tactic: "Discovery" },
  {
    id: "T1010",
    name: "Application Window Discovery",
    tactic: "Discovery",
  },
  { id: "T1217", name: "Browser Bookmark Discovery", tactic: "Discovery" },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1538", name: "Cloud Service Dashboard", tactic: "Discovery" },
  { id: "T1619", name: "Cloud Storage Object Discovery", tactic: "Discovery" },
  { id: "T1613", name: "Container and Resource Discovery", tactic: "Discovery" },
  { id: "T1580", name: "Cloud Infrastructure Discovery", tactic: "Discovery" },
  {
    id: "T1538",
    name: "Cloud Service Dashboard",
    tactic: "Discovery",
  },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1619", name: "Cloud Storage Object Discovery", tactic: "Discovery" },
  { id: "T1057", name: "Process Discovery", tactic: "Discovery" },
  { id: "T1518", name: "Software Discovery", tactic: "Discovery" },
  { id: "T1007", name: "System Information Discovery", tactic: "Discovery" },
  { id: "T1049", name: "System Network Configuration Discovery", tactic: "Discovery" },
  {
    id: "T1040",
    name: "Network Sniffing",
    tactic: "Discovery",
  },
  {
    id: "T1046",
    name: "Network Service Discovery",
    tactic: "Discovery",
  },
  { id: "T1135", name: "Network Share Discovery", tactic: "Discovery" },
  {
    id: "T1040",
    name: "Network Sniffing",
    tactic: "Discovery",
  },
  {
    id: "T1040",
    name: "Network Sniffing",
    tactic: "Discovery",
  },
  { id: "T1040", name: "Network Sniffing", tactic: "Discovery" },
  { id: "T1040", name: "Network Sniffing", tactic: "Discovery" },
  { id: "T1552", name: "Unsecured Credentials", tactic: "Credential Access" },
  { id: "T1187", name: "Forced Authentication", tactic: "Credential Access" },
  { id: "T1040", name: "Network Sniffing", tactic: "Discovery" },
  {
    id: "T1040",
    name: "Network Sniffing",
    tactic: "Discovery",
  },
  {
    id: "T1566",
    name: "Phishing",
    tactic: "Initial Access",
  },
  { id: "T1195", name: "Supply Chain Compromise", tactic: "Initial Access" },
  { id: "T1199", name: "Trusted Relationship", tactic: "Initial Access" },
  { id: "T1091", name: "Replication Through Removable Media", tactic: "Lateral Movement" },
  { id: "T1570", name: "Lateral Tool Transfer", tactic: "Lateral Movement" },
  {
    id: "T1570",
    name: "Lateral Tool Transfer",
    tactic: "Lateral Movement",
  },
  { id: "T1570", name: "Lateral Tool Transfer", tactic: "Lateral Movement" },
  {
    id: "T1021",
    name: "Remote Services",
    tactic: "Lateral Movement",
  },
  {
    id: "T1570",
    name: "Lateral Tool Transfer",
    tactic: "Lateral Movement",
  },
  { id: "T1550", name: "Use Alternate Authentication Material", tactic: "Lateral Movement" },
  {
    id: "T1570",
    name: "Lateral Tool Transfer",
    tactic: "Lateral Movement",
  },
  { id: "T1570", name: "Lateral Tool Transfer", tactic: "Lateral Movement" },
  { id: "T1570", name: "Lateral Tool Transfer", tactic: "Lateral Movement" },
  {
    id: "T1570",
    name: "Lateral Tool Transfer",
    tactic: "Lateral Movement",
  },
  {
    id: "T1578",
    name: "Modify Cloud Compute Infrastructure",
    tactic: "Impact",
  },
  { id: "T1531", name: "Account Access Removal", tactic: "Impact" },
  { id: "T1531", name: "Account Access Removal", tactic: "Impact" },
  { id: "T1482", name: "Domain Trust Discovery", tactic: "Discovery" },
  { id: "T1087", name: "Account Discovery", tactic: "Discovery" },
  {
    id: "T1087",
    name: "Account Discovery",
    tactic: "Discovery",
  },
  { id: "T1087", name: "Account Discovery", tactic: "Discovery" },
  {
    id: "T1482",
    name: "Domain Trust Discovery",
    tactic: "Discovery",
  },
];

const keywordToTechniques: Record<string, string[]> = {
  // Attack vectors
  phishing: ["T1566", "T1598", "T1566.001", "T1566.002"],
  email: ["T1566"],
  link: ["T1566.002"],
  attachment: ["T1566.001"],
  malware: ["T1204", "T1566"],
  ransomware: ["T1486", "T1565", "T1561"],
  exploit: ["T1190", "T1068"],
  "privilege escalation": ["T1548", "T1134", "T1547"],
  "lateral movement": ["T1021", "T1570", "T1550"],
  "credential theft": ["T1110", "T1555", "T1003", "T1040"],
  "password attack": ["T1110"],
  brute: ["T1110"],
  "sql injection": ["T1190", "T1005"],
  xss: ["T1190"],
  "cross-site": ["T1190"],
  "denial of service": ["T1499", "T1561"],
  dos: ["T1499"],
  ddos: ["T1499"],
  command: ["T1059"],
  script: ["T1059"],
  "code execution": ["T1059"],
  backdoor: ["T1547", "T1574"],
  persistence: ["T1547"],
  rootkit: ["T1547", "T1556"],
  "remote access": ["T1133", "T1021"],
  "web shell": ["T1190", "T1505"],
  "network sniff": ["T1040"],
  packet: ["T1040"],
  "man in the middle": ["T1040"],
  mitm: ["T1040"],
  eavesdrop: ["T1040"],
  "data exfiltration": ["T1020", "T1041"],
  "data theft": ["T1020", "T1041"],
  "data leak": ["T1020", "T1041"],
  "credential harvesting": ["T1056", "T1187"],
  keylog: ["T1056"],
  capture: ["T1056"],
  "password reset": ["T1556"],
  "authentication bypass": ["T1556"],
  mfa: ["T1111", "T1556"],
  "multi-factor": ["T1111"],
  "supply chain": ["T1195"],
  "third party": ["T1195"],
  vendor: ["T1195"],
  vulnerability: ["T1190", "T1068"],
  zero: ["T1190", "T1068"],
  "zero-day": ["T1190", "T1068"],
  "rce": ["T1059", "T1190"],
  "remote code": ["T1059", "T1190"],
  "file transfer": ["T1570"],
  staging: ["T1608"],
  "command and control": ["T1071", "T1001"],
  c2: ["T1071", "T1001"],
  beacon: ["T1071"],
  "data obfuscation": ["T1001", "T1140"],
  "log deletion": ["T1070"],
  "log tampering": ["T1070"],
  "event log": ["T1070"],
  "trace removal": ["T1070"],
  masquerading: ["T1036"],
  "fake": ["T1036"],
  impersonation: ["T1036"],
  "account takeover": ["T1078", "T1110"],
  "valid account": ["T1078"],
  "legitimate account": ["T1078"],
  "stolen credentials": ["T1110", "T1187"],
  "weak password": ["T1110"],
  "default credential": ["T1110"],
  "hardcoded password": ["T1552"],
  "api key": ["T1552", "T1087"],
  "access token": ["T1528"],
  "session hijack": ["T1550", "T1111"],
  "cookie theft": ["T1528"],
  vpn: ["T1133", "T1021"],
  rdp: ["T1021"],
  ssh: ["T1021"],
  "secure shell": ["T1021"],
  windows: ["T1021", "T1087"],
  linux: ["T1021", "T1087"],
  "active directory": ["T1087", "T1482"],
  ldap: ["T1087"],
  dns: ["T1040", "T1071"],
  "domain controller": ["T1207"],
  "registry modification": ["T1547"],
  "startup folder": ["T1547"],
  "scheduled task": ["T1053"],
  cron: ["T1053"],
  docker: ["T1613"],
  kubernetes: ["T1613"],
  cloud: ["T1526", "T1580"],
  aws: ["T1526", "T1580"],
  azure: ["T1526", "T1580"],
  gcp: ["T1526", "T1580"],
  "object storage": ["T1619"],
  s3: ["T1619"],
  "storage account": ["T1619"],
  "bucket": ["T1619"],
  "access control": ["T1087", "T1087"],
  iam: ["T1087"],
  rbac: ["T1087"],
};

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  const words = normalized.split(/[\s\W]+/);
  const bigrams = [];

  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`);
  }

  return [...words, ...bigrams].filter((w) => w.length > 0);
}

export function suggestMitreTechniques(
  description: string
): { techniques: MitreTechnique[]; tactics: string[] } {
  const keywords = extractKeywords(description);
  const matchedTechniqueIds = new Set<string>();

  for (const keyword of keywords) {
    const techniques = keywordToTechniques[keyword];
    if (techniques) {
      techniques.forEach((id) => matchedTechniqueIds.add(id));
    }
  }

  const matched = Array.from(matchedTechniqueIds)
    .map((id) => mitreTechniques.find((t) => t.id === id))
    .filter((t) => t !== undefined) as MitreTechnique[];

  const tacticsSet = new Set(matched.map((t) => t.tactic));
  const tactics = Array.from(tacticsSet).sort();

  return {
    techniques: matched.slice(0, 10),
    tactics,
  };
}

export function getAllTactics(): string[] {
  const tacticSet = new Set(mitreTechniques.map((t) => t.tactic));
  return Array.from(tacticSet).sort();
}

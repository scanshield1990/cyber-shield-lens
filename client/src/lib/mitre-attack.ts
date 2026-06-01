// MITRE ATT&CK Framework Integration

export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  confidence?: number;
  matchedKeywords?: string[];
  reason?: string;
}

export interface KeywordCategory {
  category: string;
  keywords: string[];
  techniques: string[];
  description: string;
}

// Common MITRE ATT&CK techniques with keyword mappings
const mitreTechniques: MitreTechnique[] = [
  { id: "T1059", name: "Command and Scripting Interpreter", tactic: "Execution" },
  { id: "T1197", name: "BITS Jobs", tactic: "Defense Evasion" },
  { id: "T1547", name: "Boot or Logon Autostart Execution", tactic: "Persistence" },
  { id: "T1110", name: "Brute Force", tactic: "Credential Access" },
  { id: "T1555", name: "Credentials from Password Stores", tactic: "Credential Access" },
  { id: "T1589", name: "Gather Victim Identity Information", tactic: "Reconnaissance" },
  { id: "T1566", name: "Phishing", tactic: "Initial Access" },
  { id: "T1190", name: "Exploit Public-Facing Application", tactic: "Initial Access" },
  { id: "T1133", name: "External Remote Services", tactic: "Initial Access" },
  { id: "T1200", name: "Hardware Additions", tactic: "Initial Access" },
  { id: "T1189", name: "Drive-by Compromise", tactic: "Initial Access" },
  { id: "T1566.002", name: "Phishing: Spearphishing Link", tactic: "Initial Access" },
  { id: "T1566.001", name: "Phishing: Spearphishing Attachment", tactic: "Initial Access" },
  { id: "T1598", name: "Phishing for Information", tactic: "Reconnaissance" },
  { id: "T1040", name: "Network Sniffing", tactic: "Credential Access" },
  { id: "T1003", name: "OS Credential Dumping", tactic: "Credential Access" },
  { id: "T1528", name: "Steal Application Access Token", tactic: "Credential Access" },
  { id: "T1111", name: "Multi-Factor Authentication Interception", tactic: "Credential Access" },
  { id: "T1556", name: "Modify Authentication Process", tactic: "Defense Evasion" },
  { id: "T1134", name: "Access Token Manipulation", tactic: "Defense Evasion" },
  { id: "T1140", name: "Deobfuscate/Decode Files or Information", tactic: "Defense Evasion" },
  { id: "T1480", name: "Execution Guardrails", tactic: "Defense Evasion" },
  { id: "T1578", name: "Modify Cloud Compute Infrastructure", tactic: "Defense Evasion" },
  { id: "T1070", name: "Indicator Removal", tactic: "Defense Evasion" },
  { id: "T1036", name: "Masquerading", tactic: "Defense Evasion" },
  { id: "T1207", name: "Rogue Domain Controller", tactic: "Defense Evasion" },
  { id: "T1218", name: "System Binary Proxy Execution", tactic: "Defense Evasion" },
  { id: "T1221", name: "Template Injection", tactic: "Defense Evasion" },
  { id: "T1550", name: "Use Alternate Authentication Material", tactic: "Defense Evasion" },
  { id: "T1078", name: "Valid Accounts", tactic: "Defense Evasion" },
  { id: "T1497", name: "Virtualization/Sandbox Evasion", tactic: "Defense Evasion" },
  { id: "T1220", name: "XSL Script Processing", tactic: "Defense Evasion" },
  { id: "T1562", name: "Impair Defenses", tactic: "Defense Evasion" },
  { id: "T1027", name: "Obfuscated Files or Information", tactic: "Defense Evasion" },
  { id: "T1055", name: "Process Injection", tactic: "Defense Evasion" },
  { id: "T1622", name: "Debugger Evasion", tactic: "Defense Evasion" },
  { id: "T1087", name: "Account Discovery", tactic: "Discovery" },
  { id: "T1010", name: "Application Window Discovery", tactic: "Discovery" },
  { id: "T1217", name: "Browser Bookmark Discovery", tactic: "Discovery" },
  { id: "T1580", name: "Cloud Infrastructure Discovery", tactic: "Discovery" },
  { id: "T1526", name: "Cloud Service Discovery", tactic: "Discovery" },
  { id: "T1538", name: "Cloud Service Dashboard", tactic: "Discovery" },
  { id: "T1619", name: "Cloud Storage Object Discovery", tactic: "Discovery" },
  { id: "T1613", name: "Container and Resource Discovery", tactic: "Discovery" },
  { id: "T1057", name: "Process Discovery", tactic: "Discovery" },
  { id: "T1518", name: "Software Discovery", tactic: "Discovery" },
  { id: "T1007", name: "System Information Discovery", tactic: "Discovery" },
  { id: "T1049", name: "System Network Configuration Discovery", tactic: "Discovery" },
  { id: "T1046", name: "Network Service Discovery", tactic: "Discovery" },
  { id: "T1135", name: "Network Share Discovery", tactic: "Discovery" },
  { id: "T1552", name: "Unsecured Credentials", tactic: "Credential Access" },
  { id: "T1187", name: "Forced Authentication", tactic: "Credential Access" },
  { id: "T1195", name: "Supply Chain Compromise", tactic: "Initial Access" },
  { id: "T1199", name: "Trusted Relationship", tactic: "Initial Access" },
  { id: "T1091", name: "Replication Through Removable Media", tactic: "Lateral Movement" },
  { id: "T1570", name: "Lateral Tool Transfer", tactic: "Lateral Movement" },
  { id: "T1021", name: "Remote Services", tactic: "Lateral Movement" },
  { id: "T1531", name: "Account Access Removal", tactic: "Impact" },
  { id: "T1482", name: "Domain Trust Discovery", tactic: "Discovery" },
  { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
  { id: "T1565", name: "Data Destruction", tactic: "Impact" },
  { id: "T1561", name: "Disk Wipe", tactic: "Impact" },
  { id: "T1499", name: "Endpoint Denial of Service", tactic: "Impact" },
  { id: "T1068", name: "Exploitation for Privilege Escalation", tactic: "Privilege Escalation" },
  { id: "T1548", name: "Abuse Elevation Control Mechanism", tactic: "Privilege Escalation" },
  { id: "T1574", name: "Hijack Execution Flow", tactic: "Persistence" },
  { id: "T1505", name: "Server Software Component", tactic: "Persistence" },
  { id: "T1543", name: "Create or Modify System Process", tactic: "Persistence" },
  { id: "T1053", name: "Scheduled Task/Job", tactic: "Execution" },
  { id: "T1005", name: "Data from Local System", tactic: "Collection" },
  { id: "T1020", name: "Automated Exfiltration", tactic: "Exfiltration" },
  { id: "T1041", name: "Exfiltration Over C2 Channel", tactic: "Exfiltration" },
  { id: "T1056", name: "Input Capture", tactic: "Collection" },
  { id: "T1204", name: "User Execution", tactic: "Execution" },
  { id: "T1071", name: "Application Layer Protocol", tactic: "Command and Control" },
  { id: "T1001", name: "Data Obfuscation", tactic: "Command and Control" },
  { id: "T1608", name: "Stage Capabilities", tactic: "Resource Development" },
  { id: "T1213", name: "Data from Information Repositories", tactic: "Collection" },
  { id: "T1114", name: "Email Collection", tactic: "Collection" },
  { id: "T1113", name: "Screen Capture", tactic: "Collection" },
  { id: "T1123", name: "Audio Capture", tactic: "Collection" },
  { id: "T1125", name: "Video Capture", tactic: "Collection" },
  { id: "T1115", name: "Clipboard Data", tactic: "Collection" },
  { id: "T1567", name: "Exfiltration Over Web Service", tactic: "Exfiltration" },
  { id: "T1048", name: "Exfiltration Over Alternative Protocol", tactic: "Exfiltration" },
  { id: "T1496", name: "Resource Hijacking", tactic: "Impact" },
  { id: "T1491", name: "Defacement", tactic: "Impact" },
  { id: "T1583", name: "Acquire Infrastructure", tactic: "Resource Development" },
  { id: "T1586", name: "Compromise Accounts", tactic: "Resource Development" },
  { id: "T1539", name: "Steal Web Session Cookie", tactic: "Credential Access" },
  { id: "T1595", name: "Active Scanning", tactic: "Reconnaissance" },
];

// Comprehensive keyword to techniques mapping with support for synonyms and abbreviations
const keywordToTechniques: Record<string, { techniques: string[]; weight: number }> = {
  // SQL Injection variations
  "sql injection": { techniques: ["T1190", "T1005", "T1505"], weight: 1.0 },
  sqli: { techniques: ["T1190", "T1005", "T1505"], weight: 0.9 },
  "malicious sql": { techniques: ["T1190", "T1005"], weight: 0.8 },
  "database injection": { techniques: ["T1190", "T1005"], weight: 0.8 },
  "unsanitized input": { techniques: ["T1190", "T1005"], weight: 0.7 },
  "sql query": { techniques: ["T1190", "T1005"], weight: 0.7 },
  "extracted database": { techniques: ["T1005"], weight: 0.6 },
  "pulled data": { techniques: ["T1005"], weight: 0.6 },

  // Phishing variations
  phishing: { techniques: ["T1566", "T1598", "T1566.001", "T1566.002"], weight: 1.0 },
  phish: { techniques: ["T1566", "T1566.001", "T1566.002"], weight: 0.9 },
  "fake login": { techniques: ["T1566", "T1187"], weight: 0.9 },
  "credential harvesting": { techniques: ["T1566", "T1056", "T1187"], weight: 0.9 },
  "malicious email": { techniques: ["T1566"], weight: 0.9 },
  spoof: { techniques: ["T1566", "T1036"], weight: 0.8 },
  spearphishing: { techniques: ["T1566.001", "T1566.002"], weight: 0.95 },
  "fake microsoft": { techniques: ["T1566", "T1036"], weight: 0.8 },

  // Ransomware variations
  ransomware: { techniques: ["T1486", "T1565", "T1561"], weight: 1.0 },
  "encrypted files": { techniques: ["T1486"], weight: 0.95 },
  "ransom note": { techniques: ["T1486"], weight: 1.0 },
  "locked files": { techniques: ["T1486", "T1561"], weight: 0.9 },
  inaccessible: { techniques: ["T1486", "T1561"], weight: 0.8 },
  "bitcoin payment": { techniques: ["T1486"], weight: 0.9 },
  "encryption attack": { techniques: ["T1486"], weight: 0.9 },

  // Brute Force variations
  "brute force": { techniques: ["T1110"], weight: 1.0 },
  "password guessing": { techniques: ["T1110"], weight: 0.95 },
  "credential stuffing": { techniques: ["T1110"], weight: 0.95 },
  "failed login": { techniques: ["T1110"], weight: 0.85 },
  "login attempt": { techniques: ["T1110"], weight: 0.8 },
  "password spray": { techniques: ["T1110"], weight: 0.9 },

  // XSS variations
  xss: { techniques: ["T1190", "T1059"], weight: 0.95 },
  "cross site scripting": { techniques: ["T1190", "T1059"], weight: 1.0 },
  "javascript injection": { techniques: ["T1190", "T1059"], weight: 0.9 },
  "script injection": { techniques: ["T1190", "T1059"], weight: 0.9 },

  // Malware variations
  malware: { techniques: ["T1204", "T1566"], weight: 0.8 },
  trojan: { techniques: ["T1204", "T1547"], weight: 0.85 },
  virus: { techniques: ["T1204", "T1547"], weight: 0.85 },
  "malicious executable": { techniques: ["T1204"], weight: 0.9 },
  payload: { techniques: ["T1204", "T1071"], weight: 0.8 },
  "malware detected": { techniques: ["T1204"], weight: 0.9 },

  // Exploitation variations
  exploit: { techniques: ["T1190", "T1068"], weight: 1.0 },
  "public facing": { techniques: ["T1190"], weight: 0.9 },
  "zero day": { techniques: ["T1190", "T1068"], weight: 0.95 },
  vulnerability: { techniques: ["T1190", "T1068"], weight: 0.8 },
  cve: { techniques: ["T1190", "T1068"], weight: 0.85 },

  // Privilege Escalation variations
  "privilege escalation": { techniques: ["T1548", "T1134", "T1547", "T1068"], weight: 1.0 },
  "privilege escalat": { techniques: ["T1548", "T1134", "T1547"], weight: 0.9 },
  privesc: { techniques: ["T1548", "T1134", "T1547"], weight: 0.9 },

  // Lateral Movement variations
  "lateral movement": { techniques: ["T1021", "T1570", "T1550"], weight: 1.0 },
  "lateral move": { techniques: ["T1021", "T1570"], weight: 0.9 },
  "remote service": { techniques: ["T1021", "T1133"], weight: 0.9 },
  "jump server": { techniques: ["T1021"], weight: 0.9 },

  // Credential Access variations
  "credential theft": { techniques: ["T1110", "T1555", "T1003", "T1040", "T1187"], weight: 1.0 },
  "credential access": { techniques: ["T1110", "T1555", "T1003", "T1040"], weight: 0.9 },
  "password attack": { techniques: ["T1110"], weight: 0.95 },
  brute: { techniques: ["T1110"], weight: 0.85 },

  // Data variations
  "data exfiltration": { techniques: ["T1020", "T1041", "T1005"], weight: 1.0 },
  "data theft": { techniques: ["T1020", "T1041", "T1005"], weight: 1.0 },
  "data leak": { techniques: ["T1020", "T1041", "T1005"], weight: 1.0 },
  "data extraction": { techniques: ["T1005"], weight: 0.95 },
  "data from database": { techniques: ["T1005"], weight: 0.9 },

  // DoS variations
  "denial of service": { techniques: ["T1499", "T1561"], weight: 1.0 },
  dos: { techniques: ["T1499"], weight: 0.95 },
  ddos: { techniques: ["T1499"], weight: 0.95 },
  "service disruption": { techniques: ["T1499"], weight: 0.85 },

  // RCE variations
  rce: { techniques: ["T1059", "T1190"], weight: 1.0 },
  "remote code execution": { techniques: ["T1059", "T1190"], weight: 1.0 },
  "remote command": { techniques: ["T1059", "T1021"], weight: 0.9 },

  // Command & Control variations
  c2: { techniques: ["T1071", "T1001"], weight: 0.95 },
  "command and control": { techniques: ["T1071", "T1001"], weight: 1.0 },
  beacon: { techniques: ["T1071"], weight: 0.9 },
  "c&c": { techniques: ["T1071", "T1001"], weight: 0.9 },

  // Authentication variations (expanded)
  "authentication bypass": { techniques: ["T1556", "T1078"], weight: 1.0 },
  "bypass authentication": { techniques: ["T1556", "T1078"], weight: 1.0 },
  "bypassed authentication": { techniques: ["T1556", "T1078"], weight: 0.95 },
  "authentication protocol bypass": { techniques: ["T1556", "T1078"], weight: 0.95 },
  "bypassed login controls": { techniques: ["T1556", "T1078"], weight: 0.95 },
  "unauthorized authentication": { techniques: ["T1556", "T1078"], weight: 0.9 },
  "circumvented authentication": { techniques: ["T1556", "T1078"], weight: 0.95 },
  "authentication weakness": { techniques: ["T1556", "T1078"], weight: 0.9 },
  "login bypass": { techniques: ["T1556", "T1078"], weight: 0.95 },
  "access control bypass": { techniques: ["T1556", "T1078"], weight: 0.9 },
  "bypass security controls": { techniques: ["T1556", "T1078"], weight: 0.85 },
  mfa: { techniques: ["T1111", "T1556"], weight: 0.85 },
  "multi-factor": { techniques: ["T1111"], weight: 0.9 },
  "password reset": { techniques: ["T1556"], weight: 0.8 },

  // Privilege Escalation variations (expanded)
  "elevated privileges": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "elevated to admin": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "gained administrator access": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "gained admin access": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "escalated privileges": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "local privilege escalation": { techniques: ["T1068", "T1078"], weight: 1.0 },
  "elevated account permissions": { techniques: ["T1068", "T1078"], weight: 0.9 },
  "unauthorized admin access": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "obtained administrator rights": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "root access gained": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "sudo abuse": { techniques: ["T1068", "T1078"], weight: 0.95 },
  elevate: { techniques: ["T1068"], weight: 0.6 },
  escalating: { techniques: ["T1068"], weight: 0.7 },

  // Account Takeover variations
  "account compromise": { techniques: ["T1078"], weight: 0.95 },
  "account takeover": { techniques: ["T1078"], weight: 0.95 },
  "unauthorized account access": { techniques: ["T1078"], weight: 0.95 },
  "compromised account": { techniques: ["T1078"], weight: 0.95 },
  "hijacked account": { techniques: ["T1078"], weight: 0.95 },
  "stolen account": { techniques: ["T1078"], weight: 0.95 },
  "unauthorized login": { techniques: ["T1078"], weight: 0.9 },

  // Sensitive Data Access variations
  "accessed sensitive data": { techniques: ["T1213"], weight: 0.95 },
  "viewed sensitive information": { techniques: ["T1213"], weight: 0.95 },
  "confidential data exposure": { techniques: ["T1213"], weight: 0.95 },
  "unauthorized data access": { techniques: ["T1213"], weight: 0.95 },
  "exposed records": { techniques: ["T1213"], weight: 0.95 },
  "customer data access": { techniques: ["T1213"], weight: 0.95 },
  "sensitive information disclosure": { techniques: ["T1213"], weight: 0.95 },
  "data exposure": { techniques: ["T1213"], weight: 0.9 },
  "viewed protected data": { techniques: ["T1213"], weight: 0.9 },
  "unauthorized record access": { techniques: ["T1213"], weight: 0.95 },
  "extracted data": { techniques: ["T1213"], weight: 0.9 },
  "downloaded confidential information": { techniques: ["T1213"], weight: 0.95 },

  // Authorization & Access Control Abuse variations
  "authorization bypass": { techniques: ["T1078", "T1068"], weight: 0.95 },
  "role escalation": { techniques: ["T1068", "T1078"], weight: 0.95 },
  "permission abuse": { techniques: ["T1078", "T1068"], weight: 0.9 },
  "excessive permissions": { techniques: ["T1078"], weight: 0.9 },
  "broken access control": { techniques: ["T1078", "T1068"], weight: 0.95 },
  "unauthorized privileges": { techniques: ["T1078", "T1068"], weight: 0.95 },
  "privilege abuse": { techniques: ["T1078", "T1068"], weight: 0.95 },

  // Initial Access variations (comprehensive)
  "malicious attachment": { techniques: ["T1566.001", "T1566"], weight: 0.95 },
  "drive-by download": { techniques: ["T1189"], weight: 0.95 },
  "watering hole": { techniques: ["T1189"], weight: 0.95 },
  "exploit public application": { techniques: ["T1190"], weight: 0.95 },
  "external compromise": { techniques: ["T1195"], weight: 0.9 },
  "internet-facing application": { techniques: ["T1190"], weight: 0.9 },
  "exposed service": { techniques: ["T1190"], weight: 0.85 },
  "initial compromise": { techniques: ["T1190", "T1195"], weight: 0.85 },
  "public facing application": { techniques: ["T1190"], weight: 0.9 },
  "supply chain attack": { techniques: ["T1195"], weight: 0.95 },
  "trusted relationship compromise": { techniques: ["T1199"], weight: 0.95 },
  "vendor compromise": { techniques: ["T1195"], weight: 0.9 },
  "third party software": { techniques: ["T1195"], weight: 0.85 },

  // Execution variations (comprehensive)
  "powershell command": { techniques: ["T1059"], weight: 0.95 },
  "command execution": { techniques: ["T1059"], weight: 0.95 },
  "shell command": { techniques: ["T1059"], weight: 0.95 },
  "terminal access": { techniques: ["T1059"], weight: 0.9 },
  "script execution": { techniques: ["T1059"], weight: 0.95 },
  "batch file execution": { techniques: ["T1059"], weight: 0.9 },
  "executable launched": { techniques: ["T1059"], weight: 0.85 },
  "code execution": { techniques: ["T1059"], weight: 0.95 },
  "macro execution": { techniques: ["T1204"], weight: 0.9 },
  "malicious code": { techniques: ["T1059", "T1204"], weight: 0.9 },
  "user clicked link": { techniques: ["T1204"], weight: 0.9 },
  "user opened attachment": { techniques: ["T1204"], weight: 0.9 },

  // Persistence variations (comprehensive)
  "startup item": { techniques: ["T1547"], weight: 0.95 },
  "autorun entry": { techniques: ["T1547"], weight: 0.95 },
  "scheduled task created": { techniques: ["T1053"], weight: 0.95 },
  "registry run key": { techniques: ["T1547"], weight: 0.95 },
  "service installation": { techniques: ["T1543"], weight: 0.95 },
  "persistence mechanism": { techniques: ["T1547", "T1053"], weight: 0.9 },
  "backdoor installed": { techniques: ["T1547", "T1574"], weight: 0.95 },
  "implanted access": { techniques: ["T1547", "T1543"], weight: 0.9 },
  "long-term access": { techniques: ["T1547", "T1053"], weight: 0.85 },
  "cron job": { techniques: ["T1053"], weight: 0.95 },
  "web shell": { techniques: ["T1505"], weight: 0.95 },
  "server component": { techniques: ["T1505"], weight: 0.9 },

  // Defense Evasion variations (comprehensive)
  "disabled antivirus": { techniques: ["T1562"], weight: 0.95 },
  "disabled windows defender": { techniques: ["T1562"], weight: 0.95 },
  "security disabled": { techniques: ["T1562"], weight: 0.9 },
  "tampered logs": { techniques: ["T1070"], weight: 0.95 },
  "deleted event logs": { techniques: ["T1070"], weight: 0.95 },
  "cleared logs": { techniques: ["T1070"], weight: 0.95 },
  "obfuscated code": { techniques: ["T1027"], weight: 0.95 },
  "encoded commands": { techniques: ["T1027"], weight: 0.95 },
  "hidden process": { techniques: ["T1036"], weight: 0.9 },
  "renamed executable": { techniques: ["T1036"], weight: 0.9 },
  "disguised as system": { techniques: ["T1036"], weight: 0.9 },
  "unsigned binary": { techniques: ["T1036"], weight: 0.85 },
  "sandbox evasion": { techniques: ["T1497"], weight: 0.95 },
  "debugger evasion": { techniques: ["T1622"], weight: 0.9 },
  "anti-forensics": { techniques: ["T1070", "T1027"], weight: 0.9 },
  "virtualization detection": { techniques: ["T1497"], weight: 0.9 },
  "process injection": { techniques: ["T1055"], weight: 0.95 },
  "dll injection": { techniques: ["T1055"], weight: 0.95 },

  // Credential Access variations (comprehensive)
  "password dumped": { techniques: ["T1003"], weight: 0.95 },
  "credential dump": { techniques: ["T1003"], weight: 0.95 },
  "lsass memory": { techniques: ["T1003"], weight: 0.95 },
  mimikatz: { techniques: ["T1003"], weight: 0.95 },
  "token theft": { techniques: ["T1539"], weight: 0.95 },
  "oauth token": { techniques: ["T1528"], weight: 0.95 },
  "stolen token": { techniques: ["T1528"], weight: 0.95 },
  "session hijacking": { techniques: ["T1111", "T1056"], weight: 0.95 },
  "mfa interception": { techniques: ["T1111"], weight: 0.95 },
  "keylogger detected": { techniques: ["T1056"], weight: 0.95 },
  "input capture": { techniques: ["T1056"], weight: 0.95 },
  "unsecured credentials": { techniques: ["T1552"], weight: 0.95 },
  "credential store": { techniques: ["T1555"], weight: 0.95 },
  "password manager accessed": { techniques: ["T1555"], weight: 0.95 },
  "forced authentication": { techniques: ["T1187"], weight: 0.95 },
  "ntlm relay": { techniques: ["T1187"], weight: 0.95 },
  "network sniffing": { techniques: ["T1040"], weight: 0.95 },
  "packet capture": { techniques: ["T1040"], weight: 0.95 },

  // Discovery variations (comprehensive)
  "reconnaissance activity": { techniques: ["T1595"], weight: 0.9 },
  "active scanning": { techniques: ["T1595"], weight: 0.95 },
  "port scanning": { techniques: ["T1046"], weight: 0.95 },
  "nmap scan": { techniques: ["T1046"], weight: 0.95 },
  "network enumeration": { techniques: ["T1087"], weight: 0.95 },
  "account enumeration": { techniques: ["T1087"], weight: 0.95 },
  fingerprinting: { techniques: ["T1598"], weight: 0.9 },
  "service discovery": { techniques: ["T1046"], weight: 0.95 },
  "host discovery": { techniques: ["T1595"], weight: 0.95 },
  "asset inventory": { techniques: ["T1526", "T1087"], weight: 0.85 },
  "domain trust discovery": { techniques: ["T1482"], weight: 0.95 },
  "forest enumeration": { techniques: ["T1482"], weight: 0.95 },
  "share discovery": { techniques: ["T1135"], weight: 0.95 },
  "software discovery": { techniques: ["T1518"], weight: 0.9 },
  "system information": { techniques: ["T1007"], weight: 0.85 },
  "network configuration": { techniques: ["T1049"], weight: 0.85 },
  "process enumeration": { techniques: ["T1057"], weight: 0.9 },
  "browser bookmark discovery": { techniques: ["T1217"], weight: 0.95 },
  "cloud service discovery": { techniques: ["T1526"], weight: 0.95 },
  "cloud infrastructure discovery": { techniques: ["T1580"], weight: 0.95 },
  "container discovery": { techniques: ["T1613"], weight: 0.95 },

  // Lateral Movement variations (comprehensive)
  "psexec execution": { techniques: ["T1021"], weight: 0.95 },
  "rdp session": { techniques: ["T1021"], weight: 0.95 },
  "remote desktop": { techniques: ["T1021"], weight: 0.95 },
  "smb movement": { techniques: ["T1021"], weight: 0.95 },
  pivoting: { techniques: ["T1021", "T1570"], weight: 0.95 },
  "workstation hopping": { techniques: ["T1021"], weight: 0.95 },
  "lateral tool transfer": { techniques: ["T1570"], weight: 0.95 },
  "removable media": { techniques: ["T1091"], weight: 0.9 },

  // Collection variations (comprehensive)
  "data collection": { techniques: ["T1005", "T1213"], weight: 0.85 },
  "file collection": { techniques: ["T1005"], weight: 0.9 },
  "database extraction": { techniques: ["T1213"], weight: 0.95 },
  "information repository": { techniques: ["T1213"], weight: 0.95 },
  "email collection": { techniques: ["T1114"], weight: 0.95 },
  "screen capture": { techniques: ["T1113"], weight: 0.95 },
  "audio capture": { techniques: ["T1123"], weight: 0.95 },
  "video capture": { techniques: ["T1125"], weight: 0.95 },
  "clipboard collection": { techniques: ["T1115"], weight: 0.9 },

  // Exfiltration variations (comprehensive)
  "exfiltration over c2": { techniques: ["T1041"], weight: 0.95 },
  "automated exfiltration": { techniques: ["T1020"], weight: 0.95 },
  "outbound data transfer": { techniques: ["T1041"], weight: 0.9 },
  "data tunneling": { techniques: ["T1041"], weight: 0.9 },
  "cloud exfiltration": { techniques: ["T1567"], weight: 0.95 },
  "cloud storage upload": { techniques: ["T1567"], weight: 0.95 },
  "ftp transfer": { techniques: ["T1048"], weight: 0.9 },
  "dns exfiltration": { techniques: ["T1048"], weight: 0.95 },
  "icmp tunnel": { techniques: ["T1048"], weight: 0.9 },

  // Impact variations (comprehensive)
  "ransomware attack": { techniques: ["T1486"], weight: 1.0 },
  "data encryption": { techniques: ["T1486"], weight: 0.95 },
  "file encryption": { techniques: ["T1486"], weight: 0.95 },
  "data destruction": { techniques: ["T1565"], weight: 0.95 },
  "deleted data": { techniques: ["T1565"], weight: 0.95 },
  "disk wipe": { techniques: ["T1561"], weight: 0.95 },
  "wiped disks": { techniques: ["T1561"], weight: 0.95 },
  "resource hijacking": { techniques: ["T1496"], weight: 0.95 },
  "ddos attack": { techniques: ["T1499"], weight: 0.95 },
  "availability impact": { techniques: ["T1499", "T1561"], weight: 0.85 },
  "business interruption": { techniques: ["T1499", "T1486"], weight: 0.9 },
  "system unavailable": { techniques: ["T1499"], weight: 0.9 },
  "account access removal": { techniques: ["T1531"], weight: 0.95 },
  defacement: { techniques: ["T1491"], weight: 0.95 },
  "website defaced": { techniques: ["T1491"], weight: 0.95 },

  // Resource Development variations
  "acquire infrastructure": { techniques: ["T1583"], weight: 0.9 },
  "acquire domains": { techniques: ["T1583"], weight: 0.95 },
  "acquire c2 infrastructure": { techniques: ["T1583"], weight: 0.95 },
  "stage capabilities": { techniques: ["T1608"], weight: 0.95 },
  "upload malware": { techniques: ["T1608"], weight: 0.95 },
  "develop capabilities": { techniques: ["T1586"], weight: 0.85 },

  // Command & Control variations (additional)
  "dns beaconing": { techniques: ["T1071"], weight: 0.95 },
  "dns tunneling": { techniques: ["T1071"], weight: 0.95 },
  "http beacon": { techniques: ["T1071"], weight: 0.95 },
  "https communication": { techniques: ["T1071"], weight: 0.9 },
  "encrypted tunnel": { techniques: ["T1071"], weight: 0.85 },
  "malware communication": { techniques: ["T1071"], weight: 0.85 },

  // Additional technical terms
  email: { techniques: ["T1566"], weight: 0.7 },
  link: { techniques: ["T1566.002"], weight: 0.8 },
  attachment: { techniques: ["T1566.001"], weight: 0.8 },
  backdoor: { techniques: ["T1547", "T1574"], weight: 0.9 },
  persistence: { techniques: ["T1547"], weight: 0.8 },
  rootkit: { techniques: ["T1547", "T1556"], weight: 0.9 },
  "remote access": { techniques: ["T1133", "T1021"], weight: 0.9 },
  "network sniff": { techniques: ["T1040"], weight: 0.9 },
  "man in the middle": { techniques: ["T1040"], weight: 0.95 },
  mitm: { techniques: ["T1040"], weight: 0.9 },
  eavesdrop: { techniques: ["T1040"], weight: 0.85 },
  keylog: { techniques: ["T1056"], weight: 0.9 },
  "valid account": { techniques: ["T1078"], weight: 0.9 },
  "stolen credentials": { techniques: ["T1110", "T1187"], weight: 0.95 },
  "weak password": { techniques: ["T1110"], weight: 0.9 },
  "default credential": { techniques: ["T1110"], weight: 0.9 },
  "hardcoded password": { techniques: ["T1552"], weight: 0.95 },
  "api key": { techniques: ["T1552", "T1087"], weight: 0.9 },
  "access token": { techniques: ["T1528"], weight: 0.95 },
  "session hijack": { techniques: ["T1550", "T1111"], weight: 0.95 },
  "cookie theft": { techniques: ["T1528"], weight: 0.9 },
  vpn: { techniques: ["T1133", "T1021"], weight: 0.85 },
  rdp: { techniques: ["T1021"], weight: 0.9 },
  ssh: { techniques: ["T1021"], weight: 0.9 },
  "secure shell": { techniques: ["T1021"], weight: 0.9 },
  windows: { techniques: ["T1021", "T1087"], weight: 0.7 },
  linux: { techniques: ["T1021", "T1087"], weight: 0.7 },
  "active directory": { techniques: ["T1087", "T1482"], weight: 0.95 },
  ldap: { techniques: ["T1087"], weight: 0.85 },
  dns: { techniques: ["T1040", "T1071"], weight: 0.8 },
  "domain controller": { techniques: ["T1207"], weight: 0.9 },
  "registry modification": { techniques: ["T1547"], weight: 0.9 },
  "startup folder": { techniques: ["T1547"], weight: 0.9 },
  "scheduled task": { techniques: ["T1053"], weight: 0.9 },
  cron: { techniques: ["T1053"], weight: 0.9 },
  docker: { techniques: ["T1613"], weight: 0.85 },
  kubernetes: { techniques: ["T1613"], weight: 0.85 },
  cloud: { techniques: ["T1526", "T1580"], weight: 0.7 },
  aws: { techniques: ["T1526", "T1580"], weight: 0.85 },
  azure: { techniques: ["T1526", "T1580"], weight: 0.85 },
  gcp: { techniques: ["T1526", "T1580"], weight: 0.85 },
  "object storage": { techniques: ["T1619"], weight: 0.9 },
  s3: { techniques: ["T1619"], weight: 0.95 },
  "storage account": { techniques: ["T1619"], weight: 0.9 },
  bucket: { techniques: ["T1619"], weight: 0.85 },
  iam: { techniques: ["T1087"], weight: 0.85 },
  rbac: { techniques: ["T1087"], weight: 0.85 },
  "supply chain": { techniques: ["T1195"], weight: 1.0 },
  "third party": { techniques: ["T1195"], weight: 0.9 },
  vendor: { techniques: ["T1195"], weight: 0.85 },
  lfi: { techniques: ["T1190"], weight: 0.9 },
  rfi: { techniques: ["T1190"], weight: 0.9 },
  ssrf: { techniques: ["T1190"], weight: 0.9 },
  xxe: { techniques: ["T1190"], weight: 0.9 },
  "xml external entity": { techniques: ["T1190"], weight: 0.95 },
  "log deletion": { techniques: ["T1070"], weight: 0.95 },
  "log tampering": { techniques: ["T1070"], weight: 0.95 },
  "trace removal": { techniques: ["T1070"], weight: 0.9 },
  masquerading: { techniques: ["T1036"], weight: 0.9 },
  impersonation: { techniques: ["T1036"], weight: 0.9 },
};

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
}

// Fuzzy match with confidence score
function fuzzyMatch(text: string, target: string, maxDistance: number = 2): number {
  const distance = levenshteinDistance(text.toLowerCase(), target.toLowerCase());
  const maxLen = Math.max(text.length, target.length);
  if (distance > maxDistance) return 0;
  return 1 - distance / maxLen;
}

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  const words = normalized.split(/[\s\W]+/);
  const bigrams = [];
  const trigrams = [];

  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`);
  }
  for (let i = 0; i < words.length - 2; i++) {
    trigrams.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }

  return [...trigrams, ...bigrams, ...words].filter((w) => w.length > 0);
}

export function suggestMitreTechniques(
  description: string
): { techniques: MitreTechnique[]; tactics: string[]; confidence: string; matchedKeywords: string[] } {
  const keywords = extractKeywords(description);
  const matchMap = new Map<
    string,
    { weight: number; keywords: Set<string> }
  >();

  // Exact matches
  for (const keyword of keywords) {
    const match = keywordToTechniques[keyword];
    if (match) {
      for (const techniqueId of match.techniques) {
        if (!matchMap.has(techniqueId)) {
          matchMap.set(techniqueId, { weight: 0, keywords: new Set() });
        }
        const current = matchMap.get(techniqueId)!;
        current.weight += match.weight;
        current.keywords.add(keyword);
      }
    }
  }

  // Fuzzy matching for close matches
  const allKeywords = Object.keys(keywordToTechniques);
  for (const keyword of keywords) {
    if (keyword.length > 3) {
      for (const targetKeyword of allKeywords) {
        if (targetKeyword === keyword) continue;
        const confidence = fuzzyMatch(keyword, targetKeyword, 2);
        if (confidence > 0.7) {
          const match = keywordToTechniques[targetKeyword];
          for (const techniqueId of match.techniques) {
            if (!matchMap.has(techniqueId)) {
              matchMap.set(techniqueId, { weight: 0, keywords: new Set() });
            }
            const current = matchMap.get(techniqueId)!;
            current.weight += match.weight * confidence * 0.5; // Lower weight for fuzzy matches
            current.keywords.add(keyword);
          }
        }
      }
    }
  }

  // Convert to sorted array with deduplication
  const matched = Array.from(matchMap.entries())
    .map(([id, { weight, keywords }]) => {
      const technique = mitreTechniques.find((t) => t.id === id);
      if (!technique) return null;
      return {
        ...technique,
        confidence: weight,
        matchedKeywords: Array.from(keywords),
        reason: generateReason(Array.from(keywords), technique),
      };
    })
    .filter((t) => t !== null)
    .sort((a, b) => (b?.confidence || 0) - (a?.confidence || 0)) as MitreTechnique[];

  const tacticsSet = new Set(matched.map((t) => t.tactic));
  const tactics = Array.from(tacticsSet).sort();

  // Determine overall confidence level
  let confidenceLevel = "Low";
  if (matched.length > 0) {
    const avgConfidence =
      matched.slice(0, 5).reduce((sum, t) => sum + (t.confidence || 0), 0) / 5;
    if (avgConfidence > 0.8) confidenceLevel = "High";
    else if (avgConfidence > 0.5) confidenceLevel = "Medium";
  }

  // Collect all matched keywords
  const allMatchedKeywords = new Set<string>();
  matched.forEach((t) => {
    t.matchedKeywords?.forEach((k) => allMatchedKeywords.add(k));
  });

  return {
    techniques: matched.slice(0, 10),
    tactics,
    confidence: confidenceLevel,
    matchedKeywords: Array.from(allMatchedKeywords),
  };
}

function generateReason(keywords: string[], technique: MitreTechnique): string {
  const keywordList = keywords.slice(0, 3).join(", ");
  return `Keywords matched: ${keywordList}.`;
}

export function getAllTactics(): string[] {
  const tacticSet = new Set(mitreTechniques.map((t) => t.tactic));
  return Array.from(tacticSet).sort();
}

// Comprehensive Threat Intelligence Dictionary
export const threatIntelligenceDictionary: KeywordCategory[] = [
  {
    category: "Authentication & Credential Attacks",
    keywords: [
      "password",
      "credential",
      "login",
      "authentication",
      "token",
      "session",
      "cookie",
      "bypass authentication",
      "stolen credentials",
      "credential theft",
      "credential stuffing",
      "brute force",
      "password spraying",
      "mfa bypass",
      "account takeover",
      "session hijacking",
      "token theft",
      "cookie theft",
      "unauthorized login",
    ],
    techniques: ["T1078", "T1110", "T1539", "T1528", "T1556", "T1111"],
    description:
      "Attacks targeting user credentials, passwords, tokens, and authentication mechanisms",
  },
  {
    category: "SQL Injection / Database Attacks",
    keywords: [
      "sql",
      "sqli",
      "sql injection",
      "malicious query",
      "database query",
      "dumped database",
      "extracted records",
      "pulled data",
      "database access",
      "unauthorized query",
      "union select",
      "database enumeration",
    ],
    techniques: ["T1190", "T1213", "T1005"],
    description: "Database exploitation and data extraction attacks",
  },
  {
    category: "Cross-Site Scripting (XSS)",
    keywords: [
      "xss",
      "cross site scripting",
      "javascript injection",
      "script injection",
      "reflected xss",
      "stored xss",
      "dom xss",
    ],
    techniques: ["T1059", "T1190"],
    description: "Web application attacks using script injection to execute malicious code in browsers",
  },
  {
    category: "Command Injection / RCE",
    keywords: [
      "command injection",
      "shell access",
      "remote code execution",
      "rce",
      "arbitrary command",
      "powershell execution",
      "bash execution",
      "code execution",
    ],
    techniques: ["T1059", "T1203"],
    description: "Attacks allowing arbitrary command execution on target systems",
  },
  {
    category: "Web Exploitation",
    keywords: [
      "web shell",
      "web exploit",
      "exploit public application",
      "vulnerable web application",
      "arbitrary file upload",
      "file upload vulnerability",
      "lfi",
      "rfi",
      "ssrf",
      "xxe",
      "xml external entity",
    ],
    techniques: ["T1190", "T1505"],
    description: "Web server and web application exploitation techniques",
  },
  {
    category: "Phishing & Social Engineering",
    keywords: [
      "phishing",
      "spearphishing",
      "fake login",
      "spoofed email",
      "malicious email",
      "fake microsoft login",
      "credential harvesting",
      "malicious attachment",
      "malicious link",
    ],
    techniques: ["T1566", "T1566.001", "T1566.002"],
    description: "Social engineering and phishing attacks to compromise credentials",
  },
  {
    category: "Malware & Trojans",
    keywords: [
      "malware",
      "trojan",
      "virus",
      "worm",
      "spyware",
      "keylogger",
      "payload",
      "malicious executable",
      "backdoor",
      "malware detected",
    ],
    techniques: ["T1204", "T1059", "T1547"],
    description: "Malicious code delivery and execution mechanisms",
  },
  {
    category: "Ransomware",
    keywords: [
      "ransomware",
      "encrypted files",
      "ransom note",
      "bitcoin demand",
      "locked files",
      "files inaccessible",
      "data encrypted",
      "encryption attack",
    ],
    techniques: ["T1486"],
    description: "Encryption-based attacks for extortion and data denial",
  },
  {
    category: "Persistence Mechanisms",
    keywords: [
      "scheduled task",
      "startup item",
      "registry run key",
      "persistence",
      "backdoor account",
      "service installation",
      "registry modification",
      "startup folder",
    ],
    techniques: ["T1053", "T1547"],
    description: "Techniques to maintain long-term access to systems",
  },
  {
    category: "Privilege Escalation",
    keywords: [
      "privilege escalation",
      "root access",
      "admin access",
      "sudo abuse",
      "elevated privileges",
      "local privilege escalation",
      "kernel exploit",
      "privesc",
    ],
    techniques: ["T1068"],
    description: "Gaining higher system privileges through various techniques",
  },
  {
    category: "Lateral Movement",
    keywords: [
      "lateral movement",
      "pivot",
      "remote desktop",
      "rdp",
      "psexec",
      "smb movement",
      "workstation hopping",
      "jump server",
      "remote service",
    ],
    techniques: ["T1021", "T1570"],
    description: "Moving through network to access additional systems",
  },
  {
    category: "Data Exfiltration",
    keywords: [
      "exfiltration",
      "data theft",
      "data leak",
      "data extraction",
      "copied records",
      "downloaded files",
      "exported database",
      "data from database",
    ],
    techniques: ["T1041", "T1020", "T1005"],
    description: "Unauthorized data removal from target systems",
  },
  {
    category: "Reconnaissance & Discovery",
    keywords: [
      "scanning",
      "enumeration",
      "nmap",
      "fingerprinting",
      "subdomain discovery",
      "asset discovery",
      "port scan",
      "active directory",
      "ldap",
    ],
    techniques: ["T1595", "T1087", "T1482"],
    description: "Information gathering about systems and networks",
  },
  {
    category: "Denial of Service",
    keywords: [
      "ddos",
      "dos",
      "service unavailable",
      "outage",
      "overwhelmed server",
      "flood attack",
      "denial of service",
      "service disruption",
    ],
    techniques: ["T1499"],
    description: "Rendering systems or services unavailable",
  },
  {
    category: "Cloud-Specific Attacks",
    keywords: [
      "cloud",
      "aws",
      "azure",
      "gcp",
      "s3",
      "storage account",
      "bucket",
      "object storage",
      "iam",
      "rbac",
      "cloud infrastructure discovery",
    ],
    techniques: ["T1526", "T1580", "T1619"],
    description: "Cloud platform-specific attacks and misconfigurations",
  },
  {
    category: "Container & Orchestration",
    keywords: [
      "docker",
      "kubernetes",
      "container",
      "orchestration",
      "container discovery",
    ],
    techniques: ["T1613"],
    description: "Containerized environment exploitation",
  },
];

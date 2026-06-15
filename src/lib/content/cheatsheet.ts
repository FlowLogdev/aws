export interface CheatsheetSection {
  id: string;
  title: string;
  content: string;
}

export const cheatsheet: CheatsheetSection[] = [
  {
    id: "global-infra",
    title: "Global Infrastructure & Core Concepts",
    content: `
- **Region**: a geographic area containing multiple, isolated **Availability Zones (AZs)**.
- **Availability Zone (AZ)**: one or more discrete data centers with redundant power/networking, physically separated within a region.
- **Edge Location**: a site used by CloudFront/Route 53 to cache content/route requests closer to users.
- **6 Benefits of Cloud Computing**: trade capex for opex, benefit from economies of scale, stop guessing capacity, increase speed/agility, stop spending on data centers, go global in minutes.
- **Deployment models**: Cloud (fully in AWS), On-premises (private cloud), Hybrid (mix of both).
- **Service models**: IaaS (EC2, EBS, VPC), PaaS (Elastic Beanstalk, RDS), SaaS (end-user apps, e.g., Gmail).
- **Region selection criteria**: compliance/data governance, proximity to users (latency), available services, pricing.
`,
  },
  {
    id: "iam-security",
    title: "IAM & Account Security",
    content: `
- **Root user**: created with the account; should be locked away with MFA, only used for account-level tasks (closing account, changing support plan, viewing certain billing info, registering as seller).
- **IAM Users / Groups / Roles**: Users = people/apps; Groups = collections of users; Roles = assumed identities with temporary permissions (for AWS services or federation).
- **IAM Policies**: JSON documents (Version, Statement[{Effect, Action, Resource, [Condition]}]) attached to users/groups/roles.
- **Principle of Least Privilege**: grant only the permissions required, nothing more.
- **MFA options**: virtual MFA app (Google Authenticator/Authy), hardware key (YubiKey), hardware TOTP token.
- **Access methods**: Management Console (password+MFA), CLI (access keys), SDK (access keys).
- **IAM Credentials Report**: account-level report of all users and their credential status.
- **IAM Access Advisor**: shows service permissions granted to a user/role and when last used.
- **STS AssumeRole**: get temporary credentials to act as an IAM role (cross-account access, federation).
`,
  },
  {
    id: "compute",
    title: "Compute: EC2, Lambda, Containers",
    content: `
| Service | Type | Key Point |
|---|---|---|
| EC2 | IaaS VM | Full control of OS; choose instance type/size |
| Lambda | Serverless function | Max 15 min run, pay per ms, event-driven |
| ECS | Container orchestration (AWS-native) | EC2 or Fargate launch type |
| EKS | Managed Kubernetes | EC2 or Fargate worker nodes |
| Fargate | Serverless containers | Works with ECS & EKS, no server management |
| Elastic Beanstalk | PaaS | Upload code, AWS manages EC2/ASG/ELB |

**EC2 purchasing options**: On-Demand (pay as you go) | Reserved (1/3yr, up to 72% off) | Savings Plans ($/hr commitment) | Spot (up to 90% off, interruptible) | Dedicated Hosts/Instances (compliance) | Capacity Reservations (guaranteed capacity, no discount).

**Security Groups**: stateful, allow-only rules, instance-level, default deny inbound / allow outbound.

**EC2 User Data**: bootstrap script run once at first launch.
`,
  },
  {
    id: "storage",
    title: "Storage: S3, EBS, EFS, FSx",
    content: `
| Service | Scope | Use Case |
|---|---|---|
| S3 | Object storage, regional, "infinite" | Static files, data lakes, backups, static websites |
| EBS | Block storage, single AZ, attach to 1 instance | Boot volumes, databases |
| EFS | Managed NFS, multi-AZ, many instances (Linux) | Shared file storage |
| Instance Store | Ephemeral, host-attached | Caches/buffers (lost on stop/terminate) |
| FSx for Lustre | HPC parallel file system | ML, HPC workloads |
| FSx for Windows | SMB/NTFS + AD integration | Windows file shares |

**S3 Storage Classes** (most to least expensive/accessible): Standard -> Intelligent-Tiering -> Standard-IA -> One Zone-IA -> Glacier Instant Retrieval -> Glacier Flexible Retrieval -> Glacier Deep Archive.

**S3 features**: Versioning (protects against overwrite/delete), Lifecycle Rules (auto-transition/expire), Replication CRR/SRR (requires versioning), Pre-signed URLs (temporary access), S3 Select (SQL subset retrieval), MFA Delete, Block Public Access.

**EBS Snapshots**: point-in-time backups on S3; can copy across AZ/region; Archive tier (cheap, slow restore); Recycle Bin (protect against deletion).
`,
  },
  {
    id: "databases",
    title: "Databases: RDS, Aurora, DynamoDB, ElastiCache",
    content: `
| Service | Type | Key Point |
|---|---|---|
| RDS | Managed relational (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora) | No SSH access; Multi-AZ for HA, Read Replicas for scaling reads |
| Aurora | AWS proprietary, MySQL/PostgreSQL-compatible | 6 copies across 3 AZs; Aurora Serverless; Global Database |
| DynamoDB | NoSQL key-value/document | Single-digit ms latency; Provisioned vs On-Demand capacity; DAX cache; Global Tables; TTL; Streams |
| ElastiCache | In-memory cache (Redis/Memcached) | Reduce DB load, session storage |
| Redshift | Data warehouse (OLAP, columnar, MPP) | Analytics/reporting; Redshift Spectrum queries S3 directly |

**RDS Multi-AZ vs Read Replicas**:
- Multi-AZ = synchronous standby for HA/DR (failover, not scaling).
- Read Replicas = asynchronous, up to 15, for scaling READS (eventually consistent).
`,
  },
  {
    id: "networking",
    title: "Networking: VPC, Route 53, CloudFront, ELB",
    content: `
- **VPC**: private network per region, spans all AZs; subnets are AZ-specific.
- **Public subnet**: route to Internet Gateway (IGW). **Private subnet**: no direct internet route.
- **NAT Gateway**: outbound-only internet access for private subnets.
- **Security Groups** (stateful, allow only, instance-level) vs **NACLs** (stateless, allow+deny, subnet-level, ordered rules).
- **VPC Peering**: private connection between 2 VPCs, non-transitive, no overlapping CIDRs.
- **VPC Endpoints**: Gateway (S3/DynamoDB, via route table) vs Interface (most other services, via PrivateLink/ENI).
- **Site-to-Site VPN** (encrypted, over internet) vs **Direct Connect** (dedicated private line, faster setup weeks/months) vs **Transit Gateway** (hub-and-spoke for many VPCs).

**Route 53 routing policies**: Simple, Weighted (% split), Latency-based, Failover, Geolocation, Geoproximity, Multi-Value Answer.

**ELB types**:
| Type | Layer | Use |
|---|---|---|
| ALB | 7 (HTTP/S) | Path/host-based routing, microservices |
| NLB | 4 (TCP/UDP) | Extreme performance, static IP |
| GWLB | 3 (IP) | Third-party firewalls/appliances |

**CloudFront**: CDN, caches at edge locations; origins = S3 (use OAC), ALB, EC2, custom HTTP. **Global Accelerator**: static anycast IPs, routes over AWS backbone, good for non-HTTP/UDP & fast failover.
`,
  },
  {
    id: "integration",
    title: "Application Integration: SQS, SNS, Kinesis",
    content: `
| Service | Pattern | Key Point |
|---|---|---|
| SQS Standard | Queue | Unlimited throughput, best-effort order, possible duplicates |
| SQS FIFO | Queue | Ordered, exactly-once, limited throughput |
| SNS | Pub/Sub | One message -> many subscribers (SQS, Lambda, email, SMS, HTTP) |
| Kinesis Data Streams | Streaming | Shards, you manage scaling/retention, multiple consumers |
| Kinesis Data Firehose | Streaming | Fully managed delivery to S3/Redshift/OpenSearch |
| Kinesis Data Analytics | Streaming | Real-time SQL/Flink on streams |
| Amazon MQ | Broker | ActiveMQ/RabbitMQ, JMS/AMQP/MQTT - for migrating legacy apps |

**SQS Visibility Timeout**: hides a message from other consumers after it's read (default 30s). **DLQ**: catches repeatedly-failing messages. **Fan-out**: SNS -> multiple SQS queues.
`,
  },
  {
    id: "monitoring",
    title: "Monitoring & Management",
    content: `
| Service | Answers... |
|---|---|
| CloudWatch | "What's happening now/over time?" (metrics, logs, alarms, dashboards) |
| CloudTrail | "Who did what, when, from where?" (API activity audit, 90-day default) |
| X-Ray | "Why is this request slow/failing?" (distributed tracing, service map) |
| EventBridge | "When X happens, do Y" (event bus + scheduled rules) |

**CloudWatch Alarm states**: OK, ALARM, INSUFFICIENT_DATA. **Billing alarms** must be created in us-east-1.
`,
  },
  {
    id: "security-services",
    title: "Security & Compliance Services",
    content: `
| Service | Purpose |
|---|---|
| KMS | Manage encryption keys (AWS-managed, customer-managed, AWS-owned) |
| Secrets Manager | Store secrets + automatic rotation (e.g., RDS creds) |
| SSM Parameter Store | Store config/secrets, versioned, cheaper, no auto-rotation |
| WAF | Layer 7 firewall (SQLi, XSS) on ALB/API Gateway/CloudFront |
| Shield Standard / Advanced | DDoS protection - free/automatic vs paid/enhanced + DRT |
| GuardDuty | ML threat detection (CloudTrail/VPC Flow Logs/DNS logs), no agents |
| Inspector | Vulnerability scanning for EC2, ECR images, Lambda |
| Macie | Discover sensitive data/PII in S3 via ML |
| AWS Config | Track resource configuration changes & compliance |
| Artifact | Download AWS compliance reports (SOC, PCI, ISO) |
| Security Hub | Aggregated security findings dashboard |
| Detective | Root-cause investigation of security findings |
| Trusted Advisor | Best-practice checks: Cost, Performance, Security, Fault Tolerance, Service Limits |
`,
  },
  {
    id: "identity-advanced",
    title: "Advanced Identity: STS, Cognito, Directory Service, IAM Identity Center",
    content: `
- **STS**: temporary credentials (15min-36hr) via AssumeRole - cross-account access, federation.
- **Cognito User Pools**: customer sign-up/sign-in -> JWT tokens.
- **Cognito Identity Pools**: temporary AWS credentials for authenticated app users (after User Pool/social login).
- **AWS Directory Service**: AWS Managed Microsoft AD (real AD + trusts), AD Connector (proxy, no local users), Simple AD (Samba-based, basic).
- **IAM Identity Center** (formerly AWS SSO): workforce SSO across AWS accounts (via Organizations) + SaaS apps.
- Rule of thumb: **Cognito = your app's customers**; **IAM Identity Center = your employees**.
`,
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI Services",
    content: `
| Service | What it does |
|---|---|
| Rekognition | Image/video analysis, facial recognition, moderation |
| Textract | Extract text/data from documents (OCR+) |
| Transcribe | Speech -> text |
| Polly | Text -> speech |
| Translate | Language translation |
| Comprehend | NLP - sentiment, entities, key phrases |
| Lex | Build chatbots/voice bots (powers Alexa) |
| Kendra | Enterprise intelligent search |
| Personalize | Real-time recommendations |
| Forecast | Time-series forecasting |
| SageMaker | Build/train/deploy custom ML models |
| Bedrock | API access to foundation models (Claude, Llama, Titan) for GenAI |
| Amazon Q | GenAI assistant (Business = enterprise Q&A, Developer = coding) |
`,
  },
  {
    id: "analytics",
    title: "Analytics & Big Data",
    content: `
| Service | Role |
|---|---|
| S3 | Data lake storage layer |
| Glue | Serverless ETL + Data Catalog + Crawlers |
| Athena | Serverless SQL queries directly on S3 (pay per query scanned) |
| Redshift | OLAP data warehouse (columnar, MPP); Redshift Spectrum queries S3 |
| EMR | Managed Hadoop/Spark/Hive/Presto clusters |
| QuickSight | Serverless BI dashboards, powered by SPICE engine |

**Typical flow**: S3 (raw data) -> Glue Crawler -> Glue Data Catalog -> Athena (ad-hoc SQL) / Redshift Spectrum (warehouse) / EMR (custom big data) -> QuickSight (visualize).
`,
  },
  {
    id: "deployment-iac",
    title: "Deployment, IaC & CI/CD",
    content: `
- **CloudFormation**: declarative JSON/YAML templates -> Stacks; auto-rollback on failure; StackSets for multi-account/region.
- **CDK**: define infra in TypeScript/Python/etc., compiles to CloudFormation.
- **Elastic Beanstalk**: PaaS - Application, Application Version, Environment; AWS manages EC2/ASG/ELB.
- **CodeCommit**: managed private Git repos.
- **CodeBuild**: compile/test, produce artifacts.
- **CodeDeploy**: automate deployments to EC2/Lambda/ECS.
- **CodePipeline**: orchestrates source -> build -> test -> deploy.
- **CodeArtifact**: managed package repository (npm, Maven, PyPI).
- **CodeGuru**: ML-based code review & performance recommendations.
`,
  },
  {
    id: "migration-dr",
    title: "Migration & Disaster Recovery",
    content: `
- **Snow Family**: Snowcone (~8TB, edge) < Snowball Edge (PB-scale) < Snowmobile (EB-scale, truck). Use when network transfer > ~1 week.
- **DataSync**: online, ongoing sync between on-prem (NFS/SMB) and S3/EFS/FSx.
- **DMS**: database migration with minimal downtime (source stays live); pair with **SCT** for engine changes.
- **Application Migration Service (MGN)**: lift-and-shift servers -> EC2.
- **AWS Backup**: centralize backup policies across EBS/RDS/DynamoDB/EFS, etc.

**DR Strategies (cheapest/slowest -> most expensive/fastest)**:
1. Backup & Restore
2. Pilot Light
3. Warm Standby
4. Multi-Site / Hot Standby (Active-Active)

**RTO** = time to recover. **RPO** = acceptable data loss window.
`,
  },
  {
    id: "billing-support",
    title: "Billing, Pricing & Support",
    content: `
- **Pricing principles**: pay-as-you-go, pay less when you reserve, pay less with more usage. Data transfer IN = free; OUT = charged.
- **Free Tier**: 12-month and always-free offers (e.g., 750hr/mo t2.micro EC2, 5GB S3).
- **Pricing Calculator**: estimate costs before deploying.
- **Cost Explorer**: visualize/forecast cost & usage trends.
- **Cost & Usage Report (CUR)**: most detailed dataset, deliverable to S3, queryable via Athena.
- **AWS Budgets**: alerts on cost/usage/RI-coverage thresholds; supports zero-spend budgets.
- **Savings Plans**: Compute (flexible, across EC2/Fargate/Lambda) vs EC2 Instance (less flexible, deeper discount).

**Support Plans**:
| Plan | Highlights |
|---|---|
| Basic | Free, docs/forums, 6 core Trusted Advisor checks |
| Developer | Business-hours email support |
| Business | 24/7 phone/chat/email, full Trusted Advisor, <1hr response for prod down |
| Enterprise | + Dedicated TAM, <15min response for business-critical down |
`,
  },
  {
    id: "well-architected-caf",
    title: "Well-Architected Framework & CAF",
    content: `
**6 Pillars of the Well-Architected Framework**:
1. Operational Excellence - automate, learn from failure, small reversible changes
2. Security - least privilege, defense in depth, encryption, incident response
3. Reliability - auto-recovery, scale horizontally, stop guessing capacity
4. Performance Efficiency - managed/serverless services, go global quickly
5. Cost Optimization - consumption model, measure efficiency, attribute spend
6. Sustainability - minimize environmental impact, maximize utilization

**AWS Well-Architected Tool**: free, questionnaire-based workload review.

**Cloud Adoption Framework (CAF) - 6 Perspectives**:
- Business capabilities: **Business**, **People**, **Governance**
- Technical capabilities: **Platform**, **Security**, **Operations**
`,
  },
  {
    id: "exam-tips",
    title: "Exam Format & Quick Tips",
    content: `
- **65 questions, 90 minutes**, scored **100-1000**, **passing = 700**.
- Question types: multiple choice (1 of 4) and multiple response (2+ of 5+, no partial credit).
- **Domain weights**: Cloud Concepts 24% | Security & Compliance 30% | Cloud Technology & Services 34% | Billing/Pricing/Support 12%.
- **~83 seconds/question** average - flag-and-move-on for tough questions.

**Keyword -> Answer cues**:
- "MOST cost-effective" -> Spot, Savings Plans, S3 lifecycle/Glacier, serverless.
- "LEAST operational overhead" / "without managing servers" -> managed/serverless (Lambda, Fargate, Aurora Serverless, DynamoDB, Athena).
- "Compliance/audit trail" -> CloudTrail, AWS Artifact, AWS Config.
- "Encryption requirement" -> KMS.
- "DDoS" -> Shield (Standard free / Advanced paid).
- "Decouple" -> SQS/SNS. "Real-time streaming" -> Kinesis.
- "High availability" -> Multi-AZ / 2+ AZs. "Scale reads" -> Read Replicas.
`,
  },
];

export function getCheatsheetSection(id: string): CheatsheetSection | undefined {
  return cheatsheet.find((c) => c.id === id);
}

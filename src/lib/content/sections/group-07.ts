import type { SectionBundle } from "../types";

export const group07: SectionBundle[] = [
  // ===========================================================
  // Section 19 - Pricing, Billing & Support
  // ===========================================================
  {
    section: {
      id: "s19",
      number: 19,
      title: "Pricing, Billing & Support Plans",
      summary:
        "AWS pricing fundamentals, the Free Tier, cost management tools (Cost Explorer, Budgets, Cost & Usage Report), Savings Plans, and AWS Support plan tiers.",
      domain: 4,
      estMinutes: 40,
      content: `
## AWS Pricing Fundamentals
AWS pricing is built on three core principles:
1. **Pay as you go**: pay only for what you use, no long-term contracts required.
2. **Pay less when you reserve / commit**: discounts for committing to usage (Reserved Instances, Savings Plans).
3. **Pay less with greater usage**: volume-based discounts (e.g., S3 storage tiers get cheaper at higher volumes).

### What you typically pay for
- **Compute** (e.g., EC2 - by the second/hour), **Storage** (e.g., S3/EBS - by GB-month), **Data Transfer OUT** of AWS (data transfer IN is generally free).

## AWS Free Tier
Many services offer a **Free Tier** for the first 12 months (or always-free for some services), e.g.:
- 750 hours/month of t2.micro/t3.micro EC2.
- 5GB of S3 Standard storage.
- 750 hours of RDS db.t2.micro.
Useful for learning and small projects - but you must monitor usage to avoid unexpected charges once limits are exceeded.

## AWS Pricing Calculator
- A tool to **estimate the cost** of AWS services BEFORE you use them - build out an estimated architecture and get a monthly/annual cost projection. Useful for planning and comparing scenarios.

## Billing & Cost Management Tools
- **AWS Cost Explorer**: visualize, understand, and manage your AWS costs and usage over time with built-in reports and custom filtering (by service, tag, account, etc.); supports forecasting future costs.
- **AWS Cost and Usage Report (CUR)**: the most comprehensive cost/usage dataset, including additional metadata about AWS services, pricing, and discounts - delivered to an S3 bucket, can be queried with Athena.
- **AWS Budgets**: set custom budgets (cost, usage, RI/Savings Plans utilization/coverage) that alert you (via SNS/email) when actual or forecasted values exceed thresholds; supports a **zero-spend budget** to alert on ANY spend (e.g., for Free Tier monitoring).
- **AWS Billing Console**: view invoices, payment methods, and Free Tier usage alerts.

## Savings Plans Recap
- **Compute Savings Plans**: most flexible - applies across EC2, Fargate, and Lambda regardless of instance family/region.
- **EC2 Instance Savings Plans**: less flexible, locked to a specific instance family in a region, but deeper discounts.
- Commit to an **hourly spend** for 1 or 3 years.

## AWS Marketplace
- A digital catalog of third-party software (AMIs, SaaS, data products) that can be deployed directly on AWS, often billed through your existing AWS bill.

## AWS Support Plans
| Plan | Highlights |
|---|---|
| **Basic** | Free for all; customer service & communities, documentation, 6 core Trusted Advisor checks |
| **Developer** | Email access to Cloud Support Associates during business hours, general guidance |
| **Business** | 24/7 phone/email/chat support, full Trusted Advisor checks, faster response times (e.g., <1 hr for production system down), access to AWS Support API |
| **Enterprise** | Includes everything in Business, plus a dedicated **Technical Account Manager (TAM)**, fastest response (<15 min for business-critical down), Concierge support |

### Response time examples (approximate, for exam awareness)
- **Business/Enterprise - "Production system down"**: < 1 hour response (Business), < 15 minutes (Enterprise, business-critical).
- **General guidance**: 24 business hours (Developer) down to 24 hours regardless (Basic - via forums/docs only, no SLA).

## AWS Credits & Billing Alarms
- **AWS Credits**: promotional credits applied automatically to your bill (e.g., from AWS Activate for startups).
- A **CloudWatch Billing Alarm** (in us-east-1) can alert when estimated charges exceed a threshold - useful as a simple safeguard alongside Budgets.
`,
    },
    flashcards: [
      {
        id: "s19-f01",
        sectionId: "s19",
        front: "What are the three core principles of AWS pricing?",
        back: "1) Pay-as-you-go (no long-term contracts), 2) Pay less when you reserve/commit, 3) Pay less with greater usage (volume discounts).",
      },
      {
        id: "s19-f02",
        sectionId: "s19",
        front: "Is data transfer INTO AWS typically charged?",
        back: "No - data transfer IN is generally free; you mainly pay for data transfer OUT of AWS.",
      },
      {
        id: "s19-f03",
        sectionId: "s19",
        front: "What is the AWS Pricing Calculator used for?",
        back: "Estimating the cost of AWS services and architectures BEFORE you deploy them, for planning and comparison purposes.",
      },
      {
        id: "s19-f04",
        sectionId: "s19",
        front: "What is the difference between AWS Cost Explorer and the Cost and Usage Report (CUR)?",
        back: "Cost Explorer provides visual reports/forecasting for understanding cost trends; the CUR is the most detailed, comprehensive dataset of costs/usage, deliverable to S3 for deep analysis (e.g., with Athena).",
      },
      {
        id: "s19-f05",
        sectionId: "s19",
        front: "What is a 'zero-spend budget' in AWS Budgets?",
        back: "A budget configured to alert you the moment ANY spend occurs - commonly used to monitor Free Tier usage and catch unexpected charges early.",
      },
      {
        id: "s19-f06",
        sectionId: "s19",
        front: "Compare Compute Savings Plans and EC2 Instance Savings Plans.",
        back: "Compute Savings Plans: most flexible, applies across EC2/Fargate/Lambda regardless of instance family/region. EC2 Instance Savings Plans: less flexible (locked to instance family/region) but offer deeper discounts.",
      },
      {
        id: "s19-f07",
        sectionId: "s19",
        front: "Which AWS Support plan includes a dedicated Technical Account Manager (TAM)?",
        back: "The Enterprise Support plan.",
      },
      {
        id: "s19-f08",
        sectionId: "s19",
        front: "Which AWS Support plans offer 24/7 phone, email, and chat support with full Trusted Advisor checks?",
        back: "Business and Enterprise support plans.",
      },
    ],
    questions: [
      {
        id: "s19-q01",
        sectionId: "s19",
        domain: 4,
        question: "Which of the following is generally NOT charged by AWS?",
        options: ["Data transfer OUT to the internet", "Compute usage (e.g., EC2 hours)", "Data transfer INTO AWS", "Storage usage (e.g., S3 GB-month)"],
        correct: [2],
        explanation: "Data transfer INTO AWS is generally free; AWS primarily charges for data transfer OUT, plus compute and storage.",
        difficulty: "easy",
      },
      {
        id: "s19-q02",
        sectionId: "s19",
        domain: 4,
        question: "A company wants to estimate the monthly cost of a proposed architecture before deploying anything. Which tool should they use?",
        options: ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS Budgets", "AWS Cost and Usage Report"],
        correct: [1],
        explanation: "The AWS Pricing Calculator is designed to estimate costs for architectures before they are built/deployed.",
        difficulty: "easy",
      },
      {
        id: "s19-q03",
        sectionId: "s19",
        domain: 4,
        question: "Which AWS Support plan is the ONLY one that includes a dedicated Technical Account Manager (TAM)?",
        options: ["Basic", "Developer", "Business", "Enterprise"],
        correct: [3],
        explanation: "Only the Enterprise Support plan includes a dedicated TAM.",
        difficulty: "easy",
      },
      {
        id: "s19-q04",
        sectionId: "s19",
        domain: 4,
        question: "A user wants to be alerted via email the moment their account incurs ANY charge above $0, to catch unexpected Free Tier overages. What should they configure?",
        options: [
          "A zero-spend AWS Budget",
          "AWS Cost Explorer forecasting",
          "AWS Trusted Advisor",
          "An EC2 Reserved Instance",
        ],
        correct: [0],
        explanation: "A zero-spend budget in AWS Budgets alerts on any spend above $0, ideal for catching unexpected charges early.",
        difficulty: "medium",
      },
      {
        id: "s19-q05",
        sectionId: "s19",
        domain: 4,
        question: "Which tool provides the most detailed line-item dataset of AWS costs and usage, deliverable to S3 for querying with Athena?",
        options: ["AWS Cost Explorer", "AWS Budgets", "AWS Cost and Usage Report (CUR)", "AWS Pricing Calculator"],
        correct: [2],
        explanation: "The Cost and Usage Report (CUR) is AWS's most comprehensive and granular cost/usage dataset.",
        difficulty: "medium",
      },
      {
        id: "s19-q06",
        sectionId: "s19",
        domain: 4,
        question: "A startup needs the flexibility to apply a Savings Plan discount across a mix of EC2, Fargate, and Lambda usage regardless of instance family. Which should they choose?",
        options: ["EC2 Instance Savings Plans", "Compute Savings Plans", "Reserved Instances - Standard", "On-Demand only"],
        correct: [1],
        explanation: "Compute Savings Plans offer the most flexibility, applying across EC2, Fargate, and Lambda regardless of instance family or region.",
        difficulty: "medium",
      },
      {
        id: "s19-q07",
        sectionId: "s19",
        domain: 4,
        question: "A company on the AWS Business Support plan experiences a 'production system down' issue. What is the approximate guaranteed response time?",
        options: ["< 15 minutes", "< 1 hour", "< 12 hours", "< 24 hours"],
        correct: [1],
        explanation: "Business Support provides less than 1-hour response time for production system down cases (Enterprise offers <15 min for business-critical).",
        difficulty: "hard",
      },
      {
        id: "s19-q08",
        sectionId: "s19",
        domain: 4,
        question: "Where can a company find and deploy third-party AMIs and SaaS products that integrate billing with their AWS account?",
        options: ["AWS Artifact", "AWS Marketplace", "AWS Trusted Advisor", "AWS Budgets"],
        correct: [1],
        explanation: "AWS Marketplace is the digital catalog for third-party software that can be deployed and billed through AWS.",
        difficulty: "easy",
      },
      {
        id: "s19-q09",
        sectionId: "s19",
        domain: 4,
        question: "Which AWS Support plan tier is available completely FREE to every AWS customer?",
        options: ["Basic", "Developer", "Business", "Enterprise"],
        correct: [0],
        explanation: "Basic Support is free for all AWS customers and includes access to documentation, forums, and a limited set of Trusted Advisor checks.",
        difficulty: "easy",
      },
      {
        id: "s19-q10",
        sectionId: "s19",
        domain: 4,
        question: "What is the main difference between AWS Cost Explorer and AWS Budgets?",
        options: [
          "Cost Explorer is for visualizing/forecasting past and projected costs; Budgets proactively alerts when costs/usage exceed thresholds you define",
          "They are the same tool with different names",
          "Budgets is only for Enterprise Support customers",
          "Cost Explorer can only show data for the current day",
        ],
        correct: [0],
        explanation: "Cost Explorer focuses on visualization and analysis of cost trends/forecasts, while Budgets proactively triggers alerts based on thresholds.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 20 - Advanced Identity: STS, Cognito, Directory Service, IAM Identity Center
  // ===========================================================
  {
    section: {
      id: "s20",
      number: 20,
      title: "Advanced Identity: STS, Cognito, Directory Service & IAM Identity Center",
      summary:
        "Temporary credentials with STS, customer identity with Cognito, directory integrations, and centralized workforce access with IAM Identity Center.",
      domain: 2,
      estMinutes: 40,
      content: `
## AWS STS (Security Token Service)
- Issues **temporary, limited-privilege security credentials** (access key, secret key, session token) - typically valid from 15 minutes to 36 hours.
- **AssumeRole**: allows a user or service to "assume" an IAM Role and receive temporary credentials with that role's permissions - the foundation for cross-account access, federation, and EC2 instance roles.
- Common use cases: cross-account access (assume a role in another AWS account), federation with corporate identity providers (SAML), and providing temporary access to mobile/web app users (via Cognito).

## Amazon Cognito
Provides authentication, authorization, and user management for **web and mobile applications** (your customer-facing apps - not for managing AWS Console/IAM access).

### Cognito User Pools (CUP)
- A **user directory** for your application - sign-up/sign-in functionality, supports social identity providers (Google, Facebook, Apple) and SAML/OIDC federation.
- On successful authentication, returns **JWT tokens**.

### Cognito Identity Pools (Federated Identities)
- Provide AWS credentials to users (via STS) so they can directly access AWS services (e.g., upload to S3) - typically used **after** authenticating via a User Pool or a third-party provider.
- Users get temporary AWS credentials matching a configured IAM role (with optional fine-grained access based on the user's identity).

**Cognito User Pools (authentication: "who are you?")** + **Cognito Identity Pools (authorization to AWS resources: "what AWS resources can you access?")** are often used together.

## AWS Directory Service
For integrating AWS with **Microsoft Active Directory (AD)**:
- **AWS Managed Microsoft AD**: a real, managed Microsoft AD in AWS, supports trust relationships with on-premises AD.
- **AD Connector**: a proxy/gateway to redirect directory requests to an existing on-premises AD - no users stored in AWS.
- **Simple AD**: a basic, AD-compatible directory powered by Samba, for simple use cases without needing the full Microsoft AD feature set.

## AWS IAM Identity Center (successor to AWS SSO)
- Provides **centralized workforce access management** - one place for employees to sign in (Single Sign-On) and access multiple AWS accounts (via AWS Organizations) and third-party applications (e.g., Salesforce, Office 365).
- Integrates with external identity providers (Okta, Azure AD, on-prem AD via AWS Directory Service) or can manage its own built-in directory.
- Distinguish from Cognito: **IAM Identity Center = workforce (employees) accessing AWS accounts/apps**; **Cognito = your application's external customers/users**.

## SAML & OIDC Federation (Concept)
- **Federation** allows users to authenticate with an **external identity provider** (corporate AD via SAML, or social/OIDC providers) and receive temporary AWS credentials (via STS) - avoiding the need to create individual IAM users for every employee/customer.

## Summary Table
| Service | Who it's for | Key idea |
|---|---|---|
| STS | Any principal needing temporary creds | AssumeRole -> temporary credentials |
| Cognito User Pools | App customers | Sign-up/sign-in, JWT tokens |
| Cognito Identity Pools | App customers | Temporary AWS credentials for app users |
| Directory Service | Enterprises with AD | Bridge/host Microsoft AD on AWS |
| IAM Identity Center | Employees/workforce | SSO across AWS accounts + SaaS apps |
`,
    },
    flashcards: [
      {
        id: "s20-f01",
        sectionId: "s20",
        front: "What does AWS STS provide, and what is the typical validity range of its credentials?",
        back: "Temporary, limited-privilege security credentials (access key, secret key, session token), typically valid from 15 minutes to 36 hours.",
      },
      {
        id: "s20-f02",
        sectionId: "s20",
        front: "What is the AssumeRole action used for?",
        back: "Allows a user/service to assume an IAM Role and receive temporary credentials with that role's permissions - foundation of cross-account access and federation.",
      },
      {
        id: "s20-f03",
        sectionId: "s20",
        front: "What is Amazon Cognito generally used for?",
        back: "Authentication, authorization, and user management for the EXTERNAL customers of your web/mobile applications (not AWS Console access).",
      },
      {
        id: "s20-f04",
        sectionId: "s20",
        front: "What's the difference between Cognito User Pools and Identity Pools?",
        back: "User Pools = user directory for sign-up/sign-in, issuing JWT tokens (authentication). Identity Pools = provide temporary AWS credentials (via STS) to access AWS resources (authorization), typically after User Pool authentication.",
      },
      {
        id: "s20-f05",
        sectionId: "s20",
        front: "What does AD Connector do, and where are user accounts stored?",
        back: "It's a proxy/gateway that redirects directory requests to an existing on-premises Active Directory - no user accounts are stored in AWS.",
      },
      {
        id: "s20-f06",
        sectionId: "s20",
        front: "What is AWS Managed Microsoft AD?",
        back: "A real, managed Microsoft Active Directory running in AWS that can establish trust relationships with on-premises AD.",
      },
      {
        id: "s20-f07",
        sectionId: "s20",
        front: "What is AWS IAM Identity Center, and what is its primary use case?",
        back: "The successor to AWS SSO - provides centralized Single Sign-On for employees/workforce to access multiple AWS accounts (via Organizations) and third-party SaaS apps.",
      },
      {
        id: "s20-f08",
        sectionId: "s20",
        front: "In one sentence, how do you distinguish IAM Identity Center from Cognito?",
        back: "IAM Identity Center is for your internal WORKFORCE accessing AWS accounts/SaaS apps; Cognito is for your application's external CUSTOMERS.",
      },
    ],
    questions: [
      {
        id: "s20-q01",
        sectionId: "s20",
        domain: 2,
        question: "Which AWS service issues temporary security credentials, commonly used via the AssumeRole API for cross-account access?",
        options: ["AWS IAM Identity Center", "AWS STS (Security Token Service)", "Amazon Cognito Identity Pools", "AWS Directory Service"],
        correct: [1],
        explanation: "AWS STS issues temporary credentials, and AssumeRole is its core operation for cross-account and federated access.",
        difficulty: "easy",
      },
      {
        id: "s20-q02",
        sectionId: "s20",
        domain: 2,
        question: "A mobile app needs sign-up/sign-in functionality for its end users, including support for 'Sign in with Google.' Which service is designed for this?",
        options: ["AWS IAM Identity Center", "Amazon Cognito User Pools", "AWS Directory Service", "AWS Organizations"],
        correct: [1],
        explanation: "Cognito User Pools provide user directories with sign-up/sign-in and social identity provider federation for application users.",
        difficulty: "easy",
      },
      {
        id: "s20-q03",
        sectionId: "s20",
        domain: 2,
        question: "After a user authenticates via Cognito User Pools, the app needs to let them upload files directly to an S3 bucket using temporary AWS credentials. What should be used?",
        options: ["Cognito Identity Pools", "AWS Directory Service", "AWS Control Tower", "AWS Artifact"],
        correct: [0],
        explanation: "Cognito Identity Pools provide temporary AWS credentials (via STS) mapped to IAM roles, enabling authenticated users to access AWS services directly.",
        difficulty: "medium",
      },
      {
        id: "s20-q04",
        sectionId: "s20",
        domain: 2,
        question: "A company wants employees to use a single login to access multiple AWS accounts in their Organization plus Salesforce and Office 365. Which service is designed for this?",
        options: ["Amazon Cognito", "AWS IAM Identity Center", "AWS STS", "Amazon Macie"],
        correct: [1],
        explanation: "AWS IAM Identity Center (successor to AWS SSO) centralizes workforce access to AWS accounts and third-party SaaS applications.",
        difficulty: "easy",
      },
      {
        id: "s20-q05",
        sectionId: "s20",
        domain: 2,
        question: "A company wants to extend their existing on-premises Active Directory to AWS WITHOUT storing any user accounts in AWS. Which Directory Service option fits?",
        options: ["AWS Managed Microsoft AD", "Simple AD", "AD Connector", "Amazon Cognito"],
        correct: [2],
        explanation: "AD Connector acts as a proxy to the existing on-premises AD without replicating or storing user accounts in AWS.",
        difficulty: "medium",
      },
      {
        id: "s20-q06",
        sectionId: "s20",
        domain: 2,
        question: "Which statement correctly distinguishes Amazon Cognito from AWS IAM Identity Center?",
        options: [
          "Cognito is for AWS Console access; IAM Identity Center is for app customers",
          "Cognito is for your application's external customers; IAM Identity Center is for internal workforce SSO to AWS accounts/apps",
          "They are interchangeable and serve identical purposes",
          "IAM Identity Center can only be used by Enterprise Support customers",
        ],
        correct: [1],
        explanation: "Cognito targets app end-users (customers); IAM Identity Center targets employees needing SSO across AWS accounts and SaaS apps.",
        difficulty: "medium",
      },
      {
        id: "s20-q07",
        sectionId: "s20",
        domain: 2,
        question: "What is the typical maximum duration for AWS STS temporary credentials?",
        options: ["5 minutes", "Up to 36 hours", "30 days", "Indefinite, until manually revoked"],
        correct: [1],
        explanation: "STS temporary credentials are typically valid from 15 minutes up to a maximum of 36 hours, depending on configuration.",
        difficulty: "medium",
      },
      {
        id: "s20-q08",
        sectionId: "s20",
        domain: 2,
        question: "A company needs a lightweight, AD-compatible directory in AWS for a small number of users, without needing full Microsoft AD feature parity. Which option fits?",
        options: ["AWS Managed Microsoft AD", "Simple AD", "AD Connector", "Cognito User Pools"],
        correct: [1],
        explanation: "Simple AD is a basic, Samba-based AD-compatible directory suitable for smaller-scale needs without full Microsoft AD features.",
        difficulty: "medium",
      },
      {
        id: "s20-q09",
        sectionId: "s20",
        domain: 2,
        question: "Which token type does Cognito User Pools issue upon successful user authentication?",
        options: ["IAM access keys", "JWT tokens", "Kerberos tickets", "X.509 certificates"],
        correct: [1],
        explanation: "Cognito User Pools issue JSON Web Tokens (JWT) upon successful authentication, used to verify identity to backend services.",
        difficulty: "medium",
      },
      {
        id: "s20-q10",
        sectionId: "s20",
        domain: 2,
        question: "A corporate employee authenticates against the company's on-prem Active Directory via SAML and is granted temporary access to an AWS account without an individual IAM user being created. What underlying AWS mechanism enables this?",
        options: ["S3 bucket policies", "AWS STS federation (AssumeRoleWithSAML)", "Amazon GuardDuty", "AWS Config rules"],
        correct: [1],
        explanation: "SAML federation uses STS's AssumeRoleWithSAML to exchange a SAML assertion for temporary AWS credentials, avoiding the need for per-user IAM accounts.",
        difficulty: "hard",
      },
    ],
  },

  // ===========================================================
  // Section 21 - Migration, Disaster Recovery & Other Services
  // ===========================================================
  {
    section: {
      id: "s21",
      number: 21,
      title: "Migration, Disaster Recovery & Other Key Services",
      summary:
        "Moving data and workloads into AWS (Snow Family, DataSync, DMS, MGN), disaster recovery strategies, and other commonly tested services (Step Functions, AppFlow, AWS Backup).",
      domain: 3,
      estMinutes: 35,
      content: `
## The AWS Snow Family
For transferring **large amounts of data** to/from AWS where network transfer would be too slow or costly ("offline data transfer"):
- **AWS Snowcone**: small, portable (8TB usable) - for edge computing/data transfer in constrained environments.
- **AWS Snowball (Edge)**: petabyte-scale data transport device, also provides edge compute capabilities.
- **AWS Snowmobile**: an entire **shipping container on a truck** - exabyte-scale data transfer for massive migrations (data centers).

Rule of thumb: if it would take **more than ~1 week** to transfer data over your network connection, consider the Snow Family.

## AWS DataSync
- Automates and accelerates transferring data between **on-premises storage** (NFS/SMB) and AWS storage services (S3, EFS, FSx) - an **online** (network-based) alternative to Snow Family for ongoing or one-time transfers where the network is adequate.

## AWS Database Migration Service (DMS)
- Migrate databases to AWS (e.g., on-prem Oracle -> RDS PostgreSQL) **with minimal downtime** - the source database remains available during migration.
- Often paired with the **AWS Schema Conversion Tool (SCT)** when migrating between different database engines.

## AWS Application Migration Service (MGN)
- AWS's recommended "**lift-and-shift**" service - replicates entire servers (physical, virtual, or cloud) into AWS as EC2 instances with minimal changes.

## Disaster Recovery (DR) Strategies
Ordered from cheapest/slowest recovery to most expensive/fastest recovery:
1. **Backup and Restore**: simplest, cheapest - backups stored (e.g., in S3), restore takes time -> highest **RTO** (Recovery Time Objective).
2. **Pilot Light**: a minimal version of the environment is always running in AWS (e.g., just the database replicating) - scale up other resources when needed.
3. **Warm Standby**: a scaled-down, but fully functional, copy of the production environment always running - faster recovery, more cost.
4. **Multi-Site / Hot Standby (Active-Active)**: full production-scale environment running in another region at all times - lowest RTO/RPO, highest cost.

- **RTO (Recovery Time Objective)**: how long it takes to recover after a disaster.
- **RPO (Recovery Point Objective)**: how much data loss (in time) is acceptable.

## AWS Backup
- A centralized, managed service to **automate and consolidate backups** across AWS services (EBS, RDS, DynamoDB, EFS, etc.) with defined backup policies (schedules, retention, lifecycle to cold storage).

## AWS Step Functions
- A **serverless orchestration** service - define workflows (state machines) as a series of steps, coordinating multiple AWS services (Lambda, ECS, SNS, etc.) with built-in error handling, retries, and parallel execution. Visualized as a flow diagram.

## Amazon AppFlow
- A fully managed integration service to securely transfer data between AWS services and **SaaS applications** (e.g., Salesforce, ServiceNow, Slack, Zendesk) without writing custom integration code.

## Quick Decision Guide
| Scenario | Service |
|---|---|
| Migrate petabytes of data with poor network | Snow Family |
| Ongoing transfer between on-prem storage and AWS | DataSync |
| Migrate a database with minimal downtime | DMS (+ SCT if engine changes) |
| Lift-and-shift entire servers to EC2 | Application Migration Service (MGN) |
| Orchestrate multi-step serverless workflows | Step Functions |
| Integrate with SaaS apps (Salesforce, Slack) | AppFlow |
| Centralize backup policies across services | AWS Backup |
`,
    },
    flashcards: [
      {
        id: "s21-f01",
        sectionId: "s21",
        front: "What is the AWS Snow Family used for, and what's the rule of thumb for when to use it?",
        back: "Physical devices for transferring large amounts of data to/from AWS; consider it when network transfer would take more than ~1 week.",
      },
      {
        id: "s21-f02",
        sectionId: "s21",
        front: "Rank the Snow Family devices by scale: Snowcone, Snowball, Snowmobile.",
        back: "Snowcone (smallest, ~8TB, portable/edge) < Snowball Edge (petabyte-scale) < Snowmobile (exabyte-scale, shipping container on a truck).",
      },
      {
        id: "s21-f03",
        sectionId: "s21",
        front: "What is AWS DataSync, and how does it differ from the Snow Family?",
        back: "DataSync is an ONLINE (network-based) service for transferring data between on-prem storage (NFS/SMB) and AWS (S3/EFS/FSx); Snow Family is for OFFLINE/physical transport when network transfer is impractical.",
      },
      {
        id: "s21-f04",
        sectionId: "s21",
        front: "What does AWS DMS do, and what is it often paired with for heterogeneous migrations?",
        back: "Database Migration Service migrates databases to AWS with minimal downtime (source stays available); often paired with the AWS Schema Conversion Tool (SCT) when changing database engines.",
      },
      {
        id: "s21-f05",
        sectionId: "s21",
        front: "What is AWS Application Migration Service (MGN) used for?",
        back: "AWS's recommended 'lift-and-shift' service - replicates entire physical/virtual/cloud servers into AWS as EC2 instances with minimal changes.",
      },
      {
        id: "s21-f06",
        sectionId: "s21",
        front: "Order the four DR strategies from cheapest/slowest to most expensive/fastest.",
        back: "1) Backup and Restore, 2) Pilot Light, 3) Warm Standby, 4) Multi-Site/Hot Standby (Active-Active) - cost and recovery speed both increase down this list.",
      },
      {
        id: "s21-f07",
        sectionId: "s21",
        front: "Define RTO and RPO.",
        back: "RTO (Recovery Time Objective) = how long until the system is back up after a disaster. RPO (Recovery Point Objective) = how much data loss (in time) is acceptable.",
      },
      {
        id: "s21-f08",
        sectionId: "s21",
        front: "What do AWS Step Functions and Amazon AppFlow do, respectively?",
        back: "Step Functions: serverless orchestration of multi-step workflows across AWS services (state machines). AppFlow: managed data integration between AWS and SaaS apps (Salesforce, Slack, etc.) without custom code.",
      },
    ],
    questions: [
      {
        id: "s21-q01",
        sectionId: "s21",
        domain: 3,
        question: "A company needs to migrate 5 petabytes of on-premises data to AWS, and their internet connection would take over a month to transfer it. What is the BEST solution?",
        options: ["AWS DataSync", "AWS Snowball/Snowmobile", "AWS DMS", "Amazon AppFlow"],
        correct: [1],
        explanation: "For very large datasets where network transfer is impractical, the Snow Family (Snowball/Snowmobile) provides physical, offline data transport.",
        difficulty: "easy",
      },
      {
        id: "s21-q02",
        sectionId: "s21",
        domain: 3,
        question: "A company wants to continuously synchronize files between an on-premises NFS file share and Amazon S3 over their existing network connection. Which service fits best?",
        options: ["AWS Snowcone", "AWS DataSync", "AWS Application Migration Service", "AWS Step Functions"],
        correct: [1],
        explanation: "AWS DataSync is designed for ongoing, network-based data transfer/synchronization between on-prem storage and AWS storage services.",
        difficulty: "easy",
      },
      {
        id: "s21-q03",
        sectionId: "s21",
        domain: 3,
        question: "A company needs to migrate their on-premises Oracle database to Amazon RDS for PostgreSQL with minimal downtime, including converting the schema. Which AWS services should they use?",
        options: ["AWS DMS only", "AWS DMS + AWS Schema Conversion Tool (SCT)", "AWS Snowball only", "Amazon AppFlow"],
        correct: [1],
        explanation: "DMS handles the data migration with minimal downtime, while SCT converts the database schema between different engines (Oracle -> PostgreSQL).",
        difficulty: "medium",
      },
      {
        id: "s21-q04",
        sectionId: "s21",
        domain: 3,
        question: "Which disaster recovery strategy involves running a full-scale, production-ready duplicate environment in another region AT ALL TIMES, providing the lowest RTO/RPO?",
        options: ["Backup and Restore", "Pilot Light", "Warm Standby", "Multi-Site (Hot Standby / Active-Active)"],
        correct: [3],
        explanation: "Multi-Site/Hot Standby maintains a full production-scale environment running continuously in another region for near-instant failover.",
        difficulty: "medium",
      },
      {
        id: "s21-q05",
        sectionId: "s21",
        domain: 3,
        question: "What does RPO (Recovery Point Objective) measure?",
        options: [
          "How long it takes to restore service after an outage",
          "The maximum acceptable amount of data loss, measured in time",
          "The cost of a disaster recovery solution",
          "The number of AWS regions used",
        ],
        correct: [1],
        explanation: "RPO defines the maximum tolerable period in which data might be lost, measured back from the point of failure.",
        difficulty: "medium",
      },
      {
        id: "s21-q06",
        sectionId: "s21",
        domain: 3,
        question: "A company wants to 'lift and shift' hundreds of on-premises physical servers into AWS as EC2 instances with minimal reconfiguration. Which service is purpose-built for this?",
        options: ["AWS Application Migration Service (MGN)", "AWS DataSync", "AWS Step Functions", "Amazon AppFlow"],
        correct: [0],
        explanation: "AWS MGN (Application Migration Service) is AWS's recommended lift-and-shift tool for replicating servers into EC2.",
        difficulty: "medium",
      },
      {
        id: "s21-q07",
        sectionId: "s21",
        domain: 3,
        question: "Which AWS service allows you to visually design and orchestrate a multi-step workflow involving Lambda functions, with built-in retries and error handling?",
        options: ["Amazon EventBridge", "AWS Step Functions", "AWS CodePipeline", "Amazon SQS"],
        correct: [1],
        explanation: "AWS Step Functions provide serverless orchestration of workflows (state machines) with visual representation, retries, and error handling.",
        difficulty: "medium",
      },
      {
        id: "s21-q08",
        sectionId: "s21",
        domain: 3,
        question: "A marketing team wants to automatically sync customer records between Salesforce and an internal AWS data store without writing custom integration code. Which service should they use?",
        options: ["Amazon AppFlow", "AWS Snowcone", "AWS DMS", "AWS Backup"],
        correct: [0],
        explanation: "Amazon AppFlow provides managed, code-free integration between AWS services and SaaS applications like Salesforce.",
        difficulty: "medium",
      },
      {
        id: "s21-q09",
        sectionId: "s21",
        domain: 3,
        question: "A company wants to centrally define backup schedules and retention policies across their EBS volumes, RDS databases, and DynamoDB tables. Which service should they use?",
        options: ["AWS Backup", "AWS Snowcone", "AWS DataSync", "Amazon AppFlow"],
        correct: [0],
        explanation: "AWS Backup centralizes and automates backup policies across multiple AWS services from a single console.",
        difficulty: "easy",
      },
      {
        id: "s21-q10",
        sectionId: "s21",
        domain: 3,
        question: "In the 'Pilot Light' DR strategy, what is typically already running in the DR region before a disaster occurs?",
        options: [
          "A full-scale copy of the entire production environment",
          "Nothing at all - everything is created from backups during the disaster",
          "Only the most critical core elements (e.g., a replicated database), with other resources started on-demand",
          "Only DNS records, with no compute or data present",
        ],
        correct: [2],
        explanation: "Pilot Light keeps core/critical components (like a database) running/replicating, while other resources are provisioned only when needed during failover.",
        difficulty: "hard",
      },
    ],
  },
];

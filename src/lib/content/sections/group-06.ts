import type { SectionBundle } from "../types";

export const group06: SectionBundle[] = [
  // ===========================================================
  // Section 16 - Security & Compliance Services
  // ===========================================================
  {
    section: {
      id: "s16",
      number: 16,
      title: "Security & Compliance Services",
      summary:
        "Key management (KMS), secrets management, perimeter protection (WAF/Shield), threat detection (GuardDuty, Inspector, Macie), and compliance tooling (Config, Artifact, Security Hub).",
      domain: 2,
      estMinutes: 50,
      content: `
## AWS KMS (Key Management Service)
- A managed service to create and control **encryption keys** used to encrypt data across AWS services (S3, EBS, RDS, etc.).
- Keys never leave KMS unencrypted; KMS integrates with **IAM** for permission management and **CloudTrail** for auditing key usage.
- Key types: **AWS managed keys** (created/managed by AWS for you, free), **Customer managed keys** (you create and control the policy, small monthly fee), **AWS owned keys** (used internally, not visible to you).

## AWS Secrets Manager
- Securely store, retrieve, and **automatically rotate** secrets like database credentials, API keys, and tokens.
- Native integration with RDS for automatic credential rotation.
- Encrypted using KMS.

## SSM Parameter Store
- Part of **AWS Systems Manager** - securely store configuration data and secrets (strings, lists, secure strings encrypted via KMS) with versioning.
- Cheaper than Secrets Manager but **without automatic rotation** (though you can build it).

## AWS WAF (Web Application Firewall)
- Protects your web applications from common web exploits (SQL injection, cross-site scripting/XSS) at Layer 7.
- Deployed on **Application Load Balancer**, **API Gateway**, or **CloudFront**.
- Uses **Web ACLs** (Access Control Lists) with rules (IP sets, rate-based rules, managed rule groups).

## AWS Shield
- **AWS Shield Standard**: free, automatically enabled for ALL AWS customers, protects against common **DDoS attacks** (network/transport layer).
- **AWS Shield Advanced**: paid service, provides enhanced DDoS protection for EC2, ELB, CloudFront, Global Accelerator, and Route 53, 24/7 access to the AWS DDoS Response Team (DRT), and cost protection for scaling during an attack.

## Amazon GuardDuty
- An intelligent **threat detection** service that uses machine learning to continuously monitor for malicious activity (e.g., unusual API calls, compromised instances, crypto-mining) across CloudTrail logs, VPC Flow Logs, and DNS logs.
- No agents to install; enable with one click.

## Amazon Inspector
- Automated **security assessments** for EC2 instances, container images (in ECR), and Lambda functions - finds software vulnerabilities and unintended network exposure.

## Amazon Macie
- Uses machine learning to discover, classify, and protect **sensitive data** stored in S3 - notably **Personally Identifiable Information (PII)**.

## AWS Config
- Records and evaluates the **configuration** of your AWS resources over time - tracks configuration changes and compliance against rules (e.g., "all EBS volumes must be encrypted").
- Not for preventing actions, but for **auditing and alerting** on configuration drift/non-compliance.

## AWS Artifact
- A self-service portal for accessing AWS's **compliance reports** (e.g., SOC, PCI, ISO) and agreements (e.g., BAA for HIPAA, NDA).

## AWS Security Hub & Amazon Detective
- **Security Hub**: a central dashboard aggregating security findings from GuardDuty, Inspector, Macie, AWS Config, and third-party tools - provides an overall security/compliance score.
- **Amazon Detective**: analyzes, investigates, and quickly identifies the root cause of security findings (e.g., from GuardDuty), visualizing relationships between resources, users, and events.

## AWS Trusted Advisor
- Provides real-time guidance across 5 categories: **Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits** - based on AWS best practices.
- Full set of checks requires **Business or Enterprise Support plans**.

## Putting It Together - Defense in Depth
- **Identify**: AWS Config (drift), Inspector (vulnerabilities), Macie (sensitive data).
- **Protect**: KMS (encryption), WAF/Shield (perimeter), IAM (access).
- **Detect**: GuardDuty (threats), CloudTrail (audit logs).
- **Respond/Investigate**: Security Hub (aggregation), Detective (root cause analysis).
`,
    },
    flashcards: [
      {
        id: "s16-f01",
        sectionId: "s16",
        front: "What is AWS KMS used for?",
        back: "Creating and managing encryption keys used to encrypt data across AWS services like S3, EBS, and RDS, integrated with IAM and CloudTrail.",
      },
      {
        id: "s16-f02",
        sectionId: "s16",
        front: "What is the key advantage of AWS Secrets Manager over SSM Parameter Store?",
        back: "Secrets Manager supports automatic rotation of secrets (e.g., RDS credentials); Parameter Store is cheaper but lacks built-in automatic rotation.",
      },
      {
        id: "s16-f03",
        sectionId: "s16",
        front: "What does AWS WAF protect against, and where can it be deployed?",
        back: "Common Layer 7 web exploits (SQL injection, XSS); deployed on Application Load Balancer, API Gateway, or CloudFront using Web ACLs.",
      },
      {
        id: "s16-f04",
        sectionId: "s16",
        front: "What's the difference between AWS Shield Standard and Shield Advanced?",
        back: "Shield Standard: free, automatic, basic DDoS protection for everyone. Shield Advanced: paid, enhanced DDoS protection, 24/7 DRT access, and cost protection for scaling during attacks.",
      },
      {
        id: "s16-f05",
        sectionId: "s16",
        front: "What does Amazon GuardDuty do?",
        back: "Uses ML to continuously analyze CloudTrail, VPC Flow Logs, and DNS logs to detect malicious/unauthorized activity - no agents required.",
      },
      {
        id: "s16-f06",
        sectionId: "s16",
        front: "What does Amazon Macie specialize in detecting?",
        back: "Sensitive data (especially PII - Personally Identifiable Information) stored in S3, using machine learning.",
      },
      {
        id: "s16-f07",
        sectionId: "s16",
        front: "What is the role of AWS Config?",
        back: "Tracks and records configuration changes of AWS resources over time and evaluates them against compliance rules - for auditing, not prevention.",
      },
      {
        id: "s16-f08",
        sectionId: "s16",
        front: "What does AWS Security Hub provide, and what does Amazon Detective add?",
        back: "Security Hub aggregates findings from GuardDuty, Inspector, Macie, Config, etc. into one dashboard with a compliance score. Detective helps investigate and find the root cause of those findings.",
      },
    ],
    questions: [
      {
        id: "s16-q01",
        sectionId: "s16",
        domain: 2,
        question: "Which AWS service should be used to automatically rotate database credentials stored for an RDS database?",
        options: ["SSM Parameter Store", "AWS Secrets Manager", "AWS KMS", "AWS Config"],
        correct: [1],
        explanation: "AWS Secrets Manager natively supports automatic rotation of secrets, including RDS database credentials.",
        difficulty: "easy",
      },
      {
        id: "s16-q02",
        sectionId: "s16",
        domain: 2,
        question: "A company wants to block SQL injection attempts at the application layer for their CloudFront-distributed website. Which service should they use?",
        options: ["AWS Shield Standard", "AWS WAF", "Amazon GuardDuty", "Amazon Inspector"],
        correct: [1],
        explanation: "AWS WAF operates at Layer 7 and protects against common web exploits like SQL injection and XSS using Web ACL rules.",
        difficulty: "easy",
      },
      {
        id: "s16-q03",
        sectionId: "s16",
        domain: 2,
        question: "Which AWS service is automatically enabled, at no extra cost, for every AWS account to provide basic DDoS protection?",
        options: ["AWS Shield Advanced", "AWS Shield Standard", "AWS WAF", "Amazon GuardDuty"],
        correct: [1],
        explanation: "AWS Shield Standard is automatically enabled for free for all AWS customers and protects against common network/transport layer DDoS attacks.",
        difficulty: "easy",
      },
      {
        id: "s16-q04",
        sectionId: "s16",
        domain: 2,
        question: "A security team wants continuous, ML-based detection of suspicious API activity and potentially compromised EC2 instances without deploying any agents. Which service fits?",
        options: ["Amazon Macie", "Amazon GuardDuty", "AWS Config", "AWS Artifact"],
        correct: [1],
        explanation: "Amazon GuardDuty is an agent-less, ML-based threat detection service analyzing CloudTrail, VPC Flow Logs, and DNS logs.",
        difficulty: "easy",
      },
      {
        id: "s16-q05",
        sectionId: "s16",
        domain: 2,
        question: "A company stores customer data in S3 and needs to identify which objects contain personally identifiable information (PII). Which service should they use?",
        options: ["Amazon Macie", "Amazon Inspector", "AWS Config", "AWS Shield"],
        correct: [0],
        explanation: "Amazon Macie uses machine learning to discover and classify sensitive data, including PII, in S3.",
        difficulty: "easy",
      },
      {
        id: "s16-q06",
        sectionId: "s16",
        domain: 2,
        question: "Which service continuously assesses EC2 instances and container images for software vulnerabilities and network exposure?",
        options: ["Amazon Inspector", "Amazon Macie", "AWS Artifact", "AWS Trusted Advisor"],
        correct: [0],
        explanation: "Amazon Inspector performs automated vulnerability assessments for EC2, ECR container images, and Lambda functions.",
        difficulty: "medium",
      },
      {
        id: "s16-q07",
        sectionId: "s16",
        domain: 2,
        question: "Where would a company go to download AWS's official SOC 2 compliance report for an internal audit?",
        options: ["AWS Trusted Advisor", "AWS Artifact", "AWS Config", "Amazon Detective"],
        correct: [1],
        explanation: "AWS Artifact is the self-service portal for downloading AWS compliance reports (SOC, PCI, ISO, etc.) and agreements.",
        difficulty: "medium",
      },
      {
        id: "s16-q08",
        sectionId: "s16",
        domain: 2,
        question: "Which service tracks configuration changes to AWS resources over time and can flag resources as non-compliant with a defined rule (e.g., 'EBS volumes must be encrypted')?",
        options: ["AWS Config", "AWS CloudTrail", "Amazon GuardDuty", "AWS Shield"],
        correct: [0],
        explanation: "AWS Config records resource configuration history and evaluates compliance against defined rules.",
        difficulty: "medium",
      },
      {
        id: "s16-q09",
        sectionId: "s16",
        domain: 2,
        question: "After GuardDuty raises a finding about a potentially compromised EC2 instance, which service helps visualize related events and resources to determine the root cause?",
        options: ["Amazon Detective", "AWS Artifact", "AWS WAF", "SSM Parameter Store"],
        correct: [0],
        explanation: "Amazon Detective helps investigate and visualize the relationships behind security findings to determine root cause.",
        difficulty: "medium",
      },
      {
        id: "s16-q10",
        sectionId: "s16",
        domain: 2,
        question: "Which AWS Trusted Advisor category would flag an S3 bucket with public read access as a potential risk?",
        options: ["Cost Optimization", "Performance", "Security", "Service Limits"],
        correct: [2],
        explanation: "Trusted Advisor's Security category includes checks like open S3 buckets, exposed access keys, and security group configurations.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 17 - Machine Learning & AI Services
  // ===========================================================
  {
    section: {
      id: "s17",
      number: 17,
      title: "Machine Learning & AI Services",
      summary:
        "AWS's portfolio of pre-trained AI services for vision, language, and conversation, plus SageMaker for custom ML and Amazon Bedrock for generative AI.",
      domain: 3,
      estMinutes: 35,
      content: `
## AWS AI/ML Service Philosophy
AWS provides a layered stack: at the top, **ready-to-use AI services** (no ML expertise needed) for common tasks; in the middle, **Amazon SageMaker** for building/training/deploying custom ML models; and at the base, raw **compute/ML frameworks**. The CCP exam focuses on knowing **what each ready-made service does**, not how to build models.

## Vision
- **Amazon Rekognition**: image and video analysis - object/scene detection, facial analysis/comparison, content moderation (e.g., flagging inappropriate images).
- **Amazon Textract**: extracts text, handwriting, and data (e.g., tables, forms) from scanned documents - "OCR on steroids."

## Language & Speech
- **Amazon Transcribe**: converts **speech to text** (e.g., generating subtitles, transcribing call center recordings).
- **Amazon Polly**: converts **text to speech (TTS)** - turns articles into spoken audio.
- **Amazon Translate**: natural and accurate **language translation**.
- **Amazon Comprehend**: **Natural Language Processing (NLP)** - extracts insights from text such as sentiment, entities, key phrases, and language.
- **Amazon Lex**: build conversational interfaces (**chatbots**) - the same technology that powers Alexa, supports voice and text.

## Search, Forecasting & Recommendations
- **Amazon Kendra**: an intelligent **enterprise search** service powered by ML, allowing natural-language search across internal documents/data sources.
- **Amazon Personalize**: builds **real-time personalized recommendations** (similar to Amazon.com's recommendation engine), e.g., "customers also bought."
- **Amazon Forecast**: uses ML to deliver highly accurate **time-series forecasts** (e.g., inventory demand, resource needs, financial projections).

## Amazon SageMaker
- A fully managed service that lets data scientists and developers **build, train, and deploy** their own machine learning models at scale, covering the full ML lifecycle (data labeling, notebooks, training, tuning, hosting, monitoring).

## Generative AI on AWS
- **Amazon Bedrock**: a fully managed, **serverless** service providing access to foundation models (FMs) from AWS and third parties (e.g., Anthropic's Claude, Meta's Llama, Amazon's Titan/Nova) via a single API - used to build generative AI applications (chatbots, content generation, summarization) without managing infrastructure.
- **Amazon Q**: a generative-AI-powered assistant - **Amazon Q Business** (enterprise data Q&A/assistant) and **Amazon Q Developer** (AI coding companion, formerly CodeWhisperer).

## Quick-Reference Table
| Service | What it does |
|---|---|
| Rekognition | Image/video analysis |
| Textract | Extract text/data from documents |
| Transcribe | Speech -> text |
| Polly | Text -> speech |
| Translate | Language translation |
| Comprehend | NLP - sentiment, entities, key phrases |
| Lex | Build chatbots/voice bots |
| Kendra | Enterprise intelligent search |
| Personalize | Real-time recommendations |
| Forecast | Time-series forecasting |
| SageMaker | Build/train/deploy custom ML models |
| Bedrock | Access foundation models for generative AI |
`,
    },
    flashcards: [
      {
        id: "s17-f01",
        sectionId: "s17",
        front: "What does Amazon Rekognition do?",
        back: "Analyzes images and videos for object/scene detection, facial analysis/comparison, and content moderation.",
      },
      {
        id: "s17-f02",
        sectionId: "s17",
        front: "What does Amazon Textract do, and how is it different from simple OCR?",
        back: "Extracts text, handwriting, and structured data (tables, forms) from scanned documents - more advanced than basic OCR because it understands document structure.",
      },
      {
        id: "s17-f03",
        sectionId: "s17",
        front: "Differentiate Amazon Transcribe and Amazon Polly.",
        back: "Transcribe converts speech to text; Polly converts text to speech (the reverse direction).",
      },
      {
        id: "s17-f04",
        sectionId: "s17",
        front: "What does Amazon Comprehend provide?",
        back: "Natural Language Processing (NLP) - extracts sentiment, entities, key phrases, and detects language from text.",
      },
      {
        id: "s17-f05",
        sectionId: "s17",
        front: "What is Amazon Lex used for?",
        back: "Building conversational chatbots/voice interfaces using the same technology behind Amazon Alexa.",
      },
      {
        id: "s17-f06",
        sectionId: "s17",
        front: "What's the difference between Amazon Forecast and Amazon Personalize?",
        back: "Forecast produces time-series predictions (e.g., demand forecasting). Personalize generates individualized, real-time product/content recommendations.",
      },
      {
        id: "s17-f07",
        sectionId: "s17",
        front: "What is Amazon SageMaker for?",
        back: "A fully managed service covering the end-to-end machine learning lifecycle - building, training, tuning, and deploying custom ML models.",
      },
      {
        id: "s17-f08",
        sectionId: "s17",
        front: "What is Amazon Bedrock?",
        back: "A serverless service providing API access to foundation models (e.g., Claude, Llama, Titan) from multiple providers, for building generative AI applications without managing infrastructure.",
      },
    ],
    questions: [
      {
        id: "s17-q01",
        sectionId: "s17",
        domain: 3,
        question: "A company wants to automatically flag user-uploaded images that contain inappropriate content. Which service should they use?",
        options: ["Amazon Polly", "Amazon Rekognition", "Amazon Lex", "Amazon Forecast"],
        correct: [1],
        explanation: "Amazon Rekognition provides image/video analysis including content moderation to detect inappropriate content.",
        difficulty: "easy",
      },
      {
        id: "s17-q02",
        sectionId: "s17",
        domain: 3,
        question: "A company wants to automatically generate subtitles for their video library by converting spoken audio to text. Which service is best?",
        options: ["Amazon Translate", "Amazon Transcribe", "Amazon Polly", "Amazon Comprehend"],
        correct: [1],
        explanation: "Amazon Transcribe converts speech to text, making it suitable for subtitle generation.",
        difficulty: "easy",
      },
      {
        id: "s17-q03",
        sectionId: "s17",
        domain: 3,
        question: "Which service would extract structured data such as line items and totals from scanned invoices?",
        options: ["Amazon Rekognition", "Amazon Textract", "Amazon Kendra", "Amazon Lex"],
        correct: [1],
        explanation: "Amazon Textract extracts text and structured data (tables, key-value pairs) from scanned documents like invoices.",
        difficulty: "easy",
      },
      {
        id: "s17-q04",
        sectionId: "s17",
        domain: 3,
        question: "A company wants to analyze thousands of customer reviews to determine overall sentiment (positive/negative/neutral) and extract common topics. Which service fits best?",
        options: ["Amazon Comprehend", "Amazon Polly", "Amazon Rekognition", "Amazon Forecast"],
        correct: [0],
        explanation: "Amazon Comprehend uses NLP to extract sentiment, key phrases, and entities from text data.",
        difficulty: "easy",
      },
      {
        id: "s17-q05",
        sectionId: "s17",
        domain: 3,
        question: "Which AWS service would a data science team use to build, train, and deploy a custom machine learning model from their own data?",
        options: ["Amazon SageMaker", "Amazon Bedrock", "Amazon Kendra", "Amazon Q Developer"],
        correct: [0],
        explanation: "Amazon SageMaker is the managed platform for the full custom ML lifecycle: build, train, tune, and deploy.",
        difficulty: "easy",
      },
      {
        id: "s17-q06",
        sectionId: "s17",
        domain: 3,
        question: "A company wants to build a generative AI chatbot using a foundation model like Anthropic's Claude, without managing any servers. Which AWS service provides this?",
        options: ["Amazon Bedrock", "Amazon Lex", "Amazon SageMaker Ground Truth", "AWS Glue"],
        correct: [0],
        explanation: "Amazon Bedrock provides serverless API access to foundation models, including Anthropic's Claude, for generative AI applications.",
        difficulty: "medium",
      },
      {
        id: "s17-q07",
        sectionId: "s17",
        domain: 3,
        question: "Which service is designed to provide intelligent, natural-language enterprise search across an organization's internal documents and data repositories?",
        options: ["Amazon Kendra", "Amazon Personalize", "Amazon Forecast", "Amazon Comprehend"],
        correct: [0],
        explanation: "Amazon Kendra is an ML-powered enterprise search service for natural-language queries across internal data sources.",
        difficulty: "medium",
      },
      {
        id: "s17-q08",
        sectionId: "s17",
        domain: 3,
        question: "An e-commerce company wants to show 'customers who bought this also bought...' recommendations in real time. Which service is purpose-built for this?",
        options: ["Amazon Personalize", "Amazon Forecast", "Amazon Textract", "Amazon Translate"],
        correct: [0],
        explanation: "Amazon Personalize is designed to build real-time, individualized recommendation systems.",
        difficulty: "medium",
      },
      {
        id: "s17-q09",
        sectionId: "s17",
        domain: 3,
        question: "Which service converts written text into natural-sounding spoken audio?",
        options: ["Amazon Polly", "Amazon Transcribe", "Amazon Lex", "Amazon Comprehend"],
        correct: [0],
        explanation: "Amazon Polly performs text-to-speech (TTS) conversion.",
        difficulty: "easy",
      },
      {
        id: "s17-q10",
        sectionId: "s17",
        domain: 3,
        question: "A retailer wants to forecast next quarter's inventory demand across thousands of SKUs using historical sales data. Which AWS service is purpose-built for this?",
        options: ["Amazon Forecast", "Amazon Personalize", "Amazon Kendra", "Amazon Rekognition"],
        correct: [0],
        explanation: "Amazon Forecast uses machine learning to generate accurate time-series forecasts, such as inventory demand.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 18 - Account Management: Organizations, Control Tower, SCPs
  // ===========================================================
  {
    section: {
      id: "s18",
      number: 18,
      title: "Account Management: Organizations, Control Tower & SCPs",
      summary:
        "Managing multiple AWS accounts at scale with AWS Organizations, consolidated billing, Service Control Policies, and AWS Control Tower.",
      domain: 1,
      estMinutes: 35,
      content: `
## Why Multiple AWS Accounts?
As companies grow, best practice is to use **multiple AWS accounts** (e.g., per environment - dev/staging/prod, or per team/project) rather than one account for everything. Benefits: resource/security isolation, separate billing per project, reduced "blast radius" if one account is compromised, and easier resource quotas.

## AWS Organizations
- A service to **centrally manage and govern multiple AWS accounts**.
- The account that creates the Organization becomes the **Management Account** (formerly "master account") - it cannot be changed; other accounts are **Member Accounts**.
- **Organizational Units (OUs)**: group accounts into a hierarchy (e.g., "Production OU," "Sandbox OU") to apply policies collectively.

### Consolidated Billing
- All member accounts' usage is combined for **volume pricing discounts** and **Reserved Instance/Savings Plans sharing** across the organization - one bill for the whole organization.

### Service Control Policies (SCPs)
- **SCPs** are JSON policies applied to the Organization, an OU, or an individual account that define the **maximum permissions** for accounts within them - they do NOT grant permissions themselves, only restrict (a "permission boundary" at the org level).
- SCPs apply to all users/roles in an account, **including the root user** of member accounts (but do NOT apply to the Management Account).
- Example: an SCP could deny the use of any region except us-east-1 and eu-west-1 across all accounts in a "Production" OU.

## AWS Control Tower
- Builds on top of Organizations to provide an easy way to **set up and govern a new, secure, multi-account AWS environment** based on best-practices blueprints.
- Provides a **Landing Zone** (the overall multi-account environment), pre-packaged **Guardrails** (governance rules - preventive via SCPs or detective via AWS Config) and an **Account Factory** for standardized account provisioning.

## AWS Resource Access Manager (RAM)
- Allows you to **share AWS resources** (e.g., subnets, Transit Gateways, License Manager configurations) that you own with other AWS accounts, including within an Organization - avoids resource duplication.

## AWS Compute Optimizer
- Uses ML to analyze resource configuration/utilization (EC2, EBS, Lambda, etc.) and **recommends optimal resource sizing** to reduce costs or improve performance.

## Tagging Strategy
- **Tags** are key-value pairs attached to AWS resources (e.g., \`Environment: Production\`, \`CostCenter: 1234\`, \`Project: AwsPrep\`).
- Used for: cost allocation/reporting, automation (e.g., target resources by tag), access control (IAM policies based on tags), and organization.
- A consistent tagging strategy across an Organization makes governance, cost tracking, and automation far easier at scale.

## Putting It Together
**AWS Organizations** is the foundation (accounts + OUs + consolidated billing + SCPs). **Control Tower** automates setting up Organizations following best practices (Landing Zone + Guardrails). **RAM** lets you share resources across those accounts. **Compute Optimizer** and **tagging** then help manage cost and operations across the whole multi-account estate.
`,
    },
    flashcards: [
      {
        id: "s18-f01",
        sectionId: "s18",
        front: "What is the AWS Organizations 'Management Account', and can it be changed?",
        back: "The account that created the Organization - it has special privileges and CANNOT be changed to a different account later.",
      },
      {
        id: "s18-f02",
        sectionId: "s18",
        front: "What is an Organizational Unit (OU)?",
        back: "A group of AWS accounts within an Organization, arranged hierarchically, used to apply policies (like SCPs) collectively to all accounts in the group.",
      },
      {
        id: "s18-f03",
        sectionId: "s18",
        front: "What does Consolidated Billing in AWS Organizations provide?",
        back: "A single bill across all member accounts, combined usage for volume discounts, and shared Reserved Instance/Savings Plans benefits.",
      },
      {
        id: "s18-f04",
        sectionId: "s18",
        front: "What is a Service Control Policy (SCP), and what does it NOT do?",
        back: "An SCP is a JSON policy defining the maximum allowed permissions for accounts/OUs in an Organization. It does NOT grant permissions by itself - it only restricts.",
      },
      {
        id: "s18-f05",
        sectionId: "s18",
        front: "Do SCPs apply to the Management Account?",
        back: "No - SCPs apply to all member accounts (including their root users) but do NOT apply to the Management Account.",
      },
      {
        id: "s18-f06",
        sectionId: "s18",
        front: "What does AWS Control Tower provide?",
        back: "An automated way to set up and govern a secure multi-account AWS environment (a 'Landing Zone') with pre-built Guardrails and an Account Factory, built on top of Organizations.",
      },
      {
        id: "s18-f07",
        sectionId: "s18",
        front: "What is AWS Resource Access Manager (RAM) used for?",
        back: "Sharing AWS resources you own (e.g., subnets, Transit Gateways) with other accounts/OUs in your Organization, avoiding duplication.",
      },
      {
        id: "s18-f08",
        sectionId: "s18",
        front: "What does AWS Compute Optimizer do?",
        back: "Uses ML to analyze utilization of resources (EC2, EBS, Lambda, etc.) and recommend optimal sizing for cost/performance.",
      },
    ],
    questions: [
      {
        id: "s18-q01",
        sectionId: "s18",
        domain: 1,
        question: "Which AWS service allows a company to centrally manage multiple AWS accounts and consolidate billing?",
        options: ["AWS Control Tower", "AWS Organizations", "AWS Resource Access Manager", "AWS Compute Optimizer"],
        correct: [1],
        explanation: "AWS Organizations is the core service for centrally managing multiple accounts, including consolidated billing and SCPs.",
        difficulty: "easy",
      },
      {
        id: "s18-q02",
        sectionId: "s18",
        domain: 1,
        question: "What is the primary function of a Service Control Policy (SCP)?",
        options: [
          "To grant additional IAM permissions to users",
          "To define the maximum permissions allowed for accounts within an OU or Organization",
          "To configure billing alerts",
          "To replace IAM policies entirely",
        ],
        correct: [1],
        explanation: "SCPs set permission GUARDRAILS (maximum allowable permissions) for accounts - they restrict, not grant.",
        difficulty: "medium",
      },
      {
        id: "s18-q03",
        sectionId: "s18",
        domain: 1,
        question: "An SCP is applied to an OU that denies access to all regions except us-east-1. Which accounts are affected?",
        options: [
          "Only IAM users, not the root user, in member accounts",
          "All accounts in that OU, including their root users, but NOT the Organization's Management Account",
          "Only the Management Account",
          "No accounts - SCPs are advisory only",
        ],
        correct: [1],
        explanation: "SCPs apply to all principals (including root) in member accounts within the affected OU, but never apply to the Management Account.",
        difficulty: "hard",
      },
      {
        id: "s18-q04",
        sectionId: "s18",
        domain: 1,
        question: "A company wants to quickly set up a new multi-account AWS environment following AWS best practices, including pre-built governance guardrails. What should they use?",
        options: ["AWS Config alone", "AWS Control Tower", "Amazon Compute Optimizer", "AWS Trusted Advisor"],
        correct: [1],
        explanation: "AWS Control Tower automates setting up a secure, well-governed multi-account environment (Landing Zone) with Guardrails.",
        difficulty: "easy",
      },
      {
        id: "s18-q05",
        sectionId: "s18",
        domain: 1,
        question: "Which benefit does Consolidated Billing provide to an AWS Organization with multiple member accounts?",
        options: [
          "Each account is billed completely separately with no shared benefits",
          "Combined usage across accounts can unlock volume discounts and share Reserved Instance/Savings Plans benefits",
          "It automatically encrypts all data across accounts",
          "It removes the need for IAM in member accounts",
        ],
        correct: [1],
        explanation: "Consolidated billing aggregates usage across accounts for volume discounts and allows sharing of RI/Savings Plans benefits.",
        difficulty: "medium",
      },
      {
        id: "s18-q06",
        sectionId: "s18",
        domain: 1,
        question: "A company wants to share a Transit Gateway they created in one account with several other accounts in their Organization, without duplicating it. What should they use?",
        options: ["AWS Resource Access Manager (RAM)", "AWS Control Tower", "Amazon Compute Optimizer", "AWS Artifact"],
        correct: [0],
        explanation: "AWS RAM enables sharing of AWS resources like Transit Gateways across accounts within an Organization.",
        difficulty: "medium",
      },
      {
        id: "s18-q07",
        sectionId: "s18",
        domain: 1,
        question: "Which AWS service would recommend downsizing an over-provisioned EC2 instance based on actual utilization metrics?",
        options: ["AWS Compute Optimizer", "AWS Organizations", "AWS Control Tower", "AWS Resource Access Manager"],
        correct: [0],
        explanation: "AWS Compute Optimizer uses ML on utilization data to recommend right-sized resource configurations.",
        difficulty: "medium",
      },
      {
        id: "s18-q08",
        sectionId: "s18",
        domain: 1,
        question: "Why might a company use Organizational Units (OUs) within AWS Organizations?",
        options: [
          "To create separate AWS regions",
          "To group accounts hierarchically so policies (like SCPs) can be applied collectively",
          "To replace the need for IAM roles",
          "To enable multi-factor authentication",
        ],
        correct: [1],
        explanation: "OUs let you organize accounts into a hierarchy and apply policies such as SCPs to entire groups of accounts at once.",
        difficulty: "easy",
      },
      {
        id: "s18-q09",
        sectionId: "s18",
        domain: 1,
        question: "What is one common reason companies use MULTIPLE AWS accounts instead of a single account?",
        options: [
          "AWS requires a new account for every EC2 instance",
          "To isolate resources/security boundaries and reduce blast radius between environments or teams",
          "Multiple accounts are required for S3 to work",
          "It is the only way to use CloudFormation",
        ],
        correct: [1],
        explanation: "Multiple accounts provide strong isolation boundaries (security, billing, blast radius) between environments, teams, or projects.",
        difficulty: "easy",
      },
      {
        id: "s18-q10",
        sectionId: "s18",
        domain: 1,
        question: "A consistent resource tagging strategy (e.g., Environment, CostCenter, Project) primarily helps with which of the following?",
        options: [
          "Encrypting data at rest automatically",
          "Cost allocation/reporting, automation, and access control based on tags",
          "Replacing the need for VPCs",
          "Increasing EC2 instance performance",
        ],
        correct: [1],
        explanation: "Tags enable cost allocation reports, automation targeting, and tag-based IAM access control across an organization's resources.",
        difficulty: "medium",
      },
    ],
  },
];

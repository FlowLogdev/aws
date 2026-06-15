import type { SectionBundle } from "../types";

export const group08: SectionBundle[] = [
  // ===========================================================
  // Section 22 - Well-Architected Framework & Cloud Adoption Framework
  // ===========================================================
  {
    section: {
      id: "s22",
      number: 22,
      title: "AWS Well-Architected Framework & Cloud Adoption Framework",
      summary:
        "The 6 pillars of the Well-Architected Framework and the 6 perspectives of the AWS Cloud Adoption Framework (CAF).",
      domain: 1,
      estMinutes: 30,
      content: `
## AWS Well-Architected Framework
A set of **guiding principles and best practices** to help architects build secure, high-performing, resilient, and efficient infrastructure. Organized into **6 pillars**:

### 1. Operational Excellence
Running and monitoring systems to deliver business value, and continually improving processes/procedures. Includes: performing operations as code (automation), making frequent small reversible changes, anticipating failure, and learning from operational events.

### 2. Security
Protecting information, systems, and assets through risk assessments and mitigation strategies. Includes: implementing a strong identity foundation (least privilege), enabling traceability (logging/monitoring), applying security at all layers, automating security best practices, protecting data in transit and at rest, and preparing for security events (incident response).

### 3. Reliability
The ability of a system to recover from failures, dynamically acquire resources to meet demand, and mitigate disruptions. Includes: automatically recovering from failure, testing recovery procedures, scaling horizontally, and stopping guessing capacity.

### 4. Performance Efficiency
Using IT and computing resources efficiently to meet requirements, and maintaining efficiency as demand and technology evolve. Includes: democratizing advanced technologies (use managed services), going global in minutes, using serverless architectures, and experimenting more often.

### 5. Cost Optimization
Avoiding unnecessary costs - understanding spending over time, controlling fund allocation, selecting the right resource types/sizes, and scaling to meet business needs without overspending. Includes: adopting a consumption model (pay only for what you use), measuring overall efficiency, and analyzing/attributing expenditure.

### 6. Sustainability (added later as the 6th pillar)
Minimizing the environmental impact of running cloud workloads - understanding impact, maximizing utilization, adopting newer/more efficient hardware and software, and reducing downstream impact (e.g., reducing the resources customers need to use your product).

### AWS Well-Architected Tool
A **free** tool in the AWS console that lets you review your workloads against the 6 pillars (via a questionnaire) and provides recommendations for improvement.

## AWS Cloud Adoption Framework (CAF)
Helps organizations **develop an efficient and effective plan** for their cloud adoption journey, organized into **6 perspectives** (grouped into Business and Technical capabilities):

### Business Capabilities
- **Business**: ensure business strategy/goals align with IT strategy - business value, financial management.
- **People**: people development, training, organizational change management for cloud adoption (HR).
- **Governance**: ensure skills and processes align business objectives with IT to maximize value and minimize risks - licensing, budgeting.

### Technical Capabilities
- **Platform**: build a scalable, hybrid cloud architecture - e.g., describing server/database architectures.
- **Security**: ensure the organization meets its security objectives for visibility, auditing, control, and agility.
- **Operations**: ensure business applications and workloads run smoothly - health/availability/performance of workloads.

## Why This Matters for CCP
The exam may test your ability to recognize **which pillar/perspective** a given scenario relates to (e.g., "a company wants to reduce its carbon footprint" -> Sustainability pillar; "a company wants HR to retrain staff for cloud skills" -> CAF People perspective).
`,
    },
    flashcards: [
      {
        id: "s22-f01",
        sectionId: "s22",
        front: "Name the 6 pillars of the AWS Well-Architected Framework.",
        back: "Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
      },
      {
        id: "s22-f02",
        sectionId: "s22",
        front: "Which Well-Architected pillar focuses on automation, small reversible changes, and learning from operational failures?",
        back: "Operational Excellence.",
      },
      {
        id: "s22-f03",
        sectionId: "s22",
        front: "Which Well-Architected pillar emphasizes 'using a consumption model' and 'analyzing and attributing expenditure'?",
        back: "Cost Optimization.",
      },
      {
        id: "s22-f04",
        sectionId: "s22",
        front: "Which Well-Architected pillar was added most recently, focused on environmental impact?",
        back: "Sustainability - the 6th pillar, added to address minimizing the environmental footprint of cloud workloads.",
      },
      {
        id: "s22-f05",
        sectionId: "s22",
        front: "What is the AWS Well-Architected Tool?",
        back: "A free console tool that reviews your workloads against the 6 pillars via a questionnaire and provides improvement recommendations.",
      },
      {
        id: "s22-f06",
        sectionId: "s22",
        front: "Name the 6 perspectives of the AWS Cloud Adoption Framework (CAF), grouped by category.",
        back: "Business capabilities: Business, People, Governance. Technical capabilities: Platform, Security, Operations.",
      },
      {
        id: "s22-f07",
        sectionId: "s22",
        front: "Which CAF perspective deals with training staff and organizational change management for cloud adoption?",
        back: "The People perspective.",
      },
      {
        id: "s22-f08",
        sectionId: "s22",
        front: "Which CAF perspective focuses on the health, availability, and performance of workloads in production?",
        back: "The Operations perspective.",
      },
    ],
    questions: [
      {
        id: "s22-q01",
        sectionId: "s22",
        domain: 1,
        question: "Which AWS Well-Architected Framework pillar focuses on the ability of a system to recover from failures and dynamically meet demand?",
        options: ["Operational Excellence", "Reliability", "Performance Efficiency", "Cost Optimization"],
        correct: [1],
        explanation: "The Reliability pillar covers recovering from failures, scaling to meet demand, and mitigating disruptions.",
        difficulty: "easy",
      },
      {
        id: "s22-q02",
        sectionId: "s22",
        domain: 1,
        question: "A company wants a free, structured way to review their workload against AWS best practices across all 6 pillars. What should they use?",
        options: ["AWS Trusted Advisor only", "The AWS Well-Architected Tool", "AWS Config", "AWS Cost Explorer"],
        correct: [1],
        explanation: "The AWS Well-Architected Tool provides a free, structured questionnaire-based review against the 6 pillars with tailored recommendations.",
        difficulty: "easy",
      },
      {
        id: "s22-q03",
        sectionId: "s22",
        domain: 1,
        question: "Which Well-Architected pillar would be MOST relevant to a company aiming to reduce the carbon footprint of its cloud workloads?",
        options: ["Security", "Sustainability", "Reliability", "Operational Excellence"],
        correct: [1],
        explanation: "Sustainability is the pillar focused on minimizing environmental impact, including energy efficiency and resource utilization.",
        difficulty: "easy",
      },
      {
        id: "s22-q04",
        sectionId: "s22",
        domain: 1,
        question: "Which AWS Cloud Adoption Framework (CAF) perspective is concerned with training employees and managing organizational change during cloud adoption?",
        options: ["Governance", "People", "Platform", "Operations"],
        correct: [1],
        explanation: "The People perspective addresses staff training, organizational structures, and change management for cloud adoption.",
        difficulty: "medium",
      },
      {
        id: "s22-q05",
        sectionId: "s22",
        domain: 1,
        question: "Which CAF perspective is described as a 'Business Capability' focused on aligning business strategy/goals with IT strategy?",
        options: ["Platform", "Security", "Business", "Operations"],
        correct: [2],
        explanation: "The Business perspective (a Business Capability, along with People and Governance) focuses on aligning IT strategy with overall business goals and value.",
        difficulty: "medium",
      },
      {
        id: "s22-q06",
        sectionId: "s22",
        domain: 1,
        question: "A company's architecture review notes that they 'go global in minutes' using managed services and serverless technologies wherever possible. Which Well-Architected pillar does this best reflect?",
        options: ["Cost Optimization", "Performance Efficiency", "Security", "Operational Excellence"],
        correct: [1],
        explanation: "Performance Efficiency includes using managed/serverless services and the ability to deploy globally with minimal effort.",
        difficulty: "medium",
      },
      {
        id: "s22-q07",
        sectionId: "s22",
        domain: 1,
        question: "Which Well-Architected pillar emphasizes 'implementing a strong identity foundation' and 'applying security at all layers'?",
        options: ["Security", "Reliability", "Cost Optimization", "Sustainability"],
        correct: [0],
        explanation: "The Security pillar includes least-privilege identity foundations, defense in depth, and traceability.",
        difficulty: "easy",
      },
      {
        id: "s22-q08",
        sectionId: "s22",
        domain: 1,
        question: "Which CAF perspective is a 'Technical Capability' focused on describing and building a scalable hybrid cloud architecture?",
        options: ["Business", "Platform", "People", "Governance"],
        correct: [1],
        explanation: "The Platform perspective (a Technical Capability, along with Security and Operations) covers architecture and infrastructure design.",
        difficulty: "medium",
      },
      {
        id: "s22-q09",
        sectionId: "s22",
        domain: 1,
        question: "Which CAF perspective ensures that licensing, budgeting, and policy management align IT with business objectives while minimizing risk?",
        options: ["Governance", "Operations", "Platform", "Security"],
        correct: [0],
        explanation: "The Governance perspective focuses on aligning IT and business through policy, budgeting, and risk management.",
        difficulty: "hard",
      },
      {
        id: "s22-q10",
        sectionId: "s22",
        domain: 1,
        question: "A company stops trying to predict and pre-purchase server capacity for years in advance, instead scaling resources up and down based on real-time demand. Which pillar does this best demonstrate?",
        options: ["Reliability ('stop guessing capacity')", "Sustainability only", "Governance", "People"],
        correct: [0],
        explanation: "'Stop guessing capacity' and dynamically acquiring resources to meet demand is a core best practice of the Reliability pillar.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 23 - Exam Strategy, Tips & Certification Path
  // ===========================================================
  {
    section: {
      id: "s23",
      number: 23,
      title: "Exam Strategy, Tips & Certification Path",
      summary:
        "Understanding the CLF-C02 exam format, question types, time management strategies, and what certifications come next.",
      domain: 1,
      estMinutes: 25,
      content: `
## CLF-C02 Exam Format
- **65 questions** (some may be unscored "pre-test" items, indistinguishable from scored ones).
- **90 minutes** total time.
- **Scored from 100-1000**; **passing score is 700**.
- Delivered via Pearson VUE, at a testing center or online proctored.
- Question types: **multiple choice** (one correct answer out of 4) and **multiple response** (select TWO or more correct answers out of 5+ options - partial credit is NOT given).

## Domain Weightings (Reference)
| Domain | Weight |
|---|---|
| 1. Cloud Concepts | 24% |
| 2. Security and Compliance | 30% |
| 3. Cloud Technology and Services | 34% |
| 4. Billing, Pricing and Support | 12% |

Notice Domain 3 (services) and Domain 2 (security) together make up **64%** of the exam - prioritize your study time accordingly, but don't neglect Domains 1 and 4, which contain "easy points" if well understood.

## Time Management Strategy
- 90 minutes / 65 questions ≈ **83 seconds per question** on average.
- **Flag and move on**: if a question is unclear or you're unsure, select your best guess, **flag it for review**, and move on - don't get stuck. Come back at the end if time permits.
- **Eliminate obviously wrong answers first** - even if you don't know the right answer, removing 1-2 distractors significantly improves your odds.
- **Read the FULL question before reading the options** - look for keywords like "MOST cost-effective," "LEAST operational overhead," "managed service," which often point to the intended answer.
- Watch for **"Select TWO" / "Select THREE"** questions - they require ALL correct selections to get credit (no partial credit).

## Common Question Patterns
- **"A company needs the MOST cost-effective way to..."** -> look for Spot Instances, S3 lifecycle policies, Savings Plans, or serverless options.
- **"...with the LEAST operational overhead"** -> look for **managed/serverless services** (Fargate, Lambda, Aurora Serverless, RDS over self-managed DB on EC2).
- **"...without managing any servers"** -> serverless services (Lambda, Fargate, DynamoDB, S3, Athena).
- **Scenario mentions compliance/audit** -> CloudTrail, AWS Artifact, AWS Config.
- **Scenario mentions encryption requirements** -> KMS.
- **Scenario mentions DDoS** -> Shield (Standard is free/automatic; Advanced for enhanced protection).

## Final Review Checklist Before the Exam
1. Can you explain the **shared responsibility model** with examples for EC2, RDS, and S3?
2. Do you know the difference between **scalability vs. elasticity vs. high availability**?
3. Can you map each **AWS service** in this course to a one-sentence description of its purpose?
4. Do you know **which support plan** offers what (Basic/Developer/Business/Enterprise)?
5. Can you recall the **6 pillars** of the Well-Architected Framework?
6. Do you understand **IAM basics**: users, groups, roles, policies, MFA, least privilege?
7. Can you distinguish the **major storage/database services** and when to use each (S3 vs EBS vs EFS; RDS vs Aurora vs DynamoDB)?
8. Do you know the **EC2 pricing models** and when each makes sense?

## What's Next After CLF-C02?
The Cloud Practitioner certification is a great foundation. Common next steps (Associate level, typically 1 year of hands-on experience recommended):
- **AWS Certified Solutions Architect - Associate (SAA-C03)**: the most popular next step - broad architecture focus.
- **AWS Certified Developer - Associate**: for those writing code that runs on AWS (Lambda, SDKs, CI/CD).
- **AWS Certified SysOps Administrator - Associate**: for those focused on operations, monitoring, and deployment.

After Associate level, AWS offers **Professional** certifications (Solutions Architect Professional, DevOps Engineer Professional) and **Specialty** certifications (Security, Networking, Machine Learning, Database, Data Analytics, etc.).

## Good Luck!
Use the flashcards, the cheatsheet, and the practice simulators in this platform regularly. Aim to consistently score 80%+ on full-length simulators before sitting the real exam. You've got this!
`,
    },
    flashcards: [
      {
        id: "s23-f01",
        sectionId: "s23",
        front: "How many questions are on the CLF-C02 exam, and how much time do you get?",
        back: "65 questions, 90 minutes.",
      },
      {
        id: "s23-f02",
        sectionId: "s23",
        front: "What is the scoring range and passing score for CLF-C02?",
        back: "Scored from 100-1000; the passing score is 700.",
      },
      {
        id: "s23-f03",
        sectionId: "s23",
        front: "Is partial credit given on 'Select TWO' / 'Select THREE' questions?",
        back: "No - you must select ALL correct answers to receive credit; partial matches earn no credit.",
      },
      {
        id: "s23-f04",
        sectionId: "s23",
        front: "Which two domains together make up 64% of the CLF-C02 exam?",
        back: "Domain 2 (Security and Compliance, 30%) and Domain 3 (Cloud Technology and Services, 34%).",
      },
      {
        id: "s23-f05",
        sectionId: "s23",
        front: "What does the phrase '...with the LEAST operational overhead' usually point to in exam questions?",
        back: "A managed or serverless service (e.g., Fargate, Lambda, Aurora Serverless, RDS) rather than self-managed infrastructure.",
      },
      {
        id: "s23-f06",
        sectionId: "s23",
        front: "Roughly how much time do you have per question on the CLF-C02 exam?",
        back: "About 83 seconds per question (90 minutes / 65 questions).",
      },
      {
        id: "s23-f07",
        sectionId: "s23",
        front: "What is the recommended exam-day strategy for a question you're unsure about?",
        back: "Select your best guess, flag the question for review, and move on - then revisit flagged questions if time remains at the end.",
      },
      {
        id: "s23-f08",
        sectionId: "s23",
        front: "What are the three AWS Associate-level certifications typically pursued after Cloud Practitioner?",
        back: "AWS Certified Solutions Architect - Associate, AWS Certified Developer - Associate, and AWS Certified SysOps Administrator - Associate.",
      },
    ],
    questions: [
      {
        id: "s23-q01",
        sectionId: "s23",
        domain: 1,
        question: "How many questions are on the AWS Certified Cloud Practitioner (CLF-C02) exam, and what is the time limit?",
        options: ["50 questions, 60 minutes", "65 questions, 90 minutes", "75 questions, 120 minutes", "100 questions, 180 minutes"],
        correct: [1],
        explanation: "The CLF-C02 exam consists of 65 questions to be completed in 90 minutes.",
        difficulty: "easy",
      },
      {
        id: "s23-q02",
        sectionId: "s23",
        domain: 1,
        question: "What is the passing score for the CLF-C02 exam, on a scale of 100-1000?",
        options: ["500", "650", "700", "750"],
        correct: [2],
        explanation: "The passing score for CLF-C02 is 700 out of a possible 1000.",
        difficulty: "easy",
      },
      {
        id: "s23-q03",
        sectionId: "s23",
        domain: 1,
        question: "On a 'Select TWO' question, you correctly identify one of the two correct answers but guess incorrectly on the second. What score do you receive for that question?",
        options: ["50% (partial credit)", "0% - no credit is given for partially correct answers", "100% if your reasoning was sound", "The question is discarded from scoring"],
        correct: [1],
        explanation: "Multiple-response questions require ALL correct options to be selected for credit; there is no partial credit.",
        difficulty: "medium",
      },
      {
        id: "s23-q04",
        sectionId: "s23",
        domain: 1,
        question: "A question describes a scenario emphasizing 'MOST cost-effective' and 'infrequently accessed data that can tolerate retrieval delays.' Which type of answer should you look for?",
        options: [
          "S3 Standard storage class",
          "A storage class like S3 Glacier or Glacier Deep Archive",
          "Amazon EC2 Reserved Instances",
          "AWS Direct Connect",
        ],
        correct: [1],
        explanation: "Keywords like 'most cost-effective' plus 'infrequently accessed' and 'tolerate retrieval delays' point to Glacier-tier storage classes.",
        difficulty: "medium",
      },
      {
        id: "s23-q05",
        sectionId: "s23",
        domain: 1,
        question: "Which AWS certification is the MOST common next step after earning the Cloud Practitioner certification?",
        options: [
          "AWS Certified Security - Specialty",
          "AWS Certified Solutions Architect - Professional",
          "AWS Certified Solutions Architect - Associate",
          "AWS Certified DevOps Engineer - Professional",
        ],
        correct: [2],
        explanation: "The Solutions Architect - Associate (SAA-C03) is the most popular and commonly recommended next certification after Cloud Practitioner.",
        difficulty: "easy",
      },
      {
        id: "s23-q06",
        sectionId: "s23",
        domain: 1,
        question: "Approximately how much time should you budget per question to finish the CLF-C02 exam with time to review flagged questions?",
        options: ["~30 seconds", "~83 seconds", "~3 minutes", "~10 minutes"],
        correct: [1],
        explanation: "90 minutes divided by 65 questions is approximately 83 seconds per question.",
        difficulty: "medium",
      },
      {
        id: "s23-q07",
        sectionId: "s23",
        domain: 1,
        question: "A scenario describes a company needing to demonstrate compliance with SOC 2 to an auditor. Which service is most likely part of the correct answer?",
        options: ["AWS Artifact", "Amazon Polly", "AWS Snowmobile", "Amazon Personalize"],
        correct: [0],
        explanation: "AWS Artifact provides access to AWS compliance reports like SOC 2, commonly the answer for compliance-documentation scenarios.",
        difficulty: "medium",
      },
      {
        id: "s23-q08",
        sectionId: "s23",
        domain: 1,
        question: "Which exam-day strategy is recommended when you encounter a confusing or time-consuming question?",
        options: [
          "Spend as much time as needed before moving on, even if it means running out of time later",
          "Skip it entirely and leave it blank",
          "Select your best guess, flag it for review, and continue - revisit later if time allows",
          "Immediately end the exam",
        ],
        correct: [2],
        explanation: "Flagging difficult questions and moving on preserves time for the rest of the exam, with a chance to revisit flagged items at the end.",
        difficulty: "easy",
      },
      {
        id: "s23-q09",
        sectionId: "s23",
        domain: 1,
        question: "Which TWO domains together account for the majority (64%) of the CLF-C02 exam content? (Select TWO)",
        options: ["Cloud Concepts", "Security and Compliance", "Cloud Technology and Services", "Billing, Pricing and Support"],
        correct: [1, 2],
        explanation: "Security and Compliance (30%) plus Cloud Technology and Services (34%) together total 64% of the exam.",
        difficulty: "hard",
      },
      {
        id: "s23-q10",
        sectionId: "s23",
        domain: 1,
        question: "What is a good benchmark to aim for on full-length practice exam simulators before sitting the real CLF-C02 exam?",
        options: ["Consistently scoring 50% or higher", "Consistently scoring 65% or higher", "Consistently scoring 80% or higher", "Completing exams in under 30 minutes"],
        correct: [2],
        explanation: "Consistently scoring 80%+ on full-length practice exams suggests strong readiness, well above the 700/1000 (~70%) passing threshold, accounting for exam-day variability.",
        difficulty: "medium",
      },
    ],
  },
];

import type { SectionBundle } from "../types";

export const group01: SectionBundle[] = [
  // ===========================================================
  // Section 1 - Cloud Concepts & AWS Fundamentals
  // ===========================================================
  {
    section: {
      id: "s01",
      number: 1,
      title: "Cloud Concepts & AWS Fundamentals",
      summary:
        "What cloud computing is, the deployment & service models, and how AWS's global infrastructure (Regions, AZs, Edge Locations) is organized.",
      domain: 1,
      estMinutes: 35,
      content: `
## Traditional IT vs. the Cloud

In traditional IT, a company runs its own servers in an on-premises data center: buying hardware (CPU, RAM, storage), racking it, powering it, cooling it, networking it, and maintaining it over its lifetime. Capacity must be guessed in advance ("capacity planning"), which leads to either **over-provisioning** (wasted money) or **under-provisioning** (poor performance / outages).

**Cloud computing** is the on-demand delivery of compute power, database storage, applications, and other IT resources via the internet with **pay-as-you-go pricing**. You rent resources from a cloud provider (AWS) instead of owning the hardware.

### Six benefits of cloud computing
1. **Trade capital expense (CapEx) for variable expense (OpEx)** - pay only for what you use.
2. **Benefit from massive economies of scale** - AWS aggregates usage from millions of customers to get lower pay-as-you-go prices.
3. **Stop guessing capacity** - scale up or down based on actual demand.
4. **Increase speed and agility** - new resources are available in minutes.
5. **Stop spending money running and maintaining data centers** - focus on projects that differentiate your business.
6. **Go global in minutes** - deploy applications in multiple AWS Regions around the world with a few clicks.

## Types of Cloud Computing (Deployment Models)
- **Cloud-based deployment**: run all parts of the application in the cloud (migrate existing apps or design new apps cloud-native).
- **On-premises deployment (private cloud)**: deploy resources using virtualization and resource management tools, sometimes called "private cloud."
- **Hybrid deployment**: connect cloud-based resources to on-premises infrastructure (common during migrations), e.g., via VPN or Direct Connect.

## Cloud Computing Service Models
- **IaaS (Infrastructure as a Service)**: building blocks for cloud IT - networking, computers, data storage space. Highest flexibility, most management required. *Example: EC2, VPC, EBS.*
- **PaaS (Platform as a Service)**: removes the need to manage underlying infrastructure (hardware/OS); focus on deployment and management of your applications. *Example: Elastic Beanstalk, RDS.*
- **SaaS (Software as a Service)**: a completed product run and managed by the service provider. *Example: Gmail, Dropbox, Amazon QuickSight.*

### Pricing models
- **On-premises**: pay for servers/storage up front, capacity fixed.
- **Cloud**: pay-as-you-go for compute power, storage, and outbound data transfer - no upfront cost, no need to guess capacity.

## AWS Cloud - Global Infrastructure

AWS has three layers of infrastructure you must know:

### Regions
- A **Region** is a cluster of data centers, geographically isolated from other regions (e.g., \`us-east-1\` N. Virginia, \`eu-west-3\` Paris, \`ap-southeast-2\` Sydney).
- Most AWS services are **region-scoped**.
- Naming convention: **AWS Region = Area + Number** (e.g., us-east-1, eu-west-3).

**How to choose a Region:**
1. **Compliance** - data governance / legal requirements may keep data within a certain geography.
2. **Latency** - pick a region close to your users to reduce latency.
3. **Service availability** - new services / features aren't available in every region immediately.
4. **Pricing** - pricing varies from region to region, and is transparent in the pricing tab.

### Availability Zones (AZs)
- Each region has **multiple, isolated Availability Zones** (usually 3, minimum 3, up to 6), e.g., ap-southeast-2a, ap-southeast-2b, ap-southeast-2c.
- Each AZ is one or more discrete data centers with redundant power, networking, and connectivity.
- AZs are **physically separated** (to be resilient to disasters) but **close enough together** to have low-latency, high-throughput, redundant networking between them.

### Edge Locations / Points of Presence
- AWS has 400+ Points of Presence (Edge Locations + Regional Edge Caches) in 90+ cities across 40+ countries.
- Used by **Amazon CloudFront** (AWS's Content Delivery Network) to deliver content to end users with low latency.

## Tour of the AWS Console
- **Global services**: IAM, Route 53, CloudFront, WAF, Organizations - apply across all regions.
- **Region-scoped services**: EC2, Lambda, RDS, most others - you must pick the right region.
- The AWS Management Console lets you select your region from the top-right dropdown; lower latency to your users = pick the closest region.

## Shared Responsibility Model (Introduction)
AWS uses the phrase "**Security OF the cloud vs. Security IN the cloud**":
- **AWS is responsible for security OF the Cloud**: protecting infrastructure (hardware, software, networking, and facilities) that runs all AWS services.
- **The customer is responsible for security IN the Cloud**: anything you put on the cloud or connect to the cloud (e.g., managing your data, configuring IAM, securing OS/network/firewall on EC2, encrypting data).
- This split varies by service: for managed services (e.g., RDS, S3), AWS handles more of the operational burden; for EC2, the customer handles more.

## AWS Acceptable Use Policy
AWS services may only be used for **lawful purposes** - no illegal, harmful, or fraudulent activity. Understand that as the customer you're responsible for compliance with this policy when running workloads on AWS.
`,
    },
    flashcards: [
      {
        id: "s01-f01",
        sectionId: "s01",
        front: "What are the 6 benefits of cloud computing?",
        back:
          "1) Trade CapEx for variable OpEx, 2) Economies of scale, 3) Stop guessing capacity, 4) Increase speed & agility, 5) Stop spending on data centers, 6) Go global in minutes.",
      },
      {
        id: "s01-f02",
        sectionId: "s01",
        front: "Define IaaS, PaaS, and SaaS with an AWS example each.",
        back:
          "IaaS = raw infra (EC2, VPC, EBS); PaaS = platform, no infra management (Elastic Beanstalk, RDS); SaaS = fully managed software product (Amazon QuickSight, Gmail).",
      },
      {
        id: "s01-f03",
        sectionId: "s01",
        front: "What is an AWS Region?",
        back:
          "A cluster of geographically isolated data centers (a 'cluster of Availability Zones'), e.g., us-east-1. Most services are region-scoped.",
      },
      {
        id: "s01-f04",
        sectionId: "s01",
        front: "What is an Availability Zone (AZ)?",
        back:
          "One or more discrete data centers with redundant power/networking/connectivity inside a Region, physically separated from other AZs but linked by low-latency networking. Each region has 3+ AZs.",
      },
      {
        id: "s01-f05",
        sectionId: "s01",
        front: "What are AWS Edge Locations used for?",
        back:
          "They are sites used by CloudFront (AWS's CDN) to cache content closer to end users for low latency delivery. There are 400+ points of presence globally.",
      },
      {
        id: "s01-f06",
        sectionId: "s01",
        front: "Name 4 factors for choosing an AWS Region.",
        back: "Compliance/data governance, latency to users, service availability, and pricing.",
      },
      {
        id: "s01-f07",
        sectionId: "s01",
        front: "Summarize the Shared Responsibility Model.",
        back:
          "AWS = security OF the cloud (hardware, global infrastructure). Customer = security IN the cloud (data, IAM, OS patching/firewall config on EC2, encryption).",
      },
      {
        id: "s01-f08",
        sectionId: "s01",
        front: "Give an example of a global AWS service vs a regional one.",
        back: "Global: IAM, Route 53, CloudFront, WAF, Organizations. Regional: EC2, Lambda, RDS, S3 buckets are region-scoped.",
      },
    ],
    questions: [
      {
        id: "s01-q01",
        sectionId: "s01",
        domain: 1,
        question: "Which pricing benefit allows you to pay only for the compute resources you actually consume?",
        options: [
          "Trade capital expense for variable expense",
          "Economies of scale",
          "Increase speed and agility",
          "Go global in minutes",
        ],
        correct: [0],
        explanation:
          "Trading CapEx for variable OpEx means you pay only for the IT resources you consume, rather than investing heavily up front in data centers and servers.",
        difficulty: "easy",
      },
      {
        id: "s01-q02",
        sectionId: "s01",
        domain: 1,
        question: "A company wants to deploy a fully managed relational database without managing the underlying OS. Which cloud service model does this represent?",
        options: ["IaaS", "PaaS", "SaaS", "On-premises"],
        correct: [1],
        explanation:
          "PaaS (Platform as a Service) removes the need to manage the underlying infrastructure (hardware and OS); Amazon RDS is a classic PaaS example.",
        difficulty: "easy",
      },
      {
        id: "s01-q03",
        sectionId: "s01",
        domain: 1,
        question: "What is the relationship between AWS Regions and Availability Zones?",
        options: [
          "A Region is contained within an Availability Zone",
          "An Availability Zone is a single server inside a Region",
          "A Region is a cluster of geographically separate Availability Zones, each made up of one or more data centers",
          "Availability Zones and Regions are the same thing",
        ],
        correct: [2],
        explanation:
          "A Region is a geographic area containing multiple isolated Availability Zones, each consisting of one or more discrete data centers.",
        difficulty: "easy",
      },
      {
        id: "s01-q04",
        sectionId: "s01",
        domain: 1,
        question: "Which AWS infrastructure component is primarily used by Amazon CloudFront to cache content close to end users?",
        options: ["Availability Zones", "Edge Locations", "Regions", "VPC Endpoints"],
        correct: [1],
        explanation: "Edge Locations (part of AWS's points of presence) are used by CloudFront to deliver cached content with low latency.",
        difficulty: "easy",
      },
      {
        id: "s01-q05",
        sectionId: "s01",
        domain: 1,
        question: "Under the AWS Shared Responsibility Model, who is responsible for patching the guest operating system on an EC2 instance?",
        options: ["AWS", "The customer", "Both equally, automatically", "Neither - patching is unnecessary in the cloud"],
        correct: [1],
        explanation: "The customer manages security IN the cloud, which includes guest OS patching, software configuration, and firewall/security group settings on EC2.",
        difficulty: "medium",
      },
      {
        id: "s01-q06",
        sectionId: "s01",
        domain: 1,
        question: "A company in the EU must keep customer data within EU borders for legal reasons. What is the PRIMARY factor driving their AWS Region selection?",
        options: ["Latency", "Pricing", "Compliance and data governance", "Service availability"],
        correct: [2],
        explanation: "Compliance and data governance requirements often dictate which geographic region data must reside in.",
        difficulty: "easy",
      },
      {
        id: "s01-q07",
        sectionId: "s01",
        domain: 1,
        question: "Which of the following is an example of a hybrid cloud deployment?",
        options: [
          "Running 100% of workloads on EC2",
          "Running a legacy mainframe app on-premises while connecting it to cloud resources via VPN",
          "Using only SaaS applications",
          "Storing static files in S3 only",
        ],
        correct: [1],
        explanation: "Hybrid deployment connects on-premises infrastructure to cloud resources, common during a gradual migration.",
        difficulty: "easy",
      },
      {
        id: "s01-q08",
        sectionId: "s01",
        domain: 1,
        question: "Which AWS services are considered 'global' rather than region-scoped? (Select TWO)",
        options: ["Amazon EC2", "AWS IAM", "Amazon Route 53", "Amazon RDS", "Amazon EBS"],
        correct: [1, 2],
        explanation: "IAM and Route 53 are global services. EC2, RDS, and EBS are region-scoped.",
        difficulty: "medium",
      },
      {
        id: "s01-q09",
        sectionId: "s01",
        domain: 1,
        question: "What does 'go global in minutes' refer to as a benefit of cloud computing?",
        options: [
          "AWS automatically translates your application into other languages",
          "You can deploy your application into multiple Regions worldwide with just a few clicks",
          "AWS provides free global marketing services",
          "All AWS services are automatically replicated to every region",
        ],
        correct: [1],
        explanation: "AWS's global footprint of Regions lets you deploy applications closer to users worldwide very quickly.",
        difficulty: "easy",
      },
      {
        id: "s01-q10",
        sectionId: "s01",
        domain: 1,
        question: "Which statement about the AWS Acceptable Use Policy is correct?",
        options: [
          "It only applies to the root account",
          "AWS services may only be used for lawful purposes; illegal or harmful use is prohibited",
          "It is optional and only applies to enterprise customers",
          "It governs only billing disputes",
        ],
        correct: [1],
        explanation: "The AWS Acceptable Use Policy prohibits illegal, harmful, or fraudulent use of AWS services.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 2 - AWS Account Setup, Root User & Budgets
  // ===========================================================
  {
    section: {
      id: "s02",
      number: 2,
      title: "AWS Account Setup, Root User & Budgets",
      summary:
        "Creating an AWS account, protecting the root user, the AWS Free Tier, and setting up budgets/alarms to control cost from day one.",
      domain: 4,
      estMinutes: 25,
      content: `
## Creating an AWS Account
- Sign up at aws.amazon.com with an email address, account name, and a strong password.
- You must provide a **credit card** (for verification and billing) and a **phone number** (for SMS/voice verification).
- New accounts get access to the **AWS Free Tier**: a set of free usage limits for 12 months (e.g., 750 hours/month of t2.micro or t3.micro EC2), "always free" offers (e.g., Lambda 1M free requests/month), and short-term trials.
- AWS Activate / account verification issues are common for new sign-ups; AWS support can help troubleshoot.

## The Root User
- The **root user** is created when you first create the AWS account and has **unrestricted access** to all resources and billing.
- Best practice: **DO NOT use the root user for everyday tasks**. Instead:
  1. Lock away root credentials.
  2. Enable **MFA (Multi-Factor Authentication)** on the root account immediately.
  3. Create individual **IAM users** with appropriate permissions for daily work.

### Tasks that can ONLY be performed by the root user
- Changing your account settings (account name, email, root user password).
- Viewing certain tax invoices.
- Closing your AWS account.
- Restoring IAM user permissions / changing your AWS Support plan.
- Registering as a seller in the Reserved Instance Marketplace.
- Configuring an Amazon S3 bucket to enable MFA Delete.
- Signing up for GovCloud.

## AWS Budgets & Billing Alarms
- **AWS Budgets**: lets you create custom budgets that alert you (via email/SNS) when your costs or usage **exceed (or are forecasted to exceed)** your budgeted amount.
  - Types: **Cost budgets**, **Usage budgets**, **Reservation budgets**, **Savings Plans budgets**.
  - You can set up a **zero-spend budget** to be notified the moment any cost is incurred (great for staying within Free Tier).
  - Up to several budgets can be created for free (first 2 free, then small fee per additional budget per month).
- **Billing Alarms**: use **CloudWatch** in **us-east-1** to create an alarm on the \`EstimatedCharges\` billing metric (must enable "Receive Billing Alerts" first in Billing Preferences). Alarm triggers an SNS notification when estimated charges exceed a threshold.

## Multi-session console sign-in
The AWS Console supports signing into **multiple accounts simultaneously** in different browser tabs/sessions - useful when managing several AWS accounts (e.g., Organizations) without needing separate browser profiles.
`,
    },
    flashcards: [
      {
        id: "s02-f01",
        sectionId: "s02",
        front: "What two things are required when signing up for an AWS account?",
        back: "A valid credit card (for billing/verification) and a phone number (for SMS/voice verification).",
      },
      {
        id: "s02-f02",
        sectionId: "s02",
        front: "What is the #1 best practice for the AWS root user?",
        back: "Never use it for daily tasks - lock it away, enable MFA immediately, and create individual IAM users instead.",
      },
      {
        id: "s02-f03",
        sectionId: "s02",
        front: "Name 3 tasks that can ONLY be done by the root user.",
        back:
          "Closing the AWS account, changing account settings (name/email/root password), and changing the AWS Support plan (also: viewing certain tax invoices, S3 MFA Delete config, GovCloud sign-up).",
      },
      {
        id: "s02-f04",
        sectionId: "s02",
        front: "What is a 'zero-spend budget' in AWS Budgets?",
        back: "A budget set to $0 that alerts you the instant ANY cost is incurred - useful to stay within the Free Tier.",
      },
      {
        id: "s02-f05",
        sectionId: "s02",
        front: "Which region must you use to set up a CloudWatch billing alarm?",
        back: "us-east-1 (N. Virginia) - billing metrics are only published there.",
      },
      {
        id: "s02-f06",
        sectionId: "s02",
        front: "What types of budgets does AWS Budgets support?",
        back: "Cost budgets, Usage budgets, Reservation budgets, and Savings Plans budgets.",
      },
      {
        id: "s02-f07",
        sectionId: "s02",
        front: "How long does the AWS Free Tier's 12-month offer last, and give an example.",
        back: "12 months from account creation; example: 750 hours/month of t2.micro/t3.micro EC2 usage.",
      },
      {
        id: "s02-f08",
        sectionId: "s02",
        front: "What must be enabled before CloudWatch billing alarms will work?",
        back: "'Receive Billing Alerts' in the Billing Preferences settings (and the alarm must be created in us-east-1).",
      },
    ],
    questions: [
      {
        id: "s02-q01",
        sectionId: "s02",
        domain: 4,
        question: "Which of the following actions can ONLY be performed using the AWS root user account?",
        options: [
          "Launching an EC2 instance",
          "Creating an S3 bucket",
          "Closing the AWS account",
          "Creating an IAM policy",
        ],
        correct: [2],
        explanation: "Closing the AWS account is one of the few tasks that requires the root user.",
        difficulty: "easy",
      },
      {
        id: "s02-q02",
        sectionId: "s02",
        domain: 4,
        question: "What is the recommended FIRST security step after creating a new AWS account?",
        options: [
          "Create 10 IAM users",
          "Enable MFA on the root user account",
          "Delete the root account",
          "Open all ports in the default security group",
        ],
        correct: [1],
        explanation: "Enabling MFA on the root account immediately is a top security best practice before doing anything else.",
        difficulty: "easy",
      },
      {
        id: "s02-q03",
        sectionId: "s02",
        domain: 4,
        question: "A company wants to be notified by email the instant they incur ANY AWS charges. What should they configure?",
        options: [
          "A Cost and Usage Report",
          "A zero-spend AWS Budget with an SNS/email notification",
          "AWS Trusted Advisor",
          "A Service Quota",
        ],
        correct: [1],
        explanation: "A zero-spend budget in AWS Budgets notifies you as soon as any cost is incurred.",
        difficulty: "medium",
      },
      {
        id: "s02-q04",
        sectionId: "s02",
        domain: 4,
        question: "In which AWS Region must you create a CloudWatch alarm to monitor estimated billing charges?",
        options: ["The region closest to you", "us-east-1", "eu-west-1", "Any region; billing alarms are global"],
        correct: [1],
        explanation: "Billing metrics are published only to us-east-1, so the CloudWatch alarm must be created there.",
        difficulty: "medium",
      },
      {
        id: "s02-q05",
        sectionId: "s02",
        domain: 4,
        question: "Which AWS Budgets type would alert you if your Reserved Instance utilization drops below a target?",
        options: ["Cost budget", "Usage budget", "Reservation budget", "Savings Plans budget"],
        correct: [2],
        explanation: "Reservation budgets track utilization/coverage of your Reserved Instances.",
        difficulty: "hard",
      },
      {
        id: "s02-q06",
        sectionId: "s02",
        domain: 4,
        question: "What information is required to sign up for a new AWS account?",
        options: [
          "Only an email address",
          "Email address, account name, password, credit card, and phone number",
          "A government-issued ID only",
          "An existing AWS Partner reference",
        ],
        correct: [1],
        explanation: "Account creation requires an email, account name, password, a valid credit card for billing, and phone verification.",
        difficulty: "easy",
      },
      {
        id: "s02-q07",
        sectionId: "s02",
        domain: 4,
        question: "Why should you avoid using the root user for day-to-day operations?",
        options: [
          "The root user is slower than IAM users",
          "The root user has unrestricted access to the account, so compromising it is catastrophic",
          "The root user cannot launch EC2 instances",
          "AWS charges extra for root user activity",
        ],
        correct: [1],
        explanation: "Because the root user has unrestricted access, it should be locked away and used only for the small set of tasks that require it.",
        difficulty: "easy",
      },
      {
        id: "s02-q08",
        sectionId: "s02",
        domain: 4,
        question: "A startup wants to keep multiple AWS account sessions open in the same browser to manage resources across accounts. What AWS Console feature supports this?",
        options: [
          "AWS Organizations consolidated billing",
          "Multi-session (simultaneous) sign-in",
          "IAM Identity Center only",
          "It is not possible in any browser",
        ],
        correct: [1],
        explanation: "The AWS Console supports signing into multiple accounts simultaneously via multi-session support.",
        difficulty: "medium",
      },
      {
        id: "s02-q09",
        sectionId: "s02",
        domain: 4,
        question: "Which of these is an 'Always Free' AWS offer (not just for 12 months)?",
        options: [
          "750 hours/month of EC2 t2.micro",
          "AWS Lambda - 1 million free requests per month",
          "5 GB of S3 Standard storage",
          "750 hours of RDS db.t2.micro",
        ],
        correct: [1],
        explanation: "AWS Lambda's free tier (1M requests and 400,000 GB-seconds of compute per month) is part of the Always Free offers, unlike the 12-month free tier items.",
        difficulty: "hard",
      },
      {
        id: "s02-q10",
        sectionId: "s02",
        domain: 4,
        question: "Which task requires root user credentials?",
        options: [
          "Attaching an IAM policy to a user",
          "Enabling MFA Delete on an S3 bucket",
          "Creating a security group",
          "Launching a CloudFormation stack",
        ],
        correct: [1],
        explanation: "Enabling MFA Delete on an S3 bucket is one of the actions that requires the root user.",
        difficulty: "hard",
      },
    ],
  },

  // ===========================================================
  // Section 3 - IAM (Identity & Access Management)
  // ===========================================================
  {
    section: {
      id: "s03",
      number: 3,
      title: "IAM - Identity & Access Management",
      summary:
        "Users, groups, roles, and policies - how AWS controls who can do what, plus MFA, access keys, and IAM security tools.",
      domain: 2,
      estMinutes: 45,
      content: `
## IAM Overview
**IAM (Identity and Access Management)** is a **global** AWS service used to manage access to AWS resources.

- **Root account**: created by default, should never be used or shared.
- **Users**: represent people within your organization; can be grouped.
- **Groups**: a collection of users (groups cannot contain other groups, and a user can belong to multiple groups).
- **Policies**: JSON documents defining permissions; assigned to users, groups, or roles. Follow the principle of **least privilege** (grant only the permissions required).

### IAM Policy structure (key elements)
\`\`\`json
{
  "Version": "2012-10-17",
  "Id": "S3-Account-Permissions",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": { "AWS": ["arn:aws:iam::ACCOUNT_ID:root"] },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::mybucket/*"]
    }
  ]
}
\`\`\`
- **Version**: policy language version (always "2012-10-17").
- **Id**: optional policy identifier.
- **Statement**: one or more individual statements.
- **Sid**: optional statement identifier.
- **Effect**: \`Allow\` or \`Deny\`.
- **Principal**: the account/user/role the policy applies to.
- **Action**: list of API calls allowed/denied.
- **Resource**: list of resources the actions apply to.
- **Condition** (optional): when this policy is in effect.

Policies can be **inline** (attached directly to one user/group/role) or **managed** (standalone, reusable, AWS-managed or customer-managed).

## IAM MFA (Multi-Factor Authentication)
MFA = password (something you know) + a security device (something you have). Protects root and IAM accounts.

MFA device options:
- **Virtual MFA device**: Google Authenticator (1 device) or Authy (multi-device) - supports TOTP (Time-based One-Time Password), 6-digit code that refreshes every 30s.
- **Universal 2nd Factor (U2F) Security Key**: e.g., YubiKey (physical device, can support multiple accounts).
- **Hardware Key Fob** (regular or for AWS GovCloud).

### Password Policy
You can set account-wide rules: minimum length, require specific character types (uppercase, lowercase, numbers, special), allow users to change their own password, require periodic password changes (e.g., every 90 days), and prevent password reuse.

## Accessing AWS
Three ways to access AWS:
1. **Management Console**: password + MFA protected, web UI.
2. **CLI (Command Line Interface)**: protected by access keys, for scripting.
3. **SDK (Software Development Kit)**: for application code, protected by access keys, available for many languages (JavaScript, Python "Boto3", Java, .NET, etc.).

**Access Keys** are generated through the AWS Console and consist of an **Access Key ID** and a **Secret Access Key** - treat these like a username/password and never share them.

**AWS CloudShell**: a free browser-based terminal with the AWS CLI pre-installed, retains a small amount of storage per region between sessions.

## IAM Roles for AWS Services
Some AWS services need to perform actions on your behalf (e.g., an EC2 instance writing to S3). You create an **IAM Role** and assign it permissions, then attach the role to the service (e.g., EC2 instance, Lambda function). Common roles:
- EC2 Instance Roles
- Lambda Function Roles
- Roles for CloudFormation

## IAM Security Tools
- **IAM Credentials Report** (account-level): a report listing all account's users and the status of their credentials (passwords, access keys, MFA, last used).
- **IAM Access Advisor** (user-level): shows the service permissions granted to a user and when those services were last accessed - helps apply least privilege by revoking unused permissions.

## IAM Best Practices
- Don't use the root account except for account/billing tasks.
- One physical user = one AWS user.
- Assign permissions to **groups**, then add users to groups (don't assign permissions to individual users directly when avoidable).
- Create a strong **password policy**.
- Use and enforce **MFA**.
- Create and use **Roles** for giving AWS services permissions.
- Use **Access Keys** for programmatic access (CLI/SDK) - rotate regularly, never commit to source control.
- Audit permissions with the **IAM Credentials Report** and **Access Advisor**.

## Shared Responsibility Model for IAM
- **AWS**: secures the infrastructure/global database housing IAM, ensures the IAM service itself is highly available.
- **Customer**: manages users/groups/roles/policies, enables MFA, rotates keys, reviews permissions/audits using tools above, never shares credentials.
`,
    },
    flashcards: [
      {
        id: "s03-f01",
        sectionId: "s03",
        front: "What is the principle of least privilege?",
        back: "Grant a user/role only the permissions required to perform their task - nothing more.",
      },
      {
        id: "s03-f02",
        sectionId: "s03",
        front: "Can IAM groups contain other groups?",
        back: "No. Groups can only contain users, not other groups. A user CAN belong to multiple groups.",
      },
      {
        id: "s03-f03",
        sectionId: "s03",
        front: "What are the 5 key elements of an IAM policy statement?",
        back: "Effect (Allow/Deny), Principal, Action, Resource, and optionally Condition - within an overall Version + Statement structure.",
      },
      {
        id: "s03-f04",
        sectionId: "s03",
        front: "What are the 3 ways to access/manage AWS?",
        back: "Management Console (password+MFA), CLI (access keys), and SDK (access keys, used in application code).",
      },
      {
        id: "s03-f05",
        sectionId: "s03",
        front: "Why do EC2 instances use IAM Roles instead of access keys?",
        back: "IAM Roles let AWS services (like EC2 or Lambda) securely call other AWS APIs on your behalf without embedding long-lived credentials.",
      },
      {
        id: "s03-f06",
        sectionId: "s03",
        front: "What does the IAM Credentials Report show?",
        back: "An account-wide CSV report of all IAM users and the status of their passwords, access keys, and MFA devices.",
      },
      {
        id: "s03-f07",
        sectionId: "s03",
        front: "What does IAM Access Advisor show?",
        back: "For a specific user/role, the list of services they have permission to access and when each was last accessed - useful for tightening permissions.",
      },
      {
        id: "s03-f08",
        sectionId: "s03",
        front: "What is AWS CloudShell?",
        back: "A free, browser-based terminal pre-loaded with the AWS CLI, with persistent storage (~1GB per region) across sessions.",
      },
    ],
    questions: [
      {
        id: "s03-q01",
        sectionId: "s03",
        domain: 2,
        question: "Which IAM entity should you attach permission policies to, to make administration easier as your team grows?",
        options: ["Individual users only", "Groups", "The root account", "EC2 instances directly"],
        correct: [1],
        explanation: "Best practice is to assign permissions to groups and add users to those groups, simplifying permission management.",
        difficulty: "easy",
      },
      {
        id: "s03-q02",
        sectionId: "s03",
        domain: 2,
        question: "In an IAM policy document, which field specifies whether an action is permitted or denied?",
        options: ["Principal", "Effect", "Resource", "Version"],
        correct: [1],
        explanation: "The 'Effect' field is set to either 'Allow' or 'Deny'.",
        difficulty: "easy",
      },
      {
        id: "s03-q03",
        sectionId: "s03",
        domain: 2,
        question: "An application running on an EC2 instance needs to read objects from an S3 bucket. What is the AWS-recommended way to grant this access?",
        options: [
          "Hardcode an IAM user's access keys into the application",
          "Attach an IAM Role with the appropriate S3 permissions to the EC2 instance",
          "Make the S3 bucket public",
          "Share the root account credentials with the application",
        ],
        correct: [1],
        explanation: "IAM roles attached to EC2 instances provide temporary credentials automatically, avoiding the need to manage long-lived access keys.",
        difficulty: "easy",
      },
      {
        id: "s03-q04",
        sectionId: "s03",
        domain: 2,
        question: "Which tool would you use to find out when a specific IAM user last used their permissions for Amazon S3?",
        options: ["IAM Credentials Report", "IAM Access Advisor", "AWS CloudTrail console summary", "AWS Trusted Advisor"],
        correct: [1],
        explanation: "IAM Access Advisor shows per-service last-accessed information for a given user, group, or role.",
        difficulty: "medium",
      },
      {
        id: "s03-q05",
        sectionId: "s03",
        domain: 2,
        question: "What type of MFA device generates a 6-digit code that refreshes every 30 seconds?",
        options: ["U2F security key", "Virtual MFA device (e.g., Google Authenticator)", "Hardware key fob only", "SMS text message"],
        correct: [1],
        explanation: "Virtual MFA devices implement TOTP, generating a refreshing 6-digit code every 30 seconds.",
        difficulty: "easy",
      },
      {
        id: "s03-q06",
        sectionId: "s03",
        domain: 2,
        question: "Which of the following are considered IAM best practices? (Select TWO)",
        options: [
          "Share root credentials with trusted team members",
          "Enable MFA for all users including root",
          "Use access keys for the root account in CI/CD pipelines",
          "Assign permissions via groups rather than directly to users",
          "Disable password policies to simplify onboarding",
        ],
        correct: [1, 3],
        explanation: "Enabling MFA everywhere and assigning permissions via groups are core IAM best practices; sharing root credentials and disabling password policies are anti-patterns.",
        difficulty: "medium",
      },
      {
        id: "s03-q07",
        sectionId: "s03",
        domain: 2,
        question: "Is AWS IAM a global service or a regional service?",
        options: ["Regional - must configure per region", "Global - users/roles/policies apply across all regions", "Per Availability Zone", "It depends on the chosen S3 bucket region"],
        correct: [1],
        explanation: "IAM is a global service; identities and policies are not tied to a specific region.",
        difficulty: "easy",
      },
      {
        id: "s03-q08",
        sectionId: "s03",
        domain: 2,
        question: "What credentials are used to authenticate AWS CLI and SDK calls?",
        options: ["Username and password", "Access Key ID and Secret Access Key", "MFA code only", "IAM policy ARN"],
        correct: [1],
        explanation: "CLI and SDK access is authenticated using an Access Key ID paired with a Secret Access Key.",
        difficulty: "easy",
      },
      {
        id: "s03-q09",
        sectionId: "s03",
        domain: 2,
        question: "Under the shared responsibility model, which IAM-related tasks are the CUSTOMER's responsibility? (Select TWO)",
        options: [
          "Ensuring the IAM service itself is highly available",
          "Enabling MFA on user accounts",
          "Patching the underlying servers that run IAM",
          "Rotating IAM access keys regularly",
        ],
        correct: [1, 3],
        explanation: "Customers manage their own users/credentials (enabling MFA, rotating keys); AWS handles the availability and patching of the IAM service infrastructure.",
        difficulty: "medium",
      },
      {
        id: "s03-q10",
        sectionId: "s03",
        domain: 2,
        question: "A company wants every employee to have their own login with a custom password policy requiring 90-day rotation. What should they configure?",
        options: [
          "A shared root account password",
          "Individual IAM users plus an account password policy",
          "A single IAM role shared by everyone",
          "Disable IAM and use access keys for everyone",
        ],
        correct: [1],
        explanation: "Each employee should have an individual IAM user, and the account password policy can enforce rotation and complexity requirements.",
        difficulty: "easy",
      },
    ],
  },
];

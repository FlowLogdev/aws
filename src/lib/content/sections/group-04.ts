import type { SectionBundle } from "../types";

export const group04: SectionBundle[] = [
  // ===========================================================
  // Section 10 - Containers & Serverless: ECS, EKS, Lambda, API Gateway
  // ===========================================================
  {
    section: {
      id: "s10",
      number: 10,
      title: "Containers & Serverless: ECS, EKS, Lambda, API Gateway",
      summary:
        "Running containers with ECS/EKS/Fargate, serverless compute with Lambda, and building APIs with Amazon API Gateway.",
      domain: 3,
      estMinutes: 50,
      content: `
## Docker & Containers (Concepts)
- A **container** is a packaged unit containing application code and its dependencies, runnable consistently across environments.
- **Docker images** are stored in a registry - **Amazon ECR (Elastic Container Registry)** is AWS's private Docker image registry.

## Amazon ECS (Elastic Container Service)
AWS's own container orchestration platform to run Docker containers.

### Launch Types
- **EC2 Launch Type**: you provision and manage EC2 instances; ECS places containers (tasks) onto your instances. You manage the underlying infrastructure (capacity, patching).
- **Fargate Launch Type**: **serverless** - you don't manage any servers/clusters; just define the task (CPU/RAM, image) and AWS runs it. Pay per task resource usage.

### Key Concepts
- **Task Definition**: a JSON blueprint describing one or more containers (image, CPU/memory, ports, environment variables).
- **ECS Service**: ensures a desired number of tasks are running, integrates with an ELB to distribute traffic.
- **IAM Roles for ECS Tasks**: tasks can assume an IAM role for fine-grained permissions to call AWS services.

## Amazon EKS (Elastic Kubernetes Service)
- A managed service to run **Kubernetes** (an open-source container orchestration system) on AWS.
- Useful for organizations already using Kubernetes / wanting to be cloud-agnostic.
- Like ECS, EKS supports EC2 or **Fargate** launch types for the worker nodes.

## AWS Lambda
**Serverless** compute - run code without provisioning or managing servers:
- Pay only for the **compute time** you consume (per request and duration, billed to the millisecond) - no charge when code is not running.
- Supports many languages: Node.js, Python, Java, Go, .NET, Ruby, and custom runtimes via container images.
- **Event-driven**: triggered by other AWS services (S3 events, API Gateway, DynamoDB Streams, SNS, SQS, EventBridge schedules/CloudWatch Events, etc.).
- Automatically scales horizontally - from a few requests per day to thousands per second.
- **Limits** (good to know at a high level): max execution time **15 minutes** per invocation; deployment package size limits; configurable memory (which also scales CPU).
- Common use cases: serverless APIs (with API Gateway), file processing on S3 upload, scheduled tasks (cron-like via EventBridge), data transformation, chatbots.

## Amazon API Gateway
- Build, publish, maintain, monitor, and secure **APIs** (REST, HTTP, WebSocket) at any scale.
- Serverless, scales automatically, and integrates directly with **Lambda** for "serverless API" architectures - a very common pattern: **API Gateway -> Lambda -> DynamoDB**.
- Supports authentication/authorization (IAM, Cognito, Lambda authorizers), API keys/usage plans for throttling, request/response transformations, and caching.

## Comparing Compute Options (Quick Recap)
| Service | Management Level | Best for |
|---|---|---|
| **EC2** | You manage OS/servers | Full control, custom configurations |
| **ECS/EKS (EC2 launch type)** | You manage cluster servers | Container orchestration with infra control |
| **ECS/EKS (Fargate)** | Serverless containers | Containers without managing servers |
| **Lambda** | Fully serverless functions | Short-lived, event-driven workloads |
| **Elastic Beanstalk** | Managed PaaS | Quick deploy of web apps (next section) |
`,
    },
    flashcards: [
      {
        id: "s10-f01",
        sectionId: "s10",
        front: "What is Amazon ECR used for?",
        back: "Amazon Elastic Container Registry - a private Docker image registry to store, manage, and deploy container images.",
      },
      {
        id: "s10-f02",
        sectionId: "s10",
        front: "What is the key difference between ECS EC2 launch type and ECS Fargate launch type?",
        back: "EC2 launch type: you provision/manage the underlying EC2 instances. Fargate: serverless - AWS manages the infrastructure; you just define the task.",
      },
      {
        id: "s10-f03",
        sectionId: "s10",
        front: "What is an ECS Task Definition?",
        back: "A JSON blueprint describing one or more containers - their image, CPU/memory requirements, ports, and environment variables.",
      },
      {
        id: "s10-f04",
        sectionId: "s10",
        front: "What is Amazon EKS?",
        back: "A managed service for running Kubernetes clusters on AWS, useful for teams already using Kubernetes or wanting portability across clouds.",
      },
      {
        id: "s10-f05",
        sectionId: "s10",
        front: "How is AWS Lambda billed?",
        back: "Pay only for compute time consumed (per request and duration, billed to the millisecond) - nothing when the function isn't running.",
      },
      {
        id: "s10-f06",
        sectionId: "s10",
        front: "What is the maximum execution duration for a single AWS Lambda invocation?",
        back: "15 minutes.",
      },
      {
        id: "s10-f07",
        sectionId: "s10",
        front: "What is the classic 'serverless API' architecture pattern on AWS?",
        back: "API Gateway -> AWS Lambda -> DynamoDB (or other data store), with no servers to manage anywhere in the stack.",
      },
      {
        id: "s10-f08",
        sectionId: "s10",
        front: "Name three common AWS Lambda trigger sources.",
        back: "Examples include: S3 object events, API Gateway requests, DynamoDB Streams, SNS/SQS messages, and EventBridge scheduled rules.",
      },
    ],
    questions: [
      {
        id: "s10-q01",
        sectionId: "s10",
        domain: 3,
        question: "A company wants to run Docker containers WITHOUT managing or provisioning any EC2 instances. Which ECS launch type should they choose?",
        options: ["EC2 launch type", "Fargate launch type", "Spot launch type", "Dedicated Host launch type"],
        correct: [1],
        explanation: "Fargate is the serverless launch type for ECS (and EKS) - AWS manages the underlying infrastructure.",
        difficulty: "easy",
      },
      {
        id: "s10-q02",
        sectionId: "s10",
        domain: 3,
        question: "What is the maximum amount of time a single AWS Lambda function can run before timing out?",
        options: ["1 minute", "5 minutes", "15 minutes", "60 minutes"],
        correct: [2],
        explanation: "AWS Lambda functions have a maximum execution timeout of 15 minutes per invocation.",
        difficulty: "easy",
      },
      {
        id: "s10-q03",
        sectionId: "s10",
        domain: 3,
        question: "Which AWS service is a private registry for storing Docker container images?",
        options: ["Amazon ECS", "Amazon ECR", "Amazon EKS", "AWS Fargate"],
        correct: [1],
        explanation: "Amazon ECR (Elastic Container Registry) is AWS's managed Docker image registry.",
        difficulty: "easy",
      },
      {
        id: "s10-q04",
        sectionId: "s10",
        domain: 3,
        question: "An organization is already heavily invested in Kubernetes and wants a managed Kubernetes control plane on AWS. Which service should they use?",
        options: ["Amazon ECS", "Amazon EKS", "AWS Lambda", "AWS Elastic Beanstalk"],
        correct: [1],
        explanation: "Amazon EKS provides a managed Kubernetes control plane, ideal for teams standardized on Kubernetes.",
        difficulty: "easy",
      },
      {
        id: "s10-q05",
        sectionId: "s10",
        domain: 3,
        question: "Which AWS service would you use to build and expose a RESTful HTTP API that triggers a Lambda function for each request?",
        options: ["Amazon Route 53", "Amazon API Gateway", "AWS CloudFormation", "Amazon CloudFront"],
        correct: [1],
        explanation: "API Gateway is designed to create, publish, and manage APIs that can integrate directly with Lambda functions.",
        difficulty: "easy",
      },
      {
        id: "s10-q06",
        sectionId: "s10",
        domain: 3,
        question: "How does AWS Lambda pricing behave when a function is NOT being invoked?",
        options: [
          "You are charged a flat hourly fee regardless of invocations",
          "You are charged nothing - billing is based only on invocations and execution duration",
          "You are charged based on the memory allocated, even when idle",
          "You are charged a monthly subscription fee",
        ],
        correct: [1],
        explanation: "Lambda's pay-per-use model means there is no charge when the function is not running - true serverless pricing.",
        difficulty: "medium",
      },
      {
        id: "s10-q07",
        sectionId: "s10",
        domain: 3,
        question: "What does an ECS Task Definition specify?",
        options: [
          "The IAM users allowed to log into the AWS console",
          "The container image(s), CPU/memory requirements, and networking/port configuration for a task",
          "The DNS records for the application",
          "The billing alerts for the ECS cluster",
        ],
        correct: [1],
        explanation: "A Task Definition is the JSON blueprint for the containers that make up an ECS task, including images and resource requirements.",
        difficulty: "medium",
      },
      {
        id: "s10-q08",
        sectionId: "s10",
        domain: 3,
        question: "A company has a long-running (3+ hour) batch processing job. Which compute option is LEAST appropriate?",
        options: ["Amazon EC2", "ECS with EC2 launch type", "AWS Lambda", "Amazon EKS"],
        correct: [2],
        explanation: "Lambda's 15-minute maximum execution time makes it unsuitable for long-running batch jobs; EC2/ECS/EKS have no such limit.",
        difficulty: "medium",
      },
      {
        id: "s10-q09",
        sectionId: "s10",
        domain: 3,
        question: "Which statement BEST describes AWS Fargate?",
        options: [
          "A database engine compatible with PostgreSQL",
          "A serverless compute engine for containers, usable with ECS and EKS",
          "A content delivery network",
          "A managed DNS service",
        ],
        correct: [1],
        explanation: "Fargate is a serverless compute engine for containers that works with both ECS and EKS, removing the need to manage servers.",
        difficulty: "easy",
      },
      {
        id: "s10-q10",
        sectionId: "s10",
        domain: 3,
        question: "Which AWS Lambda capability allows it to handle a sudden spike from a few requests to thousands per second?",
        options: [
          "Manual provisioning of additional servers",
          "Automatic horizontal scaling managed by AWS",
          "Vertical scaling of a single instance",
          "Pre-purchased Reserved Capacity only",
        ],
        correct: [1],
        explanation: "Lambda automatically and horizontally scales the number of concurrent executions in response to incoming events.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 11 - Deployment & IaC: CloudFormation, CDK, Beanstalk, CI/CD
  // ===========================================================
  {
    section: {
      id: "s11",
      number: 11,
      title: "Deployment & IaC: CloudFormation, CDK, Elastic Beanstalk & CI/CD",
      summary:
        "Infrastructure as Code with CloudFormation and the CDK, application deployment with Elastic Beanstalk, and AWS's CI/CD toolchain.",
      domain: 3,
      estMinutes: 40,
      content: `
## Infrastructure as Code (IaC)
Instead of manually creating resources via the console, you describe your desired infrastructure in **code/templates** which can be version-controlled, reviewed, reused, and repeatedly deployed.

## AWS CloudFormation
- A **declarative** way of defining your AWS infrastructure using JSON or YAML templates.
- A **Stack** is the set of resources created/managed from a single template - resources are created, updated, or deleted **together**.
- Benefits:
  - Infrastructure as code - no manual resource creation, everything documented.
  - Cost tracking - resources within a stack are tagged, costs can be estimated.
  - Repeatable - reuse templates across environments/regions/accounts.
  - Automatic rollback on stack creation failure (configurable).
- **CloudFormation StackSets**: deploy stacks across multiple AWS accounts and regions with a single operation.

## AWS Cloud Development Kit (CDK)
- Define your cloud infrastructure using **familiar programming languages** (TypeScript, Python, Java, .NET, Go) instead of YAML/JSON.
- The CDK code is "compiled" into a CloudFormation template (JSON/YAML) and deployed via CloudFormation.
- Allows combining infrastructure (CDK) and runtime code (e.g., Lambda function code) in one place, with the full power of a programming language (loops, conditionals, abstractions).

## AWS Elastic Beanstalk
- A **Platform as a Service (PaaS)**, developer-centric way to deploy web applications quickly.
- Supports many platforms: Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker.
- Beanstalk manages: EC2 instances, Auto Scaling Groups, Load Balancers, and the application health monitoring - while you focus on your code.
- Components: **Application** (collection of components), **Application Version** (a specific, labeled iteration of deployable code), **Environment** (collection of AWS resources running an application version - e.g., "dev," "staging," "prod").
- You retain full control of the underlying resources (can access the EC2 instances if needed), but Beanstalk handles the heavy lifting of provisioning.

## AWS CI/CD Toolchain
- **AWS CodeCommit**: a managed private **Git repository** service (source control).
- **AWS CodeBuild**: a fully managed **build** service - compiles source code, runs tests, and produces software packages.
- **AWS CodeDeploy**: automates code **deployments** to EC2, on-premises servers, Lambda, or ECS.
- **AWS CodePipeline**: orchestrates the end-to-end **CI/CD pipeline** - source -> build -> test -> deploy, integrating the above services (and third parties like GitHub).
- **AWS CodeArtifact**: a managed artifact repository for software packages/dependencies (npm, Maven, PyPI, etc.).
- **AWS CodeStar / CodeGuru**: CodeStar provides a unified UI to manage software projects (largely superseded); **Amazon CodeGuru** uses ML to provide automated code reviews and application performance recommendations.

## Putting It Together
A typical CI/CD flow: a developer pushes code to **CodeCommit** (or GitHub) -> **CodePipeline** triggers -> **CodeBuild** compiles/tests the code -> **CodeDeploy** deploys the new version to **Elastic Beanstalk**, **EC2**, **ECS**, or **Lambda** - with the underlying infrastructure for all of it potentially defined via **CloudFormation** or the **CDK**.
`,
    },
    flashcards: [
      {
        id: "s11-f01",
        sectionId: "s11",
        front: "What is AWS CloudFormation and what format are templates written in?",
        back: "A declarative Infrastructure as Code service; templates are written in JSON or YAML and define a 'Stack' of resources managed together.",
      },
      {
        id: "s11-f02",
        sectionId: "s11",
        front: "What is a CloudFormation 'Stack'?",
        back: "The set of AWS resources created, updated, and deleted together as a single unit, based on a CloudFormation template.",
      },
      {
        id: "s11-f03",
        sectionId: "s11",
        front: "How does the AWS CDK relate to CloudFormation?",
        back: "CDK lets you define infrastructure using programming languages (TypeScript, Python, Java, etc.); the CDK code compiles down to a CloudFormation template, which is then deployed by CloudFormation.",
      },
      {
        id: "s11-f04",
        sectionId: "s11",
        front: "What type of service is AWS Elastic Beanstalk?",
        back: "A Platform as a Service (PaaS) for quickly deploying and managing web applications - it provisions EC2, ASGs, and load balancers for you.",
      },
      {
        id: "s11-f05",
        sectionId: "s11",
        front: "Name the three core Elastic Beanstalk components.",
        back: "Application, Application Version, and Environment (e.g., dev/staging/prod).",
      },
      {
        id: "s11-f06",
        sectionId: "s11",
        front: "What does AWS CodeCommit provide?",
        back: "A managed, private Git repository service for source control.",
      },
      {
        id: "s11-f07",
        sectionId: "s11",
        front: "What is the difference between CodeBuild, CodeDeploy, and CodePipeline?",
        back: "CodeBuild compiles/tests code and produces artifacts; CodeDeploy automates deploying code to compute targets (EC2, Lambda, ECS); CodePipeline orchestrates the full CI/CD workflow connecting these stages.",
      },
      {
        id: "s11-f08",
        sectionId: "s11",
        front: "What does Amazon CodeGuru do?",
        back: "Uses machine learning to provide automated code reviews and application performance recommendations.",
      },
    ],
    questions: [
      {
        id: "s11-q01",
        sectionId: "s11",
        domain: 3,
        question: "What is the primary benefit of using AWS CloudFormation to manage infrastructure?",
        options: [
          "It automatically writes application code for you",
          "It allows infrastructure to be defined as code, version-controlled, and repeatably deployed",
          "It replaces the need for IAM permissions",
          "It is the only way to launch EC2 instances",
        ],
        correct: [1],
        explanation: "CloudFormation's core value is treating infrastructure as code: documented, repeatable, and version-controlled deployments.",
        difficulty: "easy",
      },
      {
        id: "s11-q02",
        sectionId: "s11",
        domain: 3,
        question: "A development team wants to define their AWS infrastructure using TypeScript instead of writing raw YAML templates. Which tool should they use?",
        options: ["AWS CodeDeploy", "AWS CDK (Cloud Development Kit)", "AWS Config", "Amazon CodeGuru"],
        correct: [1],
        explanation: "The AWS CDK lets developers define infrastructure using general-purpose programming languages, which compile to CloudFormation templates.",
        difficulty: "easy",
      },
      {
        id: "s11-q03",
        sectionId: "s11",
        domain: 3,
        question: "Which AWS service is described as a Platform-as-a-Service (PaaS) that automatically provisions EC2 instances, load balancers, and auto-scaling for a web application?",
        options: ["AWS Lambda", "AWS Elastic Beanstalk", "Amazon ECS", "AWS CloudFormation"],
        correct: [1],
        explanation: "Elastic Beanstalk is AWS's PaaS offering - developers upload code and Beanstalk handles provisioning the supporting infrastructure.",
        difficulty: "easy",
      },
      {
        id: "s11-q04",
        sectionId: "s11",
        domain: 3,
        question: "Which AWS service provides a managed, private Git repository?",
        options: ["AWS CodeBuild", "AWS CodeCommit", "AWS CodePipeline", "AWS CodeArtifact"],
        correct: [1],
        explanation: "AWS CodeCommit is a fully managed source control service offering private Git repositories.",
        difficulty: "easy",
      },
      {
        id: "s11-q05",
        sectionId: "s11",
        domain: 3,
        question: "In a CI/CD pipeline, which service is responsible for compiling source code and running automated tests to produce deployable artifacts?",
        options: ["AWS CodeDeploy", "AWS CodePipeline", "AWS CodeBuild", "AWS CodeCommit"],
        correct: [2],
        explanation: "AWS CodeBuild is the build/test service that compiles source code and produces artifacts ready for deployment.",
        difficulty: "medium",
      },
      {
        id: "s11-q06",
        sectionId: "s11",
        domain: 3,
        question: "Which AWS service orchestrates the end-to-end workflow of source -> build -> test -> deploy?",
        options: ["AWS CodePipeline", "AWS CodeBuild", "AWS CodeCommit", "AWS CodeArtifact"],
        correct: [0],
        explanation: "AWS CodePipeline is the orchestration service that connects source, build, test, and deploy stages into a CI/CD pipeline.",
        difficulty: "easy",
      },
      {
        id: "s11-q07",
        sectionId: "s11",
        domain: 3,
        question: "A company needs to deploy the same CloudFormation stack consistently across 20 AWS accounts and multiple regions. What feature should they use?",
        options: ["CloudFormation Drift Detection", "CloudFormation StackSets", "AWS CDK Constructs only", "Elastic Beanstalk Environments"],
        correct: [1],
        explanation: "CloudFormation StackSets allow deploying and managing stacks across multiple accounts and regions from a single operation.",
        difficulty: "medium",
      },
      {
        id: "s11-q08",
        sectionId: "s11",
        domain: 3,
        question: "In Elastic Beanstalk terminology, what is an 'Environment'?",
        options: [
          "A specific labeled iteration of your application code",
          "A collection of AWS resources running a specific application version (e.g., 'staging')",
          "A Git branch in CodeCommit",
          "A CloudFormation template file",
        ],
        correct: [1],
        explanation: "An Elastic Beanstalk Environment is the collection of AWS resources (EC2, ELB, ASG, etc.) running a specific application version.",
        difficulty: "medium",
      },
      {
        id: "s11-q09",
        sectionId: "s11",
        domain: 3,
        question: "Which AWS service provides a managed repository for storing software dependencies such as npm or Maven packages?",
        options: ["AWS CodeArtifact", "AWS CodeStar", "AWS CodeGuru", "AWS CodeCommit"],
        correct: [0],
        explanation: "AWS CodeArtifact is a managed artifact repository service for software packages and dependencies.",
        difficulty: "medium",
      },
      {
        id: "s11-q10",
        sectionId: "s11",
        domain: 3,
        question: "What happens by default if a CloudFormation stack creation fails partway through?",
        options: [
          "The successfully created resources remain, and the failed ones are skipped",
          "CloudFormation automatically rolls back and removes the resources it created",
          "The stack is paused indefinitely awaiting manual intervention",
          "AWS charges a penalty fee for the failed stack",
        ],
        correct: [1],
        explanation: "By default, CloudFormation automatically rolls back (deletes) resources created during a failed stack creation, leaving no partial deployment.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 12 - Global Infrastructure: Route 53, CloudFront, Global Accelerator
  // ===========================================================
  {
    section: {
      id: "s12",
      number: 12,
      title: "Global Infrastructure: Route 53, CloudFront & Global Accelerator",
      summary:
        "DNS management with Route 53, content delivery with CloudFront, and improving global application performance with Global Accelerator.",
      domain: 3,
      estMinutes: 40,
      content: `
## Amazon Route 53
A highly available, scalable **managed DNS (Domain Name System)** service ("53" = the standard DNS port).
- Can also **register domain names** directly.
- Supports **health checks** to route traffic away from unhealthy resources.

### Routing Policies
- **Simple Routing**: route traffic to a single resource; no health checks.
- **Weighted Routing**: split traffic across multiple resources by assigned percentage weights (e.g., 90% to v1, 10% to v2 for canary testing).
- **Latency-based Routing**: route users to the resource/region with the **lowest latency** for them.
- **Failover Routing**: route to a primary resource, automatically failing over to a secondary if the primary's health check fails.
- **Geolocation Routing**: route based on the **geographic location** of the user (e.g., EU users to an EU endpoint).
- **Geoproximity Routing**: route based on geographic location of resources, with the ability to shift traffic via a "bias."
- **Multi-Value Answer Routing**: return multiple values/IPs and let the client choose; can be combined with health checks (not a substitute for a load balancer).

## Amazon CloudFront
A global **Content Delivery Network (CDN)** that improves the read performance of your application by caching content at **edge locations** worldwide.
- **Origin**: where CloudFront fetches content from - can be an **S3 bucket** (often combined with **Origin Access Control/OAC** so the bucket isn't publicly accessible), an **EC2 instance**, an **Application Load Balancer**, or any custom HTTP backend.
- Provides **DDoS protection**, integrates with AWS Shield and AWS WAF.
- Supports caching, signed URLs/cookies for restricted content, and geo-restriction.
- **CloudFront vs. cross-region S3 replication**: CloudFront caches content globally at edge locations with a global network for content that's accessed frequently (a CDN), whereas S3 replication creates asynchronous copies of the data in another region (useful for DR/compliance, not caching).

## AWS Global Accelerator
- Improves global application **availability and performance** by routing traffic through the **AWS global network** (instead of the public internet) to the closest "edge" location, then onward to your application endpoints (ALB, NLB, EC2, Elastic IPs) in the best AWS region.
- Provides **static anycast IP addresses** as a fixed entry point.
- Performs automatic failover to healthy endpoints across regions (within ~1 minute).
- Use case: non-HTTP use cases (gaming, IoT, VoIP) or improving performance for a global user base, in contrast to CloudFront which is focused on **caching** HTTP(S) content.

## CloudFront vs Global Accelerator (quick comparison)
| | CloudFront | Global Accelerator |
|---|---|---|
| Layer | Content caching (HTTP/HTTPS) | Network layer (TCP/UDP) routing |
| Best for | Static/dynamic web content, video, APIs | Non-HTTP use cases, fast regional failover, fixed IPs |
| Improves | Latency via edge caching | Latency via optimal routing over AWS backbone |
`,
    },
    flashcards: [
      {
        id: "s12-f01",
        sectionId: "s12",
        front: "What is Amazon Route 53, and where does its name come from?",
        back: "A managed, highly available DNS service that can also register domain names; '53' refers to the standard DNS port number.",
      },
      {
        id: "s12-f02",
        sectionId: "s12",
        front: "Which Route 53 routing policy splits traffic by percentage, useful for canary deployments?",
        back: "Weighted Routing - assign percentage weights to different resources/versions.",
      },
      {
        id: "s12-f03",
        sectionId: "s12",
        front: "Which Route 53 routing policy routes users to the resource with the lowest network latency?",
        back: "Latency-based Routing.",
      },
      {
        id: "s12-f04",
        sectionId: "s12",
        front: "Which Route 53 routing policy automatically redirects to a backup resource if the primary fails its health check?",
        back: "Failover Routing.",
      },
      {
        id: "s12-f05",
        sectionId: "s12",
        front: "What is Amazon CloudFront?",
        back: "A global Content Delivery Network (CDN) that caches content at edge locations worldwide to improve performance and reduce load on origins.",
      },
      {
        id: "s12-f06",
        sectionId: "s12",
        front: "What is the purpose of Origin Access Control (OAC) with CloudFront and S3?",
        back: "It restricts an S3 bucket so it can only be accessed via CloudFront, keeping the bucket itself private/non-public.",
      },
      {
        id: "s12-f07",
        sectionId: "s12",
        front: "What does AWS Global Accelerator provide as a fixed entry point to your application?",
        back: "Static anycast IP addresses that route traffic over the AWS global network to the optimal regional endpoint.",
      },
      {
        id: "s12-f08",
        sectionId: "s12",
        front: "How does CloudFront differ from Global Accelerator in terms of focus?",
        back: "CloudFront focuses on caching HTTP/HTTPS content at edge locations (CDN); Global Accelerator focuses on optimal network routing (TCP/UDP) to regional endpoints, including non-HTTP use cases.",
      },
    ],
    questions: [
      {
        id: "s12-q01",
        sectionId: "s12",
        domain: 3,
        question: "A company wants to send 90% of traffic to their current application version and 10% to a new version for canary testing using Route 53. Which routing policy should they use?",
        options: ["Simple Routing", "Weighted Routing", "Latency-based Routing", "Geolocation Routing"],
        correct: [1],
        explanation: "Weighted Routing splits traffic across resources by assigned percentage weights, ideal for canary releases.",
        difficulty: "easy",
      },
      {
        id: "s12-q02",
        sectionId: "s12",
        domain: 3,
        question: "What is the primary purpose of Amazon CloudFront?",
        options: [
          "To provide managed DNS services",
          "To cache and deliver content from edge locations close to users, improving performance",
          "To run serverless functions",
          "To provide a private Git repository",
        ],
        correct: [1],
        explanation: "CloudFront is a CDN that caches content at globally distributed edge locations to reduce latency and offload origins.",
        difficulty: "easy",
      },
      {
        id: "s12-q03",
        sectionId: "s12",
        domain: 3,
        question: "A company stores their website's static assets in a private S3 bucket and wants only CloudFront to be able to read from it. What should they configure?",
        options: ["S3 Cross-Region Replication", "Origin Access Control (OAC)", "Route 53 Failover Routing", "AWS Global Accelerator"],
        correct: [1],
        explanation: "Origin Access Control (OAC) restricts S3 bucket access so that only the associated CloudFront distribution can retrieve objects.",
        difficulty: "medium",
      },
      {
        id: "s12-q04",
        sectionId: "s12",
        domain: 3,
        question: "Which Route 53 routing policy would route European users to an endpoint in eu-west-1 and US users to an endpoint in us-east-1 based on the user's location?",
        options: ["Weighted Routing", "Geolocation Routing", "Multi-Value Answer Routing", "Simple Routing"],
        correct: [1],
        explanation: "Geolocation Routing routes traffic based on the geographic location of the requesting user.",
        difficulty: "medium",
      },
      {
        id: "s12-q05",
        sectionId: "s12",
        domain: 3,
        question: "A gaming company needs a fixed set of IP addresses as an entry point to their global UDP-based game servers, with fast failover between regions. Which service is the BEST fit?",
        options: ["Amazon CloudFront", "Amazon Route 53 Simple Routing", "AWS Global Accelerator", "AWS Glue"],
        correct: [2],
        explanation: "Global Accelerator provides static anycast IPs and routes UDP/TCP traffic over the AWS global network with fast regional failover - ideal for non-HTTP use cases like gaming.",
        difficulty: "medium",
      },
      {
        id: "s12-q06",
        sectionId: "s12",
        domain: 3,
        question: "What does a Route 53 'Failover Routing' policy require to function correctly?",
        options: [
          "A configured health check on the primary resource",
          "Weighted records for every resource",
          "An S3 bucket as the origin",
          "Geolocation tags on every record",
        ],
        correct: [0],
        explanation: "Failover Routing relies on a health check for the primary resource - if it fails, traffic shifts to the secondary resource.",
        difficulty: "medium",
      },
      {
        id: "s12-q07",
        sectionId: "s12",
        domain: 3,
        question: "Which of the following can be a CloudFront origin?",
        options: [
          "Only Amazon S3 buckets",
          "An S3 bucket, EC2 instance, Application Load Balancer, or any custom HTTP backend",
          "Only Application Load Balancers",
          "Only on-premises servers",
        ],
        correct: [1],
        explanation: "CloudFront supports multiple origin types including S3, EC2, ALB, and custom HTTP origins.",
        difficulty: "medium",
      },
      {
        id: "s12-q08",
        sectionId: "s12",
        domain: 3,
        question: "What is the main difference between CloudFront and S3 Cross-Region Replication?",
        options: [
          "They are functionally identical",
          "CloudFront caches content at edge locations for performance (CDN); S3 CRR creates asynchronous regional copies for durability/compliance",
          "S3 CRR is a CDN and CloudFront is a replication tool",
          "CloudFront only works with DynamoDB",
        ],
        correct: [1],
        explanation: "CloudFront is a CDN focused on caching for performance; S3 Cross-Region Replication asynchronously copies data to another region for DR/compliance purposes.",
        difficulty: "medium",
      },
      {
        id: "s12-q09",
        sectionId: "s12",
        domain: 3,
        question: "Besides DNS hosting, what other capability does Amazon Route 53 provide?",
        options: ["Domain name registration", "Container orchestration", "Object storage", "Email hosting"],
        correct: [0],
        explanation: "Route 53 can both host DNS records for domains and register new domain names directly.",
        difficulty: "easy",
      },
      {
        id: "s12-q10",
        sectionId: "s12",
        domain: 3,
        question: "A company's application returns multiple healthy IP addresses for a single DNS name, letting the client pick one, with unhealthy IPs automatically removed. Which Route 53 policy is this?",
        options: ["Multi-Value Answer Routing", "Latency-based Routing", "Geoproximity Routing", "Weighted Routing"],
        correct: [0],
        explanation: "Multi-Value Answer Routing returns multiple healthy IP addresses and can incorporate health checks, though it is not a substitute for a full load balancer.",
        difficulty: "hard",
      },
    ],
  },
];

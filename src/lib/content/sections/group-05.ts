import type { SectionBundle } from "../types";

export const group05: SectionBundle[] = [
  // ===========================================================
  // Section 13 - Cloud Integration: SQS, SNS, Kinesis, Amazon MQ
  // ===========================================================
  {
    section: {
      id: "s13",
      number: 13,
      title: "Cloud Integration: SQS, SNS, Kinesis & Amazon MQ",
      summary:
        "Decoupling applications with queues (SQS), pub/sub messaging (SNS), real-time data streaming (Kinesis), and traditional message brokers (Amazon MQ).",
      domain: 3,
      estMinutes: 40,
      content: `
## Why Application Integration?
As applications move toward microservices, you need ways for components to communicate **without being tightly coupled** or directly dependent on each other being available at the same time. AWS provides three core integration services: **SQS** (queue), **SNS** (pub/sub), and **Kinesis** (real-time streaming).

## Amazon SQS (Simple Queue Service)
- A fully managed **message queuing** service - producers send messages to a queue, consumers poll and process them, then delete the message.
- **Decouples** application components - producers and consumers don't need to run at the same time or rate.
- **Standard Queue**: nearly unlimited throughput, messages may be delivered **more than once** and **out of order** (best-effort ordering).
- **FIFO Queue**: First-In-First-Out delivery, messages processed exactly once, limited throughput (up to 3,000 msg/sec with batching).
- **Visibility Timeout**: when a consumer reads a message, it becomes "invisible" to other consumers for this period (default 30s) - if not processed/deleted in time, it becomes visible again for redelivery.
- **Dead Letter Queue (DLQ)**: a separate queue where messages that fail processing repeatedly (exceeding a "maxReceiveCount") are sent for troubleshooting.
- Often used with **Auto Scaling** to scale consumers based on queue length.

## Amazon SNS (Simple Notification Service)
- A **publish/subscribe (pub/sub)** messaging service - a publisher sends a message to a **topic**, and ALL subscribers to that topic receive it.
- Subscribers can be: SQS queues, Lambda functions, HTTP(S) endpoints, email, SMS, mobile push notifications.
- **SNS + SQS "Fan-Out" pattern**: publish once to an SNS topic, fan out to multiple SQS queues for independent processing - ensures no data loss and decouples multiple downstream services.

## Amazon Kinesis
A family of services for collecting, processing, and analyzing real-time streaming data at scale:
- **Kinesis Data Streams**: low-latency streaming ingestion at scale (e.g., clickstreams, IoT telemetry); data is divided into **shards**; data is retained for a configurable period (default 24 hours, up to 365 days) and can be consumed by multiple consumers; you manage scaling (shards) and retention.
- **Kinesis Data Firehose**: a **fully managed** service to load streaming data into destinations such as S3, Redshift, OpenSearch, or third-party tools - near real-time, fully managed, "fire and forget."
- **Kinesis Data Analytics**: run SQL or Apache Flink applications directly on streaming data for real-time analytics.

## Amazon MQ
- A managed message broker service for **traditional message brokers** - supports **Apache ActiveMQ** and **RabbitMQ**, using standard protocols (JMS, AMQP, MQTT, STOMP, OpenWire).
- Use when **migrating** an existing application that already uses one of these brokers and you don't want to re-architect to SQS/SNS (which use AWS-specific APIs).
- SQS and SNS are "cloud-native," highly scalable, but require using the AWS SDK/API; Amazon MQ supports industry-standard protocols out of the box.

## Quick Comparison
| Service | Pattern | Use Case |
|---|---|---|
| **SQS** | Queue (point-to-point) | Decouple producer/consumer, buffer work |
| **SNS** | Pub/Sub (fan-out) | Broadcast a message to multiple subscribers |
| **Kinesis** | Real-time streaming | High-throughput, ordered, real-time data ingestion/analytics |
| **Amazon MQ** | Traditional broker | Migrating apps using JMS/AMQP/MQTT with minimal changes |
`,
    },
    flashcards: [
      {
        id: "s13-f01",
        sectionId: "s13",
        front: "What problem does Amazon SQS solve between application components?",
        back: "It decouples producers and consumers via a managed message queue, so they don't need to run simultaneously or at the same rate.",
      },
      {
        id: "s13-f02",
        sectionId: "s13",
        front: "What's the key difference between SQS Standard and FIFO queues?",
        back: "Standard: nearly unlimited throughput, best-effort ordering, possible duplicate delivery. FIFO: strict ordering and exactly-once processing, but limited throughput.",
      },
      {
        id: "s13-f03",
        sectionId: "s13",
        front: "What is the SQS Visibility Timeout?",
        back: "The period after a consumer reads a message during which it's hidden from other consumers; if not deleted/processed in time, it becomes visible again (default 30 seconds).",
      },
      {
        id: "s13-f04",
        sectionId: "s13",
        front: "What is an SQS Dead Letter Queue (DLQ) used for?",
        back: "To capture messages that repeatedly fail processing (exceed maxReceiveCount), so they can be inspected/debugged separately.",
      },
      {
        id: "s13-f05",
        sectionId: "s13",
        front: "What messaging pattern does Amazon SNS implement?",
        back: "Publish/Subscribe (pub/sub) - a message published to a topic is delivered to ALL of that topic's subscribers.",
      },
      {
        id: "s13-f06",
        sectionId: "s13",
        front: "What is the SNS + SQS 'fan-out' pattern?",
        back: "Publishing one message to an SNS topic that fans out to multiple SQS queues, allowing several services to independently and reliably process the same event.",
      },
      {
        id: "s13-f07",
        sectionId: "s13",
        front: "What's the difference between Kinesis Data Streams and Kinesis Data Firehose?",
        back: "Data Streams: you manage shards/scaling/retention for custom real-time consumers. Firehose: fully managed, automatically delivers streaming data to destinations like S3/Redshift, no shard management.",
      },
      {
        id: "s13-f08",
        sectionId: "s13",
        front: "When would you choose Amazon MQ over SQS/SNS?",
        back: "When migrating an existing application that uses traditional protocols (JMS, AMQP, MQTT, STOMP) with brokers like ActiveMQ/RabbitMQ, to avoid re-architecting to AWS-native APIs.",
      },
    ],
    questions: [
      {
        id: "s13-q01",
        sectionId: "s13",
        domain: 3,
        question: "Which AWS service is best suited to decouple a producer and consumer so they don't need to be available at the same time?",
        options: ["Amazon SNS", "Amazon SQS", "Amazon Kinesis Data Streams", "Amazon CloudFront"],
        correct: [1],
        explanation: "SQS is a managed queue service designed specifically to decouple producers and consumers.",
        difficulty: "easy",
      },
      {
        id: "s13-q02",
        sectionId: "s13",
        domain: 3,
        question: "An order processing system requires messages to be processed in the EXACT order they were sent, with no duplicates. Which SQS queue type should be used?",
        options: ["Standard Queue", "FIFO Queue", "Dead Letter Queue", "Delay Queue"],
        correct: [1],
        explanation: "FIFO queues guarantee strict ordering and exactly-once processing, unlike Standard queues.",
        difficulty: "easy",
      },
      {
        id: "s13-q03",
        sectionId: "s13",
        domain: 3,
        question: "A company wants a single event to be delivered to three different downstream systems (an SQS queue, a Lambda function, and an email address) simultaneously. Which service enables this?",
        options: ["Amazon SQS", "Amazon SNS", "Amazon Kinesis Data Firehose", "Amazon MQ"],
        correct: [1],
        explanation: "SNS pub/sub topics can fan out a single published message to multiple heterogeneous subscriber types at once.",
        difficulty: "easy",
      },
      {
        id: "s13-q04",
        sectionId: "s13",
        domain: 3,
        question: "What happens if an SQS consumer reads a message but fails to delete it before the visibility timeout expires?",
        options: [
          "The message is permanently lost",
          "The message becomes visible again and may be delivered to another consumer",
          "The queue is automatically deleted",
          "The message is sent to SNS",
        ],
        correct: [1],
        explanation: "If a message isn't deleted before the visibility timeout expires, it becomes visible again for redelivery to consumers.",
        difficulty: "medium",
      },
      {
        id: "s13-q05",
        sectionId: "s13",
        domain: 3,
        question: "A company wants to continuously load clickstream data into S3 for later analysis, with minimal operational overhead and no shard management. Which service fits best?",
        options: ["Kinesis Data Streams", "Kinesis Data Firehose", "Amazon SQS", "Amazon MQ"],
        correct: [1],
        explanation: "Kinesis Data Firehose is a fully managed service that automatically delivers streaming data to destinations like S3 without managing shards.",
        difficulty: "medium",
      },
      {
        id: "s13-q06",
        sectionId: "s13",
        domain: 3,
        question: "Which Kinesis service allows you to run real-time SQL queries directly against a streaming data source?",
        options: ["Kinesis Data Streams", "Kinesis Data Firehose", "Kinesis Data Analytics", "Kinesis Video Streams"],
        correct: [2],
        explanation: "Kinesis Data Analytics enables real-time SQL (or Apache Flink) processing directly on streaming data.",
        difficulty: "medium",
      },
      {
        id: "s13-q07",
        sectionId: "s13",
        domain: 3,
        question: "A legacy application uses JMS and an Apache ActiveMQ broker. The company wants to move it to AWS with minimal code changes. Which service should they use?",
        options: ["Amazon SQS", "Amazon SNS", "Amazon MQ", "Amazon Kinesis"],
        correct: [2],
        explanation: "Amazon MQ supports industry-standard protocols like JMS/AMQP with ActiveMQ/RabbitMQ, easing migration without rewriting to AWS-native APIs.",
        difficulty: "medium",
      },
      {
        id: "s13-q08",
        sectionId: "s13",
        domain: 3,
        question: "What is the purpose of a Dead Letter Queue (DLQ) in SQS?",
        options: [
          "To increase queue throughput",
          "To capture messages that fail processing repeatedly for later troubleshooting",
          "To encrypt messages at rest",
          "To replicate messages across regions",
        ],
        correct: [1],
        explanation: "A DLQ receives messages that have exceeded the maximum receive count without successful processing, isolating problematic messages.",
        difficulty: "medium",
      },
      {
        id: "s13-q09",
        sectionId: "s13",
        domain: 3,
        question: "Which statement about SQS Standard queues is TRUE?",
        options: [
          "They guarantee exactly-once delivery",
          "They guarantee strict message ordering",
          "They offer nearly unlimited throughput but only best-effort ordering and possible duplicates",
          "They cannot be used with Auto Scaling",
        ],
        correct: [2],
        explanation: "SQS Standard queues prioritize throughput and availability over strict ordering, allowing occasional duplicates and out-of-order delivery.",
        difficulty: "medium",
      },
      {
        id: "s13-q10",
        sectionId: "s13",
        domain: 3,
        question: "In a Kinesis Data Stream, how is data partitioned and scaled?",
        options: [
          "Using SQS queues",
          "Using shards, which determine throughput capacity",
          "Using S3 buckets",
          "Using IAM roles",
        ],
        correct: [1],
        explanation: "Kinesis Data Streams divide data into shards, and the number of shards determines the stream's throughput capacity.",
        difficulty: "hard",
      },
    ],
  },

  // ===========================================================
  // Section 14 - Monitoring: CloudWatch, CloudTrail, X-Ray, EventBridge
  // ===========================================================
  {
    section: {
      id: "s14",
      number: 14,
      title: "Monitoring: CloudWatch, CloudTrail, X-Ray & EventBridge",
      summary:
        "Observability across AWS: metrics and alarms (CloudWatch), API activity auditing (CloudTrail), distributed tracing (X-Ray), and event-driven automation (EventBridge).",
      domain: 1,
      estMinutes: 40,
      content: `
## Amazon CloudWatch
The core AWS **monitoring and observability** service.
- **CloudWatch Metrics**: numerical data points over time (e.g., EC2 CPUUtilization, RDS connections) - many services publish metrics automatically; you can also publish **custom metrics**.
- **CloudWatch Alarms**: trigger notifications or actions (e.g., Auto Scaling, SNS notification, EC2 reboot/stop) when a metric crosses a threshold - states: OK, ALARM, INSUFFICIENT_DATA.
- **CloudWatch Logs**: collect, monitor, and store log files from EC2, Lambda, and other services; supports log groups/streams, retention policies, and metric filters (e.g., count occurrences of "ERROR" and alarm on it).
- **CloudWatch Dashboards**: create custom visualizations of metrics across services and regions.
- **CloudWatch Events / EventBridge**: react to changes in your AWS environment (see EventBridge below - CloudWatch Events is the predecessor/alias).

## AWS CloudTrail
- Provides **governance, compliance, and audit** for your AWS account by recording **API calls/activity** made within your account (Console, SDK, CLI, other AWS services).
- Answers: "**Who** did **what**, **when**, and **from where**?"
- Enabled by default for the last 90 days of management events; can create a **Trail** to log events to S3 for long-term retention and analysis (e.g., with Athena).
- Useful for security analysis, troubleshooting, and compliance auditing.

## AWS X-Ray
- Provides **distributed tracing** - visualize and analyze how requests flow through the different components of a distributed/microservices application.
- Helps identify performance bottlenecks, debug errors, and understand dependencies between services (e.g., API Gateway -> Lambda -> DynamoDB).
- Produces a **service map** showing latency and error rates per component.

## Amazon EventBridge (formerly CloudWatch Events)
- A **serverless event bus** that connects application data from your own apps, SaaS apps (partner event sources), and AWS services.
- **Rules**: match incoming events (or run on a **schedule**, similar to cron) and route them to **targets** (Lambda, SQS, SNS, Step Functions, etc.).
- **Event Buses**: default bus (AWS service events), custom buses (your own application events), partner buses (SaaS integrations).
- Use cases: scheduled tasks (e.g., trigger a Lambda every hour), reacting to AWS resource state changes (e.g., EC2 instance state change -> notify via SNS).

## Bringing It Together
- **CloudWatch** = "what is happening right now / over time" (metrics, logs, alarms).
- **CloudTrail** = "who did what" (audit trail of API activity).
- **X-Ray** = "why is this request slow / where did it fail" (tracing across services).
- **EventBridge** = "when X happens, do Y" (event-driven automation and scheduling).
`,
    },
    flashcards: [
      {
        id: "s14-f01",
        sectionId: "s14",
        front: "What types of data does Amazon CloudWatch primarily work with?",
        back: "Metrics (numerical data over time), Logs (log files from services/apps), Alarms (threshold-based notifications/actions), and Dashboards (visualizations).",
      },
      {
        id: "s14-f02",
        sectionId: "s14",
        front: "What are the three possible states of a CloudWatch Alarm?",
        back: "OK, ALARM, and INSUFFICIENT_DATA.",
      },
      {
        id: "s14-f03",
        sectionId: "s14",
        front: "What question does AWS CloudTrail primarily answer?",
        back: "Who did what, when, and from where - it logs API calls/activity across your AWS account for governance, compliance, and auditing.",
      },
      {
        id: "s14-f04",
        sectionId: "s14",
        front: "How long does CloudTrail retain management event history by default, without creating a Trail?",
        back: "90 days; creating a Trail allows you to log events to S3 for long-term retention.",
      },
      {
        id: "s14-f05",
        sectionId: "s14",
        front: "What is AWS X-Ray used for?",
        back: "Distributed tracing - visualizing how requests flow through microservices/distributed applications, identifying bottlenecks and errors via a service map.",
      },
      {
        id: "s14-f06",
        sectionId: "s14",
        front: "What is Amazon EventBridge?",
        back: "A serverless event bus that routes events from AWS services, your apps, or SaaS partners to targets (like Lambda, SQS, SNS) based on rules, including scheduled (cron-like) rules.",
      },
      {
        id: "s14-f07",
        sectionId: "s14",
        front: "Can you create custom CloudWatch metrics for your own application?",
        back: "Yes - in addition to metrics AWS services publish automatically, you can publish custom application-specific metrics to CloudWatch.",
      },
      {
        id: "s14-f08",
        sectionId: "s14",
        front: "What CloudWatch feature lets you alarm based on patterns found within log data (e.g., count of 'ERROR' strings)?",
        back: "CloudWatch Logs Metric Filters - they extract metrics from log data which can then trigger alarms.",
      },
    ],
    questions: [
      {
        id: "s14-q01",
        sectionId: "s14",
        domain: 1,
        question: "Which AWS service would you use to answer 'which IAM user deleted this S3 bucket and when?'",
        options: ["Amazon CloudWatch", "AWS CloudTrail", "AWS X-Ray", "Amazon EventBridge"],
        correct: [1],
        explanation: "CloudTrail records API activity, providing a historical audit trail of who performed which actions and when.",
        difficulty: "easy",
      },
      {
        id: "s14-q02",
        sectionId: "s14",
        domain: 1,
        question: "Which AWS service triggers an Auto Scaling action when EC2 average CPU utilization exceeds 70% for 5 minutes?",
        options: ["AWS CloudTrail", "CloudWatch Alarms", "AWS X-Ray", "AWS Config"],
        correct: [1],
        explanation: "CloudWatch Alarms monitor metrics like CPUUtilization and can trigger actions (such as Auto Scaling policies) when thresholds are crossed.",
        difficulty: "easy",
      },
      {
        id: "s14-q03",
        sectionId: "s14",
        domain: 1,
        question: "A development team wants to visualize how a request flows through API Gateway, multiple Lambda functions, and DynamoDB to find a performance bottleneck. Which service should they use?",
        options: ["Amazon CloudWatch Logs", "AWS X-Ray", "AWS CloudTrail", "Amazon EventBridge"],
        correct: [1],
        explanation: "AWS X-Ray provides distributed tracing and a service map to visualize request flow and identify bottlenecks across services.",
        difficulty: "easy",
      },
      {
        id: "s14-q04",
        sectionId: "s14",
        domain: 1,
        question: "A company wants to run a Lambda function automatically every night at 2 AM. Which service should they use?",
        options: ["AWS CloudTrail", "Amazon EventBridge (scheduled rule)", "AWS X-Ray", "Amazon CloudWatch Dashboards"],
        correct: [1],
        explanation: "EventBridge supports scheduled (cron-like) rules that can trigger targets such as Lambda functions on a recurring schedule.",
        difficulty: "easy",
      },
      {
        id: "s14-q05",
        sectionId: "s14",
        domain: 1,
        question: "By default, for how many days does AWS CloudTrail retain a history of management events without any additional configuration?",
        options: ["7 days", "30 days", "90 days", "365 days"],
        correct: [2],
        explanation: "CloudTrail retains the last 90 days of management event history by default, even without creating a Trail.",
        difficulty: "medium",
      },
      {
        id: "s14-q06",
        sectionId: "s14",
        domain: 1,
        question: "Which CloudWatch alarm state indicates that the metric data needed to evaluate the alarm is not yet available?",
        options: ["OK", "ALARM", "INSUFFICIENT_DATA", "PENDING"],
        correct: [2],
        explanation: "INSUFFICIENT_DATA indicates CloudWatch doesn't yet have enough data points to determine the alarm state.",
        difficulty: "medium",
      },
      {
        id: "s14-q07",
        sectionId: "s14",
        domain: 1,
        question: "A security team wants long-term storage and the ability to query historical API activity logs using SQL. What is the recommended approach?",
        options: [
          "Rely solely on the CloudTrail 90-day default history",
          "Create a CloudTrail Trail that delivers logs to S3, then query with Athena",
          "Use CloudWatch Alarms",
          "Use AWS X-Ray traces",
        ],
        correct: [1],
        explanation: "Creating a CloudTrail Trail to deliver logs to S3 enables long-term retention and SQL querying via Athena.",
        difficulty: "medium",
      },
      {
        id: "s14-q08",
        sectionId: "s14",
        domain: 1,
        question: "Which EventBridge concept defines the conditions for matching incoming events and where to send them?",
        options: ["Event Bus", "Rule", "Trail", "Dashboard"],
        correct: [1],
        explanation: "EventBridge Rules define event-matching patterns (or schedules) and the targets that matched events are routed to.",
        difficulty: "medium",
      },
      {
        id: "s14-q09",
        sectionId: "s14",
        domain: 1,
        question: "A company wants to be alerted whenever the word 'ERROR' appears more than 10 times in 5 minutes within their application's CloudWatch Logs. What should they configure?",
        options: [
          "An AWS X-Ray trace",
          "A CloudWatch Logs Metric Filter combined with a CloudWatch Alarm",
          "An EventBridge custom event bus",
          "A CloudTrail Trail",
        ],
        correct: [1],
        explanation: "A metric filter extracts a count of matching log patterns into a CloudWatch metric, which can then drive an alarm.",
        difficulty: "hard",
      },
      {
        id: "s14-q10",
        sectionId: "s14",
        domain: 1,
        question: "What was Amazon EventBridge previously known as?",
        options: ["CloudWatch Events", "CloudTrail Events", "Simple Notification Service", "AWS Config Rules"],
        correct: [0],
        explanation: "Amazon EventBridge is the evolution of (and largely backward-compatible with) the earlier CloudWatch Events service.",
        difficulty: "easy",
      },
    ],
  },

  // ===========================================================
  // Section 15 - VPC & Networking
  // ===========================================================
  {
    section: {
      id: "s15",
      number: 15,
      title: "VPC & Networking Fundamentals",
      summary:
        "Virtual Private Clouds, subnets, gateways, route tables, security layers (NACLs vs Security Groups), and connectivity options like VPN, Direct Connect, and Transit Gateway.",
      domain: 3,
      estMinutes: 45,
      content: `
## Amazon VPC (Virtual Private Cloud)
- A **private, isolated network** you define within an AWS Region - your own virtual data center in the cloud.
- A VPC spans **all AZs** in a region; **subnets** are created within a single AZ and have a defined CIDR range (subset of the VPC's CIDR).
- **Public Subnet**: has a route to an **Internet Gateway (IGW)** - resources can have public IPs and be reached from the internet.
- **Private Subnet**: no direct route to the internet - used for databases, internal application servers.
- AWS creates a **Default VPC** in every region, with default subnets in every AZ (public by default) - good for getting started quickly.

## Internet & NAT Gateways
- **Internet Gateway (IGW)**: allows resources in public subnets to connect to the internet; must be attached to the VPC and referenced in a route table.
- **NAT Gateway** (managed by AWS) / **NAT Instance** (self-managed on EC2): allows instances in a **private subnet** to initiate outbound connections to the internet (e.g., for software updates) **without** allowing inbound connections from the internet. NAT Gateways are deployed in a public subnet, are AZ-specific, and scale automatically.

## Route Tables
- Determine where network traffic from a subnet is directed (e.g., local traffic stays in the VPC, 0.0.0.0/0 -> Internet Gateway for public subnets).
- Each subnet must be associated with a route table (or uses the VPC's main route table by default).

## Security Layers: NACLs vs Security Groups
| | Network ACL (NACL) | Security Group |
|---|---|---|
| Level | Subnet level | Instance/ENI level |
| Rules | Allow AND Deny rules | Allow rules only |
| State | Stateless (return traffic must be explicitly allowed) | Stateful (return traffic automatically allowed) |
| Evaluation | Rules processed in order by rule number | All rules evaluated |
| Default | Default NACL allows all traffic | New SGs deny all inbound by default |

## VPC Peering
- Connects two VPCs **privately**, allowing them to communicate using **private IP addresses** as if they were on the same network.
- VPCs can be in the same or different accounts/regions, but **CIDR ranges must not overlap**.
- Peering connections are **not transitive** - if VPC A is peered with B, and B with C, A and C cannot communicate through B unless A is also directly peered with C.

## VPC Endpoints
- Allow you to privately connect your VPC to supported AWS services **without** going over the public internet (and without needing an IGW/NAT).
- **Gateway Endpoints**: for **S3** and **DynamoDB** only - added as a route table entry.
- **Interface Endpoints**: for most other AWS services (e.g., SSM, SNS, KMS) - creates an Elastic Network Interface with a private IP, powered by AWS PrivateLink.

## Connecting On-Premises to AWS
- **Site-to-Site VPN**: encrypted connection over the **public internet** between your on-premises network (via a Customer Gateway) and your VPC (via a Virtual Private Gateway) - quick to set up, but subject to internet variability.
- **AWS Direct Connect (DX)**: a **dedicated, private physical network connection** from your data center to AWS - more reliable, higher bandwidth, lower latency than VPN, but takes longer (weeks/months) to provision. Not encrypted by default (can layer VPN over DX for encryption).
- **AWS Transit Gateway**: a central hub that simplifies connecting many VPCs and on-premises networks together through a single gateway, avoiding complex many-to-many peering ("hub and spoke" model).

## Shared Responsibility for Networking
- **AWS**: protects the global network infrastructure (against common attacks), provides the building blocks (VPC, subnets, gateways).
- **Customer**: designs the VPC/subnet layout, configures security groups/NACLs, route tables, and decides which resources are public vs. private.
`,
    },
    flashcards: [
      {
        id: "s15-f01",
        sectionId: "s15",
        front: "What is the difference between a public subnet and a private subnet?",
        back: "A public subnet has a route to an Internet Gateway (resources can be reached from/reach the internet directly); a private subnet has no such direct route.",
      },
      {
        id: "s15-f02",
        sectionId: "s15",
        front: "What does a NAT Gateway allow, and what does it NOT allow?",
        back: "It allows instances in a private subnet to initiate outbound internet connections (e.g., updates), but does NOT allow unsolicited inbound connections from the internet.",
      },
      {
        id: "s15-f03",
        sectionId: "s15",
        front: "List the key differences between Network ACLs and Security Groups.",
        back: "NACLs: subnet-level, support Allow AND Deny, stateless, rules processed in order. Security Groups: instance-level, Allow rules only, stateful, all rules evaluated.",
      },
      {
        id: "s15-f04",
        sectionId: "s15",
        front: "What is VPC Peering, and what is its main limitation regarding transitivity?",
        back: "A private connection between two VPCs using private IPs; peering is NOT transitive - A peered with B and B peered with C does not let A talk to C.",
      },
      {
        id: "s15-f05",
        sectionId: "s15",
        front: "What is required for VPC Peering to work regarding CIDR ranges?",
        back: "The CIDR ranges of the two VPCs must NOT overlap.",
      },
      {
        id: "s15-f06",
        sectionId: "s15",
        front: "What's the difference between a Gateway VPC Endpoint and an Interface VPC Endpoint?",
        back: "Gateway Endpoints work only for S3 and DynamoDB (added as a route table entry). Interface Endpoints (via PrivateLink) work for most other AWS services and create an ENI with a private IP in your subnet.",
      },
      {
        id: "s15-f07",
        sectionId: "s15",
        front: "Compare Site-to-Site VPN and AWS Direct Connect.",
        back: "Site-to-Site VPN: encrypted, over the public internet, quick to set up, variable performance. Direct Connect: dedicated private physical link, more reliable/higher bandwidth/lower latency, but takes weeks/months to provision and isn't encrypted by default.",
      },
      {
        id: "s15-f08",
        sectionId: "s15",
        front: "What problem does AWS Transit Gateway solve?",
        back: "It acts as a central hub to connect many VPCs and on-premises networks, avoiding the complexity of many-to-many VPC peering relationships.",
      },
    ],
    questions: [
      {
        id: "s15-q01",
        sectionId: "s15",
        domain: 3,
        question: "What distinguishes a public subnet from a private subnet in a VPC?",
        options: [
          "Public subnets have larger CIDR ranges",
          "Public subnets have a route to an Internet Gateway; private subnets do not",
          "Private subnets cannot contain EC2 instances",
          "Public subnets are free of charge",
        ],
        correct: [1],
        explanation: "The defining feature of a public subnet is a route table entry pointing to an Internet Gateway.",
        difficulty: "easy",
      },
      {
        id: "s15-q02",
        sectionId: "s15",
        domain: 3,
        question: "An EC2 instance in a private subnet needs to download OS security updates from the internet, but must NOT be reachable from the internet. What should be used?",
        options: ["Internet Gateway", "NAT Gateway", "VPC Peering", "Direct Connect"],
        correct: [1],
        explanation: "A NAT Gateway allows outbound-only internet access for private subnet resources, blocking unsolicited inbound connections.",
        difficulty: "easy",
      },
      {
        id: "s15-q03",
        sectionId: "s15",
        domain: 3,
        question: "Which statement correctly describes Network ACLs (NACLs)?",
        options: [
          "They are stateful and operate at the instance level",
          "They are stateless, operate at the subnet level, and support both Allow and Deny rules",
          "They only support Allow rules, like Security Groups",
          "They cannot be associated with multiple subnets",
        ],
        correct: [1],
        explanation: "NACLs are stateless, apply at the subnet level, and uniquely support explicit Deny rules in addition to Allow.",
        difficulty: "medium",
      },
      {
        id: "s15-q04",
        sectionId: "s15",
        domain: 3,
        question: "Company A's VPC (10.0.0.0/16) wants to peer with Company B's VPC (10.0.5.0/24). What is the issue?",
        options: [
          "VPC Peering requires the same AWS account",
          "The CIDR ranges overlap, which is not allowed for VPC Peering",
          "VPC Peering only works within a single AZ",
          "There is no issue; this configuration works fine",
        ],
        correct: [1],
        explanation: "10.0.5.0/24 is a subset of 10.0.0.0/16, meaning the CIDR ranges overlap - VPC Peering requires non-overlapping CIDR ranges.",
        difficulty: "hard",
      },
      {
        id: "s15-q05",
        sectionId: "s15",
        domain: 3,
        question: "Which VPC Endpoint type is used to privately access Amazon S3 from within a VPC by adding an entry to the route table?",
        options: ["Interface Endpoint", "Gateway Endpoint", "PrivateLink Endpoint", "NAT Endpoint"],
        correct: [1],
        explanation: "Gateway Endpoints (for S3 and DynamoDB only) are implemented via route table entries.",
        difficulty: "medium",
      },
      {
        id: "s15-q06",
        sectionId: "s15",
        domain: 3,
        question: "A company needs a dedicated, private, high-bandwidth, low-latency physical connection from their data center to AWS, and can wait several weeks for setup. What should they use?",
        options: ["Site-to-Site VPN", "AWS Direct Connect", "VPC Peering", "Internet Gateway"],
        correct: [1],
        explanation: "AWS Direct Connect provides a dedicated physical network connection with higher bandwidth and lower latency than VPN, at the cost of longer provisioning time.",
        difficulty: "medium",
      },
      {
        id: "s15-q07",
        sectionId: "s15",
        domain: 3,
        question: "An organization has 15 VPCs that all need to communicate with each other and with an on-premises network. What is the BEST way to simplify this connectivity?",
        options: [
          "Create 105 individual VPC Peering connections",
          "Use AWS Transit Gateway as a central hub",
          "Use S3 Gateway Endpoints for all connections",
          "Use Network ACLs to connect VPCs directly",
        ],
        correct: [1],
        explanation: "Transit Gateway provides hub-and-spoke connectivity, avoiding the exponential complexity of full-mesh VPC peering.",
        difficulty: "medium",
      },
      {
        id: "s15-q08",
        sectionId: "s15",
        domain: 3,
        question: "What is the default inbound rule behavior for a newly created Security Group versus a newly created Network ACL?",
        options: [
          "Both deny all inbound traffic by default",
          "Both allow all inbound traffic by default",
          "New Security Groups deny all inbound by default; the default NACL allows all traffic by default",
          "Security Groups always allow all traffic regardless of rules",
        ],
        correct: [2],
        explanation: "A new security group denies all inbound traffic until rules are added, while the VPC's default NACL allows all traffic in both directions by default.",
        difficulty: "hard",
      },
      {
        id: "s15-q09",
        sectionId: "s15",
        domain: 3,
        question: "What does a Site-to-Site VPN connection require on the AWS side?",
        options: ["An Internet Gateway only", "A Virtual Private Gateway (or Transit Gateway) attached to the VPC", "A NAT Gateway", "A VPC Peering connection"],
        correct: [1],
        explanation: "Site-to-Site VPN connects a Customer Gateway (on-premises) to a Virtual Private Gateway (or Transit Gateway) attached to the VPC.",
        difficulty: "medium",
      },
      {
        id: "s15-q10",
        sectionId: "s15",
        domain: 3,
        question: "Which AWS resource must a region's VPC span, and what is created within a single Availability Zone?",
        options: [
          "A VPC spans a single AZ; subnets span all AZs",
          "A VPC spans all AZs in a region; each subnet exists within a single AZ",
          "Both VPCs and subnets span all AZs",
          "VPCs and subnets are both global resources",
        ],
        correct: [1],
        explanation: "A VPC is a regional construct spanning all AZs, while each subnet you create resides within exactly one AZ.",
        difficulty: "medium",
      },
    ],
  },
];

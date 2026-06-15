import type { SectionBundle } from "../types";

export const group02: SectionBundle[] = [
  // ===========================================================
  // Section 4 - EC2: Virtual Servers in the Cloud
  // ===========================================================
  {
    section: {
      id: "s04",
      number: 4,
      title: "EC2 - Virtual Servers in the Cloud",
      summary:
        "Launching and securing EC2 instances, instance types, EC2 user data, SSH access, and the different EC2 purchasing options.",
      domain: 3,
      estMinutes: 50,
      content: `
## EC2 Basics
**Amazon EC2 (Elastic Compute Cloud)** is one of the most popular AWS offerings - it is Infrastructure as a Service, and mainly consists of:
- Renting **virtual machines** (instances).
- Storing data on virtual drives (**EBS**).
- Distributing load across machines (**Elastic Load Balancer**).
- Auto-scaling the instance fleet (**Auto Scaling Group**).

When launching an EC2 instance you configure:
- **OS**: Amazon Linux, Ubuntu, Windows, etc. (an **AMI** - Amazon Machine Image).
- **Instance size** (CPU/RAM), defined by **instance type**.
- **Storage**: via EBS volumes or the ephemeral instance store.
- **Security Group**: firewall rules for the instance.
- **EC2 User Data**: a bootstrap script that runs **once** on first boot (e.g., to install a web server, run updates, install software, download files).

## EC2 Instance Types
Naming convention example: **m5.2xlarge**
- **m**: instance family (purpose).
- **5**: generation (AWS improves generations over time).
- **2xlarge**: size within the family.

### Instance family categories
- **General Purpose** (e.g., t3, m5): balance of compute, memory, and networking - good for web servers, small databases.
- **Compute Optimized** (e.g., c5): high-performance processors - good for batch processing, media transcoding, gaming servers, ML inference.
- **Memory Optimized** (e.g., r5, x1): fast performance for workloads processing large datasets in memory - in-memory databases.
- **Storage Optimized** (e.g., i3, d2): high, sequential read/write to large data sets on local storage - data warehousing, distributed file systems.

## Security Groups
- Act as a **virtual firewall** for EC2 instances, controlling inbound and outbound traffic.
- Security groups only contain **Allow** rules (no deny rules).
- Rules can reference IP ranges (CIDR) **or other security groups**.
- **Stateful**: if you allow inbound traffic on a port, the outbound response is automatically allowed (and vice versa).
- All inbound traffic is **blocked by default**; all outbound traffic is **allowed by default**.
- Can be attached to multiple instances; an instance can have multiple security groups.
- A timeout / can't connect issue is most often a **security group misconfiguration**.

### Classic ports to know
| Port | Purpose |
|---|---|
| 22 | SSH (Secure Shell) / SFTP |
| 21 | FTP |
| 22 | SFTP |
| 80 | HTTP |
| 443 | HTTPS |
| 3389 | RDP (Remote Desktop - Windows) |

## Connecting to EC2
- **SSH** (port 22) - from Mac/Linux with the \`.pem\` key (\`chmod 0400 key.pem\`), from Windows with PuTTY (convert \`.pem\` to \`.ppk\`) or modern Windows 10/11 OpenSSH client.
- **EC2 Instance Connect**: browser-based SSH directly from the AWS Console, no need to manage key pairs - generates a temporary key automatically (Amazon Linux 2 AMI).
- **EC2 Instance Roles**: attach an IAM role to supply temporary credentials to the instance automatically (instead of configuring static access keys), e.g., allowing \`aws iam list-users\` to work without \`aws configure\`.

## EC2 Purchasing Options
| Option | Description | Best for |
|---|---|---|
| **On-Demand** | Pay by the second/hour, no commitment | Short-term, unpredictable workloads |
| **Reserved Instances (1 or 3 yr)** | Up to 72% discount for committed usage; Standard (less flexible, bigger discount) or Convertible (can change instance attributes) | Steady-state, predictable usage |
| **Savings Plans** | Commit to an hourly $ amount for 1/3 yrs; flexible across instance families/sizes/regions | Long-term, flexible workloads |
| **Spot Instances** | Up to 90% discount; AWS can reclaim with 2-min warning | Batch jobs, fault-tolerant, flexible workloads |
| **Dedicated Hosts** | Book an entire physical server, control instance placement | Compliance/licensing (BYOL by socket/core) |
| **Dedicated Instances** | Instances run on hardware dedicated to you (may share hardware with other instances in same account) | Compliance needs without full host control |
| **Capacity Reservations** | Reserve capacity in a specific AZ for any duration, no discount but guarantees availability | Short-term guaranteed capacity |

## Shared Responsibility Model for EC2
- **AWS**: physical hardware, isolation of instances, patching the host infrastructure, replacing faulty hardware, compliance of the global infrastructure.
- **Customer**: guest OS (including updates and security patches), software/utilities on the instance, security group/firewall configuration, IAM roles assigned and credential management, data security on the instance.
`,
    },
    flashcards: [
      {
        id: "s04-f01",
        sectionId: "s04",
        front: "What is EC2 User Data used for?",
        back: "A bootstrap script that runs only once at the first launch of an instance, used to automate setup tasks (e.g., install a web server).",
      },
      {
        id: "s04-f02",
        sectionId: "s04",
        front: "In 'm5.2xlarge', what do 'm', '5', and '2xlarge' represent?",
        back: "'m' = instance family (general purpose), '5' = generation, '2xlarge' = size within the family.",
      },
      {
        id: "s04-f03",
        sectionId: "s04",
        front: "Are security groups stateful or stateless? What does that mean?",
        back: "Stateful - if inbound traffic is allowed on a port, the response outbound traffic is automatically allowed, regardless of outbound rules.",
      },
      {
        id: "s04-f04",
        sectionId: "s04",
        front: "What is the default inbound and outbound behavior of a new security group?",
        back: "All inbound traffic is blocked by default; all outbound traffic is allowed by default.",
      },
      {
        id: "s04-f05",
        sectionId: "s04",
        front: "What is EC2 Instance Connect?",
        back: "Browser-based SSH access to an EC2 instance directly from the AWS Console, without needing to manage SSH key pairs.",
      },
      {
        id: "s04-f06",
        sectionId: "s04",
        front: "Which EC2 purchasing option offers up to ~90% discount but can be reclaimed by AWS with 2 minutes notice?",
        back: "Spot Instances - ideal for fault-tolerant, flexible workloads like batch processing.",
      },
      {
        id: "s04-f07",
        sectionId: "s04",
        front: "What's the difference between a Dedicated Host and a Dedicated Instance?",
        back: "Dedicated Host = you control an entire physical server (useful for license/compliance with per-socket/core billing). Dedicated Instance = your instances run on hardware dedicated to you, but you don't control placement.",
      },
      {
        id: "s04-f08",
        sectionId: "s04",
        front: "Which instance family type is best for in-memory databases processing large datasets?",
        back: "Memory Optimized instances (e.g., R5, X1).",
      },
    ],
    questions: [
      {
        id: "s04-q01",
        sectionId: "s04",
        domain: 3,
        question: "Which feature lets you automatically run a setup script the first time an EC2 instance boots?",
        options: ["Security Groups", "EC2 User Data", "IAM Roles", "Elastic IP"],
        correct: [1],
        explanation: "EC2 User Data is a bootstrap script executed once at first launch, commonly used to install software.",
        difficulty: "easy",
      },
      {
        id: "s04-q02",
        sectionId: "s04",
        domain: 3,
        question: "A user reports they cannot connect to their EC2 web server over HTTP. What is the MOST likely cause?",
        options: [
          "The AMI does not support HTTP",
          "The security group does not allow inbound traffic on port 80",
          "EC2 instances cannot serve web traffic",
          "The instance type is too small",
        ],
        correct: [1],
        explanation: "Connectivity timeouts are most commonly caused by a security group not allowing the required inbound port.",
        difficulty: "easy",
      },
      {
        id: "s04-q03",
        sectionId: "s04",
        domain: 3,
        question: "Which EC2 instance family is optimized for high-performance batch processing and media transcoding?",
        options: ["General Purpose", "Compute Optimized", "Memory Optimized", "Storage Optimized"],
        correct: [1],
        explanation: "Compute Optimized instances (e.g., C5) provide high-performance processors ideal for compute-bound workloads.",
        difficulty: "easy",
      },
      {
        id: "s04-q04",
        sectionId: "s04",
        domain: 3,
        question: "A workload can tolerate interruptions and needs the lowest possible EC2 cost for non-critical batch analytics. Which purchasing option fits best?",
        options: ["On-Demand", "Reserved Instances", "Spot Instances", "Dedicated Hosts"],
        correct: [2],
        explanation: "Spot Instances offer the largest discounts for interruptible, flexible workloads.",
        difficulty: "easy",
      },
      {
        id: "s04-q05",
        sectionId: "s04",
        domain: 3,
        question: "Which EC2 purchasing option provides the most flexibility by committing to a dollar-per-hour spend across instance families, sizes, and regions?",
        options: ["Reserved Instances - Standard", "Savings Plans", "Spot Instances", "Capacity Reservations"],
        correct: [1],
        explanation: "Savings Plans commit to an hourly spend amount and flexibly apply the discount across eligible usage.",
        difficulty: "medium",
      },
      {
        id: "s04-q06",
        sectionId: "s04",
        domain: 3,
        question: "Which statement about EC2 security groups is TRUE?",
        options: [
          "They support explicit Deny rules",
          "They are stateless",
          "They can reference other security groups as a source",
          "They operate at the subnet level, not the instance level",
        ],
        correct: [2],
        explanation: "Security group rules can reference IP ranges or other security groups as the source/destination; they only allow, are stateful, and apply at the instance/ENI level.",
        difficulty: "medium",
      },
      {
        id: "s04-q07",
        sectionId: "s04",
        domain: 3,
        question: "An organization has specific server-bound software licenses tied to physical cores/sockets and needs visibility into the underlying hardware. Which EC2 option should they use?",
        options: ["On-Demand Instances", "Spot Instances", "Dedicated Hosts", "Savings Plans"],
        correct: [2],
        explanation: "Dedicated Hosts give full visibility and control of the physical server, useful for licensing requirements tied to sockets/cores.",
        difficulty: "medium",
      },
      {
        id: "s04-q08",
        sectionId: "s04",
        domain: 3,
        question: "Under the EC2 shared responsibility model, which of the following is the CUSTOMER's responsibility?",
        options: [
          "Replacing faulty physical hardware",
          "Maintaining the physical data center security",
          "Patching the guest operating system",
          "Maintaining the virtualization infrastructure",
        ],
        correct: [2],
        explanation: "Customers are responsible for guest OS patching, software, and security group configuration.",
        difficulty: "easy",
      },
      {
        id: "s04-q09",
        sectionId: "s04",
        domain: 3,
        question: "What is the main advantage of using EC2 Instance Connect over traditional SSH key pairs?",
        options: [
          "It removes the need for security groups",
          "It allows browser-based SSH access without managing long-lived key pairs",
          "It encrypts EBS volumes automatically",
          "It is only available for Windows instances",
        ],
        correct: [1],
        explanation: "EC2 Instance Connect provides temporary, browser-based SSH access without long-lived key management.",
        difficulty: "medium",
      },
      {
        id: "s04-q10",
        sectionId: "s04",
        domain: 3,
        question: "A company needs guaranteed EC2 capacity in a specific Availability Zone for an event happening next week, but doesn't need a long-term discount. What should they use?",
        options: ["Reserved Instances", "On-Demand Capacity Reservations", "Spot Instances", "Savings Plans"],
        correct: [1],
        explanation: "On-Demand Capacity Reservations guarantee capacity in a specific AZ for any duration without requiring a long-term commitment.",
        difficulty: "hard",
      },
    ],
  },

  // ===========================================================
  // Section 5 - EC2 Storage (EBS, EFS, AMI, Instance Store, FSx)
  // ===========================================================
  {
    section: {
      id: "s05",
      number: 5,
      title: "EC2 Storage: EBS, EFS, AMI & FSx",
      summary:
        "Block storage with EBS, snapshots, AMIs, ephemeral instance store, the EFS managed file system, and FSx for Windows/Lustre.",
      domain: 3,
      estMinutes: 45,
      content: `
## Amazon EBS (Elastic Block Store)
- A **network drive** you can attach to instances while they run - think of it as a "network USB stick."
- Allows instances to **persist data** even after termination (if configured to do so).
- Can only be mounted to **one instance at a time** (at the CCP level) and is bound to a specific **Availability Zone** - to move it, you must snapshot then restore in another AZ.
- Has a provisioned **capacity** (size in GB) and **IOPS**, billed whether or not in use.
- **Delete on Termination** attribute: controls whether the root EBS volume is deleted when the instance terminates (default: enabled for root volume, disabled for additional volumes).
- **EBS Multi-Attach**: certain volume types can be attached to multiple instances simultaneously (same AZ) - used for clustered Linux applications.

## EBS Snapshots
- A **backup/point-in-time copy** of an EBS volume, stored on S3 (not directly visible to you).
- Not necessary to detach the volume to take a snapshot, but recommended for consistency.
- Can **copy snapshots across AZs or Regions** - useful for disaster recovery.
- **Archive Tier**: move a snapshot to an archive tier, ~75% cheaper, but takes 24-72 hours to restore.
- **Recycle Bin**: set retention rules for deleted snapshots, protecting against accidental deletion.

## AMI (Amazon Machine Image)
- A **customization of an EC2 instance** - add your own software, configuration, OS, monitoring, etc.
- Faster boot/configuration time since all software is pre-packaged.
- AMIs are built for a **specific region** (and can be copied across regions).
- You can launch EC2 instances from: a **Public AMI** (AWS provided), **your own AMI**, or an **AWS Marketplace AMI** (pre-built, sometimes paid).

### EC2 Image Builder
- A **free** service that automates the creation, maintenance, validation, sharing, and deployment of AMIs.
- Uses a "builder" EC2 instance to install/configure software, then runs tests before distributing the AMI.
- Can be run on a schedule (e.g., monthly updates) and publishes to multiple regions/accounts.

## EC2 Instance Store
- High-performance hardware disk **physically attached** to the host computer.
- Better I/O performance than EBS, but data is **ephemeral** - lost if the instance is stopped or terminated (NOT on reboot).
- Good for buffers, caches, scratch data, temporary content that doesn't need to persist - you are responsible for backups/replication.

## Amazon EFS (Elastic File System)
- A **managed NFS (Network File System)** that can be mounted on **many EC2 instances across multiple Availability Zones** (unlike EBS).
- Compatible with Linux-based AMIs only (POSIX file system).
- Highly available, scalable, expensive compared to gp2 (~3x), pay-per-use.
- Uses a **security group** to control access.
- **EFS-IA (Infrequent Access)** storage class: lifecycle policy moves files not accessed for N days, up to ~92% cost savings.

## EBS vs EFS vs Instance Store - quick comparison
| | EBS | EFS | Instance Store |
|---|---|---|---|
| Attach to | 1 instance (or multi-attach for some types) | Many instances, multi-AZ | 1 instance (physical) |
| Persistence | Persistent | Persistent | Ephemeral |
| Scope | AZ-bound | Region (multi-AZ) | Host-bound |
| Use case | Boot volumes, databases | Shared file storage (Linux) | Caches, buffers, temp data |

## Amazon FSx
A family of **fully managed third-party file systems** on AWS, launched within your VPC:
- **FSx for Lustre**: high-performance computing (HPC), machine learning, video processing - parallel file system.
- **FSx for Windows File Server**: Windows-native file system supporting SMB protocol and Windows NTFS, integrates with Microsoft Active Directory.
- FSx for NetApp ONTAP / OpenZFS also exist (less commonly tested at CCP level).

## Shared Responsibility Model for EC2 Storage
- **AWS**: replicates EBS/EFS data within an AZ/region to prevent data loss from hardware failure; maintains the infrastructure.
- **Customer**: configuring backups/snapshots, setting up appropriate encryption, and understanding that EC2 Instance Store is ephemeral (you must back it up yourself).
`,
    },
    flashcards: [
      {
        id: "s05-f01",
        sectionId: "s05",
        front: "What is Amazon EBS and what is it bound to?",
        back: "A network-attached block storage volume ('network drive') for EC2; it is bound to a specific Availability Zone.",
      },
      {
        id: "s05-f02",
        sectionId: "s05",
        front: "How do you move an EBS volume to a different AZ or Region?",
        back: "Take a snapshot of the volume, then create a new volume from that snapshot in the target AZ/Region (snapshots can be copied across AZs/Regions).",
      },
      {
        id: "s05-f03",
        sectionId: "s05",
        front: "What is the EBS Snapshot Archive tier?",
        back: "A storage tier for snapshots that is ~75% cheaper than standard snapshot storage, but restoring takes 24-72 hours.",
      },
      {
        id: "s05-f04",
        sectionId: "s05",
        front: "What is an AMI?",
        back: "An Amazon Machine Image - a customized template (OS + software + config) used to launch new EC2 instances faster, with consistent configuration.",
      },
      {
        id: "s05-f05",
        sectionId: "s05",
        front: "What happens to EC2 Instance Store data on stop vs. reboot?",
        back: "Data is LOST if the instance is stopped or terminated, but PERSISTS through a simple reboot. It's ephemeral, hardware-attached storage.",
      },
      {
        id: "s05-f06",
        sectionId: "s05",
        front: "How does EFS differ from EBS in terms of attachment?",
        back: "EFS can be mounted by many EC2 instances simultaneously across multiple AZs (managed NFS); EBS attaches to a single instance within one AZ (with limited multi-attach exceptions).",
      },
      {
        id: "s05-f07",
        sectionId: "s05",
        front: "What are the two main FSx variants tested at CCP level?",
        back: "FSx for Lustre (HPC/ML workloads, parallel file system) and FSx for Windows File Server (SMB/NTFS, integrates with Active Directory).",
      },
      {
        id: "s05-f08",
        sectionId: "s05",
        front: "What does EC2 Image Builder do, and what does it cost?",
        back: "It automates creating, testing, and distributing AMIs across regions/accounts on a schedule. The service itself is FREE (you pay for the underlying resources used).",
      },
    ],
    questions: [
      {
        id: "s05-q01",
        sectionId: "s05",
        domain: 3,
        question: "An EBS volume is attached to an EC2 instance in us-east-1a. The application needs the same data available on an instance in us-east-1b. What should you do?",
        options: [
          "Directly reattach the EBS volume to the instance in us-east-1b",
          "Create a snapshot of the volume and restore a new volume from it in us-east-1b",
          "EBS volumes automatically replicate across AZs",
          "Use EC2 Instance Store instead",
        ],
        correct: [1],
        explanation: "EBS volumes are bound to a single AZ; to move data to another AZ you snapshot the volume and create a new volume from the snapshot in the target AZ.",
        difficulty: "medium",
      },
      {
        id: "s05-q02",
        sectionId: "s05",
        domain: 3,
        question: "Which storage option provides the HIGHEST I/O performance but loses all data when the instance is stopped or terminated?",
        options: ["Amazon EBS gp3", "Amazon EFS", "EC2 Instance Store", "Amazon S3"],
        correct: [2],
        explanation: "EC2 Instance Store is physically attached, high-performance, but ephemeral - data is lost on stop/terminate.",
        difficulty: "easy",
      },
      {
        id: "s05-q03",
        sectionId: "s05",
        domain: 3,
        question: "A company runs a fleet of Linux EC2 instances across 3 Availability Zones that all need read/write access to the same shared files. Which service is the BEST fit?",
        options: ["Amazon EBS", "Amazon EFS", "EC2 Instance Store", "Amazon FSx for Windows File Server"],
        correct: [1],
        explanation: "Amazon EFS is a managed NFS file system that can be mounted concurrently by many Linux instances across multiple AZs.",
        difficulty: "easy",
      },
      {
        id: "s05-q04",
        sectionId: "s05",
        domain: 3,
        question: "What is the primary purpose of an Amazon Machine Image (AMI)?",
        options: [
          "To provide network-attached block storage",
          "To serve as a template for launching EC2 instances with pre-configured OS and software",
          "To monitor EC2 CPU utilization",
          "To provide a managed NFS file system",
        ],
        correct: [1],
        explanation: "An AMI is a template containing the OS, application server, and applications used to launch EC2 instances quickly and consistently.",
        difficulty: "easy",
      },
      {
        id: "s05-q05",
        sectionId: "s05",
        domain: 3,
        question: "Which AWS service automates the building, testing, and distribution of AMIs on a schedule?",
        options: ["AWS Config", "EC2 Image Builder", "AWS Systems Manager", "Amazon Inspector"],
        correct: [1],
        explanation: "EC2 Image Builder automates the AMI lifecycle: build, test, validate, and distribute, and is free to use.",
        difficulty: "medium",
      },
      {
        id: "s05-q06",
        sectionId: "s05",
        domain: 3,
        question: "A company wants to reduce costs for EBS snapshots they rarely need to restore, while accepting a longer restore time. What should they use?",
        options: ["S3 Glacier Deep Archive", "EBS Snapshot Archive tier", "EFS-IA", "Delete the snapshots"],
        correct: [1],
        explanation: "The EBS Snapshot Archive tier offers ~75% savings with a 24-72 hour restore time for infrequently needed snapshots.",
        difficulty: "medium",
      },
      {
        id: "s05-q07",
        sectionId: "s05",
        domain: 3,
        question: "Which AWS managed file system would best support a high-performance computing (HPC) workload requiring a parallel file system?",
        options: ["Amazon EFS", "Amazon FSx for Lustre", "Amazon FSx for Windows File Server", "Amazon EBS"],
        correct: [1],
        explanation: "FSx for Lustre is purpose-built for HPC and machine learning workloads requiring fast, parallel access to data.",
        difficulty: "medium",
      },
      {
        id: "s05-q08",
        sectionId: "s05",
        domain: 3,
        question: "By default, what happens to the ROOT EBS volume when its associated EC2 instance is terminated?",
        options: [
          "It is always preserved",
          "It is deleted by default (Delete on Termination is enabled by default for root volumes)",
          "It is automatically converted to a snapshot",
          "It is moved to S3 Glacier",
        ],
        correct: [1],
        explanation: "By default, the 'Delete on Termination' flag is enabled for the root EBS volume, so it's deleted with the instance unless changed.",
        difficulty: "medium",
      },
      {
        id: "s05-q09",
        sectionId: "s05",
        domain: 3,
        question: "Which feature helps protect against accidental deletion of EBS snapshots by enforcing a retention period?",
        options: ["EBS Multi-Attach", "Recycle Bin", "EFS-IA", "AMI copy"],
        correct: [1],
        explanation: "The Recycle Bin for EBS snapshots retains deleted snapshots for a configured period, allowing recovery from accidental deletion.",
        difficulty: "medium",
      },
      {
        id: "s05-q10",
        sectionId: "s05",
        domain: 3,
        question: "A Windows-based application requires a file share accessible via the SMB protocol and integration with Active Directory. Which service should be used?",
        options: ["Amazon EFS", "Amazon FSx for Windows File Server", "Amazon FSx for Lustre", "EC2 Instance Store"],
        correct: [1],
        explanation: "FSx for Windows File Server natively supports SMB and integrates with Microsoft Active Directory.",
        difficulty: "easy",
      },
    ],
  },

  // ===========================================================
  // Section 6 - Elastic Load Balancing & Auto Scaling
  // ===========================================================
  {
    section: {
      id: "s06",
      number: 6,
      title: "Elastic Load Balancing & Auto Scaling Groups",
      summary:
        "High availability, scalability, and elasticity concepts, the three ELB types, and how Auto Scaling Groups keep your fleet healthy and right-sized.",
      domain: 3,
      estMinutes: 35,
      content: `
## Core Concepts
- **Scalability**: a system can handle greater load by adapting.
  - **Vertical scaling**: increase the size of an instance (e.g., t2.micro -> t2.large). Common for non-distributed systems like databases. Has a hardware limit.
  - **Horizontal scaling (elasticity)**: increase the number of instances/systems for your application - implies distributed systems. Common for web applications.
- **High Availability**: running your application/system in **at least 2 Availability Zones** to survive a data center loss. Can be a side effect of horizontal scaling.
- **Elasticity**: once a system is scalable, elasticity means the system automatically adapts (scales out/in) to workload changes - "pay-as-you-use" infrastructure.
- **Agility**: new IT resources are a click away, reducing time to make resources available.

## Elastic Load Balancing (ELB)
A **load balancer** spreads traffic across multiple downstream instances/services, exposing a single point of access (DNS) and enabling **high availability** across AZs, plus seamless handling of failures. AWS guarantees the ELB itself is highly available and managed.

### Types of Load Balancers
1. **Application Load Balancer (ALB)** - Layer 7 (HTTP/HTTPS, WebSocket).
   - Routing based on URL path, hostname, headers, query strings.
   - Supports redirects, fixed responses.
   - Routes to multiple **target groups** (EC2, ECS tasks, Lambda functions, IP addresses).
   - Great for microservices and container-based applications.
2. **Network Load Balancer (NLB)** - Layer 4 (TCP/UDP).
   - Extreme performance, very low latency (millions of requests/sec).
   - Has one **static IP per AZ** (and supports Elastic IP).
   - Used for TCP/UDP traffic where extreme performance is needed.
3. **Gateway Load Balancer (GWLB)** - Layer 3 (network layer / IP packets).
   - Used to deploy, scale, and manage third-party virtual appliances (firewalls, intrusion detection/prevention systems).
   - Combines a **transparent network gateway** and a **load balancer**, using the GENEVE protocol on port 6081.

### Health Checks
ELBs perform **health checks** on instances/targets - if a target fails a health check (e.g., doesn't respond on a configured path/port), the load balancer stops sending traffic to it.

### Cross-Zone Load Balancing
Distributes traffic evenly across all registered targets in all enabled AZs, regardless of the AZ the request entered from.

## Auto Scaling Groups (ASG)
The goal of an ASG is to:
- **Scale out** (add EC2 instances) to match increased load.
- **Scale in** (remove EC2 instances) to match decreased load.
- Ensure a **minimum** and **maximum** number of instances are running.
- **Automatically register** new instances to a load balancer.
- **Replace unhealthy instances** automatically.

### ASG Attributes
- **Launch Template** (modern, recommended over Launch Configuration): defines AMI, instance type, security groups, user data, key pair, etc.
- **Min Size / Max Size / Desired Capacity**: the bounds and target for the number of running instances.
- Attach to a **target group** of a load balancer so traffic is balanced across new instances automatically.

### ASG Scaling Strategies
- **Manual scaling**: update the ASG size manually.
- **Dynamic scaling**:
  - **Simple/Step scaling**: scale based on a CloudWatch alarm (e.g., CPU > 70% -> add 2 instances).
  - **Target tracking scaling**: simplest to set up - e.g., "keep average ASG CPU at ~40%."
- **Scheduled scaling**: scale based on a known schedule (e.g., increase min capacity to 10 at 5pm Fridays).
- **Predictive scaling**: uses machine learning to forecast traffic and scale ahead of time.

**CloudWatch Alarms** can trigger Auto Scaling actions (scale-out or scale-in) based on metrics like average CPU utilization.
`,
    },
    flashcards: [
      {
        id: "s06-f01",
        sectionId: "s06",
        front: "What's the difference between vertical and horizontal scaling?",
        back: "Vertical = increase the size/specs of one instance (has a hardware ceiling). Horizontal = add more instances to your fleet (enables elasticity & high availability).",
      },
      {
        id: "s06-f02",
        sectionId: "s06",
        front: "What is the minimum number of Availability Zones recommended for 'high availability'?",
        back: "At least 2 AZs - so the application survives the loss of one data center.",
      },
      {
        id: "s06-f03",
        sectionId: "s06",
        front: "Which ELB type operates at Layer 7 and supports path/host-based routing?",
        back: "Application Load Balancer (ALB) - works with HTTP/HTTPS and routes to target groups based on URL path, hostname, headers, etc.",
      },
      {
        id: "s06-f04",
        sectionId: "s06",
        front: "Which ELB type provides a static IP per AZ and operates at Layer 4?",
        back: "Network Load Balancer (NLB) - handles TCP/UDP with extreme performance and ultra-low latency.",
      },
      {
        id: "s06-f05",
        sectionId: "s06",
        front: "What is a Gateway Load Balancer used for?",
        back: "Deploying and scaling third-party virtual security appliances (firewalls, IDS/IPS) transparently, operating at Layer 3 using the GENEVE protocol on port 6081.",
      },
      {
        id: "s06-f06",
        sectionId: "s06",
        front: "What happens when an EC2 instance fails an ELB health check?",
        back: "The load balancer stops routing traffic to that instance until it passes health checks again (and an ASG may terminate/replace it).",
      },
      {
        id: "s06-f07",
        sectionId: "s06",
        front: "What is the simplest Auto Scaling policy type to configure?",
        back: "Target tracking scaling - e.g., keep average CPU utilization around a target percentage; ASG automatically adds/removes instances to hit that target.",
      },
      {
        id: "s06-f08",
        sectionId: "s06",
        front: "What does an Auto Scaling Group do when an instance becomes unhealthy?",
        back: "It automatically terminates the unhealthy instance and launches a replacement to maintain the desired capacity.",
      },
    ],
    questions: [
      {
        id: "s06-q01",
        sectionId: "s06",
        domain: 3,
        question: "A company's database server is running out of CPU capacity, and they decide to move to a larger instance type. What type of scaling is this?",
        options: ["Horizontal scaling", "Vertical scaling", "Elastic scaling", "Predictive scaling"],
        correct: [1],
        explanation: "Increasing the size of a single instance (e.g., t2.micro -> t2.large) is vertical scaling.",
        difficulty: "easy",
      },
      {
        id: "s06-q02",
        sectionId: "s06",
        domain: 3,
        question: "Which load balancer type would you choose for a microservices application that needs to route requests based on URL path to different target groups?",
        options: ["Network Load Balancer", "Gateway Load Balancer", "Application Load Balancer", "Classic Load Balancer only"],
        correct: [2],
        explanation: "ALB operates at Layer 7 and supports content-based routing such as path-based and host-based routing to different target groups.",
        difficulty: "easy",
      },
      {
        id: "s06-q03",
        sectionId: "s06",
        domain: 3,
        question: "Which AWS feature automatically replaces unhealthy EC2 instances and adjusts capacity based on demand?",
        options: ["Elastic Load Balancer", "Auto Scaling Group", "Amazon CloudFront", "AWS Lambda"],
        correct: [1],
        explanation: "An Auto Scaling Group monitors instance health and automatically scales out/in and replaces unhealthy instances.",
        difficulty: "easy",
      },
      {
        id: "s06-q04",
        sectionId: "s06",
        domain: 3,
        question: "A real-time gaming application needs a load balancer that can handle millions of TCP requests per second with ultra-low latency and a static IP. Which should they use?",
        options: ["Application Load Balancer", "Network Load Balancer", "Gateway Load Balancer", "Route 53"],
        correct: [1],
        explanation: "Network Load Balancer (Layer 4) is designed for extreme performance, low latency, and supports static/Elastic IPs.",
        difficulty: "medium",
      },
      {
        id: "s06-q05",
        sectionId: "s06",
        domain: 3,
        question: "What is the simplest way to configure an Auto Scaling Group to maintain average CPU utilization around 50%?",
        options: ["Scheduled scaling", "Manual scaling", "Target tracking scaling", "Predictive scaling only"],
        correct: [2],
        explanation: "Target tracking scaling automatically adjusts capacity to maintain a target metric value, such as 50% average CPU.",
        difficulty: "medium",
      },
      {
        id: "s06-q06",
        sectionId: "s06",
        domain: 3,
        question: "Which AWS load balancer is purpose-built for integrating third-party firewall and intrusion detection/prevention appliances?",
        options: ["Application Load Balancer", "Network Load Balancer", "Gateway Load Balancer", "Classic Load Balancer"],
        correct: [2],
        explanation: "Gateway Load Balancer combines a transparent gateway and load balancer for deploying third-party network virtual appliances.",
        difficulty: "medium",
      },
      {
        id: "s06-q07",
        sectionId: "s06",
        domain: 3,
        question: "A retail website expects a predictable traffic spike every Friday at 6pm. What ASG scaling strategy proactively adds capacity ahead of that time?",
        options: ["Dynamic scaling only", "Scheduled scaling", "Manual scaling", "There is no way to do this in AWS"],
        correct: [1],
        explanation: "Scheduled scaling lets you increase/decrease capacity at known times based on predictable load patterns.",
        difficulty: "medium",
      },
      {
        id: "s06-q08",
        sectionId: "s06",
        domain: 3,
        question: "What is the recommended modern way to define instance configuration (AMI, instance type, security groups) for an Auto Scaling Group?",
        options: ["Launch Configuration", "Launch Template", "User Data script only", "AMI tags"],
        correct: [1],
        explanation: "Launch Templates are the recommended (newer) way to define instance configuration for ASGs, replacing Launch Configurations.",
        difficulty: "medium",
      },
      {
        id: "s06-q09",
        sectionId: "s06",
        domain: 3,
        question: "Why does deploying an application across 2+ Availability Zones improve availability?",
        options: [
          "It reduces the AWS bill automatically",
          "It protects the application from the failure of a single data center",
          "It is required by AWS for all EC2 instances",
          "It increases the maximum instance size available",
        ],
        correct: [1],
        explanation: "Multiple AZs are physically separate data centers; spreading instances across them protects against a single AZ failure.",
        difficulty: "easy",
      },
      {
        id: "s06-q10",
        sectionId: "s06",
        domain: 3,
        question: "What triggers a CloudWatch-alarm-based 'simple scaling' policy in an Auto Scaling Group?",
        options: [
          "A manual API call only",
          "A scheduled cron expression",
          "A CloudWatch alarm crossing a defined threshold (e.g., CPU > 70%)",
          "An S3 event notification",
        ],
        correct: [2],
        explanation: "Simple/step scaling policies react to CloudWatch alarms that cross defined thresholds.",
        difficulty: "medium",
      },
    ],
  },
];

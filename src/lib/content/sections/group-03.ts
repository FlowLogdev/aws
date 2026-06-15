import type { SectionBundle } from "../types";

export const group03: SectionBundle[] = [
  // ===========================================================
  // Section 7 - Amazon S3
  // ===========================================================
  {
    section: {
      id: "s07",
      number: 7,
      title: "Amazon S3 - Simple Storage Service",
      summary:
        "Buckets and objects, storage classes, versioning, lifecycle rules, encryption, access control, replication, and static website hosting.",
      domain: 3,
      estMinutes: 50,
      content: `
## S3 Overview
Amazon S3 (Simple Storage Service) is one of the main building blocks of AWS - "infinitely scaling" storage, used for backup/restore, disaster recovery, archiving, hybrid cloud storage, application hosting, media hosting, data lakes, and static website hosting.

- Data is stored in **buckets** (similar to directories) which must have a **globally unique name** (across all AWS accounts and regions).
- Buckets are defined at the **region level**.
- **Objects** (files) have a **key** = full path (prefix + object name), and can be 0 bytes to 5TB.
- Objects have: value (content), version ID, metadata, tags, and the key.

## S3 Security
- **User-based**: IAM policies specifying which API calls a user can perform.
- **Resource-based**:
  - **Bucket Policies**: JSON-based policies attached to a bucket, can allow cross-account access, force encryption, grant public access (use carefully!).
  - **Object Access Control Lists (ACL)** and **Bucket ACLs** (finer grain, less common now).
- An IAM principal can access an S3 object if: the IAM permissions ALLOW it, **or** the resource policy ALLOWs it, **and** there's no explicit DENY.
- **S3 Block Public Access**: account/bucket-level settings to prevent buckets from being made public - even if a policy/ACL would allow it. Should be left **on** unless you know what you're doing.
- **Encryption**: server-side encryption (SSE-S3 default AES-256, SSE-KMS, SSE-C) and client-side encryption options.

## S3 Versioning
- Enabled at the **bucket level**.
- Same key overwrite -> increments the **version number**.
- Protects against unintended deletes (a "delete" just adds a delete marker) and allows easy roll back.
- Any file not versioned prior to enabling versioning has version "null."
- Suspending versioning does not delete previous versions.

## S3 Storage Classes
| Class | Use case | Notes |
|---|---|---|
| **S3 Standard** | Frequently accessed data | 99.99% availability, low latency |
| **S3 Standard-IA** | Infrequently accessed, rapid access needed | Lower storage cost, retrieval fee |
| **S3 One Zone-IA** | Infrequent access, non-critical, recreatable data | Stored in a single AZ, cheaper |
| **S3 Glacier Instant Retrieval** | Archive, millisecond access | For data accessed once a quarter |
| **S3 Glacier Flexible Retrieval** | Archive | Retrieval 1 min to 12 hours |
| **S3 Glacier Deep Archive** | Long-term archive (cheapest) | Retrieval 12-48 hours |
| **S3 Intelligent-Tiering** | Unknown/changing access patterns | Automatically moves objects between tiers, no retrieval fees |

You can move objects between classes manually or automatically via **S3 Lifecycle Rules** (e.g., transition to S3 IA after 60 days, Glacier after 180 days, expire after 365 days).

## S3 Lifecycle Rules
- **Transition actions**: move objects to another storage class after a defined time.
- **Expiration actions**: delete objects (or old versions, or incomplete multi-part uploads) after a defined time.
- Can be applied to all objects or a filtered subset (by prefix/tag).

## S3 Replication (CRR & SRR)
- **Cross-Region Replication (CRR)**: replicate objects across different AWS regions - useful for compliance, lower latency access, replication across accounts.
- **Same-Region Replication (SRR)**: replicate objects within the same region - useful for log aggregation, live replication between production and test accounts.
- Requires **versioning enabled** on both source and destination buckets.
- Replication is **not retroactive** by default (only new objects after enabling, unless using S3 Batch Replication).

## S3 Static Website Hosting
S3 can host a **static website** (HTML/CSS/JS) directly, accessible via a bucket's website endpoint URL. If you get a 403 Forbidden error, check the bucket policy allows public reads.

## Other Important Features
- **S3 Pre-Signed URLs**: generate a temporary URL with embedded credentials to give time-limited access to a private object (download or upload).
- **S3 Select / Glacier Select**: retrieve a subset of data from an object using a SQL expression - reduces the cost and improves performance of data retrieval.
- **S3 Transfer Acceleration**: speeds up transfers to/from S3 by routing through CloudFront edge locations.
- **MFA Delete**: requires MFA to permanently delete an object version or change bucket versioning state (requires versioning enabled).
`,
    },
    flashcards: [
      {
        id: "s07-f01",
        sectionId: "s07",
        front: "What must be globally unique about an S3 bucket?",
        back: "Its name - bucket names must be globally unique across all AWS accounts and all regions.",
      },
      {
        id: "s07-f02",
        sectionId: "s07",
        front: "What happens to an object's version when you upload a new file with the same key in a versioned bucket?",
        back: "S3 keeps the old version and creates a new version ID for the new upload - nothing is overwritten/lost.",
      },
      {
        id: "s07-f03",
        sectionId: "s07",
        front: "Which S3 storage class is cheapest for long-term archives that are rarely accessed and can wait 12-48 hours for retrieval?",
        back: "S3 Glacier Deep Archive.",
      },
      {
        id: "s07-f04",
        sectionId: "s07",
        front: "What is S3 Intelligent-Tiering best suited for?",
        back: "Data with unknown or changing access patterns - it automatically moves objects between access tiers based on usage, with no retrieval fees.",
      },
      {
        id: "s07-f05",
        sectionId: "s07",
        front: "What two conditions must be met for Cross-Region Replication (CRR) to work?",
        back: "Versioning must be enabled on BOTH the source and destination buckets, and appropriate IAM permissions for replication must be in place.",
      },
      {
        id: "s07-f06",
        sectionId: "s07",
        front: "What is S3 Block Public Access, and what is its default recommendation?",
        back: "Account/bucket-level settings that prevent buckets/objects from being made public, even if a policy or ACL would otherwise allow it. Should be left ON unless public access is explicitly required.",
      },
      {
        id: "s07-f07",
        sectionId: "s07",
        front: "What is an S3 pre-signed URL used for?",
        back: "Granting temporary, time-limited access to a private S3 object (for download or upload) without changing bucket permissions.",
      },
      {
        id: "s07-f08",
        sectionId: "s07",
        front: "What does S3 Select do?",
        back: "Lets you retrieve only a subset of an object's data using a SQL-like expression, reducing data transfer costs and improving retrieval performance.",
      },
    ],
    questions: [
      {
        id: "s07-q01",
        sectionId: "s07",
        domain: 3,
        question: "What is the scope of an S3 bucket name's uniqueness requirement?",
        options: [
          "Unique within your AWS account only",
          "Unique within the selected region only",
          "Globally unique across all AWS accounts and regions",
          "Unique only among buckets you own",
        ],
        correct: [2],
        explanation: "S3 bucket names must be globally unique across all of AWS, not just within an account or region.",
        difficulty: "easy",
      },
      {
        id: "s07-q02",
        sectionId: "s07",
        domain: 3,
        question: "A company needs the cheapest storage option for compliance archives that are accessed perhaps once every few years and can tolerate a 12+ hour retrieval time.",
        options: ["S3 Standard-IA", "S3 One Zone-IA", "S3 Glacier Deep Archive", "S3 Intelligent-Tiering"],
        correct: [2],
        explanation: "S3 Glacier Deep Archive is the lowest-cost S3 storage class, designed for long-term archives with 12-48 hour retrieval.",
        difficulty: "easy",
      },
      {
        id: "s07-q03",
        sectionId: "s07",
        domain: 3,
        question: "Which S3 feature protects against accidental object deletion by preserving prior versions when an object is overwritten or deleted?",
        options: ["Lifecycle rules", "Versioning", "Replication", "S3 Select"],
        correct: [1],
        explanation: "S3 Versioning keeps all versions of an object (including delete markers), allowing recovery of overwritten or deleted data.",
        difficulty: "easy",
      },
      {
        id: "s07-q04",
        sectionId: "s07",
        domain: 3,
        question: "A media company wants to automatically move objects to S3 Glacier after 90 days and delete them entirely after 2 years. What feature should they configure?",
        options: ["S3 Replication", "S3 Lifecycle Rules", "S3 Transfer Acceleration", "S3 Object Lock"],
        correct: [1],
        explanation: "S3 Lifecycle Rules define transition (e.g., to Glacier) and expiration (deletion) actions based on object age.",
        difficulty: "easy",
      },
      {
        id: "s07-q05",
        sectionId: "s07",
        domain: 3,
        question: "Which combination correctly allows access to a private S3 object for an IAM user?",
        options: [
          "IAM permissions must always be combined with a bucket policy explicit ALLOW",
          "Either IAM permissions OR a resource-based policy can grant access, as long as there is no explicit DENY",
          "Only bucket policies can grant access; IAM permissions are ignored for S3",
          "Object ACLs override all other permission types",
        ],
        correct: [1],
        explanation: "Access is granted if IAM permissions ALLOW it or the resource (bucket) policy ALLOWs it, provided there is no explicit DENY anywhere.",
        difficulty: "hard",
      },
      {
        id: "s07-q06",
        sectionId: "s07",
        domain: 3,
        question: "You enable Cross-Region Replication on a bucket that already contains 10,000 objects. What happens to those existing objects?",
        options: [
          "They are automatically replicated immediately",
          "They are NOT replicated unless you use S3 Batch Replication (replication is not retroactive by default)",
          "Replication will fail until existing objects are deleted",
          "They are replicated only if versioning is disabled",
        ],
        correct: [1],
        explanation: "CRR/SRR only replicates new objects added after replication is enabled; existing objects require S3 Batch Replication.",
        difficulty: "hard",
      },
      {
        id: "s07-q07",
        sectionId: "s07",
        domain: 3,
        question: "Users get a '403 Forbidden' error when trying to view a static website hosted on S3. What is the MOST likely cause?",
        options: [
          "The bucket region is incorrect",
          "The bucket policy does not grant public read access to the objects",
          "Versioning is not enabled",
          "The objects are larger than 5TB",
        ],
        correct: [1],
        explanation: "S3 static website hosting requires a bucket policy (and Block Public Access settings) that permit public GetObject access.",
        difficulty: "medium",
      },
      {
        id: "s07-q08",
        sectionId: "s07",
        domain: 3,
        question: "An application needs to allow a user to upload a file directly to a private S3 bucket for the next 15 minutes without giving them AWS credentials. What should be used?",
        options: ["A bucket policy granting public write", "An S3 pre-signed URL", "S3 Object Lock", "S3 Intelligent-Tiering"],
        correct: [1],
        explanation: "A pre-signed URL grants temporary, time-limited access (upload or download) to a specific object without exposing AWS credentials.",
        difficulty: "medium",
      },
      {
        id: "s07-q09",
        sectionId: "s07",
        domain: 3,
        question: "Which S3 storage class stores data in only a SINGLE Availability Zone, making it cheaper but less resilient?",
        options: ["S3 Standard", "S3 Standard-IA", "S3 One Zone-IA", "S3 Glacier Flexible Retrieval"],
        correct: [2],
        explanation: "S3 One Zone-IA stores data in a single AZ at a reduced cost, suitable for re-creatable, non-critical data.",
        difficulty: "medium",
      },
      {
        id: "s07-q10",
        sectionId: "s07",
        domain: 3,
        question: "Which feature requires S3 Versioning to be enabled as a prerequisite?",
        options: ["S3 Lifecycle Rules", "S3 Select", "Cross-Region Replication", "S3 Storage Classes"],
        correct: [2],
        explanation: "Cross-Region Replication (and Same-Region Replication) require versioning to be enabled on source and destination buckets.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 8 - Databases: RDS, Aurora, DynamoDB
  // ===========================================================
  {
    section: {
      id: "s08",
      number: 8,
      title: "Databases: RDS, Aurora & DynamoDB",
      summary:
        "Managed relational databases with RDS and Aurora, NoSQL with DynamoDB, in-memory caching with ElastiCache, and how to choose the right database.",
      domain: 3,
      estMinutes: 50,
      content: `
## Amazon RDS (Relational Database Service)
A **managed** database service for relational, SQL databases:
- Supported engines: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.
- AWS manages: provisioning, OS patching, continuous backups & point-in-time restore, monitoring dashboards, read replicas, multi-AZ for disaster recovery, scaling (vertical & horizontal), storage backed by EBS.
- You do **not** get SSH access to the underlying instance (vs. running a DB yourself on EC2).

### RDS Storage Auto Scaling
- Automatically increases storage when RDS detects you're running low on free storage, without downtime.

### RDS Read Replicas (Scalability)
- Up to **15 read replicas**, within an AZ, cross-AZ, or cross-region.
- Replication is **asynchronous**, so reads are eventually consistent.
- Used to **scale read workloads** - applications must update their connection strings to use the replica endpoint(s) for reads.
- Read replicas can be promoted to their own standalone database.

### RDS Multi-AZ (High Availability / Disaster Recovery)
- **Synchronous replication** to a standby instance in a different AZ.
- One DNS name - automatic failover to standby in case of a failure (AZ outage, loss of network, instance/storage failure).
- Not used for scaling - the standby is passive.
- You can convert a read replica to Multi-AZ.

## Amazon Aurora
- AWS proprietary database, **compatible with PostgreSQL and MySQL** drivers.
- Claimed to be 5x faster than MySQL and 3x faster than PostgreSQL on RDS, at ~1/10th the cost of commercial databases.
- Storage automatically grows in increments of 10GB up to 128TB.
- Always has **6 copies of data across 3 AZs** - highly durable, self-healing.
- **Aurora Replicas** (up to 15) with faster failover than RDS.
- **Aurora Serverless**: automated database instantiation and auto-scaling based on actual usage - good for unpredictable/intermittent workloads, pay per second.
- **Global Database**: 1 primary region (read/write) + up to 5 secondary (read-only) regions, with replication lag under 1 second - useful for global apps and DR.

## Amazon DynamoDB
- A fully managed, highly available **NoSQL key-value/document database** with single-digit millisecond performance.
- Scales to massive workloads, distributed "serverless" database.
- Data stored in **tables**, each with a primary key (partition key, optionally + sort key) defined at creation; schema-less for other attributes.
- **Capacity modes**:
  - **Provisioned** (default): specify reads/writes per second; can use Auto Scaling.
  - **On-Demand**: pay-per-request, scales automatically with no capacity planning, good for unpredictable workloads (more expensive per request).
- **DynamoDB Accelerator (DAX)**: a fully managed, highly available, in-memory cache for DynamoDB - reduces read latency from milliseconds to microseconds, without application logic changes.
- **DynamoDB Global Tables**: multi-region, multi-active replication for low-latency global access.
- **DynamoDB Streams**: capture item-level changes, integrate with Lambda for event-driven processing.
- **TTL (Time To Live)**: automatically delete expired items.

## Amazon ElastiCache
- A managed **in-memory** data store / cache service, supporting **Redis** or **Memcached**.
- Helps reduce load on databases for read-heavy workloads, and can be used for user session storage.
- Like RDS but for in-memory databases - AWS manages OS maintenance, patching, optimization, setup, configuration, monitoring, failure recovery, and backups.

## Choosing the Right Database (high level)
| Need | Service |
|---|---|
| Traditional relational/SQL workload | RDS |
| High-performance, MySQL/PostgreSQL-compatible relational with auto-scaling storage | Aurora |
| Key-value or document NoSQL at massive scale, single-digit ms latency | DynamoDB |
| In-memory caching to reduce DB load / fast session store | ElastiCache |
| OLAP / data warehouse for analytics | Redshift (covered next section) |

## Shared Responsibility for Databases
- **AWS**: managing underlying EC2 instances/OS, patching the database engine (RDS/Aurora), ensuring durability/availability of the managed infrastructure.
- **Customer**: choosing the right instance/storage size, setting up Multi-AZ/read replicas as needed, managing database-level users and access, encryption configuration, and backup retention settings.
`,
    },
    flashcards: [
      {
        id: "s08-f01",
        sectionId: "s08",
        front: "What database engines does Amazon RDS support?",
        back: "PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.",
      },
      {
        id: "s08-f02",
        sectionId: "s08",
        front: "What is the purpose of RDS Read Replicas, and what type of replication do they use?",
        back: "To scale read-heavy workloads (up to 15 replicas); replication is ASYNCHRONOUS, so reads are eventually consistent.",
      },
      {
        id: "s08-f03",
        sectionId: "s08",
        front: "What is the purpose of RDS Multi-AZ, and what type of replication does it use?",
        back: "High availability/disaster recovery via a standby instance in another AZ with SYNCHRONOUS replication and automatic failover; not used for scaling reads.",
      },
      {
        id: "s08-f04",
        sectionId: "s08",
        front: "How many copies of data does Aurora maintain, and across how many AZs?",
        back: "6 copies of data across 3 Availability Zones, providing high durability and self-healing storage.",
      },
      {
        id: "s08-f05",
        sectionId: "s08",
        front: "When would you choose Aurora Serverless?",
        back: "For unpredictable or intermittent database workloads - it automatically scales capacity based on actual usage and you pay per second.",
      },
      {
        id: "s08-f06",
        sectionId: "s08",
        front: "What are the two DynamoDB capacity modes?",
        back: "Provisioned (specify RCU/WCU, optionally with Auto Scaling) and On-Demand (pay-per-request, automatic scaling, good for unpredictable traffic).",
      },
      {
        id: "s08-f07",
        sectionId: "s08",
        front: "What is DynamoDB DAX used for?",
        back: "DynamoDB Accelerator - a managed in-memory cache that reduces DynamoDB read latency from milliseconds to microseconds.",
      },
      {
        id: "s08-f08",
        sectionId: "s08",
        front: "What is ElastiCache and what two engines does it support?",
        back: "A managed in-memory data store/cache service supporting Redis and Memcached, used to reduce database load and speed up reads.",
      },
    ],
    questions: [
      {
        id: "s08-q01",
        sectionId: "s08",
        domain: 3,
        question: "A company wants to scale read traffic for their RDS MySQL database without affecting write performance. What should they use?",
        options: ["Multi-AZ deployment", "Read Replicas", "DynamoDB Global Tables", "ElastiCache write-through"],
        correct: [1],
        explanation: "RDS Read Replicas offload read traffic to asynchronously replicated copies, scaling reads independently of writes.",
        difficulty: "easy",
      },
      {
        id: "s08-q02",
        sectionId: "s08",
        domain: 3,
        question: "Which RDS feature provides automatic failover to a standby instance in another AZ during an outage, using synchronous replication?",
        options: ["Read Replicas", "Multi-AZ deployment", "Aurora Serverless", "DynamoDB Streams"],
        correct: [1],
        explanation: "Multi-AZ uses synchronous replication to a standby in another AZ and provides automatic failover for high availability.",
        difficulty: "easy",
      },
      {
        id: "s08-q03",
        sectionId: "s08",
        domain: 3,
        question: "Which AWS database is described as MySQL/PostgreSQL-compatible, up to 5x faster than standard MySQL, with storage that auto-scales up to 128TB?",
        options: ["Amazon RDS for MySQL", "Amazon Aurora", "Amazon DynamoDB", "Amazon Redshift"],
        correct: [1],
        explanation: "Amazon Aurora is AWS's proprietary, MySQL/PostgreSQL-compatible database offering higher performance and auto-scaling storage.",
        difficulty: "easy",
      },
      {
        id: "s08-q04",
        sectionId: "s08",
        domain: 3,
        question: "A mobile gaming app needs a NoSQL database with single-digit millisecond latency that can handle unpredictable traffic spikes without capacity planning. Which configuration fits best?",
        options: [
          "RDS with Multi-AZ",
          "DynamoDB with On-Demand capacity mode",
          "Aurora with Read Replicas",
          "ElastiCache Memcached only",
        ],
        correct: [1],
        explanation: "DynamoDB On-Demand automatically scales to handle unpredictable traffic with no capacity planning, ideal for variable workloads.",
        difficulty: "medium",
      },
      {
        id: "s08-q05",
        sectionId: "s08",
        domain: 3,
        question: "What is the primary purpose of Amazon ElastiCache?",
        options: [
          "To provide a managed data warehouse for analytics",
          "To provide an in-memory cache (Redis/Memcached) that reduces load on backend databases",
          "To replace RDS entirely for relational workloads",
          "To run serverless Hadoop clusters",
        ],
        correct: [1],
        explanation: "ElastiCache is a managed in-memory caching service (Redis or Memcached) used to speed up reads and reduce database load.",
        difficulty: "easy",
      },
      {
        id: "s08-q06",
        sectionId: "s08",
        domain: 3,
        question: "A global application needs a relational database with a primary writable region and multiple read-only regions with sub-second replication lag. Which Aurora feature provides this?",
        options: ["Aurora Replicas (single region)", "Aurora Global Database", "Aurora Serverless", "RDS Multi-AZ"],
        correct: [1],
        explanation: "Aurora Global Database spans multiple AWS regions with one primary (read/write) region and up to 5 secondary read-only regions with <1s replication lag.",
        difficulty: "medium",
      },
      {
        id: "s08-q07",
        sectionId: "s08",
        domain: 3,
        question: "Which DynamoDB feature lets you automatically remove items from a table after a specified time without manual deletion?",
        options: ["DynamoDB Streams", "DAX", "Time To Live (TTL)", "Global Tables"],
        correct: [2],
        explanation: "TTL automatically expires and deletes items from a DynamoDB table after a defined timestamp attribute is reached.",
        difficulty: "medium",
      },
      {
        id: "s08-q08",
        sectionId: "s08",
        domain: 3,
        question: "What happens automatically when RDS Storage Auto Scaling is enabled and free storage runs low?",
        options: [
          "The database is automatically shut down",
          "RDS automatically increases the allocated storage without downtime",
          "A read replica is automatically created",
          "RDS switches the engine to Aurora",
        ],
        correct: [1],
        explanation: "RDS Storage Auto Scaling automatically increases storage capacity when free storage is low, with no downtime.",
        difficulty: "medium",
      },
      {
        id: "s08-q09",
        sectionId: "s08",
        domain: 3,
        question: "Which statement about RDS Read Replicas is TRUE?",
        options: [
          "They use synchronous replication and are strongly consistent",
          "They can be promoted to become standalone databases",
          "They are limited to a maximum of 2 per primary instance",
          "They automatically provide failover for the primary",
        ],
        correct: [1],
        explanation: "RDS Read Replicas (asynchronous, up to 15) can be promoted to standalone database instances if needed.",
        difficulty: "hard",
      },
      {
        id: "s08-q10",
        sectionId: "s08",
        domain: 3,
        question: "A company wants to react in near real-time to item-level changes (inserts/updates/deletes) in a DynamoDB table by triggering a Lambda function. What should they use?",
        options: ["DynamoDB Global Tables", "DynamoDB Streams", "DAX", "RDS Read Replicas"],
        correct: [1],
        explanation: "DynamoDB Streams capture a time-ordered sequence of item-level changes and can trigger AWS Lambda functions for event-driven processing.",
        difficulty: "medium",
      },
    ],
  },

  // ===========================================================
  // Section 9 - Analytics: Redshift, EMR, Athena, QuickSight, Glue
  // ===========================================================
  {
    section: {
      id: "s09",
      number: 9,
      title: "Analytics: Redshift, EMR, Athena, QuickSight & Glue",
      summary:
        "Big data and analytics services: data warehousing with Redshift, big data processing with EMR, serverless SQL with Athena, BI with QuickSight, and ETL with Glue.",
      domain: 3,
      estMinutes: 40,
      content: `
## Amazon Redshift
- A **data warehousing** service, based on PostgreSQL, but used for **OLAP (Online Analytical Processing)** - analytics and reporting, not OLTP.
- Uses **columnar storage** and **massively parallel query execution (MPP)** for fast analytical queries across large datasets.
- Loaded mainly through bulk loads from S3, or integrations with other AWS data services (Kinesis Data Firehose, Glue, DMS).
- **Redshift Spectrum**: query data directly in S3 without loading it into Redshift.
- Pay for the cluster (provisioned) or use **Redshift Serverless** to automatically scale capacity.

## Amazon EMR (Elastic MapReduce)
- Helps create **Hadoop clusters** (Big Data) to process vast amounts of data using frameworks like Apache Spark, Hive, HBase, Flink, Hudi, and Presto.
- EMR manages provisioning, cluster configuration, auto-scaling, and uses EC2 instances under the hood.
- Use cases: data processing, machine learning, web indexing, big data ETL.

## Amazon Athena
- A **serverless** query service to perform analytics directly against data stored in **S3**, using standard **SQL**.
- No infrastructure to manage; pay per query (based on amount of data scanned).
- Commonly used for quick, ad-hoc log analytics (e.g., querying VPC Flow Logs, ELB logs, CloudTrail logs stored in S3).
- Use compressed/columnar formats (e.g., Parquet) and partitioning to reduce cost and improve performance.

## Amazon QuickSight
- A **serverless, cloud-based Business Intelligence (BI)** service to create interactive dashboards and visualizations.
- Connects to many data sources: Redshift, Athena, RDS, S3, on-premises databases, and SaaS applications.
- Uses **SPICE** (Super-fast Parallel In-memory Calculation Engine) for fast, in-memory data computation.
- Use case: business analysts creating dashboards to visualize KPIs, sales data, etc.

## AWS Glue
- A **serverless ETL (Extract, Transform, Load)** service to prepare and transform data for analytics.
- **Glue Data Catalog**: a centralized metadata repository describing the structure/location of data across data stores (used by Athena, Redshift Spectrum, EMR).
- **Glue Crawlers**: automatically scan data sources (e.g., S3) and populate the Data Catalog with schema information.
- Helps build **data lakes** by cataloging, cleaning, enriching, and moving data reliably.

## Putting It Together (Typical Data Lake / Analytics Flow)
1. Raw data lands in **S3** (data lake).
2. **Glue Crawlers** scan S3 and populate the **Glue Data Catalog**.
3. **Athena** runs ad-hoc SQL queries directly on S3 data using the catalog.
4. **Redshift / Redshift Spectrum** is used for heavier, structured analytical workloads and data warehousing.
5. **EMR** processes very large datasets with Spark/Hadoop for custom big-data jobs.
6. **QuickSight** visualizes the results for business users via dashboards.
`,
    },
    flashcards: [
      {
        id: "s09-f01",
        sectionId: "s09",
        front: "Is Amazon Redshift designed for OLTP or OLAP workloads?",
        back: "OLAP (Online Analytical Processing) - it's a data warehouse for analytics and reporting, using columnar storage and MPP.",
      },
      {
        id: "s09-f02",
        sectionId: "s09",
        front: "What does Redshift Spectrum allow you to do?",
        back: "Query data directly in S3 using Redshift SQL, without first loading the data into Redshift.",
      },
      {
        id: "s09-f03",
        sectionId: "s09",
        front: "What is Amazon EMR used for?",
        back: "Provisioning and managing big-data clusters (Hadoop ecosystem: Spark, Hive, HBase, Presto, etc.) on EC2 for large-scale data processing.",
      },
      {
        id: "s09-f04",
        sectionId: "s09",
        front: "What is Amazon Athena and how is it billed?",
        back: "A serverless service for running SQL queries directly against data in S3; billed per query based on the amount of data scanned.",
      },
      {
        id: "s09-f05",
        sectionId: "s09",
        front: "How can you reduce Athena query costs?",
        back: "Use compressed, columnar file formats (e.g., Parquet) and partition your S3 data, reducing the amount of data scanned per query.",
      },
      {
        id: "s09-f06",
        sectionId: "s09",
        front: "What is Amazon QuickSight, and what engine powers its fast in-memory analysis?",
        back: "A serverless BI/dashboarding service; powered by SPICE (Super-fast Parallel In-memory Calculation Engine).",
      },
      {
        id: "s09-f07",
        sectionId: "s09",
        front: "What does AWS Glue do?",
        back: "Provides serverless ETL (Extract, Transform, Load) capabilities, plus the Glue Data Catalog (centralized metadata repository) used by Athena, Redshift Spectrum, and EMR.",
      },
      {
        id: "s09-f08",
        sectionId: "s09",
        front: "What is a Glue Crawler?",
        back: "A component that scans data sources (like S3) and automatically populates the Glue Data Catalog with schema/table definitions.",
      },
    ],
    questions: [
      {
        id: "s09-q01",
        sectionId: "s09",
        domain: 3,
        question: "Which AWS service is purpose-built as a data warehouse for OLAP analytical queries using columnar storage?",
        options: ["Amazon RDS", "Amazon Redshift", "Amazon DynamoDB", "Amazon Athena"],
        correct: [1],
        explanation: "Amazon Redshift is a columnar, MPP data warehouse designed for OLAP analytics and reporting.",
        difficulty: "easy",
      },
      {
        id: "s09-q02",
        sectionId: "s09",
        domain: 3,
        question: "A company wants to run a one-off SQL query against log files stored in S3 without provisioning any servers. Which service is the BEST fit?",
        options: ["Amazon EMR", "Amazon Athena", "Amazon Redshift (provisioned)", "AWS Glue Crawler"],
        correct: [1],
        explanation: "Athena is a serverless query service designed for ad-hoc SQL queries directly against S3 data, billed per query.",
        difficulty: "easy",
      },
      {
        id: "s09-q03",
        sectionId: "s09",
        domain: 3,
        question: "Which service would a company use to provision a managed Apache Spark/Hadoop cluster for large-scale custom data processing?",
        options: ["Amazon EMR", "Amazon QuickSight", "AWS Glue", "Amazon Athena"],
        correct: [0],
        explanation: "Amazon EMR provisions and manages big-data clusters running frameworks like Spark and Hadoop on EC2.",
        difficulty: "easy",
      },
      {
        id: "s09-q04",
        sectionId: "s09",
        domain: 3,
        question: "Which service provides interactive BI dashboards and uses an in-memory engine called SPICE for fast visualizations?",
        options: ["Amazon Redshift", "Amazon QuickSight", "AWS Glue", "Amazon Athena"],
        correct: [1],
        explanation: "Amazon QuickSight is the serverless BI dashboarding service that uses SPICE for fast in-memory computation.",
        difficulty: "easy",
      },
      {
        id: "s09-q05",
        sectionId: "s09",
        domain: 3,
        question: "What is the role of the AWS Glue Data Catalog in an analytics pipeline?",
        options: [
          "It stores raw data permanently instead of S3",
          "It acts as a centralized metadata repository describing schemas/locations used by Athena, Redshift Spectrum, and EMR",
          "It replaces the need for IAM permissions",
          "It is a visualization tool for end users",
        ],
        correct: [1],
        explanation: "The Glue Data Catalog centrally stores table/schema metadata that other services (Athena, Redshift Spectrum, EMR) use to locate and interpret data.",
        difficulty: "medium",
      },
      {
        id: "s09-q06",
        sectionId: "s09",
        domain: 3,
        question: "How can a company reduce both cost and query time for Athena queries against a large S3 dataset?",
        options: [
          "Store data as uncompressed CSV files",
          "Convert data to a columnar, compressed format like Parquet and partition it",
          "Disable the Glue Data Catalog",
          "Increase the S3 bucket size limit",
        ],
        correct: [1],
        explanation: "Using compressed columnar formats (e.g., Parquet) and partitioning reduces the amount of data scanned, lowering Athena cost and query time.",
        difficulty: "medium",
      },
      {
        id: "s09-q07",
        sectionId: "s09",
        domain: 3,
        question: "A data warehouse team wants to query historical data sitting in S3 alongside data already loaded in Redshift, without an additional ETL step. What should they use?",
        options: ["Amazon Athena only", "Redshift Spectrum", "AWS Glue Crawler", "Amazon EMR"],
        correct: [1],
        explanation: "Redshift Spectrum lets Redshift query data directly in S3 alongside data already in the cluster, without loading it first.",
        difficulty: "medium",
      },
      {
        id: "s09-q08",
        sectionId: "s09",
        domain: 3,
        question: "Which service would automatically scan an S3 bucket containing JSON files and populate table definitions for use by Athena?",
        options: ["AWS Glue Crawler", "Amazon QuickSight", "Amazon Redshift", "Amazon EMR"],
        correct: [0],
        explanation: "Glue Crawlers scan data sources like S3 and automatically infer and register schema/table definitions into the Glue Data Catalog.",
        difficulty: "medium",
      },
      {
        id: "s09-q09",
        sectionId: "s09",
        domain: 3,
        question: "Which option allows Redshift compute capacity to scale automatically without managing cluster nodes?",
        options: ["Redshift Spectrum", "Redshift Serverless", "Redshift Reserved Nodes", "Redshift Single-Node only"],
        correct: [1],
        explanation: "Redshift Serverless automatically provisions and scales data warehouse capacity based on workload, without managing clusters.",
        difficulty: "medium",
      },
      {
        id: "s09-q10",
        sectionId: "s09",
        domain: 3,
        question: "In a typical AWS data lake architecture, what is the usual ROLE of Amazon S3?",
        options: [
          "It serves as the compute engine for SQL queries",
          "It serves as the central, durable storage layer that other analytics services read from",
          "It replaces the need for a Glue Data Catalog",
          "It is only used for hosting static websites",
        ],
        correct: [1],
        explanation: "S3 commonly serves as the central data lake storage layer, with services like Athena, Redshift Spectrum, EMR, and Glue operating on top of it.",
        difficulty: "easy",
      },
    ],
  },
];

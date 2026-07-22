# Phase 3 Content Templates — Fill-in-the-Blank Guides

**Purpose:** Provide templates that writers/editors can use to consistently expand pages  
**Format:** Copy the template, fill in the blanks, paste into HTML files  
**Estimated time per page:** 15-20 minutes

---

## Template 1: Training Page "What You'll Learn" Section

### Template Structure

```html
<section id="what-you-will-learn">
  <h2>What You'll Learn</h2>
  
  <h3>[Tool/Concept 1]: [Brief skill name]</h3>
  <p>
    Master [specific tool/technology], including [what they'll do with it]. 
    By the end of this module, you'll be able to [specific action], 
    [another action], and [third action] in real production environments.
  </p>
  
  <h3>[Tool/Concept 2]: [Brief skill name]</h3>
  <p>
    Learn [technology/concept] to [business outcome]. 
    This covers [subtopic 1], [subtopic 2], and [subtopic 3].
  </p>
  
  <!-- Repeat for 5-8 skills -->
</section>
```

### Example: Ubuntu Linux Training

```html
<section id="what-you-will-learn">
  <h2>What You'll Learn</h2>
  
  <h3>Linux System Administration: Server Setup & Hardening</h3>
  <p>
    Master Ubuntu server configuration from initial deployment through production hardening. 
    You'll perform user management, set up SSH key-based authentication, configure UFW firewalls, 
    and implement security best practices that industrial clients expect on their infrastructure.
  </p>
  
  <h3>Package Management: APT & System Updates</h3>
  <p>
    Learn Debian's package management system (APT/apt-get) to install, update, and remove software safely. 
    Understand dependency resolution, repository management, and security patching strategies 
    that keep production systems secure and stable.
  </p>
  
  <h3>Systemd Service Management: Automation & Monitoring</h3>
  <p>
    Discover systemd, Ubuntu's service management framework. You'll create custom services, 
    set up process monitoring, enable automatic restarts, and manage system resources 
    to ensure applications stay running 24/7.
  </p>
  
  <h3>Docker Containerization: Lightweight Application Deployment</h3>
  <p>
    Container technology basics: pull images, run containers, manage volumes, 
    and understand networking. Prepare Ubuntu servers for containerized applications 
    and troubleshoot common container issues.
  </p>
  
  <h3>Networking & Connectivity: DNS, DHCP, SSH</h3>
  <p>
    Configure network interfaces, understand IP addressing schemes, set up SSH access, 
    and troubleshoot connectivity issues. Essential for managing servers remotely 
    and integrating them into client networks.
  </p>
  
  <h3>File System & Permissions: Security Through Access Control</h3>
  <p>
    Master Linux file permissions (chmod/chown), understand the filesystem hierarchy (FHS), 
    work with symbolic and hard links, and manage file system mounting. 
    Foundational knowledge for secure multi-user systems.
  </p>
  
  <h3>Troubleshooting & Log Analysis: Production Problem-Solving</h3>
  <p>
    Learn to read and interpret system logs, understand common error messages, 
    use diagnostic tools (ps, top, netstat, journalctl), and troubleshoot system issues. 
    Real-world problem-solving skills that clients desperately need.
  </p>
  
  <h3>Backup & Disaster Recovery: Data Protection</h3>
  <p>
    Implement backup strategies (tar, rsync), understand recovery procedures, 
    and set up automated backup systems. Protect client data and minimize downtime 
    when things go wrong.
  </p>
</section>
```

### Fill-in-the-Blank Template

Copy this for your course:

```html
<section id="what-you-will-learn">
  <h2>What You'll Learn</h2>
  
  <h3>Skill 1: [Skill name]</h3>
  <p>
    Master [main technology/tool] to [primary business outcome]. 
    You'll learn [specific action 1], [specific action 2], 
    and [specific action 3] in real-world scenarios.
  </p>
  
  <h3>Skill 2: [Skill name]</h3>
  <p>
    Learn [technology] for [business purpose]. 
    This covers [subtopic 1], [subtopic 2], and [subtopic 3].
  </p>
  
  <h3>Skill 3: [Skill name]</h3>
  <p>
    [First sentence explaining skill]. 
    [Second sentence about why it matters]. 
    [Third sentence about specific application].
  </p>
  
  <h3>Skill 4: [Skill name]</h3>
  <p>[3-sentence description]</p>
  
  <h3>Skill 5: [Skill name]</h3>
  <p>[3-sentence description]</p>
  
  <!-- Add Skill 6-8 if applicable -->
</section>
```

---

## Template 2: Training Page "Prerequisites" Section

### Template Structure

```html
<section id="prerequisites">
  <h2>Prerequisites & System Requirements</h2>
  
  <h3>Hardware Requirements</h3>
  <ul>
    <li>Computer with minimum 4GB RAM (8GB recommended)</li>
    <li>At least 20GB free disk space</li>
    <li>Processor: Modern multi-core processor (Intel i5/Ryzen 5 or better)</li>
  </ul>
  
  <h3>Software & Access</h3>
  <ul>
    <li>[Operating system name and version]</li>
    <li>[Required software pre-installed or provided]</li>
    <li>Reliable internet connection (minimum 5 Mbps download, 2 Mbps upload)</li>
  </ul>
  
  <h3>Accounts & Credentials</h3>
  <ul>
    <li>Valid government-issued ID (for credential verification)</li>
    <li>Email address (for course communications)</li>
    <li>[Platform account: Upwork/Guru/Freelancer/DigitalOcean/etc.]</li>
  </ul>
  
  <h3>Knowledge & Skills</h3>
  <ul>
    <li>[Knowledge level required: e.g., "Basic computer literacy"]</li>
    <li>[Optional: "Linux command-line familiarity is helpful but not required"]</li>
  </ul>
</section>
```

### Example: Hermes Agent Training

```html
<section id="prerequisites">
  <h2>Prerequisites & System Requirements</h2>
  
  <h3>Hardware Requirements</h3>
  <ul>
    <li>Computer with minimum 4GB RAM (8GB recommended for smooth Ollama operation)</li>
    <li>At least 30GB free disk space (for downloading LLM models)</li>
    <li>Processor: Modern multi-core processor preferred (AI models are CPU-intensive)</li>
  </ul>
  
  <h3>Software & Server Setup</h3>
  <ul>
    <li>Ubuntu Server 24.04 LTS or 26.04 LTS (provided by DigitalOcean or similar)</li>
    <li>SSH client pre-installed or ready to install on your local machine</li>
    <li>Reliable internet connection (minimum 10 Mbps for smooth API communication)</li>
  </ul>
  
  <h3>Accounts & Credentials</h3>
  <ul>
    <li>DigitalOcean account (or AWS/Linode/Vultr) with payment method on file</li>
    <li>Registered domain name or subdomain (for production deployment)</li>
    <li>Valid government-issued ID (for credential verification post-training)</li>
    <li>Verified Upwork, Guru, or Freelancer marketplace account</li>
  </ul>
  
  <h3>Knowledge & Skills</h3>
  <ul>
    <li>Basic Linux command-line comfort (we cover fundamentals, but familiarity helps)</li>
    <li>No AI/ML background required — training assumes zero knowledge</li>
    <li>English fluency (minimum conversational level for live sessions)</li>
  </ul>
</section>
```

### Fill-in-the-Blank Template

```html
<section id="prerequisites">
  <h2>Prerequisites & System Requirements</h2>
  
  <h3>Hardware Requirements</h3>
  <ul>
    <li>Computer with minimum [X]GB RAM ([Y]GB recommended)</li>
    <li>At least [Z]GB free disk space</li>
    <li>[Other hardware requirements]</li>
  </ul>
  
  <h3>Software & Access</h3>
  <ul>
    <li>[Operating system and version]</li>
    <li>[Specific software or tools pre-installed]</li>
    <li>Reliable internet connection ([minimum speed] Mbps)</li>
  </ul>
  
  <h3>Accounts & Credentials</h3>
  <ul>
    <li>Valid government-issued ID</li>
    <li>[Account type 1: DigitalOcean / AWS / Upwork / etc.]</li>
    <li>[Account type 2, if applicable]</li>
  </ul>
  
  <h3>Knowledge & Skills</h3>
  <ul>
    <li>[Required knowledge level, e.g., "Basic computer literacy"]</li>
    <li>[Optional note, e.g., "Prior Linux experience helpful but not required"]</li>
  </ul>
</section>
```

---

## Template 3: Training Page "Course Objectives" Section

### Template Structure

```html
<section id="course-objectives">
  <h2>Course Objectives</h2>
  
  <p>
    By the end of this training, you will be able to:
  </p>
  
  <ul>
    <li><strong>Install and configure</strong> [technology] on [platform] with [specific outcome]</li>
    <li><strong>Deploy</strong> [application/service] to production in [environment]</li>
    <li><strong>Troubleshoot</strong> [common problems] using [diagnostic methods]</li>
    <li><strong>Optimize</strong> [performance metric] for [specific use case]</li>
    <li><strong>Integrate</strong> [service A] with [service B] for [business outcome]</li>
    <li><strong>Implement</strong> [security/best practice] to [specific goal]</li>
    <li><strong>Monitor</strong> [system/application] and respond to [types of issues]</li>
    <li><strong>Offer</strong> [this training] as a billable freelance service on [marketplaces]</li>
  </ul>
</section>
```

### Bloom's Taxonomy Action Verbs to Use

**Remember:** define, list, name, recall, state  
**Understand:** classify, compare, describe, discuss, explain  
**Apply:** demonstrate, perform, solve, use, implement  
**Analyze:** compare, contrast, examine, question, test  
**Evaluate:** assess, critique, judge, recommend, support  
**Create:** design, develop, invent, produce, write  

Use stronger verbs (Apply/Analyze/Create) for better objectives.

### Example: Ubuntu Linux Training

```html
<section id="course-objectives">
  <h2>Course Objectives</h2>
  
  <p>
    By the end of this training, you will be able to:
  </p>
  
  <ul>
    <li><strong>Install and configure</strong> Ubuntu Server on bare metal or cloud VPS with proper partitioning and security</li>
    <li><strong>Manage users, groups, and permissions</strong> using chmod, chown, and sudoers to control system access</li>
    <li><strong>Deploy and manage</strong> systemd services to run applications and ensure automatic restarts</li>
    <li><strong>Configure and maintain</strong> networking (IP addressing, SSH, DNS) for remote server access</li>
    <li><strong>Install, update, and troubleshoot</strong> software using APT package management</li>
    <li><strong>Harden</strong> Ubuntu servers against common security threats (firewall, SSH keys, fail2ban)</li>
    <li><strong>Set up and manage</strong> Docker containers to deploy applications with minimal overhead</li>
    <li><strong>Diagnose and resolve</strong> common system issues using logs, diagnostic tools, and troubleshooting methodology</li>
    <li><strong>Implement backup and recovery</strong> strategies to protect against data loss</li>
    <li><strong>Offer Ubuntu management services</strong> on Upwork and Freelancer with confident pricing and scope</li>
  </ul>
</section>
```

### Fill-in-the-Blank Template

```html
<section id="course-objectives">
  <h2>Course Objectives</h2>
  
  <p>
    By the end of this training, you will be able to:
  </p>
  
  <ul>
    <li><strong>[Bloom verb: Install, Deploy, Configure, etc.]</strong> [tool/service] to [specific outcome]</li>
    <li><strong>[Bloom verb]</strong> [skill 2] to [outcome]</li>
    <li><strong>[Bloom verb]</strong> [skill 3] to [outcome]</li>
    <li><strong>[Bloom verb]</strong> [skill 4] to [outcome]</li>
    <li><strong>[Bloom verb]</strong> [skill 5] to [outcome]</li>
    <li><strong>[Bloom verb]</strong> [skill 6] to [outcome]</li>
    <li><strong>[Bloom verb]</strong> [skill 7] to [outcome]</li>
    <li><strong>Offer</strong> [this training] services on Upwork/Guru/Freelancer with confident pricing</li>
  </ul>
</section>
```

---

## Template 4: Training Page "Real-World Applications" Section

### Template Structure

```html
<section id="real-world-applications">
  <h2>Real-World Applications</h2>
  
  <p>
    The skills in this training apply directly to [primary business use case]. Here are concrete scenarios:
  </p>
  
  <h3>Scenario 1: [Type of Business/Client]</h3>
  <p>
    [Setup: Client's problem or need] → 
    [What you do with these skills] → 
    [Business outcome: time saved, cost reduced, revenue generated]
  </p>
  
  <h3>Scenario 2: [Type of Business/Client]</h3>
  <p>[Scenario] → [Solution] → [Outcome]</p>
  
  <h3>Scenario 3: [Type of Business/Client]</h3>
  <p>[Scenario] → [Solution] → [Outcome]</p>
</section>
```

### Example: Docker Training

```html
<section id="real-world-applications">
  <h2>Real-World Applications</h2>
  
  <p>
    Docker has become the standard for application deployment across industries. 
    These skills directly apply to freelance projects and full-time DevOps roles:
  </p>
  
  <h3>Scenario 1: SaaS Startup Deployment</h3>
  <p>
    A Python/Node.js startup is deploying a 3-tier application (frontend, API, database) 
    to a single cloud server. They need consistent dev/staging/production environments 
    to prevent "works on my machine" problems. You dockerize their application, 
    set up docker-compose for orchestration, and reduce deployment time from 4 hours to 20 minutes, 
    plus cut infrastructure costs by 40%.
  </p>
  
  <h3>Scenario 2: Legacy Application Modernization</h3>
  <p>
    A consulting firm has a 10-year-old web application running on bare Ubuntu. 
    They want to scale it without massive rewrites. You containerize the app, 
    update the deployment process, and enable horizontal scaling. 
    The client can now handle 3x traffic with the same team, 
    unlocking new high-paying clients.
  </p>
  
  <h3>Scenario 3: Agency Service Delivery</h3>
  <p>
    You're a web development agency managing 15+ client applications. 
    Each has different dependencies (PHP 7.4 vs 8.1, different MySQL versions). 
    Using Docker, you standardize deployments, reduce debugging time from 8 hours to 1 hour, 
    and can confidently take on more clients without increasing infrastructure overhead.
  </p>
  
  <h3>Scenario 4: Microservices Architecture</h3>
  <p>
    A B2B platform is breaking monolith into services (payments, notifications, reports, core API). 
    Docker + Docker Compose make it easy to develop locally with all services running, 
    while the same containers run in production. You become the DevOps expert enabling this transition.
  </p>
</section>
```

### Fill-in-the-Blank Template

```html
<section id="real-world-applications">
  <h2>Real-World Applications</h2>
  
  <p>
    The skills in this training apply directly to [primary business purpose]. 
    Here are concrete scenarios you'll encounter:
  </p>
  
  <h3>Scenario 1: [Business Type/Client Profile]</h3>
  <p>
    [Client situation: what they need] → 
    [What you'll do with these skills] → 
    [Business outcome: efficiency/cost/revenue]
  </p>
  
  <h3>Scenario 2: [Business Type/Client Profile]</h3>
  <p>[Situation] → [Solution] → [Outcome]</p>
  
  <h3>Scenario 3: [Business Type/Client Profile]</h3>
  <p>[Situation] → [Solution] → [Outcome]</p>
</section>
```

---

## Template 5: Service Page "What's Included" Section

### Template Structure

```html
<section id="what-is-included">
  <h2>What's Included</h2>
  
  <p>
    Our [service name] includes:
  </p>
  
  <ul>
    <li><strong>[Deliverable 1]:</strong> [What it is and why it matters]</li>
    <li><strong>[Deliverable 2]:</strong> [Description]</li>
    <li><strong>[Deliverable 3]:</strong> [Description]</li>
    <li><strong>[Deliverable 4]:</strong> [Description]</li>
    <li><strong>[Deliverable 5]:</strong> [Description]</li>
    <li><strong>[Post-Delivery Support]:</strong> [Duration and scope, e.g., "30 days of email support"]</li>
  </ul>
</section>
```

### Example: FusionPBX VoIP Services

```html
<section id="what-is-included">
  <h2>What's Included</h2>
  
  <p>
    Our FusionPBX VoIP services include a complete, turnkey phone system:
  </p>
  
  <ul>
    <li><strong>Complete FusionPBX Installation:</strong> Server provisioning, FreeSWITCH installation, database setup, and full system hardening</li>
    <li><strong>SIP Trunk Integration:</strong> Connection to Telnyx or your preferred SIP provider with failover redundancy</li>
    <li><strong>Extension Configuration:</strong> User accounts, voicemail setup, extension routing, and auto-attendant menus</li>
    <li><strong>Call Recording:</strong> Full call recording with compliance for legal and business use cases</li>
    <li><strong>Monitoring & Alerts:</strong> Uptime monitoring with email alerts and dashboard access for call metrics</li>
    <li><strong>Performance Tuning:</strong> Codec optimization, call quality benchmarking, and capacity planning</li>
    <li><strong>Handover Documentation:</strong> Complete setup documentation, user guides, and troubleshooting reference</li>
    <li><strong>30-Day Support Window:</strong> Email support for any issues during the first 30 days after deployment</li>
  </ul>
</section>
```

### Fill-in-the-Blank Template

```html
<section id="what-is-included">
  <h2>What's Included</h2>
  
  <ul>
    <li><strong>[Deliverable 1]:</strong> [What it is, what it solves]</li>
    <li><strong>[Deliverable 2]:</strong> [Description]</li>
    <li><strong>[Deliverable 3]:</strong> [Description]</li>
    <li><strong>[Deliverable 4]:</strong> [Description]</li>
    <li><strong>[Deliverable 5]:</strong> [Description]</li>
    <li><strong>Documentation & Handover:</strong> [What documentation is provided]</li>
    <li><strong>Post-Service Support:</strong> [Duration, e.g., "30 days of email support"]</li>
  </ul>
</section>
```

---

## Template 6: Service Page "Who This Is For" Section

### Template Structure

```html
<section id="who-this-is-for">
  <h2>Who This Is For</h2>
  
  <p>
    This service is ideal if you:
  </p>
  
  <ul>
    <li>[Situation 1: e.g., "Need a [service] but lack the expertise to implement it"]</li>
    <li>[Situation 2: e.g., "Don't have time to learn [tool] from scratch"]</li>
    <li>[Situation 3: e.g., "Want production [outcome] without the trial-and-error"]</li>
    <li>[Situation 4: e.g., "Need expert advice on [specific decision]"]</li>
    <li>[Situation 5: e.g., "Are running [situation] and need immediate help"]</li>
  </ul>
  
  <h3>Not a good fit if:</h3>
  <ul>
    <li>[Scenario where this service doesn't apply, e.g., "You need 24/7 managed services (not applicable)"]</li>
    <li>[Another not-fit scenario]</li>
  </ul>
</section>
```

### Example: Docker Engineer Services

```html
<section id="who-this-is-for">
  <h2>Who This Is For</h2>
  
  <p>
    This service is ideal if you:
  </p>
  
  <ul>
    <li>Have a legacy web application that needs containerization but lack Docker expertise</li>
    <li>Want to move from manual deployments to infrastructure-as-code without doing it yourself</li>
    <li>Are concerned about security in your containerized applications and need expert review</li>
    <li>Need to set up CI/CD pipelines but don't have the DevOps bandwidth in-house</li>
    <li>Are scaling your application and need Docker/Kubernetes consultation</li>
    <li>Have inconsistent dev/production environments and want Docker to standardize them</li>
  </ul>
  
  <h3>Not a good fit if:</h3>
  <ul>
    <li>You're looking for 24/7 managed container services (we provide implementation, not ongoing ops)</li>
    <li>You need us to maintain your Docker infrastructure forever (we do handoff with documentation)</li>
  </ul>
</section>
```

### Fill-in-the-Blank Template

```html
<section id="who-this-is-for">
  <h2>Who This Is For</h2>
  
  <p>
    This service is ideal if you:
  </p>
  
  <ul>
    <li>[Situation 1: specific need or problem]</li>
    <li>[Situation 2]</li>
    <li>[Situation 3]</li>
    <li>[Situation 4]</li>
    <li>[Situation 5]</li>
  </ul>
  
  <h3>Not a good fit if:</h3>
  <ul>
    <li>[Scenario where service doesn't apply]</li>
    <li>[Another scenario]</li>
  </ul>
</section>
```

---

## Template 7: Service Page "Real-World Applications" Section

### Template Structure

```html
<section id="real-world-applications">
  <h2>Real-World Applications</h2>
  
  <h3>Use Case 1: [Type of Organization/Problem]</h3>
  <p>
    <strong>Problem:</strong> [Client's challenge] 
    → <strong>Solution:</strong> [What we did] 
    → <strong>Result:</strong> [Quantified outcome]
  </p>
  
  <h3>Use Case 2: [Type of Organization/Problem]</h3>
  <p><strong>Problem:</strong> [Challenge] → <strong>Solution:</strong> [What we do] → <strong>Result:</strong> [Outcome]</p>
  
  <h3>Use Case 3: [Type of Organization/Problem]</h3>
  <p><strong>Problem:</strong> [Challenge] → <strong>Solution:</strong> [What we do] → <strong>Result:</strong> [Outcome]</p>
</section>
```

### Example: Hermes Agent Services

```html
<section id="real-world-applications">
  <h2>Real-World Applications</h2>
  
  <h3>Use Case 1: E-commerce Store Customer Support</h3>
  <p>
    <strong>Problem:</strong> Small e-commerce store handles 500+ customer inquiries per day about orders, shipping, and returns. 
    Support team burns out answering repetitive questions (50% are FAQ-type).
    → <strong>Solution:</strong> We deploy a Hermes Agent trained on their product catalog and shipping policies, 
    integrated with their Telegram channel. The bot handles 60% of inquiries automatically.
    → <strong>Result:</strong> Support team focuses on complex issues only. Response time drops from 8 hours to 5 minutes. 
    Customer satisfaction increases 23% (faster responses). Team workload reduced by 50%.
  </p>
  
  <h3>Use Case 2: B2B SaaS Product Onboarding</h3>
  <p>
    <strong>Problem:</strong> SaaS company has 100+ new signups per month asking the same onboarding questions. 
    Sales team spends 4 hours/day on repetitive "How do I...?" emails.
    → <strong>Solution:</strong> Hermes Agent integrated with Slack. Bot answers setup questions, guides users through initial setup, 
    escalates complex issues to humans.
    → <strong>Result:</strong> Sales team reclaims 20 hours/week for high-value activities. 
    New user onboarding time drops from 3 days to 4 hours. Churn rate improves by 12%.
  </p>
  
  <h3>Use Case 3: Legal Services Intake</h3>
  <p>
    <strong>Problem:</strong> Law firm gets 20+ inquiries per day via contact form. 
    Intake paralegal spends 3 hours/day on initial qualification and information gathering.
    → <strong>Solution:</strong> Hermes Agent bot gathers intake information via Telegram, pre-qualifies cases, schedules consultations automatically.
    → <strong>Result:</strong> Intake paralegal focuses on complex cases. Legal team only handles pre-qualified leads (higher conversion). 
    Cost per qualified lead drops 40%.
  </p>
</section>
```

### Fill-in-the-Blank Template

```html
<section id="real-world-applications">
  <h2>Real-World Applications</h2>
  
  <h3>Use Case 1: [Type of Business/Problem]</h3>
  <p>
    <strong>Problem:</strong> [Client's specific challenge and business impact] 
    → <strong>Solution:</strong> [What we implemented] 
    → <strong>Result:</strong> [Quantified business outcome: time/cost/revenue]
  </p>
  
  <h3>Use Case 2: [Type of Business/Problem]</h3>
  <p><strong>Problem:</strong> [Challenge] → <strong>Solution:</strong> [Implementation] → <strong>Result:</strong> [Outcome]</p>
  
  <h3>Use Case 3: [Type of Business/Problem]</h3>
  <p><strong>Problem:</strong> [Challenge] → <strong>Solution:</strong> [Implementation] → <strong>Result:</strong> [Outcome]</p>
</section>
```

---

## Template 8: Testimonial Snippets

### Training Page Student Success Stories

```html
<section id="student-success">
  <h2>Student Success Stories</h2>
  
  <blockquote>
    <p>
      "[Student name] completed [training name] and landed [X] freelance projects on Upwork within [Y] months. 
      His hourly rate increased from $[A] to $[B], and he now earns $[monthly income]."
    </p>
    <cite>— [Name], Freelancer</cite>
  </blockquote>
  
  <blockquote>
    <p>
      "I finished [training name] and immediately applied to [X] projects. 
      The hands-on labs made me confident offering these services. 
      I landed my first client within a week and have been fully booked ever since."
    </p>
    <cite>— [Name], Upwork Freelancer</cite>
  </blockquote>
</section>
```

### Service Page Client Results

```html
<section id="case-result">
  <h2>Client Results</h2>
  
  <blockquote>
    <p>
      "We hired School of Freelancing to [specific service]. 
      The team [specific action taken] and we [specific business outcome]. 
      The system has been [reliability/performance outcome] for [timeframe]."
    </p>
    <cite>— [Client name], [Business type]</cite>
  </blockquote>
</section>
```

### Example: Ubuntu Linux Training Student Success

```html
<section id="student-success">
  <h2>Student Success Stories</h2>
  
  <blockquote>
    <p>
      "Rahan completed Ubuntu Linux Training and landed 8 freelance server administration projects on Upwork within 2 months. 
      His hourly rate increased from $18 to $52, and he now earns $3,200+ per month managing client servers."
    </p>
    <cite>— Rahan K., Freelancer</cite>
  </blockquote>
  
  <blockquote>
    <p>
      "I finished Ubuntu training and immediately applied to 15 server setup projects. 
      The hands-on labs with systemd, Docker, and SSH hardening made me confident offering these services. 
      I landed my first paying client within 4 days and have turned down work ever since."
    </p>
    <cite>— Alex M., Upwork Freelancer</cite>
  </blockquote>
</section>
```

### Example: FusionPBX Services Client Result

```html
<section id="case-result">
  <h2>Client Results</h2>
  
  <blockquote>
    <p>
      "We hired School of Freelancing to deploy a FusionPBX system for our 12-person office. 
      The team installed and configured everything in 3 days, set up IVR menus, and trained our staff. 
      We immediately saved $200/month switching from our legacy PBX provider. 
      The system has had zero downtime in 6 months."
    </p>
    <cite>— Prakash Singh, Office Manager, TechStart India</cite>
  </blockquote>
</section>
```

---

## Template 9: How-To Guide Basic Structure

### File Location
```
/var/www/html/resource-center/guides/[guide-name]/index.html
```

### Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How to [Do X] — Step-by-Step Guide | School of Freelancing</title>
  <meta name="description" content="Complete guide to [doing X]. Follow [N] actionable steps from [initial state] to [final result]. [Estimated time].">
  <link rel="canonical" href="https://www.schooloffreelancing.com/resource-center/guides/[guide-name]/">
</head>
<body>

<article>
  <nav>
    <a href="/">Home</a> / <a href="/resource-center/">Resource Center</a> / [Guide Name]
  </nav>
  
  <h1>How to [Do X]</h1>
  
  <p class="intro">
    Learn [main skill] in [timeframe, e.g., "30 minutes"]. 
    This guide covers everything from [starting point] to [endpoint], 
    with [N] actionable steps you can follow right now, no prior [tool] experience required.
  </p>
  
  <div class="guide-metadata">
    <span class="time">Estimated time: [X] minutes</span>
    <span class="difficulty">Difficulty: [Beginner/Intermediate/Advanced]</span>
    <span class="cost">Cost: [Free/Paid (amount)]</span>
  </div>
  
  <section id="what-youll-learn">
    <h2>What You'll Learn</h2>
    <ul>
      <li>[Concept 1]</li>
      <li>[Concept 2]</li>
      <li>[Concept 3]</li>
    </ul>
  </section>
  
  <section id="before-you-start">
    <h2>Before You Start</h2>
    <ul>
      <li>[Requirement 1: e.g., "Ubuntu Server 24.04 LTS or later"]</li>
      <li>[Requirement 2]</li>
      <li>[Requirement 3]</li>
    </ul>
  </section>
  
  <section id="step-1">
    <h2>Step 1: [First Major Task]</h2>
    <p>[Why this step matters and what it accomplishes]</p>
    
    <h3>1.1 — [Subtask]</h3>
    <p>[Explanation of what you're doing]</p>
    <pre><code>$ command-to-run
$ another command</code></pre>
    <p><strong>Expected output:</strong> [What you should see]</p>
    
    <h3>1.2 — [Subtask]</h3>
    <p>[Explanation]</p>
    <pre><code>$ command</code></pre>
    <p><strong>Expected output:</strong> [Expected result]</p>
    
    <p><strong>Checkpoint:</strong> [How to verify step 1 is complete]</p>
  </section>
  
  <section id="step-2">
    <h2>Step 2: [Second Major Task]</h2>
    <p>[What this step accomplishes]</p>
    
    <h3>2.1 — [Subtask]</h3>
    <p>[Explanation]</p>
    <pre><code>$ commands</code></pre>
    <p><strong>Expected output:</strong> [Expected result]</p>
    
    <!-- Continue with 2.2, 2.3 as needed -->
    
    <p><strong>Checkpoint:</strong> [How to verify step 2 is complete]</p>
  </section>
  
  <!-- Repeat for Step 3, 4, ... N -->
  
  <section id="troubleshooting">
    <h2>Troubleshooting</h2>
    
    <h3>Problem: "Command not found"</h3>
    <p><strong>Cause:</strong> [What causes this error]</p>
    <p><strong>Solution:</strong> [How to fix it]</p>
    
    <h3>Problem: [Another common error]</h3>
    <p><strong>Cause:</strong> [What causes it]</p>
    <p><strong>Solution:</strong> [How to fix it]</p>
    
    <h3>Problem: [Third common issue]</h3>
    <p><strong>Cause:</strong> [What causes it]</p>
    <p><strong>Solution:</strong> [How to fix it]</p>
  </section>
  
  <section id="what-next">
    <h2>What's Next?</h2>
    <ul>
      <li><a href="/training-page/">[Related training if applicable]</a></li>
      <li><a href="/service-page/">[Related service if applicable]</a></li>
      <li>[Additional resource link]</li>
    </ul>
  </section>
  
  <section id="further-reading">
    <h2>Further Reading</h2>
    <ul>
      <li><a href="[external link]">[Resource name]</a></li>
      <li><a href="[external link]">[Resource name]</a></li>
    </ul>
  </section>
  
</article>

</body>
</html>
```

---

## Quick Tips for Writing Content

### 1. Active Voice
- ❌ "Servers can be configured by using..."
- ✓ "You configure servers using..."

### 2. Specific Numbers
- ❌ "Save time and money"
- ✓ "Save 15 hours/week and $200/month"

### 3. Benefit-Focused Descriptions
- ❌ "Docker is a containerization platform"
- ✓ "Docker standardizes your development and production environments, preventing 'works on my machine' bugs"

### 4. Real Examples
- ❌ "Clients use this for various purposes"
- ✓ "E-commerce store increased page load speed by 60%, improving conversion rate 23%"

### 5. Action Verbs
Use: Install, Deploy, Configure, Troubleshoot, Monitor, Optimize, Secure, Integrate, Automate, Design, Implement

### 6. Internal Linking
Within each section, link to:
- Related training pages (/freelancing-training/[course]/)
- Related service pages (/linux-ai-services/[service]/)
- How-to guides (/resource-center/guides/[guide]/)
- Resource center (/resource-center/)

---

## Word Count Targets

| Page Type | Target | How to Achieve |
|-----------|--------|----------------|
| Training "What You'll Learn" | 200-300 words | 5-8 skills × 30-50 words each |
| Training "Prerequisites" | 100-150 words | 15-20 bullet points, 5-8 words each |
| Training "Course Objectives" | 100-150 words | 8 objectives × 15-20 words each |
| Training "Real-World Applications" | 150-200 words | 3-4 scenarios × 40-60 words each |
| **Training page total** | **400-500 words** | Existing content + new sections |
| Service "What's Included" | 150-200 words | 6-8 deliverables × 25-35 words each |
| Service "Who This Is For" | 100-150 words | 5-6 situations + not-fit scenarios |
| Service "Real-World Applications" | 150-200 words | 3 use cases × 50-70 words each |
| **Service page total** | **350-400 words** | Existing content + new sections |

---

**Last Updated:** 2026-07-22  
**Status:** Ready to use for Phase 3 content expansion

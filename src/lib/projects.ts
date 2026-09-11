import type { StorySection, StoryVideo } from "@/lib/story";

export type ProjectVideo = StoryVideo;
export type { StorySection };

export type ProjectEntry = {
  slug: string;
  title: string;
  org: string;
  years: string;
  summary: string;
  tags: string;
  tint: string;
  bullets: string[];
  video?: ProjectVideo;
  story?: StorySection[];
  relatedExperienceSlug?: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: "wholesale-pricing-platform",
    title: "Wholesale Pricing Platform",
    org: "itsWorthIt Solutions — UBC Entrepreneurship Co-op",
    years: "Jan 2025 – Aug 2025",
    summary:
      "Consolidated supplier data into one searchable platform with real-time currency conversion and competitive offer detection.",
    tags: "Next.js · Prisma · PostgreSQL",
    tint: "oklch(86% 0.06 130)",
    bullets: [
      "Completed a UBC Entrepreneurship Co-op term operating my own registered business as the co-op placement, combining hands-on reselling operations with technical automation and consulting work.",
      "Designed and launched a wholesale pricing comparison platform consolidating supplier data (CSV exports), normalizing categories, and unifying information into a single searchable interface.",
      "Developed interactive dashboards using Next.js, Prisma, and PostgreSQL with pagination, category filters, real-time currency conversion, and competitive offer detection.",
      "Built automated data import pipelines with supplier-specific adapters to handle inconsistent formats, standardize naming conventions, and merge product variants.",
      "Integrated the eBay API to automate business workflows, connecting listing, order, and inventory data directly into internal tools.",
      "Built automated tracking and reporting tools in Python and Google Sheets to monitor account and pipeline KPIs, flagging where a workflow or conversion process was breaking down.",
      "Analyzed buyer feedback and sales data to identify friction points in the customer journey and implemented process improvements that increased repeat customer rate.",
      "Planned extensibility for release as a SaaS platform, enabling broader adoption with integrations for inventory management, pricing workflows, and data-driven insights.",
    ],
    story: [
      {
        heading: "The problem",
        paragraphs: [
          "Once I was working with multiple wholesale buyers at once, deciding where a given batch of inventory should go became a real analytical problem, not a gut call. Every supplier's data showed up differently — inconsistent CSV exports, different category names, different currencies — and comparing offers by hand didn't scale past a handful of listings.",
          "I built this as my UBC Entrepreneurship Co-op placement, operating my own registered business as the co-op itself: half reselling operations, half technical automation and consulting work on the systems behind it.",
        ],
      },
      {
        heading: "The pipeline",
        paragraphs: [
          "Supplier exports and eBay's own API both feed into one normalized layer. Supplier-specific adapters handle the inconsistent formats — standardizing naming, merging product variants — before anything lands in PostgreSQL via Prisma. On the eBay side, listing, order, and inventory data sync in the same way, so the internal tools are always working off current state instead of a stale export.",
          "That shared data powers a Next.js dashboard with pagination, category filters, real-time currency conversion, and competitive offer detection — the actual decision-making surface I used every week to figure out where inventory should go.",
        ],
        diagram: "ebay-pipeline",
      },
      {
        heading: "Closing the loop",
        paragraphs: [
          "Dashboards only help if you notice when something's actually broken. I built automated tracking and reporting in Python and Google Sheets to monitor account and pipeline KPIs, flagging where a workflow or conversion step was quietly failing before it became a real problem.",
          "I also went back through buyer feedback and sales data to find friction points in the customer journey — where a listing was clear but a follow-up wasn't, mostly — and fed what I found back into pricing and sourcing decisions. That loop is what actually moved the repeat customer rate, not any single feature.",
        ],
        diagram: "ebay-funnel",
      },
      {
        heading: "Where it's headed",
        paragraphs: [
          "The system was built with more than just my own business in mind — clean adapter boundaries, a normalized schema, and enough separation between the pricing engine and the eBay integration that it could plausibly grow into a small SaaS tool for other resellers running the same wholesale-comparison problem.",
        ],
      },
    ],
    relatedExperienceSlug: "founder-operator-itsworthit",
  },
  {
    slug: "health-safety-system-prototype",
    title: "Health & Safety System Prototype",
    org: "PricewaterhouseCoopers (UBC Industry Applications Program)",
    years: "Jan 2024 – Apr 2024",
    summary:
      "Led an 8-person Agile team to ship a full-stack GCP prototype with a generative AI chatbot that cut query response time 25%.",
    tags: "PwC · GCP · Vertex AI",
    tint: "oklch(82% 0.07 42)",
    bullets: [
      "Led an Agile team of 8 developers and analysts to deliver a full-stack, GCP-hosted Health and Safety system prototype on deadline, managing task allocation, progress tracking, and cross-team communication.",
      "Utilized Firestore NoSQL cloud database, Cloud Run serverless technology, and the Next.js framework.",
      "Collaborated with stakeholders to define system requirements and ensure deliverables aligned with organizational objectives.",
      "Integrated a Vertex AI generative chatbot for incident trend analysis, improving query response efficiency by 25%.",
      "Presented project progress and the business case directly to senior stakeholders, translating technical work into terms a business audience could act on.",
    ],
    story: [
      {
        heading: "The brief",
        paragraphs: [
          "Built for a real client — PricewaterhouseCoopers — through UBC's CPSC 319 software engineering project course. The ask was a Health and Safety incident system frontline teams could actually use to log, track, and understand safety incidents, delivered by an 8-person student team on a hard course deadline.",
        ],
      },
      {
        heading: "Architecture",
        paragraphs: [
          "Full-stack on Google Cloud: Next.js on the front end, Firestore as the NoSQL data layer, and Cloud Run for serverless hosting. Serverless and NoSQL were the right call for a student team working against a fixed deadline — infrastructure we didn't have to manage ourselves, and a data model flexible enough to change as we learned more about how incidents actually get reported.",
        ],
      },
      {
        heading: "The AI layer",
        paragraphs: [
          "The feature that pushed the prototype past a standard CRUD app was a generative AI chatbot built on Vertex AI, layered over the incident data for trend analysis in plain language instead of manual filtering. It cut query response time by about 25% — the kind of improvement that matters most when someone's trying to catch a pattern before it becomes a bigger problem.",
        ],
      },
    ],
    relatedExperienceSlug: "software-developer-extern-pwc",
  },
  {
    slug: "independent-feature-film",
    title: "Independent Feature Film",
    org: "Line Producer",
    years: "Apr 2026 – Present",
    summary:
      "Managing a $12,000 production budget and 10+ vendor and location contracts for a 20-person cast and crew.",
    tags: "Line Producing · Film",
    tint: "oklch(86% 0.06 130)",
    bullets: [
      "Manage a $12,000 production budget and negotiate 10+ vendor and location contracts, tracking spend against forecast.",
      "Coordinate a 20-person cast and crew across multiple shoot locations, keeping the project on schedule and on budget under tight deadlines.",
      "Build new outreach and follow-up relationships from scratch for each new location.",
    ],
    story: [
      {
        heading: "The film",
        paragraphs: [
          "The Sins of Our Father is a non-union independent feature written and directed by Tibet Karayazgan, shot in Vancouver over a summer of alternating weekends. Logline: when his estranged kids reject his final plea, a dying hustler uses an enigmatic device to force his way back into their lives — triggering a chain reaction that forces him to confront a lifetime of guilt he's spent avoiding.",
          "I came on as Line Producer, running the finance side of the production and picking up logistics — including shuttle runs and stepping into a couple of small day-player roles — wherever the shoot needed it.",
        ],
      },
      {
        heading: "Budgeting it",
        paragraphs: [
          "I tracked spend across every production department — art, camera and grip, sound, transportation, catering, locations and permits, film and lab — against a roughly $12,000 budget with a 10% contingency held in reserve. Production landed close to plan, which on an indie shoot with this many moving parts came down to catching overages early rather than after the fact.",
        ],
      },
      {
        heading: "Where it's headed",
        paragraphs: [
          "Production wrapped within budget. Post-production — editing, music, visual effects, sound, and final film and lab work — is next, and I'm currently leading fundraising to cover it as we prepare to pitch the finished film to distributors.",
        ],
      },
    ],
    relatedExperienceSlug: "line-producer",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

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
        paragraphs: [],
        dataSnapshot: {
          heading: "Live Data Snapshot",
          intro:
            "A real run of the normalization layer — one piece of the wider pipeline built during this co-op — against two live supplier exports: premiumlistallsystems.csv (QuickFlips) and catrp_buylist_091126.csv (CATRP), ingested Sep 11, 2026, before pricing logic runs on top.",
          schemaComparison: [
            { field: "Title", quickFlips: "Title", catrp: "Title" },
            {
              field: "Platform/Category",
              quickFlips: "Platform (flat)",
              catrp: "Category + Subcategory (split)",
            },
            {
              field: "Condition tiers",
              quickFlips: "New / Complete / MM / Loose",
              catrp: "New / CIB / CIB(Excellent) / CIB(Average) / CIB(Poor) / No Manual / Loose",
            },
            {
              field: "Price format",
              quickFlips: "$18.00 (dollar sign)",
              catrp: "18.00 (plain float or -- for N/A)",
            },
            { field: "UPC", quickFlips: "Yes", catrp: "No" },
          ],
          stats: [
            { source: "QuickFlips", skus: "2,899", categories: "43", date: "Sep 11, 2026" },
            { source: "CATRP", skus: "34,516", categories: "40", date: "Sep 11, 2026" },
            { source: "Overlap (title match)", skus: "1,111 items", categories: "—", date: "—" },
          ],
          priceComparison: [
            {
              item: "Chrono Trigger",
              platform: "SNES",
              qfPrice: "$150.00",
              catrpPrice: "$37.50",
              delta: "QF +$112.50",
            },
            {
              item: "Pokemon Platinum",
              platform: "Nintendo DS",
              qfPrice: "$117.00",
              catrpPrice: "$86.11",
              delta: "QF +$30.89",
            },
            {
              item: "Kid Dracula",
              platform: "Gameboy",
              qfPrice: "$140.00",
              catrpPrice: "$100.79",
              delta: "QF +$39.21",
            },
            {
              item: "Super Mario RPG",
              platform: "SNES",
              qfPrice: "$37.00",
              catrpPrice: "$11.31",
              delta: "QF +$25.69",
            },
            {
              item: "Silent Hill 3",
              platform: "PS2",
              qfPrice: "$50.00",
              catrpPrice: "$50.73",
              delta: "~Equal",
            },
            {
              item: "Miitopia",
              platform: "Nintendo Switch",
              qfPrice: "$15.00",
              catrpPrice: "$15.99",
              delta: "~Equal",
            },
            {
              item: "Super Bowling",
              platform: "Nintendo 64",
              qfPrice: "$275.00",
              catrpPrice: "$407.39",
              delta: "CATRP +$132.39",
            },
            {
              item: "Mega Man 5",
              platform: "NES",
              qfPrice: "$87.00",
              catrpPrice: "$144.35",
              delta: "CATRP +$57.35",
            },
            {
              item: "Godzilla 2",
              platform: "NES",
              qfPrice: "$52.00",
              catrpPrice: "$116.58",
              delta: "CATRP +$64.58",
            },
            {
              item: "Haunting Ground",
              platform: "PS2",
              qfPrice: "$100.00",
              catrpPrice: "$132.75",
              delta: "CATRP +$32.75",
            },
          ],
          priceNote:
            "Both sources priced in USD. Delta is a direct comparison — the pipeline normalizes price format (CATRP omits the dollar sign; QuickFlips includes it) before matching.",
          insight:
            "Of 1,111 matched items, QuickFlips offered a higher loose price on 706 (63%), CATRP on 375 (34%), with 30 equal — average delta $0.90 USD.",
          coverageGap:
            "1,549 items exist only in QuickFlips; 21,574 only in CATRP — the adapter layer prevents false negatives when a supplier drops or renames an item.",
        },
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
    slug: "ebay-listing-assistant",
    title: "eBay Listing Assistant",
    org: "itsWorthIt Solutions",
    years: "2026 – Present",
    summary:
      "An AI-orchestrated pipeline that turns raw phone photos into a reviewable eBay draft listing — computer vision, PriceCharting pricing, and a hard stop before anything goes live.",
    tags: "Claude · eBay API · Computer Vision",
    tint: "oklch(84% 0.05 80)",
    bullets: [
      "Built an end-to-end AI-orchestrated pipeline that turns raw phone photos into a ready-to-review eBay draft listing, without touching eBay's UI.",
      "Grouped and sorted photos by EXIF timestamp, splitting per-item using a spacer-photo convention shot between items.",
      "Used computer vision to read box art, cartridge labels, disc printing, and barcodes to identify title, platform, region, and edition, with barcodes taking precedence for disambiguation.",
      "Priced each item via PriceCharting's quoted values rather than averaging raw sold comps, converted to CAD, with thin or inconsistent comp sets flagged for manual review.",
      "Assembled HTML descriptions from a fixed boilerplate plus condition-specific templates, keeping eBay's separate Condition Details field distinct from the listing body.",
      "Sequenced the eBay Inventory, Media, and Account APIs — OAuth, photo upload, inventory item, draft offer — with a hard stop before publish: listings only go live on my explicit per-item approval.",
    ],
    story: [
      {
        heading: "The problem",
        paragraphs: [
          "Manually listing on eBay is a lot of repetitive work per item — photographing it, tracking down an accurate price, writing a description, uploading photos, and filling in item specifics, all before a single listing goes live. I built an AI-orchestrated pipeline, running inside a Claude Project, that handles everything except the final go-ahead to publish.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "I shoot photos in one session, with a spacer photo — my hand, or a blank card — between items. The pipeline sorts by EXIF timestamp and splits on those spacers to reconstruct per-item groups automatically, then reads box art, cartridge labels, disc printing, and barcodes to identify title, platform, region, and edition — barcodes win over label text whenever they disagree. From there it assesses condition (complete-in-box, loose, sealed, and so on) and moves on to pricing and drafting the listing.",
        ],
        images: [
          {
            type: "image",
            src: "/projects/ebay-listing-assistant/01-item photo - 007 Agent Under Fire.jpg",
            alt: "Item photo group: 007 Agent Under Fire case and manual",
          },
          {
            type: "image",
            src: "/projects/ebay-listing-assistant/02-spacer photo between items.jpg",
            alt: "Spacer photo shot between items to split the session",
          },
          {
            type: "image",
            src: "/projects/ebay-listing-assistant/03-item photo - Rygar.jpg",
            alt: "Item photo group: Rygar case and manual",
          },
        ],
        imagesAspectRatio: "3 / 4",
        diagram: "listing-pipeline",
      },
      {
        heading: "Pricing it right",
        paragraphs: [
          "Pricing comes from PriceCharting's quoted value rather than averaging raw sold listings — a single quoted price holds up better against outliers than a handful of scattered comps. Items missing a manual get priced at the midpoint between loose and complete. Everything converts to CAD, and if the comp data is thin or inconsistent, the pipeline flags it for me instead of guessing.",
        ],
        images: [
          {
            type: "image",
            src: "/projects/ebay-listing-assistant/04-pricecharting-007-agent-under-fire.png",
            alt: "PriceCharting page for 007: Agent Under Fire (PS2), showing quoted prices by condition",
          },
        ],
        properties: [
          { key: "title", value: "007: Agent Under Fire" },
          { key: "platform", value: "PlayStation 2" },
          { key: "edition", value: "Greatest Hits" },
          { key: "region", value: "NTSC-U/C" },
          { key: "condition_tier", value: "CIB (complete-in-box)" },
          { key: "id_signal", value: "barcode + box art match" },
          { key: "price_source", value: "PriceCharting -> Complete price" },
          { key: "price_usd", value: "$8.18" },
          { key: "price_cad", value: "~$11.29 (converted)" },
          { key: "category", value: "Video Games & Consoles > Video Games" },
        ],
      },
      {
        heading: "Built to never publish blind",
        paragraphs: [
          "The eBay side runs the real Inventory, Media, and Account APIs — OAuth token refresh, photo upload, inventory item creation, then a draft offer — but it stops there on purpose. I get a review summary with title, condition, price, and a link to the draft, and nothing goes live until I approve that specific listing. SKUs are generated deterministically, so re-running the pipeline on the same item never creates a duplicate.",
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
          "The Sins of Our Father is a non-union independent feature written and directed by Tibet Karayazgan, shot in Vancouver over a summer of alternating weekends.",
          "I came on as Line Producer, running the finance side of the production and picking up logistics — including shuttle runs and stepping into a couple of small day-player roles — wherever the shoot needed it.",
        ],
        quote: {
          label: "Logline",
          text: "When his estranged kids reject his final plea, a dying hustler uses an enigmatic device to force his way back into their lives — triggering a chain reaction that forces him to confront a lifetime of guilt he's spent avoiding.",
        },
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

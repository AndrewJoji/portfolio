export type ExperienceVideo = {
  title: string;
  youtubeId?: string;
  start?: number;
};

export type StorySection = {
  heading?: string;
  paragraphs: string[];
  video?: ExperienceVideo;
};

export type ExperienceEntry = {
  slug: string;
  title: string;
  org: string;
  location: string;
  years: string;
  bullets: string[];
  video?: ExperienceVideo;
  story?: StorySection[];
};

export const experience: ExperienceEntry[] = [
  {
    slug: "software-developer-extern-pwc",
    title: "Software Developer Extern",
    org: "PricewaterhouseCoopers (UBC Industry Applications Program)",
    location: "Vancouver, BC",
    years: "Jan 2024 – Apr 2024",
    bullets: [
      "Led an Agile team of 8 developers and analysts to deliver a full-stack, GCP-hosted Health and Safety system prototype on deadline, managing task allocation, progress tracking, and cross-team communication.",
      "Utilized Firestore NoSQL cloud database, Cloud Run serverless technology, and the Next.js framework.",
      "Collaborated with stakeholders to define system requirements and ensure deliverables aligned with organizational objectives.",
      "Integrated a Vertex AI generative chatbot for incident trend analysis, improving query response efficiency by 25%.",
      "Presented project progress and the business case directly to senior stakeholders, translating technical work into terms a business audience could act on.",
    ],
  },
  {
    slug: "line-producer",
    title: "Line Producer",
    org: "Independent Feature Film",
    location: "Vancouver, BC",
    years: "Apr 2026 – Present",
    bullets: [
      "Manage a $12,000 production budget and negotiate 10+ vendor and location contracts, tracking spend against forecast.",
      "Coordinate a 20-person cast and crew across multiple shoot locations, keeping the project on schedule and on budget under tight deadlines.",
      "Build new outreach and follow-up relationships from scratch for each new location.",
    ],
  },
  {
    slug: "founder-operator-itsworthit",
    title: "Founder & Operator",
    org: "itsWorthIt",
    location: "Vancouver, BC",
    years: "Mar 2024 – Present",
    bullets: [
      "Own and operate a registered sole proprietorship reselling retro video games and digital media, managing sourcing, pricing strategy, inventory, cost tracking, GST compliance, and customer relations.",
      "Grown net sales to $55,000+ at a 40% net profit margin.",
      "Maintained Top-Rated Seller status on eBay.ca across 1,000+ sales with a 98.9% satisfaction rating.",
      "Built and maintain a personal CRM-style tracking system in Google Sheets to manage leads, listings, and follow-ups.",
      "Manage the full customer lifecycle end to end, including buyer communication, dispute resolution, and post-sale follow-up, prioritizing fair pricing and long-term relationships over one-off wins.",
      "Conduct ongoing market research and competitive analysis to inform data-driven pricing and inventory decisions.",
    ],
    story: [
      {
        heading: "Finding the deal",
        paragraphs: [
          "It started with Facebook Marketplace and a fascination with arbitrage — the instinct for spotting a good deal before anyone else did. That turned into a business once I recognized what I could actually offer collectors: quality product, fair prices, and service people could trust. I'd followed creators like CATRP Crew and QuickFlips for years and enjoyed watching their journeys in the space; I experimented with vintage toys too, but retro games were the closer fit for what I actually cared about.",
          "What kept me in it was less the games themselves and more the logistics — planning, problem-solving, finding efficiencies like shipping consolidators and passing the savings on, and building a process that mixed a personal touch with something repeatable.",
        ],
      },
      {
        heading: "Going wholesale",
        paragraphs: [
          "I started on eBay alone. Then I made connections with wholesale buyers in the US who sold on Amazon at a much larger scale — a volume game with thinner margins, but access to a market I couldn't reach on my own. I built a streamlined sourcing process around exactly what worked for them: one wholesaler starting November 2024, a second in January 2025. To decide where inventory should go each month, I built a small internal tool that compared both buyers' pricing offers side by side. At its peak, wholesale made up 50-60% of my monthly revenue.",
        ],
        video: {
          title: "Wholesale batch shipped to CATRP Crew (US)",
          youtubeId: "AmEmPiLSEQY",
          start: 634,
        },
      },
      {
        paragraphs: [
          "Sourcing changed too — I started with individual marketplace finds and moved into buying entire collections. Some of those meant a lot to the people I bought from.",
          "I also built relationships with other local vendors — trades, referrals, win-win deals instead of competing over the same buyers. Business isn't zero-sum. Relationships are what actually run it.",
        ],
        video: {
          title: "A collector on what one piece of his collection meant to him",
          youtubeId: "Tgoo2N3Pkuw",
        },
      },
      {
        heading: "When tariffs hit",
        paragraphs: [
          "As tariffs became more prominent, the wholesale channel got harder — shipping options shrank and costs climbed. I adapted where I could: leaned harder into local connections and convention sales, and got smarter about what actually crossed the border. Consoles and handhelds are mostly made in China, so I traded those away locally for games made in the US, Japan, and Canada instead — lighter tariff exposure, still valuable inventory to send wholesale.",
          "The stream kept narrowing anyway. I shipped my last wholesale batch in December 2025 and shifted focus back to local sales, eBay, and conventions.",
        ],
      },
      {
        heading: "Where it's headed",
        paragraphs: [
          "There are new shipping options I'm exploring now that might reopen that channel. In the meantime, I've slowed down buying to liquidate what I already have and leaned into higher-end sales — bigger upfront cost, but a better payout for the time it takes.",
          "I've also been automating what I can. The eBay listing tool I built — one of the projects on the homepage — exists because I'd rather spend my time sourcing and building relationships than on repetitive manual listing work.",
        ],
      },
      {
        heading: "What I'd tell someone starting out",
        paragraphs: [
          "You learn more by doing than by planning. Don't lean on one sales channel — it's easier to disrupt than you'd think. The best price doesn't sell itself; you still have to sell the story and give people a reason to buy from you. And rejection isn't the end of a lead, just a redirect — sales is a skill that keeps paying off, everywhere, if you keep at it.",
        ],
      },
    ],
  },
  {
    slug: "tech-volunteer-ewb",
    title: "Tech Volunteer",
    org: "Education without Borders (EwB)",
    location: "Vancouver, BC",
    years: "May 2026 – Present",
    bullets: [
      "Collaborate with the EwB tech team to manage ticketing and sales channels for the South African Film Festival (SAFF 2026) on the Eventive platform.",
      "Work closely with the film selection committee to upload films, verify credits, and coordinate media kits for accurate event listings.",
    ],
  },
  {
    slug: "programmer-analyst-ubc",
    title: "Programmer Analyst (UBC Co-op)",
    org: "UBC Student Housing & Community Services / UBC Bookstore",
    location: "Vancouver, BC",
    years: "Jan 2023 – Aug 2023",
    bullets: [
      "Analyzed legacy JNLP systems and led migration to a web-based platform using PHP (Yii2), JavaScript, jQuery, SSRS, and SQL, increasing accessibility and functionality metrics by 30% through requirements gathering and stakeholder alignment across departments.",
      "Connected the new platform to live MySQL data tables, implementing pagination to support real-time access to housing and work order records.",
      "Designed and implemented a RESTful API integrating student information and bookstore systems, maintaining backward compatibility and passing all acceptance testing with Postman.",
      "Led onboarding and training for frontline housekeeping staff onto a newly migrated, browser-based work order system, enabling on-the-go access to the database and work orders on iPads.",
      "Supported the UBC Bookstore's migration to new enterprise software and to Workday Student, providing first point of contact technical support and troubleshooting for non-technical staff.",
      "Managed a VDI migration for 20+ desktops and reduced high-level support requests by 40% through proactive stakeholder communication and thorough documentation maintained on Confluence.",
    ],
    video: {
      title: "Programmer Analyst Co-Op \"Day in my Life\"",
      youtubeId: "TVAfr5lGLkY",
    },
  },
  {
    slug: "vp-finance-administration",
    title: "VP Finance and Administration",
    org: "UBC Residence Hall Association",
    location: "Vancouver, BC",
    years: "May 2024 – Dec 2024",
    bullets: [
      "Trained and mentored a team of 10 finance representatives and managed a $20,000+ budget.",
      "Directed and produced a documentary highlighting unsung heroes in student housing, presented to student leaders from institutions across Canada and the United States at the NACURH leadership conference.",
    ],
    video: { title: "Unsung Heroes documentary", youtubeId: "USU7CitwfMo" },
  },
];

export function getExperience(slug: string) {
  return experience.find((entry) => entry.slug === slug);
}

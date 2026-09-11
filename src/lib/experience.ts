import type { StorySection, StoryVideo } from "@/lib/story";

export type ExperienceVideo = StoryVideo;
export type { StorySection };

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
    story: [
      {
        heading: "Where I started",
        paragraphs: [
          "This was my first co-op, split across UBC Student Housing & Community Services and the UBC Bookstore. My first real project was a housing work order system still running on JNLP — a Java desktop app launched through the browser, the kind of thing that quietly keeps working for a decade until it can't. I spent the first stretch just reading it: how housekeeping staff actually used it, where requests got stuck, what the data model assumed that wasn't true anymore.",
          "From there I led the migration to a web-based platform built on PHP (Yii2), JavaScript, jQuery, SSRS, and SQL — gathering requirements from staff across departments and aligning on what \"better\" actually meant for the people using it day to day, not just for the migration checklist. Accessibility and functionality metrics moved by about 30% once it shipped.",
        ],
      },
      {
        heading: "Making it real-time",
        paragraphs: [
          "The old system's data was static and hard to trust. I connected the new platform to live MySQL tables and added pagination so housing and work order records reflected what was actually happening, not a stale export.",
          "On the Bookstore side, I designed and built a RESTful API integrating student information with bookstore systems, keeping backward compatibility with what already depended on the old data and passing full acceptance testing in Postman before anything touched production.",
        ],
      },
      {
        heading: "Two departments, one point of contact",
        paragraphs: [
          "Shipping the system was only half the job — people had to actually be able to use it. I led onboarding and training for frontline housekeeping staff moving onto the new browser-based work order tool, including getting it working smoothly on the iPads they carried on-shift.",
          "At the same time, the Bookstore was migrating to new enterprise software and to Workday Student, and I ended up as first point of contact for technical support there too — mostly non-technical staff hitting friction on a system that had just changed under them. Running both at once meant a lot of context-switching, but it's also where I got comfortable translating something technical into whatever a specific person actually needed to hear.",
        ],
        video: {
          title: "Programmer Analyst Co-Op \"Day in my Life\"",
          youtubeId: "TVAfr5lGLkY",
        },
      },
      {
        heading: "Cleaning up the last mile",
        paragraphs: [
          "Toward the end of the term I managed a VDI migration across 20+ desktops. The technical part was straightforward; what actually moved the needle was documentation — writing things down properly on Confluence and communicating changes before they landed instead of after. High-level support requests dropped about 40% off the back of that alone, which taught me early that a lot of \"technical\" problems are really communication problems wearing a technical costume.",
        ],
      },
    ],
  },
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
    story: [
      {
        heading: "A course with a real client",
        paragraphs: [
          "This was CPSC 319, UBC's software engineering project course — an industry-applications, co-op-style class where teams build a real system for a real sponsor instead of a toy assignment. PwC was our sponsor, and the brief was a Health and Safety incident system: something frontline teams could actually use to log, track, and understand safety incidents, built and delivered on a hard deadline.",
          "I ended up leading a team of 8 developers and analysts — splitting up the work, keeping progress on track, and making sure the people talking to PwC and the people writing code were always working off the same picture.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "We shipped a full-stack prototype on Google Cloud: Firestore as the NoSQL data layer, Cloud Run for serverless hosting, and Next.js on the front end. Before any of that got written, though, we spent real time with stakeholders defining what the system actually needed to do — a Health and Safety tool is only useful if it matches how incidents actually get reported and reviewed, not how a textbook says they should.",
        ],
      },
      {
        heading: "The chatbot",
        paragraphs: [
          "The feature I'm most proud of was a generative AI chatbot built on Vertex AI, layered on top of the incident data so people could ask questions in plain language instead of digging through a table of past reports. It cut query response time by about 25% — a small number that mattered a lot to people trying to spot a trend before it became a pattern.",
        ],
      },
      {
        heading: "Presenting to PwC",
        paragraphs: [
          "The part of the course that stuck with me most wasn't the code — it was presenting progress and the business case directly to senior PwC stakeholders. Translating what the team had built into something a business audience could actually act on, without losing what made it technically real, is a different skill than writing the system in the first place. It's one I've leaned on in almost every role since.",
        ],
      },
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
    story: [
      {
        heading: "The film",
        paragraphs: [
          "The Sins of Our Father is a non-union independent feature written and directed by Tibet Karayazgan, shot in Vancouver over a summer of alternating weekends. I came on as Line Producer, which on a production this size means I own the budget end to end — and, in practice, whatever logistics gap shows up that week too.",
        ],
      },
      {
        heading: "Running the budget",
        paragraphs: [
          "I tracked spend against a production budget across every department — art, camera and grip, sound, transportation, catering, locations and permits, film and lab — with a contingency reserve held back for the inevitable surprises. A lot of the job was less glamorous than it sounds: reconciling receipts, getting crew reimbursed for what they'd fronted out of pocket, and catching a category drifting over forecast early enough to actually do something about it.",
          "We landed production close to plan against the ~$12,000 budget, which on an indie shoot with this many moving pieces felt less like luck and more like the payoff of tracking it obsessively from day one.",
        ],
      },
      {
        heading: "More than the numbers",
        paragraphs: [
          "\"Some logistics\" ended up meaning things like running shuttle routes to get cast and crew to set on time, and — on days where we were short a body — stepping into small background and day-player roles myself so we didn't lose a setup. It's not what the title says on paper, but it's a lot of what actually makes a shoot day work.",
        ],
      },
      {
        heading: "Where it stands now",
        paragraphs: [
          "Production wrapped within budget. Post-production — editing, music, visual effects, sound, and the final film and lab work — is next, and I'm currently leading fundraising to cover it as we get ready to pitch the finished film to distributors.",
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
    story: [
      {
        heading: "Behind a film festival",
        paragraphs: [
          "I volunteer with Education without Borders' tech team on ticketing and sales for the South African Film Festival (SAFF) — running things through the Eventive platform so screenings actually sell tickets without friction on the night. There's a small, quiet resonance in it for me: I was born in South Africa, and this is one more thread connecting back to that.",
        ],
      },
      {
        heading: "Getting the details right",
        paragraphs: [
          "The other half of the role is working with the film selection committee to get each film listed correctly — uploading the films, verifying credits, and coordinating media kits so the festival's listings actually match what filmmakers submitted. It's detail work, but it's the kind that protects a filmmaker's credit and a festival's reputation at the same time.",
        ],
      },
    ],
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
    story: [
      {
        heading: "Running the numbers",
        paragraphs: [
          "As VP Finance and Administration for the UBC Residence Hall Association, I trained and mentored a team of 10 finance representatives across residence buildings and managed a $20,000+ budget — the operational side of a student organization that people don't see but that everything else depends on.",
        ],
      },
      {
        heading: "Telling a different story",
        paragraphs: [
          "The part of the role that stretched me most wasn't financial at all. I directed and produced a documentary spotlighting the unsung heroes of student housing — the frontline staff whose work usually goes unnoticed — and presented it to student leaders from institutions across Canada and the United States at the NACURH leadership conference.",
          "Going from budget spreadsheets to directing a documentary in the same role is a strange jump on paper, but it's a pretty honest preview of the range that shows up across everything else I've done since.",
        ],
        video: { title: "Unsung Heroes documentary", youtubeId: "USU7CitwfMo" },
      },
    ],
  },
];

export function getExperience(slug: string) {
  return experience.find((entry) => entry.slug === slug);
}

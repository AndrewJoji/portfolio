export type WorkshopStatus = "idea" | "building" | "live";

export type WorkshopTool = {
  slug: string;
  title: string;
  category: string;
  status: WorkshopStatus;
  summary: string;
  features?: string[];
  href?: string;
};

export const workshopTools: WorkshopTool[] = [
  {
    slug: "fishing-setup",
    title: "Fishing Setup Visualizer",
    category: "Fishing",
    status: "idea",
    summary:
      "Visualize a full fishing setup and get suggestions on what to change.",
  },
  {
    slug: "salmon-id",
    title: "Salmon Species ID",
    category: "Fishing",
    status: "idea",
    summary: "Identify which species of salmon you've caught.",
  },
  {
    slug: "regulations-quiz",
    title: "Fishing Regulations Quiz",
    category: "Fishing",
    status: "idea",
    summary: "Quiz yourself on fishing regulations before heading out.",
  },
  {
    slug: "wall-task-board",
    title: "Wall Task Board",
    category: "Everyday",
    status: "idea",
    summary: "A to-do list displayed on an iPad mounted on the wall.",
    features: [
      "Sort by type of task, urgency, and more",
      "Pick a task you feel like doing instead of scrolling reels",
    ],
  },
];

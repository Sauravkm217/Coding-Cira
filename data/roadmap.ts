export interface RoadmapItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: "language" | "ai-model";
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "java",
    name: "Java",
    icon: "☕",
    description: "OOP for the enterprise world",
    category: "language",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🟨",
    description: "Bring your code to the web",
    category: "language",
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    description: "Fast & safe systems programming",
    category: "language",
  },
  {
    id: "advanced-ai",
    name: "Advanced AI Models",
    icon: "🧠✨",
    description: "Fine-tuning, embeddings & multi-model prompting",
    category: "ai-model",
  },
  {
    id: "sql",
    name: "SQL & Databases",
    icon: "🗄️",
    description: "Learn to store and query real data",
    category: "language",
  },
];

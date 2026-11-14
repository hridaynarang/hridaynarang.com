export type Post = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-13". */
  date: string;
  paragraphs: string[];
};

/** Newest first. */
export const posts: Post[] = [
  {
    slug: "the-future-of-enterprise-physical-ai",
    title: "The Future of Enterprise Physical AI",
    date: "2026-11-13",
    paragraphs: [
      "As AI moves from the digital world into the physical one, enterprises will have to decide what they actually need to own.",
      "In the digital world, AI runs on general-purpose hardware: the same GPUs and servers can run any model, so the only real choice an enterprise makes is about the intelligence itself. Consumers are content with general models like ChatGPT or Claude, but enterprises have learned otherwise. Frontier models are remarkably capable, but general capability rarely translates to enterprise value on its own. The companies seeing real returns post-train general models on their own data, workflows, and tacit knowledge, and increasingly they want to own their intelligence rather than rent it.",
      "In the physical world, intelligence is no longer enough: robots also need a body, and bodies are expensive to design, manufacture, and maintain.",
      "So what will enterprises standardize, and what will they own?",
      "In the past, the internal combustion engine did not produce a universal vehicle; it produced trucks, tractors, forklifts, and cars, each shaped by the work it was built to do. Robots will follow the same path, with each major use case settling on a few standard machines built for its work, because a machine shaped for one job will outperform a humanoid trying to do them all. Enterprises will share those machines: hospitals will choose from the same few hospital robots, and farms from the same few agricultural ones, since a custom fleet for each company would cost more than any one of them could justify.",
      "The intelligence, however, will be customized, just as it is in the digital world. Every hospital, farm, construction site, and factory runs on tacit knowledge that exists only on site, and post-training a general or industry-specific robot model on it costs a fraction of building a new machine. Enterprises will buy the same robots as their competitors and own the intelligence that runs them.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/**
 * "2026-11-13" → "Nov 13, 2026" (or "November 13, 2026" with "long"), pinned
 * to UTC so it never shifts a day.
 */
export function formatDate(iso: string, month: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("en-US", {
    month,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

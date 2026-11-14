import { Newsreader } from "next/font/google";

/**
 * The reading face for Writing. The frame around it stays the same as About;
 * only what's inside switches to a book serif, so a post reads like a paper
 * rather than a poster.
 */
export const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

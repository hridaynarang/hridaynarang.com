import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/frame";
import { formatDate, posts } from "@/lib/writing";
import { serif } from "./serif";

export const metadata: Metadata = {
  title: "writing · hriday narang",
};

export default function Writing() {
  return (
    <Frame active="writing">
      <div className={`${serif.className} px-6 py-10 sm:px-10`}>
        <h1 className="font-sans text-2xl font-medium tracking-tight">Writing</h1>

        <ul className="mt-6 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="text-lg underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-fg/40">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="shrink-0 text-[15px] text-muted sm:ml-auto"
                >
                  {formatDate(post.date, "long")}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

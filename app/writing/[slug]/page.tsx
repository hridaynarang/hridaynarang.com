import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/frame";
import { profile } from "@/lib/content";
import { formatDate, getPost, posts } from "@/lib/writing";
import { serif } from "../serif";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} · hriday narang`,
    description: post.paragraphs[0],
    openGraph: {
      title: post.title,
      description: post.paragraphs[0],
      type: "article",
      publishedTime: post.date,
      authors: [profile.name],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <Frame active="writing">
      <article
        className={`${serif.className} flex flex-1 flex-col px-6 py-10 sm:px-10`}
      >
        <Link
          href="/writing"
          className="self-start text-[15px] text-muted transition-colors hover:text-fg"
        >
          &larr; All writing
        </Link>

        <header className="mt-6 text-center">
          <h1 className="text-[30px] leading-tight font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-3 text-muted">
            <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-5 text-[19px] leading-[1.65] text-pretty">
          {post.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

      </article>
    </Frame>
  );
}

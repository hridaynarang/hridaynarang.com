# hridaynarang.com

A personal site in two tabs: **About**, a single framed page, and **Writing**,
essays set for reading. Next.js 16 (App Router, Turbopack) and Tailwind v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # every route is prerendered static
```

## Layout

Both tabs sit inside the same ruled rectangle, **`components/frame.tsx`**: side
rails that run the full height of the window, an inset box with a registration
cross at every corner where two lines meet, the ABOUT / WRITING tab strip on
top, and the Atlanta clock in the footer. Every route renders inside `Frame`,
so the lines never move between pages.

The tab labels always reserve space for their brackets and only hide them on
the inactive tab, so switching tabs doesn't shift either label.

## About

**`app/page.tsx`**. The header has the portrait, name, links, and the email
addresses spelled out as "[at]" / "[dot]" rather than linked, so scrapers
don't harvest them. Below it are four paragraphs set large. Each opens in
black and trails off into grey, so skimming down the left edge still gives the
gist.

**`components/dither-portrait.tsx`** draws the photo as a 1-bit Bayer dither
on a canvas, so the only image on the page uses the same two colours as
everything else. On hover it develops into the greyscale photo over two
seconds, with grey levels and resolution climbing together frame by frame, and
it runs back at the same speed when the cursor leaves. Reduced-motion users get
the end state immediately.

**`components/ink-mark.tsx`** sets company logos into the sentences that name
them. The originals in `public/logos/` come in incompatible treatments, so each
is reduced to a silhouette (the `-ink` files) and drawn as a CSS mask filled
with `currentColor`, which makes the logo the same colour as its link.

## Writing

**`app/writing/page.tsx`** lists the posts. **`app/writing/[slug]/page.tsx`**
renders one post, statically generated per slug, with its own title and
link-preview metadata. Inside the frame, Writing switches to **Newsreader**
(`app/writing/serif.ts`), a serif designed for reading on screen. The page
headings stay in Geist to match About.

### Adding a post

Posts live in **`lib/writing.ts`**, newest first:

```ts
{
  slug: "url-segment",
  title: "Title",
  date: "2026-11-14",          // ISO; rendered "November 14, 2026" in UTC
  paragraphs: ["First…", "Second…"],
}
```

The first paragraph doubles as the description in search results and link
previews. Paragraphs are plain strings, so links or emphasis inside a post
would need a richer format.

## Type

- **Geist**: everything on About, plus headings on Writing.
- **Geist Mono**: the tab strip and footer on both tabs. Labels only.
- **Newsreader**: post titles and body text.

## Content

Profile details and outbound links are in **`lib/content.ts`**. Posts are in
**`lib/writing.ts`**. The About copy is written inline in `app/page.tsx`,
alongside comments explaining why each line is phrased the way it is.

## Gotcha

This is Next.js 16, which changes APIs your memory of Next may not cover
(for example, route `params` is a Promise). The bundled docs in
`node_modules/next/dist/docs/` are the reference. See `AGENTS.md`.

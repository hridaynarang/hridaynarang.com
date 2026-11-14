import Link from "next/link";
import { Clock } from "@/components/clock";

/**
 * A registration mark where two grid lines cross. Centred on the corner it's
 * placed at, so it sits over the lines rather than beside them.
 */
export function Cross({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`absolute z-10 size-4 text-fg ${className}`}
    >
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const TABS = [
  { key: "about", label: "About", href: "/" },
  { key: "writing", label: "Writing", href: "/writing" },
] as const;

export type Tab = (typeof TABS)[number]["key"];

/**
 * The page's ruled frame: full-height side rails, an inset box with a cross
 * at every corner, the tab strip on top and the location/clock footer below.
 * Every route renders inside it so the lines never jump between pages.
 */
export function Frame({
  active,
  children,
}: {
  active: Tab;
  children: React.ReactNode;
}) {
  return (
    // The side rails run the full height of the window; the frame is inset
    // from the top and bottom so its closing lines have room to show.
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col overflow-y-clip border-x border-line py-[clamp(0.75rem,calc(8vh_-_2.75rem),3.5rem)]">
      <div className="relative flex flex-1 flex-col border-y border-line">
        <Cross className="-top-2 -left-2" />
        <Cross className="-top-2 -right-2" />
        <Cross className="-bottom-2 -left-2" />
        <Cross className="-bottom-2 -right-2" />

        <nav className="relative flex gap-2 border-b border-line px-6 py-3 font-mono text-[13px] tracking-wider uppercase sm:px-10">
          <Cross className="-bottom-2 -left-2" />
          <Cross className="-bottom-2 -right-2" />
          {TABS.map((tab) => {
            const current = tab.key === active;
            return (
              <Link
                key={tab.key}
                href={tab.href}
                aria-current={current ? "page" : undefined}
                className={`whitespace-pre ${
                  current
                    ? "text-fg"
                    : "text-faint transition-colors hover:text-fg"
                }`}
              >
                {/*
                  The brackets are always laid out and only hidden on the
                  inactive tab, so switching tabs never shifts a label.
                */}
                <span aria-hidden className={current ? "" : "invisible"}>
                  {"[ "}
                </span>
                {tab.label}
                <span aria-hidden className={current ? "" : "invisible"}>
                  {" ]"}
                </span>
              </Link>
            );
          })}
        </nav>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-6 py-5 font-mono text-[13px] tracking-wider text-faint uppercase sm:px-10">
          <Cross className="-top-2 -left-2" />
          <Cross className="-top-2 -right-2" />
          <span>[ Atlanta, GA ]</span>
          <span>
            [ <Clock /> ]
          </span>
        </footer>
      </div>
    </div>
  );
}

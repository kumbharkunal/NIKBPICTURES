import { studio } from "@/content/site";
import { cx } from "@/lib/utils";
import { Monogram } from "./Monogram";

/**
 * The monogram beside the studio name, for the nav pill and the mobile menu. Decorative: the
 * link or dialog around it carries the accessible name.
 */
export function Lockup({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cx("inline-flex items-center gap-2.5", className)}>
      <Monogram className="h-[1.625rem] w-auto shrink-0" />
      <span className="font-display text-[1.25rem] leading-none tracking-[-0.02em] whitespace-nowrap">{studio.name}</span>
    </span>
  );
}

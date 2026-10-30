"use client";

import { XIcon } from "lucide-react";
import { type SmartBannerOptions, useSmartBanner } from "smartbanner-tsx";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SmartBannerProps extends SmartBannerOptions {
  /**
   * Where the banner floats: at the top or the bottom of the screen.
   * @default "top"
   */
  placement?: "top" | "bottom";
  /** Extra classes for the banner container. */
  className?: string;
}

/**
 * Smart App Banner styled with Tailwind and shadcn/ui tokens.
 * Device detection, store links and the "closed"/"installed" cookies come
 * from the `smartbanner-tsx` package, so you keep getting its fixes.
 */
export function SmartBanner({
  title,
  author,
  placement = "top",
  className,
  ...options
}: SmartBannerProps) {
  const { visible, platform, link, icon, description, t, close, install } =
    useSmartBanner(options);

  if (!visible) return null;

  return (
    <aside
      aria-label={title || undefined}
      data-slot="smart-banner"
      data-platform={platform}
      data-placement={placement}
      className={cn(
        "fixed inset-x-2 z-50 mx-auto flex max-w-md items-center gap-3 rounded-xl border bg-background p-3 text-foreground shadow-lg",
        placement === "top" ? "top-2" : "bottom-2",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={t.close}
        onClick={close}
        className="size-7 shrink-0 text-muted-foreground"
      >
        <XIcon />
      </Button>
      {icon ? (
        <img
          src={icon}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-xl border object-cover"
        />
      ) : null}
      <div className="min-w-0 flex-1 leading-tight">
        {title ? (
          <p className="truncate text-sm font-semibold">{title}</p>
        ) : null}
        {author ? (
          <p className="truncate text-xs text-muted-foreground">{author}</p>
        ) : null}
        {description ? (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={install}
        className={cn(buttonVariants({ size: "sm" }), "shrink-0 rounded-full")}
      >
        {t.button}
      </a>
    </aside>
  );
}

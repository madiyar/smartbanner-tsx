import React from "react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** A heading counts as "current" once it is this close to the top of the viewport. */
const ACTIVATION_OFFSET = 96;

/**
 * "On this page" outline, like VitePress. Items come from the `.heading` elements
 * on the page, so new sections show up here without extra work.
 */
export function Toc() {
  const [items, setItems] = React.useState<TocItem[]>([]);
  const [active, setActive] = React.useState<string>();
  const [marker, setMarker] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(".doc .heading[id]"),
    );

    setItems(
      headings.map((heading) => {
        const copy = heading.cloneNode(true) as HTMLElement;
        copy.querySelector(".heading-anchor")?.remove();
        return {
          id: heading.id,
          text: copy.textContent?.trim() ?? heading.id,
          level: heading.tagName === "H3" ? 3 : 2,
        };
      }),
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | undefined;
      if (atBottom) {
        current = headings[headings.length - 1]?.id;
      } else {
        for (const heading of headings) {
          if (heading.getBoundingClientRect().top > ACTIVATION_OFFSET) break;
          current = heading.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Slide the marker next to the active link.
  React.useLayoutEffect(() => {
    // Measure only once the list is rendered.
    if (items.length === 0) return;
    const link = active
      ? listRef.current?.querySelector<HTMLElement>(
          `a[href="#${CSS.escape(active)}"]`,
        )
      : null;
    setMarker(link ? link.offsetTop + link.offsetHeight / 2 : null);
  }, [active, items]);

  if (items.length === 0) return null;

  return (
    <nav className="toc" aria-labelledby="toc-title">
      <p id="toc-title" className="toc-title">
        On this page
      </p>
      <div className="toc-body">
        <span
          className="toc-marker"
          aria-hidden="true"
          style={{
            opacity: marker === null ? 0 : 1,
            transform: `translateY(${(marker ?? 0) - 9}px)`,
          }}
        />
        <ul ref={listRef}>
          {items.map((item) => (
            <li key={item.id} className={`toc-item toc-level-${item.level}`}>
              <a
                href={`#${item.id}`}
                className={`toc-link${item.id === active ? " is-active" : ""}`}
                aria-current={item.id === active ? "location" : undefined}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

import type React from "react";

// A tiny highlighter for the TSX / CSS / shell snippets on this page.
const TOKEN =
  /(?<comment>\/\*[\s\S]*?\*\/|\/\/[^\n]*|^#[^\n]*)|(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|(?<tag><\/?[A-Za-z][\w.]*)|(?<keyword>\b(?:import|from|export|function|return|const|let|if|null|default|type|interface)\b)|(?<variable>--[\w-]+)|(?<attr>\b[a-zA-Z_]\w*(?==|\s*:\s))|(?<number>#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|%|ms)?\b)|(?<fn>\b[a-zA-Z_]\w*(?=\())/gm;

export function highlight(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(code.slice(last, index));

    const groups = match.groups ?? {};
    const kind = Object.keys(groups).find((key) => groups[key] !== undefined);
    nodes.push(
      <span key={index} className={`tok-${kind}`}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }

  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

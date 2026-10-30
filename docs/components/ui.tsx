import React from "react";
import { highlight } from "../lib/highlight";

/* ---------- Icons ---------- */

const ICONS = {
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.15-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.39-.92-2.4-3.65ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.05-.51 2.68-1.28Z"
    />
  ),
  android: (
    <>
      <path d="M7 10.5v6.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6.5Z" />
      <path d="M7 9.5a5 5 0 0 1 10 0" />
      <path d="M8.5 6 7.2 4M15.5 6l1.3-2M10 18v2.5M14 18v2.5M4.5 11v4.5M19.5 11v4.5" />
      <circle cx="10" cy="8" r=".4" fill="currentColor" />
      <circle cx="14" cy="8" r=".4" fill="currentColor" />
    </>
  ),
  top: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M5 8.5h14" />
      <rect x="7" y="5" width="10" height="2" rx=".5" fill="currentColor" />
    </>
  ),
  bottom: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M5 15.5h14" />
      <rect x="7" y="17" width="10" height="2" rx=".5" fill="currentColor" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2.5" />
      <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  download: <path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19.5h14" />,
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  feather: (
    <>
      <path d="M20 4c-6 0-12 4-13 13l-2 3" />
      <path d="M16 8 8 16M11 12h6" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="2" />
      <rect x="4" y="13" width="16" height="7" rx="2" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.7-1.5 1.7-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5Z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" />
      <circle cx="10" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="7.5" r="1" fill="currentColor" />
    </>
  ),
  hook: (
    <>
      <path d="M8 3v9a4 4 0 0 0 8 0v-1" />
      <path d="m13 13 3-3 3 3" />
    </>
  ),
  type: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 9h6M11 9v8M15.5 13.5c0-1 1-1.5 2-1.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  );
}

/* ---------- Segmented control ---------- */

interface Option<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}) {
  const name = React.useId();

  return (
    <fieldset className="segmented" aria-label={label}>
      {options.map((option) => (
        <label key={option.value} className="segmented-item">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.icon && <Icon name={option.icon} size={16} />}
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}

/* ---------- Form fields ---------- */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control is passed as children
    <label className="field">
      <span className="field-label">
        {label}
        {hint && <span className="field-hint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <input
      className={`input${mono ? " mono" : ""}`}
      value={value}
      placeholder={placeholder}
      spellCheck={false}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 365,
  suffix,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <div className="input-group">
      <input
        className="input"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (Number.isFinite(next)) {
            onChange(Math.min(max, Math.max(min, next)));
          }
        }}
      />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  );
}

export function ColorField({
  label,
  value,
  isDefault,
  onChange,
}: {
  label: string;
  value: string;
  isDefault: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="color-field">
      <span className="color-swatch" style={{ background: value }}>
        <input
          type="color"
          value={value}
          aria-label={label}
          onChange={(event) => onChange(event.target.value)}
        />
      </span>
      <span className="color-meta">
        <span className="color-label">{label}</span>
        <span className="color-value mono">
          {value}
          {isDefault && <span className="color-default"> · default</span>}
        </span>
      </span>
    </label>
  );
}

export function Range({
  label,
  value,
  min,
  max,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="range">
      <span className="range-head">
        <span>{label}</span>
        <span className="mono range-value">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        style={
          {
            "--fill": `${((value - min) / (max - min)) * 100}%`,
          } as React.CSSProperties
        }
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

/* ---------- Copy + code ---------- */

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className={`copy-btn${copied ? " is-copied" : ""}`}
      onClick={() => copyText(text).then(() => setCopied(true))}
      aria-label={copied ? "Copied" : label}
    >
      <Icon name={copied ? "check" : "copy"} size={15} />
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

export function CodeBlock({
  code,
  title,
  tabs,
  activeTab,
  onTab,
}: {
  code: string;
  title?: string;
  tabs?: string[];
  activeTab?: string;
  onTab?: (tab: string) => void;
}) {
  return (
    <div className="code">
      <div className="code-head">
        {tabs ? (
          <div className="code-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={tab === activeTab}
                className="code-tab"
                onClick={() => onTab?.(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : (
          <span className="code-title">{title}</span>
        )}
        <CopyButton text={code} />
      </div>
      <pre className="code-body">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

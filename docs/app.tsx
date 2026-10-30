import React from "react";
import { SmartBanner } from "smartbanner-tsx";
import { Playground } from "./components/playground";
import { PropsTable } from "./components/props-table";
import { CodeBlock, CopyButton, Icon, type IconName } from "./components/ui";
import iconUrl from "./icon.webp";
import { CSS_VARS, FAQ, HOOK_FIELDS } from "./lib/api";

const REPO = "https://github.com/madiyar/smartbanner-tsx";
const NPM = "https://www.npmjs.com/package/smartbanner-tsx";
const MIGRATION_URL = `${REPO}/blob/main/MIGRATION.md`;

const INSTALL = {
  npm: "npm install smartbanner-tsx",
  pnpm: "pnpm add smartbanner-tsx",
  yarn: "yarn add smartbanner-tsx",
  bun: "bun add smartbanner-tsx",
} as const;
type Manager = keyof typeof INSTALL;

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "feather",
    title: "Tiny",
    text: "About 2.5 KB gzipped with zero runtime dependencies. React is the only peer.",
  },
  {
    icon: "server",
    title: "SSR-safe",
    text: "Hydration-safe and ships with “use client” for the Next.js App Router.",
  },
  {
    icon: "palette",
    title: "Easy to theme",
    text: "Restyle with CSS variables, or render your own markup with a hook.",
  },
  {
    icon: "type",
    title: "Typed",
    text: "Written in TypeScript. Props, translations and the hook are fully typed.",
  },
];

const META_SNIPPET = `<head>
  <meta name="apple-itunes-app" content="app-id=544007664" />
  <meta name="google-play-app" content="app-id=com.google.android.youtube" />
  <link rel="apple-touch-icon" href="/icon.png" />
</head>`;

const USAGE_SNIPPET = `import { SmartBanner } from "smartbanner-tsx";
import "smartbanner-tsx/style.css";

export function App() {
  return <SmartBanner title="YouTube" author="Google LLC" />;
}`;

const APPID_SNIPPET = `<SmartBanner
  title="YouTube"
  appId={{ ios: "544007664", android: "com.google.android.youtube" }}
  icon="/icon.png"
/>`;

const PROPS_SNIPPET = `<SmartBanner
  title="YouTube"
  placement="bottom"
  className="my-banner"
  translations={{ button: "Open", price_ios: "GET" }}
  onInstall={(platform) => track("app_banner_install", platform)}
/>`;

const CSS_SNIPPET = `/* Everywhere */
:root {
  --smartbanner-button-bg: #e11d48;
  --smartbanner-button-radius: 8px;
}

/* Only on Android */
.smartbanner-android {
  --smartbanner-bg: #202124;
  --smartbanner-title-color: #ffffff;
}`;

const HOOK_SNIPPET = `import { useSmartBanner } from "smartbanner-tsx";

export function MyBanner() {
  const banner = useSmartBanner({
    appId: { ios: "544007664", android: "com.google.android.youtube" },
  });

  if (!banner.visible) return null;

  return (
    <div className="my-banner">
      <img src={banner.icon} alt="" />
      <span>{banner.description}</span>
      <a href={banner.link} onClick={banner.install}>{banner.t.button}</a>
      <button onClick={banner.close}>{banner.t.close}</button>
    </div>
  );
}`;

const SHADCN_URL =
  "https://madiyar.github.io/smartbanner-tsx/r/smart-banner.json";

const SHADCN_INSTALL = `npx shadcn@latest add ${SHADCN_URL}`;

const SHADCN_SNIPPET = `import { SmartBanner } from "@/components/smart-banner";

<SmartBanner
  title="YouTube"
  author="Google LLC"
  appId={{ ios: "544007664", android: "com.google.android.youtube" }}
/>`;

const CLASSIC_SNIPPET = `// v1
import "smartbanner-tsx/dist/style.css";

// v2, keeping the v1 look
import "smartbanner-tsx/classic.css";`;

function toggleTheme() {
  const root = document.documentElement;
  const isDark =
    root.dataset.theme === "dark" ||
    (!root.dataset.theme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const next = isDark ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("sb-demo-theme", next);
  } catch {
    // Storage can be blocked; the toggle still works for this visit.
  }
}

/** Same mark as the favicon (docs/public/favicon.svg). */
function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a78ec" />
          <stop offset="1" stopColor="#1a4fb0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logo-bg)" />
      <rect x="4.5" y="5.5" width="23" height="13" rx="4" fill="#fff" />
      <rect x="7.5" y="8.5" width="7" height="7" rx="2" fill="#1f5fd1" />
    </svg>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#top" className="brand">
          <Logo />
          <span>smartbanner-tsx</span>
        </a>
        <nav className="nav" aria-label="Sections">
          <a href="#getting-started">Guide</a>
          <a href="#playground">Playground</a>
          <a href="#api">API</a>
          <a href="#migration">Migration</a>
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <span className="only-light">
              <Icon name="moon" />
            </span>
            <span className="only-dark">
              <Icon name="sun" />
            </span>
          </button>
          <a
            className="icon-btn"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            title="GitHub"
          >
            <Icon name="github" />
          </a>
        </div>
      </div>
    </header>
  );
}

function InstallTabs() {
  const [manager, setManager] = React.useState<Manager>("npm");

  return (
    <CodeBlock
      tabs={Object.keys(INSTALL)}
      activeTab={manager}
      onTab={(tab) => setManager(tab as Manager)}
      code={INSTALL[manager]}
    />
  );
}

/** Real banners, forced to each platform, as a static preview. */
function HeroPreview() {
  return (
    <div className="hero-preview" aria-hidden="true">
      {(["ios", "android"] as const).map((platform) => (
        <figure key={platform} className="preview-item">
          <figcaption>{platform === "ios" ? "iOS" : "Android"}</figcaption>
          <div className="preview-slot">
            <SmartBanner
              force={platform}
              withPortal={false}
              disableHtmlMargin
              title="YouTube"
              author="Google LLC"
              icon={iconUrl}
              appId={{
                ios: "544007664",
                android: "com.google.android.youtube",
              }}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

function Heading({
  id,
  level = 2,
  children,
}: {
  id: string;
  level?: 2 | 3;
  children: React.ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="heading">
      {children}
      <a
        className="heading-anchor"
        href={`#${id}`}
        aria-label="Permalink to this section"
      >
        #
      </a>
    </Tag>
  );
}

export default function App() {
  return (
    <>
      {/* The real banner: open this page on an Android phone to see it. */}
      <SmartBanner title="YouTube" author="Google LLC" />

      <Header />

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <h1>
              <span className="hero-name">smartbanner-tsx</span>
              <span className="hero-title">Smart App Banner for React</span>
            </h1>
            <p className="hero-tagline">
              Promote your iOS and Android apps on your mobile website with a
              native-looking banner. Tiny, SSR-safe and easy to restyle.
            </p>
            <div className="hero-actions">
              <a href="#getting-started" className="btn btn-brand">
                Get started
              </a>
              <a href="#playground" className="btn btn-alt">
                Playground
              </a>
              <a
                href={REPO}
                className="btn btn-alt"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="install-cmd">
              <code>
                <span className="install-prompt" aria-hidden="true">
                  ${" "}
                </span>
                {INSTALL.npm}
              </code>
              <CopyButton text={INSTALL.npm} />
            </div>
          </div>
          <HeroPreview />
        </section>

        <section className="features" aria-label="Features">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="feature">
              <span className="feature-icon">
                <Icon name={feature.icon} size={20} />
              </span>
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </article>
          ))}
        </section>

        <div className="doc">
          <section>
            <Heading id="getting-started">Getting started</Heading>
            <p>
              The banner shows on Android and on iOS browsers that don't have
              Apple's native Smart App Banner (Chrome, Firefox, in-app
              browsers). It stays hidden in installed PWAs and after the user
              closes it.
            </p>

            <Heading id="installation" level={3}>
              Installation
            </Heading>
            <p>React 18 or 19 is the only peer dependency.</p>
            <InstallTabs />

            <Heading id="app-details" level={3}>
              Add your app details
            </Heading>
            <p>
              Put your App Store and Google Play IDs in meta tags, like for
              Apple's own banner. The icon is taken from{" "}
              <code>apple-touch-icon</code>.
            </p>
            <CodeBlock title="index.html" code={META_SNIPPET} />

            <Heading id="usage" level={3}>
              Render the banner
            </Heading>
            <CodeBlock title="App.tsx" code={USAGE_SNIPPET} />

            <div className="tip">
              <p className="tip-title">No meta tags?</p>
              <p>
                Pass the app IDs and icon as props instead. Props win over meta
                tags when both are set.
              </p>
              <CodeBlock title="App.tsx" code={APPID_SNIPPET} />
            </div>
          </section>

          <section>
            <Heading id="playground">Playground</Heading>
            <p>
              Change the content, theme and behavior. The code updates as you go
              — copy it when it looks right.
            </p>
            <Playground />
          </section>

          <section>
            <Heading id="customization">Customization</Heading>
            <p>
              Start with props, restyle with CSS variables, or take over the
              markup completely.
            </p>

            <Heading id="props-and-translations" level={3}>
              Props and translations
            </Heading>
            <p>
              Set texts, icon, links and placement. Missing translation keys
              fall back to English.
            </p>
            <CodeBlock title="App.tsx" code={PROPS_SNIPPET} />

            <Heading id="css-variables" level={3}>
              CSS variables
            </Heading>
            <p>
              Override variables globally, per platform with{" "}
              <code>.smartbanner-ios</code> or <code>.smartbanner-android</code>
              , or inline with the <code>style</code> prop.
            </p>
            <CodeBlock title="styles.css" code={CSS_SNIPPET} />
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {CSS_VARS.map((v) => (
                    <tr key={v.name}>
                      <td>
                        <code>{v.name}</code>
                      </td>
                      <td>{v.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Heading id="headless-hook" level={3}>
              Headless hook
            </Heading>
            <p>
              <code>useSmartBanner()</code> gives you device detection, store
              links and the cookie logic. You render whatever you like.
            </p>
            <CodeBlock title="MyBanner.tsx" code={HOOK_SNIPPET} />

            <Heading id="shadcn" level={3}>
              shadcn/ui
            </Heading>
            <p>
              Using shadcn/ui? Add a Tailwind version of the banner that uses
              your theme tokens and <code>Button</code>. It installs{" "}
              <code>components/smart-banner.tsx</code>, which renders the{" "}
              <code>useSmartBanner()</code> hook from this package, so you edit
              the markup and still get library fixes with{" "}
              <code>npm update</code>.
            </p>
            <CodeBlock title="Terminal" code={SHADCN_INSTALL} />
            <p>
              It takes the same options as <code>useSmartBanner()</code>, plus{" "}
              <code>placement</code> and <code>className</code>.
            </p>
            <CodeBlock title="layout.tsx" code={SHADCN_SNIPPET} />
          </section>

          <section>
            <Heading id="api">API</Heading>
            <p>
              All props are optional. The same options, except layout props,
              work with <code>useSmartBanner()</code>.
            </p>
            <PropsTable />

            <Heading id="hook-result" level={3}>
              useSmartBanner() result
            </Heading>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {HOOK_FIELDS.map((field) => (
                    <tr key={field.name}>
                      <td>
                        <code>{field.name}</code>
                      </td>
                      <td>
                        <code>{field.type}</code>
                      </td>
                      <td>{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Heading id="utilities" level={3}>
              Utilities
            </Heading>
            <ul className="list">
              <li>
                <code>resetSmartBanner()</code> clears the “closed” and
                “installed” cookies, so the banner can show again.
              </li>
              <li>
                <code>detectDevice()</code> and <code>resolvePlatform()</code>{" "}
                are the device detection the banner uses.
              </li>
            </ul>
          </section>

          <section>
            <Heading id="migration">Migrating to v2</Heading>
            <p>
              v2 keeps the props, meta tags, class names and markup of v1. The
              visible change is the new default look. To keep the v1 look,
              change one import:
            </p>
            <CodeBlock title="App.tsx" code={CLASSIC_SNIPPET} />
            <ul className="list">
              <li>
                <code>ua-parser-js</code> and <code>js-cookie</code> are no
                longer dependencies. Install them yourself only if your own code
                imports them.
              </li>
              <li>
                The <code>&lt;html&gt;</code> margin classes are added only
                while the banner is visible, and removed on unmount.
              </li>
              <li>
                Cookie names are unchanged, so users who closed the banner in v1
                won't see it again early.
              </li>
            </ul>
            <p>
              <a className="link" href={MIGRATION_URL}>
                Read the full migration guide →
              </a>
            </p>
          </section>

          <section>
            <Heading id="faq">FAQ</Heading>
            <div className="faq">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>Released under the MIT License.</p>
        <p>
          Copyright © 2025-present{" "}
          <a href="https://madiyar.dev" target="_blank" rel="noreferrer">
            madiyar
          </a>
          {" · "}
          <a href={NPM} target="_blank" rel="noreferrer">
            npm
          </a>
          {" · "}
          <a href="llms.txt">llms.txt</a>
        </p>
      </footer>
    </>
  );
}

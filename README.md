# smartbanner-tsx

**Smart App Banner for React 18/19** — a lightweight, zero-dependency component that promotes your iOS and Android apps on mobile websites. SSR-safe, typed, and easy to make your own with CSS variables or a headless hook.

> 🎯 Live playground: [smartbanner-tsx.js.org](https://smartbanner-tsx.js.org)
> 🙏 Inspired by [react-smartbanner](https://www.npmjs.com/package/react-smartbanner)

[![npm version](https://img.shields.io/npm/v/smartbanner-tsx.svg)](https://www.npmjs.com/package/smartbanner-tsx) [![license](https://img.shields.io/npm/l/smartbanner-tsx.svg)](https://www.npmjs.com/package/smartbanner-tsx) [![size](https://deno.bundlejs.com/?q=smartbanner-tsx&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%2C%22react%2Fjsx-runtime%22%5D%7D%7D&badge)](https://bundlejs.com/?q=smartbanner-tsx&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%2C%22react%2Fjsx-runtime%22%5D%7D%7D)

## Features

- 🪶 **~2.5 KB gzipped, zero runtime dependencies** — only React as a peer
- 📱 **Smart detection** — shows on Android and on iOS browsers without Apple's native banner (Chrome, Firefox, in-app browsers); hidden in installed PWAs
- 🍪 **Remembers the user's choice** — stays hidden for N days after close or install
- 🎨 **Easy to theme** — CSS variables, class names, or your own markup via `useSmartBanner()`
- ⚡ **SSR & Next.js App Router ready** — hydration-safe, ships with `"use client"`
- ✅ **TypeScript first** — typed props, translations and hook

## Installation

```bash
npm install smartbanner-tsx
# or
pnpm add smartbanner-tsx
# or
yarn add smartbanner-tsx
```

## Usage

1. Add your app IDs and icon to `<head>` (the same tags Apple's native banner uses):

```html
<head>
  <meta name="apple-itunes-app" content="app-id=544007664" />
  <meta name="google-play-app" content="app-id=com.google.android.youtube" />
  <link rel="apple-touch-icon" href="/icon.png" />
</head>
```

2. Render the banner:

```tsx
import { SmartBanner } from "smartbanner-tsx";
import "smartbanner-tsx/style.css";

export default function App() {
  return <SmartBanner title="YouTube" author="Google LLC" />;
}
```

No meta tags? Pass the IDs and icon as props instead (props win when both are set):

```tsx
<SmartBanner
  title="YouTube"
  appId={{ ios: "544007664", android: "com.google.android.youtube" }}
  icon="/icon.png"
/>
```

### Next.js (App Router)

The package ships with `"use client"`, so you can render it straight from `app/layout.tsx`, inside `<body>`:

```tsx
<body>
  <SmartBanner title="YouTube" appId={{ ios: "544007664", android: "com.google.android.youtube" }} />
  {children}
</body>
```

## Upgrading from v1

v2 keeps the v1 props, meta tags, class names and markup. The visible change is the new default look. To keep the v1 look, import the classic styles:

```diff
- import "smartbanner-tsx/dist/style.css";
+ import "smartbanner-tsx/classic.css";
```

See [MIGRATION.md](./MIGRATION.md) for the full list of changes.

## Customization

### 1. Props and translations

```tsx
<SmartBanner
  title="YouTube"
  placement="bottom"
  className="my-banner"
  translations={{ button: "Open", price_ios: "GET", close: "Dismiss" }}
  onInstall={(platform) => analytics.track("app_banner_install", { platform })}
/>
```

### 2. CSS variables

Override them globally, per platform (`.smartbanner-ios`, `.smartbanner-android`), or through the `style` prop.

```css
:root {
  --smartbanner-button-bg: #ff0033;
  --smartbanner-button-radius: 8px;
}

.smartbanner-android {
  --smartbanner-bg: #121212;
  --smartbanner-title-color: #fff;
}
```

See [all variables](https://smartbanner-tsx.js.org/#css-variables), or let the [playground](https://smartbanner-tsx.js.org/#playground) generate them for you.

### 3. Headless hook

Use the logic and render your own markup ([all fields](https://smartbanner-tsx.js.org/#hook-result)):

```tsx
const banner = useSmartBanner({ appId: { ios: "544007664", android: "com.google.android.youtube" } });

if (!banner.visible) return null;

return (
  <div className="my-banner">
    <a href={banner.link} onClick={banner.install}>{banner.t.button}</a>
    <button onClick={banner.close}>{banner.t.close}</button>
  </div>
);
```

### 4. shadcn/ui

Using [shadcn/ui](https://ui.shadcn.com)? Add a Tailwind version of the banner that uses your theme tokens and `Button`:

```bash
npx shadcn@latest add https://smartbanner-tsx.js.org/r/smart-banner.json
```

It adds `components/smart-banner.tsx` on top of `useSmartBanner()`: you own the markup, detection and cookies stay in the package. [More on the site](https://smartbanner-tsx.js.org/#shadcn).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | | App title |
| `author` | `string` | | App author or publisher |
| `translations` | `Partial<Translations>` | English texts | `button`, `price_ios`, `price_android`, `store_ios`, `store_android`, `close` |
| `icon` | `string` | from `<link rel="apple-touch-icon">` | App icon URL |
| `appId` | `{ ios?, android? }` | from meta tags | App IDs |
| `meta` | `{ ios?, android? }` | `apple-itunes-app` / `google-play-app` | Meta tag names to read the app ID from |
| `url` | `{ ios?, android? }` | generated | Custom store links |
| `storeLang` | `string` | region of `navigator.language` or `us` | Country in the App Store link |
| `force` | `'ios' \| 'android'` | | Always show for this platform (testing) |
| `ignoreIosVersion` | `boolean` | `false` | Show in iOS Safari too |
| `daysHidden` | `number` | `15` | Days hidden after close |
| `daysReminder` | `number` | `90` | Days hidden after the button click |
| `placement` | `'top' \| 'bottom'` | `'top'` | Position |
| `disableHtmlMargin` | `boolean` | `false` | Don't add a margin to `<html>` |
| `withPortal` | `boolean` | `true` | Render in a React portal |
| `portalTargetId` | `string` | `document.body` | Portal target element ID |
| `className` / `style` | | | Extra class / inline styles for the root |
| `target` | `string` | `'_blank'` | Target of the store link |
| `onShow` / `onClose` / `onInstall` | `(platform) => void` | | Callbacks |

Also exported: `resetSmartBanner()` (clears the "closed"/"installed" cookies), `detectDevice()` and `resolvePlatform()`.

## FAQ

**Why don't I see the banner on my iPhone in Safari?**
Safari on iOS shows Apple's native Smart App Banner from the `apple-itunes-app` meta tag, so this banner is skipped there to avoid two banners. It shows in Chrome, Firefox and in-app browsers on iOS, and on Android. Set `ignoreIosVersion` to show it in Safari too.

**Why doesn't it show on desktop?**
It only targets phones and tablets. Use `force="ios"` or `force="android"` to preview it.

**I closed the banner and it doesn't come back.**
Closing sets the `smartbanner-closed` cookie for `daysHidden` days, tapping the button sets `smartbanner-installed` for `daysReminder` days. Call `resetSmartBanner()` or delete the cookies.

More in the [FAQ on the site](https://smartbanner-tsx.js.org/#faq). Docs for AI tools: [llms.txt](https://smartbanner-tsx.js.org/llms.txt), [llms-full.txt](https://smartbanner-tsx.js.org/llms-full.txt).

## License

MIT — [madiyar](https://madiyar.dev) · [Contributing](./CONTRIBUTING.md)

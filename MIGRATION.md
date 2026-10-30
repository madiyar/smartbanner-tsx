# Migrating from v1 to v2

v2 keeps the same component, props, meta tags, class names and markup. For most apps the upgrade is:

```bash
npm install smartbanner-tsx@2
```

The one visible change is the **new default look**. If you want the banner to look exactly like in v1, change one import:

```diff
- import "smartbanner-tsx/dist/style.css";
+ import "smartbanner-tsx/classic.css";
```

That's it. Everything below is a detailed list, so you can check whether anything applies to you.

## Checklist

| | Change | What to do |
| --- | --- | --- |
| ⚠️ | New default styles | Nothing, or use `classic.css` for the v1 look |
| ⚠️ | `ua-parser-js` and `js-cookie` are no longer dependencies | Install them yourself if your own code imports them |
| ⚠️ | `<html>` classes are set only while the banner is visible | Only matters if your CSS targets `.smartbanner-margin-top` / `-bottom` without `.smartbanner-show` |
| ℹ️ | Build target is ES2018 (was ES2015) | Nothing for browsers from 2018+ (iOS 12+, Android Chrome 64+) |
| ℹ️ | App Store links use `apps.apple.com`, Play links use `https` | Nothing |
| ✅ | Meta tags, props, class names, markup, cookie names | Unchanged |

## Breaking changes

### 1. New default styles

`style.css` was rewritten: a modern iOS/Android look, flexbox layout and [CSS variables](./README.md#2-css-variables) for theming. The HTML structure and class names did not change.

- **You use the default styles and like the new look** — nothing to do.
- **You want the v1 look** — import `smartbanner-tsx/classic.css` instead of `style.css`. It is the v1 stylesheet, unchanged.
- **You override the default styles with your own CSS** — colors and fonts usually keep working. Overrides of layout (`line-height`, `width` of `.smartbanner-info`, `inline-block` alignment) may need a look, because v2 uses flexbox. If you don't want to touch them, use `classic.css`. Or replace overrides with variables:

```css
/* v1 */
.smartbanner-ios .smartbanner-button { color: #ff0033; }

/* v2 */
:root { --smartbanner-button-bg: #ff0033; }
```

### 2. No runtime dependencies

v2 has its own small user agent and cookie helpers, so `ua-parser-js` (AGPL-3.0 licensed since v2) and `js-cookie` are not installed anymore. If your app imports them directly and relied on them being installed through `smartbanner-tsx`, add them to your `package.json`.

### 3. `<html>` classes

v1 always added `smartbanner-margin-top` (or `-bottom`) to `<html>`, and `smartbanner-show` while the banner was visible. v2 adds all of them only while the banner is visible and removes them when it is closed or unmounted. This fixes a stuck 80px page margin after unmounting the banner. Selectors like `.smartbanner-show.smartbanner-margin-top`, which the default CSS uses, work as before.

## Behavior that stays the same

- The app ID is read from `<meta name="apple-itunes-app">` / `<meta name="google-play-app">` (or your `meta` names). Without an app ID the banner is not shown.
- The icon is read from `<link rel="apple-touch-icon">` / `android-touch-icon`.
- Cookie names are still `smartbanner-closed` and `smartbanner-installed`, so users who closed the banner in v1 won't see it again until the cookie expires.
- iOS Safari is skipped (it has Apple's native banner) unless `ignoreIosVersion` is set.

## Small fixes you might notice

- iPads in "desktop website" mode are now detected as iOS. In Safari they still get Apple's native banner; in Chrome or Firefox for iPad they now see this banner.
- The store country is read correctly from locales with a script, e.g. `zh-Hant-TW` → `tw` (v1 returned `hant`).
- `javascript:`, `data:` and `vbscript:` links in the `url` prop are replaced with `#`.
- Works in Next.js App Router server components: the package ships with `"use client"`.

## New in v2 (optional)

```tsx
<SmartBanner
  title="YouTube"
  // App IDs without meta tags
  appId={{ ios: "544007664", android: "com.google.android.youtube" }}
  // Icon without link tags
  icon="/icon.png"
  // Inline CSS variables
  style={{ "--smartbanner-button-bg": "#ff0033" }}
  // Localized close button label
  translations={{ close: "Закрыть" }}
  // Callbacks now receive the platform, plus a new onShow
  onShow={(platform) => track("banner_show", platform)}
  onInstall={(platform) => track("banner_install", platform)}
/>
```

- `useSmartBanner()` — the banner logic without markup, for a fully custom design.
- `resetSmartBanner()` — clears the "closed"/"installed" cookies.
- `detectDevice()` / `resolvePlatform()` — the detection used by the banner.
- Exported types: `SmartBannerProps`, `SmartBannerOptions`, `SmartBannerState`, `Platform`, `Translations`.
- Shorter CSS import: `smartbanner-tsx/style.css` (the `dist/style.css` path still works).

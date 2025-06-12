# smartbanner-tsx

**Smart App Banner for React v18+ (TypeScript)** — a customizable React component for promoting iOS and Android apps on mobile websites. Lightweight, flexible, and easy to integrate with your own styles or use the default [native-like appearance](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners).

> 🎯 Live Demo: [madiyar.github.io/smartbanner-tsx](https://madiyar.github.io/smartbanner-tsx)  
> 🙏 Based on: [react-smartbanner](https://www.npmjs.com/package/react-smartbanner)

[![npm version](https://badge.fury.io/js/smartbanner-tsx.svg)](https://www.npmjs.com/package/smartbanner-tsx) [![npm](https://img.shields.io/npm/l/smartbanner-tsx.svg?maxAge=2592000)](https://www.npmjs.com/package/smartbanner-tsx) [![size](https://img.shields.io/bundlephobia/minzip/smartbanner-tsx/1)](https://www.npmjs.com/package/smartbanner-tsx)

## 🚀 Features

* 📱 **Device detection** using [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) to target iOS and Android only
* 🧠 **Built-in cookie logic** (via [js-cookie](https://www.npmjs.com/package/js-cookie)) to hide banner for a period after user action
* 🧩 **Customizable behavior** — pass custom app links, metadata, and localization strings
* 🎨 **Styling flexibility** — use default styles or override with your own CSS
* 🌀 **React Portal support** — render banner outside normal DOM flow
* ✅ **Written in TypeScript** — includes full typings for a smooth developer experience
* 🧪 Works with **React v18+**

## 📦 Installation

```bash
npm install smartbanner-tsx
# or
yarn add smartbanner-tsx
# or
pnpm add smartbanner-tsx
```

## ⚙️ Usage

1. Add meta tags to `<head>`

```html
<!-- Example using YouTube app -->
<head>
  <meta name="apple-itunes-app" content="app-id=544007664" />
  <meta name="google-play-app" content="app-id=com.google.android.youtube" />
  <link rel="apple-touch-icon" href="icon.webp" />
  <link rel="android-touch-icon" href="icon.webp" />
</head>
```

2. Import and use the component

```tsx
import { SmartBanner } from "smartbanner-tsx";
import "smartbanner-tsx/dist/style.css"; // or use your own CSS file

// ...

export default function App() {
  return <SmartBanner title="YouTube" author="Google" />;
}

```

## 🧩 Props

See full list with descriptions and defaults on the [Demo Page](https://madiyar.github.io/smartbanner-tsx#props).

## 📜 License

MIT — <a href="https://madiyar.dev">madiyar</a>

### 🔍 Keywords (for SEO)

`react smart app banner`, `smartbanner react`, `custom smart banner react`, `react app store banner`, `ios smart banner`, `react component app banner`, `app promotion banner`

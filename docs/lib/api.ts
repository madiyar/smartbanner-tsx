export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
  group: "Content" | "App" | "Behavior" | "Layout" | "Events";
}

export const PROPS: PropDoc[] = [
  {
    name: "title",
    type: "string",
    description: "App title displayed in the banner.",
    group: "Content",
  },
  {
    name: "author",
    type: "string",
    description: "Name of the app author or publisher.",
    group: "Content",
  },
  {
    name: "translations",
    type: "Partial<Translations>",
    default: "English texts",
    description:
      "UI texts: button, price_ios, price_android, store_ios, store_android, close. Pass only the keys you want to change.",
    group: "Content",
  },
  {
    name: "icon",
    type: "string",
    default: "touch icon link",
    description:
      "App icon URL. By default it is read from the touch icon link tags.",
    group: "Content",
  },
  {
    name: "appId",
    type: "{ ios?, android? }",
    description:
      "App IDs per platform. When set, the meta tags are not needed.",
    group: "App",
  },
  {
    name: "meta",
    type: "{ ios?, android? }",
    default: "apple-itunes-app, google-play-app",
    description: "Names of the meta tags to read `app-id=...` from.",
    group: "App",
  },
  {
    name: "url",
    type: "{ ios?, android? }",
    description: "Custom store links. Override the generated ones.",
    group: "App",
  },
  {
    name: "storeLang",
    type: "string",
    default: "from navigator.language",
    description: "Country code used in the App Store link.",
    group: "App",
  },
  {
    name: "force",
    type: "'ios' | 'android'",
    description:
      "Always show the banner for this platform. Useful for testing and previews.",
    group: "Behavior",
  },
  {
    name: "ignoreIosVersion",
    type: "boolean",
    default: "false",
    description:
      "Show the banner in iOS Safari too, even though Safari has a native banner.",
    group: "Behavior",
  },
  {
    name: "daysHidden",
    type: "number",
    default: "15",
    description: "Days to hide the banner after it is closed.",
    group: "Behavior",
  },
  {
    name: "daysReminder",
    type: "number",
    default: "90",
    description: "Days to hide the banner after the button is clicked.",
    group: "Behavior",
  },
  {
    name: "placement",
    type: "'top' | 'bottom'",
    default: "'top'",
    description: "Where the banner is shown.",
    group: "Layout",
  },
  {
    name: "disableHtmlMargin",
    type: "boolean",
    default: "false",
    description: "Don't add a margin to <html> to make room for the banner.",
    group: "Layout",
  },
  {
    name: "withPortal",
    type: "boolean",
    default: "true",
    description: "Render the banner through a React portal.",
    group: "Layout",
  },
  {
    name: "portalTargetId",
    type: "string",
    default: "document.body",
    description: "ID of the element to render the portal into.",
    group: "Layout",
  },
  {
    name: "className",
    type: "string",
    description: "Extra class name for the banner root.",
    group: "Layout",
  },
  {
    name: "style",
    type: "CSSProperties",
    description: "Inline styles for the banner root. Handy for CSS variables.",
    group: "Layout",
  },
  {
    name: "target",
    type: "string",
    default: "'_blank'",
    description: "Target attribute of the store link.",
    group: "Layout",
  },
  {
    name: "onShow",
    type: "(platform) => void",
    description: "Called when the banner becomes visible.",
    group: "Events",
  },
  {
    name: "onClose",
    type: "(platform) => void",
    description: "Called when the close button is clicked.",
    group: "Events",
  },
  {
    name: "onInstall",
    type: "(platform) => void",
    description: "Called when the install/view button is clicked.",
    group: "Events",
  },
];

export const CSS_VARS: { name: string; description: string }[] = [
  { name: "--smartbanner-bg", description: "Background" },
  { name: "--smartbanner-title-color", description: "Title color" },
  { name: "--smartbanner-text-color", description: "Author and price color" },
  { name: "--smartbanner-button-bg", description: "Button background" },
  { name: "--smartbanner-button-color", description: "Button text color" },
  { name: "--smartbanner-button-radius", description: "Button corner radius" },
  { name: "--smartbanner-close-color", description: "Close icon color" },
  { name: "--smartbanner-icon-size", description: "Icon size (56px)" },
  { name: "--smartbanner-icon-radius", description: "Icon corner radius" },
  {
    name: "--smartbanner-height",
    description: "Banner height and page offset (80px)",
  },
  { name: "--smartbanner-font", description: "Font family" },
  {
    name: "--smartbanner-border",
    description: "Border between banner and page",
  },
  { name: "--smartbanner-shadow", description: "Box shadow" },
  { name: "--smartbanner-z-index", description: "Stacking order (9998)" },
  { name: "--smartbanner-max-width", description: "Max width of the content" },
];

export const HOOK_FIELDS: {
  name: string;
  type: string;
  description: string;
}[] = [
  {
    name: "visible",
    type: "boolean",
    description: "Whether the banner should be shown now.",
  },
  {
    name: "platform",
    type: "'ios' | 'android' | undefined",
    description: "Detected or forced platform.",
  },
  { name: "appId", type: "string", description: "App ID for the platform." },
  { name: "link", type: "string", description: "Store link." },
  { name: "icon", type: "string", description: "Icon URL." },
  {
    name: "description",
    type: "string",
    description: "Price and store text, e.g. “Free - On the App Store”.",
  },
  {
    name: "t",
    type: "Translations",
    description: "Texts merged with the defaults.",
  },
  {
    name: "close",
    type: "() => void",
    description: "Hides the banner for daysHidden days.",
  },
  {
    name: "install",
    type: "() => void",
    description: "Hides the banner for daysReminder days.",
  },
];

/** Also used for the FAQPage structured data in index.html — keep in sync. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Why don't I see the banner on my iPhone in Safari?",
    a: "Safari on iOS shows Apple's native Smart App Banner from the apple-itunes-app meta tag, so this banner is skipped there to avoid two banners. It shows in Chrome, Firefox and in-app browsers on iOS, and on Android. Set ignoreIosVersion to show it in Safari too.",
  },
  {
    q: "Why doesn't the banner show on desktop?",
    a: 'It only targets phones and tablets. Use the force prop (force="ios" or force="android") to preview it on desktop.',
  },
  {
    q: "I closed the banner and it doesn't come back. How do I test it again?",
    a: "Closing sets the smartbanner-closed cookie for daysHidden days, and tapping the button sets smartbanner-installed for daysReminder days. Call resetSmartBanner() or delete these cookies.",
  },
  {
    q: "Does it work with Next.js, Remix or other SSR frameworks?",
    a: 'Yes. Nothing is rendered on the server, everything is read after mount, and the package ships with "use client", so you can render it from a Next.js App Router layout.',
  },
  {
    q: "Can I use my own design?",
    a: "Yes. Restyle the default banner with CSS variables and class names, use the useSmartBanner() hook and render your own markup, or add the shadcn/ui component for a Tailwind version you can edit.",
  },
  {
    q: "How is it different from react-smartbanner?",
    a: "smartbanner-tsx is written in TypeScript, has no runtime dependencies, supports React 18 and 19, is SSR-safe and offers CSS variables and a headless hook.",
  },
];

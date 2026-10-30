import type React from "react";

export type Platform = "ios" | "android";

export type TranslationKey =
  | "button"
  | "price_ios"
  | "price_android"
  | "store_ios"
  | "store_android"
  | "close";

export type Translations = Record<TranslationKey, string>;

/** Options shared by the `<SmartBanner />` component and the `useSmartBanner()` hook. */
export interface SmartBannerOptions {
  /**
   * App title displayed in the banner.
   */
  title?: string;

  /**
   * Name of the app author or publisher.
   */
  author?: string;

  /**
   * Custom UI text translations. Missing keys fall back to the defaults.
   * @default
   * ```js
   * {
   *   button: "View",
   *   price_ios: "Free",
   *   price_android: "Free",
   *   store_ios: "On the App Store",
   *   store_android: "In Google Play",
   *   close: "close"
   * }
   * ```
   */
  translations?: Partial<Translations>;

  /**
   * Number of days to hide the banner after the close button is clicked.
   * @default 15
   */
  daysHidden?: number;

  /**
   * Number of days to hide the banner after the install/view button is clicked.
   * @default 90
   */
  daysReminder?: number;

  /**
   * Force banner to show for a specific platform (useful for testing).
   * @example
   * ```tsx
   * <SmartBanner force="ios" />
   * <SmartBanner force="android" />
   * ```
   */
  force?: Platform;

  /**
   * Language/country code used to generate the App Store URL.
   * @default region from navigator.language or 'us'
   */
  storeLang?: string;

  /**
   * App IDs per platform. When set, the meta tags are not needed.
   * @example { ios: "544007664", android: "com.google.android.youtube" }
   */
  appId?: Partial<Record<Platform, string>>;

  /**
   * Names of the meta tags to read the app ID from (`content="app-id=..."`).
   * @default { ios: "apple-itunes-app", android: "google-play-app" }
   */
  meta?: Partial<Record<Platform, string>>;

  /**
   * Custom app store URLs for each platform. Overrides the generated store link.
   */
  url?: Partial<Record<Platform, string>>;

  /**
   * App icon URL. When not set, the icon is read from
   * `<link rel="apple-touch-icon">` / `<link rel="android-touch-icon">`.
   */
  icon?: string;

  /**
   * If `true`, the banner shows even in iOS Safari, which has a native Smart App Banner.
   * @default false
   */
  ignoreIosVersion?: boolean;

  /**
   * Called once the banner becomes visible.
   */
  onShow?: (platform: Platform) => void;

  /**
   * Called when the close button is clicked.
   */
  onClose?: (platform: Platform) => void;

  /**
   * Called when the install/view button is clicked.
   */
  onInstall?: (platform: Platform) => void;
}

export interface SmartBannerProps extends SmartBannerOptions {
  /**
   * Banner position on the screen: either at the top or bottom.
   * @default 'top'
   */
  placement?: "top" | "bottom";

  /**
   * Don't add a margin to `<html>` to make room for the banner.
   * @default false
   */
  disableHtmlMargin?: boolean;

  /**
   * Whether to render the banner using a React Portal.
   * @default true
   */
  withPortal?: boolean;

  /**
   * Optional target element ID for the portal. Defaults to `document.body`.
   */
  portalTargetId?: string;

  /**
   * Additional CSS class name for the banner container.
   */
  className?: string;

  /**
   * Inline styles for the banner container. Handy for CSS variables:
   * `style={{ "--smartbanner-button-bg": "#000" }}`.
   */
  style?: React.CSSProperties & Record<`--${string}`, string | number>;

  /**
   * Target attribute for the app store link.
   * @default "_blank"
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

/** What `useSmartBanner()` returns. Use it to build a fully custom banner. */
export interface SmartBannerState {
  /** Whether the banner should be shown right now. */
  visible: boolean;
  /** Detected (or forced) platform; `undefined` on desktop and in iOS Safari. */
  platform?: Platform;
  /** App ID for the current platform. */
  appId: string;
  /** Store link for the current platform. */
  link: string;
  /** Icon URL for the current platform. */
  icon: string;
  /** Price and store text, e.g. "Free - On the App Store". */
  description: string;
  /** Merged translations. */
  t: Translations;
  /** Hide the banner and remember it for `daysHidden` days. */
  close: () => void;
  /** Hide the banner and remember it for `daysReminder` days. */
  install: () => void;
}

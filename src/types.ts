import React from "react";

export type Platform = "ios" | "android";
type TKeys = "button" | "price_ios" | "price_android" | "store_ios" | "store_android";

export interface SmartBannerProps {
  /**
   * App title displayed in the banner.
   */
  title?: string;

  /**
   * Name of the app author or publisher.
   */
  author?: string;

  /**
   * Custom UI text translations.
   * @default
   * ```js
   * {
   *   button: "View",
   *   price_ios: "Free",
   *   price_android: "Free",
   *   store_ios: "On the App Store",
   *   store_android: "In Google Play" 
   * }
   * ```
   */
  translations?: Partial<Record<TKeys, string>>;

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
   * Banner position on the screen: either at the top or bottom.
   * @default 'top'
   */
  placement?: "top" | "bottom";

  /**
   * Language code used to generate App Store or Play Store URLs.
   * @default navigator.language or 'us'
   */
  storeLang?: string;

  /**
   * The custom meta tag name.
   * It provide an option to enforce using custom meta tag to show smart banner.
   * @default { ios: "apple-itunes-app", android: "google-play-app" }
   */
  meta?: Record<Platform, string>;

  /**
   * Custom app store URLs for each platform.
   * @default { ios: "", android: "" }
   */
  url?: Record<Platform, string>;

  /**
   * If `true`, the banner will show even on iOS versions that support native Smart Banners.
   * @default false
   */
  ignoreIosVersion?: boolean;

  /**
   * Optional callback triggered when the close button is clicked.
   */
  onClose?: () => void;

  /**
   * Optional callback triggered when the install/view button is clicked.
   */
  onInstall?: () => void;

  /**
   * Whether to render the banner using a React Portal.
   * @default true
   */
  withPortal?: boolean;

  /**
   * Optional target element ID for the portal. Defaults to `document.body` if not provided.
   */
  portalTargetId?: string;

  /**
   * Additional CSS class name for the banner container.
   */
  className?: React.HTMLAttributes<HTMLDivElement>["className"];

  /**
   * Target attribute for the app store link.
   * @default "_blank"
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

import type { Platform, Translations } from "./types";

export const is_client = typeof window !== "undefined";

export const default_meta: Record<Platform, string> = {
  ios: "apple-itunes-app",
  android: "google-play-app",
};

export const default_translations: Translations = {
  button: "View",
  price_ios: "Free",
  price_android: "Free",
  store_ios: "On the App Store",
  store_android: "In Google Play",
  close: "close",
};

export const iconsRels: Record<Platform, string[]> = {
  ios: ["apple-touch-icon", "apple-touch-icon-precomposed"],
  android: [
    "android-touch-icon",
    "apple-touch-icon",
    "apple-touch-icon-precomposed",
  ],
};

/**
 * Store country from a locale: "en-GB" → "gb", "zh-Hant-TW" → "tw", "en" → "us".
 */
export const parseStoreLang = (locale?: string): string => {
  const region = (locale || "")
    .split(/[-_]/)
    .slice(1)
    .find((part) => /^[a-z]{2}$/i.test(part));

  return region ? region.toLowerCase() : "us";
};

export const defaultStoreLang = (): string =>
  is_client ? parseStoreLang(window.navigator.language) : "us";

type Standalone = Navigator & { standalone?: boolean };

/** True when the site runs as an installed PWA. */
export const isStandalone = (): boolean => {
  if (!is_client) return false;

  return (
    !!(window.navigator as Standalone)?.standalone ||
    !!window.matchMedia?.("(display-mode: standalone)")?.matches
  );
};

/** Reads `app-id=...` from `<meta name="...">`. */
export const readMetaAppId = (name?: string): string => {
  if (!is_client || !name) return "";

  const tag = document.querySelector(
    `meta[name="${name.replace(/["\\]/g, "\\$&")}"]`,
  );
  const match = /app-id=([^\s,]+)/.exec(tag?.getAttribute("content") || "");

  return match?.[1] || "";
};

/** Reads the icon URL from the first matching `<link rel="...">`. */
export const readIconUrl = (platform: Platform): string => {
  if (!is_client) return "";

  for (const rel of iconsRels[platform]) {
    const href = document
      .querySelector(`link[rel="${rel}"]`)
      ?.getAttribute("href");
    if (href) return href;
  }

  return "";
};

/** Drops `javascript:`, `data:` and `vbscript:` links. */
export const safeUrl = (value: string): string =>
  /^\s*(javascript|data|vbscript):/i.test(value) ? "#" : value;

export const buildStoreLink = (
  platform: Platform,
  appId: string,
  storeLang: string,
): string => {
  if (!appId) return "#";

  const id = encodeURIComponent(appId);

  return platform === "ios"
    ? `https://apps.apple.com/${encodeURIComponent(storeLang || "us")}/app/id${id}`
    : `https://play.google.com/store/apps/details?id=${id}`;
};

const createCookieManager = (key: string) => ({
  get: (): string | undefined => {
    if (!is_client) return undefined;

    const prefix = `${key}=`;
    const entry = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix));

    return entry ? decodeURIComponent(entry.slice(prefix.length)) : undefined;
  },
  set: (days: number) => {
    if (!is_client) return;

    const maxAge = Math.max(0, Math.round(days * 24 * 60 * 60));
    document.cookie = `${key}=true; path=/; max-age=${maxAge}; SameSite=Lax`;
  },
  remove: () => {
    if (!is_client) return;

    document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`;
  },
});

export const cookie = {
  closed: createCookieManager("smartbanner-closed"),
  installed: createCookieManager("smartbanner-installed"),
};

/** Clears the "closed" and "installed" cookies so the banner can show again. */
export const resetSmartBanner = () => {
  cookie.closed.remove();
  cookie.installed.remove();
};

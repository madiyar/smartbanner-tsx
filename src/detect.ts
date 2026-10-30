import type { Platform } from "./types";

export interface DeviceInfo {
  /** Mobile OS, if it is iOS/iPadOS or Android. */
  os?: Platform;
  /** Major OS version, when it can be read from the user agent. */
  osVersion?: number;
  /** True for Safari itself (not Chrome/Firefox/Edge/in-app web views on iOS). */
  isSafari: boolean;
}

// Browsers and in-app web views on iOS that are built on WebKit but are not Safari.
// Apple's native Smart App Banner only appears in Safari, so we show ours in these.
const NON_SAFARI_IOS =
  /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|YaBrowser|DuckDuckGo|GSA\/|FBAN|FBAV|Instagram|Line\/|Twitter|Snapchat|TikTok|musical_ly|Telegram|WhatsApp/i;

/**
 * Lightweight user agent detection. Only answers the questions the banner needs,
 * so we don't have to ship a full UA parser.
 */
export function detectDevice(
  userAgent: string,
  maxTouchPoints = 0,
): DeviceInfo {
  const ua = userAgent || "";

  if (/Android/i.test(ua)) {
    const version = /Android[\s/]+(\d+)/i.exec(ua);
    return {
      os: "android",
      osVersion: version ? Number(version[1]) : undefined,
      isSafari: false,
    };
  }

  const isAppleMobile = /iPhone|iPad|iPod/.test(ua);
  // iPadOS 13+ Safari pretends to be a Mac by default; touch support gives it away.
  const isDesktopModeIpad = /Macintosh/.test(ua) && maxTouchPoints > 1;

  if (isAppleMobile || isDesktopModeIpad) {
    const version = /OS (\d+)[_.]\d/.exec(ua);
    const isSafari =
      /Version\/[\d.]+.*Safari\//.test(ua) && !NON_SAFARI_IOS.test(ua);

    return {
      os: "ios",
      osVersion: isAppleMobile && version ? Number(version[1]) : undefined,
      isSafari,
    };
  }

  return { isSafari: false };
}

/**
 * Decides which banner (if any) to show for a device.
 * On iOS Safari 6+ the native Smart App Banner is used instead, unless `ignoreIosVersion`.
 */
export function resolvePlatform(
  device: DeviceInfo,
  ignoreIosVersion = false,
): Platform | undefined {
  if (device.os === "android") return "android";

  if (device.os === "ios") {
    const hasNativeBanner =
      device.isSafari &&
      (device.osVersion === undefined || device.osVersion >= 6);
    return ignoreIosVersion || !hasNativeBanner ? "ios" : undefined;
  }

  return undefined;
}

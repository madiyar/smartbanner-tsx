import Cookies from "js-cookie";
import { Platform, SmartBannerProps } from "./types";

export const is_client = typeof window !== "undefined";
export const html = is_client ? document.documentElement : null;

export const default_meta: NonNullable<SmartBannerProps["meta"]> = {
  ios: "apple-itunes-app",
  android: "google-play-app",
};

export const defaultStoreLang = (): NonNullable<SmartBannerProps["storeLang"]> => {
  if (is_client) {
    const lang = window.navigator.language;
    return lang.includes("-") ? lang.split("-")[1].toLowerCase() : "us";
  }

  return "us";
};

export const default_translations: NonNullable<SmartBannerProps["translations"]> = {
  button: "View",
  price_ios: "Free",
  price_android: "Free",
  store_ios: "On the App Store",
  store_android: "In Google Play",
};

export const iconsRels: Record<Platform, string[]> = {
  ios: [
    "apple-touch-icon",
    "apple-touch-icon-precomposed",
  ],
  android: [
    "android-touch-icon",
    "apple-touch-icon",
    "apple-touch-icon-precomposed",
  ],
};

export const isStandalone = () => {
  if (is_client) {
    return !!(window.navigator as any)?.standalone || window.matchMedia?.("(display-mode: standalone)")?.matches;
  }

  return false;
};

const createCookieManager = (key: string) => {
  return {
    get: () => Cookies.get(key),
    set: (days: number) => Cookies.set(key, "true", { path: "/", expires: days }),
  }
};

export const cookie = {
  closed: createCookieManager("smartbanner-closed"),
  installed: createCookieManager("smartbanner-installed"),
}

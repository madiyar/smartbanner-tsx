import type { Platform } from "smartbanner-tsx";

export type Placement = "top" | "bottom";

export interface Theme {
  bg?: string;
  title?: string;
  text?: string;
  buttonBg?: string;
  buttonColor?: string;
  /** px; 20 means "pill" */
  buttonRadius?: number;
  /** % of the icon size */
  iconRadius?: number;
  /** px */
  height?: number;
}

export interface PlaygroundState {
  platform: Platform;
  placement: Placement;
  title: string;
  author: string;
  button: string;
  price: Record<Platform, string>;
  store: Record<Platform, string>;
  appId: Record<Platform, string>;
  daysHidden: number;
  daysReminder: number;
  theme: Theme;
}

export const DEFAULTS: PlaygroundState = {
  platform: "ios",
  placement: "top",
  title: "YouTube",
  author: "Google LLC",
  button: "View",
  price: { ios: "Free", android: "Free" },
  store: { ios: "On the App Store", android: "In Google Play" },
  appId: { ios: "544007664", android: "com.google.android.youtube" },
  daysHidden: 15,
  daysReminder: 90,
  theme: {},
};

/** Must match the defaults in src/style.css. */
export const THEME_DEFAULTS: Record<Platform, Required<Theme>> = {
  ios: {
    bg: "#f2f2f7",
    title: "#000000",
    text: "#6e6e73",
    buttonBg: "#007aff",
    buttonColor: "#ffffff",
    buttonRadius: 20,
    iconRadius: 22,
    height: 80,
  },
  android: {
    bg: "#ffffff",
    title: "#1f1f1f",
    text: "#5f6368",
    buttonBg: "#01875f",
    buttonColor: "#ffffff",
    buttonRadius: 20,
    iconRadius: 20,
    height: 80,
  },
};

export const PRESETS: { name: string; theme: Theme; swatch: string[] }[] = [
  { name: "Native", theme: {}, swatch: ["#f2f2f7", "#007aff"] },
  {
    name: "Dark",
    theme: {
      bg: "#1c1c1e",
      title: "#ffffff",
      text: "#a1a1aa",
      buttonBg: "#0a84ff",
      buttonColor: "#ffffff",
    },
    swatch: ["#1c1c1e", "#0a84ff"],
  },
  {
    name: "Mono",
    theme: {
      bg: "#ffffff",
      title: "#111111",
      text: "#6b7280",
      buttonBg: "#111111",
      buttonColor: "#ffffff",
      buttonRadius: 8,
    },
    swatch: ["#ffffff", "#111111"],
  },
  {
    name: "Grape",
    theme: {
      bg: "#1e1b4b",
      title: "#ffffff",
      text: "#c7d2fe",
      buttonBg: "#a78bfa",
      buttonColor: "#1e1b4b",
      iconRadius: 50,
    },
    swatch: ["#1e1b4b", "#a78bfa"],
  },
  {
    name: "Sunset",
    theme: {
      bg: "#fff7ed",
      title: "#7c2d12",
      text: "#9a3412",
      buttonBg: "#ea580c",
      buttonColor: "#ffffff",
      buttonRadius: 12,
    },
    swatch: ["#fff7ed", "#ea580c"],
  },
];

const THEME_VARS: Record<keyof Theme, string> = {
  bg: "--smartbanner-bg",
  title: "--smartbanner-title-color",
  text: "--smartbanner-text-color",
  buttonBg: "--smartbanner-button-bg",
  buttonColor: "--smartbanner-button-color",
  buttonRadius: "--smartbanner-button-radius",
  iconRadius: "--smartbanner-icon-radius",
  height: "--smartbanner-height",
};

const themeValue = (key: keyof Theme, value: string | number): string => {
  if (key === "buttonRadius") return value === 20 ? "999px" : `${value}px`;
  if (key === "iconRadius") return `${value}%`;
  if (key === "height") return `${value}px`;
  return String(value);
};

/** CSS variables for the theme overrides that are actually set. */
export const themeToVars = (theme: Theme): [string, string][] =>
  (Object.keys(THEME_VARS) as (keyof Theme)[])
    .filter((key) => theme[key] !== undefined)
    .map((key) => [
      THEME_VARS[key],
      themeValue(key, theme[key] as string | number),
    ]);

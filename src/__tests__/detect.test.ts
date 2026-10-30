import { describe, expect, it } from "vitest";
import { detectDevice, resolvePlatform } from "../detect";

const UA = {
  iphoneSafari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
  iphoneChrome:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1",
  iphoneEdge:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/122.0.2365.86 Mobile/15E148 Safari/605.1.15",
  iphoneInstagram:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 321.0.2.19.107",
  ipadDesktop:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  android:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
  desktopChrome:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
};

describe("detectDevice", () => {
  it("detects iOS Safari", () => {
    expect(detectDevice(UA.iphoneSafari)).toEqual({
      os: "ios",
      osVersion: 17,
      isSafari: true,
    });
  });

  it("treats other iOS browsers and in-app views as non-Safari", () => {
    expect(detectDevice(UA.iphoneChrome).isSafari).toBe(false);
    expect(detectDevice(UA.iphoneEdge).isSafari).toBe(false);
    expect(detectDevice(UA.iphoneInstagram).isSafari).toBe(false);
  });

  it("detects iPadOS in desktop mode by touch points", () => {
    expect(detectDevice(UA.ipadDesktop, 5).os).toBe("ios");
    expect(detectDevice(UA.ipadDesktop, 0).os).toBeUndefined();
  });

  it("detects Android", () => {
    expect(detectDevice(UA.android)).toEqual({
      os: "android",
      osVersion: 14,
      isSafari: false,
    });
  });

  it("ignores desktop", () => {
    expect(detectDevice(UA.desktopChrome).os).toBeUndefined();
    expect(detectDevice("").os).toBeUndefined();
  });
});

describe("resolvePlatform", () => {
  it("skips iOS Safari because it has a native banner", () => {
    expect(resolvePlatform(detectDevice(UA.iphoneSafari))).toBeUndefined();
    expect(resolvePlatform(detectDevice(UA.iphoneSafari), true)).toBe("ios");
  });

  it("shows on other iOS browsers and Android", () => {
    expect(resolvePlatform(detectDevice(UA.iphoneChrome))).toBe("ios");
    expect(resolvePlatform(detectDevice(UA.android))).toBe("android");
    expect(resolvePlatform(detectDevice(UA.desktopChrome))).toBeUndefined();
  });
});

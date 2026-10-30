import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSmartBanner } from "../index";
import type { SmartBannerOptions, SmartBannerState } from "../types";
import { cookie, resetSmartBanner } from "../utils";
import { mockUserAgent, restoreNavigator, UA } from "./test-utils";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
let states: SmartBannerState[];

function Harness({ options }: { options: SmartBannerOptions }) {
  states.push(useSmartBanner(options));
  return null;
}

const mount = async (options: SmartBannerOptions) => {
  await act(async () => {
    root.render(<Harness options={options} />);
  });
};

const latest = () => states[states.length - 1];

beforeEach(() => {
  resetSmartBanner();
  states = [];
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  restoreNavigator();
});

describe("useSmartBanner()", () => {
  it("is hidden on the first render, so SSR and hydration match", async () => {
    await mount({ force: "ios", appId: { ios: "1" } });

    expect(states[0].visible).toBe(false);
    expect(states[0].platform).toBeUndefined();
    expect(latest().visible).toBe(true);
  });

  it("returns everything needed for a custom banner", async () => {
    await mount({
      force: "ios",
      appId: { ios: "544007664" },
      icon: "/icon.png",
      storeLang: "gb",
      translations: { button: "Open", price_ios: "GET" },
    });

    expect(latest()).toMatchObject({
      visible: true,
      platform: "ios",
      appId: "544007664",
      link: "https://apps.apple.com/gb/app/id544007664",
      icon: "/icon.png",
      description: "GET - On the App Store",
    });
    expect(latest().t).toMatchObject({
      button: "Open",
      price_ios: "GET",
      store_ios: "On the App Store",
      close: "close",
    });
  });

  it("close() hides it, remembers it and calls onClose", async () => {
    const onClose = vi.fn();
    await mount({ force: "android", appId: { android: "x" }, onClose });

    await act(async () => latest().close());

    expect(latest().visible).toBe(false);
    expect(onClose).toHaveBeenCalledWith("android");
    expect(cookie.closed.get()).toBe("true");
    expect(cookie.installed.get()).toBeUndefined();
  });

  it("install() hides it, remembers it and calls onInstall", async () => {
    const onInstall = vi.fn();
    await mount({ force: "ios", appId: { ios: "1" }, onInstall });

    await act(async () => latest().install());

    expect(latest().visible).toBe(false);
    expect(onInstall).toHaveBeenCalledWith("ios");
    expect(cookie.installed.get()).toBe("true");
  });

  it("detects the platform from the user agent", async () => {
    mockUserAgent(UA.android);
    await mount({ appId: { android: "com.example" } });

    expect(latest().platform).toBe("android");
    expect(latest().link).toBe(
      "https://play.google.com/store/apps/details?id=com.example",
    );
  });

  it("stays hidden on desktop and does nothing on close()", async () => {
    const onClose = vi.fn();
    await mount({ appId: { ios: "1", android: "x" }, onClose });

    expect(latest().visible).toBe(false);
    expect(latest().platform).toBeUndefined();
    expect(latest().link).toBe("#");

    await act(async () => latest().close());
    expect(onClose).not.toHaveBeenCalled();
    expect(cookie.closed.get()).toBeUndefined();
  });
});

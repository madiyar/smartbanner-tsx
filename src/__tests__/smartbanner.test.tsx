import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SmartBanner } from "../index";
import type { SmartBannerProps } from "../types";
import { resetSmartBanner } from "../utils";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

const render = async (props: SmartBannerProps) => {
  await act(async () => {
    root.render(<SmartBanner {...props} />);
  });
};

const banner = () => document.querySelector(".smartbanner");
const html = () => document.documentElement.classList;

beforeEach(() => {
  resetSmartBanner();
  document.head.innerHTML = "";
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

describe("<SmartBanner />", () => {
  it("does not render on desktop", async () => {
    await render({ appId: { ios: "1" } });
    expect(banner()).toBeNull();
  });

  it("renders when forced and an app id is given", async () => {
    await render({
      force: "ios",
      title: "YouTube",
      author: "Google",
      appId: { ios: "544007664" },
      storeLang: "gb",
    });

    expect(banner()?.className).toContain("smartbanner-ios");
    expect(banner()?.textContent).toContain("YouTube");
    expect(banner()?.textContent).toContain("Free - On the App Store");
    expect(
      document.querySelector(".smartbanner-button")?.getAttribute("href"),
    ).toBe("https://apps.apple.com/gb/app/id544007664");
    expect(html().contains("smartbanner-show")).toBe(true);
    expect(html().contains("smartbanner-margin-top")).toBe(true);
  });

  it("reads the app id from meta tags", async () => {
    document.head.innerHTML =
      '<meta name="google-play-app" content="app-id=com.example.app" />';
    await render({ force: "android" });

    expect(
      document.querySelector(".smartbanner-button")?.getAttribute("href"),
    ).toBe("https://play.google.com/store/apps/details?id=com.example.app");
  });

  it("does not render without an app id, even with a custom url (like v1)", async () => {
    await render({ force: "android" });
    expect(banner()).toBeNull();

    await render({ force: "android", url: { android: "https://example.com" } });
    expect(banner()).toBeNull();
  });

  it("uses a custom url when an app id exists", async () => {
    await render({
      force: "android",
      appId: { android: "x" },
      url: { android: "https://example.com/app" },
    });
    expect(
      document.querySelector(".smartbanner-button")?.getAttribute("href"),
    ).toBe("https://example.com/app");
  });

  it("renders an <aside> landmark named after the app", async () => {
    await render({ force: "ios", appId: { ios: "1" }, title: "My App" });

    const root = banner();
    expect(root?.tagName).toBe("ASIDE");
    expect(root?.getAttribute("aria-label")).toBe("My App");
  });

  it("keeps the v1 markup", async () => {
    await render({ force: "ios", appId: { ios: "1" }, icon: "/icon.png" });

    const root = banner();
    expect(
      root
        ?.querySelector("button.smartbanner-close")
        ?.getAttribute("aria-label"),
    ).toBe("close");
    expect(root?.querySelector("span.smartbanner-icon")).not.toBeNull();
    expect(root?.querySelector(".smartbanner-author")).not.toBeNull();
    expect(root?.querySelector(".smartbanner-info")?.children.length).toBe(3);
    expect(
      root?.querySelector(".smartbanner-button .smartbanner-button-text"),
    ).not.toBeNull();
  });

  it("closes, stores a cookie and calls onClose", async () => {
    const onClose = vi.fn();
    await render({ force: "android", appId: { android: "x" }, onClose });

    await act(async () => {
      (document.querySelector(".smartbanner-close") as HTMLElement).click();
    });

    expect(banner()).toBeNull();
    expect(onClose).toHaveBeenCalledWith("android");
    expect(document.cookie).toContain("smartbanner-closed=true");
    expect(html().contains("smartbanner-show")).toBe(false);
  });

  it("stays hidden after being closed", async () => {
    // biome-ignore lint/suspicious/noDocumentCookie: the library itself uses document.cookie.
    document.cookie = "smartbanner-closed=true; path=/";
    await render({ force: "ios", appId: { ios: "1" } });
    expect(banner()).toBeNull();
  });

  it("removes html classes on unmount and placement change", async () => {
    await render({ force: "ios", appId: { ios: "1" }, placement: "bottom" });
    expect(html().contains("smartbanner-margin-bottom")).toBe(true);

    await render({ force: "ios", appId: { ios: "1" }, placement: "top" });
    expect(html().contains("smartbanner-margin-bottom")).toBe(false);
    expect(html().contains("smartbanner-margin-top")).toBe(true);

    await render({
      force: "ios",
      appId: { ios: "1" },
      disableHtmlMargin: true,
    });
    expect(html().contains("smartbanner-margin-top")).toBe(false);

    await act(async () => root.unmount());
    expect(html().contains("smartbanner-show")).toBe(false);
    root = createRoot(container);
  });

  it("blocks javascript: urls", async () => {
    await render({
      force: "ios",
      appId: { ios: "1" },
      url: { ios: "javascript:alert(1)" },
    });
    expect(
      document.querySelector(".smartbanner-button")?.getAttribute("href"),
    ).toBe("#");
  });

  it("escapes the icon url inside CSS", async () => {
    await render({
      force: "ios",
      appId: { ios: "1" },
      icon: '/a.png") ; background: red; ("',
      withPortal: false,
    });
    const style = (container.querySelector(".smartbanner-icon") as HTMLElement)
      .style;
    expect(style.background).not.toContain("red");
  });

  it("uses the icon prop and custom translations", async () => {
    await render({
      force: "ios",
      appId: { ios: "1" },
      icon: "/icon.png",
      translations: { button: "Open", close: "Dismiss" },
      withPortal: false,
    });

    expect(container.querySelector(".smartbanner")).not.toBeNull();
    expect(
      (container.querySelector(".smartbanner-icon") as HTMLElement).style
        .backgroundImage,
    ).toContain("/icon.png");
    expect(container.textContent).toContain("Open");
    expect(
      container.querySelector(".smartbanner-close")?.getAttribute("aria-label"),
    ).toBe("Dismiss");
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  is_client,
  default_meta,
  default_translations,
  defaultStoreLang,
  iconsRels,
  isStandalone,
  cookie,
} from "./utils";

describe("utils", () => {
  describe("is_client", () => {
    it("should be true in browser environment", () => {
      expect(is_client).toBe(true);
    });
  });

  describe("default_meta", () => {
    it("should have correct meta tag names", () => {
      expect(default_meta).toEqual({
        ios: "apple-itunes-app",
        android: "google-play-app",
      });
    });
  });

  describe("default_translations", () => {
    it("should have correct default translations", () => {
      expect(default_translations).toEqual({
        button: "View",
        price_ios: "Free",
        price_android: "Free",
        store_ios: "On the App Store",
        store_android: "In Google Play",
      });
    });
  });

  describe("defaultStoreLang", () => {
    const originalLanguage = navigator.language;

    afterEach(() => {
      Object.defineProperty(navigator, "language", {
        value: originalLanguage,
        writable: true,
      });
    });

    it('should return "us" for simple language code', () => {
      Object.defineProperty(navigator, "language", {
        value: "en",
        writable: true,
      });
      expect(defaultStoreLang()).toBe("us");
    });

    it("should return country code for language with region", () => {
      Object.defineProperty(navigator, "language", {
        value: "en-US",
        writable: true,
      });
      expect(defaultStoreLang()).toBe("us");
    });

    it("should return lowercase country code", () => {
      Object.defineProperty(navigator, "language", {
        value: "en-GB",
        writable: true,
      });
      expect(defaultStoreLang()).toBe("gb");
    });
  });

  describe("iconsRels", () => {
    it("should have correct icon relations for iOS", () => {
      expect(iconsRels.ios).toEqual([
        "apple-touch-icon",
        "apple-touch-icon-precomposed",
      ]);
    });

    it("should have correct icon relations for Android", () => {
      expect(iconsRels.android).toEqual([
        "android-touch-icon",
        "apple-touch-icon",
        "apple-touch-icon-precomposed",
      ]);
    });
  });

  describe("isStandalone", () => {
    const originalNavigator = navigator;
    const originalMatchMedia =
      typeof window !== "undefined" ? window.matchMedia : null;

    beforeEach(() => {
      // Mock navigator.standalone
      Object.defineProperty(navigator, "standalone", {
        value: false,
        writable: true,
      });

      // Mock window.matchMedia only if window exists
      if (typeof window !== "undefined") {
        window.matchMedia = vi.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }));
      }
    });

    afterEach(() => {
      Object.defineProperty(window, "navigator", {
        value: originalNavigator,
        writable: true,
      });
      if (typeof window !== "undefined" && originalMatchMedia) {
        window.matchMedia = originalMatchMedia;
      }
    });

    it("should return false when not standalone", () => {
      expect(isStandalone()).toBe(false);
    });

    it("should return true when navigator.standalone is true", () => {
      Object.defineProperty(navigator, "standalone", {
        value: true,
        writable: true,
      });
      expect(isStandalone()).toBe(true);
    });

    it("should return true when matchMedia matches standalone", () => {
      if (typeof window !== "undefined") {
        window.matchMedia = vi.fn().mockImplementation((query) => ({
          matches: query === "(display-mode: standalone)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }));
        expect(isStandalone()).toBe(true);
      }
    });
  });

  describe("cookie", () => {
    beforeEach(() => {
      // Clear all cookies before each test
      for (const cookie of document.cookie.split(";")) {
        const [name] = cookie.split("=");
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });

    it("should have closed cookie manager", () => {
      expect(cookie.closed).toBeDefined();
      expect(typeof cookie.closed.get).toBe("function");
      expect(typeof cookie.closed.set).toBe("function");
    });

    it("should have installed cookie manager", () => {
      expect(cookie.installed).toBeDefined();
      expect(typeof cookie.installed.get).toBe("function");
      expect(typeof cookie.installed.set).toBe("function");
    });

    it("should set and get closed cookie", () => {
      cookie.closed.set(15);
      expect(cookie.closed.get()).toBe("true");
    });

    it("should set and get installed cookie", () => {
      cookie.installed.set(90);
      expect(cookie.installed.get()).toBe("true");
    });
  });
});

/** Real user agents used to check detection end to end. */
export const UA = {
  iphoneSafari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
  iphoneChrome:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1",
  android:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
};

const original = {
  userAgent: Object.getOwnPropertyDescriptor(window.navigator, "userAgent"),
  standalone: Object.getOwnPropertyDescriptor(window.navigator, "standalone"),
};

/** Pretends to be a given browser until `restoreNavigator()`. */
export function mockUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    value: userAgent,
    configurable: true,
  });
}

/** Pretends the site runs as an installed iOS web app. */
export function mockStandalone(standalone: boolean) {
  Object.defineProperty(window.navigator, "standalone", {
    value: standalone,
    configurable: true,
  });
}

export function restoreNavigator() {
  for (const key of ["userAgent", "standalone"] as const) {
    const descriptor = original[key];
    if (descriptor) {
      Object.defineProperty(window.navigator, key, descriptor);
    } else {
      delete (window.navigator as unknown as Record<string, unknown>)[key];
    }
  }
}

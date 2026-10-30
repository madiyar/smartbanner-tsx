import React from "react";
import { detectDevice, resolvePlatform } from "./detect";
import type {
  Platform,
  SmartBannerOptions,
  SmartBannerState,
  Translations,
} from "./types";
import {
  buildStoreLink,
  cookie,
  default_meta,
  default_translations,
  defaultStoreLang,
  isStandalone,
  readIconUrl,
  readMetaAppId,
  safeUrl,
} from "./utils";

interface Environment {
  detected?: Platform;
  /** Installed as PWA, or the user already closed / clicked the banner. */
  blocked: boolean;
}

/**
 * Headless smart banner: all the logic (device detection, app ID, store link, cookies)
 * without any markup. Use it to render a fully custom banner.
 *
 * @example
 * ```tsx
 * const banner = useSmartBanner({ appId: { ios: "544007664" } });
 * if (!banner.visible) return null;
 * return <a href={banner.link} onClick={banner.install}>{banner.t.button}</a>;
 * ```
 */
export function useSmartBanner(
  options: SmartBannerOptions = {},
): SmartBannerState {
  const {
    daysHidden = 15,
    daysReminder = 90,
    force,
    storeLang,
    appId: appIdProp,
    meta,
    url,
    icon: iconProp,
    translations,
    ignoreIosVersion = false,
    onShow,
    onClose,
    onInstall,
  } = options;

  // Everything that touches `window` is read after mount, so SSR and hydration match.
  const [env, setEnv] = React.useState<Environment | null>(null);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const device = detectDevice(
      window.navigator.userAgent,
      window.navigator.maxTouchPoints,
    );

    setEnv({
      detected: resolvePlatform(device, ignoreIosVersion),
      blocked:
        isStandalone() || !!(cookie.closed.get() || cookie.installed.get()),
    });
  }, [ignoreIosVersion]);

  const platform = env ? force || env.detected : undefined;

  const metaName = platform ? meta?.[platform] || default_meta[platform] : "";
  const appIdOverride = platform ? appIdProp?.[platform] : undefined;
  const appId = React.useMemo(
    () => (platform ? appIdOverride || readMetaAppId(metaName) : ""),
    [platform, appIdOverride, metaName],
  );

  const icon = React.useMemo(
    () => (platform ? iconProp || readIconUrl(platform) : ""),
    [platform, iconProp],
  );

  const customUrl = platform ? url?.[platform] : undefined;
  const lang = storeLang || (env ? defaultStoreLang() : "us");
  const link = platform
    ? safeUrl(customUrl || buildStoreLink(platform, appId, lang))
    : "#";

  const t: Translations = { ...default_translations, ...translations };

  const description = platform
    ? [t[`price_${platform}`]?.trim(), t[`store_${platform}`]?.trim()]
        .filter(Boolean)
        .join(" - ")
    : "";

  // Like v1: without an app ID (prop or meta tag) the banner stays hidden.
  const visible = !!env && !!platform && !env.blocked && !dismissed && !!appId;

  // Keep the latest callbacks without re-running effects on every render.
  const callbacks = React.useRef({ onShow, onClose, onInstall });
  callbacks.current = { onShow, onClose, onInstall };

  React.useEffect(() => {
    if (visible && platform) callbacks.current.onShow?.(platform);
  }, [visible, platform]);

  const close = React.useCallback(() => {
    if (!platform) return;
    setDismissed(true);
    cookie.closed.set(daysHidden);
    callbacks.current.onClose?.(platform);
  }, [platform, daysHidden]);

  const install = React.useCallback(() => {
    if (!platform) return;
    setDismissed(true);
    cookie.installed.set(daysReminder);
    callbacks.current.onInstall?.(platform);
  }, [platform, daysReminder]);

  return {
    visible,
    platform,
    appId,
    link,
    icon,
    description,
    t,
    close,
    install,
  };
}

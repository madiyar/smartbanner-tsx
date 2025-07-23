import React from "react";
import { createPortal } from "react-dom";
import { useUserAgent } from "./use-useragent";
import {
  cookie,
  default_meta,
  default_translations,
  defaultStoreLang,
  html,
  iconsRels,
  is_client,
  isStandalone,
} from "./utils";
import type { Platform, SmartBannerProps } from "./types";

enum ClassNames {
  SHOW = "smartbanner-show",
  TOP = "smartbanner-margin-top",
  BOTTOM = "smartbanner-margin-bottom",
}

export const SmartBanner: React.FC<SmartBannerProps> = ({
  daysHidden = 15,
  daysReminder = 90,
  force,
  placement = "top",
  meta = default_meta,
  storeLang = defaultStoreLang(),
  url = { ios: "", android: "" },
  title = "",
  author = "",
  translations = default_translations,
  ignoreIosVersion = false,
  onClose,
  onInstall,
  disableHtmlMargin = false,
  withPortal = true,
  portalTargetId,
  target,
  className = "",
}) => {
  const agent = useUserAgent();
  const t = React.useMemo(
    () => ({ ...default_translations, ...translations }),
    [translations],
  );
  const [isShow, setIsShow] = React.useState(false);

  const device = React.useMemo<Platform | undefined>(() => {
    if (!is_client) return;

    if (force) {
      return force;
    }

    if (agent?.os?.name === "Android") {
      return "android";
    }

    if (
      agent?.os?.name === "iOS" &&
      (ignoreIosVersion ||
        Number.parseInt(agent?.os?.version ?? "0", 10) < 6 ||
        agent?.browser?.name !== "Mobile Safari")
    ) {
      return "ios";
    }

    return undefined;
  }, [force, ignoreIosVersion, agent]);

  const appID = React.useMemo(() => {
    if (!is_client || !device) {
      return "";
    }

    const metaTag = window.document.querySelector(
      `meta[name="${meta[device]}"]`,
    );

    if (!metaTag) {
      return "";
    }

    const content = /app-id=([^\s,]+)/.exec(
      metaTag.getAttribute("content") || "",
    );

    return content?.[1] || "";
  }, [device, meta]);

  React.useEffect(() => {
    if (!html) return;

    if (!disableHtmlMargin) {
      html.classList.toggle(ClassNames.TOP, placement === "top");
      html.classList.toggle(ClassNames.BOTTOM, placement === "bottom");
    }

    // return () => {
    //   if (!html) return;

    //   html.classList.remove(
    //     ClassNames.SHOW,
    //     ClassNames.TOP,
    //     ClassNames.BOTTOM
    //   );
    // }
  }, [placement, disableHtmlMargin]);

  const handleShow = React.useCallback((show: boolean) => {
    if (html) {
      setIsShow(show);
      html.classList.toggle(ClassNames.SHOW, show);
    }
  }, []);

  React.useEffect(() => {
    // ssr || not ios or android || no app id in meta
    if (!is_client || !device || !appID) {
      handleShow(false);
      return;
    }

    // is pwa
    if (isStandalone()) {
      handleShow(false);
      return;
    }

    // user dismissed banner or installed app
    handleShow(!(cookie.closed.get() || cookie.installed.get()));
  }, [device, appID, handleShow]);

  const handleClose = React.useCallback(() => {
    handleShow(false);
    cookie.closed.set(daysHidden);
    onClose?.();
  }, [daysHidden, onClose, handleShow]);

  const handleInstall = React.useCallback(() => {
    handleShow(false);
    cookie.installed.set(daysReminder);
    onInstall?.();
  }, [daysReminder, onInstall, handleShow]);

  const iconUrl = React.useMemo(() => {
    if (!is_client || !device || !iconsRels[device]?.length) return "";

    for (const rel of iconsRels[device]) {
      const element = window.document.querySelector(`link[rel="${rel}"]`);

      if (element?.getAttribute("href")) {
        return element.getAttribute("href");
      }
    }

    return "";
  }, [device]);

  const link = React.useMemo(() => {
    if (!device) return "#";

    if (!appID) return url[device] || "#";

    if (device === "ios") {
      return (
        url.ios ||
        `https://itunes.apple.com/${storeLang || "us"}/app/id${appID}`
      );
    }

    if (device === "android") {
      return (
        url.android || `http://play.google.com/store/apps/details?id=${appID}`
      );
    }

    return "#";
  }, [device, appID, storeLang, url]);

  const description = React.useMemo(() => {
    if (!device) {
      return "";
    }

    const priceText = t[`price_${device}`]?.trim();
    const storeText = t[`store_${device}`]?.trim();

    if (priceText && storeText) {
      return `${priceText} - ${storeText}`;
    }

    return priceText || storeText || "";
  }, [device, t]);

  if (!isShow) {
    return null;
  }

  const content = (
    <div
      className={`smartbanner smartbanner-${device} smartbanner-${placement} ${className}`}
    >
      <div className="smartbanner-container">
        <button
          type="button"
          className="smartbanner-close"
          aria-label="close"
          onClick={handleClose}
        >
          &times;
        </button>
        <span
          className="smartbanner-icon"
          style={{ backgroundImage: `url(${iconUrl})` }}
        />
        <div className="smartbanner-info">
          <div className="smartbanner-title">{title}</div>
          <div className="smartbanner-author">{author}</div>
          <div className="smartbanner-description">{description}</div>
        </div>
        <div className="smartbanner-wrapper">
          <a
            href={link}
            target={target || "_blank"}
            rel="noopener noreferrer"
            onClick={handleInstall}
            className="smartbanner-button"
          >
            <span className="smartbanner-button-text">{t.button}</span>
          </a>
        </div>
      </div>
    </div>
  );

  if (withPortal) {
    const container = portalTargetId
      ? document.getElementById(portalTargetId)
      : null;
    return createPortal(content, container || document.body);
  }

  return content;
};

export default React.memo(SmartBanner);

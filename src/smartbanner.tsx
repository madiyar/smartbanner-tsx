import React from "react";
import { createPortal } from "react-dom";
import type { SmartBannerProps } from "./types";
import { useSmartBanner } from "./use-smartbanner";

enum ClassNames {
  SHOW = "smartbanner-show",
  TOP = "smartbanner-margin-top",
  BOTTOM = "smartbanner-margin-bottom",
}

/** `url("...")` with the value escaped, so a URL can't break out of the CSS. */
const cssUrl = (value: string) =>
  `url("${value.replace(/["\\\n\r]/g, (char) => `\\${char.charCodeAt(0).toString(16)} `)}")`;

// Several banners may share `<html>`; a class is removed only when no banner needs it.
const classUsers = new Map<string, number>();

/** Adds the `<html>` classes while the banner is visible and removes them afterwards. */
function useHtmlClasses(
  visible: boolean,
  placement: "top" | "bottom",
  withMargin: boolean,
) {
  React.useEffect(() => {
    if (!visible) return;

    const html = document.documentElement;
    const classes: string[] = [ClassNames.SHOW];
    if (withMargin) {
      classes.push(placement === "top" ? ClassNames.TOP : ClassNames.BOTTOM);
    }

    for (const name of classes) {
      classUsers.set(name, (classUsers.get(name) ?? 0) + 1);
      html.classList.add(name);
    }

    return () => {
      for (const name of classes) {
        const users = (classUsers.get(name) ?? 1) - 1;
        classUsers.set(name, users);
        if (users <= 0) html.classList.remove(name);
      }
    };
  }, [visible, placement, withMargin]);
}

export const SmartBanner: React.FC<SmartBannerProps> = ({
  placement = "top",
  disableHtmlMargin = false,
  withPortal = true,
  portalTargetId,
  className,
  style,
  target = "_blank",
  title = "",
  author = "",
  ...options
}) => {
  const { visible, platform, link, icon, description, t, close, install } =
    useSmartBanner(options);

  useHtmlClasses(visible, placement, !disableHtmlMargin);

  if (!visible || !platform) {
    return null;
  }

  const classes = [
    "smartbanner",
    `smartbanner-${platform}`,
    `smartbanner-${placement}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <div
      className={classes}
      style={style}
      role="complementary"
      aria-label={title || undefined}
    >
      <div className="smartbanner-container">
        <button
          type="button"
          className="smartbanner-close"
          aria-label={t.close}
          onClick={close}
        >
          &times;
        </button>
        {/* Same markup as v1, so custom CSS keeps working. */}
        <span
          className="smartbanner-icon"
          style={icon ? { backgroundImage: cssUrl(icon) } : undefined}
        />
        <div className="smartbanner-info">
          <div className="smartbanner-title">{title}</div>
          <div className="smartbanner-author">{author}</div>
          <div className="smartbanner-description">{description}</div>
        </div>
        <div className="smartbanner-wrapper">
          <a
            href={link}
            target={target}
            rel="noopener noreferrer"
            onClick={install}
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

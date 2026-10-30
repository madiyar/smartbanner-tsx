import type React from "react";
import type { Platform } from "smartbanner-tsx";
import type { Placement } from "../lib/state";

/** A phone mock with a fake website. The banner renders inside `.phone-viewport`. */
export function Phone({
  platform,
  placement,
  bannerHeight,
  bannerVisible,
  children,
  overlay,
}: {
  platform: Platform;
  placement: Placement;
  bannerHeight: number;
  bannerVisible: boolean;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}) {
  const offset = bannerVisible ? bannerHeight : 0;

  return (
    <div className={`phone phone-${platform}`}>
      <div className="phone-screen">
        <div className="phone-status" aria-hidden="true">
          <span>9:41</span>
          <span className="phone-notch" />
          <span className="phone-status-icons">
            <i />
            <i />
            <i />
          </span>
        </div>

        {platform === "android" && <AddressBar />}

        <div className="phone-viewport">
          {children}
          <div
            className="site"
            style={{
              paddingTop: placement === "top" ? offset : 0,
              paddingBottom: placement === "bottom" ? offset : 0,
            }}
            aria-hidden="true"
          >
            <div className="site-nav">
              <span className="site-logo" />
              <span className="site-burger" />
            </div>
            <div className="site-hero" />
            <span className="sk sk-title" />
            <span className="sk" />
            <span className="sk sk-short" />
            <div className="site-grid">
              <span />
              <span />
            </div>
            <span className="sk" />
            <span className="sk sk-short" />
          </div>
          {overlay}
        </div>

        {platform === "ios" && <AddressBar />}
        <div className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}

function AddressBar() {
  return (
    <div className="phone-address" aria-hidden="true">
      <span className="phone-address-pill">
        <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V7a3 3 0 0 0-6 0v3Z"
          />
        </svg>
        your-website.com
      </span>
    </div>
  );
}

import React from "react";
import {
  type Platform,
  SmartBanner,
  type SmartBannerProps,
  resetSmartBanner,
} from "smartbanner-tsx";
import iconUrl from "../icon.webp";
import { generateCss, generateTsx } from "../lib/generate";
import {
  DEFAULTS,
  type PlaygroundState,
  PRESETS,
  THEME_DEFAULTS,
  type Theme,
  themeToVars,
} from "../lib/state";
import { Phone } from "./phone";
import {
  CodeBlock,
  ColorField,
  Field,
  Icon,
  NumberInput,
  Range,
  Segmented,
  TextInput,
} from "./ui";

type Status = "visible" | "closed" | "installed";
type PanelTab = "Content" | "Theme" | "Behavior";

interface LogEntry {
  id: number;
  name: "onShow" | "onClose" | "onInstall";
  platform: Platform;
  time: string;
}

const COLOR_FIELDS: { key: keyof Theme; label: string }[] = [
  { key: "bg", label: "Background" },
  { key: "title", label: "Title" },
  { key: "text", label: "Text" },
  { key: "buttonBg", label: "Button" },
  { key: "buttonColor", label: "Button text" },
];

export function Playground() {
  // Start every visit with a visible banner, even if it was closed before.
  React.useState(() => resetSmartBanner());

  const [state, setState] = React.useState<PlaygroundState>(DEFAULTS);
  const [tab, setTab] = React.useState<PanelTab>("Content");
  const [codeTab, setCodeTab] = React.useState("App.tsx");
  const [status, setStatus] = React.useState<Status>("visible");
  const [bannerKey, setBannerKey] = React.useState(0);
  const [log, setLog] = React.useState<LogEntry[]>([]);

  const { platform, placement, theme } = state;
  const themeDefaults = THEME_DEFAULTS[platform];

  const showAgain = React.useCallback(() => {
    resetSmartBanner();
    setStatus("visible");
    setBannerKey((key) => key + 1);
  }, []);

  const update = (patch: Partial<PlaygroundState>) => {
    setState((prev) => ({ ...prev, ...patch }));
    // Any change brings the banner back, so you always see the result.
    if (status !== "visible") showAgain();
  };

  const updateTheme = (patch: Theme) =>
    update({ theme: { ...state.theme, ...patch } });

  const addLog = React.useCallback((name: LogEntry["name"], p: Platform) => {
    setLog((prev) => {
      const last = prev[0];
      // React StrictMode runs effects twice in dev; skip the duplicate.
      if (last && last.name === name && Date.now() - last.id < 300) {
        return prev;
      }
      const entry: LogEntry = {
        id: Date.now(),
        name,
        platform: p,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      return [entry, ...prev].slice(0, 4);
    });
  }, []);

  const style: SmartBannerProps["style"] = Object.fromEntries(
    themeToVars(theme),
  );
  const bannerHeight = theme.height ?? themeDefaults.height;

  const tsx = generateTsx(state);
  const css = generateCss(state);

  return (
    <div className="playground">
      <div className="pg-preview">
        <Phone
          platform={platform}
          placement={placement}
          bannerHeight={bannerHeight}
          bannerVisible={status === "visible"}
          overlay={
            status !== "visible" && (
              <div className="phone-overlay">
                <div className="phone-overlay-card">
                  <p className="phone-overlay-title">
                    {status === "closed"
                      ? "Banner closed"
                      : "Store link opened"}
                  </p>
                  <p className="phone-overlay-text">
                    Hidden for{" "}
                    <b>
                      {status === "closed"
                        ? state.daysHidden
                        : state.daysReminder}{" "}
                      days
                    </b>{" "}
                    via the <code>smartbanner-{status}</code> cookie.
                  </p>
                  <button
                    type="button"
                    className="btn btn-brand btn-sm"
                    onClick={showAgain}
                  >
                    <Icon name="refresh" size={15} />
                    Show again
                  </button>
                </div>
              </div>
            )
          }
        >
          <SmartBanner
            key={`${platform}-${bannerKey}`}
            force={platform}
            placement={placement}
            withPortal={false}
            disableHtmlMargin
            title={state.title}
            author={state.author}
            icon={iconUrl}
            appId={state.appId}
            daysHidden={state.daysHidden}
            daysReminder={state.daysReminder}
            translations={{
              button: state.button,
              price_ios: state.price.ios,
              price_android: state.price.android,
              store_ios: state.store.ios,
              store_android: state.store.android,
            }}
            style={style}
            onShow={(p) => addLog("onShow", p)}
            onClose={(p) => {
              setStatus("closed");
              addLog("onClose", p);
            }}
            onInstall={(p) => {
              setStatus("installed");
              addLog("onInstall", p);
            }}
          />
        </Phone>

        <div className="events" aria-live="polite">
          <div className="events-head">
            <span>Events</span>
            {log.length > 0 && (
              <button
                type="button"
                className="link-btn"
                onClick={() => setLog([])}
              >
                Clear
              </button>
            )}
          </div>
          {log.length === 0 ? (
            <p className="events-empty">Close or tap the banner…</p>
          ) : (
            <ul>
              {log.map((entry) => (
                <li key={entry.id}>
                  <span className={`event-dot event-${entry.name}`} />
                  <code>{entry.name}</code>
                  <span className="event-arg">("{entry.platform}")</span>
                  <span className="event-time">{entry.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="pg-panel">
        <div className="pg-quick">
          <div className="pg-quick-item">
            <span className="pg-quick-label">Platform</span>
            <Segmented
              label="Platform"
              value={platform}
              onChange={(value) => update({ platform: value })}
              options={[
                { value: "ios", label: "iOS", icon: "apple" },
                { value: "android", label: "Android", icon: "android" },
              ]}
            />
          </div>
          <div className="pg-quick-item">
            <span className="pg-quick-label">Placement</span>
            <Segmented
              label="Placement"
              value={placement}
              onChange={(value) => update({ placement: value })}
              options={[
                { value: "top", label: "Top", icon: "top" },
                { value: "bottom", label: "Bottom", icon: "bottom" },
              ]}
            />
          </div>
        </div>

        <div className="card">
          <div className="tabs" role="tablist" aria-label="Settings">
            {(["Content", "Theme", "Behavior"] as PanelTab[]).map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={tab === name}
                className="tab"
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {tab === "Content" && (
            <div className="form-grid" role="tabpanel">
              <Field label="Title">
                <TextInput
                  value={state.title}
                  onChange={(title) => update({ title })}
                />
              </Field>
              <Field label="Author">
                <TextInput
                  value={state.author}
                  onChange={(author) => update({ author })}
                />
              </Field>
              <Field
                label="Price"
                hint={platform === "ios" ? "iOS" : "Android"}
              >
                <TextInput
                  value={state.price[platform]}
                  onChange={(value) =>
                    update({ price: { ...state.price, [platform]: value } })
                  }
                />
              </Field>
              <Field
                label="Store text"
                hint={platform === "ios" ? "iOS" : "Android"}
              >
                <TextInput
                  value={state.store[platform]}
                  onChange={(value) =>
                    update({ store: { ...state.store, [platform]: value } })
                  }
                />
              </Field>
              <Field label="Button">
                <TextInput
                  value={state.button}
                  onChange={(button) => update({ button })}
                />
              </Field>
              <Field
                label="App ID"
                hint={platform === "ios" ? "App Store" : "Google Play"}
              >
                <TextInput
                  mono
                  value={state.appId[platform]}
                  onChange={(value) =>
                    update({ appId: { ...state.appId, [platform]: value } })
                  }
                />
              </Field>
            </div>
          )}

          {tab === "Theme" && (
            <div className="theme-panel" role="tabpanel">
              <div className="presets">
                {PRESETS.map((preset) => {
                  const active =
                    JSON.stringify(preset.theme) === JSON.stringify(theme);
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      className={`preset${active ? " is-active" : ""}`}
                      aria-pressed={active}
                      onClick={() => update({ theme: preset.theme })}
                    >
                      <span className="preset-swatch">
                        {preset.swatch.map((color) => (
                          <i key={color} style={{ background: color }} />
                        ))}
                      </span>
                      {preset.name}
                    </button>
                  );
                })}
              </div>

              <div className="colors">
                {COLOR_FIELDS.map(({ key, label }) => (
                  <ColorField
                    key={key}
                    label={label}
                    value={(theme[key] ?? themeDefaults[key]) as string}
                    isDefault={theme[key] === undefined}
                    onChange={(value) => updateTheme({ [key]: value })}
                  />
                ))}
              </div>

              <div className="ranges">
                <Range
                  label="Button radius"
                  min={0}
                  max={20}
                  value={theme.buttonRadius ?? themeDefaults.buttonRadius}
                  format={(v) => (v === 20 ? "pill" : `${v}px`)}
                  onChange={(buttonRadius) => updateTheme({ buttonRadius })}
                />
                <Range
                  label="Icon radius"
                  min={0}
                  max={50}
                  value={theme.iconRadius ?? themeDefaults.iconRadius}
                  format={(v) => `${v}%`}
                  onChange={(iconRadius) => updateTheme({ iconRadius })}
                />
                <Range
                  label="Height"
                  min={64}
                  max={100}
                  value={theme.height ?? themeDefaults.height}
                  format={(v) => `${v}px`}
                  onChange={(height) => updateTheme({ height })}
                />
              </div>
            </div>
          )}

          {tab === "Behavior" && (
            <div className="form-grid" role="tabpanel">
              <Field label="Hide after close" hint="daysHidden">
                <NumberInput
                  value={state.daysHidden}
                  suffix="days"
                  onChange={(daysHidden) => update({ daysHidden })}
                />
              </Field>
              <Field label="Hide after install" hint="daysReminder">
                <NumberInput
                  value={state.daysReminder}
                  suffix="days"
                  onChange={(daysReminder) => update({ daysReminder })}
                />
              </Field>
              <p className="form-note">
                The banner shows on Android and on iOS browsers other than
                Safari (Safari has Apple's native banner). It is hidden in
                installed PWAs and after the user closes it or taps the button.
              </p>
            </div>
          )}
        </div>

        <CodeBlock
          tabs={["App.tsx", "styles.css"]}
          activeTab={codeTab}
          onTab={setCodeTab}
          code={codeTab === "App.tsx" ? tsx : css}
        />
      </div>
    </div>
  );
}

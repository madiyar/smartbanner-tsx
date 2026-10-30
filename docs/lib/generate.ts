import { DEFAULTS, type PlaygroundState, themeToVars } from "./state";

const str = (value: string) => JSON.stringify(value);

/** Builds the `<SmartBanner />` usage for the current playground state. */
export function generateTsx(state: PlaygroundState): string {
  const props: string[] = [];

  props.push(`title=${str(state.title)}`);
  if (state.author) props.push(`author=${str(state.author)}`);

  props.push(
    `appId={{ ios: ${str(state.appId.ios)}, android: ${str(state.appId.android)} }}`,
  );

  if (state.placement !== DEFAULTS.placement) {
    props.push(`placement=${str(state.placement)}`);
  }

  const translations: string[] = [];
  if (state.button !== DEFAULTS.button) {
    translations.push(`button: ${str(state.button)}`);
  }
  for (const platform of ["ios", "android"] as const) {
    if (state.price[platform] !== DEFAULTS.price[platform]) {
      translations.push(`price_${platform}: ${str(state.price[platform])}`);
    }
    if (state.store[platform] !== DEFAULTS.store[platform]) {
      translations.push(`store_${platform}: ${str(state.store[platform])}`);
    }
  }
  if (translations.length) {
    props.push(
      translations.length === 1
        ? `translations={{ ${translations[0]} }}`
        : `translations={{\n${translations.map((t) => `        ${t},`).join("\n")}\n      }}`,
    );
  }

  if (state.daysHidden !== DEFAULTS.daysHidden) {
    props.push(`daysHidden={${state.daysHidden}}`);
  }
  if (state.daysReminder !== DEFAULTS.daysReminder) {
    props.push(`daysReminder={${state.daysReminder}}`);
  }

  return `import { SmartBanner } from "smartbanner-tsx";
import "smartbanner-tsx/style.css";

export function App() {
  return (
    <SmartBanner
${props.map((p) => `      ${p}`).join("\n")}
    />
  );
}`;
}

/** Builds the CSS variables for the current theme. */
export function generateCss(state: PlaygroundState): string {
  const vars = themeToVars(state.theme);

  if (!vars.length) {
    return `/* Default look: no extra CSS needed.
   Pick a preset or change colors in the Theme tab
   to generate CSS variables here. */`;
  }

  return `/* Put it in your global CSS, after the library styles. */
:root {
${vars.map(([name, value]) => `  ${name}: ${value};`).join("\n")}
}`;
}

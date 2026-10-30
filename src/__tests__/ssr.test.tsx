// @vitest-environment node
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SmartBanner, useSmartBanner } from "../index";

let visibleOnServer: boolean | undefined;

function Probe() {
  visibleOnServer = useSmartBanner({
    force: "android",
    appId: { android: "x" },
  }).visible;
  return null;
}

describe("server rendering", () => {
  it("renders nothing and does not touch window", () => {
    expect(typeof window).toBe("undefined");
    expect(
      renderToString(
        <SmartBanner force="ios" title="App" appId={{ ios: "1" }} />,
      ),
    ).toBe("");
  });

  it("the hook reports hidden on the server", () => {
    visibleOnServer = undefined;
    renderToString(<Probe />);
    expect(visibleOnServer).toBe(false);
  });
});

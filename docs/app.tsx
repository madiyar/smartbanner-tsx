import React from "react";
import Cookies from "js-cookie";
import { Icon } from "./icon";
import { SmartBanner } from "../src/index";
import "../src/style.css";

const App = () => {
  const [platform, setPlatform] = React.useState<"ios" | "android">();
  const [placement, setPlacement] = React.useState<"top" | "bottom">("top");

  const handleDeleteCookie = () => {
    setPlatform(undefined);

    Cookies.remove("smartbanner-closed");
    Cookies.remove("smartbanner-installed");
  };

  return (
    <>
      <SmartBanner title="YouTube" placement={placement} force={platform} />
      <section className="container controls">
        <div className="column">
          <p className="text-secondary select-none">Platform</p>
          <button type="button" onClick={() => setPlatform("android")}>
            <Icon icon="android" /> Android
          </button>
          <button type="button" onClick={() => setPlatform("ios")}>
            <Icon icon="ios" /> iOS
          </button>
        </div>

        <div className="column">
          <p className="text-secondary select-none">Placement</p>
          <button type="button" onClick={() => setPlacement("top")}>
            <Icon icon="top" /> Top
          </button>
          <button type="button" onClick={() => setPlacement("bottom")}>
            <Icon icon="bottom" /> Bottom
          </button>
        </div>

        <button
          type="button"
          className="cookie-btn"
          onClick={handleDeleteCookie}
        >
          <Icon icon="delete" /> Delete Cookie
        </button>
      </section>
    </>
  );
};

export default App;

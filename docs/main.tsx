import React from "react";
import ReactDOM from "react-dom/client";
import "smartbanner-tsx/style.css";
import "./styles.css";
import App from "./app";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production build is prerendered (scripts/prerender.mjs), dev is not.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}

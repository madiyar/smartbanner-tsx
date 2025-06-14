import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(<App />);

import React from "react";
import ReactDOM from "react-dom";
// import "./index.scss";
import App from "./App";
import { ThemeProvider } from "@zendeskgarden/react-theming";

ReactDOM.render(
  <ThemeProvider>
    <App rootEl={document.getElementById("root")} />
  </ThemeProvider>,
  document.getElementById("root")
);

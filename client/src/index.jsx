import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import customMuiTheme from "./muiCustomTheme";
import { ThemeProvider } from "@mui/material/styles";
import { ProjectContextProvider } from "./contexts/projectContext";
import { UserContextProvider } from "./contexts/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customMuiTheme}>
      <UserContextProvider>
        <ProjectContextProvider>
          <App />
        </ProjectContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

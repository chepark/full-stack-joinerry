import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import customMuiTheme from "./muiCustomTheme";
import { ThemeProvider } from "@mui/material/styles";
import { ProjectContextProvider } from "./contexts/projectContext";
import { UserContextProvider } from "./contexts/userContext";
import { FilterContextProvider } from "./contexts/filterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customMuiTheme}>
      <UserContextProvider>
        <FilterContextProvider>
          <ProjectContextProvider>
            <App />
          </ProjectContextProvider>
        </FilterContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

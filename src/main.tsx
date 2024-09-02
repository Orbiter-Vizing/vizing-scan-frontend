import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css/normalize.css";
import { ThemeProvider } from "react-jss";

import App from "src/App";
import { theme } from "src/styles/theme";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css/normalize.css";
import { ThemeProvider } from "react-jss";
import { BrowserRouter } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { theme } from "src/styles/theme";
import { App } from "src/views/app.view";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Theme hasBackground={false}>
          <App />
        </Theme>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useAppStyles = createUseStyles((theme: Theme) => ({
  "@global": {
    "*": {
      boxSizing: "border-box",
    },
    body: {
      fontFamily: "Modern Era",
      fontSize: 16,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: theme.palette.black.main,
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
    p: {
      margin: 0,
    },
    h1: {
      margin: 0,
    },
  },
  appHeader: {
    fontSize: 24,
  },
  appIntro: {
    fontSize: 14,
    color: theme.palette.grey.main,
  },
}));

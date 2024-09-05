export const theme = {
  palette: {
    primary: {
      dark: "#040102",
    },
    black: {
      main: "#040102",
      secondary: "#140F0F",
      black03: "#292223",
    },
    white: {
      main: "#ffffff",
      transparency10: "rgba(255, 255, 255, 0.1)",
      transparency12: "rgba(255, 255, 255, 0.12)",
      transparency40: "rgba(255, 255, 255, 0.4)",
      transparency60: "rgba(255, 255, 255, 0.6)",
    },
    green: {
      main: "#86DD45",
      secondary: "rgba(134, 221, 69, 0.2)",
    },
    yellow: {
      main: "#FFCC2D",
      secondary: "rgba(255, 204, 45, 0.2)",
    },
    grey: {
      veryLight: "#e1e1f1",
      light: "#f3f3f8",
      main: "#888baa",
      dark: "#7a7c89",
      dark05: "rgba(122, 124, 137, 0.5)",
      hover: "rgba(122, 124, 137, 0.2)",
    },
  },
};

export type Theme = typeof theme;

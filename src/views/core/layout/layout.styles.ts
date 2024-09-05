import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useLayoutStyles = createUseStyles((theme: Theme) => ({
  layoutWrap: {
    minHeight: "100vh",
    width: "100vw",
    background: theme.palette.primary.dark,
    padding: "0 80px 0",
  },
  layout: {
    position: "relative",
    paddingBottom: 128,
  },
  backgroundPattern: {
    position: "absolute",
    height: 552,
    width: 533,
    left: 104,
    top: -286,
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
  },
}));

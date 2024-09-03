import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useLayoutStyles = createUseStyles((theme: Theme) => ({
  layoutWrap: {
    height: "100vh",
    width: "100vw",
    background: theme.palette.primary.dark,
    padding: "0 80px 0",
  },
  layout: {
    position: "relative",
  },
  backgroundPattern: {
    position: "absolute",
    height: 552,
    width: 533,
    left: 104,
    top: -286,
    zIndex: 0,
  },
}));

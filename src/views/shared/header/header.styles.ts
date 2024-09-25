import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useHeaderStyles = createUseStyles((theme: Theme) => ({
  headerWrap: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    height: 64,
    justifyContent: "space-between",
  },
  logoWrap: {
    "&:hover": {
      cursor: "pointer",
    },
    display: "flex",
    alignItems: "center",
    marginRight: 26,
  },
  headerTab: {
    "&:hover": {
      color: theme.palette.white.main,
      cursor: "pointer",
    },
    display: "inline-flex",
    height: "100%",
    alignItems: "center",
    padding: "0 12px 0",
    color: theme.palette.white.transparency60,
    marginRight: 12,
  },
  selectedTab: {
    color: theme.palette.white.main,
  },
  centerBlock: {
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
  },
  rightBlock: {
    display: "flex",
    alignItems: "center",
  },
  socialIcon: {
    height: 16,
    width: 16,
    marginLeft: 20,
  },
}));

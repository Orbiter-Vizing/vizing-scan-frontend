import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useFooterStyles = createUseStyles((theme: Theme) => ({
  footerWrap: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    height: 64,
    color: theme.palette.white.main,
  },
  socialIconsList: {
    display: "flex",
    alignItems: "center",
  },
  socialIcon: {
    height: 16,
    width: 16,
    marginLeft: 20,
  },
}));

import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useStatusIconStyles = createUseStyles((theme: Theme) => ({
  iconWrap: {
    display: "flex",
    alignItems: "center",
    height: 28,
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 8,
    padding: "0 12px 0 10px",
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 6,
  },
  success: {
    color: theme.palette.green.main,
    background: theme.palette.green.secondary,
  },
  landing: {
    color: theme.palette.yellow.main,
    background: theme.palette.yellow.secondary,
  },
  confirming: {
    // color: theme.palette.blue.main,
    // background: theme.palette.blue.secondary,
    color: theme.palette.yellow.main,
    background: theme.palette.yellow.secondary,
  },
}));

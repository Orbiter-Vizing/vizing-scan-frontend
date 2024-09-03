import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useDataCardStyles = createUseStyles((theme: Theme) => ({
  dataCardWrap: {
    "&:last-child": {
      marginRight: 0,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 96,
    width: "100%",
    border: "1px solid rgba(255,255,255, 0.12)",
    borderRadius: 12,
    marginRight: 10,
    padding: "0 16px 0",
  },
  dataNumber: {
    color: theme.palette.white.main,
    fontSize: 24,
    fontWeight: 500,
  },
  dataName: {
    color: theme.palette.white.transparency60,
    fontSize: 14,
    fontWeight: 400,
  },
}));

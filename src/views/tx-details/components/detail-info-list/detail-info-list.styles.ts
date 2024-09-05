import { createUseStyles } from "react-jss";
import { Theme } from "src/styles/theme";

export const useDetailInfoListStyles = createUseStyles((theme: Theme) => ({
  detailInfoListWrap: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    padding: "0 16px",
    marginBottom: 2,
    background: theme.palette.black.black04,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  rowContent: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.white.main,
  },
  txHash: {
    "&:hover": {
      cursor: "pointer",
    },
    maxWidth: 315,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: "1px solid",
    borderColor: theme.palette.white.main,
  },
  hashInteractionIcon: {
    "&:hover": {
      cursor: "pointer",
    },
    height: 20,
    width: 20,
    marginLeft: 4,
  },
  dappContent: {
    display: "flex",
  },
  dappIcon: {
    marginRight: 4,
  },
}));

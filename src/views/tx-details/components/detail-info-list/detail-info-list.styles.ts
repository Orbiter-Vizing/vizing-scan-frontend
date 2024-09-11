import { createUseStyles } from "react-jss";
import { Theme } from "src/styles/theme";

export const useDetailInfoListStyles = createUseStyles((theme: Theme) => ({
  "@keyframes scale": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
    "100%": { transform: "scale(1)" },
  },
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
    maxWidth: 315,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
  chianIcon: {
    marginRight: 4,
  },
  copyAnimation: {
    animation: "$scale 0.3s linear 1",
  },
  tokenIcon: {
    margin: "0 4px 0",
  },
}));

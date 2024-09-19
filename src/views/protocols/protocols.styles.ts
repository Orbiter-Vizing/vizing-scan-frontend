import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useProtocolsStyles = createUseStyles((theme: Theme) => ({
  protocolsWrap: {},
  tableWrap: {
    marginTop: 12,
    border: "1px solid",
    borderColor: theme.palette.black.black03,
    borderRadius: 4,
  },
  protocolCell: {
    display: "flex",
    alignItems: "center",
  },
  protocolCellIcon: {
    marginRight: 4,
  },
  chainsList: {
    display: "flex",
  },
  chainIcon: {
    marginRight: 2,
  },
  changeRate24h: {
    fontSize: 14,
    fontWeight: 400,
  },
  changeRate7d: {
    fontSize: 14,
    fontWeight: 400,
  },
  dataWrap: {
    color: theme.palette.white.main,
  },
  extraChainsCount: {
    color: theme.palette.white.transparency40,
    fontSize: 12,
    fontWeight: 400,
  },
  ratioWrap: {
    fontSize: 14,
    fontWeight: 400,
  },
  minusRatio: {
    color: theme.palette.red.main,
  },
  plusRatio: {
    color: theme.palette.green.main,
  },
  tipTitle: {
    width: 440,
    fontSize: 20,
    fontWeight: 400,
    color: theme.palette.white.main,
    marginBottom: 4,
  },
  tipContent: {
    width: 440,
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  noDataTip: {
    paddingTop: 72,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 480,
    width: "100%",
  },
  noDataIcon: {
    height: 64,
    width: 64,
    marginBottom: 12,
  },
}));

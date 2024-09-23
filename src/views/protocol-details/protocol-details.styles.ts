import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useProtocolDetailsStyles = createUseStyles((theme: Theme) => ({
  protocolDetailsWrap: {
    color: theme.palette.white.main,
  },
  protocolIntroWrap: {
    display: "flex",
    marginBottom: 32,
  },
  protocolIcon: {
    marginRight: 16,
  },
  protocolInfo: {
    display: "flex",
    flexDirection: "column",
  },
  protocolName: {
    fontSize: 20,
    fontWeight: 500,
    color: theme.palette.white.main,
    margin: "0 20px 0 0",
  },
  protocolIntroText: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  socialMediaIcon: {
    marginRight: 20,
    height: 16,
    width: 16,
  },
  protocolNameWrap: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.white.main,
    height: 28,
    marginBottom: 4,
  },
  chartSection: {
    display: "flex",
    flexDirection: "column",
    height: 560,
    width: "100%",
    border: "1px solid",
    borderColor: theme.palette.white.transparency12,
    borderRadius: 8,
    // background: theme.palette.white.transparency10,
  },
  chartContainerWrap: {
    position: "relative",
    flex: 1,
    paddingTop: 12,
  },
  chartContainer: {
    height: "100%",
    width: "100",
  },
  hiddenClass: {
    visibility: "hidden",
    opacity: 0,
  },
  chartNoDataWrap: {
    position: "absolute",
    height: "100%",
    width: "100%",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "rgba(255, 10,255, 0.1)",
    flex: 1,
    fontSize: 14,
    color: theme.palette.white.transparency40,
  },
  chartLoading: {
    position: "absolute",
    height: "100%",
    width: "100%",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 14,
    color: theme.palette.white.transparency40,
  },
  protocolMessagesList: {
    display: "flex",
    flexDirection: "column",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.white.main,
    marginTop: 32,
  },
  searchRow: {
    display: "flex",
    padding: 16,
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.white.transparency12,
  },
  serachRowItem: {
    display: "flex",
    flexDirection: "column",
    minWidth: 220,
    // marginRight: 72,
  },
  serachRowItemLabel: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  rowItemMessages: {
    minWidth: 150,
  },
  rowItemDate: {
    minWidth: 200,
  },
  rowItemChain: {
    minWidth: 160,
  },
  // table style
  tableWrap: {
    marginTop: 12,
    border: "1px solid",
    borderColor: theme.palette.black.black03,
    borderRadius: 4,
  },
  rowNonceCell: {
    color: theme.palette.white.transparency40,
  },
  hashCell: {
    display: "flex",
  },
  addressCell: {
    "&:hover": {
      borderBottomColor: theme.palette.white.main,
      cursor: "pointer",
    },
    maxWidth: 220,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: "1px solid transparent",
  },
  chianIcon: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
  hashCellContent: {
    "&:hover": {
      borderBottomColor: theme.palette.white.main,
      cursor: "pointer",
    },
    maxWidth: 220,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: "1px solid transparent",
  },
  protocolCell: {
    display: "flex",
    alignItems: "center",
  },
  protocolCellIcon: {
    marginRight: 4,
  },
  timeCell: {
    width: 150,
    color: theme.palette.white.transparency40,
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
  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
}));

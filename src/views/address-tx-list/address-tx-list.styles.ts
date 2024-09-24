import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useAddressTxListStyles = createUseStyles((theme: Theme) => ({
  messagesWrap: {},
  hashSearchWrap: {
    width: "100%",
    color: theme.palette.white.main,
  },
  hashLine: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  targetHash: {
    fontSize: 20,
    fontWeight: 500,
  },
  messageSummaryLine: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 36,
  },
  messageSummaryItem: {
    display: "flex",
    flexDirection: "column",
    marginRight: 154,
  },
  messageSummaryContent: {
    fontSize: 18,
    fontWeight: 500,
  },
  tableHead: {
    display: "flex",
    justifyContent: "flex-end",
  },
  table: {},
  tableBodyWrap: {},
  // dataCardWrap: {
  //   marginBottom: 32,
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
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
  searchSelectWrap: {
    display: "flex",
    alignItems: "center",
  },
  iconTransaction: {
    "&:hover": {
      cursor: "pointer",
    },
    height: 20,
    width: 20,
  },
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
  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  chianIcon: {
    height: 20,
    width: 20,
    marginRight: 4,
  },
}));

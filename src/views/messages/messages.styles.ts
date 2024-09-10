import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useMessagesStyles = createUseStyles((theme: Theme) => ({
  messagesWrap: {},
  tableHead: {
    display: "flex",
    justifyContent: "space-between",
  },
  table: {},
  dataCardWrap: {
    marginBottom: 32,
    display: "flex",
    justifyContent: "space-between",
  },
  searchInput: {
    backgroundColor: "transparent",
    borderRadius: 12,
    color: theme.palette.white.main,
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    outline: "none",
    textAlign: "left",
    width: 506,
    height: 44,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    padding: "12px 30px 12px 38px",
  },
  searchInputWrap: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    height: 20,
    width: 20,
  },
  searchSelectWrap: {
    display: "flex",
    alignItems: "center",
  },
  iconTransaction: {
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
  deleteIcon: {
    "&:hover": {
      cursor: "pointer",
    },
    position: "absolute",
    right: 4,
    top: "50%",
    transform: "translateY(-50%)",
    height: 20,
    width: 20,
    fill: theme.palette.white.main,
    opacity: 0.4,
  },
}));

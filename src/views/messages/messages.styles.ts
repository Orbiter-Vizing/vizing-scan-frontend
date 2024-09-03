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
    padding: "12px 16px 12px 38px",
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
  },
}));

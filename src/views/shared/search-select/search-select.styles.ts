import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useSearchSelectStyles = createUseStyles((theme: Theme) => ({
  searchSelectWrap: {},
  searchSelectButtonWrap: {
    "&:hover": {
      cursor: "pointer",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 8px 0",
    color: theme.palette.white.main,
    fontSize: 14,
    fontWeight: 400,
    height: 44,
  },
  columnFlex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  selectButton: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    color: theme.palette.white.transparency40,
  },
  value: {
    color: theme.palette.white.main,
  },
  listWrap: {
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-corner": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.white.transparency10,
      borderRadius: 2,
    },
    maxHeight: 256,
    minWidth: 144,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  datePanelWrap: {
    display: "flex",
  },
  shortcutsWrap: {
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid",
    borderRightColor: theme.palette.black.black03,
  },
  shortcutItem: {
    "&:hover": {
      background: theme.palette.white.transparency10,
      cursor: "pointer",
    },
    display: "inline-flex",
    height: 40,
    width: 120,
    alignItems: "center",
    padding: "0 12px 0",
    justifyContent: "flex-start",
    color: theme.palette.white.transparency40,
  },
  selectedChortcutItem: {
    background: theme.palette.white.transparency10,
    color: theme.palette.white.main,
  },
  radixPopoverRoot: {
    border: "1px solid green",
  },
  radixPopover: {
    padding: 0,
    borderRadius: 0,
    background: theme.palette.black.secondary,
    border: "1px solid",
    borderColor: theme.palette.black.black03,
    maxWidth: "none",
  },
  listContainer: {},
  selectItemWrap: {
    "&:hover": {
      background: theme.palette.white.transparency10,
      cursor: "pointer",
    },
    display: "flex",
    alignItems: "center",
    height: 40,
    fontSize: 14,
    padding: "0 12px 0",
    color: theme.palette.white.main,
  },
  selectItemName: {
    marginLeft: 4,
  },
  cleanData: {
    "&:hover": {
      color: theme.palette.white.main,
      cursor: "pointer",
    },
    display: "inline-flex",
    fontSize: 12,
    color: theme.palette.white.transparency40,
    padding: "10px",
  },
}));

import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useSearchSelectStyles = createUseStyles((theme: Theme) => ({
  searchSelectWrap: {},
  searchSelectButton: {
    "&:hover": {
      cursor: "pointer",
    },
    display: "flex",
    alignItems: "center",
    padding: "0 8px 0",
    color: theme.palette.white.main,
    fontSize: 14,
    fontWeight: 400,
    height: 44,
  },
  label: {
    color: theme.palette.white.transparency40,
  },
  value: {
    color: theme.palette.white.main,
  },
  listWrap: {
    height: 256,
    width: 144,
    overflow: "scroll",
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
    padding: "0 12px 0",
    color: theme.palette.white.main,
  },
  selectItemName: {
    marginLeft: 4,
  },
}));

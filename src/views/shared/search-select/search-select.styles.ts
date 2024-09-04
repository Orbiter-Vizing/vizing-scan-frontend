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
    border: "1px solid #eee",
  },
  label: {
    color: theme.palette.white.transparency40,
  },
  value: {
    color: theme.palette.white.main,
  },
  listWrap: {
    height: 256,
    overflow: "scroll",
  },
  radixPopover: {
    padding: "8px 0 8px",
    borderRadius: 0,
    background: "black",
    border: "1px solid",
    borderColor: theme.palette.black.black03,
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

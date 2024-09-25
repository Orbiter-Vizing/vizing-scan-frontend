import { createUseStyles } from "react-jss";
import { Theme } from "src/styles/theme";

export const useHashSearchInputStyles = createUseStyles((theme: Theme) => ({
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
  searchInput: {
    backgroundColor: "transparent",
    borderRadius: 4,
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
  invalidTip: {
    position: "absolute",
    top: "100%",
    color: theme.palette.red.main,
    fontSize: 12,
  },
}));

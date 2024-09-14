import { createUseStyles } from "react-jss";
import { Theme } from "src/styles/theme";

export const useProcessCardStyles = createUseStyles((theme: Theme) => ({
  processCardWrap: {
    color: theme.palette.white.main,
  },
  processPeriodWrap: {
    "&:last-child": {
      marginRight: 0,
    },
    position: "relative",
    height: 184,
    borderRadius: 12,
    border: "1px solid",
    borderColor: theme.palette.white.transparency12,
    flex: 1,
    marginRight: 10,
  },
  processPeriodContainer: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    padding: "24px 0 24px",
    background: "rgba(24, 1, 1, 0.2)",
    backdropFilter: "blur(6px)",
    borderRadius: 12,
  },
  processBackgroundWrap: {
    position: "absolute",
    zIndex: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    height: 62,
    width: "100%",
  },
  processBackgroundPatternWrap: {
    flex: 1,
  },
  processBackgroundPattern: {
    height: 62,
    width: "100%",
  },
  processName: {
    minWidth: 103,
    height: 24,
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.white.main,
    textAlign: "center",
  },
  processIcon: {},
  processIconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    width: 72,
    borderRadius: "50%",
    background: theme.palette.black.secondary,
    border: "1px solid",
    borderColor: theme.palette.red.main,
  },
  processHashContent: {
    borderBottom: "1px solid transparent",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.white.main,
      borderBottomColor: theme.palette.white.main,
    },
  },
  processContent: {
    minWidth: 113,
    height: 20,
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  skeletonProcessIconWrap: {
    height: 72,
    width: 72,
  },
}));

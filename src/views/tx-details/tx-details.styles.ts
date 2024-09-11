import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useTxDetailsStyles = createUseStyles((theme: Theme) => ({
  txPageTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.white.main,
    marginBottom: 15,
  },
  txDetailsWrap: {
    display: "flex",
    flexDirection: "column",
  },
  processWrap: {
    display: "flex",
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
  processName: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.white.main,
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
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
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
  processBackgroundPattern: {
    height: 62,
    width: 190,
  },
  processBackgroundPatternWrap: {
    flex: 1,
  },
  transactionInfoWrap: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    border: "1px solid",
    borderColor: theme.palette.white.transparency12,
    marginTop: 16,
    borderRadius: 8,
  },
  txInfotitle: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.white.main,
  },
  detailsInfoWrap: {
    display: "flex",
  },
  sourceChainInfoWrap: {
    marginRight: 2,
  },
  chainInfoWrap: {
    flex: 1,
  },
  infoRow: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 2,
    padding: "8px 16px",
  },
  infoRowLabel: {
    display: "inline-block",
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.white.transparency60,
  },
  fromInfo: {
    color: theme.palette.white.main,
  },
  feeInfo: {
    color: theme.palette.white.transparency60,
  },
  messageInfo: {
    color: theme.palette.white.transparency60,
  },
  feeDetail: {
    display: "flex",
  },
  feeDetailIcon: {
    marginRight: 4,
  },
  messageDetail: {
    borderRadius: 4,
    border: "1px solid",
    borderColor: theme.palette.white.transparency12,
    padding: 16,
    fontSize: 14,
    fontWeight: 400,
    marginTop: 4,
  },
}));

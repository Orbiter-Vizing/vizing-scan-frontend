import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useSummaryDataStyles = createUseStyles((theme: Theme) => ({
  summaryDataWrap: {
    color: theme.palette.white.main,
  },
  dataCardWrap: {
    marginBottom: 32,
    display: "flex",
    justifyContent: "space-between",
  },
}));

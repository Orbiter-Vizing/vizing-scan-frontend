import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useSearchSelectStyles = createUseStyles((theme: Theme) => ({
  searchSelectWrap: {
    display: "flex",
    color: theme.palette.white.main,
  },
}));

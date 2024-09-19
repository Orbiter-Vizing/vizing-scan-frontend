import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useDataTableStyles = createUseStyles((theme: Theme) => ({
  dataTableWrap: {
    marginTop: 12,
    border: "1px solid",
    borderColor: theme.palette.black.black03,
    borderRadius: 4,
  },
}));

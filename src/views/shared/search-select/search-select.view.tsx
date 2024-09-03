import { FC } from "react";

import { useSearchSelectStyles } from "src/views/shared/search-select/search-select.styles";

export const SearchSelect: FC = () => {
  const classes = useSearchSelectStyles();

  return <div className={classes.searchSelectWrap}>search select</div>;
};

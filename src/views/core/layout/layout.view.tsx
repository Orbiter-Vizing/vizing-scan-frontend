import { FC, PropsWithChildren } from "react";

import { useLayoutStyles } from "src/views/core/layout/layout.styles";
import { Header } from "src/views/shared/header/header.view";
import BackgroundPattern from "src/assets/background-pattern.svg?react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const classes = useLayoutStyles();

  return (
    <div className={classes.layoutWrap}>
      <Header />
      <div className={classes.layout}>
        <BackgroundPattern className={classes.backgroundPattern} />
        <div className={classes.container}>{children}</div>
      </div>
    </div>
  );
};

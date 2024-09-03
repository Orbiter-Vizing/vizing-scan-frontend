import { FC } from "react";

import { useProtocolsStyles } from "src/views/protocols/protocols.styles";

export const Protocols: FC = () => {
  const classes = useProtocolsStyles();

  return <div className={classes.protocolsWrap}>protocols page</div>;
};

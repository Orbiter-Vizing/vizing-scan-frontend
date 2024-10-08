import { FC } from "react";

import { useStatusIconStyles } from "src/views/shared/status-icon/icon.styles";
import IconLoading from "src/assets/icon/loading.svg?react";
import IconSuccess from "src/assets/icon/success.svg?react";
import IconConfirming from "src/assets/icon/confirming.svg?react";

interface StatusIconProps {
  status: "Success" | "Landing" | "Confirming";
  text: string;
}

export const StatusIcon: FC<StatusIconProps> = ({ status, text }) => {
  const classes = useStatusIconStyles();

  return (
    <div
      className={`
        ${classes.iconWrap}
        ${status === "Success" && classes.success}
        ${status === "Landing" && classes.landing}
        ${status === "Confirming" && classes.confirming}
      `}
    >
      {status === "Success" && <IconSuccess className={classes.icon} />}
      {status === "Landing" && <IconLoading className={classes.icon} />}
      {status === "Confirming" && <IconConfirming className={classes.icon} />}
      {text}
    </div>
  );
};

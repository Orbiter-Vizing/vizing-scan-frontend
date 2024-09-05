import { FC } from "react";

import { useStatusIconStyles } from "src/views/shared/status-icon/icon.styles";
import IconLoading from "src/assets/icon/loading.svg?react";
import IconSuccess from "src/assets/icon/success.svg?react";

interface StatusIconProps {
  status: "success" | "loading";
  text: string;
}

export const StatusIcon: FC<StatusIconProps> = ({ status, text }) => {
  const classes = useStatusIconStyles();

  return (
    <div
      className={`${classes.iconWrap} ${status === "success" ? classes.success : classes.loading}`}
    >
      {status === "success" && <IconSuccess className={classes.icon} />}
      {status === "loading" && <IconLoading className={classes.icon} />}
      {text}
    </div>
  );
};

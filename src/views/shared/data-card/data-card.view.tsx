import { FC } from "react";
import CountUp from "react-countup";

import { useDataCardStyles } from "src/views/shared/data-card/data-card.styles";

export interface CardData {
  id: string;
  data: string | number | undefined;
  prefix: string;
  name: string;
}

interface DataCardProps {
  data: CardData;
}

export const DataCard: FC<DataCardProps> = ({ data }) => {
  const classes = useDataCardStyles();
  const endValue = typeof data.data === "number" ? data.data : parseInt(data.data as string);

  return (
    <div className={classes.dataCardWrap}>
      <span className={classes.dataNumber}>
        {data.data ? <CountUp prefix={data.prefix} end={endValue} duration={1} /> : "-"}
      </span>
      <span className={classes.dataName}>{data.name}</span>
    </div>
  );
};

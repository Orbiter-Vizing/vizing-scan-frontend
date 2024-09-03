import { FC } from "react";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";

const dataList = [
  {
    id: "total-messages",
    data: "153486789",
    prefix: "",
    name: "Total Messages",
  },
  {
    id: "landing-massages",
    data: "153486789",
    prefix: "",
    name: "Landing Massages",
  },
  {
    id: "volum",
    data: "153486789",
    prefix: "$",
    name: "Volum(24h)",
  },
  {
    id: "networks",
    data: "153486789",
    prefix: "",
    name: "Networks",
  },
  {
    id: "protocols",
    data: "153486789",
    prefix: "",
    name: "Protocols",
  },
];

export const Messages: FC = () => {
  const classes = useMessagesStyles();

  return (
    <div className={classes.messagesWrap}>
      {dataList.map((data) => {
        return <DataCard data={data} />;
      })}
    </div>
  );
};

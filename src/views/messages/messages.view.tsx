import { ChangeEvent, FC, useState } from "react";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import SearchIcon from "src/assets/icon/search.svg?react";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";

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

  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div className={classes.messagesWrap}>
      <div className={classes.dataCardWrap}>
        {dataList.map((data) => {
          return <DataCard key={data.id} data={data} />;
        })}
      </div>
      <div>
        <div className={classes.tableHead}>
          <div className={classes.searchInputWrap}>
            <SearchIcon className={classes.searchIcon} />
            <input
              autoFocus
              className={classes.searchInput}
              onChange={onInputChange}
              placeholder="Search by address or hash"
              value={inputValue}
            ></input>
          </div>
          <div></div>
          <div className={classes.searchSelectWrap}>
            <SearchSelect />
          </div>
        </div>
        <div className={classes.table}></div>
      </div>
    </div>
  );
};

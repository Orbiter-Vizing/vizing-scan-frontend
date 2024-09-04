import { ChangeEvent, FC, useState } from "react";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import SearchIcon from "src/assets/icon/search.svg?react";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import IconLikwid from "src/assets/icon/protocols/logo_likwid.png";

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

const searchSeletList = [
  {
    id: "all",
    name: "All",
    iconUrl: "",
    value: "0",
  },
  {
    id: "likwid",
    name: "Likwid",
    iconUrl: IconLikwid,
    value: "1",
  },
  {
    id: "aylab",
    name: "Aylab",
    iconUrl: IconLikwid,
    value: "2",
  },
  {
    id: "0xAstra",
    name: "0xAstra",
    iconUrl: IconLikwid,
    value: "3",
  },
  {
    id: "bullishs",
    name: "bullishs",
    iconUrl: IconLikwid,
    value: "4",
  },
  {
    id: "colorProtocol",
    name: "Color Protocol",
    iconUrl: IconLikwid,
    value: "5",
  },
  {
    id: "pink",
    name: "Pink",
    iconUrl: IconLikwid,
    value: "6",
  },
  {
    id: "xMint",
    name: "X-Mint",
    iconUrl: IconLikwid,
    value: "7",
  },
  {
    id: "aaBank",
    name: "AAbank",
    iconUrl: IconLikwid,
    value: "8",
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
            <SearchSelect label="Protocol" type="list" listData={searchSeletList} />
            <SearchSelect label="Date" type="date" />
          </div>
        </div>
        <div className={classes.table}></div>
      </div>
    </div>
  );
};

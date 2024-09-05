import { ChangeEvent, FC, useState } from "react";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import SearchIcon from "src/assets/icon/search.svg?react";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import IconLikwid from "src/assets/icon/protocols/logo_likwid.png";
import IconTransaction from "src/assets/icon/transaction.svg?react";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
// Mui table
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer, { tableContainerClasses } from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
// Mui pagination
import Pagination from "@mui/material/Pagination";
import PaginationItem, { paginationItemClasses } from "@mui/material/PaginationItem";

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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    border: "none",
    fontSize: 14,
    fontWeight: 400,
    color: "#ffffff",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  [`&.${tableRowClasses.root}`]: {
    border: "1px solid #292223",
    borderLeft: "none",
    borderRight: "none",
  },
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  [`&.${tableContainerClasses.root}`]: {
    backgroundColor: "transparent",
  },
}));

const StyledPaginationItem = styled(PaginationItem)(() => ({
  [`&.${paginationItemClasses.root}`]: {
    color: "rgba(255, 255, 255, 0.4)",
  },
  [`&.${paginationItemClasses.root}.Mui-selected`]: {
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
}));

function createData(
  status: "loading" | "success",
  nonce: string,
  from: string,
  sourceTxHash: string,
  destTxHash: string,
  protocol: {
    iconUrl: string;
    protocolName: string;
  },
  time: string,
) {
  return { status, nonce, from, sourceTxHash, destTxHash, protocol, time };
}

const rows = [
  createData(
    "loading",
    "9001",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    {
      iconUrl: IconLikwid,
      protocolName: "LIKWID",
    },
    "Now",
  ),
  createData(
    "loading",
    "9001",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    {
      iconUrl: IconLikwid,
      protocolName: "LIKWID",
    },
    "Now",
  ),
  createData(
    "loading",
    "9001",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    {
      iconUrl: IconLikwid,
      protocolName: "LIKWID",
    },
    "Now",
  ),
  createData(
    "loading",
    "9001",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    {
      iconUrl: IconLikwid,
      protocolName: "LIKWID",
    },
    "Now",
  ),
  createData(
    "loading",
    "9001",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    {
      iconUrl: IconLikwid,
      protocolName: "LIKWID",
    },
    "Now",
  ),
  createData(
    "loading",
    "9001",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    "0x360ae286abbfbe64cf90c7e86abbfbe64cf90c7e",
    {
      iconUrl: IconLikwid,
      protocolName: "LIKWID",
    },
    "Now",
  ),
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
            <SearchSelect label="Date" type="date" />
            <SearchSelect label="Protocol" type="list" listData={searchSeletList} />
            <SearchSelect label="From" type="list" listData={searchSeletList} />
            <IconTransaction className={classes.iconTransaction} />
            <SearchSelect label="To" type="list" listData={searchSeletList} />
          </div>
        </div>
        <div className={classes.tableWrap}>
          <StyledTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell align="left">Nonce</StyledTableCell>
                  <StyledTableCell align="left">From</StyledTableCell>
                  <StyledTableCell align="left">Source Tx Hash</StyledTableCell>
                  <StyledTableCell align="left">Destination Tx Hash</StyledTableCell>
                  <StyledTableCell align="left">Protocol</StyledTableCell>
                  <StyledTableCell align="left">Time</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.nonce}>
                    <StyledTableCell align="left">
                      <StatusIcon status={row.status} text={row.status} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.rowNonceCell}>{row.nonce}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.hashCell}>{row.from}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.hashCell}>{row.sourceTxHash}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.hashCell}>{row.destTxHash}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.protocolCell}>
                        <Icon
                          className={classes.protocolCellIcon}
                          isRounded
                          size={32}
                          url={row.protocol.iconUrl}
                        />
                        {row.protocol.protocolName}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className={classes.timeCell}>{row.time}</div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          <div className={classes.paginationWrap}>
            <Pagination
              count={10}
              variant="text"
              shape="rounded"
              renderItem={(item) => (
                <StyledPaginationItem
                  // slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

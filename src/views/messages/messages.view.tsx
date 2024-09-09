import { ChangeEvent, FC, useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import SearchIcon from "src/assets/icon/search.svg?react";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import IconLikwid from "src/assets/icon/protocols/logo_likwid.png";
import IconTransaction from "src/assets/icon/transaction.svg?react";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import { apiUrl } from "src/constants";
import { useMessagesContext } from "src/contexts/messages.context";
import { MessagesListItem } from "src/contexts/messages.context";
import { calculateRelativeTime } from "src/utils";
import { DateValue } from "src/views/shared/search-select/search-select.view";
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
  status: "landing" | "success",
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

const pageSize = 10;

// 99 success 98 confirming 0 landing
enum TxStatus {
  Landing = 0,
  Confirming = 98,
  Success = 99,
}

type DisplayStatus = "Success" | "Confirming" | "Landing";

const getStatusDisplay = (status: TxStatus): DisplayStatus => {
  switch (status) {
    case TxStatus.Success:
      return "Success";
    case TxStatus.Landing:
      return "Landing";
    case TxStatus.Confirming:
      return "Confirming";
    default:
      throw new Error("Unknown status");
  }
};

export interface MessagesSearchFrom {
  date: DateValue;
  protocol: string;
  from: string;
  to: string;
}

export const Messages: FC = () => {
  const classes = useMessagesStyles();
  const { fetchSummaryData, fetchMessagesList, defaultSummaryData } = useMessagesContext();
  const [inputValue, setInputValue] = useState("");
  const [summaryData, setSummaryData] = useState(defaultSummaryData);
  const [messagesList, setMessagesList] = useState<MessagesListItem[]>([]);
  const [searchForm, setSearchForm] = useState<MessagesSearchFrom>({
    date: [dayjs().toDate(), dayjs().toDate()],
    protocol: "",
    from: "",
    to: "",
  });
  const [page, setPage] = useState(1);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSetSearchForm = (formData: MessagesSearchFrom) => {
    setSearchForm(formData);
  };

  const initPageData = useCallback(async () => {
    const summaryData = await fetchSummaryData({ apiUrl });
    setSummaryData(summaryData);
    const messagesListData = await fetchMessagesList({
      apiUrl,
      page,
      pageSize,
    });
    setMessagesList(messagesListData);
  }, [fetchSummaryData, fetchMessagesList, page]);

  const handlePaginationChange = async (event: ChangeEvent<unknown>, page: number) => {
    const messagesListData = await fetchMessagesList({
      apiUrl,
      page,
      pageSize,
    });
    setMessagesList(messagesListData);
  };

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  return (
    <div className={classes.messagesWrap}>
      <div className={classes.dataCardWrap}>
        {summaryData.map((data) => {
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
            <SearchSelect
              label="Date"
              type="date"
              formData={searchForm}
              formKey="date"
              setFormData={handleSetSearchForm}
            />
            <SearchSelect
              label="Protocol"
              type="list"
              listData={searchSeletList}
              formData={searchForm}
              formKey="protocol"
              setFormData={handleSetSearchForm}
            />
            <SearchSelect
              label="From"
              type="list"
              listData={searchSeletList}
              formData={searchForm}
              formKey="from"
              setFormData={handleSetSearchForm}
            />
            <IconTransaction className={classes.iconTransaction} />
            <SearchSelect
              label="To"
              type="list"
              listData={searchSeletList}
              formData={searchForm}
              formKey="to"
              setFormData={handleSetSearchForm}
            />
            <button onClick={() => console.log(searchForm)}>click</button>
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
                {messagesList.map((row) => {
                  const statusAttr = getStatusDisplay(row.status);
                  const formatTimeText = calculateRelativeTime(row.time);
                  return (
                    <StyledTableRow key={row.nonce}>
                      <StyledTableCell align="left">
                        <StatusIcon status={statusAttr} text={statusAttr} />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.rowNonceCell}>{row.nonce}</div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.hashCell}>{row.from}</div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.hashCell}>
                          {row.sourceChain && (
                            <Icon
                              className={classes.chianIcon}
                              isRounded
                              size={20}
                              url={row.sourceChain.icon}
                            />
                          )}
                          {row.sourceTxHash}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.hashCell}>
                          {row.destChain && (
                            <Icon
                              className={classes.chianIcon}
                              isRounded
                              size={20}
                              url={row.destChain.icon}
                            />
                          )}
                          {row.destTxHash}
                        </div>
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
                        <div className={classes.timeCell}>{formatTimeText}</div>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
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
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

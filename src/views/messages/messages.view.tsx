import { ChangeEvent, FC, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import SearchIcon from "src/assets/icon/search.svg?react";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import DeleteIcon from "src/assets/icon/delete.svg?react";
import IconTransaction from "src/assets/icon/transaction.svg?react";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import { apiUrl } from "src/constants";
import { useMessagesContext } from "src/contexts/messages.context";
import { MessagesListItem } from "src/contexts/messages.context";
import { calculateRelativeTime } from "src/utils";
import { DateValue } from "src/views/shared/search-select/search-select.view";
import { getProtocolsSearchSelectList } from "src/assets/protocols-icons";
import { getChainsSearchSelectList } from "src/assets/chains-config";
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

const initialPage = 1;
const pageSize = 10;

// 99 success 98 confirming 0 landing
enum TxStatus {
  Landing = 0,
  Confirming = 98,
  Success = 99,
}

type DisplayStatus = "Success" | "Confirming" | "Landing";

const getStatusDisplay = (status: TxStatus): DisplayStatus => {
  console.log("status", status);
  switch (status) {
    case TxStatus.Success:
      return "Success";
    case TxStatus.Landing:
      return "Landing";
    case TxStatus.Confirming:
      return "Confirming";
    default:
      return "Landing";
  }
};

export interface MessagesSearchFrom {
  dateRange: DateValue;
  protocolName: string;
  fromChainId: string;
  toChainId: string;
  queryHash: string;
}

export const Messages: FC = () => {
  const navigate = useNavigate();
  const classes = useMessagesStyles();
  const { fetchSummaryData, fetchMessagesList, defaultSummaryData } = useMessagesContext();
  const [inputValue, setInputValue] = useState("");
  const [summaryData, setSummaryData] = useState(defaultSummaryData);
  const [messagesList, setMessagesList] = useState<MessagesListItem[]>([]);
  const [searchForm, setSearchForm] = useState<MessagesSearchFrom>({
    dateRange: [null, null],
    protocolName: "",
    fromChainId: "",
    toChainId: "",
    queryHash: "",
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSetSearchForm = useCallback(
    (formData: MessagesSearchFrom) => {
      setSearchForm(formData);
    },
    [setSearchForm],
  );

  const initPageData = useCallback(async () => {
    const summaryData = await fetchSummaryData({ apiUrl });
    setSummaryData(summaryData);
    const messagesListData = await fetchMessagesList({
      apiUrl,
      page: initialPage,
      pageSize,
      q: "",
      dateRange: [],
      protocol: [],
      sourceChain: [],
      targetChain: [],
    });
    setMessagesList(messagesListData);
  }, [fetchSummaryData, fetchMessagesList]);

  const getListData = useCallback(async () => {
    const { dateRange, protocolName, fromChainId, toChainId, queryHash } = searchForm;
    let startDateString = null;
    let endDateString = null;
    if (Array.isArray(dateRange)) {
      startDateString = dateRange[0] ? dateRange[0].toISOString() : startDateString;
      endDateString = dateRange[1] ? dateRange[1].toISOString() : endDateString;
    }
    const messagesListData = await fetchMessagesList({
      apiUrl,
      page,
      pageSize,
      q: inputValue,
      dateRange: startDateString && endDateString ? [startDateString, endDateString] : [],
      protocol: protocolName ? [protocolName] : [],
      sourceChain: fromChainId ? [fromChainId] : [],
      targetChain: toChainId ? [toChainId] : [],
    });
    setMessagesList(messagesListData);
  }, [searchForm, page, fetchMessagesList]);

  const handlePaginationChange = async (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    getListData();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newSearchForm = { ...searchForm };
      newSearchForm["queryHash"] = inputValue;
      setSearchForm(newSearchForm);
    }
  };

  const handleInputDeleteClick = () => {
    setInputValue("");
  };

  const handleHashClick = (hash: string) => {
    if (!hash) {
      return;
    }
    navigate(`/tx/${hash}`);
  };

  const handleAddressClick = (address: string) => {
    if (!address) {
      return;
    }
    setInputValue(address);
  };

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  useEffect(() => {
    getListData();
  }, [searchForm, getListData, inputValue]);

  useEffect(() => {
    getListData();
  }, [inputValue, getListData]);

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
              onKeyDown={handleKeyDown}
              placeholder="Search by address or hash"
              value={inputValue}
            ></input>
            {inputValue && (
              <DeleteIcon onClick={handleInputDeleteClick} className={classes.deleteIcon} />
            )}
          </div>
          <div></div>
          <div className={classes.searchSelectWrap}>
            <SearchSelect
              label="Date"
              type="date"
              formData={searchForm}
              formKey="dateRange"
              setFormData={handleSetSearchForm}
            />
            <SearchSelect
              label="Protocol"
              type="list"
              listData={getProtocolsSearchSelectList()}
              formData={searchForm}
              formKey="protocolName"
              setFormData={handleSetSearchForm}
            />
            <SearchSelect
              label="From"
              type="list"
              listData={getChainsSearchSelectList()}
              formData={searchForm}
              formKey="fromChainId"
              setFormData={handleSetSearchForm}
            />
            <IconTransaction className={classes.iconTransaction} />
            <SearchSelect
              label="To"
              type="list"
              listData={getChainsSearchSelectList()}
              formData={searchForm}
              formKey="toChainId"
              setFormData={handleSetSearchForm}
            />
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
                        <div
                          onClick={() => handleAddressClick(row.from)}
                          className={classes.addressCell}
                        >
                          {row.from}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.hashCell}>
                          {row.sourceChain && (
                            <Icon
                              className={classes.chianIcon}
                              isRounded
                              size={20}
                              url={row.sourceChain.iconUrl}
                            />
                          )}
                          <div
                            className={classes.hashCellContent}
                            onClick={() => handleHashClick(row.sourceTxHash)}
                          >
                            {row.sourceTxHash || "-"}
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.hashCell}>
                          {row.destChain && (
                            <Icon
                              className={classes.chianIcon}
                              isRounded
                              size={20}
                              url={row.destChain.iconUrl}
                            />
                          )}
                          <div
                            className={classes.hashCellContent}
                            onClick={() => handleHashClick(row.destTxHash)}
                          >
                            {row.destTxHash || "-"}
                          </div>
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
              page={page}
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

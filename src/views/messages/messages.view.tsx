import { ChangeEvent, FC, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import { apiUrl, evmTxHashLength, evmAddressLength } from "src/constants";
import { useMessagesContext } from "src/contexts/messages.context";
import { MessagesListItem } from "src/contexts/messages.context";
import { calculateRelativeTime } from "src/utils";
import { DateValue } from "src/views/shared/search-select/search-select.view";
import { getProtocolsSearchSelectList } from "src/assets/protocols-icons";
import { getChainsSearchSelectList } from "src/assets/chains-config";
import { MessageListMeta } from "src/adapters/messages-api";
// assets
import IconNoData from "src/assets/icon/no-data.svg?react";
import IconBack from "src/assets/icon/back.svg?react";
import IconTransaction from "src/assets/icon/transaction.svg?react";
import SearchIcon from "src/assets/icon/search.svg?react";
import DeleteIcon from "src/assets/icon/delete.svg?react";
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
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
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
    position: "relative",
    backgroundColor: "transparent",
    "&::-webkit-scrollbar": {
      height: 0,
    },
    "&::-webkit-scrollbar-corner": {
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      borderRadius: "1px",
    },
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

enum ListType {
  ADDRESS = "address",
  TRANSACTION = "transaction",
  MESSAGES = "messages",
}

export const Messages: FC = () => {
  const navigate = useNavigate();
  const classes = useMessagesStyles();
  const { fetchSummaryData, fetchMessagesList, defaultSummaryData } = useMessagesContext();
  const [inputValue, setInputValue] = useState("");
  const [summaryData, setSummaryData] = useState(defaultSummaryData);
  const [messagesList, setMessagesList] = useState<MessagesListItem[]>([]);
  const [messagesListMeta, setMessagesListMeta] = useState<MessageListMeta>();
  const [hashSearchLandingCount, setHashSearchLandingCount] = useState<number>();
  const [targetHash, setTargetHash] = useState<string>();
  const [searchForm, setSearchForm] = useState<MessagesSearchFrom>({
    dateRange: [null, null],
    protocolName: "",
    fromChainId: "",
    toChainId: "",
    queryHash: "",
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [listType, setListType] = useState<ListType>(ListType.MESSAGES);

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
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page: initialPage,
      pageSize,
      q: "",
      dateRange: [],
      protocol: [],
      sourceChain: [],
      targetChain: [],
    });
    // console.log("init messagesList", messagesList);
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
  }, [fetchSummaryData, fetchMessagesList]); // add messagesList will cause multi-render

  const getListData = useCallback(async () => {
    const { dateRange, protocolName, fromChainId, toChainId } = searchForm;
    let startDateString = null;
    let endDateString = null;
    if (Array.isArray(dateRange)) {
      startDateString = dateRange[0] ? dateRange[0].toISOString() : startDateString;
      endDateString = dateRange[1] ? dateRange[1].toISOString() : endDateString;
    }
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page,
      pageSize,
      q: targetHash,
      dateRange: startDateString && endDateString ? [startDateString, endDateString] : [],
      protocol: protocolName ? [protocolName] : [],
      sourceChain: fromChainId ? [fromChainId] : [],
      targetChain: toChainId ? [toChainId] : [],
    });
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
  }, [searchForm, page, fetchMessagesList, targetHash]);

  const handlePaginationChange = async (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    getListData();
  };

  const calculateHashSearchLandingCount = (totalList: MessagesListItem[]) => {
    let landingCount = 0;
    totalList.forEach((item: MessagesListItem) => {
      if (item.status === TxStatus.Landing) {
        landingCount += 1;
      }
    });
    return landingCount;
  };

  const handleHashSearch = async (searchHash?: string) => {
    console.log("handleHashSearch call searchHash:", searchHash);
    const targetHash = searchHash || inputValue;
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page: 1,
      pageSize,
      q: targetHash,
      dateRange: [],
      protocol: [],
      sourceChain: [],
      targetChain: [],
    });
    const messagesList = messagesListResponse.list;
    setTargetHash(targetHash);
    if (targetHash.length === evmTxHashLength) {
      // hash case
      console.log("messagesListData", messagesList);
      if (messagesList.length === 1) {
        // hash case 1: one result, get transaction id and go to detail page
        const targetTransaction = messagesList[0];
        navigate(`/tx/${targetTransaction.transactionId}`);
      } else if (messagesList.length > 1) {
        // hash case 2: list result, render list in the table
        console.log("case2: hash list result");
        setMessagesListMeta(messagesListResponse.meta);
        setMessagesList(messagesList);
        const landingCount = calculateHashSearchLandingCount(messagesList);
        setHashSearchLandingCount(landingCount);
        setListType(ListType.TRANSACTION);
      } else {
        // hash case 3: 0 result, render no result list in the table
        setMessagesListMeta(messagesListResponse.meta);
      }
    } else if (targetHash.length === evmAddressLength) {
      // address case
      // current page render new list through address
      console.log("address list result");
      setMessagesListMeta(messagesListResponse.meta);
      setMessagesList(messagesList);
      const landingCount = calculateHashSearchLandingCount(messagesList);
      setHashSearchLandingCount(landingCount);
      setListType(ListType.ADDRESS);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleHashSearch();
    }
  };

  const resetList = () => {
    setMessagesList([]);
    setMessagesListMeta(undefined);
    setTargetHash(undefined);
    setSearchForm({
      dateRange: [null, null],
      protocolName: "",
      fromChainId: "",
      toChainId: "",
      queryHash: "",
    });
  };

  const handleInputDeleteClick = () => {
    setInputValue("");
  };

  const handleBackIconClick = () => {
    setListType(ListType.MESSAGES);
    setInputValue("");
    resetList();
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
    handleHashSearch(address);
  };

  const handleSwitchClick = () => {
    const fromChain = searchForm.fromChainId;
    const toChain = searchForm.toChainId;
    const newSearchForm = { ...searchForm };
    newSearchForm.fromChainId = toChain;
    newSearchForm.toChainId = fromChain;
    setSearchForm(newSearchForm);
  };

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  // after searchForm select, get new list
  useEffect(() => {
    getListData();
  }, [searchForm, getListData]);

  // useEffect(() => {
  //   getListData();
  // }, [inputValue, getListData]);

  return (
    <div className={classes.messagesWrap}>
      {listType === ListType.MESSAGES && (
        <div className={classes.dataCardWrap}>
          {summaryData.map((data) => {
            return <DataCard key={data.id} data={data} />;
          })}
        </div>
      )}
      {listType === ListType.ADDRESS && (
        <div className={classes.hashSearchWrap}>
          <div className={classes.backIconWrap}>
            <IconBack onClick={handleBackIconClick} className={classes.backIcon} />
            Messages List
          </div>
          <div className={classes.hashLine}>
            <span className={classes.label}>Address</span>
            <div className={classes.targetHash}>{targetHash}</div>
          </div>
          <div className={classes.messageSummaryLine}>
            <div className={classes.messageSummaryItem}>
              <span className={classes.label}>Total Messages</span>
              <div className={classes.messageSummaryContent}>
                {messagesListMeta ? messagesListMeta.itemCount : "--"}
              </div>
            </div>
            <div className={classes.messageSummaryItem}>
              <span className={classes.label}>Landing Messages</span>
              <div className={classes.messageSummaryContent}>{hashSearchLandingCount || "--"}</div>
            </div>
          </div>
        </div>
      )}
      {listType === ListType.TRANSACTION && (
        <div className={classes.hashSearchWrap}>
          <div className={classes.backIconWrap}>
            <IconBack onClick={handleBackIconClick} className={classes.backIcon} />
            Messages List
          </div>
          <div className={classes.hashLine}>
            <span className={classes.label}>Transaction Details</span>
            <div className={classes.targetHash}>{targetHash}</div>
          </div>
          <div className={classes.messageSummaryLine}>
            <div className={classes.messageSummaryItem}>
              <span className={classes.label}>Total Messages</span>
              <div className={classes.messageSummaryContent}>
                {messagesListMeta ? messagesListMeta.itemCount : "--"}
              </div>
            </div>
            <div className={classes.messageSummaryItem}>
              <span className={classes.label}>Landing Messages</span>
              <div className={classes.messageSummaryContent}>{hashSearchLandingCount || "--"}</div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className={classes.tableHead}>
          {listType === ListType.MESSAGES && (
            <div className={classes.searchInputWrap}>
              <SearchIcon className={classes.searchIcon} />
              <input
                autoFocus
                className={classes.searchInput}
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search by address or hash"
                value={inputValue}
              />
              {inputValue && (
                <DeleteIcon onClick={handleInputDeleteClick} className={classes.deleteIcon} />
              )}
            </div>
          )}
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
            <IconTransaction onClick={handleSwitchClick} className={classes.iconTransaction} />
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
                {messagesList.length &&
                  messagesList.map((row) => {
                    const statusAttr = getStatusDisplay(row.status);
                    const formatTimeText = calculateRelativeTime(row.time);
                    return (
                      <StyledTableRow key={`${row.nonce}${row.time}`}>
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
                              onClick={() => handleHashClick(row.transactionId)}
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
                              onClick={() => handleHashClick(row.transactionId)}
                            >
                              {row.destTxHash || "-"}
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.protocol ? (
                            <div className={classes.protocolCell}>
                              <Icon
                                className={classes.protocolCellIcon}
                                isRounded
                                size={32}
                                url={row.protocol.iconUrl}
                              />
                              {row.protocol.name}
                            </div>
                          ) : (
                            "-"
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div className={classes.timeCell}>{formatTimeText}</div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                {!messagesList.length && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={7} align="center">
                      <div className={classes.noDataTip}>
                        <IconNoData className={classes.noDataIcon} />
                        <p className={classes.tipTitle}>
                          Sorry, We are unable to locate this TxnHash
                        </p>
                        <p className={classes.tipContent}>
                          VizingScan only provides an overview of the current state of the
                          blockchain such as your transaction status but we have no control over
                          these transactions
                        </p>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
          {messagesListMeta && messagesListMeta.itemCount > pageSize && (
            <div className={classes.paginationWrap}>
              <Pagination
                count={messagesListMeta.pageCount}
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
          )}
        </div>
      </div>
    </div>
  );
};

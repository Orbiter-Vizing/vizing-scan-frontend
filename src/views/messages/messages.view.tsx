import { ChangeEvent, FC, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import IconPreArrow from "src/assets/icon/pre-arrow.svg?react";
import IconNextArrow from "src/assets/icon/next-arrow.svg?react";

import { useMessagesStyles } from "src/views/messages/messages.styles";
import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import { getCurrentEnvApiUrl } from "src/constants";
import { useMessagesContext } from "src/contexts/messages.context";
import { MessagesListItem } from "src/contexts/messages.context";
import { calculateRelativeTime } from "src/utils";
import { DateValue } from "src/views/shared/search-select/search-select.view";
import { getProtocolsSearchSelectList } from "src/assets/protocols-icons";
import { getChainsSearchSelectList } from "src/assets/chains-config";
import { MessageListMeta } from "src/adapters/messages-api";
import { SummaryData } from "src/views/shared/summary-data/summary-data.view";
import { HashSearchInput } from "src/views/shared/hash-search-input/hash-search-input.view";
// assets
import IconNoData from "src/assets/icon/no-data.svg?react";
import IconTransaction from "src/assets/icon/transaction.svg?react";
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
    "&:hover": {
      background: "rgba(255, 255, 255, 0.08)",
      cursor: "pointer",
    },
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

const CustomSkeleton = styled(Skeleton)({
  "&::after": {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
  },
});

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
  queryHash?: string;
}

enum ListDataStatus {
  SUCCESS = "success",
  LOADING = "loading",
  EMPTY = "empty",
}

export const Messages: FC = () => {
  const navigate = useNavigate();
  const classes = useMessagesStyles();
  const { fetchMessagesList } = useMessagesContext();
  const [messagesList, setMessagesList] = useState<MessagesListItem[]>([]);
  const [messagesListMeta, setMessagesListMeta] = useState<MessageListMeta>();
  const [searchForm, setSearchForm] = useState<MessagesSearchFrom>({
    dateRange: [null, null],
    protocolName: "",
    fromChainId: "",
    toChainId: "",
    queryHash: "",
  });
  const [page, setPage] = useState(1);
  const [listDataStatus, setListDataStatus] = useState<ListDataStatus>(ListDataStatus.LOADING);
  const apiUrl = getCurrentEnvApiUrl();

  const handleSetSearchForm = useCallback(
    (formData: MessagesSearchFrom) => {
      setSearchForm(formData);
    },
    [setSearchForm],
  );

  const handleListStatus = (list: MessagesListItem[]) => {
    if (list.length > 0) {
      setListDataStatus(ListDataStatus.SUCCESS);
    } else if (list.length === 0) {
      setListDataStatus(ListDataStatus.EMPTY);
    }
  };

  const initPageData = useCallback(async () => {
    // const summaryData = await fetchSummaryData({ apiUrl });
    // setSummaryData(summaryData);
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
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
    handleListStatus(messagesListResponse.list);
  }, [fetchMessagesList, apiUrl]); // add messagesList will cause multi-render

  const getListData = useCallback(async () => {
    const { dateRange, protocolName, fromChainId, toChainId } = searchForm;
    let startDateString = null;
    let endDateString = null;
    if (Array.isArray(dateRange)) {
      startDateString = dateRange[0] ? dateRange[0].toISOString() : startDateString;
      endDateString = dateRange[1] ? dateRange[1].toISOString() : endDateString;
    }
    setListDataStatus(ListDataStatus.LOADING);
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page,
      pageSize,
      dateRange: startDateString && endDateString ? [startDateString, endDateString] : [],
      protocol: protocolName ? [protocolName] : [],
      sourceChain: fromChainId ? [fromChainId] : [],
      targetChain: toChainId ? [toChainId] : [],
    });
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
    handleListStatus(messagesListResponse.list);
  }, [searchForm, page, fetchMessagesList, apiUrl]);

  const handlePaginationChange = async (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    getListData();
  };

  const handleHashNavigate = (e: React.MouseEvent, hash: string) => {
    e.stopPropagation();
    if (!hash) {
      return;
    }
    navigate(`/tx/${hash}`);
  };

  const handleAddressClick = (e: React.MouseEvent, address: string) => {
    e.stopPropagation();
    if (!address) {
      return;
    }
    navigate(`/address/${address}`);
  };

  const handleSwitchClick = () => {
    const fromChain = searchForm.fromChainId;
    const toChain = searchForm.toChainId;
    const newSearchForm = { ...searchForm };
    newSearchForm.fromChainId = toChain;
    newSearchForm.toChainId = fromChain;
    setSearchForm(newSearchForm);
  };

  const handleRowClick = (transactionId: string) => {
    if (!transactionId) {
      return;
    }
    navigate(`/tx/${transactionId}`);
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
      <SummaryData />
      <div>
        <div className={classes.tableHead}>
          <HashSearchInput />
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
                  <StyledTableCell align="left">Time（UTC）</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listDataStatus === ListDataStatus.SUCCESS &&
                  messagesList.length &&
                  messagesList.map((row) => {
                    const statusAttr = getStatusDisplay(row.status);
                    const formatTimeText = calculateRelativeTime(row.time);
                    return (
                      <StyledTableRow
                        onClick={() => handleRowClick(row.transactionId)}
                        key={row.id}
                      >
                        <StyledTableCell align="left">
                          <StatusIcon status={statusAttr} text={statusAttr} />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div className={classes.rowNonceCell}>{row.nonce}</div>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <div
                            onClick={(e) => handleAddressClick(e, row.from)}
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
                              onClick={(e) => handleHashNavigate(e, row.transactionId)}
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
                              onClick={(e) => handleHashNavigate(e, row.transactionId)}
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
                {listDataStatus === ListDataStatus.LOADING &&
                  new Array(pageSize).fill(undefined).map((item, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell colSpan={7} align="center">
                          <CustomSkeleton
                            sx={{ bgcolor: "#151515" }}
                            animation="wave"
                            variant="rounded"
                            width={"100%"}
                            height={"28px"}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                {listDataStatus === ListDataStatus.EMPTY && !messagesList.length && (
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
                    slots={{ previous: IconPreArrow, next: IconNextArrow }}
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

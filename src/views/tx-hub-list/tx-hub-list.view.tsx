import { ChangeEvent, FC, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import IconPreArrow from "src/assets/icon/pre-arrow.svg?react";
import IconNextArrow from "src/assets/icon/next-arrow.svg?react";

import { useTxHubListStyles } from "src/views/tx-hub-list/tx-hub-list.styles";
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
      // cursor: "pointer",
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

export const TxHubList: FC = () => {
  const navigate = useNavigate();
  const { txHash } = useParams();
  const classes = useTxHubListStyles();
  const { fetchMessagesList } = useMessagesContext();
  const [messagesList, setMessagesList] = useState<MessagesListItem[]>([]);
  const [messagesListMeta, setMessagesListMeta] = useState<MessageListMeta>();
  const [landingCount, setLandingCount] = useState<number>();
  const [searchForm, setSearchForm] = useState<MessagesSearchFrom>({
    dateRange: [null, null],
    protocolName: "",
    fromChainId: "",
    toChainId: "",
    queryHash: txHash,
  });
  const [page, setPage] = useState(1);
  const [listDataStatus, setListDataStatus] = useState<ListDataStatus>(ListDataStatus.LOADING);
  const apiUrl = getCurrentEnvApiUrl();
  const isInitialDataLoaded = useRef(false);

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
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page: initialPage,
      pageSize,
      q: txHash,
      dateRange: [],
      protocol: [],
      sourceChain: [],
      targetChain: [],
    });
    const landingCount = calculateHashSearchLandingCount(messagesListResponse.list);
    setLandingCount(landingCount);
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
    handleListStatus(messagesListResponse.list);
    isInitialDataLoaded.current = true;
  }, [fetchMessagesList, apiUrl, txHash]); // add messagesList will cause multi-render

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
      q: txHash,
      dateRange: startDateString && endDateString ? [startDateString, endDateString] : [],
      protocol: protocolName ? [protocolName] : [],
      sourceChain: fromChainId ? [fromChainId] : [],
      targetChain: toChainId ? [toChainId] : [],
    });
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
    handleListStatus(messagesListResponse.list);
  }, [searchForm, page, fetchMessagesList, txHash, apiUrl]);

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

  const handleHashNavigate = (e: React.MouseEvent, hash: string) => {
    e.stopPropagation();
    if (!hash) {
      return;
    }
    navigate(`/tx/${hash}`);
  };

  const handleAddressClick = (address: string) => {
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

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  // after searchForm select, get new list
  useEffect(() => {
    if (isInitialDataLoaded.current) {
      getListData();
    }
  }, [searchForm, getListData]);

  return (
    <div className={classes.messagesWrap}>
      <div className={classes.hashSearchWrap}>
        <div className={classes.hashLine}>
          <span className={classes.label}>Transaction Details</span>
          <div className={classes.targetHash}>{txHash || "--"}</div>
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
            <div className={classes.messageSummaryContent}>{landingCount || "--"}</div>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.tableHead}>
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
                        // onClick={(e) => handleHashNavigate(e, row.transactionId)}
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

import { FC, useState, useCallback, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

import { useProtocolsStyles } from "src/views/protocols/protocols.styles";
import { SummaryData } from "src/views/shared/summary-data/summary-data.view";
import {
  useProtocolsContext,
  fetchProtocolsListResponseItem,
} from "src/contexts/protocols.context";
import { getCurrentEnvApiUrl } from "src/constants";
import { Icon } from "src/views/shared/icon/icon.view";

// assets
import IconNoData from "src/assets/icon/no-data.svg?react";
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
import { ChainConfig } from "src/assets/chains-config";
import { ProtocolConfig } from "src/assets/protocols-icons";

enum ListDataStatus {
  SUCCESS = "success",
  LOADING = "loading",
  EMPTY = "empty",
}

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
const tableCellsNumber = 8;

export const Protocols: FC = () => {
  const classes = useProtocolsStyles();
  const navigate = useNavigate();
  const { fetchProtocolsList } = useProtocolsContext();

  const [listDataStatus, setListDataStatus] = useState<ListDataStatus>(ListDataStatus.LOADING);
  const [protocolsList, setProtocolsList] = useState<fetchProtocolsListResponseItem[]>([]);

  const apiUrl = getCurrentEnvApiUrl();

  const renderChainsListCell = (chains: ChainConfig[]) => {
    const limitShowLength = 8;
    let extraChainCount = undefined;
    if (chains.length > limitShowLength) {
      extraChainCount = chains.length - limitShowLength;
    }
    return (
      <div className={classes.chainsList}>
        {chains.map((chain) => {
          return <Icon className={classes.chainIcon} isRounded size={16} url={chain.iconUrl} />;
        })}
        {extraChainCount && <div className={classes.extraChainsCount}>+{extraChainCount}</div>}
      </div>
    );
  };

  const handleListStatus = (list: fetchProtocolsListResponseItem[]) => {
    if (list.length > 0) {
      setListDataStatus(ListDataStatus.SUCCESS);
    } else if (list.length === 0) {
      setListDataStatus(ListDataStatus.EMPTY);
    }
  };

  const handleRowClick = (protocol: ProtocolConfig | undefined) => {
    if (!protocol) {
      return;
    }
    navigate(`/protocol/${protocol.name}`);
  };

  const initPageData = useCallback(async () => {
    // const summaryData = await fetchSummaryData({ apiUrl });
    // setSummaryData(summaryData);
    const protocolsListResponse = await fetchProtocolsList({
      apiUrl,
    });
    console.log("protocols initPageData");
    setProtocolsList(protocolsListResponse);
    handleListStatus(protocolsListResponse);
  }, [fetchProtocolsList, apiUrl]); // add messagesList will cause multi-render

  const renderChangeRatio = (baseData: string | undefined, compareData: string | undefined) => {
    if (!baseData || !compareData) {
      return "-";
    }
    const baseDataNumber = parseInt(baseData);
    const compareDataNumber = parseInt(compareData);
    const lastPeriodData = baseDataNumber - compareDataNumber;
    const offset = compareDataNumber - lastPeriodData;
    const ratioFloat = ((offset / baseDataNumber) * 100).toFixed(2);
    const ratioText = `${ratioFloat}%`;
    return (
      <div
        className={`${classes.ratioWrap} ${offset < 0 ? classes.minusRatio : classes.plusRatio}`}
      >
        {ratioText}
      </div>
    );
  };

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  return (
    <div className={classes.protocolsWrap}>
      <SummaryData />
      <div className={classes.tableWrap}>
        <StyledTableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Chains</StyledTableCell>
                <StyledTableCell align="left">24H Change</StyledTableCell>
                <StyledTableCell align="left">7D Change</StyledTableCell>
                <StyledTableCell align="left">24H Massages</StyledTableCell>
                <StyledTableCell align="left">Total Massages</StyledTableCell>
                <StyledTableCell align="left">24H Volume</StyledTableCell>
                <StyledTableCell align="left">Total Volume</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDataStatus === ListDataStatus.SUCCESS &&
                protocolsList.length &&
                protocolsList.map((row) => {
                  // const statusAttr = getStatusDisplay(row.status);
                  // const formatTimeText = calculateRelativeTime(row.time);
                  return (
                    <StyledTableRow
                      onClick={() => handleRowClick(row.protocol)}
                      key={row.protocol?.id}
                    >
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
                        {renderChainsListCell(row.chains)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.changeRate24h}>
                          {renderChangeRatio(row.txCount48h, row.txCount24h)}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.changeRate7d}>
                          {renderChangeRatio(row.txCount14d, row.txCount7d)}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.dataWrap}>
                          {row.txCount24h ? (
                            <CountUp end={parseInt(row.txCount24h)} duration={0} />
                          ) : (
                            "-"
                          )}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.dataWrap}>
                          {row.txCount ? <CountUp end={parseInt(row.txCount)} duration={0} /> : "-"}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.dataWrap}>
                          {row.volumeUSD24h ? (
                            <CountUp end={parseInt(row.volumeUSD24h)} duration={0} />
                          ) : (
                            "-"
                          )}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={classes.dataWrap}>
                          {row.volumeUSD ? (
                            <CountUp end={parseInt(row.volumeUSD)} duration={0} />
                          ) : (
                            "-"
                          )}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {listDataStatus === ListDataStatus.LOADING &&
                new Array(pageSize).fill(undefined).map((item, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell colSpan={tableCellsNumber} align="center">
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
              {listDataStatus === ListDataStatus.EMPTY && !protocolsList.length && (
                <StyledTableRow>
                  <StyledTableCell colSpan={tableCellsNumber} align="center">
                    <div className={classes.noDataTip}>
                      <IconNoData className={classes.noDataIcon} />
                      {/* <p className={classes.tipTitle}>
                        Sorry, We are unable to locate this TxnHash
                      </p> */}
                      <p className={classes.tipContent}>There are no protocols data right now.</p>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        {/* {messagesListMeta && messagesListMeta.itemCount > pageSize && (
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
        )} */}
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import CountUp from "react-countup";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { useNavigate } from "react-router-dom";
import IconPreArrow from "src/assets/icon/pre-arrow.svg?react";
import IconNextArrow from "src/assets/icon/next-arrow.svg?react";

import { SearchSelect } from "src/views/shared/search-select/search-select.view";
import { getCurrentEnvApiUrl } from "src/constants";
import { useMessagesContext } from "src/contexts/messages.context";
import { MessagesListItem } from "src/contexts/messages.context";
import { calculateRelativeTime } from "src/utils";
import { DateValue } from "src/views/shared/search-select/search-select.view";
import { getChainsSearchSelectList, getCurrentEnvChainConfig } from "src/assets/chains-config";
import { MessageListMeta } from "src/adapters/messages-api";
import { useProtocolDetailsStyles } from "src/views/protocol-details/protocol-details.styles";
import { Icon } from "src/views/shared/icon/icon.view";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { getProtocolConfig } from "src/assets/protocols-icons";
import { fetchProtocolChartDataResponse } from "src/contexts/protocols.context";
// assets
import IconNoData from "src/assets/icon/no-data.svg?react";
// Mui table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer, { tableContainerClasses } from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
// Mui pagination
import Pagination from "@mui/material/Pagination";
import PaginationItem, { paginationItemClasses } from "@mui/material/PaginationItem";
// echarts
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  // TooltipComponentOption,
  GridComponent,
  // GridComponentOption,
  LegendComponent,
  // LegendComponentOption,
} from "echarts/components";
import {
  BarChart,
  // BarSeriesOption
} from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useProtocolsContext } from "src/contexts/protocols.context";

echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

// type EChartsOption = echarts.ComposeOption<
//   TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
// >;

enum ListDataStatus {
  SUCCESS = "success",
  LOADING = "loading",
  EMPTY = "empty",
}

interface ProtocolsSearchFrom {
  dateRange: DateValue;
  protocolName: string;
  fromChainId: string;
  toChainId: string;
  // interval: "day" | "hour";
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

const intervalOptionsList = [
  {
    id: "day",
    name: "Day",
    value: "day",
    iconUrl: "",
  },
  {
    id: "hour",
    name: "Hour",
    value: "hour",
    iconUrl: "",
  },
];

export const ProtocolDetails: FC = () => {
  const classes = useProtocolDetailsStyles();
  const navigate = useNavigate();
  const { protocolName } = useParams();
  const { fetchMessagesList } = useMessagesContext();
  const { fetchProtocolChartData } = useProtocolsContext();

  const [listDataStatus, setListDataStatus] = useState<ListDataStatus>(ListDataStatus.LOADING);
  const [chartDataStatus, setChartDataStatus] = useState<ListDataStatus>(ListDataStatus.LOADING);
  const [messagesList, setMessagesList] = useState<MessagesListItem[]>([]);
  const [messagesListMeta, setMessagesListMeta] = useState<MessageListMeta>();
  const [protocolChartData, setProtocolChartData] = useState<fetchProtocolChartDataResponse>({
    charts: [],
    protocol: "",
    txCount: 0,
  });
  const [page, setPage] = useState(1);
  const [searchForm, setSearchForm] = useState<ProtocolsSearchFrom>({
    dateRange: [null, null],
    protocolName: protocolName || "",
    fromChainId: "",
    toChainId: "",
    // interval: "hour",
  });
  const [chartInterval, setChartInterval] = useState<"day" | "hour">("day");
  // const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const isInitialChartLoaded = useRef(false);
  const chart = useRef<echarts.ECharts | null>(null);

  const apiUrl = getCurrentEnvApiUrl();
  const currentProtocolConfig = getProtocolConfig(protocolName);

  const handleAddressClick = (transactionId: string) => {
    if (!transactionId) {
      return;
    }
    // TODO: jump to address or tx hash search page
    // handleHashSearch(transactionId);
  };

  const handleHashNavigate = (e: React.MouseEvent, hash: string) => {
    e.stopPropagation();
    if (!hash) {
      return;
    }
    navigate(`/tx/${hash}`);
  };

  const handleListStatus = (list: MessagesListItem[]) => {
    if (list.length > 0) {
      setListDataStatus(ListDataStatus.SUCCESS);
    } else if (list.length === 0) {
      setListDataStatus(ListDataStatus.EMPTY);
    }
  };

  const getListData = useCallback(async () => {
    // if (!isInitialLoaded) {
    //   return;
    // }
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
      // q: targetHash,
      dateRange: startDateString && endDateString ? [startDateString, endDateString] : [],
      protocol: protocolName ? [protocolName] : [],
      sourceChain: fromChainId ? [fromChainId] : [],
      targetChain: toChainId ? [toChainId] : [],
    });
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
    handleListStatus(messagesListResponse.list);
  }, [searchForm, page, fetchMessagesList, apiUrl]);

  const getProtocolChartData = useCallback(async () => {
    const { dateRange, protocolName, fromChainId, toChainId } = searchForm;
    let startDateString = null;
    let endDateString = null;
    if (Array.isArray(dateRange)) {
      startDateString = dateRange[0] ? dateRange[0].toISOString() : startDateString;
      endDateString = dateRange[1] ? dateRange[1].toISOString() : endDateString;
    }
    setListDataStatus(ListDataStatus.LOADING);
    setChartDataStatus(ListDataStatus.LOADING);
    const protocolChartData = await fetchProtocolChartData({
      // abortSignal,
      apiUrl,
      dateRange: startDateString && endDateString ? [startDateString, endDateString] : [],
      protocol: protocolName,
      sourceChain: fromChainId ? [fromChainId] : [],
      targetChain: toChainId ? [toChainId] : [],
      interval: chartInterval,
    });
    if (protocolChartData.charts.length > 0) {
      setChartDataStatus(ListDataStatus.SUCCESS);
    } else {
      setChartDataStatus(ListDataStatus.EMPTY);
    }
    // console.log(typeof protocolChartData.txCount);
    // setProtocolMessagesCount(999999); // NaN problem
    setProtocolChartData(protocolChartData);
  }, [apiUrl, fetchProtocolChartData, searchForm, chartInterval]);

  const getCachedCurretEnvChainSeriesDataTemplate = useMemo(() => {
    const getCurretEnvChainSeriesDataTemplate = () => {
      const currentEnvChainConfig = getCurrentEnvChainConfig();
      const seriesDataTemplate: Array<{
        name: string;
        id: string;
        type: string;
        stack: string;
        emphasis: { focus: string };
        data: number[];
      }> = [];
      currentEnvChainConfig.forEach((chainConfig) => {
        const { name, id } = chainConfig;
        seriesDataTemplate.push({
          name,
          id,
          type: "bar",
          stack: "count",
          emphasis: {
            focus: "series",
          },
          data: [],
        });
      });
      return seriesDataTemplate;
    };

    return getCurretEnvChainSeriesDataTemplate();
  }, []);

  const resetSearchForm = () => {
    // setMessagesList([]);
    // setMessagesListMeta(undefined);
    // setTargetHash(undefined);
    setSearchForm({
      dateRange: [null, null],
      protocolName: "",
      fromChainId: "",
      toChainId: "",
    });
    setChartInterval("day");
  };

  const handlePaginationChange = async (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    getListData();
  };

  const handleSetSearchForm = useCallback(
    (formData: ProtocolsSearchFrom) => {
      setSearchForm(formData);
    },
    [setSearchForm],
  );

  const renderChart = useCallback(() => {
    if (protocolChartData.charts.length === 0) {
      return;
    }
    if (!chart.current) {
      const chartDom = document.getElementById("protocol-chart");
      chart.current = echarts.init(chartDom);
    }
    const xAxiasObject = {
      type: "category",
      data: [""],
      nameTextStyle: {
        color: "#666",
        fontSize: 14,
      },
      axisLabel: {
        formatter: function (value: any) {
          // const formatRule =
          //   searchForm.interval === "day" ? "DD MMMM" : "DD MMMM YYYY, HH:mm";
          const formatRule = "DD MMMM";
          const filteredDate = dayjs.utc(value).format(formatRule);
          return filteredDate;
        },
      },
      axisTick: {
        show: false,
      },
    };
    const seriesData = getCachedCurretEnvChainSeriesDataTemplate;
    xAxiasObject.data = []; // walk around for ts check: string cannot assign to never
    protocolChartData.charts.forEach((charItem) => {
      // 1. create xAxis array
      xAxiasObject.data.push(charItem.timeValue);
      // 2. fill the chain at every date's count data
      seriesData.forEach((chainSerie) => {
        if (charItem.items) {
          const currentChainSerieData = charItem.items.find(
            (chainTxCountItem) => chainSerie.id === chainTxCountItem.chainId,
          );
          if (currentChainSerieData) {
            chainSerie.data.push(currentChainSerieData.txCount);
          } else {
            chainSerie.data.push(0);
          }
        }
      });
    });

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params: any) {
          const formatRule = chartInterval === "day" ? "DD MMMM YYYY" : "DD MMMM YYYY, HH:mm";
          const dateText = dayjs.utc(params[0].axisValue).format(formatRule);
          let totalTx = 0;

          params.forEach((item: any) => {
            totalTx += Number(item.value);
          });
          return `<div style="font-size:12px">
              <div style="margin-bottom:4px;">${dateText}</div>
              <div style="margin-bottom:4px;">Total messages: ${totalTx}</div>
              <div style="margin-bottom:4px">Chains</div>
              <div style="display:flex;flex-direction:column;">
                ${params
                  .map((v: any) => {
                    return `
                      <div style="display:flex;margin-bottom:0px;justify-content:space-between;">
                        <div style="display:flex;align-items: center;">
                          <div style="width:12px;height:12px;margin-right:8px;background-color:${
                            v.color
                          }"></div>
                          ${v.seriesName}
                        </div>
                        <div>${v.value}</div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>`;
        },
      },
      legend: {
        left: "30px",
        textStyle: {
          color: "#757575",
          fontSize: 12,
        },
        itemHeight: 10,
        itemWidth: 10,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [xAxiasObject],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: true, // yAxis split line
            lineStyle: {
              type: "dashed",
              color: "rgba(255, 255, 255, 0.12)",
              width: 1,
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: seriesData,
    };

    chart.current.setOption(option);
  }, [chartInterval, protocolChartData.charts, getCachedCurretEnvChainSeriesDataTemplate]);

  const initProtocolChart = useCallback(async () => {
    if (!protocolName) {
      return;
    }
    const protocolChartData = await fetchProtocolChartData({
      apiUrl,
      dateRange: [],
      protocol: protocolName,
      sourceChain: [],
      targetChain: [],
      interval: "day",
    });
    setProtocolChartData(protocolChartData);
    isInitialChartLoaded.current = true;
    if (protocolChartData.charts.length > 0) {
      setChartDataStatus(ListDataStatus.SUCCESS);
    } else {
      setChartDataStatus(ListDataStatus.EMPTY);
    }
  }, [apiUrl, protocolName, fetchProtocolChartData]);

  const initPageData = useCallback(async () => {
    if (!protocolName) {
      return;
    }
    const messagesListResponse = await fetchMessagesList({
      apiUrl,
      page: initialPage,
      pageSize,
      dateRange: [],
      protocol: [protocolName],
      sourceChain: [],
      targetChain: [],
    });
    setMessagesList(messagesListResponse.list);
    setMessagesListMeta(messagesListResponse.meta);
    handleListStatus(messagesListResponse.list);
  }, [fetchMessagesList, protocolName, apiUrl]); // add messagesList will cause multi-render

  useEffect(() => {
    initPageData();
    initProtocolChart();
  }, [initPageData, initProtocolChart]);

  useEffect(() => {
    if (isInitialChartLoaded.current) {
      // not initial loaded, only searchForm change loaded
      getListData();
      getProtocolChartData();
    }
  }, [searchForm, getListData, getProtocolChartData]);

  useEffect(() => {
    if (isInitialChartLoaded.current) {
      // not initial loaded, only searchForm change loaded
      getProtocolChartData();
    }
  }, [chartInterval, getProtocolChartData]);

  useEffect(() => {
    renderChart();
  }, [protocolChartData, renderChart]);

  // useEffect(() => {
  //   const initData = async () => {
  //     await initPageData(); // init page data
  //     await initProtocolChart(); // init chart data
  //   };

  //   initData();
  // }, []); // only run at mounted

  // // 更新数据的 useEffect
  // useEffect(() => {
  //   if (isInitialLoaded) {
  //     // make sure just run after first init
  //     getListData(); // get list data
  //     getProtocolChartData(); // get chart data
  //   }
  // }, [searchForm, isInitialLoaded]);

  // useEffect(() => {
  //   console.log("search from change...");
  // }, [searchForm]);

  // console.log("render numberForCountUp");
  // const numberForCountUp = parseInt(protocolChartData.txCount.toString());

  // const isChartHidden = protocolChartData.charts.length === 0;

  return (
    <div className={classes.protocolDetailsWrap}>
      {currentProtocolConfig && (
        <div className={classes.protocolIntroWrap}>
          <Icon
            className={classes.protocolIcon}
            isRounded
            size={52}
            url={currentProtocolConfig.iconUrl}
          />
          <div className={classes.protocolInfo}>
            <div className={classes.protocolNameWrap}>
              <h2 className={classes.protocolName}>{currentProtocolConfig.name}</h2>
              {currentProtocolConfig.links.map((link, index) => {
                return (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    className={classes.socialMediaIcon}
                  >
                    <Icon isRounded size={16} url={link.linkLogo} />
                  </a>
                );
              })}
            </div>
            <p className={classes.protocolIntroText}>{currentProtocolConfig.introduction}</p>
          </div>
        </div>
      )}
      <div className={classes.chartSection}>
        <div className={classes.searchRow}>
          <div className={`${classes.serachRowItem} ${classes.rowItemMessages}`}>
            <span className={classes.serachRowItemLabel}>Messages</span>
            <span>
              {protocolChartData.txCount > 0 ? (
                <CountUp end={protocolChartData.txCount} duration={0.1} />
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className={`${classes.serachRowItem} ${classes.rowItemDate}`}>
            <SearchSelect
              label="Date"
              type="date"
              direction="column"
              formData={searchForm}
              formKey="dateRange"
              setFormData={handleSetSearchForm}
            />
          </div>
          <div className={`${classes.serachRowItem} ${classes.rowItemChain}`}>
            <SearchSelect
              label="From"
              type="list"
              direction="column"
              listData={getChainsSearchSelectList()}
              formData={searchForm}
              formKey="fromChainId"
              setFormData={handleSetSearchForm}
            />
          </div>
          <div className={`${classes.serachRowItem} ${classes.rowItemChain}`}>
            <SearchSelect
              label="To"
              type="list"
              direction="column"
              listData={getChainsSearchSelectList()}
              formData={searchForm}
              formKey="toChainId"
              setFormData={handleSetSearchForm}
            />
          </div>
          <div className={classes.serachRowItem}>
            <SearchSelect
              label="Interval"
              type="list"
              direction="column"
              listData={intervalOptionsList}
              value={chartInterval}
              setValue={setChartInterval}
            />
          </div>
          {/* <button onClick={resetSearchForm}>reset</button> */}
        </div>
        <div className={classes.chartContainerWrap}>
          <div
            className={`${classes.chartContainer} ${chartDataStatus !== ListDataStatus.SUCCESS ? classes.hiddenClass : ""}`}
            id="protocol-chart"
          ></div>
          {chartDataStatus === ListDataStatus.EMPTY && (
            <div className={`${classes.chartNoDataWrap}`}>No data available</div>
          )}
          {chartDataStatus === ListDataStatus.LOADING && (
            <div className={classes.chartLoading}>Loading...</div>
          )}
        </div>
      </div>
      <div className={classes.protocolMessagesList}>
        <div className={classes.listTitle}>Live Massages</div>
        <div className={classes.tableWrap}>
          <StyledTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Status</StyledTableCell>
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

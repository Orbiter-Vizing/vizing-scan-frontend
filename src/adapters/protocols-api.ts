import axios from "axios";
interface GetProtocolsListParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  page?: number; // start as 1
  pageSize?: number;
}

// export interface Datum {
//   chains: string;
//   protocol: string;
//   txCount: string;
//   txCount14d: string;
//   txCount24h?: string;
//   txCount48h?: string;
//   txCount7d: string;
//   volumeUSD: string;
//   volumeUSD14d: string;
//   volumeUSD24h?: string;
//   volumeUSD48h?: string;
//   volumeUSD7d: string;
//   [property: string]: any;
// }

interface GetProtocolsListOutput {
  chains: string;
  protocol: string;
  txCount: string;
  txCount14d: string;
  txCount24h?: string;
  txCount48h?: string;
  txCount7d: string;
  volumeUSD: string;
  volumeUSD14d: string;
  volumeUSD24h?: string;
  volumeUSD48h?: string;
  volumeUSD7d: string;
}

export const getProtocolsList = ({
  abortSignal,
  apiUrl,
}: GetProtocolsListParams): Promise<GetProtocolsListOutput[]> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {},
      method: "GET",
      signal: abortSignal,
      url: "analytics/protocol/list",
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get protocols list error.");
      }
    });
};

export enum IntervalOptions {
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
}

interface GetProtocolChartDataParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  dateRange?: [string, string] | [];
  protocol: string;
  sourceChain?: [string] | [];
  targetChain?: [string] | [];
  interval?: IntervalOptions;
}

interface GetProtocolChartDataOutput {
  charts: ProtocolChartItem[];
  protocol: string;
  txCount: number;
}

interface chainTxCountItem {
  chainId: string;
  txCount: number;
}

export interface ProtocolChartItem {
  items?: chainTxCountItem[];
  timeAt: string;
  timeValue: string;
}

export const getProtocolChartData = ({
  abortSignal,
  apiUrl,
  dateRange,
  protocol,
  sourceChain,
  targetChain,
  interval,
}: GetProtocolChartDataParams): Promise<GetProtocolChartDataOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {
        dateRange,
        protocol,
        sourceChain,
        targetChain,
        interval,
        version: import.meta.env.VITE_APP_VERSION,
      },
      method: "POST",
      signal: abortSignal,
      url: "analytics/protocol/charts",
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get protocol chart data error.");
      }
    });
};

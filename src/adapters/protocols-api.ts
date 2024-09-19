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
      console.log("getProtocolsList res", res);
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get protocols list error.");
      }
    });
};

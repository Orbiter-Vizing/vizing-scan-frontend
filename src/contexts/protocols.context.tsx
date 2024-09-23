import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo } from "react";

import { getProtocolChartData, getProtocolsList } from "src/adapters/protocols-api";
import { getProtocolConfig } from "src/assets/protocols-icons";
import { ChainConfig, getCurrentEnvChainConfig } from "src/assets/chains-config";
import { ProtocolConfig } from "src/assets/protocols-icons";
import { ProtocolChartItem } from "src/adapters/protocols-api";

interface fetchProtocolsListParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  page?: number; // start as 1
  pageSize?: number;
}

export interface fetchProtocolsListResponseItem {
  chains: ChainConfig[];
  protocol: ProtocolConfig | undefined;
  txCount: string;
  txCount14d: string;
  txCount24h?: string;
  txCount48h?: string;
  txCount7d: string;
  volumeUSD: string;
  // volumeUSD14d: string;
  volumeUSD24h?: string;
  // volumeUSD48h?: string;
  // volumeUSD7d: string;
}

interface fetchProtocolChartDataParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  dateRange?: [string, string] | [];
  protocol: string;
  sourceChain?: [string] | [];
  targetChain?: [string] | [];
  interval?: "day" | "hour";
}

export interface fetchProtocolChartDataResponse {
  charts: ProtocolChartItem[];
  protocol: string;
  txCount: number;
}

interface ProtocolsContextType {
  fetchProtocolsList: (
    params: fetchProtocolsListParams,
  ) => Promise<fetchProtocolsListResponseItem[]>;
  fetchProtocolChartData: (
    params: fetchProtocolChartDataParams,
  ) => Promise<fetchProtocolChartDataResponse>;
}

const messagesContextNotReadyErrorMsg = "The messages context is not yet ready";

const protocolsContext = createContext<ProtocolsContextType>({
  fetchProtocolsList: () => {
    return Promise.reject(messagesContextNotReadyErrorMsg);
  },
  fetchProtocolChartData: () => {
    return Promise.reject(messagesContextNotReadyErrorMsg);
  },
});

const ProtocolsProvider: FC<PropsWithChildren> = (props) => {
  const fetchProtocolsList = useCallback(
    async ({
      apiUrl,
      page,
      pageSize,
    }: fetchProtocolsListParams): Promise<fetchProtocolsListResponseItem[]> => {
      console.log("fetchProtocolsList call");
      const apiRes = await getProtocolsList({
        apiUrl,
        page,
        pageSize,
      });
      // const protocolConfig = getProtocolConfig(dApp);
      // const currentEnvChainList = getCurrentEnvChainConfig();
      const filteredResponseList = apiRes.map((protocolsListitem) => {
        const {
          chains,
          protocol,
          txCount,
          txCount14d,
          txCount24h,
          txCount48h,
          txCount7d,
          volumeUSD,
          // volumeUSD14d,
          volumeUSD24h,
          // volumeUSD48h,
          // volumeUSD7d,
        } = protocolsListitem;
        const protocolConfig = getProtocolConfig(protocol);
        // get chains current protocol supported
        const currentEnvChainList = getCurrentEnvChainConfig();
        const chainIdList = chains.split(",");
        const chainsCurrentProtocolSupported: ChainConfig[] = [];
        currentEnvChainList.forEach((chain) => {
          if (chainIdList.indexOf(chain.id) >= 0) {
            return chainsCurrentProtocolSupported.push(chain);
          }
        });
        // const sourceChainConfig = currentEnvChainList.find((chain) => {
        //   return chain.id === sourceChain;
        // });
        // const destChainConfig = currentEnvChainList.find((chain) => {
        //   return chain.id === targetChain;
        // });
        const newItem: fetchProtocolsListResponseItem = {
          protocol: protocolConfig,
          chains: chainsCurrentProtocolSupported,
          txCount,
          txCount7d,
          txCount14d,
          txCount24h,
          txCount48h,
          volumeUSD,
          volumeUSD24h,
          // chains: ChainConfig[];
          // protocol: ProtocolConfig;
          // // txCount: string;
          // txCount14d: string;
          // txCount24h?: string;
          // txCount48h?: string;
          // txCount7d: string;
        };
        return newItem;
      });
      return filteredResponseList;
    },
    [],
  );

  const fetchProtocolChartData = useCallback(
    async ({
      abortSignal,
      apiUrl,
      dateRange,
      protocol,
      sourceChain,
      targetChain,
      interval,
    }: fetchProtocolChartDataParams): Promise<fetchProtocolChartDataResponse> => {
      const apiRes = await getProtocolChartData({
        abortSignal,
        apiUrl,
        dateRange,
        protocol,
        sourceChain,
        targetChain,
        interval,
      });
      return apiRes;
    },
    [],
  );

  const value = useMemo(
    () => ({
      fetchProtocolsList,
      fetchProtocolChartData,
    }),
    [fetchProtocolsList, fetchProtocolChartData],
  );

  return <protocolsContext.Provider value={value} {...props} />;
};

const useProtocolsContext = (): ProtocolsContextType => {
  return useContext(protocolsContext);
};

export { ProtocolsProvider, useProtocolsContext };

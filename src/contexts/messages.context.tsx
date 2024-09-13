import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo } from "react";

import {
  getMessagesSummary,
  getMessagesList,
  getMessageDetails,
  MessageListMeta,
} from "src/adapters/messages-api";
import { getProtocolConfig, ProtocolConfig } from "src/assets/protocols-icons";
import { getCurrentEnvChainConfig } from "src/assets/chains-config";
import { ChainConfig } from "src/assets/chains-config";
import IconVizingColorful from "src/assets/icon/chains-colorful/vizing.svg";

interface fetchSummaryDataParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
}

interface fetchMessagesListParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  page?: number; // start as 1
  pageSize?: number;
  q?: string; // keyword search (transactionId or sourceAddress or sourceHash)
  dateRange?: [string, string] | [];
  protocol?: [string] | [];
  sourceChain?: [string] | [];
  targetChain?: [string] | [];
}

interface fetchMessagesDetailsParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  id: string;
}

interface summaryDataCard {
  id: string;
  data: string | undefined;
  prefix: string;
  name: string;
}

export interface MessagesListItem {
  status: number; // 99 success 98 confirming 0 landing
  nonce: string;
  from: string;
  sourceTxHash: string;
  destTxHash: string;
  transactionId: string;
  sourceChain: ChainConfig | undefined;
  destChain: ChainConfig | undefined;
  protocol: ProtocolConfig | undefined;
  time: string;
}

interface ProcessPeriod {
  chain: ChainConfig | undefined;
  processContent: string;
}

export interface ProcessInfo {
  source: ProcessPeriod;
  middle: ProcessPeriod;
  destination: ProcessPeriod;
}

export interface DetailInfoData {
  chain: ChainConfig | undefined;
  status: "landing" | "success";
  blockNumber: string;
  txHash: string;
  nonce: string;
  createdTimestamp: string;
  amountValue: string;
  symbol: string;
  dapp: ProtocolConfig | undefined;
}

export interface BottomInfo {
  from: string;
  fee: string;
  message: string;
}

interface fetchMessageDetailsResponse {
  process: ProcessInfo;
  source: DetailInfoData;
  destination: DetailInfoData;
  bottomInfo: BottomInfo;
}

interface MessagesContextType {
  defaultSummaryData: summaryDataCard[];
  fetchSummaryData: (params: fetchSummaryDataParams) => Promise<summaryDataCard[]>;
  fetchMessagesList: (params: fetchMessagesListParams) => Promise<MessagesListResponse>;
  fetchMessageDetails: (params: fetchMessagesDetailsParams) => Promise<fetchMessageDetailsResponse>;
}

interface MessagesListResponse {
  list: MessagesListItem[];
  meta: MessageListMeta;
}

const messagesContextNotReadyErrorMsg = "The messages context is not yet ready";

const messagesContext = createContext<MessagesContextType>({
  defaultSummaryData: [],
  fetchSummaryData: () => {
    return Promise.reject(messagesContextNotReadyErrorMsg);
  },
  fetchMessagesList: () => {
    return Promise.reject(messagesContextNotReadyErrorMsg);
  },
  fetchMessageDetails: () => {
    return Promise.reject(messagesContextNotReadyErrorMsg);
  },
});

const MessagesProvider: FC<PropsWithChildren> = (props) => {
  const defaultSummaryData = useMemo(
    () => [
      {
        id: "total-messages",
        data: undefined,
        prefix: "",
        name: "Total Messages",
      },
      {
        id: "landing-massages",
        data: undefined,
        prefix: "",
        name: "Landing Massages",
      },
      {
        id: "volum",
        data: undefined,
        prefix: "$",
        name: "Volum(24h)",
      },
      {
        id: "networks",
        data: undefined,
        prefix: "",
        name: "Networks",
      },
      {
        id: "protocols",
        data: undefined,
        prefix: "",
        name: "Protocols",
      },
    ],
    [],
  );

  const fetchSummaryData = useCallback(
    async ({ apiUrl }: fetchSummaryDataParams): Promise<summaryDataCard[]> => {
      const apiRes = await getMessagesSummary({
        apiUrl,
      });
      const response = [
        {
          id: "total-messages",
          data: apiRes.totalMessages,
          prefix: "",
          name: "Total Messages",
        },
        {
          id: "landing-massages",
          data: apiRes.landingMessages,
          prefix: "",
          name: "Landing Massages",
        },
        {
          id: "volum",
          data: apiRes.volume,
          prefix: "$",
          name: "Volum(24h)",
        },
        {
          id: "networks",
          data: apiRes.networks,
          prefix: "",
          name: "Networks",
        },
        {
          id: "protocols",
          data: apiRes.protocols,
          prefix: "",
          name: "Protocols",
        },
      ];

      return response;
    },
    [],
  );

  const fetchMessagesList = useCallback(
    async ({
      apiUrl,
      page,
      pageSize,
      q,
      dateRange,
      protocol,
      sourceChain,
      targetChain,
    }: fetchMessagesListParams): Promise<MessagesListResponse> => {
      const apiRes = await getMessagesList({
        apiUrl,
        page,
        pageSize,
        q,
        dateRange,
        protocol,
        sourceChain,
        targetChain,
      });
      console.log("messages context apiRes", apiRes);
      const currentEnvChainList = getCurrentEnvChainConfig();
      const filteredResponseList = apiRes.list.map((messagesListitem) => {
        const {
          status, // 99 success 98 confirming 0 landing
          sourceNonce,
          dApp,
          sourceAddress,
          sourceChain,
          targetHash,
          transactionId,
          sourceTime,
          sourceHash,
          targetChain,
        } = messagesListitem;
        const protocolConfig = getProtocolConfig(dApp);
        const sourceChainConfig = currentEnvChainList.find((chain) => {
          return chain.id === sourceChain;
        });
        const destChainConfig = currentEnvChainList.find((chain) => {
          return chain.id === targetChain;
        });
        const newItem: MessagesListItem = {
          status,
          transactionId,
          nonce: sourceNonce,
          time: sourceTime,
          sourceTxHash: sourceHash,
          destTxHash: targetHash,
          sourceChain: sourceChainConfig,
          destChain: destChainConfig,
          from: sourceAddress,
          protocol: protocolConfig,
        };
        return newItem;
      });
      const response = {
        list: filteredResponseList,
        meta: apiRes.meta,
      };
      return response;
    },
    [],
  );

  const fetchMessageDetails = useCallback(
    async ({ apiUrl, id }: fetchMessagesDetailsParams): Promise<fetchMessageDetailsResponse> => {
      const apiRes = await getMessageDetails({
        apiUrl,
        id,
      });
      console.log("details apiRes", apiRes);
      const { message, source, destination } = apiRes;
      const currentEnvChainList = getCurrentEnvChainConfig();
      const protocolConfig = getProtocolConfig(message.dApp);
      const sourceChainConfig = currentEnvChainList.find((chain) => {
        return chain.id === source.chainId;
      });
      const destChainConfig = currentEnvChainList.find((chain) => {
        return chain.id === destination.chainId;
      });
      const process = {
        source: {
          chain: sourceChainConfig,
          processContent: message.sourceHash,
        },
        middle: {
          chain: {
            value: "vizing",
            name: "Vizing Pad",
            iconUrl: IconVizingColorful,
            iconUrlColorful: IconVizingColorful,
            id: "vizing",
            explorerUrl: "",
          },
          processContent: "",
        },
        destination: {
          chain: destChainConfig,
          processContent: message.targetHash,
        },
      };
      const sourceInfo: DetailInfoData = {
        chain: sourceChainConfig,
        status: "landing",
        blockNumber: source.blockNumber,
        txHash: source.transactionHash,
        nonce: source.nonce,
        createdTimestamp: source.timestamp,
        amountValue: source.amount,
        symbol: source.symbol,
        dapp: protocolConfig,
      };
      const destinationInfo: DetailInfoData = {
        chain: destChainConfig,
        status: "landing",
        blockNumber: destination.blockNumber,
        txHash: destination.transactionHash,
        nonce: destination.nonce,
        createdTimestamp: destination.timestamp,
        amountValue: destination.amount,
        symbol: destination.symbol,
        dapp: protocolConfig,
      };
      const bottomInfo: BottomInfo = {
        from: message.sourceAddress,
        fee: message.withholdingFee,
        message: message.label.message,
      };
      return {
        process,
        source: sourceInfo,
        destination: destinationInfo,
        bottomInfo,
      };
    },
    [],
  );

  const value = useMemo(
    () => ({
      fetchSummaryData,
      fetchMessagesList,
      defaultSummaryData,
      fetchMessageDetails,
    }),
    [fetchSummaryData, fetchMessagesList, defaultSummaryData, fetchMessageDetails],
  );

  return <messagesContext.Provider value={value} {...props} />;
};

const useMessagesContext = (): MessagesContextType => {
  return useContext(messagesContext);
};

export { MessagesProvider, useMessagesContext };

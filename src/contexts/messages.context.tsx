import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo } from "react";

import { getMessagesSummary, getMessagesList, getMessageDetails } from "src/adapters/messages-api";
import { getProtocolConfig } from "src/assets/protocols-icons";
import { getCurrentEnvChainConfig } from "src/assets/chains-config";
import { ChainConfig } from "src/assets/chains-config";
import IconBob from "src/assets/icon/chains/BOB.svg";

interface fetchSummaryDataParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
}

interface fetchMessagesListParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  page: number; // start as 1
  pageSize: number;
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
  sourceChain: ChainConfig | undefined;
  destChain: ChainConfig | undefined;
  protocol: {
    iconUrl: string;
    protocolName: string;
  };
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
  dapp: {
    iconUrl: string;
    protocolName: string;
  };
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
  fetchMessagesList: (params: fetchMessagesListParams) => Promise<MessagesListItem[]>;
  fetchMessageDetails: (params: fetchMessagesDetailsParams) => Promise<fetchMessageDetailsResponse>;
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
    async ({ apiUrl, page, pageSize }: fetchMessagesListParams): Promise<MessagesListItem[]> => {
      const apiRes = await getMessagesList({
        apiUrl,
        page,
        pageSize,
      });
      const currentEnvChainList = getCurrentEnvChainConfig();
      const response = apiRes.list.map((messagesListitem) => {
        const {
          status, // 99 success 98 confirming 0 landing
          sourceNonce,
          dApp,
          id,
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
          nonce: sourceNonce,
          time: sourceTime,
          sourceTxHash: sourceHash,
          destTxHash: targetHash,
          sourceChain: sourceChainConfig,
          destChain: destChainConfig,
          from: sourceAddress,
          protocol: {
            iconUrl: protocolConfig.iconUrl,
            protocolName: protocolConfig.name,
          },
        };
        return newItem;
      });
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
            key: "vizing",
            name: "Vizing Pad",
            icon: IconBob,
            id: "vizing",
          },
          processContent: "Confirmations",
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
        dapp: {
          iconUrl: protocolConfig.iconUrl,
          protocolName: protocolConfig.name,
        },
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
        dapp: {
          iconUrl: protocolConfig.iconUrl,
          protocolName: protocolConfig.name,
        },
      };
      const bottomInfo: BottomInfo = {
        from: message.sourceAddress,
        fee: message.withholdingFee,
        message:
          "0x6abd4ea7000000000000000000000000000000000000000000000000000000000000004000000000000000000000000053323e9be41473e747001cde9076e6a2c29c1b3e000000000000000000000000000000000000000000000000000000000000000a4d8da06627275ca6eb617f89818a9841828922bd12f6b4cd301222040e180e67801490d6403b4af03a4dd1b41d8e756f79b1b3ab7885518090d2530aa298d160dfbf363d67e72837a77f1e04cea3c5ae4ae263d398e91fc4c717cee4cc96238a3a64f2ed292959bbc50195731afaaaa348fbbe84319b0e8d49d33070c2477de2bc63f6e17ba5ab8cd2378861ffab9f7e3af36b92dfd0fe856a55be2ddf39572dc4f31f84386e201cbd4c4bb62b7317978fb45aac94bac11148ac8bc7e4bcf0ffb47aea11af8267dcb9798c9f16bf392264605459fcf3956144ff79af267ca08e7338e9e01fc008284ae5c5335a1c0ea5436e550c7b883e3a391ab2879bd05dbf03ad09457638ed899d886caf1161151321402cd1988804e711a25f92b8096e8dd02209c3b18b6a4207e2080b123385ee428a67d64e4d497e3a07a174db7d3944",
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

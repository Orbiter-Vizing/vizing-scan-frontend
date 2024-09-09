import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo } from "react";

import { getMessagesSummary, getMessagesList } from "src/adapters/messages-api";
import { getProtocolConfig } from "src/assets/protocols-icons";
import { getCurrentEnvChainConfig } from "src/assets/chains-config";
import { ChainConfig } from "src/assets/chains-config";

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

interface MessagesContextType {
  defaultSummaryData: summaryDataCard[];
  fetchSummaryData: (params: fetchSummaryDataParams) => Promise<summaryDataCard[]>;
  fetchMessagesList: (params: fetchMessagesListParams) => Promise<MessagesListItem[]>;
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

  const value = useMemo(
    () => ({
      fetchSummaryData,
      fetchMessagesList,
      defaultSummaryData,
    }),
    [fetchSummaryData, fetchMessagesList, defaultSummaryData],
  );

  return <messagesContext.Provider value={value} {...props} />;
};

const useMessagesContext = (): MessagesContextType => {
  return useContext(messagesContext);
};

export { MessagesProvider, useMessagesContext };

import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo } from "react";

import { getMessagesSummary } from "src/adapters/messages-api";

interface fetchSummaryDataParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
}

interface summaryDataCard {
  id: string;
  data: string | undefined;
  prefix: string;
  name: string;
}

interface MessagesContextType {
  defaultSummaryData: summaryDataCard[];
  fetchSummaryData: (params: fetchSummaryDataParams) => Promise<summaryDataCard[]>;
}

const messagesContextNotReadyErrorMsg = "The messages context is not yet ready";

const messagesContext = createContext<MessagesContextType>({
  defaultSummaryData: [],
  fetchSummaryData: () => {
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

  const value = useMemo(
    () => ({
      fetchSummaryData,
      defaultSummaryData,
    }),
    [fetchSummaryData, defaultSummaryData],
  );

  return <messagesContext.Provider value={value} {...props} />;
};

const useMessagesContext = (): MessagesContextType => {
  return useContext(messagesContext);
};

export { MessagesProvider, useMessagesContext };

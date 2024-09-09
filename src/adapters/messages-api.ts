import axios from "axios";

import { ProtocolKeys } from "src/assets/protocols-icons";

interface PushBridgeInfoParams {
  abortSignal?: AbortSignal;
  amount: string;
  apiUrl: string;
  destinationAddress: string;
  detinationNetwork: number;
  originAddress: string;
  originNetwork: number;
  txHash: string;
}

export const pushBridgeInfo = ({
  abortSignal,
  amount,
  apiUrl,
  destinationAddress,
  detinationNetwork,
  originAddress,
  originNetwork,
  txHash,
}: PushBridgeInfoParams): Promise<number> => {
  return axios.request({
    baseURL: apiUrl,
    data: {
      amount: amount,
      dest_addr: destinationAddress,
      dest_net: detinationNetwork,
      orig_addr: originAddress,
      orig_net: originNetwork,
      tx_hash: txHash,
    },
    method: "POST",
    signal: abortSignal,
    url: "/push-bridge",
  });
};

interface GetMessagesSummaryParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
}

interface MessagesSummaryOutput {
  totalMessages: string;
  landingMessages: string;
  networks: string;
  protocols: string;
  volume: string; // "1543533.909317470000000000"
  volume24h: number; // 105.19027988
}

interface GetMessagesListParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  page: number;
  pageSize: number;
}

export interface ApiMessagesListItem {
  dApp: ProtocolKeys;
  id: string;
  sourceAddress: string;
  sourceChain: string;
  sourceHash: string;
  sourceNonce: string;
  sourceTime: string;
  status: number; // 99 success 98 confirming 0 landing
  targetChain: string;
  targetHash: string;
  transactionId: string;
}

export interface MessageListMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  pageSize: number;
}

interface GetMessageListOutput {
  list: ApiMessagesListItem[];
  meta: MessageListMeta;
}

export const getMessagesSummary = ({
  abortSignal,
  apiUrl,
}: GetMessagesSummaryParams): Promise<MessagesSummaryOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {},
      method: "GET",
      signal: abortSignal,
      url: "analytics/messages/summary",
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("get messages summary error");
      }
    });
};

export const getMessagesList = ({
  abortSignal,
  apiUrl,
  page,
  pageSize,
}: GetMessagesListParams): Promise<GetMessageListOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {
        page,
        pageSize,
      },
      method: "POST",
      signal: abortSignal,
      url: "analytics/messages/list",
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        throw new Error("get messages list error");
      }
    });
};

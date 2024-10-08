import axios from "axios";

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
  volume: string;
  volume24h: number;
}

interface GetMessagesListParams {
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

export interface ApiMessagesListItem {
  dApp: string;
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
        throw new Error("Get messages summary error.");
      }
    });
};

export const getMessagesList = ({
  abortSignal,
  apiUrl,
  page, // start as 1
  pageSize,
  q,
  dateRange,
  protocol,
  sourceChain,
  targetChain,
}: GetMessagesListParams): Promise<GetMessageListOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {
        page,
        pageSize,
        q,
        dateRange,
        protocol,
        sourceChain,
        targetChain,
      },
      method: "POST",
      signal: abortSignal,
      url: "analytics/messages/list",
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        throw new Error("Get messages list error.");
      }
    });
};

interface GetMessageDetailsParams {
  abortSignal?: AbortSignal;
  apiUrl: string;
  id: string;
}

interface Label {
  additionParams: string;
  count: number;
  destChainId: string;
  earliestArrivalTimestamp: string;
  flag: string;
  latestArrivalTimestamp: string;
  message: string;
  messageId: string;
  nonce: string;
  relayer: string;
  sender: string;
  srcContract: string;
  value: string;
}

interface Message {
  dApp: string;
  id: string;
  label: Label;
  sourceAddress: string;
  sourceChain: string;
  sourceHash: string;
  sourceNonce: string;
  sourceTime: string;
  status: number;
  targetChain: string;
  targetHash: string;
  transactionId: string;
  withholdingFee: string;
}

interface Source {
  amount: string;
  blockNumber: string;
  chainId: string;
  id: string;
  nonce: string;
  opStatus: number;
  receiver: string;
  sender: string;
  symbol: string;
  timestamp: string;
  transactionHash: string;
  value: string;
}

interface Destination {
  amount: string;
  blockNumber: string;
  chainId: string;
  id: string;
  nonce: string;
  opStatus: number;
  receiver: string;
  sender: string;
  symbol: string;
  timestamp: string;
  transactionHash: string;
  value: string;
}

export interface GetMessageDetailsOutput {
  message: Message;
  source: Source | undefined;
  destination: Destination | undefined;
}

export const getMessageDetails = ({
  abortSignal,
  apiUrl,
  id,
}: GetMessageDetailsParams): Promise<GetMessageDetailsOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {},
      method: "GET",
      signal: abortSignal,
      url: `analytics/messages/detail/${id}`,
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get tx details error.");
      }
    });
};

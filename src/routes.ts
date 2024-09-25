export type RouteId =
  | "messages"
  | "txDetails"
  | "protocols"
  | "protocolDetails"
  | "addressTxList"
  | "txHubList";

export const routes: {
  [P in RouteId]: {
    id: P;
    isPrivate: boolean;
    path: string;
    text: string;
  };
} = {
  messages: {
    id: "messages",
    isPrivate: false,
    path: "/",
    text: "Messages",
  },
  txDetails: {
    id: "txDetails",
    isPrivate: false,
    path: "/tx/:hashId",
    text: "Transaction Details",
  },
  protocols: {
    id: "protocols",
    isPrivate: false,
    path: "/protocols",
    text: "Protocols",
  },
  protocolDetails: {
    id: "protocolDetails",
    isPrivate: false,
    path: "/protocol/:protocolName",
    text: "Protocol Detail",
  },
  addressTxList: {
    id: "addressTxList",
    isPrivate: false,
    path: "/address/:address",
    text: "Address Tx List",
  },
  txHubList: {
    id: "txHubList",
    isPrivate: false,
    path: "/txhub/:txHash",
    text: "Transaction Hub List",
  },
};

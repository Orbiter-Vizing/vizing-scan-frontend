export type RouteId = "messages" | "txDetails" | "protocols";
// | "analytics"
// | "tools"
// | "statistics";

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
  // analytics: {
  //   id: "analytics",
  //   isPrivate: false,
  //   path: "/analytics",
  //   text: "Analytics",
  // },
  // tools: {
  //   id: "tools",
  //   isPrivate: false,
  //   path: "/tools",
  //   text: "Tools",
  // },
  // statistics: {
  //   id: "statistics",
  //   isPrivate: false,
  //   path: "/statistics",
  //   text: "Statistics",
  // },
};

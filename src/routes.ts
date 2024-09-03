export type RouteId = "messages" | "protocols" | "analytics" | "tools" | "statistics";

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
    path: "/messages",
    text: "Messages",
  },
  protocols: {
    id: "protocols",
    isPrivate: false,
    path: "/protocols",
    text: "Protocols",
  },
  analytics: {
    id: "analytics",
    isPrivate: false,
    path: "/analytics",
    text: "Analytics",
  },
  tools: {
    id: "tools",
    isPrivate: false,
    path: "/tools",
    text: "Tools",
  },
  statistics: {
    id: "statistics",
    isPrivate: false,
    path: "/statistics",
    text: "Statistics",
  },
};

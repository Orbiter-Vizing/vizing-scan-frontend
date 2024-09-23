// import { fetchProtocolChartDataResponse } from "src/contexts/protocols.context";

interface ChainTxCount {
  chainId: string;
  count: number;
}

interface ChartItem {
  protocol: string;
  chainsTxCount: ChainTxCount[];
  timeAt: string;
  timeValue: string;
}

export interface MockChartData {
  charts: ChartItem[];
  txCount: number;
}

export const mockChartData: MockChartData = {
  charts: [
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 2,
        },
        {
          chainId: "421614", // arbitrum
          count: 12,
        },
        {
          chainId: "84532", // base
          count: 8,
        },
      ],
      timeAt: "20240524",
      timeValue: "2024-05-24T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 5,
        },
        {
          chainId: "421614", // arbitrum
          count: 10,
        },
        {
          chainId: "84532", // base
          count: 6,
        },
      ],
      timeAt: "20240525",
      timeValue: "2024-05-25T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 10,
        },
        {
          chainId: "421614", // arbitrum
          count: 20,
        },
        {
          chainId: "84532", // base
          count: 6,
        },
      ],
      timeAt: "20240527",
      timeValue: "2024-05-27T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        // {
        //   chainId: "28516", // vizing
        //   count: 10,
        // },
        {
          chainId: "421614", // arbitrum
          count: 20,
        },
        {
          chainId: "84532", // base
          count: 6,
        },
      ],
      timeAt: "20240530",
      timeValue: "2024-05-30T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 10,
        },
        {
          chainId: "421614", // arbitrum
          count: 20,
        },
        {
          chainId: "84532", // base
          count: 6,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 6,
        },
        {
          chainId: "421614", // arbitrum
          count: 5,
        },
        {
          chainId: "84532", // base
          count: 1,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
    {
      protocol: "OVTA",
      chainsTxCount: [
        {
          chainId: "28516", // vizing
          count: 20,
        },
        {
          chainId: "421614", // arbitrum
          count: 16,
        },
        {
          chainId: "84532", // base
          count: 9,
        },
      ],
      timeAt: "20240601",
      timeValue: "2024-06-01T00:00:00.000Z",
    },
  ],
  txCount: 134590,
};

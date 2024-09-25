import { getCurrentEnvChainConfig } from "src/assets/chains-config";

type SeriesData = Array<{
  name: string;
  id: string;
  type: string;
  stack: string;
  emphasis: { focus: string };
  data: number[];
}>;

interface SeriesDataMapInterface {
  development: SeriesData;
  test: SeriesData;
  production: SeriesData;
}

const seriesDataMap: SeriesDataMapInterface = {
  development: [],
  test: [
    {
      name: "Vizing",
      id: "28516",
      type: "bar",
      stack: "count",
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "Arbitrum",
      id: "421614",
      type: "bar",
      stack: "count",
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "Base",
      id: "84532",
      type: "bar",
      stack: "count",
      emphasis: {
        focus: "series",
      },
      data: [],
    },
  ],
  production: [],
};

export const getCurretEnvChainSeriesDataTemplate = () => {
  const currentEnvChainConfig = getCurrentEnvChainConfig();
  const seriesDataTemplate: Array<{
    name: string;
    id: string;
    type: string;
    stack: string;
    emphasis: { focus: string };
    data: number[];
  }> = [];
  currentEnvChainConfig.forEach((chainConfig) => {
    const { name, id } = chainConfig;
    seriesDataTemplate.push({
      name,
      id,
      type: "bar",
      stack: "count",
      emphasis: {
        focus: "series",
      },
      data: [],
    });
  });
  return seriesDataTemplate;
};

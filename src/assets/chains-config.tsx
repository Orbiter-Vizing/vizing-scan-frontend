import { EnvMode } from "src/constants";
// assets
import IconArbitrum from "src/assets/icon/chains/ArbitrumOne.svg";
import IconEthereum from "src/assets/icon/chains/Ethereum.svg";
import IconBase from "src/assets/icon/chains/Base.svg";
import IconLinea from "src/assets/icon/chains/Linea.svg";
import IconScroll from "src/assets/icon/chains/Scroll.svg";
import IconOptimism from "src/assets/icon/chains/Optimism.svg";
import IconPolygon from "src/assets/icon/chains/Polygon.svg";
import IconBlast from "src/assets/icon/chains/Blast.svg";
import IconTaiko from "src/assets/icon/chains/Taiko.svg";
import IconBOB from "src/assets/icon/chains/BOB.svg";

export interface ChainConfigInterface {
  development: ChainConfig[];
  production: ChainConfig[];
  test: ChainConfig[];
}

export interface ChainConfig {
  value: string;
  name: string;
  iconUrl: string;
  id: string;
}

export const ChainsConfigMap: ChainConfigInterface = {
  development: [],
  production: [],
  test: [
    {
      value: "421614",
      name: "arbitrum",
      iconUrl: IconArbitrum,
      id: "421614",
    },
    {
      value: "11155111",
      name: "ethereum",
      iconUrl: IconEthereum,
      id: "11155111",
    },
    {
      value: "84532",
      name: "base",
      iconUrl: IconBase,
      id: "84532",
    },
    {
      value: "59141",
      name: "linea",
      iconUrl: IconLinea,
      id: "59141",
    },
    {
      value: "534351",
      name: "scroll",
      iconUrl: IconScroll,
      id: "534351",
    },
    {
      value: "11155420",
      name: "optimism",
      iconUrl: IconOptimism,
      id: "11155420",
    },
    {
      value: "2442",
      name: "polygon",
      iconUrl: IconPolygon,
      id: "2442",
    },
    {
      value: "168587773",
      name: "blast",
      iconUrl: IconBlast,
      id: "168587773",
    },
    {
      value: "167009",
      name: "taiko",
      iconUrl: IconTaiko,
      id: "167009",
    },
    {
      value: "111",
      name: "bob",
      iconUrl: IconBOB,
      id: "111",
    },
    {
      value: "28516",
      name: "Vizing",
      iconUrl: IconBOB,
      id: "28516",
    },
  ],
};

export const getCurrentEnvChainConfig = () => {
  const envString = import.meta.env.MODE as EnvMode;
  return ChainsConfigMap[envString];
};

export const getChainsSearchSelectList = () => {
  const envString = import.meta.env.MODE as EnvMode;
  const currentEnvConfigList = [...ChainsConfigMap[envString]];
  currentEnvConfigList.unshift({
    id: "all",
    name: "All",
    value: "",
    iconUrl: "",
  });
  return currentEnvConfigList;
};

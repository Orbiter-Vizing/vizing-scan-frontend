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
  key: string;
  name: string;
  icon: string;
  id: string;
}

export const ChainsConfigMap: ChainConfigInterface = {
  development: [],
  production: [],
  test: [
    {
      key: "arbitrum",
      name: "arbitrum",
      icon: IconArbitrum,
      id: "421614",
    },
    {
      key: "ethereum",
      name: "ethereum",
      icon: IconEthereum,
      id: "11155111",
    },
    {
      key: "base",
      name: "base",
      icon: IconBase,
      id: "84532",
    },
    {
      key: "linea",
      name: "linea",
      icon: IconLinea,
      id: "59141",
    },
    {
      key: "scroll",
      name: "scroll",
      icon: IconScroll,
      id: "534351",
    },
    {
      key: "optimism",
      name: "optimism",
      icon: IconOptimism,
      id: "11155420",
    },
    {
      key: "polygon",
      name: "polygon",
      icon: IconPolygon,
      id: "2442",
    },
    {
      key: "blast",
      name: "blast",
      icon: IconBlast,
      id: "168587773",
    },
    {
      key: "taiko",
      name: "taiko",
      icon: IconTaiko,
      id: "167009",
    },
    {
      key: "bob",
      name: "bob",
      icon: IconBOB,
      id: "111",
    },
    {
      key: "vizing",
      name: "Vizing",
      icon: IconBOB,
      id: "28516",
    },
  ],
};

export const getCurrentEnvChainConfig = () => {
  const envString = import.meta.env.MODE as EnvMode;
  return ChainsConfigMap[envString];
};

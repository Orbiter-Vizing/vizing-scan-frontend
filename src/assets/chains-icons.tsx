import IconArbitrum from "src/assets/icon/chains/ArbitrumOne.svg?react";
import IconEthereum from "src/assets/icon/chains/Ethereum.svg";
import IconBase from "src/assets/icon/chains/Base.svg";
import IconLinea from "src/assets/icon/chains/Linea.svg";
import IconScroll from "src/assets/icon/chains/Scroll.svg";
import IconOptimism from "src/assets/icon/chains/Optimism.svg";
import IconPolygon from "src/assets/icon/chains/Polygon.svg";
import IconBlast from "src/assets/icon/chains/Blast.svg";
import IconTaiko from "src/assets/icon/chains/Taiko.svg";
import IconBOB from "src/assets/icon/chains/BOB.svg";

export const chainsConfigList = [
  {
    key: "arbitrum",
    name: "arbitrum",
    icon: IconArbitrum,
  },
  {
    key: "ethereum",
    name: "ethereum",
    icon: IconEthereum,
  },
  {
    key: "base",
    name: "base",
    icon: IconBase,
  },
  {
    key: "linea",
    name: "linea",
    icon: IconLinea,
  },
  {
    key: "scroll",
    name: "scroll",
    icon: IconScroll,
  },
  {
    key: "optimism",
    name: "optimism",
    icon: IconOptimism,
  },
  {
    key: "polygon",
    name: "polygon",
    icon: IconPolygon,
  },
  {
    key: "blast",
    name: "blast",
    icon: IconBlast,
  },
  {
    key: "taiko",
    name: "taiko",
    icon: IconTaiko,
  },
  {
    key: "bob",
    name: "bob",
    icon: IconBOB,
  },
];

export type ChainsConfigListKeys = keyof typeof chainsConfigList;

export const getChainConfig = (chainKey: ChainsConfigListKeys) => {
  return chainsConfigList[chainKey];
};

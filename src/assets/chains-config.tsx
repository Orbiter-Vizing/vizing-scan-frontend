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
import IconVizing from "src/assets/icon/chains/vizing.svg";
import IconBNB from "src/assets/icon/chains/BNBChain.svg";
import IconZksyncEra from "src/assets/icon/chains/zkSyncEra.svg";
// chain icon colorful
import IconColorfulArbitrum from "src/assets/icon/chains-colorful/arbitrum.svg";
import IconColorfulEthereum from "src/assets/icon/chains-colorful/ethereum.svg";
import IconColorfulBase from "src/assets/icon/chains-colorful/base.svg";
import IconColorfulLinea from "src/assets/icon/chains-colorful/linea.svg";
import IconColorfulScroll from "src/assets/icon/chains-colorful/scroll.svg";
import IconColorfulOptimism from "src/assets/icon/chains-colorful/optimism.svg";
import IconColorfulPolygon from "src/assets/icon/chains-colorful/polygon.svg";
import IconColorfulBlast from "src/assets/icon/chains-colorful/blast.svg";
import IconColorfulTaiko from "src/assets/icon/chains-colorful/taiko.svg";
import IconColorfulBOB from "src/assets/icon/chains-colorful/bob.svg";
import IconColorfulVizing from "src/assets/icon/chains-colorful/vizing.svg";
import IconColorfulBNB from "src/assets/icon/chains-colorful/bnb-chain.svg";
import IconColorfulZksyncEra from "src/assets/icon/chains-colorful/zksync-era.svg";

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
  iconUrlColorful: string;
  explorerUrl: string;
  chartColor: string;
}

export const ChainsConfigMap: ChainConfigInterface = {
  development: [
    {
      value: "421614",
      name: "Arbitrum",
      iconUrl: IconArbitrum,
      id: "421614",
      iconUrlColorful: IconColorfulArbitrum,
      explorerUrl: "https://sepolia.arbiscan.io",
      chartColor: "#576FC7",
    },
    {
      value: "11155111",
      name: "Ethereum",
      iconUrl: IconEthereum,
      id: "11155111",
      iconUrlColorful: IconColorfulEthereum,
      explorerUrl: "https://sepolia.etherscan.io",
      chartColor: "#91CC74",
    },
    {
      value: "84532",
      name: "Base",
      iconUrl: IconBase,
      id: "84532",
      iconUrlColorful: IconColorfulBase,
      explorerUrl: "https://sepolia.basescan.org",
      chartColor: "#FBC858",
    },
    {
      value: "59141",
      name: "Linea",
      iconUrl: IconLinea,
      id: "59141",
      iconUrlColorful: IconColorfulLinea,
      explorerUrl: "https://sepolia.lineascan.build",
      chartColor: "#EF6668",
    },
    {
      value: "534351",
      name: "Scroll",
      iconUrl: IconScroll,
      id: "534351",
      iconUrlColorful: IconColorfulScroll,
      explorerUrl: "https://sepolia.scrollscan.com",
      chartColor: "#73c0de",
    },
    {
      value: "11155420",
      name: "Optimism",
      iconUrl: IconOptimism,
      id: "11155420",
      iconUrlColorful: IconColorfulOptimism,
      explorerUrl: "https://sepolia-optimism.etherscan.io",
      chartColor: "#3ba272",
    },
    {
      value: "2442",
      name: "Polygon zkEVM",
      iconUrl: IconPolygon,
      id: "2442",
      iconUrlColorful: IconColorfulPolygon,
      explorerUrl: "https://cardona-zkevm.polygonscan.com",
      chartColor: "#FD8453",
    },
    {
      value: "168587773",
      name: "Blast",
      iconUrl: IconBlast,
      id: "168587773",
      iconUrlColorful: IconColorfulBlast,
      explorerUrl: "https://sepolia.blastscan.io",
      chartColor: "#9a60b4",
    },
    {
      value: "167009",
      name: "Taiko",
      iconUrl: IconTaiko,
      id: "167009",
      iconUrlColorful: IconColorfulTaiko,
      explorerUrl: "https://hekla.taikoscan.network",
      chartColor: "#ea7ccc",
    },
    {
      value: "111",
      name: "BOB",
      iconUrl: IconBOB,
      id: "111",
      iconUrlColorful: IconColorfulBOB,
      explorerUrl: "https://testnet-explorer.gobob.xyz",
      chartColor: "#686789",
    },
    {
      value: "28516",
      name: "Vizing",
      iconUrl: IconVizing,
      id: "28516",
      iconUrlColorful: IconColorfulVizing,
      explorerUrl: "https://explorer-sepolia.vizing.com",
      chartColor: "#ab545a",
    },
    {
      value: "56",
      name: "BNB Chain",
      iconUrl: IconBNB,
      id: "56",
      iconUrlColorful: IconColorfulBNB,
      explorerUrl: "https://bscscan.com",
      chartColor: "#d89c7a",
    },
    {
      value: "324",
      name: "Zksync Era",
      iconUrl: IconZksyncEra,
      id: "324",
      iconUrlColorful: IconColorfulZksyncEra,
      explorerUrl: "https://explorer.zksync.io",
      chartColor: "#d1d5db",
    },
  ],
  production: [
    {
      value: "42161",
      name: "Arbitrum",
      iconUrl: IconArbitrum,
      id: "42161",
      iconUrlColorful: IconColorfulArbitrum,
      explorerUrl: "https://arbiscan.io",
      chartColor: "#576FC7",
    },
    {
      value: "1",
      name: "Ethereum",
      iconUrl: IconEthereum,
      id: "1",
      iconUrlColorful: IconColorfulEthereum,
      explorerUrl: "https://etherscan.io",
      chartColor: "#91CC74",
    },
    {
      value: "8453",
      name: "Base",
      iconUrl: IconBase,
      id: "8453",
      iconUrlColorful: IconColorfulBase,
      explorerUrl: "https://basescan.org",
      chartColor: "#FBC858",
    },
    {
      value: "59144",
      name: "Linea",
      iconUrl: IconLinea,
      id: "59144",
      iconUrlColorful: IconColorfulLinea,
      explorerUrl: "https://lineascan.build",
      chartColor: "#EF6668",
    },
    {
      value: "534352",
      name: "Scroll",
      iconUrl: IconScroll,
      id: "534352",
      iconUrlColorful: IconColorfulScroll,
      explorerUrl: "https://scrollscan.com",
      chartColor: "#73c0de",
    },
    {
      value: "10",
      name: "Optimism",
      iconUrl: IconOptimism,
      id: "10",
      iconUrlColorful: IconColorfulOptimism,
      explorerUrl: "https://optimistic.etherscan.io",
      chartColor: "#3ba272",
    },
    {
      value: "1101",
      name: "Polygon zkEVM",
      iconUrl: IconPolygon,
      id: "1101",
      iconUrlColorful: IconColorfulPolygon,
      explorerUrl: "https://polygonscan.com",
      chartColor: "#FD8453",
    },
    {
      value: "81457",
      name: "Blast",
      iconUrl: IconBlast,
      id: "81457",
      iconUrlColorful: IconColorfulBlast,
      explorerUrl: "https://blastexplorer.io",
      chartColor: "#9a60b4",
    },
    {
      value: "167000",
      name: "Taiko",
      iconUrl: IconTaiko,
      id: "167000",
      iconUrlColorful: IconColorfulTaiko,
      explorerUrl: "https://taikoscan.io",
      chartColor: "#ea7ccc",
    },
    {
      value: "60808",
      name: "BOB",
      iconUrl: IconBOB,
      id: "60808",
      iconUrlColorful: IconColorfulBOB,
      explorerUrl: "https://explorer.gobob.xyz",
      chartColor: "#686789",
    },
    {
      value: "28518",
      name: "Vizing",
      iconUrl: IconVizing,
      id: "28518",
      iconUrlColorful: IconColorfulVizing,
      explorerUrl: "https://explorer.vizing.com",
      chartColor: "#ab545a",
    },
    {
      value: "56",
      name: "BNB Chain",
      iconUrl: IconBNB,
      id: "56",
      iconUrlColorful: IconColorfulBNB,
      explorerUrl: "https://bscscan.com",
      chartColor: "#d89c7a",
    },
    {
      value: "324",
      name: "Zksync Era",
      iconUrl: IconZksyncEra,
      id: "324",
      iconUrlColorful: IconColorfulZksyncEra,
      explorerUrl: "https://explorer.zksync.io",
      chartColor: "#d1d5db",
    },
  ],
  test: [
    {
      value: "421614",
      name: "Arbitrum",
      iconUrl: IconArbitrum,
      id: "421614",
      iconUrlColorful: IconColorfulArbitrum,
      explorerUrl: "https://sepolia.arbiscan.io",
      chartColor: "#576FC7",
    },
    {
      value: "11155111",
      name: "Ethereum",
      iconUrl: IconEthereum,
      id: "11155111",
      iconUrlColorful: IconColorfulEthereum,
      explorerUrl: "https://sepolia.etherscan.io",
      chartColor: "#91cc75",
    },
    {
      value: "84532",
      name: "Base",
      iconUrl: IconBase,
      id: "84532",
      iconUrlColorful: IconColorfulBase,
      explorerUrl: "https://sepolia.basescan.org",
      chartColor: "#FBC858",
    },
    {
      value: "59141",
      name: "Linea",
      iconUrl: IconLinea,
      id: "59141",
      iconUrlColorful: IconColorfulLinea,
      explorerUrl: "https://sepolia.lineascan.build",
      chartColor: "#EF6668",
    },
    {
      value: "534351",
      name: "Scroll",
      iconUrl: IconScroll,
      id: "534351",
      iconUrlColorful: IconColorfulScroll,
      explorerUrl: "https://sepolia.scrollscan.com",
      chartColor: "#73c0de",
    },
    {
      value: "11155420",
      name: "Optimism",
      iconUrl: IconOptimism,
      id: "11155420",
      iconUrlColorful: IconColorfulOptimism,
      explorerUrl: "https://sepolia-optimism.etherscan.io",
      chartColor: "#3ba272",
    },
    {
      value: "2442",
      name: "Polygon zkEVM",
      iconUrl: IconPolygon,
      id: "2442",
      iconUrlColorful: IconColorfulPolygon,
      explorerUrl: "https://cardona-zkevm.polygonscan.com",
      chartColor: "#FD8453",
    },
    {
      value: "168587773",
      name: "Blast",
      iconUrl: IconBlast,
      id: "168587773",
      iconUrlColorful: IconColorfulBlast,
      explorerUrl: "https://sepolia.blastscan.io",
      chartColor: "#9a60b4",
    },
    {
      value: "167009",
      name: "Taiko",
      iconUrl: IconTaiko,
      id: "167009",
      iconUrlColorful: IconColorfulTaiko,
      explorerUrl: "https://hekla.taikoscan.network",
      chartColor: "#ea7ccc",
    },
    {
      value: "111",
      name: "BOB",
      iconUrl: IconBOB,
      id: "111",
      iconUrlColorful: IconColorfulBOB,
      explorerUrl: "https://testnet-explorer.gobob.xyz",
      chartColor: "#686789",
    },
    {
      value: "28516",
      name: "Vizing",
      iconUrl: IconVizing,
      id: "28516",
      iconUrlColorful: IconColorfulVizing,
      explorerUrl: "https://explorer-sepolia.vizing.com",
      chartColor: "#ab545a",
    },
    {
      value: "56",
      name: "BNB Chain",
      iconUrl: IconBNB,
      id: "56",
      iconUrlColorful: IconColorfulBNB,
      explorerUrl: "https://bscscan.com",
      chartColor: "#d89c7a",
    },
    {
      value: "324",
      name: "Zksync Era",
      iconUrl: IconZksyncEra,
      id: "324",
      iconUrlColorful: IconColorfulZksyncEra,
      explorerUrl: "https://explorer.zksync.io",
      chartColor: "#d1d5db",
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
    name: "All Networks",
    value: "",
    iconUrl: "",
    iconUrlColorful: "",
    explorerUrl: "",
    chartColor: "",
  });
  return currentEnvConfigList;
};

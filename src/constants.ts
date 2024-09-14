// export const apiUrl = "https://testnet-analytics-api.vizing.com";

export type EnvMode = "development" | "test" | "production";

export const evmTxHashLength = 66;
export const evmAddressLength = 42;

const envConfig = {
  development: {
    apiUrl: "https://testnet-analytics-api.vizing.com",
  },
  test: {
    apiUrl: "https://testnet-analytics-api.vizing.com",
  },
  production: {
    apiUrl: "https://openapi.vizing.com/analytics/",
  },
};

export const getCurrentEnvApiUrl = () => {
  const envString = import.meta.env.MODE as EnvMode;
  return envConfig[envString].apiUrl;
};

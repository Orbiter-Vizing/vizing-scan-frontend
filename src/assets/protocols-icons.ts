import { EnvMode } from "src/constants";
// assets
import LogoOvta from "src/assets/icon/protocols/logo_0xAstra.png";
import LogoLikwid from "src/assets/icon/protocols/logo_likwid.png";
import LogoAylab from "src/assets/icon/protocols/logo_aylab.png";
import Logo0xAstra from "src/assets/icon/protocols/logo_0xAstra.png";
import logoBullishs from "src/assets/icon/protocols/logo_bullishs.png";
import logoColorProtocol from "src/assets/icon/protocols/logo_color_protocol.png";
import logoPink from "src/assets/icon/protocols/logo_pink.png";
import logoXmint from "src/assets/icon/protocols/logo_xmint.png";
import logoAABank from "src/assets/icon/protocols/logo_aabank.png";
import logoOrbiter from "src/assets/icon/protocols/logo_orbiter.png";

export interface ProtocolConfigInterface {
  development: ProtocolConfig[];
  production: ProtocolConfig[];
  test: ProtocolConfig[];
}

export interface ProtocolConfig {
  id: string;
  name: string;
  value: string;
  iconUrl: string;
}

export const ProtocolsConfigMap: ProtocolConfigInterface = {
  development: [],
  production: [],
  test: [
    {
      id: "0xAstra",
      name: "0xAstra",
      iconUrl: Logo0xAstra,
      value: "0xAstra",
    },
    {
      id: "Likwid",
      name: "Likwid",
      iconUrl: LogoLikwid,
      value: "Likwid",
    },
    {
      id: "AABank",
      name: "AABank",
      iconUrl: logoAABank,
      value: "AABank",
    },
    {
      id: "Aylab",
      name: "Aylab",
      iconUrl: LogoAylab,
      value: "Aylab",
    },
    {
      id: "Bullishs",
      name: "Bullishs",
      iconUrl: logoBullishs,
      value: "Bullishs",
    },
    {
      id: "ColorProtocol",
      name: "Color Protocol",
      iconUrl: logoColorProtocol,
      value: "Color Protocol",
    },
    {
      id: "Pink",
      name: "Pink",
      iconUrl: logoPink,
      value: "Pink",
    },
    {
      id: "Xmint",
      name: "Xmint",
      iconUrl: logoXmint,
      value: "Xmint",
    },
    {
      id: "dApp9",
      name: "dApp9",
      iconUrl: logoAABank,
      value: "dApp9",
    },
    {
      id: "OVTA",
      name: "OVTA",
      iconUrl: LogoOvta,
      value: "OVTA",
    },
    {
      id: "OribterBridge",
      name: "Oribter Bridge",
      iconUrl: logoOrbiter,
      value: "Oribter Bridge",
    },
    {
      id: "Early",
      name: "Early",
      iconUrl: logoOrbiter,
      value: "Early",
    },
  ],
};

export const getProtocolConfig = (protocolName: string) => {
  const envString = import.meta.env.MODE as EnvMode;
  const result = ProtocolsConfigMap[envString].find((protocol) => {
    return protocol.name === protocolName;
  });
  return result;
};

export const getCurrentEnvProtocolList = () => {
  const envString = import.meta.env.MODE as EnvMode;
  return ProtocolsConfigMap[envString];
};

export const getProtocolsSearchSelectList = () => {
  const envString = import.meta.env.MODE as EnvMode;
  const currentEnvConfigList = [...ProtocolsConfigMap[envString]];
  currentEnvConfigList.unshift({
    id: "all",
    name: "All",
    value: "",
    iconUrl: "",
  });
  return currentEnvConfigList;
};

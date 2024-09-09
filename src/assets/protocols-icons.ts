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

export const protocolsConfigList = {
  dApp1: {
    name: "0xAstra",
    iconUrl: Logo0xAstra,
  },
  dApp2: {
    name: "Likwid",
    iconUrl: LogoLikwid,
  },
  dApp3: {
    name: "AABank",
    iconUrl: logoAABank,
  },
  dApp4: {
    name: "Aylab",
    iconUrl: LogoAylab,
  },
  dApp5: {
    name: "Bullishs",
    iconUrl: logoBullishs,
  },
  dApp6: {
    name: "Color Protocol",
    iconUrl: logoColorProtocol,
  },
  dApp7: {
    name: "Pink",
    iconUrl: logoPink,
  },
  dApp8: {
    name: "Xmint",
    iconUrl: logoXmint,
  },
  dApp9: {
    name: "dApp9",
    iconUrl: logoAABank,
  },
  OVTA: {
    name: "OVTA",
    iconUrl: LogoOvta,
  },
  OribterBridge: {
    name: "Oribter Bridge",
    iconUrl: logoOrbiter,
  },
  Early: {
    name: "Early",
    iconUrl: logoOrbiter,
  },
};

export type ProtocolKeys = keyof typeof protocolsConfigList;

export const getProtocolConfig = (protocolId: ProtocolKeys) => {
  return protocolsConfigList[protocolId];
};

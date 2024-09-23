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
import logoVizingBridge from "src/assets/icon/protocols/logo_vizing_bridge.png";
import IconTwitter from "src/assets/icon/social-media/twitter.svg";
import IconDiscord from "src/assets/icon/social-media/discord.svg";

export interface ProtocolConfigInterface {
  development: ProtocolConfig[];
  production: ProtocolConfig[];
  test: ProtocolConfig[];
}

type Link = {
  linkLogo: string;
  link: string;
};

export interface ProtocolConfig {
  id: string;
  name: string;
  value: string;
  iconUrl: string;
  links: Link[];
  introduction: string;
}

export const ProtocolsConfigMap: ProtocolConfigInterface = {
  development: [
    {
      id: "0xAstra",
      name: "0xAstra",
      iconUrl: Logo0xAstra,
      value: "0xAstra",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "The Omnichain SLG Game. Mine, Craft, Build, and Battle in the wild Astra  Season 1 is Ongoing",
    },
    {
      id: "Likwid",
      name: "Likwid",
      iconUrl: LogoLikwid,
      value: "Likwid",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "AABank",
      name: "AABank",
      iconUrl: logoAABank,
      value: "AABank",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "AAbank is an Omni-Chain interactive application platform build on Vizing.",
    },
    {
      id: "Aylab",
      name: "Aylab",
      iconUrl: LogoAylab,
      value: "Aylab",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "A platform empowering web3 projects with decentralised user acquisition",
    },
    {
      id: "Bullishs",
      name: "Bullishs",
      iconUrl: logoBullishs,
      value: "Bullishs",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "The First Seamless Transaction Tech in Omni Layer2 Cross-Rollup Game. Play to earn Airdrop.",
    },
    {
      id: "ColorProtocol",
      name: "Color Protocol",
      iconUrl: logoColorProtocol,
      value: "Color Protocol",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "MemecoinFi Protocol: convert your memecoins from ERC20 standard into BC-404.",
    },
    {
      id: "Pink",
      name: "Pink",
      iconUrl: logoPink,
      value: "Pink",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "The First Fair Launch Meme on Taiko",
    },
    {
      id: "Xmint",
      name: "Xmint",
      iconUrl: logoXmint,
      value: "Xmint",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "X-Mint is a cross-chain asset issuance platform that provides a one-stop issuance service for equity and RWA NFTs.",
    },
    {
      id: "OVTA",
      name: "OVTA",
      iconUrl: LogoOvta,
      value: "OVTA",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "Experience the world of onchain dApps that put you in complete control starting with the self-managed OKX Wallet. Engagement ≠ endorsement.",
    },
    {
      id: "OribterBridge",
      name: "OribterBridge",
      iconUrl: logoOrbiter,
      value: "Oribter Bridge",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "Orbiter Finance is a ZK-tech-based instant omni rollup on Ethereum, delivering secure, efficient, and decentralized data communication services.",
    },
    {
      id: "Early",
      name: "Early",
      iconUrl: logoOrbiter,
      value: "Early",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp1",
      name: "dApp1",
      iconUrl: logoAABank,
      value: "dApp1",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp2",
      name: "dApp2",
      iconUrl: logoAABank,
      value: "dApp2",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp3",
      name: "dApp3",
      iconUrl: logoAABank,
      value: "dApp3",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp4",
      name: "dApp4",
      iconUrl: logoAABank,
      value: "dApp4",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp5",
      name: "dApp5",
      iconUrl: logoAABank,
      value: "dApp5",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp6",
      name: "dApp6",
      iconUrl: logoAABank,
      value: "dApp6",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp7",
      name: "dApp7",
      iconUrl: logoAABank,
      value: "dApp7",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp8",
      name: "dApp8",
      iconUrl: logoAABank,
      value: "dApp8",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp9",
      name: "dApp9",
      iconUrl: logoAABank,
      value: "dApp9",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "unknown",
      name: "unknown",
      iconUrl: logoAABank,
      value: "unknown",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
  ],
  production: [
    {
      id: "AABank",
      name: "AABank",
      iconUrl: logoAABank,
      value: "AABank",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/aabank_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "",
        },
      ],
      introduction: "AAbank is an Omni-Chain interactive application platform build on Vizing.",
    },
    {
      id: "Likwid",
      name: "Likwid",
      iconUrl: LogoLikwid,
      value: "Likwid",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/LIKWID_MEME",
        },
        {
          linkLogo: IconDiscord,
          link: "",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "XMint",
      name: "XMint",
      iconUrl: logoXmint,
      value: "XMint",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/XMint_official",
        },
        {
          linkLogo: IconDiscord,
          link: "",
        },
      ],
      introduction:
        "X-Mint is a cross-chain asset issuance platform that provides a one-stop issuance service for equity and RWA NFTs.",
    },
    {
      id: "VizingBridge",
      name: "VizingBridge",
      iconUrl: logoVizingBridge,
      value: "VizingBridge",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/vizing_l2",
        },
        {
          linkLogo: IconDiscord,
          link: "",
        },
      ],
      introduction:
        "Vizing is a cutting-edge omni interoperability environment built on advanced zk technology, the one-stop cross-chain communication framework by Orbiter, designed to provide a faster, more affordable, and safer roaming experience within the Ethereum ecosystem.",
    },
    {
      id: "0xAstra",
      name: "0xAstra",
      iconUrl: Logo0xAstra,
      value: "0xAstra",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "",
        },
      ],
      introduction:
        "The Omnichain SLG Game. Mine, Craft, Build, and Battle in the wild Astra  Season 1 is Ongoing",
    },
    {
      id: "ColorProtocol",
      name: "Color Protocol",
      iconUrl: logoColorProtocol,
      value: "Color Protocol",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/Color_BC404",
        },
        {
          linkLogo: IconDiscord,
          link: "",
        },
      ],
      introduction: "MemecoinFi Protocol: convert your memecoins from ERC20 standard into BC-404.",
    },
  ],
  test: [
    {
      id: "0xAstra",
      name: "0xAstra",
      iconUrl: Logo0xAstra,
      value: "0xAstra",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "The Omnichain SLG Game. Mine, Craft, Build, and Battle in the wild Astra  Season 1 is Ongoing",
    },
    {
      id: "Likwid",
      name: "Likwid",
      iconUrl: LogoLikwid,
      value: "Likwid",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "AABank",
      name: "AABank",
      iconUrl: logoAABank,
      value: "AABank",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "AAbank is an Omni-Chain interactive application platform build on Vizing.",
    },
    {
      id: "Aylab",
      name: "Aylab",
      iconUrl: LogoAylab,
      value: "Aylab",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "A platform empowering web3 projects with decentralised user acquisition",
    },
    {
      id: "Bullishs",
      name: "Bullishs",
      iconUrl: logoBullishs,
      value: "Bullishs",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "The First Seamless Transaction Tech in Omni Layer2 Cross-Rollup Game. Play to earn Airdrop.",
    },
    {
      id: "ColorProtocol",
      name: "Color Protocol",
      iconUrl: logoColorProtocol,
      value: "Color Protocol",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "MemecoinFi Protocol: convert your memecoins from ERC20 standard into BC-404.",
    },
    {
      id: "Pink",
      name: "Pink",
      iconUrl: logoPink,
      value: "Pink",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "The First Fair Launch Meme on Taiko",
    },
    {
      id: "Xmint",
      name: "Xmint",
      iconUrl: logoXmint,
      value: "Xmint",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "X-Mint is a cross-chain asset issuance platform that provides a one-stop issuance service for equity and RWA NFTs.",
    },
    {
      id: "OVTA",
      name: "OVTA",
      iconUrl: LogoOvta,
      value: "OVTA",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "Experience the world of onchain dApps that put you in complete control starting with the self-managed OKX Wallet. Engagement ≠ endorsement.",
    },
    {
      id: "OribterBridge",
      name: "OribterBridge",
      iconUrl: logoOrbiter,
      value: "Oribter Bridge",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction:
        "Orbiter Finance is a ZK-tech-based instant omni rollup on Ethereum, delivering secure, efficient, and decentralized data communication services.",
    },
    {
      id: "Early",
      name: "Early",
      iconUrl: logoOrbiter,
      value: "Early",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp1",
      name: "dApp1",
      iconUrl: logoAABank,
      value: "dApp1",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp2",
      name: "dApp2",
      iconUrl: logoAABank,
      value: "dApp2",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp3",
      name: "dApp3",
      iconUrl: logoAABank,
      value: "dApp3",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp4",
      name: "dApp4",
      iconUrl: logoAABank,
      value: "dApp4",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp5",
      name: "dApp5",
      iconUrl: logoAABank,
      value: "dApp5",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp6",
      name: "dApp6",
      iconUrl: logoAABank,
      value: "dApp6",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp7",
      name: "dApp7",
      iconUrl: logoAABank,
      value: "dApp7",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp8",
      name: "dApp8",
      iconUrl: logoAABank,
      value: "dApp8",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "dApp9",
      name: "dApp9",
      iconUrl: logoAABank,
      value: "dApp9",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
    {
      id: "unknown",
      name: "unknown",
      iconUrl: logoAABank,
      value: "unknown",
      links: [
        {
          linkLogo: IconTwitter,
          link: "https://x.com/0xAstra_xyz",
        },
        {
          linkLogo: IconDiscord,
          link: "https://x.com/0xAstra_xyz",
        },
      ],
      introduction: "An omnichain meme platform with custom price curves",
    },
  ],
};

export const getProtocolConfig = (protocolName: string | undefined) => {
  if (!protocolName) {
    return;
  }
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
    name: "All Protocol",
    value: "",
    iconUrl: "",
    links: [
      {
        linkLogo: IconTwitter,
        link: "",
      },
      {
        linkLogo: IconDiscord,
        link: "",
      },
    ],
    introduction: "",
  });
  return currentEnvConfigList;
};

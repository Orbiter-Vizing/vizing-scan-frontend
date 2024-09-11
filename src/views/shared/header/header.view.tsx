import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useHeaderStyles } from "src/views/shared/header/header.styles";
import VizingScanLogo from "src/assets/vizing-scan-logo.svg?react";
import VizingScanText from "src/assets/vizing-scan-text.svg?react";
import twitterIcon from "src/assets/icon/social-media/twitter.svg?react";
import discordIcon from "src/assets/icon/social-media/discord.svg?react";
import mediumIcon from "src/assets/icon/social-media/medium.svg?react";
import { routes } from "src/routes";

const headerTabs = [
  {
    id: routes.messages.id,
    text: routes.messages.text,
    path: routes.messages.path,
  },
  {
    id: routes.protocols.id,
    text: routes.protocols.text,
    path: routes.protocols.path,
  },
];

const socialMediaList = [
  {
    id: "x-link",
    link: "https://x.com/vizing_l2",
    icon: twitterIcon,
  },
  {
    id: "discord-link",
    link: "https://discord.com/invite/FbztTBvnBT",
    icon: discordIcon,
  },
  {
    id: "medium-link",
    link: "https://medium.com/@Vizing_L2",
    icon: mediumIcon,
  },
];

export const Header: FC = () => {
  const classes = useHeaderStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHeaderItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={classes.headerWrap}>
      <div className={classes.logoWrap}>
        <VizingScanLogo />
        <VizingScanText />
      </div>
      <div className={classes.centerBlock}>
        {headerTabs.map((tab) => {
          return (
            <span
              onClick={() => handleHeaderItemClick(tab.path)}
              key={tab.id}
              className={`${classes.headerTab} ${location.pathname === tab.path ? classes.selectedTab : ""}`}
            >
              {tab.text}
            </span>
          );
        })}
      </div>
      <div className={classes.rightBlock}>
        {socialMediaList.map((item) => (
          <a key={item.id} href={item.link} target="_blank">
            <span>
              <item.icon className={classes.socialIcon} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

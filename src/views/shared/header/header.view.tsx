import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useHeaderStyles } from "src/views/shared/header/header.styles";
import VizingScanLogo from "src/assets/vizing-scan-logo.svg?react";
import VizingScanText from "src/assets/vizing-scan-text.svg?react";
import { routes } from "src/routes";

const headerTabs = [
  {
    id: routes.messages.id,
    text: routes.messages.text,
    path: routes.messages.path,
  },
  {
    id: "statistics",
    text: "Statistics",
    path: "https://www.orbiter.finance/statistics",
    isLink: true,
  },
  // {
  //   id: routes.protocols.id,
  //   text: routes.protocols.text,
  //   path: routes.protocols.path,
  // },
];

export const Header: FC = () => {
  const classes = useHeaderStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHeaderItemClick = (path: string, isLink?: boolean) => {
    if (isLink) {
      window.open(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className={classes.headerWrap}>
      <div className={classes.logoWrap} onClick={() => handleHeaderItemClick(routes.messages.path)}>
        <VizingScanLogo />
        <VizingScanText />
      </div>
      <div className={classes.centerBlock}>
        {headerTabs.map((tab) => {
          return (
            <span
              onClick={() => handleHeaderItemClick(tab.path, tab.isLink)}
              key={tab.id}
              className={`${classes.headerTab} ${location.pathname === tab.path ? classes.selectedTab : ""}`}
            >
              {tab.text}
            </span>
          );
        })}
      </div>
      {/* <div className={classes.rightBlock}>
        {socialMediaList.map((item) => (
          <a key={item.id} href={item.link} target="_blank">
            <span>
              <item.icon className={classes.socialIcon} />
            </span>
          </a>
        ))}
      </div> */}
    </div>
  );
};

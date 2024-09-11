import { FC } from "react";

import { useFooterStyles } from "src/views/shared/footer/footer.styles";
import twitterIcon from "src/assets/icon/social-media/twitter.svg?react";
import discordIcon from "src/assets/icon/social-media/discord.svg?react";
import mediumIcon from "src/assets/icon/social-media/medium.svg?react";

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

export const Footer: FC = () => {
  const classes = useFooterStyles();

  return (
    <div className={classes.footerWrap}>
      <div className={classes.socialIconsList}>
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

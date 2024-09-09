import { FC } from "react";
import dayjs from "dayjs";

import { useDetailInfoListStyles } from "src/views/tx-details/components/detail-info-list/detail-info-list.styles";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import IconCopy from "src/assets/icon/copy.svg?react";
import IconExplorer from "src/assets/icon/explorer.svg?react";
import { DetailInfoData } from "src/contexts/messages.context";

interface DetailInfoListProps {
  data: DetailInfoData;
}

export const DetailInfoList: FC<DetailInfoListProps> = ({ data }) => {
  const classes = useDetailInfoListStyles();

  const handleCopyButtonClick = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      alert("copy hash success!");
    } catch (err) {
      console.error("copy clipboard error: ", err);
    }
  };

  return (
    <div className={classes.detailInfoListWrap}>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Source Chain</span>
        <div className={classes.rowContent}>
          <Icon className={classes.chianIcon} isRounded size={20} url={data.chain?.icon || ""} />
          {data.chain?.name}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Status</span>
        <div className={classes.rowContent}>
          <StatusIcon status="Success" text="Success" />
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Block</span>
        <div className={classes.rowContent}>{data.blockNumber}</div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Source Transactions Hash</span>
        <div className={`${classes.rowContent}`}>
          <div className={classes.txHash}>{data.txHash}</div>
          <IconCopy
            onClick={() => handleCopyButtonClick(data.txHash)}
            className={classes.hashInteractionIcon}
          />
          <IconExplorer className={classes.hashInteractionIcon} />
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Massage Nonce</span>
        <div className={classes.rowContent}>{data.nonce}</div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Created</span>
        <div className={classes.rowContent}>
          {dayjs(data.createdTimestamp).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Amount</span>
        <div className={classes.rowContent}>{data.amountValue}</div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Source Omnichain Dapp</span>
        <div className={`${classes.rowContent} ${classes.dappContent}`}>
          <Icon className={classes.dappIcon} isRounded size={20} url={data.dapp.iconUrl} />
          {data.dapp.protocolName}
        </div>
      </div>
    </div>
  );
};

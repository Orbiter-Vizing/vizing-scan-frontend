import { FC, useState } from "react";
import dayjs from "dayjs";

import { useDetailInfoListStyles } from "src/views/tx-details/components/detail-info-list/detail-info-list.styles";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import IconCopy from "src/assets/icon/copy.svg?react";
import IconExplorer from "src/assets/icon/explorer.svg?react";
import { DetailInfoData } from "src/contexts/messages.context";
import { getTokenConfigBySymbol } from "src/assets/tokens-config";
import { ChainConfig } from "src/assets/chains-config";

interface DetailInfoListProps {
  data: DetailInfoData;
  type: "source" | "destination";
}

export const DetailInfoList: FC<DetailInfoListProps> = ({ data, type }) => {
  const classes = useDetailInfoListStyles();

  const [enableCopyAnimation, setEnableCopyAnimation] = useState(false);

  const handleCopyButtonClick = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setEnableCopyAnimation(true);
      setTimeout(() => {
        setEnableCopyAnimation(false);
      }, 500);
    } catch (err) {
      console.error("copy clipboard failed:", err);
    }
  };

  const handleExplorerClick = (chain: ChainConfig | undefined, txHash: string) => {
    if (!chain) {
      return;
    }
    window.open(`${chain.explorerUrl}/tx/${txHash}`);
  };

  const renderTokenSymbol = (symbol: string) => {
    const token = getTokenConfigBySymbol(symbol);
    if (!token) {
      return "";
    }
    return (
      <>
        <Icon className={classes.tokenIcon} isRounded size={20} url={token.logoURI} />
        {token.symbol}
      </>
    );
  };

  const sourceText = type === "source" ? "Source" : "Destination";

  return (
    <div className={classes.detailInfoListWrap}>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>{sourceText} Chain</span>
        <div className={classes.rowContent}>
          <Icon
            className={classes.chianIcon}
            isRounded
            size={20}
            url={data.chain?.iconUrlColorful || ""}
          />
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
        <span className={classes.rowLabel}>{sourceText} Transactions Hash</span>
        <div className={`${classes.rowContent}`}>
          <div className={classes.txHash}>{data.txHash}</div>
          <IconCopy
            onClick={() => handleCopyButtonClick(data.txHash)}
            className={`${classes.hashInteractionIcon} ${enableCopyAnimation ? classes.copyAnimation : ""}`}
          />
          <IconExplorer
            onClick={() => handleExplorerClick(data.chain, data.txHash)}
            className={classes.hashInteractionIcon}
          />
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Message Nonce</span>
        <div className={classes.rowContent}>{data.nonce}</div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Created</span>
        <div className={classes.rowContent}>
          {dayjs(data.createdTimestamp).format("DD MMM YYYY hh:mm:ss A")}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Amount</span>
        <div className={classes.rowContent}>
          {data.amountValue}
          {renderTokenSymbol(data.symbol)}
        </div>
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

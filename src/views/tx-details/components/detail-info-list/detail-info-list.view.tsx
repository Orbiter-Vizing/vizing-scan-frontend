import { FC, useState } from "react";
import dayjs from "dayjs";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

import { useDetailInfoListStyles } from "src/views/tx-details/components/detail-info-list/detail-info-list.styles";
import { StatusIcon } from "src/views/shared/status-icon/icon.view";
import { Icon } from "src/views/shared/icon/icon.view";
import IconCopy from "src/assets/icon/copy.svg?react";
import IconExplorer from "src/assets/icon/explorer.svg?react";
import { DetailInfoData } from "src/contexts/messages.context";
import { getTokenConfigBySymbol } from "src/assets/tokens-config";
import { ChainConfig } from "src/assets/chains-config";
import IconSuccess from "src/assets/icon/success.svg?react";

interface DetailInfoListProps {
  data: DetailInfoData | undefined;
  type: "source" | "destination";
}

export const DetailInfoList: FC<DetailInfoListProps> = ({ data, type }) => {
  const classes = useDetailInfoListStyles();

  const [snackbarOpen, setsnackbarOpen] = useState(false);

  const handleCopyButtonClick = async (hash: string | undefined) => {
    if (!hash) {
      return;
    }
    try {
      await navigator.clipboard.writeText(hash);
      setsnackbarOpen(true);
    } catch (err) {
      console.error("copy clipboard failed:", err);
    }
  };

  const handleExplorerClick = (chain: ChainConfig | undefined, txHash: string | undefined) => {
    if (!chain || !txHash) {
      return;
    }
    window.open(`${chain.explorerUrl}/tx/${txHash}`);
  };

  const SnackBarContent = () => {
    return (
      <div className={classes.successToast}>
        <IconSuccess className={classes.successIcon} />
        Copied successfully!
      </div>
    );
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackbarOpen(false);
  };

  const renderTokenSymbol = (symbol: string | undefined) => {
    if (!symbol) {
      return;
    }
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
          {data ? (
            <>
              <Icon
                className={classes.chianIcon}
                isRounded
                size={20}
                url={data.chain?.iconUrlColorful || ""}
              />
              {data.chain?.name}
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Status</span>
        <div className={classes.rowContent}>
          {data ? <StatusIcon status="Success" text="Success" /> : "-"}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Block</span>
        <div className={classes.rowContent}>{data ? <>{data.blockNumber}</> : "-"}</div>
        {/* {data ? <div className={classes.rowContent}>{data.blockNumber}</div> : "-"} */}
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>{sourceText} Transaction Hash</span>
        <div className={classes.rowContent}>
          {data ? (
            <>
              <div className={classes.txHash}>{data.txHash}</div>
              <IconCopy
                onClick={() => handleCopyButtonClick(data.txHash)}
                className={classes.hashInteractionIcon}
              />
              <IconExplorer
                onClick={() => handleExplorerClick(data.chain, data.txHash)}
                className={classes.hashInteractionIcon}
              />
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Message Nonce</span>
        <div className={classes.rowContent}>{data ? <>{data.nonce}</> : "-"}</div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Created</span>
        <div className={classes.rowContent}>
          {data ? (
            <>
              <div className={classes.rowContent}>
                {dayjs(data.createdTimestamp).format("DD MMM YYYY hh:mm:ss A")}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Amount</span>
        <div className={classes.rowContent}>
          {data ? (
            <>
              <div className={classes.rowContent}>
                {data.amountValue}
                {renderTokenSymbol(data.symbol)}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className={classes.detailRow}>
        <span className={classes.rowLabel}>Source Omnichain Dapp</span>
        <div className={classes.rowContent}>
          {data && data.dapp ? (
            <>
              <div className={`${classes.rowContent} ${classes.dappContent}`}>
                <Icon className={classes.dappIcon} isRounded size={20} url={data.dapp.iconUrl} />
                {data.dapp.name}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box component="section" sx={{ width: "100%" }}>
          <SnackBarContent />
        </Box>
      </Snackbar>
    </div>
  );
};

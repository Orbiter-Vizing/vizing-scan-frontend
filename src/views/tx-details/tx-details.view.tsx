import { FC, useEffect, useState, useCallback } from "react";

import { useTxDetailsStyles } from "src/views/tx-details/tx-details.styles";
import { Icon } from "src/views/shared/icon/icon.view";
import IconLiwid from "src/assets/icon/protocols/logo_likwid.png";
import SvgProcessBackgroundLeft from "src/assets/process-bg-left.svg?react";
import SvgProcessBackgroundRight from "src/assets/process-bg-right.svg?react";
import { DetailInfoList } from "src/views/tx-details/components/detail-info-list/detail-info-list.view";
import { DetailInfoData } from "src/contexts/messages.context";
import { useMessagesContext } from "src/contexts/messages.context";
import { apiUrl } from "src/constants";
import { ProcessInfo, BottomInfo } from "src/contexts/messages.context";
import IconETH from "src/assets/icon/tokens/eth-icon.svg";

export const TxDetails: FC = () => {
  const classes = useTxDetailsStyles();
  const { fetchMessageDetails } = useMessagesContext();

  const [processData, setProcessData] = useState<ProcessInfo>();
  const [sourceInfoList, setSourceInfoList] = useState<DetailInfoData>();
  const [destInfoList, setDestInfoList] = useState<DetailInfoData>();
  const [bottomInfo, setBottomInfo] = useState<BottomInfo>();

  const initPageData = useCallback(async () => {
    const messageDetailsData = await fetchMessageDetails({
      apiUrl,
      id: "0x21c7944342dbb05b7e0e9799e50ed9ea6cd16912dfec13e490859cd5ca9195f3",
    });
    setProcessData(messageDetailsData.process);
    setSourceInfoList(messageDetailsData.source);
    setDestInfoList(messageDetailsData.destination);
    setBottomInfo(messageDetailsData.bottomInfo);
  }, [fetchMessageDetails]);

  const getHashShortcut = (hash: string) => {
    const headLength = 8;
    const tailLength = 4;
    return `${hash.slice(0, headLength)}...${hash.slice(-tailLength)}`;
  };

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  if (!sourceInfoList || !destInfoList || !processData || !bottomInfo) {
    return <div></div>;
  }

  return (
    <div className={classes.txDetailsWrap}>
      <h1 className={classes.txPageTitle}>Transaction Details</h1>
      <div className={classes.processWrap}>
        {(Object.keys(processData) as (keyof ProcessInfo)[]).map((status) => {
          return (
            <div className={classes.processPeriodWrap}>
              <div className={classes.processBackgroundWrap}>
                <SvgProcessBackgroundLeft className={classes.processBackgroundPattern} />
                <SvgProcessBackgroundRight className={classes.processBackgroundPattern} />
              </div>
              <div className={classes.processPeriodContainer}>
                <p className={classes.processName}>{processData[status].chain?.name}</p>
                <Icon
                  className={classes.processIcon}
                  isRounded
                  size={72}
                  url={processData[status].chain?.iconUrl || ""}
                />
                <p className={classes.processContent}>
                  {status !== "middle"
                    ? getHashShortcut(processData[status].processContent)
                    : processData[status].processContent}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.transactionInfoWrap}>
        <h2 className={classes.txInfotitle}>Transaction Info</h2>
        <div className={classes.detailsInfoWrap}>
          <div className={`${classes.sourceChainInfoWrap} ${classes.chainInfoWrap}`}>
            <DetailInfoList data={sourceInfoList} />
          </div>
          <div className={classes.chainInfoWrap}>
            <DetailInfoList data={destInfoList} />
          </div>
        </div>
      </div>
      <div className={`${classes.infoRow} ${classes.fromInfo}`}>
        <span className={classes.infoRowLabel}>From</span>
        {bottomInfo.from}
      </div>
      <div className={`${classes.infoRow} ${classes.feeInfo}`}>
        <span className={classes.infoRowLabel}>Fee</span>
        <div className={classes.feeDetail}>
          <Icon className={classes.feeDetailIcon} isRounded size={20} url={IconETH} />
          {bottomInfo.fee} ETH
        </div>
      </div>
      <div className={`${classes.infoRow} ${classes.messageInfo}`}>
        <span className={classes.infoRowLabel}>Transferred message </span>
        <div className={classes.messageDetail}>{bottomInfo.message}</div>
      </div>
    </div>
  );
};

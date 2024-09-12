import { FC, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useTxDetailsStyles } from "src/views/tx-details/tx-details.styles";
import { Icon } from "src/views/shared/icon/icon.view";
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
  const { hashId } = useParams();
  const { fetchMessageDetails } = useMessagesContext();

  const [processData, setProcessData] = useState<ProcessInfo>();
  const [sourceInfoList, setSourceInfoList] = useState<DetailInfoData>();
  const [destInfoList, setDestInfoList] = useState<DetailInfoData>();
  const [bottomInfo, setBottomInfo] = useState<BottomInfo>();

  const initPageData = useCallback(async () => {
    const messageDetailsData = await fetchMessageDetails({
      apiUrl,
      id: hashId || "",
    });
    setProcessData(messageDetailsData.process);
    setSourceInfoList(messageDetailsData.source);
    setDestInfoList(messageDetailsData.destination);
    setBottomInfo(messageDetailsData.bottomInfo);
  }, [fetchMessageDetails, hashId]);

  const getHashShortcut = (hash: string) => {
    const headLength = 8;
    const tailLength = 4;
    return `${hash.slice(0, headLength)}...${hash.slice(-tailLength)}`;
  };

  const getFilteredFee = (value: string, symbol: string) => {
    const numericValue = parseFloat(value);
    const formattedValue = numericValue.toString();
    // const token = getTokenConfigBySymbol(symbol);
    const result = `${formattedValue} ETH`;
    return result;
  };

  const handleHashClick = (status: keyof ProcessInfo, processData: ProcessInfo) => {
    if (status === "middle") {
      return;
    }
    const explorerUrl = processData[status].chain?.explorerUrl;
    const hash = processData[status].processContent;
    const explorerLink = `${explorerUrl}/tx/${hash}`;
    window.open(explorerLink);
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
                <div className={classes.processBackgroundPatternWrap}>
                  {status !== "source" && (
                    <SvgProcessBackgroundLeft className={classes.processBackgroundPattern} />
                  )}
                </div>
                <div className={classes.processBackgroundPatternWrap}>
                  {status !== "destination" && (
                    <SvgProcessBackgroundRight className={classes.processBackgroundPattern} />
                  )}
                </div>
              </div>
              <div className={classes.processPeriodContainer}>
                <p className={classes.processName}>{processData[status].chain?.name}</p>
                <div className={classes.processIconWrap}>
                  <Icon
                    className={classes.processIcon}
                    isRounded
                    size={32}
                    url={processData[status].chain?.iconUrlColorful || ""}
                  />
                </div>
                <p
                  className={`${classes.processContent} ${status !== "middle" ? classes.processHashContent : ""}`}
                  onClick={() => handleHashClick(status, processData)}
                >
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
            <DetailInfoList type="source" data={sourceInfoList} />
          </div>
          <div className={classes.chainInfoWrap}>
            <DetailInfoList type="destination" data={destInfoList} />
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
          {getFilteredFee(bottomInfo.fee, "ETH")}
        </div>
      </div>
      <div className={`${classes.infoRow} ${classes.messageInfo}`}>
        <span className={classes.infoRowLabel}>Transferred message </span>
        <div className={classes.messageDetail}>{bottomInfo.message}</div>
      </div>
    </div>
  );
};

import { FC, useState } from "react";

import { useTxDetailsStyles } from "src/views/tx-details/tx-details.styles";
import { Icon } from "src/views/shared/icon/icon.view";
import IconLiwid from "src/assets/icon/protocols/logo_likwid.png";
import SvgProcessBackgroundLeft from "src/assets/process-bg-left.svg?react";
import SvgProcessBackgroundRight from "src/assets/process-bg-right.svg?react";
import {
  DetailInfoList,
  DetailInfoData,
} from "src/views/tx-details/components/detail-info-list/detail-info-list.view";

const defaultProcessData = [
  {
    processName: "Source Chain",
    processIconUrl: IconLiwid,
    processContent: "0x360ae2...0c7e",
  },
  {
    processName: "Vizing Pad",
    processIconUrl: IconLiwid,
    processContent: "Confirmations",
  },
  {
    processName: "Destination Chain",
    processIconUrl: IconLiwid,
    processContent: "0x360ae2...0c7e",
  },
];

const detailInfoData: DetailInfoData = {
  sourceChainName: "Mode Network",
  status: "success",
  blockNumber: "40401829",
  txHash: "0x0dbbf91334b26ce400580480f021c2e4b6c73f9f7c7d441dbaa048d498f89235",
  nonce: "9001",
  createdTimestamp: "25 Jul 2024 10:22:25 PM",
  amountValue: "3000000000000000",
  symbol: "ETH",
  dappIconUrl: IconLiwid,
  dappName: "LIKWID",
};

const transferredMessage =
  "0x6abd4ea7000000000000000000000000000000000000000000000000000000000000004000000000000000000000000053323e9be41473e747001cde9076e6a2c29c1b3e000000000000000000000000000000000000000000000000000000000000000a4d8da06627275ca6eb617f89818a9841828922bd12f6b4cd301222040e180e67801490d6403b4af03a4dd1b41d8e756f79b1b3ab7885518090d2530aa298d160dfbf363d67e72837a77f1e04cea3c5ae4ae263d398e91fc4c717cee4cc96238a3a64f2ed292959bbc50195731afaaaa348fbbe84319b0e8d49d33070c2477de2bc63f6e17ba5ab8cd2378861ffab9f7e3af36b92dfd0fe856a55be2ddf39572dc4f31f84386e201cbd4c4bb62b7317978fb45aac94bac11148ac8bc7e4bcf0ffb47aea11af8267dcb9798c9f16bf392264605459fcf3956144ff79af267ca08e7338e9e01fc008284ae5c5335a1c0ea5436e550c7b883e3a391ab2879bd05dbf03ad09457638ed899d886caf1161151321402cd1988804e711a25f92b8096e8dd02209c3b18b6a4207e2080b123385ee428a67d64e4d497e3a07a174db7d3944";

export const TxDetails: FC = () => {
  const classes = useTxDetailsStyles();

  const [processData, setProcessData] = useState(defaultProcessData);

  return (
    <div className={classes.txDetailsWrap}>
      <h1 className={classes.txPageTitle}>Transaction Details</h1>
      <div className={classes.processWrap}>
        {processData.map((process) => {
          return (
            <div className={classes.processPeriodWrap}>
              <div className={classes.processBackgroundWrap}>
                <SvgProcessBackgroundLeft className={classes.processBackgroundPattern} />
                <SvgProcessBackgroundRight className={classes.processBackgroundPattern} />
              </div>
              <div className={classes.processPeriodContainer}>
                <p className={classes.processName}>{process.processName}</p>
                <Icon
                  className={classes.processIcon}
                  isRounded
                  size={72}
                  url={process.processIconUrl}
                />
                <p className={classes.processContent}>{process.processContent}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.transactionInfoWrap}>
        <h2 className={classes.txInfotitle}>Transaction Info</h2>
        <div className={classes.detailsInfoWrap}>
          <div className={`${classes.sourceChainInfoWrap} ${classes.chainInfoWrap}`}>
            <DetailInfoList data={detailInfoData} />
          </div>
          <div className={classes.chainInfoWrap}>
            <DetailInfoList data={detailInfoData} />
          </div>
        </div>
      </div>
      <div className={`${classes.infoRow} ${classes.fromInfo}`}>
        <span className={classes.infoRowLabel}>From</span>
        0x7665fa307e0aad2daf578123361996141c190fe9
      </div>
      <div className={`${classes.infoRow} ${classes.feeInfo}`}>
        <span className={classes.infoRowLabel}>Fee</span>
        <div className={classes.feeDetail}>
          <Icon className={classes.feeDetailIcon} isRounded size={20} url={IconLiwid} />
          0.000368 ETH
        </div>
      </div>
      <div className={`${classes.infoRow} ${classes.messageInfo}`}>
        <span className={classes.infoRowLabel}>Transferred message </span>
        <div className={classes.messageDetail}>{transferredMessage}</div>
      </div>
    </div>
  );
};

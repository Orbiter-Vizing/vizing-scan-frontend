import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";

import { useProcessCardStyles } from "src/views/tx-details/components/process-card/process-card.styles";
import SvgProcessBackgroundLeft from "src/assets/process-bg-left.svg?react";
import SvgProcessBackgroundRight from "src/assets/process-bg-right.svg?react";
import { ProcessInfo } from "src/contexts/messages.context";
import { Icon } from "src/views/shared/icon/icon.view";

interface ProcessCardProps {
  status: "source" | "middle" | "destination";
  processData: ProcessInfo | undefined;
}

const CustomSkeleton = styled(Skeleton)({
  "&::after": {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
  },
});

export const ProcessCard: FC<ProcessCardProps> = ({ status, processData }) => {
  const classes = useProcessCardStyles();

  const handleHashClick = (status: keyof ProcessInfo, processData: ProcessInfo) => {
    if (status === "middle" || !processData[status]) {
      return;
    }
    const explorerUrl = processData[status].chain?.explorerUrl;
    const hash = processData[status].processContent;
    const explorerLink = `${explorerUrl}/tx/${hash}`;
    window.open(explorerLink);
  };

  const getHashShortcut = (hash: string) => {
    const headLength = 8;
    const tailLength = 4;
    return `${hash.slice(0, headLength)}...${hash.slice(-tailLength)}`;
  };

  return (
    <>
      {processData && processData[status] ? (
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
                ? getHashShortcut(processData[status].processContent || "")
                : processData[status].processContent}
            </p>
          </div>
        </div>
      ) : (
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
            <p className={classes.processName}>
              <CustomSkeleton
                sx={{ bgcolor: "#151515" }}
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={"100%"}
              />
            </p>
            <div className={classes.skeletonProcessIconWrap}>
              <CustomSkeleton
                sx={{ bgcolor: "#151515" }}
                animation="wave"
                variant="circular"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <p
              className={`${classes.processContent} ${status !== "middle" ? classes.processHashContent : ""}`}
            >
              <CustomSkeleton
                sx={{ bgcolor: "#151515" }}
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={"100%"}
              />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

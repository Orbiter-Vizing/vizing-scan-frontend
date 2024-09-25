import { FC, useState, useEffect, useCallback } from "react";
// import CountUp from "react-countup";

import { useSummaryDataStyles } from "src/views/shared/summary-data/summary-data.styles";
import { useMessagesContext } from "src/contexts/messages.context";
import { DataCard } from "src/views/shared/data-card/data-card.view";
import { getCurrentEnvApiUrl } from "src/constants";

// export interface SummaryData {
//   id: string;
//   data: string | number | undefined;
//   prefix: string;
//   name: string;
// }

// interface DataCardProps {
//   data: CardData;
// }

export const SummaryData: FC = () => {
  const classes = useSummaryDataStyles();
  const apiUrl = getCurrentEnvApiUrl();
  const { fetchSummaryData, defaultSummaryData } = useMessagesContext();

  const [summaryData, setSummaryData] = useState(defaultSummaryData);

  const initPageData = useCallback(async () => {
    const summaryData = await fetchSummaryData({ apiUrl });
    setSummaryData(summaryData);
  }, [fetchSummaryData, apiUrl]);

  useEffect(() => {
    initPageData();
  }, [initPageData]);

  return (
    <div className={classes.summaryDataWrap}>
      <div className={classes.dataCardWrap}>
        {summaryData.map((data) => {
          return <DataCard key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
};

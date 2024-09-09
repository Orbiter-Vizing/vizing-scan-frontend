import dayjs from "dayjs";
// to fix ts type error: https://github.com/iamkun/dayjs/issues/297
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const calculateRelativeTime = (date: string) => {
  if (!date) {
    return "-";
  }
  const diffInMinutes = dayjs().diff(date, "minute");
  if (diffInMinutes <= 30) {
    return dayjs(date).fromNow();
  } else {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  }
};

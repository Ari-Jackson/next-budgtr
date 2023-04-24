import dayjs from "dayjs";
import type { LoggedTransaction } from "@prisma/client";

const getsAndFormatsTotal = (data: LoggedTransaction[] = []) => {
  return data.reduce((total, item) => {
    if (item.deposit) {
      return total + Number(item.amount);
    }
    return total - Number(item.amount);
  }, 0);
};

const formatsUnix = (unix: number, length = "short") => {
  if (length === "long") {
    return dayjs(unix).format("MMM D, YYYY");
  }
  return dayjs(unix).format("MMM D");
};

export { getsAndFormatsTotal, formatsUnix };

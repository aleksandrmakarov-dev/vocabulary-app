import clsx, { ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export const formatDate = (value: Date | number | string) => {
  const date = moment(value);

  if (date.diff(moment(), "days") > 1) {
    return date.format("MMMM Do YYYY");
  } else {
    return date.fromNow();
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

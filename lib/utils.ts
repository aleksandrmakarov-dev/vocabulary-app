import moment from "moment";

export const formatDate = (value: Date | number | string) => {
  const date = moment(value);

  if (date.diff(moment(), "days") > 1) {
    return date.format("MMMM Do YYYY");
  } else {
    return date.fromNow();
  }
};

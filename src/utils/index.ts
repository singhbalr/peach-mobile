import moment from "moment/moment";

export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const calculateDateDiff = (date: moment.MomentInput) => {
  const now = moment();
  const event = moment(date, "x");

  return event === null ? 0 : event.diff(now, "days");
};

export const formatUnixTimestamp = (timestamp: number) => {
  const unixTimestamp = Math.floor(timestamp / 1000);
  const date = moment.unix(unixTimestamp);
  return date.format("DD MMM YYYY");
};

import * as R from 'Ramda';

let now = () => new Date();
let dateToIsoString = date => date.toISOString();

let substr = R.curry(
  (start, end, str) => str.substr(start, end)
);

export let todayDateStr = R.compose(
  substr(0, 10),
  dateToIsoString,
  now,
);

let strToDate = str => new Date(str);
let dateToTimestamp = date => date.getTime();

let dateGt = (date1, date2) => {
  // TODO more ramda way?
  return R.gt(
    dateToTimestamp(date1),
    dateToTimestamp(date2)
  );
};

export let dateStrGt = (dateStr1, dateStr2) => {
  // TODO more ramda way?
  return dateGt(
    strToDate(dateStr1),
    strToDate(dateStr2)
  );
};

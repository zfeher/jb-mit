import * as R from 'ramda';

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

export let dateStrGt = (dateStr1, dateStr2) => {
  // TODO more ramda way?
  return R.gt(
    strToDate(dateStr1),
    strToDate(dateStr2)
  );
};

export let dateStrLt = (dateStr1, dateStr2) => {
  // TODO more ramda way?
  return R.lt(
    strToDate(dateStr1),
    strToDate(dateStr2)
  );
};

export let isNotEmpty = R.complement(R.isEmpty);

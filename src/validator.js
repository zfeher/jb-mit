import * as R from 'ramda';
import { isNotEmpty, dateStrLt } from './common';

let __ = R.__;

let checkNotEmpty = R.curry(
  (name, value) => R.isEmpty(value) ? `${name} should be set` : ''
);

let checkDateStrGte = R.curry(
  (name, otherName, dateStr1, dateStr2) =>
    dateStrLt(dateStr1, dateStr2) ?
      `${name} should be >= ${otherName}` :
      ''
);

let validate = R.curry(
  (checkers, value) => {
    return R.compose(
      R.when(R.isNil, R.always('')),
      R.find(isNotEmpty),
      R.map(checker => checker(value)),
    )(checkers);
  }
);

export let validateOrigin = validate([checkNotEmpty('origin')]);
export let validateDestination = validate([checkNotEmpty('destination')]);

export let validateDepartureDate = (today, value) =>
  validate(
    [
      checkNotEmpty('departure date'),
      checkDateStrGte('departure date', 'today', __, today)
    ],
    value,
  );

export let validateReturnDate = (departureDate, today, value) =>
  validate(
    [
      checkNotEmpty('return date'),
      checkDateStrGte('return date', 'departure date', __, departureDate),
      checkDateStrGte('return date', 'today', __, today)
    ],
    value,
);

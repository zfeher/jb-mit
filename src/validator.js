import * as R from 'ramda';
import { isNotEmpty, dateStrLt } from './common';

export let checkNotEmpty = R.curry(
  (name, value) => R.isEmpty(value) ? `${name} should be set` : ''
);

export let checkDateStrGte = R.curry(
  (name, otherName, dateStr1, dateStr2) =>
    dateStrLt(dateStr1, dateStr2) ?
      `${name} should be >= ${otherName}` :
      ''
);

export let validate = R.curry(
  (checkers, value) => {
    return R.compose(
      R.when(R.isNil, R.always('')),
      R.find(isNotEmpty),
      R.map(checker => checker(value)),
    )(checkers);
  }
);

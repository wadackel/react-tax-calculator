import * as types from "../constants/ActionTypes"


export function changePrice(price) {
  return {
    type: types.CHANGE_PRICE,
    price
  };
}


export function changeRate(rate) {
  return {
    type: types.CHANGE_RATE,
    rate
  };
}


export function changeRule(rule) {
  return {
    type: types.CHANGE_RULE,
    rule
  };
}


export function changeFormat(format) {
  return {
    type: types.CHANGE_FORMAT,
    format
  };
}
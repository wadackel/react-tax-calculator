import store from "store"
import * as types from "../constants/ActionTypes"


export function syncUserState() {
  const {price, rate, rule, format} = store.getAll();
  return {
    type: types.SYNC_USER_STATE,
    price,
    rate,
    rule,
    format
  };
}


export function changePrice(price) {
  store.set("price", price);
  return {
    type: types.CHANGE_PRICE,
    price
  };
}


export function changeRate(rate) {
  store.set("rate", rate);
  return {
    type: types.CHANGE_RATE,
    rate
  };
}


export function changeRule(rule) {
  store.set("rule", rule);
  return {
    type: types.CHANGE_RULE,
    rule
  };
}


export function changeFormat(format) {
  store.set("format", format);
  return {
    type: types.CHANGE_FORMAT,
    format
  };
}
import * as types from "../constants/ActionTypes";
import * as ruleTypes from "../constants/RuleTypes"
import * as formatTypes from "../constants/FormatTypes"
import * as defaultSettings from "../constants/DefaultSettings"

const initialState = {
  price: 1000,
  rate: defaultSettings.RATE,
  rule: defaultSettings.RULE,
  format: defaultSettings.FORMAT
};

export default function calculator(state=initialState, action) {
  switch( action.type ){
    case types.SYNC_USER_STATE:
      const {price, rate, rule, format} = action;
      let newState = {};
      if( price ) newState.price = price;
      if( rate ) newState.rate = rate;
      if( rule ) newState.rule = rule;
      if( format ) newState.format = format;
      return Object.assign({}, state, newState);

    case types.CHANGE_PRICE:
      return Object.assign({}, state, {
        price: action.price
      });

    case types.CHANGE_RATE:
      return Object.assign({}, state, {
        rate: action.rate
      });

    case types.CHANGE_RULE:
      return Object.assign({}, state, {
        rule: action.rule
      });

    case types.CHANGE_FORMAT:
      return Object.assign({}, state, {
        format: action.format
      });

    default:
      return state;
  }
}
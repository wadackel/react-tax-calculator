import * as types from "../constants/ActionTypes";


const initialState = {
  price: 1000,
  rate: 8,
  rule: "floor",
  format: "TYPE_2"
};

export default function calculator(state=initialState, action) {
  switch( action.type ){
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
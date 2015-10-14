import expect from "expect"
import * as types from "../../constants/ActionTypes"
import * as actions from "../../actions/calculator"


describe("calculator actions", () => {
  it("changePrice should create CHANGE_PRICE action", () => {
    expect(actions.changePrice(2000)).toEqual({
      type: types.CHANGE_PRICE,
      price: 2000
    });
  });

  it("changeRate should create CHANGE_RATE action", () => {
    expect(actions.changeRate(10)).toEqual({
      type: types.CHANGE_RATE,
      rate: 10
    });
  });

  it("changeRule should create CHANGE_RULE action", () => {
    expect(actions.changeRule("ceil")).toEqual({
      type: types.CHANGE_RULE,
      rule: "ceil"
    });
  });

  it("changeFormat should create CHANGE_FORMAT action", () => {
    expect(actions.changeFormat("TYPE_3")).toEqual({
      type: types.CHANGE_FORMAT,
      format: "TYPE_3"
    });
  });
});
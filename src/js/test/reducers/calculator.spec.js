import expect from "expect"
import calculator from "../../reducers/calculator"
import * as types from "../../constants/ActionTypes"


describe("calculator reducer", () => {

  it("should handle initial state", () => {
    expect(
      calculator(undefined, {})
    ).toEqual({
      price: 1000,
      rate: 8,
      rule: "floor",
      format: "TYPE_2"
    });
  });

  it("should handle CHANGE_PRICE", () => {
    expect(
      calculator(undefined, {
        type: types.CHANGE_PRICE,
        price: 2000
      })
    ).toEqual({
      price: 2000,
      rate: 8,
      rule: "floor",
      format: "TYPE_2"
    });
  });

  it("should handle CHANGE_RATE", () => {
    expect(
      calculator(undefined, {
        type: types.CHANGE_RATE,
        rate: 10
      })
    ).toEqual({
      price: 1000,
      rate: 10,
      rule: "floor",
      format: "TYPE_2"
    });
  });

  it("should handle CHANGE_RULE", () => {
    expect(
      calculator(undefined, {
        type: types.CHANGE_RULE,
        rule: "round"
      })
    ).toEqual({
      price: 1000,
      rate: 8,
      rule: "round",
      format: "TYPE_2"
    });
  });

  it("should handle CHANGE_FORMAT", () => {
    expect(
      calculator(undefined, {
        type: types.CHANGE_FORMAT,
        format: "TYPE_1"
      })
    ).toEqual({
      price: 1000,
      rate: 8,
      rule: "floor",
      format: "TYPE_1"
    });
  });

});
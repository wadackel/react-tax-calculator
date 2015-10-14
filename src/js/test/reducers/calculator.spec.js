import expect from "expect"
import calculator from "../../reducers/calculator"
import * as types from "../../constants/ActionTypes"
import * as ruleTypes from "../../constants/RuleTypes"
import * as formatTypes from "../../constants/FormatTypes"


describe("calculator reducer", () => {

  it("should handle initial state", () => {
    expect(
      calculator(undefined, {})
    ).toEqual({
      price: 1000,
      rate: 8,
      rule: ruleTypes.FLOOR,
      format: formatTypes.TYPE_2
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
      rule: ruleTypes.FLOOR,
      format: formatTypes.TYPE_2
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
      rule: ruleTypes.FLOOR,
      format: formatTypes.TYPE_2
    });
  });

  it("should handle CHANGE_RULE", () => {
    expect(
      calculator(undefined, {
        type: types.CHANGE_RULE,
        rule: ruleTypes.ROUND
      })
    ).toEqual({
      price: 1000,
      rate: 8,
      rule: ruleTypes.ROUND,
      format: formatTypes.TYPE_2
    });
  });

  it("should handle CHANGE_FORMAT", () => {
    expect(
      calculator(undefined, {
        type: types.CHANGE_FORMAT,
        format: formatTypes.TYPE_1
      })
    ).toEqual({
      price: 1000,
      rate: 8,
      rule: ruleTypes.FLOOR,
      format: formatTypes.TYPE_1
    });
  });

});
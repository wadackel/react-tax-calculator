import React, {Component, PropTypes} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import GitHubForkRibbon from "react-github-fork-ribbon"
import Select from "react-select"
import * as CalculatorActions from "../actions/calculator"
import * as ruleTypes from "../constants/RuleTypes"
import * as formatTypes from "../constants/FormatTypes"
import TaxCalculator from "../components/TaxCalculator"
import TaxSetting from "../components/TaxSetting"


class App extends Component {
  componentDidMount() {
    this.props.syncUserState();
  }

  render() {
    const {
      price, rate, rule, format,
      changePrice, changeRate, changeRule, changeFormat
    } = this.props;

    return (
      <div>
        <GitHubForkRibbon
          href="https://github.com/tsuyoshiwada/react-tax-calculator"
          position="right"
          color="black">
          Fork me on GitHub
        </GitHubForkRibbon>

        <div className="header">
          <div className="container">
            <h1><i className="fa fa-dot-circle-o"></i> Tax Calculator</h1>
            <TaxCalculator
              price={price}
              rate={rate}
              rule={rule}
              format={format}
              onPriceChange={changePrice} />
          </div>
        </div>

        <div className="container">
          <TaxSetting
            rate={rate}
            rule={rule}
            format={format}
            onRateChange={changeRate}
            onRuleChange={changeRule}
            onFormatChange={changeFormat} />
        </div>

        <p className="copyright">Copyright &copy; <a href="https://github.com/tsuyoshiwada">tsuyoshi wada</a> All Right Reserved.</p>
      </div>
    );
  }
}

App.propTypes = {
  syncUserState: PropTypes.func.isRequired,
  changePrice: PropTypes.func.isRequired,
  changeRate: PropTypes.func.isRequired,
  changeRule: PropTypes.func.isRequired,
  changeFormat: PropTypes.func.isRequired,
  price: PropTypes.any.isRequired,
  rate: PropTypes.number.isRequired,
  rule: PropTypes.oneOf([
    ruleTypes.FLOOR,
    ruleTypes.CEIL,
    ruleTypes.ROUND
  ]).isRequired,
  format: PropTypes.oneOf([
    formatTypes.TYPE_1,
    formatTypes.TYPE_2,
    formatTypes.TYPE_3
  ]).isRequired
};


function mapStateToProps(state) {
  const {price, rate, rule, format} = state.calculator;
  return {price, rate, rule, format};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CalculatorActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
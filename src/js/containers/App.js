import React, {Component, PropTypes} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Select from "react-select"
import * as CalculatorActions from "../actions/calculator"
import TaxCalculator from "../components/TaxCalculator"
import TaxSetting from "../components/TaxSetting"


class App extends Component {
  render() {
    const {price, rate, rule, format} = this.props;

    return (
      <div>

        <div className="header">
          <div className="container">
            <h1><i className="fa fa-dot-circle-o"></i> Tax Calculator</h1>
            <TaxCalculator
              price={price}
              rate={rate}
              rule={rule}
              format={format}
              onPriceChange={this.handlePriceChange.bind(this)} />
          </div>
        </div>

        <div className="container">
          <TaxSetting
            rate={rate}
            rule={rule}
            format={format}
            onRateChange={this.handleRateChange.bind(this)}
            onRuleChange={this.handleRuleChange.bind(this)}
            onFormatChange={this.handleFormatChange.bind(this)} />
        </div>

        <p className="copyright">Copyright &copy; <a href="https://github.com/tsuyoshiwada">tsuyoshi wada</a> All Right Reserved.</p>
      </div>
    );
  }

  handlePriceChange(price) {
    this.props.changePrice(price);
  }

  handleRateChange(rate) {
  }

  handleRuleChange(rule) {
  }

  handleFormatChange(format) {
  }
}

App.propTypes = {
  changePrice: PropTypes.func.isRequired,
  price: PropTypes.any.isRequired,
  rate: PropTypes.number.isRequired,
  rule: PropTypes.oneOf([
    "floor",
    "ceil",
    "round"
  ]).isRequired,
  format: PropTypes.oneOf([
    "TYPE_1",
    "TYPE_2",
    "TYPE_3"
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
import React, {Component, PropTypes} from "react"
import Select from "react-select"
import * as ruleTypes from "../constants/RuleTypes"
import * as formatTypes from "../constants/FormatTypes"
import * as defaultSettings from "../constants/DefaultSettings"


export default class TaxSetting extends Component {
  render() {
    const ruleOptions = [
      {value: ruleTypes.FLOOR, label: "切り捨て"},
      {value: ruleTypes.CEIL, label: "切り上げ"},
      {value: ruleTypes.ROUND, label: "四捨五入"}
    ];

    const formatOptions = [
      {value: formatTypes.TYPE_1, label: "¥12000"},
      {value: formatTypes.TYPE_2, label: "¥12,000"},
      {value: formatTypes.TYPE_3, label: "¥+12,000"}
    ];

    return (
      <div className="tax-setting">
        <h2 className="tax-setting__title"><i className="fa fa-cog"></i> Settings</h2>

        <div className="tax-setting__row">
          <div className="tax-setting__col">
            <div className="input-group">
              <span className="input-group__addon">税率</span>
              <input
                type="number"
                ref="rate"
                className="input-group__control"
                pattern="[0-9]*"
                placeholder="00"
                value={this.props.rate}
                onChange={this.handleRateChange.bind(this)} />
              <span className="input-group__addon">%</span>
            </div>
          </div>

          <div className="tax-setting__col">
            <div className="input-group">
              <span className="input-group__addon">計算方法</span>
              <Select
                className="input-group__control"
                clearable={false}
                searchable={false}
                value={this.props.rule}
                options={ruleOptions}
                onChange={this.handleRuleChange.bind(this)} />
              <span className="input-group__addon">%</span>
            </div>
          </div>

          <div className="tax-setting__col">
            <div className="input-group">
              <span className="input-group__addon">表記</span>
              <Select
                className="input-group__control"
                clearable={false}
                searchable={false}
                value={this.props.format}
                options={formatOptions}
                onChange={this.handleFormatChange.bind(this)} />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="tax-setting__clear"
          onClick={this.handleClearClick.bind(this)}>
          設定を初期化
        </button>
      </div>
    );
  }

  handleRateChange() {
    let rate = this.refs.rate.value.trim();
    if( rate === "" ) return;
    rate = parseInt(rate, 10);
    if( !isNaN(rate) ){
      this.props.onRateChange(rate);
    }
  }

  handleRuleChange(value) {
    this.props.onRuleChange(value);
  }

  handleFormatChange(value) {
    this.props.onFormatChange(value);
  }

  handleClearClick(e) {
    e.preventDefault();

    const {onRateChange, onRuleChange, onFormatChange} = this.props;
    onRateChange(defaultSettings.RATE);
    onRuleChange(defaultSettings.RULE);
    onFormatChange(defaultSettings.FORMAT);
  }
}


TaxSetting.propTypes = {
  onRateChange: PropTypes.func.isRequired,
  onRuleChange: PropTypes.func.isRequired,
  onFormatChange: PropTypes.func.isRequired,
  rate: PropTypes.number.isRequired,
  rule: PropTypes.string.isRequired,
  format: PropTypes.oneOf([
    formatTypes.TYPE_1,
    formatTypes.TYPE_2,
    formatTypes.TYPE_3
  ]).isRequired
};
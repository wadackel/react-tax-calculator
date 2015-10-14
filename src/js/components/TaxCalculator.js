import React, {Component, PropTypes} from "react"


export default class TaxCalculator extends Component {
  render() {
    return (
      <div className="tax-calculator">
        <div className="input-group input-group--x-lg tax-calculator__price">
          <span className="input-group__addon">&yen;</span>
          <input
            type="text"
            ref="price"
            className="input-group__control"
            pattern="[0-9]*"
            placeholder="計算する金額"
            defaultValue={this.props.price}
            onChange={this.handlePriceChange.bind(this)} />
          <button
            type="button"
            className="tax-calculator__price__clear is-show"
            onClick={this.handlePriceClearClick.bind(this)}>
            &times;
          </button>
        </div>

        <div className="tax-calculator__results">
          <div className="input-group input-group--lg">
            <span className="input-group__addon">&yen;</span>
            <input
              type="text"
              className="input-group__control"
              readOnly={true}
              value={this.calcPrice(true)} />
            <span className="input-group__addon">税込</span>
          </div>
          <div className="input-group input-group--lg">
            <span className="input-group__addon">&yen;</span>
            <input
              type="text"
              className="input-group__control"
              readOnly={true}
              value={this.calcPrice(false)} />
            <span className="input-group__addon">税抜</span>
          </div>
        </div>
      </div>
    );
  }

  handlePriceChange() {
    this.props.onPriceChange(this.refs.price.value);
  }

  handlePriceClearClick() {
  }

  calcPrice(includeTax=true) {
    const price = this.props.price;
    const rate = this.props.rate / 100 + 1;
    const mathMethod = Math[this.props.rule];

    if( isNaN(price) ){
      return 0;
    }else{
      let val = includeTax ? price * rate : price / rate;
      val = mathMethod(val);
      // @TODO format
      return val;
    }
  }
}


TaxCalculator.propTypes = {
  onPriceChange: PropTypes.func.isRequired
};
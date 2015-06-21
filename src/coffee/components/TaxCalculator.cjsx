numeral = require("numeral")
classNames = require("classnames")
React = require("react")


TaxCalculator = React.createClass
  propTypes:
    price: React.PropTypes.any
    rate: React.PropTypes.number.isRequired
    rule: React.PropTypes.string.isRequired
    format: React.PropTypes.string.isRequired
    onPriceChange: React.PropTypes.func

  getInitialState: ->
    price: @props.price || 0

  render: ->
    valueLink = 
      value: @state.price
      requestChange: @handlePriceChange

    priceClearClasses = classNames(
      "tax-calculator__price__clear": true
      "is-show": @state.price.toString().length > 0
    )

    <div className="tax-calculator">

      <div className="input-group input-group--x-lg tax-calculator__price">
        <span className="input-group__addon">&yen;</span>
        <input
          type="text"
          pattern="[0-9]*"
          className="input-group__control"
          placeholder="計算する金額"
          valueLink={valueLink}/>
        <button
          type="button"
          className={priceClearClasses}
          onClick={@handlePriceClearClick}>
          &times;
        </button>
      </div>

      <div className="tax-calculator__results">
        <div className="input-group input-group--lg">
          <span className="input-group__addon">&yen;</span>
          <input
            type="text"
            readOnly={true}
            className="input-group__control"
            value={@calcPrice(true)}
            onClick={@handleResultClick} />
          <span className="input-group__addon">税込</span>
        </div>
        <div className="input-group input-group--lg">
          <span className="input-group__addon">&yen;</span>
          <input
            type="text"
            readOnly={true}
            className="input-group__control"
            value={@calcPrice(false)}
            onClick={@handleResultClick} />
          <span className="input-group__addon">税抜</span>
        </div>
      </div>

    </div>

  handlePriceChange: (newValue) ->
    @setState(price: newValue)
    @props.onPriceChange?(newValue)

  handlePriceClearClick: (e) ->
    e.preventDefault()
    @setState(price: "")
    @props.onPriceChange?("")

  handleResultClick: (e) ->
    e.target.select()


  # 整形済みの計算金額を返す
  # @param int 
  # @return string
  calcPrice: (includeTax=true) ->
    price = numeral().unformat(@state.price)
    rate = @props.rate / 100 + 1
    mathMethod = Math[@props.rule]

    if isNaN(price)
      return 0
    else
      val = if includeTax then price * rate else price / rate
      val = mathMethod(val)
      return numeral(val).format(@props.format)


module.exports = TaxCalculator
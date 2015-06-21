React = require("react")
Select = require("react-select")
FormatType = require("../constants/FormatType")


React.initializeTouchEvents(true)


TaxRule = React.createClass
  propTypes:
    rate: React.PropTypes.number
    rule: React.PropTypes.string
    format: React.PropTypes.string
    onRateChange: React.PropTypes.func
    onRuleChange: React.PropTypes.func
    onFormatChange: React.PropTypes.func

  getInitialState: ->
    rate: @props.rate
    rule: @props.rule
    format: @props.format

  render: ->
    ruleOptions = [
      {value: "floor", label: "切り捨て"}
      {value: "ceil",  label: "切り上げ"}
      {value: "round", label: "四捨五入"}
    ]

    # Selectコンポーネントに`0,0`などのvalueを与えると挙動が変わってしまうため
    # FormatTypeとして外部化して、そのキーを渡すようにする
    formatOptions = [
      {value: "TYPE_1", label: "¥12000"}
      {value: "TYPE_2", label: "¥12,000"}
      {value: "TYPE_3", label: "¥+12,000"}
    ]

    format = ""
    for key, value of FormatType
      format = key if value == @state.format


    <div className="tax-setting">

      <div className="tax-setting__row">
        <div className="tax-setting__col">
          <div className="input-group">
            <span className="input-group__addon">税率</span>
            <input
              type="number"
              className="input-group__control"
              placeholder="00"
              value={@state.rate}
              onChange={@handleRateChange} />
            <span className="input-group__addon">%</span>
          </div>
        </div>

        <div className="tax-setting__col">
          <div className="input-group">
            <span className="input-group__addon">計算方法</span>
            <Select
              value={@state.rule}
              className="input-group__control"
              clearable={false}
              searchable={false}
              options={ruleOptions}
              onChange={@handleRuleChange} />
          </div>
        </div>

        <div className="tax-setting__col">
          <div className="input-group">
            <span className="input-group__addon">表記</span>
            <Select
              value={format}
              className="input-group__control"
              clearable={false}
              searchable={false}
              options={formatOptions}
              onChange={@handleFormatChange} />
          </div>
        </div>

      </div>
    </div>

  handleRateChange: (e) ->
    value = e.target.value.trim()
    if value == ""
      @setState(rate: value)
      return

    value = parseInt(e.target.value)
    if !isNaN(value)
      @setState(rate: value)
      @props?.onRateChange(value)

  handleRuleChange: (value) ->
    @setState(rule: value)
    @props?.onRuleChange(value)

  handleFormatChange: (value) ->
    @setState(format: FormatType[value])
    @props?.onFormatChange(FormatType[value])


module.exports = TaxRule
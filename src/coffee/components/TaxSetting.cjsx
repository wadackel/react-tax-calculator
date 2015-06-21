React = require("react")
Select = require("react-select")
FormatType = require("../constants/FormatType")
DefaultSetting = require("../constants/DefaultSetting")


TaxRule = React.createClass
  propTypes:
    rate: React.PropTypes.number
    rule: React.PropTypes.string
    format: React.PropTypes.string
    onRateChange: React.PropTypes.func
    onRuleChange: React.PropTypes.func
    onFormatChange: React.PropTypes.func

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


    <div className="tax-setting">

      <div className="tax-setting__row">
        <div className="tax-setting__col">
          <div className="input-group">
            <span className="input-group__addon">税率</span>
            <input
              type="number"
              pattern="[0-9]*"
              className="input-group__control"
              placeholder="00"
              value={@props.rate}
              onChange={@handleRateChange} />
            <span className="input-group__addon">%</span>
          </div>
        </div>

        <div className="tax-setting__col">
          <div className="input-group">
            <span className="input-group__addon">計算方法</span>
            <Select
              value={@props.rule}
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
              value={@props.format}
              className="input-group__control"
              clearable={false}
              searchable={false}
              options={formatOptions}
              onChange={@handleFormatChange} />
          </div>
        </div>
      </div>

      <button type="button" className="tax-setting__clear" onClick={@handleClearClick}>設定を初期化</button>
    </div>

  handleRateChange: (e) ->
    value = e.target.value.trim()
    value = parseInt(e.target.value) if value != ""
    value = "" if isNaN(value)
    @props.onRateChange?(value)

  handleRuleChange: (value) ->
    @props.onRuleChange?(value)

  handleFormatChange: (value) ->
    @props.onFormatChange?(value)

  handleClearClick: (e) ->
    e.preventDefault()

    {rate, rule, format} = DefaultSetting
    @props.onRateChange?(rate)
    @props.onRuleChange?(rule)
    @props.onFormatChange?(format)



module.exports = TaxRule
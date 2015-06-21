store = require("store")
React = require("react")
ReactTabs = require("react-tabs")
GitHubForkRibbon = require("react-github-fork-ribbon")
TaxSetting = require("./TaxSetting")
TaxCalculator = require("./TaxCalculator")
About = require("./About")
FormatType = require("../constants/FormatType")
DefaultSetting = require("../constants/DefaultSetting")


# alias for ReactTabs components
Tab = ReactTabs.Tab
Tabs = ReactTabs.Tabs
TabList = ReactTabs.TabList
TabPanel = ReactTabs.TabPanel


App = React.createClass
  getInitialState: ->
    rate: store.get("rate") || DefaultSetting.rate
    rule: store.get("rule") || DefaultSetting.rule
    format: store.get("format") || DefaultSetting.format

  render: ->
    price = store.get("price") || DefaultSetting.price
    currentTab = store.get("currentTab") || 0

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
            rate={@state.rate}
            rule={@state.rule}
            format={FormatType[@state.format]}
            onPriceChange={@handlePriceChange} />
        </div>
      </div>

      <div className="container">
        <Tabs onSelect={@handleTabSelect} selectedIndex={currentTab}>
          <TabList>
            <Tab><i className="fa fa-cog"></i> Settings</Tab>
            <Tab><i className="fa fa-info-circle"></i> About</Tab>
          </TabList>
          <TabPanel>
            <TaxSetting
              rate={@state.rate}
              rule={@state.rule}
              format={@state.format}
              onRateChange={@handleRateChange}
              onRuleChange={@handleRuleChange}
              onFormatChange={@handleFormatChange} />
          </TabPanel>
          <TabPanel>
            <About />
          </TabPanel>
        </Tabs>
      </div>

      <p className="copyright">Copyright &copy; <a href="https://github.com/tsuyoshiwada">tsuyoshi wada</a> All Right Reserved.</p>
    </div>

  handlePriceChange: (price) ->
    store.set("price", price)

  handleRateChange: (rate) ->
    store.set("rate", rate)
    @setState(rate: rate)

  handleRuleChange: (rule) ->
    store.set("rule", rule)
    @setState(rule: rule)

  handleFormatChange: (format) ->
    store.set("format", format)
    @setState(format: format)

  handleTabSelect: (current, prev) ->
    store.set("currentTab", current)


module.exports = App
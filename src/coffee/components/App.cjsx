store = require("store")
React = require("react")
ReactTabs = require("react-tabs")
Tab = ReactTabs.Tab
Tabs = ReactTabs.Tabs
TabList = ReactTabs.TabList
TabPanel = ReactTabs.TabPanel
GitHubForkRibbon = require("react-github-fork-ribbon")
TaxSetting = require("./TaxSetting")
TaxCalculator = require("./TaxCalculator")
About = require("./About")


App = React.createClass
  getInitialState: ->
    rate: store.get("rate") || 8
    rule: store.get("rule") || "floor"
    format: store.get("format") || "TYPE_2"

  render: ->
    currentTab = store.get("currentTab") || 0

    <div>
      <GitHubForkRibbon
        href="#"
        position="right"
        color="black">
        Fork me on GitHub
      </GitHubForkRibbon>

      <div className="header">
        <div className="container">
          <h1><i className="fa fa-dot-circle-o"></i> Tax Calculator</h1>
          <TaxCalculator
            price=10000
            rate={@state.rate}
            rule={@state.rule}
            format={@state.format} />
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
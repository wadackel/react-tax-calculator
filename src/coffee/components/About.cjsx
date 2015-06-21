React = require("react")


About = React.createClass
  render: ->
    <div>
      <h2><i className="fa fa-paragraph"></i> 使い方</h2>
      <p>
        「Tax Calculator」は税込み、税抜きの計算をそれぞれ行うアプリケーションです。<br />
        使い方は至ってシンプルで、税込み、税抜きが知りたい金額を画面上部にある入力欄に入力するだけです。<br />
      </p>
      <p>
        デフォルトでは税率8%、切り捨てを使った計算を行いますが、Settingタブより変更していただくことが可能になっています。<br />
        また、お好みに合わせて表示される金額の表記方法を変更することができます。
      </p>
      <h2><i className="fa fa-paragraph"></i> Tax Calculatorについて</h2>
      <p>
        このアプリケーションは<a href="http://facebook.github.io/react/">react.js</a>と<a href="http://coffeescript.org/">CoffeeScript</a>を使って制作しているオープンソースソフトウェアです。
      </p>
    </div>


module.exports = About
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = require("./react-calendar/entry.js");

var MyApp = function (_React$Component) {
  _inherits(MyApp, _React$Component);

  function MyApp() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyApp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyApp.__proto__ || Object.getPrototypeOf(MyApp)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      date: new Date()
    }, _this.onChange = function (date) {
      return _this.setState({ date: date });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyApp, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Calendar, {
          onChange: this.onChange,
          value: this.state.date
        })
      );
    }
  }]);

  return MyApp;
}(React.Component);

ReactDOM.render(React.createElement(MyApp, null), document.getElementById("calendar_div"));
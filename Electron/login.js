'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var el = React.createElement;

var LoginButton = function (_React$Component) {
  _inherits(LoginButton, _React$Component);

  function LoginButton(props) {
    _classCallCheck(this, LoginButton);

    var _this = _possibleConstructorReturn(this, (LoginButton.__proto__ || Object.getPrototypeOf(LoginButton)).call(this, props));

    _this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
    _this.onUsername = _this.onUsername.bind(_this);
    _this.onPassword = _this.onPassword.bind(_this);
    _this.login = _this.login.bind(_this);
    return _this;
  }

  _createClass(LoginButton, [{
    key: "login",
    value: function login() {
      var _this2 = this;

      console.log("well the function ran...");
      return fetch("/login", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        _this2.setState({
          loggedIn: responseJson.text === "hello!" ? true : false
        });
      });
    }
  }, {
    key: "onUsername",
    value: function onUsername(e) {
      e.preventDefault();
      this.setState({ username: e.target.value });
    }
  }, {
    key: "onPassword",
    value: function onPassword(e) {
      e.preventDefault();
      this.setState({ password: e.target.value });
    }
  }, {
    key: "render",
    value: function render() {

      if (!this.state.loggedIn) {
        return React.createElement(
          "div",
          { className: "loginDiv" },
          React.createElement(
            "form",
            { className: "loginForm" },
            React.createElement(
              "label",
              { htmlFor: "username" },
              "Username:"
            ),
            React.createElement("input", {
              type: "text",
              id: "username",
              placeholder: "Enter Username",
              onChange: this.onUsername
            }),
            React.createElement(
              "label",
              { htmlFor: "password" },
              "Password:"
            ),
            React.createElement("input", {
              type: "password",
              id: "password",
              placeholder: "Enter Password",
              onChange: this.onPassword
            }),
            React.createElement(
              "button",
              { type: "button", onClick: this.login },
              "Login"
            )
          )
        );
      }
      return React.createElement(
        "h1",
        null,
        "HELLO!"
      );
    }
  }]);

  return LoginButton;
}(React.Component);

var domContainer = document.querySelector('#login_container');
ReactDOM.render(el(LoginButton), domContainer);
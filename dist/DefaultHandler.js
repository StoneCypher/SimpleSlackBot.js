
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _HandlerJs = require("./Handler.js");

var _HandlerJs2 = _interopRequireDefault(_HandlerJs);

var DefaultHandler = (function (_Handler) {
  _inherits(DefaultHandler, _Handler);

  function DefaultHandler() {
    _classCallCheck(this, DefaultHandler);

    _get(Object.getPrototypeOf(DefaultHandler.prototype), "constructor", this).call(this);
  }

  _createClass(DefaultHandler, [{
    key: "on_construct",
    value: function on_construct() {
      console.log("SimpleSlackBot default handler constructed.");
    }
  }, {
    key: "on_connect",
    value: function on_connect(Channels, Groups, Name, Team) {
      console.log("Connected to Slack as '" + Name + "' of team '" + Team + "'");
      console.log("Member of " + Channels.length + " channels and " + Groups.length + " groups.");
    }
  }, {
    key: "on_message",
    value: function on_message(M) {

      var starts_with = function starts_with(X) {
        return M.text.indexOf(X) === 0;
      },
          d6 = function d6() {
        return (Math.floor(Math.random() * 6) + 1).toString();
      };

      if (starts_with('SimpleSlackBot')) {
        M.reply(":smile:");
      }

      // fallthrough is intentional
      if (starts_with('SSB: Timestamp')) {
        M.reply(" :clock3: " + new Date().getTime());
      }
      if (starts_with('SSB: Time')) {
        M.reply(" :clock6: " + new Date().toLocaleString());
      }

      if (starts_with('SSB: Dice')) {
        M.reply(" :game_die: " + d6() + " " + d6());
      }
    }
  }]);

  return DefaultHandler;
})(_HandlerJs2["default"]);

exports["default"] = DefaultHandler;
module.exports = exports["default"];
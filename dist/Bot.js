
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var slack_lib = require('slack-client'),
    util = require('util');

var Handler = (function () {
  function Handler() {
    _classCallCheck(this, Handler);
  }

  _createClass(Handler, [{
    key: 'on_construct',
    value: function on_construct() {}
  }, {
    key: 'on_connect',
    value: function on_connect(C, G, N, T) {}
  }, {
    key: 'on_message',
    value: function on_message(M) {}
  }]);

  return Handler;
})();

exports.Handler = Handler;

var DefaultHandler = (function (_Handler) {
  _inherits(DefaultHandler, _Handler);

  function DefaultHandler() {
    _classCallCheck(this, DefaultHandler);

    _get(Object.getPrototypeOf(DefaultHandler.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DefaultHandler, [{
    key: 'on_construct',
    value: function on_construct() {
      console.log("SimpleSlackBot default handler constructed.");
    }
  }, {
    key: 'on_connect',
    value: function on_connect(C, G, N, T) {
      console.log("Connected as " + N + " of " + T);
    }
  }, {
    key: 'on_message',
    value: function on_message(M) {
      if (M.text.indexOf('SimpleSlackBot') === 0) {
        M.reply(":smile:");
      }
    }
  }]);

  return DefaultHandler;
})(Handler);

exports.DefaultHandler = DefaultHandler;

var Bridge = (function () {
  function Bridge(options) {
    _classCallCheck(this, Bridge);

    if (options.key.indexOf('xoxb') !== 0) {
      throw 'All valid Slack bot keys start \'xoxb\'.  Verify the `key` in your `options`.';
    }

    this.key = options.key;
    this.handlers = options.handlers || [new DefaultHandler()];
    this.autoReconnect = options.autoReconnect || true;
    this.autoMark = options.autoMark || true;

    this.slack = new slack_lib(this.key, this.autoReconnect, this.autoMark);

    this.handlers.map(function (h) {
      return h.on_construct();
    });
  }

  _createClass(Bridge, [{
    key: 'channels',
    value: function channels(uOptions) {
      var _this = this;

      var options = uOptions || {},
          noOp = function noOp(c) {
        return true;
      },
          maybeMembersOnly = options.with_nonmember ? noOp : function (c) {
        return c.is_member;
      };

      return Object.keys(this.slack.channels).map(function (k) {
        return _this.slack.channels[k];
      }).filter(maybeMembersOnly).map(function (c) {
        return c.name;
      });
    }
  }, {
    key: 'groups',
    value: function groups(uOptions) {
      var _this2 = this;

      var options = uOptions || {},
          noOp = function noOp(c) {
        return true;
      },
          maybeOpenOnly = options.with_closed ? noOp : function (g) {
        return g.is_open;
      },
          maybeWithArchived = options.with_archived ? noOp : function (g) {
        return !g.is_archived;
      };

      return Object.keys(this.slack.groups).map(function (k) {
        return _this2.slack.groups[k];
      }).filter(maybeOpenOnly).filter(maybeWithArchived).map(function (g) {
        return name;
      });
    }
  }, {
    key: 'makeMention',
    value: function makeMention(userId, optionalName) {
      return '<@' + userId + (optionalName ? '|' + optionalName : '') + '>';
    }

    // because it's a slack bot callback, `this` will be slack
    // so get the host object and pass it in as self instead

  }, {
    key: 'handleConnect',
    value: function handleConnect(self) {

      var lchannels = self.channels(),
          lgroups = self.groups(),
          lname = self.slack.self.name,
          lteam = self.slack.team.name;

      return self.handlers.map(function (h) {
        return h.on_connect(lchannels, lgroups, lname, lteam);
      });
    }
  }, {
    key: 'channelUsers',
    value: function channelUsers(options) {
      var _this3 = this;

      if (!options.channel) {
        throw '`channel_users/1` requires a `slack channel` as `options.channel`';
      }

      var user_filter = options.include_bots ? function (u) {
        return !!u && u.presence === 'active';
      } : function (u) {
        return !!u && u.presence === 'active' && !u.is_bot;
      };

      return (options.channel.members || []).map(function (id) {
        return _this3.slack.users[id];
      }).filter(user_filter);
    }

    // because it's a slack bot callback, `this` will be slack
    // so get the host object and pass it in as self instead

  }, {
    key: 'handleMessage',
    value: function handleMessage(self, msg) {

      var channel = self.slack.getChannelGroupOrDMByID(msg.channel),
          user = self.slack.getUserByID(msg.user),
          handler_data = {
        "is_im": channel.is_im === true, // undef if false :|
        "is_channel": channel.is_channel === true, // undef if false :|
        "message_type": msg.type, // reserved word abuse :|
        "username": user.name,
        "channel": channel.is_channel ? channel.name : false,
        "mention": self.makeMention(channel.user, channel.name),
        "text": msg.text,
        "reply": function reply(Text) {
          channel.send(Text);
        }
      };

      self.handlers.map(function (h) {
        return h.on_message(handler_data);
      });
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this4 = this;

      this.slack.on('open', function () {
        return _this4.handleConnect(_this4);
      });
      this.slack.on('message', function (msg) {
        return _this4.handleMessage(_this4, msg);
      });

      this.slack.login();
    }
  }]);

  return Bridge;
})();

exports.Bridge = Bridge;
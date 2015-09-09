
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var slack_lib = require('slack-client'),
    util = require('util');

var Bot = (function () {
  function Bot(options) {
    _classCallCheck(this, Bot);

    if (options.key.indexOf('xoxb') !== 0) {
      throw 'All valid Slack bot keys start \'xoxb\'.  Verify the `key` in your `options`.';
    }

    this.key = options.key;
    this.handlers = options.handlers || []; // whargarbl create default handler
    this.autoReconnect = options.autoReconnect || true;
    this.autoMark = options.autoMark || true;

    this.slack = new slack_lib(this.key, this.autoReconnect, this.autoMark);

    console.log('constructed!');
  }

  _createClass(Bot, [{
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

    // because it's a slack bot callback, `this` will be slack
    // so get the host object and pass it in as self instead

  }, {
    key: 'handleConnect',
    value: function handleConnect(self) {

      var lchannels = self.channels(),
          lgroups = self.groups();

      console.log('Welcome to Slack. You are ' + self.slack.self.name + ' of ' + self.slack.team.name);

      console.log(lchannels.length > 0 ? 'You are in channels #' + lchannels.join(', #') : 'You are not in any channels.');

      console.log(lgroups.length > 0 ? 'You are in groups %' + lgroups.join(', %') : 'You are not in any groups.');
    }

    // because it's a slack bot callback, `this` will be slack
    // so get the host object and pass it in as self instead

  }, {
    key: 'handleMessage',
    value: function handleMessage(self, msg) {}
  }, {
    key: 'connect',
    value: function connect() {
      var _this3 = this;

      this.slack.on('open', function () {
        return _this3.handleConnect(_this3);
      });
      this.slack.on('message', function (msg) {
        return _this3.handleMessage(_this3, msg);
      });

      this.slack.login();
    }
  }]);

  return Bot;
})();

exports['default'] = Bot;
module.exports = exports['default'];
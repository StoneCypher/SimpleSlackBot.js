
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var slack_lib = require('slack-client'),
    util = require('util');

var _default = (function () {
  function _default(options) {
    _classCallCheck(this, _default);

    if (options.key.indexOf('xoxb') !== 0) {
      throw 'All valid Slack bot keys start \'xoxb\'.  Verify the `key` in your `options`.';
    }

    this.key = options.key;
    this.handlers = options.handlers || []; // whargarbl create default handler
    this.autoReconnect = options.autoReconnect || true;
    this.autoMark = options.autoMark || true;

    this.slack = new slack_lib(this.key, this.autoReconnect, this.autoMark);
  }

  _createClass(_default, [{
    key: 'channels',
    value: function channels(options) {

      var maybeMembersOnly = options.include_nonmember ? function (c) {
        return true;
      } : function (c) {
        return c.is_member;
      };

      return Object.keys(slack.channels).map(function (k) {
        return slack.channels[k];
      }).filter(maybeMembersOnly).map(function (c) {
        return c.name;
      });
    }
  }, {
    key: 'handleConnect',
    value: function handleConnect() {
      /*
          var channels = myChannels(),
              groups   = myGroups();
      */
      console.log('Welcome to Slack. You are ' + this.slack.self.name + ' of ' + slack.team.name);
      /*
          console.log( (channels.length > 0)?
            ('You are in channels #' + channels.join(', #')) :
            ('You are not in any channels.'                ));
      
          console.log( (groups.length > 0)?
            ('You are in groups %' + groups.join(', %')) :
            ('You are not in any groups.'              ));
      */
    }
  }, {
    key: 'handleMessage',
    value: function handleMessage(msg) {}
  }, {
    key: 'connect',
    value: function connect() {

      this.slack.on('open', this.handleConnect);
      this.slack.on('message', this.handleMessage);

      this.slack.login();
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

'use strict';

var slack_lib = require('slack-client'),
    util      = require('util');





export default class {

  constructor(options) {

    if (options.key.indexOf('xoxb') !== 0) {
      throw 'All valid Slack bot keys start \'xoxb\'.  Verify the `key` in your `options`.';
    }

    this.key           = options.key;
    this.handlers      = options.handlers      || []; // whargarbl create default handler
    this.autoReconnect = options.autoReconnect || true;
    this.autoMark      = options.autoMark      || true;

    this.slack         = new slack_lib(this.key, this.autoReconnect, this.autoMark);

  }



  channels(options) {

    var noOp             = (c => true),
        maybeMembersOnly = options.with_nonmember? noOp : (c => c.is_member);

    return Object
      .keys(slack.channels)
      .map(k => slack.channels[k])
      .filter(maybeMembersOnly)
      .map(c => c.name);

  }



  handleConnect() {
/*
    var channels = myChannels(),
        groups   = myGroups();
*/
    console.log('Welcome to Slack. You are ' + this.slack.self.name
              + ' of '                       + slack.team.name);
/*
    console.log( (channels.length > 0)?
      ('You are in channels #' + channels.join(', #')) :
      ('You are not in any channels.'                ));

    console.log( (groups.length > 0)?
      ('You are in groups %' + groups.join(', %')) :
      ('You are not in any groups.'              ));
*/
  }



  handleMessage(msg) {

  }



  connect() {

    this.slack.on('open',    this.handleConnect);
    this.slack.on('message', this.handleMessage);

    this.slack.login();

  }

}

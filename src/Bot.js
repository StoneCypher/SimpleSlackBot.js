
'use strict';

var slack_lib = require('slack-client'),
    util      = require('util');





export default class Bot {

  constructor(options) {

    if (options.key.indexOf('xoxb') !== 0) {
      throw 'All valid Slack bot keys start \'xoxb\'.  Verify the `key` in your `options`.';
    }

    this.key           = options.key;
    this.handlers      = options.handlers      || []; // whargarbl create default handler
    this.autoReconnect = options.autoReconnect || true;
    this.autoMark      = options.autoMark      || true;

    this.slack         = new slack_lib(this.key, this.autoReconnect, this.autoMark);

    console.log('constructed!');

  }



  channels(uOptions) {

    var options          = uOptions || {},

        noOp             = (c => true),
        maybeMembersOnly = options.with_nonmember? noOp : (c => c.is_member);

    return Object
      .keys(this.slack.channels)
      .map(k => this.slack.channels[k])
      .filter(maybeMembersOnly)
      .map(c => c.name);

  }



  groups(uOptions) {

    var options           = uOptions || {},

        noOp              = (c => true),
        maybeOpenOnly     = options.with_closed   ? noOp : (g =>  g.is_open),
        maybeWithArchived = options.with_archived ? noOp : (g => !g.is_archived);

    return Object
      .keys(this.slack.groups)
      .map(k => this.slack.groups[k])
      .filter(maybeOpenOnly)
      .filter(maybeWithArchived)
      .map(g => name);

  }



  // because it's a slack bot callback, `this` will be slack
  // so get the host object and pass it in as self instead

  handleConnect(self) {

    var lchannels = self.channels(),
        lgroups   = self.groups();

    console.log('Welcome to Slack. You are ' + self.slack.self.name
              + ' of '                       + self.slack.team.name);

    console.log( (lchannels.length > 0)?
      ('You are in channels #' + lchannels.join(', #')) :
      ('You are not in any channels.'                ));

    console.log( (lgroups.length > 0)?
      ('You are in groups %' + lgroups.join(', %')) :
      ('You are not in any groups.'              ));

  }



  // because it's a slack bot callback, `this` will be slack
  // so get the host object and pass it in as self instead

  handleMessage(self, msg) {

  }



  connect() {

    this.slack.on('open',    ()    => this.handleConnect(this));
    this.slack.on('message', (msg) => this.handleMessage(this, msg));

    this.slack.login();

  }

}

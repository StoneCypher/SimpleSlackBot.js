
'use strict';

import DefaultHandler from "./DefaultHandler.js";

var slack_lib = require('slack-client');





export class Bridge {

  constructor(options) {

    if (options.key.indexOf('xoxb') !== 0) {
      throw 'All valid Slack bot keys start \'xoxb\'.  Verify the `key` in your `options`.';
    }

    this.key           = options.key;
    this.handlers      = options.handlers      || [new DefaultHandler()];
    this.autoReconnect = options.autoReconnect || true;
    this.autoMark      = options.autoMark      || true;

    this.slack         = new slack_lib(this.key, this.autoReconnect, this.autoMark);

    this.handlers.map(h => h.on_construct());

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



  makeMention(userId, optionalName) {
    return '<@' + userId + (optionalName? ('|' + optionalName) : '') + '>';
  }



  // because it's a slack bot callback, `this` will be slack
  // so get the host object and pass it in as self instead

  handleConnect(self) {

    var lchannels = self.channels(),
        lgroups   = self.groups(),
        lname     = self.slack.self.name,
        lteam     = self.slack.team.name;

    return self.handlers.map(h => h.on_connect(lchannels, lgroups, lname, lteam));

  }



  channelUsers(options) {

    if (!(options.channel)) { throw '`channel_users/1` requires a `slack channel` as `options.channel`'; }

    var user_filter = options.include_bots?
      (u => !!u && (u.presence === 'active'))
    : (u => !!u && (u.presence === 'active') && !u.is_bot);

    return (options.channel.members || [])
      .map(id => this.slack.users[id])
      .filter(user_filter);

  }



  // because it's a slack bot callback, `this` will be slack
  // so get the host object and pass it in as self instead

  handleMessage(self, msg) {

    var channel      = self.slack.getChannelGroupOrDMByID(msg.channel),
        user         = self.slack.getUserByID(msg.user),

        handler_data = {
          "is_im"        : channel.is_im      === true,  // undef if false :|
          "is_channel"   : channel.is_channel === true,  // undef if false :|
          "message_type" : msg.type,                     // reserved word abuse :|
          "username"     : user.name,
          "channel"      : channel.is_channel? channel.name : false,
          "mention"      : self.makeMention(channel.user, channel.name),
          "text"         : msg.text,
          "reply"        : function(Text) { channel.send(Text); }
        };

    self.handlers.map(h => h.on_message(handler_data));

  }



  connect() {

    this.slack.on('open',    ()    => this.handleConnect(this));
    this.slack.on('message', (msg) => this.handleMessage(this, msg));

    this.slack.login();

  }

}

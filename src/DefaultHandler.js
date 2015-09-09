
'use strict';

import Handler from "./Handler.js";





export default class DefaultHandler extends Handler {

  constructor() { super(); }



  on_construct() {
    console.log("SimpleSlackBot default handler constructed.");
  }

  on_connect(Channels, Groups, Name, Team) {
    console.log("Connected to Slack as '" + Name + "' of team '" + Team + "'");
    console.log("Member of " + Channels.length + " channels and " + Groups.length + " groups.");
  }



  on_message(M) {

    var starts_with = (X) => M.text.indexOf(X) === 0,
        d6          = ()  => (Math.floor(Math.random() * 6) + 1).toString();

    if (starts_with('SimpleSlackBot')) { M.reply(":smile:"); }

    // fallthrough is intentional
    if (starts_with('SSB: Timestamp')) { M.reply(" :clock2: "    + (new Date).getTime()); }
    if (starts_with('SSB: Time'))      { M.reply(" :clock5: "    + (new Date).toLocaleString()); }

    if (starts_with('SSB: Dice'))      { M.reply(" :game_die: " + d6() + " " + d6()); }

  }

}

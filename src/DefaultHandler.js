
'use strict';

import Handler from "./Handler.js";





export default class DefaultHandler extends Handler {

  constructor()       { super(); }

  on_construct()      { console.log("SimpleSlackBot default handler constructed."); }
  on_connect(C,G,N,T) { console.log("Connected as " + N + " of " + T); }
  on_message(M)       { if (M.text.indexOf('SimpleSlackBot') === 0) { M.reply(":smile:"); } }

}

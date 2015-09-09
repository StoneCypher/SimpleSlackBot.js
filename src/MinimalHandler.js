
'use strict';

import Handler from "./Handler.js";





export default class MinimalHandler extends Handler {

  constructor() { super(); }

  on_message(M) {

    if (M.text.indexOf('Danger zone') === 0) {
        M.reply("LANAAAAA :smile: :racecar:");
    }

  }

}

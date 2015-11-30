# SimpleSlackBot.js

A better lightweight client wrapper for the Slack RTAPI

This is a work in progress.





## TL;DR

1. Go to a `slack` instance that you are an administrator of.  If you don't
   have one, [create one](https://slack.com/create#email).
   1. New `slack` instances come with all their integrations pre-filled.
      Remove all of them except `slackbot` (and maybe `giphy`.)
1. Set up a new "bot integration" to get an
   [API Key](https://euonumos.slack.com/services/new/bot)
1. Put your API key into an environment variable, because only knuckle dragging
   savages hard-code them into repositories.  The name isn't important other
   than to be unique, so for this tutorial, we will assume `YOUR_SLACK_API_KEY`.
   1. For portability reasons, use only upper case letters and underscores.
1. Install this lib into your js project: `npm install --save simpleslackbot`
1. Write the following code:

```javascript
var ssb = require('simpleslackbot'),
    key = process.env.YOUR_SLACK_API_KEY,

    hnd = function(msg) {
            if (msg.text === 'Shave and a haircut') {
              msg.respond('… two cents :smile:');
            }
          },

    bot = new ssb({key: key, handlers: [hnd]});

bot.connect();
```

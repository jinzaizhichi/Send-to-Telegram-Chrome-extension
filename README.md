# Send-to-Telegram for Google Chrome

[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/dgblfklicldlbclahclbkeiacpiiancc?color=brightgreen&logo=google-chrome)](https://chrome.google.com/webstore/detail/send-to-telegram-for-goog/dgblfklicldlbclahclbkeiacpiiancc) [![license: MIT](https://img.shields.io/badge/license-MIT-green)](https://github.com/phguo/Send-to-Telegram-Chrome-Extension/blob/master/LICENSE)

<a href="https://www.producthunt.com/posts/send-to-telegram-a-chrome-extension?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-send&#0045;to&#0045;telegram&#0045;a&#0045;chrome&#0045;extension" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=338928&theme=light" alt="Send&#0032;to&#0032;Telegram&#0058;&#0032;A&#0032;Chrome&#0032;Extension - Send&#0032;web&#0032;content&#0032;to&#0032;your&#0032;Telegram&#0032;bot&#0032;privately&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

__** IT WORKS (UPDATED: 2024-08-14) **__

This is a Chrome extension that allows you to send web content (tab, text, image) to your own "Telegram Bot" using official Telegram API, such that you can sync interesting things across devices, i.e., your phone, your PC, and your laptop. 

This project is an alternative to [Pushbullet](https://www.pushbullet.com/) which stopped release on iOS ([Not Available on iOS : PushBullet](https://www.reddit.com/r/PushBullet/comments/eirc1m/not_available_on_ios/)). Since a third-party server is not required for this extension, so you do not need to worry about privacy.


## Getting Start

0. Install "Send to Telegram" from [Chrome Web Store - Send to Telegram](https://chrome.google.com/webstore/detail/send-to-telegram-for-goog/dgblfklicldlbclahclbkeiacpiiancc).
1. Create a Telegram Bot following [Telegram official introduction](https://core.telegram.org/bots#6-botfather) and get your bot `<API token>`.
2. **Send any message to the bot created, in the Telegram APP.**
3. Get your `<User ID> ` (value of `id` in the response) by visiting `https://api.telegram.org/bot<API token>/getUpdates`.
4. Fill your `<API token>` and `<User ID>` in the extension setting page. 
5. If everything is working correctly, the settings page and your bot will display '"Send to Telegram" configured successfully!'.

## Usage

You can use this extension intuitively:

- Send **tab** to your bot
  - click on the top right extension icon <img src="https://github.com/phguo/Send-to-Telegram-Chrome-Extension/blob/master/tg.png" alt="Telegram icon" width="15" height="15">.
- Send **text** to your bot
  - select web content and right click -> `Push this selection to Telegram Bot`.
- Send **image** to your bot
  - right click on an image -> `Send to Telegram`.
- Send **URL** to your bot
  - right click on a URL -> `Send to Telegram`.

## Changelog

- [v1.1.1](https://github.com/phguo/Send-to-Telegram-Chrome-Extension/releases/tag/v1.1.1) - Aug. 14, 2024
  - Migrate to Manifest V3.
  - Change the icon.
  - Add "Setup Instruction" to the options page.

- [v0.9](https://github.com/phguo/Send-to-Telegram-Chrome-Extension/releases/tag/v0.9) - Mar. 31, 2021
  - The first release.

## TODO

- [ ] Open link sent from phone.
- [ ] Add shortcut (suggested by [brucmao](https://www.v2ex.com/t/777006#r_10550028)).
- [ ] Add user interface for sending custom content (suggested by [he110comex](https://www.v2ex.com/t/777006#r_10544806) and [Tgeek](https://www.v2ex.com/t/777006#r_10549271)).
- [ ] Send image file instead of URL (suggested by [jemyzhang](https://www.v2ex.com/t/777006#r_10527353)).
- [ ] Set up API URL manually (suggested by [windyskr](https://www.v2ex.com/t/777006#r_10527433)).
- [ ] Obtain `<API token>` automatically.
- [ ] Open new tab in Chrome when a URL is send to bot from phone.

## License

This project is licensed under the MIT License, see the [LICENSE](https://github.com/phguo/Send-to-Telegram-Chrome-Extension/blob/master/LICENSE) file for details.

## Acknowledgments

- This project was forked from [rahimnathwani/pushover-for-chrome](https://github.com/rahimnathwani/pushover-for-chrome) for Pushover.
- The [icon](https://github.com/phguo/Send-to-Telegram-Chrome-Extension/blob/master/tg.png) was created by Picons on [Flaticon](https://www.flaticon.com/free-icons/phone).

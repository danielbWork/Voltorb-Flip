<h2><a href="" target="_blank" rel="noopener noreferrer"><img width="48" src="assets/icons/voltorb_96x96.png" alt=""></a>  Voltorb-Flip</h2>

The greatest pokemon minigame of all time

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Overview](#overview)
- [Permissions used](#permissions-used)
- [Thanks](#thanks)
- [License](#license)

## Description

`Voltorb-Flip` is a Svelte based webextension that allows you to play the voltorb flip minigame from Pokemon HeartGold and SoulSilver on your browser.

## Usage

```bash
$ yarn install
$ yarn start
```

### `yarn start`

Build the extension into `dist/webext-dev` folder for **development**.

### `yarn build`

Build the extension into `dist/webext-prod` folder for **production**.

### `yarn build-zip`

Build a zip file following this format `<name>-<version>.zip` file.
Zip file is located in `dist/webext-zip` folder.


## Overview

- Play the game either in popup or tab
- Select between the hidden tabs and try to find all x2s and x3s
- Avoid voltorbs to not be blow up
- Reach Level 8 to unlock a special reward

## Permissions used
- **tabs**: For creating and managing the tabbed version of the game
- **storage**: Used to save the game settings

## Thanks

- **Pokemon**: For creating pokemon in general and this minigame (please don't sue me)
- **https://voltorbflip.brandon-stein.com/**: For inspiration and some icons
- **https://bulbapedia.bulbagarden.net/**: For game logic and explanations
- **https://smogon.com**: For basis images that were both for design and cropping
- **https://Thefontsmagazine.com**: For the pokemon font
- **https://www.pentacom.jp/pentacom/bitfontmaker2/**: For creating some custom fonts for scores
- **pokemon infinitefusions**: For reintroducing me to voltorb-flip and some images and font basing
- **icons8.com**: For some useful icons

## License

This project is licensed under the terms of the [MIT License](LICENSE).

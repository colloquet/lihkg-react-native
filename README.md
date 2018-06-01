# LIHKG (by [Coke_Zero](http://colloque.io/))

> LIHKG mobile client built with React Native

![LIHKG RN](https://img.eservice-hk.net/upload/2018/06/01/130656_b480a3f50320bb9bb4c0997678c5d9c3.gif "LIHKG React Native")

## Build Setup

``` bash
# install dependecies
npm install

# start JS server
npm start

# run on iOS emulator
react-native run-ios

# run on Android device or emulator
react-native run-android
```

## Update to latest icon set

1. Download latest hkgmoji.json from lihkg.com
2. Place at the root of project, same as `get-icon-path.js`
3. Run `node get-icon-path.js` will generate a new `hkgmoji.js`
4. Replace the one in `/src`

## Todo (Priority high to low)

- Android support
- light / white mode
- F5 in thread
- Page switcher
- Youtube preview
- Change font size
- Read history
- Image mode
- Jump to last read position
- Sub category
- Code syntax highlight

## Special Thanks

- 連尼住
- HKG+
- 望遠
- [https://na.cx](https://na.cx)

## License

MIT License

Copyright (c) 2018 Colloque Tsui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
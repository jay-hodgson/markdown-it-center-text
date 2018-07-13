# markdown-it-center-text

[![Build Status](https://img.shields.io/travis/jay-hodgson/markdown-it-center-text/master.svg?style=flat)](https://travis-ci.org/jay-hodgson/markdown-it-center-text)
[![NPM version](https://img.shields.io/npm/v/markdown-it-center-text.svg?style=flat)](https://www.npmjs.org/package/markdown-it-center-text)
[![Coverage Status](https://img.shields.io/coveralls/jay-hodgson/markdown-it-center-text/master.svg?style=flat)](https://coveralls.io/r/jay-hodgson/markdown-it-center-text?branch=master)

> Center text plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

`->Centered Text<-` => `<div class="text-align-center">Centered Text</div>`


## Install

node.js, browser:

```bash
npm install markdown-it-center-text --save
bower install markdown-it-center-text --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-center-text'));

md.render('->Centered Text<-') // => '<div class="text-align-center">Centered Text</div>'

```

The widgetparams can be used to determine what kind of html widget should be rendered in the output container.

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitCentertext`.


## License
[MIT](https://github.com/jay-hodgson/markdown-it-center-text/blob/master/LICENSE)

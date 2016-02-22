# markdown-it-centertext

[![Build Status](https://img.shields.io/travis/jay-hodgson/markdown-it-centertext/master.svg?style=flat)](https://travis-ci.org/jay-hodgson/markdown-it-centertext)
[![NPM version](https://img.shields.io/npm/v/markdown-it-centertext.svg?style=flat)](https://www.npmjs.org/package/markdown-it-centertext)
[![Coverage Status](https://img.shields.io/coveralls/jay-hodgson/markdown-it-centertext/master.svg?style=flat)](https://coveralls.io/r/jay-hodgson/markdown-it-centertext?branch=master)

> Synapse tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

`->Centered Text<-` => `<span style="text-align: center;">Centered Text</span>`

## Install

node.js, browser:

```bash
npm install markdown-it-centertext --save
bower install markdown-it-centertext --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-centertext'));

md.render('->Centered Text<-') // => '<span style="text-align: center;">Centered Text</span>'

```

The widgetparams can be used to determine what kind of html widget should be rendered in the output container.

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitCentertext`.


## License
[MIT](https://github.com/jay-hodgson/markdown-it-centertext/blob/master/LICENSE)

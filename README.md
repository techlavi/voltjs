VoltJs - A PHP Volt templating engine for JavaScript (node/browser)
======
[![Build Status](https://travis-ci.com/techlavi/volt-js.png?branch=master)](https://travis-ci.com/techlavi/volt-js)
[![npm version](https://img.shields.io/npm/v/volt-js.svg)](https://www.npmjs.com/package/volt-js)
[![David](https://img.shields.io/david/dev/techlavi/volt-js.svg)](https://www.npmjs.com/package/volt-js)
[![npm](https://img.shields.io/npm/dw/volt-js.svg)](https://www.npmjs.com/package/volt-js)
[![npm](https://img.shields.io/npm/l/volt-js.svg)](https://github.com/package/volt-js/blob/master/LICENSE)

VoltJs is a port of the Volt Template Engine to Javascript, a JavaScript template library that supports the template [syntax](https://github.com/techlavi/volt-js/wiki/syntax) and all the features (functions, variable modifiers, etc.) of the well-known PHP template engine [Volt](https://docs.phalcon.io/4.0/en/volt).

VoltJs is written entirely in JavaScript, does not have any DOM/browser or third-party JavaScript library dependencies and can be run in a web browser as well as a standalone JavaScript interpreter or [CommonJS](http://www.commonjs.org/) environments like [node.js](https://nodejs.org/).

### Using VoltJs with CDN
##### Always latest version (don't use in production)
```
https://cdn.jsdelivr.net/npm/volt-js/browser.js
```
##### Current latest version (1.0.0)
```
https://cdn.jsdelivr.net/npm/volt-js@1.0.0/browser.js
```

### DOCUMENTATION

[https://github.com/techlavi/volt-js/wiki](https://github.com/techlavi/volt-js/wiki)

### CONTRIBUTIONS & TESTS

* Pull request
  Best is open a issue first. Then send a pull request referencing the issue number. Before sending pull request make sure you add test case for the fix. Make sure all test cases are passing and eslint tests pass.

* Test cases:-
  ```npm run test```

* ES Lint tests:-
  ```npm run lint```

* Build and compress:-
  ```npm run build```

* Release on NPM:-
  ```npm run publish```

### LICENSE

[MIT](https://raw.githubusercontent.com/techlavi/volt-js/master/LICENSE)

# [Rebol][1] & [Red][2] language grammar for [highlight.js](https://highlightjs.org/)

[![version](https://badgen.net/npm/v/highlightjs-redbol)](https://www.npmjs.com/package/highlightjs-redbol) [![license](https://badgen.net/badge/license/CC0%201.0/blue)](https://github.com/Oldes/highlightjs-redbol/blob/master/LICENSE)
![install size](https://badgen.net/packagephobia/install/highlightjs-redbol) ![minified size](https://badgen.net/bundlephobia/min/highlightjs-redbol)
[![Build Status](https://travis-ci.org/Oldes/highlightjs-redbol.svg?branch=master)](https://travis-ci.org/Oldes/highlightjs-redbol)

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" charset="UTF-8"
  src="/path/to/highlightjs-redbol/dist/redbol.min.js"></script>
<script type="text/javascript">
  hljs.initHighlightingOnLoad();
</script>
```

### Using directly from the UNPKG CDN

```html
<script type="text/javascript"
  src="https://unpkg.com/highlightjs-redbol/dist/redbol.min.js"></script>
```

- More info: <https://unpkg.com>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsCypher = require('highlightjs-redbol');

hljs.registerLanguage("redbol", hljsRedbol);
hljs.initHighlightingOnLoad();
```

### React

You need to import both Highlight.js and third-party language like Cypher:

```js
import React, {Component} from 'react'
import 'highlight.js/scss/darcula.scss' # your favourite theme
import redbol from './redbol'
import hljs from 'highlight.js'
hljs.registerLanguage('redbol', redbol);

class Highlighter extends Component
{
  constructor(props)
  {
    super(props);
    hljs.initHighlightingOnLoad();
  }

  render()
  {
    let {children} = this.props;
    return
    {
      <pre ref={(node) => this.node = node}>
        <code className="redbol">
          {children}
        </code>
      </pre>
    }
  }
}

export default Highlighter;
```

## License

Highlight.js is released under the CC0 1.0 License. See [LICENSE][4] file
for details.

### Author & Maintainer

Oldes <oldes.huhuman@gmail.com>

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Red: [https://www.red-lang.org][1]
- Learn more about Rebol: [http://www.rebol.com][2] or [Oldes' fork][3]

[1]: https://www.red-lang.org
[2]: http://www.rebol.com
[3]: https://oldes.github.io/Rebol3
[4]: https://github.com/oldes/highlightjs-redbol/blob/master/LICENSE

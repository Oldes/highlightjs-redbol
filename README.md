# [Rebol][1] & [Red][2] language grammar for [highlight.js][5](11.9.0)

[![version](https://badgen.net/npm/v/highlightjs-redbol?v2.0.1)](https://www.npmjs.com/package/highlightjs-redbol)
[![license](https://badgen.net/badge/license/CC0%201.0/blue)](https://github.com/Oldes/highlightjs-redbol/blob/master/LICENSE)
[![minified size](https://badgen.net/bundlephobia/min/highlightjs-redbol?v2.0.1)](https://unpkg.com/highlightjs-redbol/dist/redbol.min.js)

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<link rel="stylesheet" href="/path/to/styles/default.min.css">
<script src="/path/to/highlight.min.js"></script>
<script src="/path/to/redbol.min.js"></script>
<script>hljs.highlightAll();</script>
<pre><code class="language-rebol">...</code></pre>
```

### Using directly from the UNPKG CDN

```html
<script src="https://unpkg.com/highlightjs-redbol@2.0.2/dist/redbol.min.js"></script>
```

- More info: <https://unpkg.com>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlight.js');
var hljsRedbol = require('highlightjs-redbol');

hljs.highlightAll();
```

### React

You need to import both Highlight.js and third-party language like Redbol:

```js
import React, {Component} from 'react'
import 'highlight.js/scss/darcula.scss' # your favourite theme
import hljs from 'highlight.js'
import redbol from './redbol'

class Highlighter extends Component
{
  constructor(props)
  {
    super(props);
    hljs.highlightAll();
  }

  render()
  {
    let {children} = this.props;
    return
    {
      <pre ref={(node) => this.node = node}>
        <code className="rebol">
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

- The official site for the Highlight.js library is [https://highlightjs.org][5].
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Red: [https://www.red-lang.org][2]
- Learn more about Rebol: [http://www.rebol.com][1] or [Oldes' fork][3]
- Project pages: [https://oldes.github.io/highlightjs-redbol/][6]

[1]: http://www.rebol.com
[2]: https://www.red-lang.org
[3]: https://oldes.github.io/Rebol3
[4]: https://github.com/oldes/highlightjs-redbol/blob/master/LICENSE
[5]: https://highlightjs.org
[6]: https://oldes.github.io/highlightjs-redbol/

# [Rebol][1] & [Red][2] language grammar for [highlight.js][5](11.9.0)

[![version](https://badgen.net/npm/v/highlightjs-redbol?v2.1.2)](https://www.npmjs.com/package/highlightjs-redbol)
[![license](https://badgen.net/badge/license/CC0%201.0/blue)](https://github.com/Oldes/highlightjs-redbol/blob/master/LICENSE)
[![minified size](https://badgen.net/bundlephobia/min/highlightjs-redbol?v2.1.2)](https://unpkg.com/highlightjs-redbol/dist/redbol.min.js)

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

### Using directly from the UNPKG CDN <https://unpkg.com>

#### Common JS
```html
<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css">
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://unpkg.com/highlightjs-redbol@2.1.2/dist/redbol.min.js"></script>

<pre><code class="language-rebol">...</code></pre>
<script>hljs.highlightAll();</script>
```

#### ES6 Modules
```html
<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css">
<script type="module">
import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/highlight.min.js';
//  and it's easy to individually load & register additional languages
import hljsRebol from 'https://unpkg.com/highlightjs-redbol@2.1.2/dist/redbol.es.min.js';
hljs.registerLanguage('rebol', hljsRebol);
</script>

<pre><code class="language-rebol">...</code></pre>
<script>hljs.highlightAll();</script>
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

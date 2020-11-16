# [Rebol][1] & [Red][2] language grammar for [highlight.js](https://highlightjs.org/)

[![version](https://badgen.net/npm/v/highlightjs-redbol)](https://www.npmjs.com/package/highlightjs-redbol)
[![license](https://badgen.net/badge/license/CC0%201.0/blue)](https://github.com/Oldes/highlightjs-redbol/blob/master/LICENSE)
[![minified size](https://badgen.net/bundlephobia/min/highlightjs-redbol)](https://unpkg.com/highlightjs-redbol/dist/redbol.min.js)
[![Build Status](https://travis-ci.org/Oldes/highlightjs-redbol.svg?branch=master)](https://travis-ci.org/Oldes/highlightjs-redbol)


## [Usage](#usage)

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

### [Rebol code examples](#examples)

Simple HTTP server:

```rebol
Rebol [
	Title: "HTTPD Scheme example"
]

import %httpd.reb

system/options/log/httpd: 3 ; for verbose output

; make sure that there is the directory for logs
make-dir/deep %_logs/

http-server/config/actor 8082 [
	;- Main server configuration
	
	root: %./
	server-name: "nginx"  ;= it's possible to hide real server name
	keep-alive: [15 100]  ;= [timeout max-requests] or FALSE to turn it off
	list-dir?:  #[true]   ;= allow directory listing
	log-access: %_logs/test-access.log
	log-errors: %_logs/test-errors.log

] [
	;- Server's actor functions

	On-Accept: func [info [object!]][
		; allow only connections from localhost
		; TRUE = accepted, FALSE = refuse
		find [ 127.0.0.1 ] info/remote-ip 
	]
]
```

Github API client:

```rebol
Rebol [
	title: "Github API"
	author: "Oldes"
	license: MIT
]

My-GitHub-authorization: "token ..." ;<--- replace ...  with your API token!

github: context [
	api.github: https://api.github.com/
	owner: repository: none
	authorization: :My-GitHub-authorization

	data: #()
	response: none

	use-repo: func[o r][ owner: o repository: r] 

	get: object [
		issues: func[][
			*do 'GET [%repos/ owner %/ repository %/issues] none
		]
		issue: func[number [integer!]][
			*do 'GET [%repos/ owner %/ repository %/issues/ number] none
		]
		issue-comments: func[
			{Gets all comments of an issue by its number}
			number [integer!]
		][
			*do 'GET [%repos/ owner %/ repository %/issues/ number %/comments] none
		]
		issue-labels: func[
			{Gets all labels of an issue by its number}
			number [integer!]
		][
			*do 'GET [%repos/ owner %/ repository %/issues/ number %/labels] none
		]

		current-user: does [*do 'GET %user none]
	]

	post: object [
		issue: func[
			data [map!] {title, body, labels etc..}
		][
			unless block? data/labels [ data/labels: reduce [labels] ]
			*do 'POST [%repos/ owner %/ repository %/issues] data
		]

		issue-comment: func[
			{Adds a comment to an issue by its number}
			number  [integer!]
			body    [string!]
		][
			clear data
			data/body: body
			*do 'POST [%repos/ owner %/ repository %/issues/ number %/comments] data
		]

		issue-label: func[
			{Adds a label to an issue by its number}
			number  [integer!]
			body    [string! block!]
		][
			clear data
			append data/labels: clear [] body
			*do 'POST [%repos/ owner %/ repository %/issues/ number %/labels] data
		]
	]

	edit: object [
		issue: func[number [integer!] data [map!]][
			*do 'PATCH [%repos/ owner %/ repository %/issues/ number] data
		]
	]

	*do: func[method [word!] path data [map! none!] /local url header][
		url: join api.github path
		;?? url
		header: clear #()
		header/Authorization: authorization
		header/X-OAuth-Scopes: "repo"
		header/Accept: "Accept: application/vnd.github.v3+json"

		if map? data [header/Content-Type:  "application/json"]
		response: write url reduce [method to-block header to-json data]
		try [response: load-json to string! response]
	]
]
```

and or some random function:
```rebol
unpack-bits: function [
	{Decompress data compressed by Apple's PackBits routine}
	c [binary!] {Data to decompress}
][
	;https://web.archive.org/web/20080705155158/http://developer.apple.com/technotes/tn/tn1023.html
	u: make binary! 4 * length? c
	i: c ;store position
	while [not tail? c][
		n: first+ c
		case [
			n < 128 [
				++ n
				append u copy/part c n
				c: skip c n
			]
			n > 128 [
				n: 257 - n
				append/dup u first+ c n
			]
			;n = 128 is ignored
		]
	]
	c: i ;restore position
	u
]
```


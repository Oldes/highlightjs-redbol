# [Rebol][1] & [Red][2] language grammar for [highlight.js][3]

[![version](https://badgen.net/npm/v/highlightjs-redbol)](https://www.npmjs.com/package/highlightjs-redbol)
[![license](https://badgen.net/badge/license/CC0%201.0/blue)](https://github.com/Oldes/highlightjs-redbol/blob/master/LICENSE)
[![minified size](https://badgen.net/bundlephobia/min/highlightjs-redbol)](https://unpkg.com/highlightjs-redbol/dist/redbol.min.js)
[![Build Status](https://travis-ci.org/Oldes/highlightjs-redbol.svg?branch=master)](https://travis-ci.org/Oldes/highlightjs-redbol)

## List of content

- [Usage](#usage)
- [Rebol code examples](#rebol-code-examples)
- [Red code examples](#red-code-examples)
- [Red/System code examples](#redsystem-code-examples)


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



## Rebol code examples

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

## Red code examples

Simple calculator:

```red
Red [needs: 'view]
view [
     title "Calculator"
     f: field 230x50 font-size 25 ""  return 
     style b: button 50x50 [append f/text face/text]
     b "1"  b "2"  b "3"  b " + "  return 
     b "4"  b "5"  b "6"  b " - "  return 
     b "7"  b "8"  b "9"  b " * "  return 
     b "0"  b "."  b " / "  b "=" [attempt [
             calculation: form do f/text 
             append clear f/text calculation
     ]] 
]
```

## Red/System code examples

```red
Red/System [
	Title:   "Red/System (runtime independent) wait function"
	Author:  "Oldes"
	File: 	 %wait.reds
	Rights:  "Copyright (C) 2017 David 'Oldes' Oliva. All rights reserved."
	License: "BSD-3 - https:;//github.com/red/red/blob/master/BSD-3-License.txt"
]

;use this code only when Red runtime is not embedded 
#if red-pass? = no [
	#switch OS [
		Windows   [
			#import [
				"kernel32.dll" stdcall [
					sleep: "Sleep" [
						dwMilliseconds	[integer!]
					]
				]
			]
			wait: func [ms [integer!]][sleep ms]
		]
		#default  [
			#import [
				LIBC-file cdecl [
					usleep: "usleep" [
						microseconds [integer!]
						return: 	 [integer!]
					]
				]
			]
			wait: func [ms [integer!]][usleep 1000 * ms]
		]
	]
]
```

[1]: http://www.rebol.com
[2]: https://www.red-lang.org
[3]: https://highlightjs.org

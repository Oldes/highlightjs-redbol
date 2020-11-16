## Highlight.js extension for Red and Rebol languages


### Rebol code examples

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



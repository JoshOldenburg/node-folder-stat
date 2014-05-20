node-folder-stat [![Build Status](https://travis-ci.org/JoshTheGeek/node-folder-stat.svg?branch=master)](https://travis-ci.org/JoshTheGeek/node-folder-stat)
================

Run `fs.stat` on every file in a directory.

This returns an array of filenames and an array of stats with correlating indexes.

This is based on code from [`serve-index`](https://github.com/expressjs/serve-index/blob/master/index.js#L347-359).

## Example
```js
var stat = require('folder-stat');
stat('/bin', function(err, stats, files) {
	console.log(stats);
	console.log(files);
});
```

yields:
```js
[
	{
		dev: 16777218,
		mode: 33261,
		nlink: 2,
		uid: 0,
		gid: 0,
		rdev: 0,
		blksize: 4096,
		ino: 17824241,
		size: 18576,
		blocks: 16,
		atime: "Sun May 18 2014 21:23:45 GMT-0400 (EDT)",
		mtime: "Wed Oct 23 2013 19:18:48 GMT-0400 (EDT)",
		ctime: "Wed Oct 23 2013 19:18:48 GMT-0400 (EDT)"
	},
	{
		dev: 16777218,
		mode: 33133,
		nlink: 1,
		uid: 0,
		gid: 0,
		rdev: 0,
		blksize: 4096,
		ino: 17823135,
		size: 1228240,
		blocks: 1208,
		atime: "Mon May 19 2014 20:07:38 GMT-0400 (EDT)",
		mtime: "Wed Oct 23 2013 19:18:43 GMT-0400 (EDT)",
		ctime: "Wed Oct 23 2013 19:18:43 GMT-0400 (EDT)"
	},
	...
]

[
	'bash',
	'cat',
	...
]
```

html-patcher-stream
===================

A wrapper over [html-patcher](https://github.com/azer/html-patcher) which returns a writable stream. Pipe in your rendered templates and have the dom get patched with any changes since the last render.

Installing
----------

```bash
npm install --save html-patcher-stream
```

Use [browserify](http://browserify.org/) to make a bundle that uses this module.

API
---

### `patcher(element,[initial])`

#### parameters

-	`element` (Element): The DOM element to patch to
-	`[initial]` (String): The initial template to render out

#### returns

-	(WritableStream): Pipe strings into this stream and it'll update the DOM in the element that was provided in the constructor.

Example
-------

```javascript
var patcher = require("../");
var map = require("through2-map").obj;
var interval = require("interval-stream");
var concat = require("array-concat-stream");
var streamArray = require("stream-array");

var data = ["foo", "bar", "fizz", "baz"];

streamArray(data)
  .pipe(interval(1000))
  .pipe(concat())
  .pipe(map(render))
  .pipe(patcher(document.body, render([])))


function render(items) {
  return "<ul>" + items.map(function (item) {
    return "<li>" + item + "</li>";
  }).join("\n") + "</ul>";
}

/**
 * Should build up the list item by item
 */
```

Make sure the body has been created before this script is called. Don't execute it while it's still in the header.

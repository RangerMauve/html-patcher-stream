var Writable = require("stream").Writable;
var patcher = require("html-patcher");

module.exports = patcherStream;

function patcherStream(element, initial) {
	var stream = new Writable();
	var patch;
	
	if (initial) init(initial);

	stream._write = function(chunk, encoding, cb) {
		var html = chunk.toString();
		if (!patch) {
			init(html);
		} else {
			patch(html);
		}
		cb(null);
	}

	return stream;

	function init(initial) {
		patch = patcher(element, initial || "<div></div>");
	}
}

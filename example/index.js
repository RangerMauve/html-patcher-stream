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

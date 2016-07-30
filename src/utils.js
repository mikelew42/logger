var is = require("./is");
var sMST = require("./sourcemapped-stacktrace");

exports.getBacktrace = function(){
	// console.group('backtrace');
	var stack =
		((new Error).stack + '\n');

		// console.log('getBacktrace');
		// console.log(stack);
		sMST.mapStackTrace(stack, function(newStack){
			// console.log(newStack.join("\n"));
			stack = newStack.join("\n").replace(new RegExp("webpack:///", "g"), "webpack:///./");
			// console.log(stack);
		});

		stack = stack.replace(/^\s+(at eval )?at\s+/gm, '');
		// console.log(stack);

		stack = stack.replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2');
		// console.log(stack);

		stack =	stack.replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)');
		// console.log(stack);

		stack = stack.replace(/^(.+) \((.+)\)$/gm, '$1```$2');
		// console.log(stack);

		stack = stack.split('\n');
		// console.log(stack);

		stack = stack.slice(1, -1);
		// console.log(stack);

	var backtrace = [];

	for (var i in stack){
		stack[i] = stack[i].split('```');
		var bt = {
			func: stack[i][0],
			fullPathAndLine: stack[i][1],

		};
// 
		// console.log(bt);
		var lineAndPos = stack[i][1].match(/:\d+:\d+$/);
		if (lineAndPos && lineAndPos[0])
			lineAndPos = lineAndPos[0].split(":");
		var url = stack[i][1].replace(/:\d+:\d+$/, "");
		// console.log(url, lineAndPos);

		var pathBreakdown = stack[i][1].split(':');
		// console.log(pathBreakdown);
		bt.file = url.replace(/^.*[\\\/]/, '');
		bt.line = lineAndPos && lineAndPos[1];
		bt.linePos = lineAndPos && lineAndPos[2];
		// console.log(bt.file, bt.line, bt.linePos);
		backtrace.push(bt);
	}
// console.log(backtrace);
// console.groupEnd();
	return backtrace; //.slice(3);
};

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
exports.getParamNames = function(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

exports.noop = function(){};

var bg = "background: #eee;";

var styles = {
	margin: "margin-left: 0px;",
	padding: "padding: 3px 5px 2px;",
	border: "border-bottom: 1px solid #ddd;",
	background: "background: #eee;",
	line: "line-height: 16px;",
	indent: "12px"
};

exports.styles = styles;

exports.groupStyles = 
	styles.margin + 
	styles.padding + 
	styles.border + 
	styles.background + 
	styles.line;

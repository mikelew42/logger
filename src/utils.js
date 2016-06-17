var is = {
	arr: function(value){
		return toString.call(value) === '[object Array]';
	},
	obj: function(value){
		return typeof value === "object" && !is.arr(value);
	},
	val: function(value){
		return ['boolean', 'number', 'string'].indexOf(typeof value) > -1;
	},
	str: function(value){
		return typeof value === "string";
	},
	num: function(value){
		return typeof value === "number";
	},
	bool: function(value){
		return typeof value === 'boolean';
	},
	fn: function(value){
		return typeof value === 'function';
	},
	sfn: function(value){
		return is.fn(value) && value.Base;
	},
	def: function(value){
		return typeof value !== 'undefined';
	},
	undef: function(value){
		return typeof value === 'undefined';
	},
	simple: function(value){ // aka non-referential
		return typeof value !== 'object' && !is.fn(value); // null, NaN, or other non-referential values?
	}
};

var Base = function Base(o){
	this.assign(o);
	this.initialize.apply(this, arguments);
};

Base.prototype.initialize = function(o, args){};

Base.prototype.assign = function(o){
	if (is.obj(o)){
		for (var i in o)
			this[i] = o[i];
	}
	return this;
};

var getBacktrace = function(){
	var stack =
		((new Error).stack + '\n');

		// console.log(stack);

		stack = stack
			.replace(/^\s+(at eval )?at\s+/gm, '') // remove 'at' and indentation
			.replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2')
			.replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)')
			.replace(/^(.+) \((.+)\)$/gm, '$1```$2')
			.split('\n')
			.slice(1, -1);

	var backtrace = [];

	for (var i in stack){
		stack[i] = stack[i].split('```');
		var bt = {
			func: stack[i][0],
			fullPathAndLine: stack[i][1]
		};

		var pathBreakdown = stack[i][1].split(':');
		bt.file = pathBreakdown[1].replace(/^.*[\\\/]/, '');
		bt.line = pathBreakdown[2];
		bt.linePos = pathBreakdown[3];

		backtrace.push(bt);
	}
// console.log(backtrace);
	return backtrace; //.slice(3);
};

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

var noop = function(){};

var bg = "background: #eee;";

var styles = {
	margin: "margin-left: 0px;",
	padding: "padding: 3px 5px 2px;",
	border: "border-bottom: 1px solid #ddd;",
	background: "background: #eee;",
	line: "line-height: 16px;",
	indent: "12px"
}

var groupStyles = 
	styles.margin + 
	styles.padding + 
	styles.border + 
	styles.background + 
	styles.line;

// copyright 2016 Michael Lewis (lew42.com)
;(function(){

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


var Log = function Log(o){
	this.assign(o);
	this.initialize();
};

Log.prototype = Object.create(Base.prototype);

Log.prototype.assign({
	method: "log",
	afg: true,
	styled: [], // objects { str: "str", styles: "css: props;" }
	initialize: function(){
		this.styled = [];
		this.autoFileGroup();
		this.custom();
		this.log();
	},
	initLog: function(){
		this.styled = [];
		this.autoFileGroup();
		this.custom();
		this.log();
	},
	autoFileGroup: function(){
		if (this.afg && this.logger.afg){
			this.styledIcon();

			if (this.logger.currentFile !== this.trace.file) {
				if (this.logger.currentGroup.type == "file")
					this.logger.currentGroup.close();

				if (this.logger.currentFile !== this.trace.file){
					new FileGroup({
						trace: this.trace,
						lastFile: this.logger.currentFile,
						logger: this.logger
					});
				}
			}

		} else {
			if (this.logger.currentGroup.type == "file")
				this.logger.currentGroup.close();
		}
	},
	custom: function(){},
	styledLineNumber: function(){
		this.styled.unshift({ str: this.trace.line, styles: groupStyles });
	},
	styledIcon: function(){
		var icon;
		if (this.icon)
			icon = this.icon;
		else 
			icon = this.trace.line;
		
		this.styled.push({ str: icon, styles: groupStyles })
	},
	getStyledArgsArray: function(){
		var str = "", styles = [], styled;
		for (var i in this.styled){
			styled = this.styled[i];
			str += "%c" + styled.str;
			styles.push(styled.styles);
		}
		return [].concat(str, styles);
	},
	log: function(args){
		console[this.method].apply(console, this.getStyledArgsArray().concat(Array.prototype.slice.call(this.arguments || [] )));
	}
})


/* * * * * * * * * * *
 *  VAR
 
Cleanup groups with timeout?
 */

	var Var = function Var(){
		this.assign.apply(this, arguments);
		this.initialize();
	};

	Var.prototype = Object.create(Log.prototype);

	Var.prototype.assign({
		custom: function(){
			this.styled.push({ str: this.name + ":", styles: groupStyles });
		}
	});



var Group = function Group(){
	this.assign.apply(this, arguments);
	this.initialize();
};

Group.prototype = Object.create(Log.prototype);

Group.prototype.assign({
	method: "group",
	// type: "group",
	open: true,
	initialize: function(){
		this.styled = [];
		this.autoFileGroup();
		this.custom();
		this.log();
		this.logger.add(this);
	},
	close: function(auto){
		if (this.open){
			if (this === this.logger.currentGroup){
				console.groupEnd();
				this.open = false;
				this.logger.resetGroup();
				this.closeCustom();
			} else {
				console.warn((auto ? "auto " : "") + "attempting to close incorrect group. this:", this, 'this.logger.currentGroup:', this.logger.currentGroup);
			}
		} else {
			console.warn((auto ? "auto " : "") + "already closed " + this.type + " group. this:", this);
		}
	},
	closeCustom: function(){}, // override point
});

var ClosureGroup = function ClosureGroup(){
	this.assign.apply(this, arguments);
	this.initialize();
};

ClosureGroup.prototype = Object.create(Group.prototype);

ClosureGroup.prototype.assign({
	type: "user",
	expand: true,
		initialize: function(){
			this.autoFileGroup();
			this.resolveArgs();
			 if (!this.expand)
					this.method = "groupCollapsed";
			this.log();
			this.logger.add(this);
			this.execute();
			this.close();
		},
		execute: function(){
			this.fn.call(this.this);
		}
});

var FileGroup = function FileGroup(){
	this.assign.apply(this, arguments);
	this.initialize();
};

FileGroup.prototype = Object.create(Group.prototype);

FileGroup.prototype.assign({
	type: "file",
	initialize: function(){
		this.styled = [];
		this.logger.add(this);
		this.lastFile = this.logger.currentFile;
		this.logger.currentFile = this.trace.file;
		this.styledFileName();
		this.log();

		var self = this;
		this.autoCloseTimeout = setTimeout(function(){
			self.close(1);
		}, 0);
	},
	styledFileName: function(){
		this.styled.push({ 
			str: "📄 " +  this.trace.file, 
			styles: "padding: 3px 7px 2px; font-size: 13px; line-height: 18px;" + styles.border + styles.background 
		});
	},
	closeCustom: function(){
		clearTimeout(this.autoCloseTimeout);
		this.logger.currentFile = this.lastFile;
	}
});

var FunctionGroup = function FunctionGroup(){
	this.assign.apply(this, arguments);
	this.initialize();
};

FunctionGroup.prototype = Object.create(Group.prototype);

FunctionGroup.prototype.assign({
	type: "functionGroup",
	initialize: function(){
		this.styled = [];
		this.name = this.def.name;
		this.defFile = this.def.trace.file;
		this.argNames = this.def.argNames;
		this.logger = this.def.logger;
		
		if (!this.def.expand)
			this.method = "groupCollapsed";

		this.autoFileGroup();
		this.buildLabel();
		this.log();
		this.fileChangeLabel();
		this.logger.add(this);
	},
	retLog: function(){
		if (!this.logger.returnToGroup(this))
			console.warn("group inconsistency");

		if (is.def(this.returnValue)){
			this.logger.currentGroup.close();
			console.log('%creturn', groupStyles + "margin-left: " + styles.indent, this.returnValue);
		} else {
			if (this.logUndefinedReturnValue)
				console.log('%creturn', groupStyles, this.returnValue);
			
			this.logger.currentGroup.close();
		}
		return this.returnValue;
	},
	execute: function(){
		this.returnValue = this.def.fn.apply(this.ctx, this.fnArgs);
		this.retLog();
		return this.returnValue;
	},
	fileChangeLabel: function(){
		// if fn is defined elsewhere, label the file change
		if (this.logger.currentFile !== this.def.file){
			console.log("%c"+ this.def.file, groupStyles + "font-weight: bold");
			this.logger.currentFile = this.def.file;
		}
	},
	buildLabel: function(){
		var line = this.trace.line;

		// build the function call label
		var label = [ this.def.label + "(" ];

		if (this.argNames.length){
			for (var i = 0; i < this.argNames.length; i++){
				if (this.argNames[i])
					label.push(this.argNames[i]+":");
				label.push(this.fnArgs[i]);
				if (i < this.argNames.length - 1){
					label.push(",");
				}
			}
		}
		label.push(")");
		this.arguments = label;
	},
	closeCustom: function(){
		if (this.def.cb)
			this.logger.currentFile = this.def.file;
		else
			this.logger.currentFile = this.trace.file;
	}
});


 	var FunctionDefinition = function FunctionDefinition(){
 		this.assign.apply(this, arguments);
 		this.initialize();
 	};

 	FunctionDefinition.prototype = Object.create(Base.prototype);

 	FunctionDefinition.prototype.assign({
 		initialize: function(){
 			this.resolveArgs();
 		},
 		resolveArgs: function(){
 			if (is.str(this.arguments[0])){
 				this.label = this.arguments[0];
 				if (is.fn(this.arguments[1])){
 					this.fn = this.arguments[1];
 				}
 			} else if (is.fn(this.arguments[0])){
 				this.fn = this.arguments[0];
 				if (this.fn.name)
 					this.label = this.fn.name;
 			}

 			this.argNames = getParamNames(this.fn);

 			this.line = this.trace.line;
 			this.file = this.trace.file;
 		},
 		wrapper: function(){
 			var def = this;
 			return function wrapper(){
 				if (!def.logger.log)
 					return def.fn.apply(this, arguments);

 				return new FunctionGroup({
 					trace: getBacktrace()[2],
 					def: def,
 					fnArgs: arguments,
 					ctx: this
 				}).execute();
 				return ret;
 			};
 		}
 	});

var CBGroup = function CBGroup(){
	this.assign.apply(this, arguments);
	this.initialize();
};

CBGroup.prototype = Object.create(FunctionGroup.prototype);

CBGroup.prototype.assign({
	type: "cb",
	afg: false,
	fileChangeLabel: function(){
		console.log("%c📄 "+ this.def.file, groupStyles + "font-weight: bold");
		this.logger.currentFile = this.def.file;
	},
	styledIcon: function(){
		this.styled.push({ str: "⚡", styles: groupStyles });
	},
	buildLabel: function(){

		// this.styledIcon();

		// build the function call label
		var label = [ this.def.label + " (" ];

		if (this.argNames.length){
			for (var i = 0; i < this.argNames.length; i++){
				if (this.argNames[i])
					label.push(this.argNames[i]+":");
					label.push(this.arguments[i]);
				if (i < this.argNames.length - 1){
					label.push(",");
				}
			}
		}
		label.push(")");
		this.arguments = label;
	}
});


 	var CBDefinition = function CBDefinition(){
 		this.assign.apply(this, arguments);
 		this.initialize();
 	};

 	CBDefinition.prototype = Object.create(FunctionDefinition.prototype);

 	CBDefinition.prototype.assign({
 		wrapper: function(){
 			var def = this;
 			return function(){
 				if (!def.logger.log)
 					return def.fn.apply(this, arguments);
 				return new CBGroup({
 					trace: getBacktrace()[2],
 					afg: false,
 					def: def,
 					arguments: arguments,
 					ctx: this
 				}).execute();
 			};
 		}
 	});

function getLoggerBase(){
	var logger = function(val){
		if (!logger.log)
			return val;

		new Log({
			arguments: arguments,
			trace: getBacktrace()[2],
			logger: logger
		});
		return val; // return 1st arg to be an "identity" fn 
	};
	return logger;
}

var Logger = {
	log: true,
	type: "logger",
	afg: true,
	currentFile: "",
	initialize: function(){
		this.openGroups = [];
	},
	currentGroup: new Group({
		type: "root",
		initialize: function(){},
		open: true,
		trace: {
			file: ""
		},
		close: function(){
			console.warn("can't close root group");
		}
	}),
	assign: function(){
		Object.assign.apply(this, arguments);
		return this;
	},
	new: function(){
		var logger = Object.assign(getLoggerBase(), this);
		logger.initialize();
		return logger;
	},
	add: function(group){
		this.openGroups.push(this.currentGroup);
		this.currentGroup = group;
		return group;
	},
	on: function(){
		this.log = true;
	},
	off: function(){
		this.log = false;
	},
	closeAll: function(){
		for (var i = 0; i < this.openGroups.length; i++){
			this.currentGroup.close();
		}
	},
	resetGroup: function(){
		this.currentGroup = this.openGroups.pop();
		this.currentFile = this.currentGroup.trace.file;
	},
	returnToGroup: function(group){
		while ((this.currentGroup !== group) && (this.currentGroup.type !== "root")){
			this.currentGroup.close();
		}
		return this.currentGroup === group;
	},
	group: function(name){
		if (!this.log)
			return name;

		return new Group({
			trace: getBacktrace()[2],
			type: "user",
			arguments: arguments,
			logger: this
		});
	},
	groupc: function(name){
		if (!this.log)
			return name;

		return new Group({
			trace: getBacktrace()[2], 
			type: "user",
			arguments: arguments,
			method: "groupCollapsed",
			logger: this
		});
	},
	rgroup: function(name){
		if (!this.log)
			return name;

		this.closeAll();

		return new Group({
			trace: getBacktrace()[2],
			type: "user",
			arguments: arguments,
			afg: false,
			icon: "⚡",
			logger: this
		});
	},
	rgroupc: function(name){
		if (!this.log)
			return name;

		this.closeAll();

		return new Group({
			trace: getBacktrace()[2],
			type: "user",
			arguments: arguments,
			afg: false,
			method: "groupCollapsed",
			icon: "⚡",
			logger: this
		});
	},
	end: function(){
		if (!this.log)
			return;
		if (this.currentGroup.type === "user"){
			this.currentGroup.close();
		} else if (this.currentGroup.type === "file"){
			this.currentGroup.close();
			this.currentGroup.close();
		}
	},
	var: function(name, val){
		if (!this.log)
			return val;

		new Var({
			arguments: arguments,
			trace: getBacktrace()[2],
			name: name,
			logger: this
		});

		return val;
	},
	closureGroup: function(opts, fn){
		var o = {};
		if (is.str(opts)){
			o.name = opts;
		} else if (is.obj(opts)){
			o = opts;
		}

		o.trace = getBacktrace()[2];
		o.fn = fn;
		o.logger = this;

		new ClosureGroup(o);
	},
	wrap: function(fn){
		if (!this.log){
			if (!is.fn(arguments[0]) && is.fn(arguments[1]))
				return arguments[1];
			return fn;
		}
		var def = new FunctionDefinition({
			trace: getBacktrace()[2],
			fn: fn,
			arguments: arguments,
			expand: true,
			logger: this
		});
		return def.wrapper();
	},
	wrapc: function(fn){
		if (!this.log){
			if (!is.fn(arguments[0]) && is.fn(arguments[1]))
				return arguments[1];
			return fn;
		}
		var def = new FunctionDefinition({
			trace: getBacktrace()[2],
			fn: fn,
			arguments: arguments,
			logger: this
		});
		return def.wrapper();
	},
	cb: function(cb){
		if (!this.log){
			if (!is.fn(arguments[0]) && is.fn(arguments[1]))
				return arguments[1];
			return cb;
		}
		var def = new CBDefinition({
			cb: true,
			trace: getBacktrace()[2],
			fn: cb,
			arguments: arguments,
			expand: true,
			logger: this
		});
		return def.wrapper();
	},
	cbc: function(cb){
		if (!this.log){
			if (!is.fn(arguments[0]) && is.fn(arguments[1]))
				return arguments[1];
			return cb;
		}
		var def = new CBDefinition({
			cb: true,
			trace: getBacktrace()[2],
			fn: cb,
			arguments: arguments,
			logger: this
		});
		return def.wrapper();
	}
};

function getXLoggerBase(){
	return function(val){ return val };
}

var XLogger = {
	type: "xlogger",
	group: noop,
	groupc: noop,
	rgroup: noop,
	end: noop,
	new: function(){
		return Object.assign(getXLoggerBase(), this);
	},
	var: function(name, val){
		return val;
	},
	wrap: function(fn){ 
		return fn;
	},
	wrapc: function(fn){ 
		return fn;
	},
	cb: function(cb){
		if (!is.fn(arguments[0]) && is.fn(arguments[1]))
			return arguments[1];
		return cb;
	},
	cbc: function(cb){
		if (!is.fn(arguments[0]) && is.fn(arguments[1]))
			return arguments[1];
		return cb;
	}
};

window.log = Logger.new();
window.xlog = XLogger.new();


log.resize = true;

if ($){
	$(document).ready(function(){
		if (log.currentGroup.type === "root"){
			log.rgroup("document.ready");
			setTimeout(function(){
				log.end();
			}, 0);
		}
	});
	$(window).load(function(){
		// if (log.currentGroup.type === "root"){
			log.rgroup("window.load");
			setTimeout(function(){
				log.end();
			}, 0);
		// }
	});

	$(window).on('resize.log', function(){
		if (log.resize){
			log.rgroup("window.resize");
			setTimeout(function(){
				log.end();
			}, 0);
		}
	});

	$(document).scroll(function(){
		// if (log.currentGroup.type === "root"){
			log.rgroup("document.scroll");
			setTimeout(function(){ log.end() }, 0);
		// }
	});

	// log.closureGroup({ name: "test" }, function(){
	// 	log('yo');
	// })
}

})();

//# sourceMappingURL=log.js.map
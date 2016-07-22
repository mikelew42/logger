/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(382);
	__webpack_require__(394);

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Log = __webpack_require__(383);
	var Group = __webpack_require__(387);
	var FileGroup = __webpack_require__(388);
	var Var = __webpack_require__(389);
	var ClosureGroup = __webpack_require__(390);
	var FunctionDefinition = __webpack_require__(391);
	var CBDefinition = __webpack_require__(393);
	var utils = __webpack_require__(386);
	var noop = utils.noop;
	var getBacktrace = utils.getBacktrace;
	
	function getLoggerBase() {
		var logger = function logger(val) {
			if (!logger.log) return val;
	
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
		initialize: function initialize() {
			this.openGroups = [];
		},
		currentGroup: new Group({
			type: "root",
			initialize: function initialize() {},
			open: true,
			trace: {
				file: ""
			},
			close: function close() {
				console.warn("can't close root group");
			}
		}),
		assign: function assign() {
			Object.assign.apply(this, arguments);
			return this;
		},
		new: function _new() {
			var logger = Object.assign(getLoggerBase(), this);
			logger.initialize();
			return logger;
		},
		add: function add(group) {
			this.openGroups.push(this.currentGroup);
			this.currentGroup = group;
			return group;
		},
		on: function on() {
			this.log = true;
		},
		off: function off() {
			this.log = false;
		},
		closeAll: function closeAll() {
			for (var i = 0; i < this.openGroups.length; i++) {
				this.currentGroup.close();
			}
		},
		resetGroup: function resetGroup() {
			this.currentGroup = this.openGroups.pop();
			if (this.currentGroup.type === "functionGroup") {
				this.currentFile = this.currentGroup.def.file;
			} else {
				this.currentFile = this.currentGroup.trace.file;
			}
		},
		returnToGroup: function returnToGroup(group) {
			while (this.currentGroup !== group && this.currentGroup.type !== "root") {
				this.currentGroup.close();
			}
			return this.currentGroup === group;
		},
		group: function group(name) {
			if (!this.log) return name;
	
			return new Group({
				trace: getBacktrace()[2],
				type: "user",
				arguments: arguments,
				logger: this
			});
		},
		groupc: function groupc(name) {
			if (!this.log) return name;
	
			return new Group({
				trace: getBacktrace()[2],
				type: "user",
				arguments: arguments,
				method: "groupCollapsed",
				logger: this
			});
		},
		rgroup: function rgroup(name) {
			if (!this.log) return name;
	
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
		rgroupc: function rgroupc(name) {
			if (!this.log) return name;
	
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
		end: function end() {
			if (!this.log) return;
			if (this.currentGroup.type === "user") {
				this.currentGroup.close();
			} else if (this.currentGroup.type === "file") {
				this.currentGroup.close();
				this.currentGroup.close();
			}
		},
		var: function _var(name, val) {
			if (!this.log) return val;
	
			new Var({
				arguments: arguments,
				trace: getBacktrace()[2],
				name: name,
				logger: this
			});
	
			return val;
		},
		closureGroup: function closureGroup(opts, fn) {
			var o = {};
			if (is.str(opts)) {
				o.name = opts;
			} else if (is.obj(opts)) {
				o = opts;
			}
	
			o.trace = getBacktrace()[2];
			o.fn = fn;
			o.logger = this;
	
			new ClosureGroup(o);
		},
		wrap: function wrap(fn) {
			if (!this.log) {
				if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
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
		wrapc: function wrapc(fn) {
			if (!this.log) {
				if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
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
		cb: function cb(_cb) {
			if (!this.log) {
				if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
				return _cb;
			}
			var def = new CBDefinition({
				cb: true,
				trace: getBacktrace()[2],
				fn: _cb,
				arguments: arguments,
				expand: true,
				logger: this
			});
			return def.wrapper();
		},
		cbc: function cbc(cb) {
			if (!this.log) {
				if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
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
	
	function getXLoggerBase() {
		return function (val) {
			return val;
		};
	}
	
	var XLogger = {
		type: "xlogger",
		group: noop,
		groupc: noop,
		rgroup: noop,
		end: noop,
		new: function _new() {
			return Object.assign(getXLoggerBase(), this);
		},
		var: function _var(name, val) {
			return val;
		},
		wrap: function wrap(fn) {
			return fn;
		},
		wrapc: function wrapc(fn) {
			return fn;
		},
		cb: function cb(_cb2) {
			if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
			return _cb2;
		},
		cbc: function cbc(cb) {
			if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
			return cb;
		}
	};
	
	window.log = Logger.new();
	window.xlog = XLogger.new();

/***/ },

/***/ 383:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Base = __webpack_require__(384);
	var groupStyles = __webpack_require__(386).groupStyles;
	
	var Log = function Log(o) {
		this.assign(o);
		this.initialize();
	};
	
	Log.prototype = Object.create(Base.prototype);
	
	Log.prototype.assign({
		method: "log",
		afg: true,
		styled: [], // objects { str: "str", styles: "css: props;" }
		initialize: function initialize() {
			this.styled = [];
			this.autoFileGroup();
			this.custom();
			this.log();
		},
		initLog: function initLog() {
			this.styled = [];
			this.autoFileGroup();
			this.custom();
			this.log();
		},
		autoFileGroup: function autoFileGroup() {
			if (this.afg && this.logger.afg) {
				this.styledIcon();
	
				if (this.logger.currentFile !== this.trace.file) {
					if (this.logger.currentGroup.type == "file") this.logger.currentGroup.close();
	
					if (this.logger.currentFile !== this.trace.file) {
						new FileGroup({
							trace: this.trace,
							lastFile: this.logger.currentFile,
							logger: this.logger
						});
					}
				}
			} else {
				if (this.logger.currentGroup.type == "file") this.logger.currentGroup.close();
			}
		},
		custom: function custom() {},
		styledLineNumber: function styledLineNumber() {
			this.styled.unshift({ str: this.trace.line, styles: groupStyles });
		},
		styledIcon: function styledIcon() {
			var icon;
			if (this.icon) icon = this.icon;else icon = this.trace.line;
	
			this.styled.push({ str: icon, styles: groupStyles });
		},
		getStyledArgsArray: function getStyledArgsArray() {
			var str = "",
			    styles = [],
			    styled;
			for (var i in this.styled) {
				styled = this.styled[i];
				str += "%c" + styled.str;
				styles.push(styled.styles);
			}
			return [].concat(str, styles);
		},
		log: function log(args) {
			console[this.method].apply(console, this.getStyledArgsArray().concat(Array.prototype.slice.call(this.arguments || [])));
		}
	});
	
	module.exports = Log;

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var is = __webpack_require__(385);
	
	var Base = function Base(o) {
		this.assign(o).initialize();
	};
	
	Base.prototype.initialize = function () {};
	
	Base.prototype.assign = function (o) {
		return Object.assign(this, o);
	};
	
	module.exports = Base;

/***/ },

/***/ 385:
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var is = {
		arr: function arr(value) {
			return toString.call(value) === '[object Array]';
		},
		obj: function obj(value) {
			return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" && !is.arr(value);
		},
		val: function val(value) {
			return ['boolean', 'number', 'string'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1;
		},
		str: function str(value) {
			return typeof value === "string";
		},
		num: function num(value) {
			return typeof value === "number";
		},
		bool: function bool(value) {
			return typeof value === 'boolean';
		},
		fn: function fn(value) {
			return typeof value === 'function';
		},
		sfn: function sfn(value) {
			return is.fn(value) && value.Base;
		},
		def: function def(value) {
			return typeof value !== 'undefined';
		},
		undef: function undef(value) {
			return typeof value === 'undefined';
		},
		simple: function simple(value) {
			// aka non-referential
			return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && !is.fn(value); // null, NaN, or other non-referential values?
		}
	};
	
	module.exports = is;

/***/ },

/***/ 386:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(385);
	
	exports.getBacktrace = function () {
			var stack = new Error().stack + '\n';
	
			// console.log(stack);
	
			stack = stack.replace(/^\s+(at eval )?at\s+/gm, '');
			// console.log(stack);
	
			stack = stack.replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2');
			// console.log(stack);
	
			stack = stack.replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)');
			// console.log(stack);
	
			stack = stack.replace(/^(.+) \((.+)\)$/gm, '$1```$2');
			// console.log(stack);
	
			stack = stack.split('\n');
			// console.log(stack);
	
			stack = stack.slice(1, -1);
			// console.log(stack);
	
			var backtrace = [];
	
			for (var i in stack) {
					stack[i] = stack[i].split('```');
					var bt = {
							func: stack[i][0],
							fullPathAndLine: stack[i][1]
	
					};
	
					// console.log(bt);
					var lineAndPos = stack[i][1].match(/:\d+:\d+$/)[0].split(":");
					var url = stack[i][1].replace(/:\d+:\d+$/, "");
					// console.log(url, lineAndPos);
	
					var pathBreakdown = stack[i][1].split(':');
					// console.log(pathBreakdown);
					bt.file = url.replace(/^.*[\\\/]/, '');
					bt.line = lineAndPos[1];
					bt.linePos = lineAndPos[2];
					// console.log(bt);
					backtrace.push(bt);
			}
			// console.log(backtrace);
			return backtrace; //.slice(3);
	};
	
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var ARGUMENT_NAMES = /([^\s,]+)/g;
	exports.getParamNames = function (func) {
			var fnStr = func.toString().replace(STRIP_COMMENTS, '');
			var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
			if (result === null) result = [];
			return result;
	};
	
	exports.noop = function () {};
	
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
	
	exports.groupStyles = styles.margin + styles.padding + styles.border + styles.background + styles.line;

/***/ },

/***/ 387:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Log = __webpack_require__(383);
	
	var Group = function Group() {
		this.assign.apply(this, arguments);
		this.initialize();
	};
	
	Group.prototype = Object.create(Log.prototype);
	
	Group.prototype.assign({
		method: "group",
		// type: "group",
		open: true,
		initialize: function initialize() {
			this.styled = [];
			this.autoFileGroup();
			this.custom();
			this.log();
			this.logger.add(this);
		},
		close: function close(auto) {
			if (this.open) {
				if (this === this.logger.currentGroup) {
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
		closeCustom: function closeCustom() {} });
	
	module.exports = Group;

/***/ },

/***/ 388:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Log = __webpack_require__(383);
	var Group = __webpack_require__(387);
	var styles = __webpack_require__(386).styles;
	
	var FileGroup = function FileGroup() {
		this.assign.apply(this, arguments);
		this.initialize();
	};
	
	FileGroup.prototype = Object.create(Group.prototype);
	
	FileGroup.prototype.assign({
		type: "file",
		initialize: function initialize() {
			this.styled = [];
			this.logger.add(this);
			this.lastFile = this.logger.currentFile;
			this.logger.currentFile = this.trace.file;
			this.styledFileName();
			this.log();
	
			var self = this;
			this.autoCloseTimeout = setTimeout(function () {
				self.close(1);
			}, 0);
		},
		styledFileName: function styledFileName() {
			this.styled.push({
				str: "📄 " + this.trace.file,
				styles: "padding: 3px 7px 2px; font-size: 13px; line-height: 18px;" + styles.border + styles.background
			});
		},
		closeCustom: function closeCustom() {
			clearTimeout(this.autoCloseTimeout);
			this.logger.currentFile = this.lastFile;
		}
	});
	
	Log.prototype.assign({
		autoFileGroup: function autoFileGroup() {
			if (this.afg && this.logger.afg) {
				this.styledIcon();
	
				if (this.logger.currentFile !== this.trace.file) {
					if (this.logger.currentGroup.type == "file") this.logger.currentGroup.close();
	
					if (this.logger.currentFile !== this.trace.file) {
						new FileGroup({
							trace: this.trace,
							lastFile: this.logger.currentFile,
							logger: this.logger
						});
					}
				}
			} else {
				if (this.logger.currentGroup.type == "file") this.logger.currentGroup.close();
			}
		}
	});
	
	module.exports = FileGroup;

/***/ },

/***/ 389:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Log = __webpack_require__(383);
	var groupStyles = __webpack_require__(386).groupStyles;
	
	var Var = function Var(o) {
		this.assign(o).initialize();
	};
	
	Var.prototype = Object.create(Log.prototype);
	
	Var.prototype.assign({
		custom: function custom() {
			this.styled.push({ str: this.name + ":", styles: groupStyles });
		}
	});
	
	module.exports = Var;

/***/ },

/***/ 390:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Group = __webpack_require__(387);
	
	var ClosureGroup = function ClosureGroup(o) {
		this.assign(o).initialize();
	};
	
	ClosureGroup.prototype = Object.create(Group.prototype);
	
	ClosureGroup.prototype.assign({
		type: "user",
		expand: true,
		initialize: function initialize() {
			this.autoFileGroup();
			this.resolveArgs();
			if (!this.expand) this.method = "groupCollapsed";
			this.log();
			this.logger.add(this);
			this.execute();
			this.close();
		},
		execute: function execute() {
			this.fn.call(this.this);
		}
	});
	
	module.exports = ClosureGroup;

/***/ },

/***/ 391:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Base = __webpack_require__(384);
	var is = __webpack_require__(385);
	var FunctionGroup = __webpack_require__(392);
	var utils = __webpack_require__(386);
	var getParamNames = utils.getParamNames;
	var getBacktrace = utils.getBacktrace;
	
	var FunctionDefinition = function FunctionDefinition() {
		this.assign.apply(this, arguments);
		this.initialize();
	};
	
	FunctionDefinition.prototype = Object.create(Base.prototype);
	
	FunctionDefinition.prototype.assign({
		initialize: function initialize() {
			this.resolveArgs();
		},
		resolveArgs: function resolveArgs() {
			if (is.str(this.arguments[0])) {
				this.label = this.arguments[0];
				if (is.fn(this.arguments[1])) {
					this.fn = this.arguments[1];
				}
			} else if (is.fn(this.arguments[0])) {
				this.fn = this.arguments[0];
				if (this.fn.name) this.label = this.fn.name;
			}
	
			this.argNames = getParamNames(this.fn);
	
			this.line = this.trace.line;
			this.file = this.trace.file;
		},
		wrapper: function wrapper() {
			var def = this;
			return function wrapper() {
				if (!def.logger.log) return def.fn.apply(this, arguments);
	
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
	
	module.exports = FunctionDefinition;

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Group = __webpack_require__(387);
	var groupStyles = __webpack_require__(386).groupStyles;
	var is = __webpack_require__(385);
	
	var FunctionGroup = function FunctionGroup() {
		this.assign.apply(this, arguments);
		this.initialize();
	};
	
	FunctionGroup.prototype = Object.create(Group.prototype);
	
	FunctionGroup.prototype.assign({
		type: "functionGroup",
		initialize: function initialize() {
			this.styled = [];
			this.name = this.def.name;
			this.defFile = this.def.trace.file;
			this.argNames = this.def.argNames;
			this.logger = this.def.logger;
	
			if (!this.def.expand) this.method = "groupCollapsed";
	
			this.autoFileGroup();
			this.buildLabel();
			this.log();
			this.fileChangeLabel();
			this.logger.add(this);
		},
		retLog: function retLog() {
			if (!this.logger.returnToGroup(this)) console.warn("group inconsistency");
	
			if (is.def(this.returnValue)) {
				this.logger.currentGroup.close();
				console.log('%creturn', groupStyles + "margin-left: " + styles.indent, this.returnValue);
			} else {
				if (this.logUndefinedReturnValue) console.log('%creturn', groupStyles, this.returnValue);
	
				this.logger.currentGroup.close();
			}
			return this.returnValue;
		},
		execute: function execute() {
			this.returnValue = this.def.fn.apply(this.ctx, this.fnArgs);
			this.retLog();
			return this.returnValue;
		},
		fileChangeLabel: function fileChangeLabel() {
			// if fn is defined elsewhere, label the file change
			if (this.logger.currentFile !== this.def.file) {
				console.log("%c" + this.def.file, groupStyles + "font-weight: bold");
				this.logger.currentFile = this.def.file;
			}
		},
		buildLabel: function buildLabel() {
			var line = this.trace.line;
	
			// build the function call label
			var label = [this.def.label + "("];
	
			if (this.argNames.length) {
				for (var i = 0; i < this.argNames.length; i++) {
					if (this.argNames[i]) label.push(this.argNames[i] + ":");
					label.push(this.fnArgs[i]);
					if (i < this.argNames.length - 1) {
						label.push(",");
					}
				}
			}
			label.push(")");
			this.arguments = label;
		},
		closeCustom: function closeCustom() {
			if (this.def.cb) this.logger.currentFile = this.def.file;else this.logger.currentFile = this.trace.file;
		}
	});
	
	module.exports = FunctionGroup;

/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var FunctionDefinition = __webpack_require__(391);
	
	var CBDefinition = function CBDefinition(o) {
		this.assign(o).initialize();
	};
	
	CBDefinition.prototype = Object.create(FunctionDefinition.prototype);
	
	CBDefinition.prototype.assign({
		wrapper: function wrapper() {
			var def = this;
			return function () {
				if (!def.logger.log) return def.fn.apply(this, arguments);
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
	
	module.exports = CBDefinition;

/***/ },

/***/ 394:
/***/ function(module, exports) {

	"use strict";
	
	log.resize = true;
	
	if ($) {
		$(document).ready(function () {
			if (log.currentGroup.type === "root") {
				log.rgroup("document.ready");
				setTimeout(function () {
					log.end();
				}, 0);
			}
		});
		$(window).load(function () {
			// if (log.currentGroup.type === "root"){
			log.rgroup("window.load");
			setTimeout(function () {
				log.end();
			}, 0);
			// }
		});
	
		$(window).on('resize.log', function () {
			if (log.resize) {
				log.rgroup("window.resize");
				setTimeout(function () {
					log.end();
				}, 0);
			}
		});
	
		$(document).scroll(function () {
			// if (log.currentGroup.type === "root"){
			log.rgroup("document.scroll");
			setTimeout(function () {
				log.end();
			}, 0);
			// }
		});
	
		// log.closureGroup({ name: "test" }, function(){
		// 	log('yo');
		// })
	}

/***/ }

/******/ });
//# sourceMappingURL=log.js.map
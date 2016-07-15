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
	
	var _logger = __webpack_require__(357);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _loggerEvents = __webpack_require__(369);
	
	var _loggerEvents2 = _interopRequireDefault(_loggerEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Log = __webpack_require__(358);
	
	var _Log2 = _interopRequireDefault(_Log);
	
	var _Group = __webpack_require__(362);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _FileGroup = __webpack_require__(363);
	
	var _FileGroup2 = _interopRequireDefault(_FileGroup);
	
	var _Var = __webpack_require__(364);
	
	var _Var2 = _interopRequireDefault(_Var);
	
	var _ClosureGroup = __webpack_require__(365);
	
	var _ClosureGroup2 = _interopRequireDefault(_ClosureGroup);
	
	var _FunctionDefinition = __webpack_require__(366);
	
	var _FunctionDefinition2 = _interopRequireDefault(_FunctionDefinition);
	
	var _CBDefinition = __webpack_require__(368);
	
	var _CBDefinition2 = _interopRequireDefault(_CBDefinition);
	
	var _utils = __webpack_require__(361);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getLoggerBase() {
		var logger = function logger(val) {
			if (!logger.log) return val;
	
			new _Log2.default({
				arguments: arguments,
				trace: (0, _utils.getBacktrace)()[2],
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
		currentGroup: new _Group2.default({
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
			this.currentFile = this.currentGroup.trace.file;
		},
		returnToGroup: function returnToGroup(group) {
			while (this.currentGroup !== group && this.currentGroup.type !== "root") {
				this.currentGroup.close();
			}
			return this.currentGroup === group;
		},
		group: function group(name) {
			if (!this.log) return name;
	
			return new _Group2.default({
				trace: (0, _utils.getBacktrace)()[2],
				type: "user",
				arguments: arguments,
				logger: this
			});
		},
		groupc: function groupc(name) {
			if (!this.log) return name;
	
			return new _Group2.default({
				trace: (0, _utils.getBacktrace)()[2],
				type: "user",
				arguments: arguments,
				method: "groupCollapsed",
				logger: this
			});
		},
		rgroup: function rgroup(name) {
			if (!this.log) return name;
	
			this.closeAll();
	
			return new _Group2.default({
				trace: (0, _utils.getBacktrace)()[2],
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
	
			return new _Group2.default({
				trace: (0, _utils.getBacktrace)()[2],
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
	
			new _Var2.default({
				arguments: arguments,
				trace: (0, _utils.getBacktrace)()[2],
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
	
			o.trace = (0, _utils.getBacktrace)()[2];
			o.fn = fn;
			o.logger = this;
	
			new _ClosureGroup2.default(o);
		},
		wrap: function wrap(fn) {
			if (!this.log) {
				if (!is.fn(arguments[0]) && is.fn(arguments[1])) return arguments[1];
				return fn;
			}
			var def = new _FunctionDefinition2.default({
				trace: (0, _utils.getBacktrace)()[2],
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
			var def = new _FunctionDefinition2.default({
				trace: (0, _utils.getBacktrace)()[2],
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
			var def = new _CBDefinition2.default({
				cb: true,
				trace: (0, _utils.getBacktrace)()[2],
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
			var def = new _CBDefinition2.default({
				cb: true,
				trace: (0, _utils.getBacktrace)()[2],
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
		group: _utils.noop,
		groupc: _utils.noop,
		rgroup: _utils.noop,
		end: _utils.noop,
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

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base2 = __webpack_require__(359);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	var _utils = __webpack_require__(361);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Log = function (_Base) {
		_inherits(Log, _Base);
	
		function Log() {
			_classCallCheck(this, Log);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Log).apply(this, arguments));
		}
	
		_createClass(Log, [{
			key: "initialize",
			value: function initialize() {
				this.styled = [];
				this.autoFileGroup();
				this.custom();
				this.log();
			}
		}, {
			key: "initLog",
			value: function initLog() {
				this.styled = [];
				this.autoFileGroup();
				this.custom();
				this.log();
			}
		}, {
			key: "custom",
			value: function custom() {}
		}, {
			key: "styledLineNumber",
			value: function styledLineNumber() {
				this.styled.unshift({ str: this.trace.line, styles: _utils.groupStyles });
			}
		}, {
			key: "styledIcon",
			value: function styledIcon() {
				var icon;
				if (this.icon) icon = this.icon;else icon = this.trace.line;
	
				this.styled.push({ str: icon, styles: _utils.groupStyles });
			}
		}, {
			key: "getStyledArgsArray",
			value: function getStyledArgsArray() {
				var str = "",
				    styles = [],
				    styled;
				for (var i in this.styled) {
					styled = this.styled[i];
					str += "%c" + styled.str;
					styles.push(styled.styles);
				}
				return [].concat(str, styles);
			}
		}, {
			key: "log",
			value: function log(args) {
				console[this.method].apply(console, this.getStyledArgsArray().concat(Array.prototype.slice.call(this.arguments || [])));
			}
		}]);
	
		return Log;
	}(_Base3.default);
	
	exports.default = Log;
	
	
	Log.prototype.assign({
		method: "log",
		afg: true
	});
	
	// var Log = function Log(o){
	// 	this.assign(o);
	// 	this.initialize();
	// };
	
	// Log.prototype = Object.create(Base.prototype);
	
	// Log.prototype.assign({
	// 	method: "log",
	// 	afg: true,
	// 	styled: [], // objects { str: "str", styles: "css: props;" }
	// 	initialize: function(){
	// 		this.styled = [];
	// 		this.autoFileGroup();
	// 		this.custom();
	// 		this.log();
	// 	},
	// 	initLog: function(){
	// 		this.styled = [];
	// 		this.autoFileGroup();
	// 		this.custom();
	// 		this.log();
	// 	},
	// 	autoFileGroup: function(){
	// 		if (this.afg && this.logger.afg){
	// 			this.styledIcon();
	
	// 			if (this.logger.currentFile !== this.trace.file) {
	// 				if (this.logger.currentGroup.type == "file")
	// 					this.logger.currentGroup.close();
	
	// 				if (this.logger.currentFile !== this.trace.file){
	// 					new FileGroup({
	// 						trace: this.trace,
	// 						lastFile: this.logger.currentFile,
	// 						logger: this.logger
	// 					});
	// 				}
	// 			}
	
	// 		} else {
	// 			if (this.logger.currentGroup.type == "file")
	// 				this.logger.currentGroup.close();
	// 		}
	// 	},
	// 	custom: function(){},
	// 	styledLineNumber: function(){
	// 		this.styled.unshift({ str: this.trace.line, styles: groupStyles });
	// 	},
	// 	styledIcon: function(){
	// 		var icon;
	// 		if (this.icon)
	// 			icon = this.icon;
	// 		else 
	// 			icon = this.trace.line;
	
	// 		this.styled.push({ str: icon, styles: groupStyles })
	// 	},
	// 	getStyledArgsArray: function(){
	// 		var str = "", styles = [], styled;
	// 		for (var i in this.styled){
	// 			styled = this.styled[i];
	// 			str += "%c" + styled.str;
	// 			styles.push(styled.styles);
	// 		}
	// 		return [].concat(str, styles);
	// 	},
	// 	log: function(args){
	// 		console[this.method].apply(console, this.getStyledArgsArray().concat(Array.prototype.slice.call(this.arguments || [] )));
	// 	}
	// })

/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _is = __webpack_require__(360);
	
	var _is2 = _interopRequireDefault(_is);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Base = function () {
		function Base(o) {
			_classCallCheck(this, Base);
	
			this.assign(o).initialize.apply(this, arguments);
		}
	
		_createClass(Base, [{
			key: "initialize",
			value: function initialize() {}
		}, {
			key: "assign",
			value: function assign() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				return Object.assign.apply(Object, [this].concat(args));
			}
		}]);
	
		return Base;
	}();
	
	// var Base = function Base(o){
	// 	this.assign(o);
	// 	this.initialize.apply(this, arguments);
	// };
	
	// Base.prototype.initialize = function(o, args){};
	
	// Base.prototype.assign = function(o){
	// 	if (is.obj(o)){
	// 		for (var i in o)
	// 			this[i] = o[i];
	// 	}
	// 	return this;
	// };
	
	
	exports.default = Base;

/***/ },

/***/ 360:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
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
	
	exports.default = is;

/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.groupStyles = exports.styles = exports.noop = exports.getBacktrace = undefined;
	exports.getParamNames = getParamNames;
	
	var _is = __webpack_require__(360);
	
	var _is2 = _interopRequireDefault(_is);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getBacktrace = exports.getBacktrace = function getBacktrace() {
		var stack = new Error().stack + '\n';
	
		// console.log(stack);
	
		stack = stack.replace(/^\s+(at eval )?at\s+/gm, '') // remove 'at' and indentation
		.replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2').replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)').replace(/^(.+) \((.+)\)$/gm, '$1```$2').split('\n').slice(1, -1);
	
		var backtrace = [];
	
		for (var i in stack) {
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
		var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
		if (result === null) result = [];
		return result;
	}
	
	var noop = exports.noop = function noop() {};
	
	var bg = "background: #eee;";
	
	var styles = exports.styles = {
		margin: "margin-left: 0px;",
		padding: "padding: 3px 5px 2px;",
		border: "border-bottom: 1px solid #ddd;",
		background: "background: #eee;",
		line: "line-height: 16px;",
		indent: "12px"
	};
	
	var groupStyles = exports.groupStyles = styles.margin + styles.padding + styles.border + styles.background + styles.line;

/***/ },

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Log2 = __webpack_require__(358);
	
	var _Log3 = _interopRequireDefault(_Log2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Group = function (_Log) {
		_inherits(Group, _Log);
	
		function Group() {
			_classCallCheck(this, Group);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
		}
	
		_createClass(Group, [{
			key: "initialize",
			value: function initialize() {
				this.styled = [];
				this.autoFileGroup();
				this.custom();
				this.log();
				this.logger.add(this);
			}
		}, {
			key: "close",
			value: function close(auto) {
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
			}
		}, {
			key: "closeCustom",
			value: function closeCustom() {} // override point
	
		}]);
	
		return Group;
	}(_Log3.default);
	
	exports.default = Group;
	
	
	Group.prototype.assign({
		method: "group",
		open: true
	});
	
	// var Group = function Group(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// Group.prototype = Object.create(Log.prototype);
	
	// Group.prototype.assign({
	// 	method: "group",
	// 	// type: "group",
	// 	open: true,
	// 	initialize: function(){
	// 		this.styled = [];
	// 		this.autoFileGroup();
	// 		this.custom();
	// 		this.log();
	// 		this.logger.add(this);
	// 	},
	// 	close: function(auto){
	// 		if (this.open){
	// 			if (this === this.logger.currentGroup){
	// 				console.groupEnd();
	// 				this.open = false;
	// 				this.logger.resetGroup();
	// 				this.closeCustom();
	// 			} else {
	// 				console.warn((auto ? "auto " : "") + "attempting to close incorrect group. this:", this, 'this.logger.currentGroup:', this.logger.currentGroup);
	// 			}
	// 		} else {
	// 			console.warn((auto ? "auto " : "") + "already closed " + this.type + " group. this:", this);
	// 		}
	// 	},
	// 	closeCustom: function(){}, // override point
	// });

/***/ },

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Log = __webpack_require__(358);
	
	var _Log2 = _interopRequireDefault(_Log);
	
	var _Group2 = __webpack_require__(362);
	
	var _Group3 = _interopRequireDefault(_Group2);
	
	var _utils = __webpack_require__(361);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FileGroup = function (_Group) {
		_inherits(FileGroup, _Group);
	
		function FileGroup() {
			_classCallCheck(this, FileGroup);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(FileGroup).apply(this, arguments));
		}
	
		_createClass(FileGroup, [{
			key: "defaults",
			value: function defaults() {
				this.type = "file";
			}
		}, {
			key: "initialize",
			value: function initialize() {
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
			}
		}, {
			key: "styledFileName",
			value: function styledFileName() {
				this.styled.push({
					str: "📄 " + this.trace.file,
					styles: "padding: 3px 7px 2px; font-size: 13px; line-height: 18px;" + _utils.styles.border + _utils.styles.background
				});
			}
		}, {
			key: "closeCustom",
			value: function closeCustom() {
				clearTimeout(this.autoCloseTimeout);
				this.logger.currentFile = this.lastFile;
			}
		}]);
	
		return FileGroup;
	}(_Group3.default);
	
	exports.default = FileGroup;
	
	
	FileGroup.prototype.assign({
		type: "file"
	});
	
	_Log2.default.prototype.assign({
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
	
	// var FileGroup = function FileGroup(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// FileGroup.prototype = Object.create(Group.prototype);
	
	// FileGroup.prototype.assign({
	// 	type: "file",
	// 	initialize: function(){
	// 		this.styled = [];
	// 		this.logger.add(this);
	// 		this.lastFile = this.logger.currentFile;
	// 		this.logger.currentFile = this.trace.file;
	// 		this.styledFileName();
	// 		this.log();
	
	// 		var self = this;
	// 		this.autoCloseTimeout = setTimeout(function(){
	// 			self.close(1);
	// 		}, 0);
	// 	},
	// 	styledFileName: function(){
	// 		this.styled.push({ 
	// 			str: "📄 " +  this.trace.file, 
	// 			styles: "padding: 3px 7px 2px; font-size: 13px; line-height: 18px;" + styles.border + styles.background 
	// 		});
	// 	},
	// 	closeCustom: function(){
	// 		clearTimeout(this.autoCloseTimeout);
	// 		this.logger.currentFile = this.lastFile;
	// 	}
	// });

/***/ },

/***/ 364:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Log2 = __webpack_require__(358);
	
	var _Log3 = _interopRequireDefault(_Log2);
	
	var _utils = __webpack_require__(361);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Var = function (_Log) {
		_inherits(Var, _Log);
	
		function Var() {
			_classCallCheck(this, Var);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Var).apply(this, arguments));
		}
	
		_createClass(Var, [{
			key: "custom",
			value: function custom() {
				this.styled.push({ str: this.name + ":", styles: _utils.groupStyles });
			}
		}]);
	
		return Var;
	}(_Log3.default);
	
	// var Var = function Var(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// Var.prototype = Object.create(Log.prototype);
	
	// Var.prototype.assign({
	// 	custom: function(){
	// 		this.styled.push({ str: this.name + ":", styles: groupStyles });
	// 	}
	// });
	
	
	exports.default = Var;

/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Group2 = __webpack_require__(362);
	
	var _Group3 = _interopRequireDefault(_Group2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ClosureGroup = function (_Group) {
		_inherits(ClosureGroup, _Group);
	
		function ClosureGroup() {
			_classCallCheck(this, ClosureGroup);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(ClosureGroup).apply(this, arguments));
		}
	
		_createClass(ClosureGroup, [{
			key: "initialize",
			value: function initialize() {
				this.autoFileGroup();
				this.resolveArgs();
				if (!this.expand) this.method = "groupCollapsed";
				this.log();
				this.logger.add(this);
				this.execute();
				this.close();
			}
		}, {
			key: "execute",
			value: function execute() {
				this.fn.call(this.this);
			}
		}]);
	
		return ClosureGroup;
	}(_Group3.default);
	
	exports.default = ClosureGroup;
	
	
	ClosureGroup.prototype.assign({
		type: "user",
		expand: true
	});
	
	// var ClosureGroup = function ClosureGroup(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// ClosureGroup.prototype = Object.create(Group.prototype);
	
	// ClosureGroup.prototype.assign({
	// 	type: "user",
	// 	expand: true,
	// 		initialize: function(){
	// 			this.autoFileGroup();
	// 			this.resolveArgs();
	// 			 if (!this.expand)
	// 					this.method = "groupCollapsed";
	// 			this.log();
	// 			this.logger.add(this);
	// 			this.execute();
	// 			this.close();
	// 		},
	// 		execute: function(){
	// 			this.fn.call(this.this);
	// 		}
	// });

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base2 = __webpack_require__(359);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	var _is = __webpack_require__(360);
	
	var _is2 = _interopRequireDefault(_is);
	
	var _FunctionGroup = __webpack_require__(367);
	
	var _FunctionGroup2 = _interopRequireDefault(_FunctionGroup);
	
	var _utils = __webpack_require__(361);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FunctionDefinition = function (_Base) {
		_inherits(FunctionDefinition, _Base);
	
		function FunctionDefinition() {
			_classCallCheck(this, FunctionDefinition);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionDefinition).apply(this, arguments));
		}
	
		_createClass(FunctionDefinition, [{
			key: "initialize",
			value: function initialize() {
				this.resolveArgs();
			}
		}, {
			key: "resolveArgs",
			value: function resolveArgs() {
				if (_is2.default.str(this.arguments[0])) {
					this.label = this.arguments[0];
					if (_is2.default.fn(this.arguments[1])) {
						this.fn = this.arguments[1];
					}
				} else if (_is2.default.fn(this.arguments[0])) {
					this.fn = this.arguments[0];
					if (this.fn.name) this.label = this.fn.name;
				}
	
				this.argNames = (0, _utils.getParamNames)(this.fn);
	
				this.line = this.trace.line;
				this.file = this.trace.file;
			}
		}, {
			key: "wrapper",
			value: function wrapper() {
				var def = this;
				return function wrapper() {
					if (!def.logger.log) return def.fn.apply(this, arguments);
	
					return new _FunctionGroup2.default({
						trace: (0, _utils.getBacktrace)()[2],
						def: def,
						fnArgs: arguments,
						ctx: this
					}).execute();
					return ret;
				};
			}
		}]);
	
		return FunctionDefinition;
	}(_Base3.default);
	
	// var FunctionDefinition = function FunctionDefinition(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// FunctionDefinition.prototype = Object.create(Base.prototype);
	
	// FunctionDefinition.prototype.assign({
	// 	initialize: function(){
	// 		this.resolveArgs();
	// 	},
	// 	resolveArgs: function(){
	// 		if (is.str(this.arguments[0])){
	// 			this.label = this.arguments[0];
	// 			if (is.fn(this.arguments[1])){
	// 				this.fn = this.arguments[1];
	// 			}
	// 		} else if (is.fn(this.arguments[0])){
	// 			this.fn = this.arguments[0];
	// 			if (this.fn.name)
	// 				this.label = this.fn.name;
	// 		}
	
	// 		this.argNames = getParamNames(this.fn);
	
	// 		this.line = this.trace.line;
	// 		this.file = this.trace.file;
	// 	},
	// 	wrapper: function(){
	// 		var def = this;
	// 		return function wrapper(){
	// 			if (!def.logger.log)
	// 				return def.fn.apply(this, arguments);
	
	// 			return new FunctionGroup({
	// 				trace: getBacktrace()[2],
	// 				def: def,
	// 				fnArgs: arguments,
	// 				ctx: this
	// 			}).execute();
	// 			return ret;
	// 		};
	// 	}
	// });
	
	
	exports.default = FunctionDefinition;

/***/ },

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Group2 = __webpack_require__(362);
	
	var _Group3 = _interopRequireDefault(_Group2);
	
	var _utils = __webpack_require__(361);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FunctionGroup = function (_Group) {
		_inherits(FunctionGroup, _Group);
	
		function FunctionGroup() {
			_classCallCheck(this, FunctionGroup);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionGroup).apply(this, arguments));
		}
	
		_createClass(FunctionGroup, [{
			key: "initialize",
			value: function initialize() {
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
			}
		}, {
			key: "retLog",
			value: function retLog() {
				if (!this.logger.returnToGroup(this)) console.warn("group inconsistency");
	
				if (is.def(this.returnValue)) {
					this.logger.currentGroup.close();
					console.log('%creturn', _utils.groupStyles + "margin-left: " + styles.indent, this.returnValue);
				} else {
					if (this.logUndefinedReturnValue) console.log('%creturn', _utils.groupStyles, this.returnValue);
	
					this.logger.currentGroup.close();
				}
				return this.returnValue;
			}
		}, {
			key: "execute",
			value: function execute() {
				this.returnValue = this.def.fn.apply(this.ctx, this.fnArgs);
				this.retLog();
				return this.returnValue;
			}
		}, {
			key: "fileChangeLabel",
			value: function fileChangeLabel() {
				// if fn is defined elsewhere, label the file change
				if (this.logger.currentFile !== this.def.file) {
					console.log("%c" + this.def.file, _utils.groupStyles + "font-weight: bold");
					this.logger.currentFile = this.def.file;
				}
			}
		}, {
			key: "buildLabel",
			value: function buildLabel() {
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
			}
		}, {
			key: "closeCustom",
			value: function closeCustom() {
				if (this.def.cb) this.logger.currentFile = this.def.file;else this.logger.currentFile = this.trace.file;
			}
		}]);
	
		return FunctionGroup;
	}(_Group3.default);
	
	exports.default = FunctionGroup;
	
	
	FunctionGroup.prototype.assign({
		type: "functionGroup"
	});
	
	// var FunctionGroup = function FunctionGroup(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// FunctionGroup.prototype = Object.create(Group.prototype);
	
	// FunctionGroup.prototype.assign({
	// 	type: "functionGroup",
	// 	initialize: function(){
	// 		this.styled = [];
	// 		this.name = this.def.name;
	// 		this.defFile = this.def.trace.file;
	// 		this.argNames = this.def.argNames;
	// 		this.logger = this.def.logger;
	
	// 		if (!this.def.expand)
	// 			this.method = "groupCollapsed";
	
	// 		this.autoFileGroup();
	// 		this.buildLabel();
	// 		this.log();
	// 		this.fileChangeLabel();
	// 		this.logger.add(this);
	// 	},
	// 	retLog: function(){
	// 		if (!this.logger.returnToGroup(this))
	// 			console.warn("group inconsistency");
	
	// 		if (is.def(this.returnValue)){
	// 			this.logger.currentGroup.close();
	// 			console.log('%creturn', groupStyles + "margin-left: " + styles.indent, this.returnValue);
	// 		} else {
	// 			if (this.logUndefinedReturnValue)
	// 				console.log('%creturn', groupStyles, this.returnValue);
	
	// 			this.logger.currentGroup.close();
	// 		}
	// 		return this.returnValue;
	// 	},
	// 	execute: function(){
	// 		this.returnValue = this.def.fn.apply(this.ctx, this.fnArgs);
	// 		this.retLog();
	// 		return this.returnValue;
	// 	},
	// 	fileChangeLabel: function(){
	// 		// if fn is defined elsewhere, label the file change
	// 		if (this.logger.currentFile !== this.def.file){
	// 			console.log("%c"+ this.def.file, groupStyles + "font-weight: bold");
	// 			this.logger.currentFile = this.def.file;
	// 		}
	// 	},
	// 	buildLabel: function(){
	// 		var line = this.trace.line;
	
	// 		// build the function call label
	// 		var label = [ this.def.label + "(" ];
	
	// 		if (this.argNames.length){
	// 			for (var i = 0; i < this.argNames.length; i++){
	// 				if (this.argNames[i])
	// 					label.push(this.argNames[i]+":");
	// 				label.push(this.fnArgs[i]);
	// 				if (i < this.argNames.length - 1){
	// 					label.push(",");
	// 				}
	// 			}
	// 		}
	// 		label.push(")");
	// 		this.arguments = label;
	// 	},
	// 	closeCustom: function(){
	// 		if (this.def.cb)
	// 			this.logger.currentFile = this.def.file;
	// 		else
	// 			this.logger.currentFile = this.trace.file;
	// 	}
	// });

/***/ },

/***/ 368:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _FunctionDefinition2 = __webpack_require__(366);
	
	var _FunctionDefinition3 = _interopRequireDefault(_FunctionDefinition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CBDefinition = function (_FunctionDefinition) {
		_inherits(CBDefinition, _FunctionDefinition);
	
		function CBDefinition() {
			_classCallCheck(this, CBDefinition);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(CBDefinition).apply(this, arguments));
		}
	
		_createClass(CBDefinition, [{
			key: "wrapper",
			value: function wrapper() {
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
		}]);
	
		return CBDefinition;
	}(_FunctionDefinition3.default);
	
	// var CBDefinition = function CBDefinition(){
	// 	this.assign.apply(this, arguments);
	// 	this.initialize();
	// };
	
	// CBDefinition.prototype = Object.create(FunctionDefinition.prototype);
	
	// CBDefinition.prototype.assign({
	// 	wrapper: function(){
	// 		var def = this;
	// 		return function(){
	// 			if (!def.logger.log)
	// 				return def.fn.apply(this, arguments);
	// 			return new CBGroup({
	// 				trace: getBacktrace()[2],
	// 				afg: false,
	// 				def: def,
	// 				arguments: arguments,
	// 				ctx: this
	// 			}).execute();
	// 		};
	// 	}
	// });
	
	
	exports.default = CBDefinition;

/***/ },

/***/ 369:
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
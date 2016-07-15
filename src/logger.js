import Log from "./Log"
import Group from "./Group"
import FileGroup from "./FileGroup"
import Var from "./Var"
import ClosureGroup from "./ClosureGroup"
import FunctionDefinition from "./FunctionDefinition"
import CBDefinition from "./CBDefinition"
import { noop, getBacktrace } from "./utils"

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
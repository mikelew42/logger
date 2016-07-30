var Base = require("./Base");
var is = require("./is");
var FunctionGroup = require("./FunctionGroup");
var utils = require("./utils");
var getParamNames = utils.getParamNames;
var getBacktrace = utils.getBacktrace;

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

		this.line = this.trace && this.trace.line;
		this.file = this.trace && this.trace.file;
	},
	wrapper: function(){
		var def = this;
		return function wrapper(){
			var bt;
			if (!def.logger.log)
				return def.fn.apply(this, arguments);

			bt = getBacktrace();

			if (typeof module === "undefined"){
				console.log('browser?');
				bt = bt[2]
			} else {
				// console.log('server?');
				bt = bt[1]
			}

			return new FunctionGroup({
				trace: bt,
				def: def,
				fnArgs: arguments,
				ctx: this
			}).execute();
			return ret;
		};
	}
});

module.exports = FunctionDefinition;
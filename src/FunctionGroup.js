var Group = require("./Group");
var groupStyles = require("./utils").groupStyles;
var is = require("./is");

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

module.exports = FunctionGroup;
var FunctionGroup = require("./FunctionGroup");
var groupStyles = require("./utils").groupStyles;

var CBGroup = function CBGroup(o){
	this.assign(o).initialize();
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

module.exports = CBGroup;
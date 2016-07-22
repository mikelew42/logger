var Log = require("./Log");
var groupStyles = require("./utils").groupStyles;

var Var = function Var(o){
	this.assign(o).initialize();
};

Var.prototype = Object.create(Log.prototype);

Var.prototype.assign({
	custom: function(){
		this.styled.push({ str: this.name + ":", styles: groupStyles });
	}
});

module.exports = Var;
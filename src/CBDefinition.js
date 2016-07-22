var FunctionDefinition = require("./FunctionDefinition");

var CBDefinition = function CBDefinition(o){
	this.assign(o).initialize();
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

module.exports = CBDefinition;
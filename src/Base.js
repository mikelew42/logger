var is = require("./is");

var Base = function Base(o){
	this.assign(o).initialize();
};

Base.prototype.initialize = function(){};

Base.prototype.assign = function(o){
	return Object.assign(this, o);
};

module.exports = Base;
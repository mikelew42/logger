import is from "./is"

export default class Base {
	constructor(o){
		this.assign(o).initialize.apply(this, arguments);
	}
	initialize(){}
	assign(...args){
		return Object.assign(this, ...args);
	}
}

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
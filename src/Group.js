var Log = require("./Log");

var Group = function Group(){
	this.assign.apply(this, arguments);
	this.initialize();
};

Group.prototype = Object.create(Log.prototype);

Group.prototype.assign({
	method: "group",
	// type: "group",
	open: true,
	initialize: function(){
		this.styled = [];
		this.autoFileGroup();
		this.custom();
		this.log();
		this.logger.add(this);
	},
	close: function(auto){
		if (this.open){
			if (this === this.logger.currentGroup){
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
	closeCustom: function(){}, // override point
});

module.exports = Group;
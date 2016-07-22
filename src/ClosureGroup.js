var Group = require("./Group");

var ClosureGroup = function ClosureGroup(o){
	this.assign(o).initialize();
};

ClosureGroup.prototype = Object.create(Group.prototype);

ClosureGroup.prototype.assign({
	type: "user",
	expand: true,
		initialize: function(){
			this.autoFileGroup();
			this.resolveArgs();
			 if (!this.expand)
					this.method = "groupCollapsed";
			this.log();
			this.logger.add(this);
			this.execute();
			this.close();
		},
		execute: function(){
			this.fn.call(this.this);
		}
});

module.exports = ClosureGroup;
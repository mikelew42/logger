import Group from "./Group"

export default class ClosureGroup extends Group {
	initialize(){
		this.autoFileGroup();
		this.resolveArgs();
		 if (!this.expand)
				this.method = "groupCollapsed";
		this.log();
		this.logger.add(this);
		this.execute();
		this.close();
	}
	execute(){
		this.fn.call(this.this);
	}
}

ClosureGroup.prototype.assign({
	type: "user",
	expand: true
});

// var ClosureGroup = function ClosureGroup(){
// 	this.assign.apply(this, arguments);
// 	this.initialize();
// };

// ClosureGroup.prototype = Object.create(Group.prototype);

// ClosureGroup.prototype.assign({
// 	type: "user",
// 	expand: true,
// 		initialize: function(){
// 			this.autoFileGroup();
// 			this.resolveArgs();
// 			 if (!this.expand)
// 					this.method = "groupCollapsed";
// 			this.log();
// 			this.logger.add(this);
// 			this.execute();
// 			this.close();
// 		},
// 		execute: function(){
// 			this.fn.call(this.this);
// 		}
// });